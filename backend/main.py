"""
Unifique PDP - Backend API
===========================
Backend em Python/Starlette que serve:
1. API REST em /api/* (projetos, autenticação, assets)
2. Frontend React buildado (SPA servido como arquivos estáticos)

Estrutura:
- /api/auth/login -> autenticação
- /api/projects/* -> CRUD de projetos
- /api/assets/* -> catálogo de equipamentos
- /* -> fallback para index.html do frontend (SPA)
"""

from starlette.applications import Starlette
from starlette.responses import JSONResponse, FileResponse
from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente (.env)
load_dotenv()

# Armazenamento em memória para projetos (temporário - substituir por banco de dados)
PROJECTS_DB = {}

# ===================================================================
# AUTH ENDPOINTS
# ===================================================================

async def login(request):
    """
    POST /api/auth/login
    Autentica usuário e retorna token mock.
    
    Body (JSON):
      { "username": "user", "password": "pass" }
    
    Response:
      { "token": "mock-token-123", "user": {...} }
    """
    try:
        data = await request.json()
        username = data.get("username")
        password = data.get("password")
        
        if username and password:
            return JSONResponse({
                "token": "mock-token-123",
                "user": {"id": 1, "username": username}
            })
        return JSONResponse({"error": "Invalid credentials"}, status_code=401)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

auth_routes = [
    Route("/login", login, methods=["POST"]),
]


# ===================================================================
# PROJECT ENDPOINTS
# ===================================================================

async def create_project(request):
    """
    POST /api/projects/
    Cria novo projeto.
    
    Body (JSON):
      { "name": "Projeto X", "client": "Cliente Y", "backgroundImage": "data:image/png;base64,...", ... }
    
    Response:
      { "id": "proj-001", "name": "...", "status": "active", "backgroundImage": "..." }
    """
    try:
        data = await request.json()
        project_id = f"proj-{len(PROJECTS_DB) + 1:03d}"
        
        # Salvar projeto no "banco de dados" (em memória)
        PROJECTS_DB[project_id] = {
            "id": project_id,
            "name": data.get("name"),
            "client": data.get("client"),
            "owner": data.get("owner"),
            "address": data.get("address"),
            "due_date": data.get("due_date"),
            "status": "active",
            "backgroundImage": data.get("backgroundImage"),
            "backgroundType": data.get("backgroundType"),
            "backgroundSource": data.get("backgroundSource"),
            "equipments": []
        }
        
        return JSONResponse({
            "id": project_id,
            "name": PROJECTS_DB[project_id]["name"],
            "client": PROJECTS_DB[project_id]["client"],
            "owner": PROJECTS_DB[project_id]["owner"],
            "address": PROJECTS_DB[project_id]["address"],
            "due_date": PROJECTS_DB[project_id]["due_date"],
            "status": PROJECTS_DB[project_id]["status"],
            "backgroundImage": PROJECTS_DB[project_id]["backgroundImage"],
            "backgroundType": PROJECTS_DB[project_id]["backgroundType"],
            "backgroundSource": PROJECTS_DB[project_id]["backgroundSource"]
        }, status_code=201)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

async def get_project(request):
    """
    GET /api/projects/{project_id}
    Retorna dados de um projeto específico incluindo imagem de fundo.
    """
    project_id = request.path_params.get("project_id")
    if project_id in PROJECTS_DB:
        proj = PROJECTS_DB[project_id]
        return JSONResponse({
            "id": proj["id"],
            "name": proj["name"],
            "client": proj["client"],
            "owner": proj["owner"],
            "address": proj["address"],
            "due_date": proj["due_date"],
            "status": proj["status"],
            "backgroundImage": proj["backgroundImage"],
            "backgroundType": proj["backgroundType"],
            "backgroundSource": proj["backgroundSource"]
        })
    # Fallback se não encontrado
    return JSONResponse({
        "id": project_id,
        "name": "Projeto não encontrado",
        "client": "",
        "owner": "",
        "address": "",
        "due_date": "",
        "status": "missing",
        "backgroundImage": None,
        "backgroundType": None,
        "backgroundSource": None
    })

async def save_project_layout(request):
    """
    PUT /api/projects/{project_id}/layout
    Salva layout de equipamentos do projeto.
    
    Body (JSON):
      { "equipments": [ {...}, {...} ] }
    """
    try:
        project_id = request.path_params.get("project_id")
        data = await request.json()
        equipments = data.get("equipments", [])
        
        # Mock storage (in production, save to database)
        return JSONResponse({
            "success": True,
            "project_id": project_id,
            "equipments_count": len(equipments),
            "message": "Layout saved successfully"
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

async def get_project_layout(request):
    """
    GET /api/projects/{project_id}/layout
    Retorna layout de equipamentos do projeto incluindo imagem de fundo.
    """
    project_id = request.path_params.get("project_id")
    
    # Buscar do "banco de dados" em memória
    if project_id in PROJECTS_DB:
        project = PROJECTS_DB[project_id]
        return JSONResponse({
            "project_id": project_id,
            "name": project.get("name"),
            "client": project.get("client"),
            "owner": project.get("owner"),
            "address": project.get("address"),
            "due_date": project.get("due_date"),
            "equipments": project.get("equipments", []),
            "backgroundImage": project.get("backgroundImage")
        })
    
    # Se não encontrado, retornar vazio (mock)
    return JSONResponse({
        "project_id": project_id,
        "name": "Projeto sem nome",
        "client": "",
        "owner": "",
        "address": "",
        "due_date": "",
        "equipments": [],
        "backgroundImage": None
    })

projects_routes = [
    Route("/", create_project, methods=["POST"]),
    Route("/{project_id}", get_project, methods=["GET"]),
    Route("/{project_id}/layout", save_project_layout, methods=["PUT"]),
    Route("/{project_id}/layout", get_project_layout, methods=["GET"]),
]


# ===================================================================
# ASSETS ENDPOINTS (catálogo de equipamentos)
# ===================================================================

async def get_assets(request):
    """
    GET /api/assets/
    Retorna lista de equipamentos disponíveis (câmeras, switches, etc).
    """
    return JSONResponse({
        "assets": [
            {
                "id": 1,
                "type": "camera",
                "brand": "AXIS",
                "model": "M3004-V",
                "location": "Entrance"
            },
            {
                "id": 2,
                "type": "camera",
                "brand": "Hikvision",
                "model": "DS-2CD2143G0-I",
                "location": "Hallway"
            },
            {
                "id": 3,
                "type": "network_device",
                "brand": "TP-Link",
                "model": "TL-SG2218",
                "location": "Server Room"
            }
        ]
    })

assets_routes = [
    Route("/", get_assets, methods=["GET"]),
]


# ===================================================================
# CONFIGURAÇÃO DO APP
# ===================================================================

# Rotas da API (prefixadas com /api para não conflitar com assets do frontend)
api_routes = [
    Route("/", endpoint=lambda r: JSONResponse({
        "ok": True,
        "msg": "Unifique PDP API (Python/Starlette)",
        "version": "0.1.0"
    }), methods=["GET"]),
    Mount("/auth", routes=auth_routes),
    Mount("/projects", routes=projects_routes),
    Mount("/assets", routes=assets_routes),
]

# Caminhos do build do frontend (gerado por npm run build)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.normpath(os.path.join(BASE_DIR, "..", "frontend", "dist"))
FRONTEND_ASSETS = os.path.join(FRONTEND_DIST, "assets")

def spa_index(_request):
    """
    Fallback para Single Page Application (React Router).
    Serve index.html para todas as rotas não-API.
    """
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return JSONResponse({
        "error": "Frontend build não encontrado. Execute 'npm run build' em frontend/"
    }, status_code=404)

# Rotas principais
routes = [
    Mount("/api", routes=api_routes),  # API REST
]

# Servir assets estáticos do build (JS, CSS, imagens)
if os.path.isdir(FRONTEND_ASSETS):
    routes.append(Mount("/assets", app=StaticFiles(directory=FRONTEND_ASSETS), name="assets"))

# Fallback SPA: qualquer rota não-API retorna index.html
routes.append(Route("/", endpoint=spa_index, methods=["GET"]))
routes.append(Route("/{path:path}", endpoint=spa_index, methods=["GET"]))

# Criar app Starlette
app = Starlette(routes=routes)

# Adicionar CORS (permitir requisições do frontend durante dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===================================================================
# ENTRYPOINT
# ===================================================================

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 4000))
    print(f"\n🚀 Unifique PDP rodando em http://127.0.0.1:{port}")
    print(f"   API: http://127.0.0.1:{port}/api")
    print(f"   Frontend: http://127.0.0.1:{port}/\n")
    uvicorn.run(app, host="0.0.0.0", port=port)
