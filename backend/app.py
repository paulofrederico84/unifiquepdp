"""
Unifique PDP - Backend
======================
Backend em Python/Flask que serve:
1. API REST em /api/* (projetos, autenticação, assets)
2. Interface web (arquivos estáticos)
"""

from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_cors import CORS
import os
from datetime import datetime
from typing import Dict, List
import json

# Configuração do App
app = Flask(__name__, static_folder='../frontend/dist')
CORS(app)  # Permitir CORS para desenvolvimento

# Armazenamento em memória (substituir por banco de dados no futuro)
PROJECTS_DB: Dict[str, dict] = {}
USERS_DB: Dict[str, dict] = {
    "admin": {
        "id": "user-001",
        "username": "admin",
        "password": "admin123",  # Em produção, usar hash
        "role": "admin"
    }
}

# ===================================================================
# ROTAS DE AUTENTICAÇÃO
# ===================================================================

@app.route('/api/auth/login', methods=['POST'])
def login():
    """
    POST /api/auth/login
    Autentica usuário e retorna token mock.
    
    Body (JSON):
      { "username": "user", "password": "pass" }
    
    Response:
      { "token": "mock-token-123", "user": {...} }
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = USERS_DB.get(username)
    if user and user['password'] == password:
        return jsonify({
            'token': 'mock-token-123',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'role': user['role']
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401


# ===================================================================
# ROTAS DE PROJETOS
# ===================================================================

@app.route('/api/projects/', methods=['POST'])
def create_project():
    """
    POST /api/projects/
    Cria novo projeto.
    
    Body (JSON):
      { "name": "Projeto X", "client": "Cliente Y", ... }
    
    Response:
      { "id": "proj-001", "name": "...", "status": "active", ... }
    """
    data = request.get_json()
    project_id = f"proj-{len(PROJECTS_DB) + 1:03d}"
    
    PROJECTS_DB[project_id] = {
        'id': project_id,
        'name': data.get('name'),
        'client': data.get('client'),
        'owner': data.get('owner'),
        'address': data.get('address'),
        'due_date': data.get('due_date'),
        'status': 'active',
        'backgroundImage': data.get('backgroundImage'),
        'backgroundType': data.get('backgroundType'),
        'backgroundSource': data.get('backgroundSource'),
        'equipments': [],
        'created_at': datetime.now().isoformat()
    }
    
    return jsonify({
        'id': project_id,
        'name': PROJECTS_DB[project_id]['name'],
        'client': PROJECTS_DB[project_id]['client'],
        'owner': PROJECTS_DB[project_id]['owner'],
        'address': PROJECTS_DB[project_id]['address'],
        'due_date': PROJECTS_DB[project_id]['due_date'],
        'status': PROJECTS_DB[project_id]['status'],
        'backgroundImage': PROJECTS_DB[project_id]['backgroundImage'],
        'backgroundType': PROJECTS_DB[project_id]['backgroundType'],
        'backgroundSource': PROJECTS_DB[project_id]['backgroundSource']
    }), 201


@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """
    GET /api/projects/{project_id}
    Retorna dados de um projeto específico.
    """
    if project_id in PROJECTS_DB:
        proj = PROJECTS_DB[project_id]
        return jsonify({
            'id': proj['id'],
            'name': proj['name'],
            'client': proj['client'],
            'owner': proj['owner'],
            'address': proj['address'],
            'due_date': proj['due_date'],
            'status': proj['status'],
            'backgroundImage': proj.get('backgroundImage'),
            'backgroundType': proj.get('backgroundType'),
            'backgroundSource': proj.get('backgroundSource')
        })
    
    return jsonify({
        'id': project_id,
        'name': 'Projeto não encontrado',
        'client': '',
        'owner': '',
        'address': '',
        'due_date': '',
        'status': 'missing',
        'backgroundImage': None,
        'backgroundType': None,
        'backgroundSource': None
    })


@app.route('/api/projects/<project_id>/layout', methods=['PUT'])
def save_project_layout(project_id):
    """
    PUT /api/projects/{project_id}/layout
    Salva layout de equipamentos do projeto.
    
    Body (JSON):
      { "equipments": [ {...}, {...} ] }
    """
    data = request.get_json()
    equipments = data.get('equipments', [])
    
    if project_id in PROJECTS_DB:
        PROJECTS_DB[project_id]['equipments'] = equipments
    
    return jsonify({
        'success': True,
        'project_id': project_id,
        'equipments_count': len(equipments),
        'message': 'Layout saved successfully'
    })


@app.route('/api/projects/<project_id>/layout', methods=['GET'])
def get_project_layout(project_id):
    """
    GET /api/projects/{project_id}/layout
    Retorna layout de equipamentos do projeto.
    """
    if project_id in PROJECTS_DB:
        project = PROJECTS_DB[project_id]
        return jsonify({
            'project_id': project_id,
            'name': project.get('name'),
            'client': project.get('client'),
            'owner': project.get('owner'),
            'address': project.get('address'),
            'due_date': project.get('due_date'),
            'equipments': project.get('equipments', []),
            'backgroundImage': project.get('backgroundImage')
        })
    
    return jsonify({
        'project_id': project_id,
        'name': 'Projeto sem nome',
        'client': '',
        'owner': '',
        'address': '',
        'due_date': '',
        'equipments': [],
        'backgroundImage': None
    })


# ===================================================================
# ROTAS DE ASSETS (catálogo de equipamentos)
# ===================================================================

@app.route('/api/assets/', methods=['GET'])
def get_assets():
    """
    GET /api/assets/
    Retorna lista de equipamentos disponíveis.
    """
    return jsonify({
        'assets': [
            {
                'id': 1,
                'type': 'camera',
                'brand': 'AXIS',
                'model': 'M3004-V',
                'location': 'Entrance'
            },
            {
                'id': 2,
                'type': 'camera',
                'brand': 'Hikvision',
                'model': 'DS-2CD2143G0-I',
                'location': 'Hallway'
            },
            {
                'id': 3,
                'type': 'network_device',
                'brand': 'TP-Link',
                'model': 'TL-SG2218',
                'location': 'Server Room'
            }
        ]
    })


# ===================================================================
# ROTAS DE STATUS
# ===================================================================

@app.route('/api', methods=['GET'])
@app.route('/api/', methods=['GET'])
def api_status():
    """Status da API"""
    return jsonify({
        'ok': True,
        'msg': 'Unifique PDP API (Python/Flask)',
        'version': '0.1.0',
        'projects_count': len(PROJECTS_DB)
    })


# ===================================================================
# SERVIR FRONTEND (SPA)
# ===================================================================

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """
    Serve a interface web.
    Fallback para index.html (SPA routing).
    """
    # Caminho dos arquivos estáticos
    frontend_dist = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist')
    
    # Se o arquivo existe, serve diretamente
    if path and os.path.exists(os.path.join(frontend_dist, path)):
        return send_from_directory(frontend_dist, path)
    
    # Se é uma pasta 'assets', serve dela
    if path.startswith('assets/'):
        return send_from_directory(frontend_dist, path)
    
    # Caso contrário, serve index.html (SPA)
    index_path = os.path.join(frontend_dist, 'index.html')
    if os.path.exists(index_path):
        return send_file(index_path)
    
    return jsonify({
        'error': 'Interface não encontrada'
    }), 404


# ===================================================================
# ENTRYPOINT
# ===================================================================

if __name__ == '__main__':
    port = int(os.getenv('PORT', 4000))
    print(f"\n🚀 Unifique PDP rodando em http://127.0.0.1:{port}")
    print(f"   API: http://127.0.0.1:{port}/api")
    print(f"   Frontend: http://127.0.0.1:{port}/\n")
    
    # Modo debug apenas em desenvolvimento
    app.run(host='0.0.0.0', port=port, debug=True)
