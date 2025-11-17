#!/usr/bin/env bash
# Quick Start - Unifique PDP

echo "🚀 Unifique PDP - Quick Start"
echo "================================"
echo ""

# Verificar se venv existe
if [ ! -d "backend/venv" ]; then
    echo "⚠️  Ambiente virtual não encontrado."
    echo "📦 Executando setup inicial..."
    python3 setup.py
    
    if [ $? -ne 0 ]; then
        echo "❌ Setup falhou. Execute manualmente: python3 setup.py"
        exit 1
    fi
fi

echo ""
echo "✅ Tudo pronto!"
echo "🚀 Iniciando servidor..."
echo ""

cd backend
source venv/bin/activate
python app.py
