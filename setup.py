#!/usr/bin/env python3
"""
Setup completo do projeto Unifique PDP
Instala todas as dependências necessárias
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, cwd=None, description=""):
    """Executa comando e mostra progresso"""
    if description:
        print(f"\n{'='*60}")
        print(f"  {description}")
        print('='*60)
    
    try:
        subprocess.run(cmd, cwd=cwd, check=True, shell=isinstance(cmd, str))
        print(f"✅ {description or 'Comando'} concluído")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro: {e}")
        return False

def main():
    base_dir = Path(__file__).parent
    backend_dir = base_dir / 'backend'
    
    print("\n🚀 Unifique PDP - Setup Completo")
    print("="*60)
    
    # 1. Criar venv Python
    venv_dir = backend_dir / 'venv'
    if not venv_dir.exists():
        if not run_command(
            [sys.executable, '-m', 'venv', str(venv_dir)],
            description="📦 Criando ambiente virtual Python"
        ):
            return
    else:
        print("\n✅ Ambiente virtual Python já existe")
    
    # 2. Determinar comando pip do venv
    if sys.platform == 'win32':
        pip_cmd = str(venv_dir / 'Scripts' / 'pip')
        python_cmd = str(venv_dir / 'Scripts' / 'python')
    else:
        pip_cmd = str(venv_dir / 'bin' / 'pip')
        python_cmd = str(venv_dir / 'bin' / 'python')
    
    # 3. Instalar dependências Python
    if not run_command(
        [pip_cmd, 'install', '-r', 'requirements.txt'],
        cwd=backend_dir,
        description="📥 Instalando dependências Python (Flask, etc)"
    ):
        return
    
    # Sucesso!
    print("\n" + "="*60)
    print("✅ Setup concluído com sucesso!")
    print("="*60)
    print("\n📚 Próximos passos:")
    print("   1. Configure .env se necessário")
    print("   2. Execute o servidor:")
    print(f"      {python_cmd} backend/app.py")
    print("\n   Ou ative o venv e execute:")
    if sys.platform == 'win32':
        print("      backend\\venv\\Scripts\\activate")
    else:
        print("      source backend/venv/bin/activate")
    print("      python backend/app.py")
    print("\n🌐 Acesse: http://127.0.0.1:4000")

if __name__ == '__main__':
    main()
