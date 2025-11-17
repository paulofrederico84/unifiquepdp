#!/usr/bin/env python3
"""
Script de inicialização do Unifique PDP
Executa o servidor Flask em modo desenvolvimento
"""

from app import app
import os

if __name__ == '__main__':
    port = int(os.getenv('PORT', 4000))
    print(f"\n🚀 Unifique PDP Backend iniciando...")
    print(f"   Servidor: http://127.0.0.1:{port}")
    print(f"   API: http://127.0.0.1:{port}/api")
    print(f"   Docs: Acesse /api para status\n")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True,
        use_reloader=True
    )
