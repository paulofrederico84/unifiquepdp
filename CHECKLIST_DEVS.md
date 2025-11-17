# 📋 Guia do Desenvolvedor - Unifique PDP

## ✅ Setup Inicial

### Opção 1: Setup Automático (Recomendado)
```bash
python3 setup.py
```

### Opção 2: Quick Start
```bash
./start.sh
```

### Opção 3: Setup Manual
```bash
# Criar ambiente virtual
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🏃 Executar Projeto

```bash
cd backend
source venv/bin/activate
python app.py
```

Acesse: http://127.0.0.1:4000

---

## 📦 Estrutura do Projeto

```
UnifiquePDP/
│
├── backend/           # Aplicação Python
│   ├── app.py        # Servidor Flask principal
│   ├── run.py        # Script de inicialização
│   ├── requirements.txt
│   └── venv/         # Ambiente virtual (não commitar)
│
├── frontend/         # Interface web
│   └── static/      # Arquivos estáticos
│
├── setup.py         # Script de configuração
├── start.sh         # Script de inicialização rápida
└── README.md        # Documentação
```

---

## 🔧 Comandos Importantes

```bash
# Ativar ambiente virtual
source backend/venv/bin/activate

# Rodar servidor
python backend/app.py

# Instalar nova dependência
pip install <pacote>
pip freeze > backend/requirements.txt

# Desativar ambiente virtual
deactivate
```

---

## 🎯 Workflow de Desenvolvimento

### Modificar Backend
```bash
cd backend
source venv/bin/activate

# Edite arquivos .py
# app.py irá recarregar automaticamente (debug=True)
```

### Testar Aplicação
```bash
# Rodar servidor
cd backend
source venv/bin/activate
python app.py

# Acesse http://127.0.0.1:4000
```

---

## 🐛 Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'flask'"
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Porta 4000 já em uso
```bash
# Matar processo
lsof -ti:4000 | xargs kill -9

# Ou use porta diferente
PORT=5000 python backend/app.py
```

### Erro de permissão no start.sh
```bash
chmod +x start.sh
```

---

## 📝 Boas Práticas

### ✅ FAZER
- Sempre ativar venv antes de trabalhar
- Commitar código, NÃO commitar venv/
- Documentar novas dependências em requirements.txt
- Testar antes de commitar

### ❌ NÃO FAZER
- Não instalar pacotes Python sem venv ativado
- Não commitar arquivos .env (dados sensíveis)
- Não commitar arquivos temporários

---

## 📚 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `backend/app.py` | Aplicação Flask principal |
| `backend/requirements.txt` | Dependências Python |
| `setup.py` | Script de configuração |
| `start.sh` | Inicialização rápida |
| `.gitignore` | Arquivos ignorados pelo git |

---

**Última atualização:** 17 de novembro de 2025
