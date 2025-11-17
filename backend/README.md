# Unifique PDP - Backend

API backend em Python com Flask.

## Setup

```bash
# Criar virtual environment
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt
```

## Rodar

```bash
# Desenvolvimento (com reload automático)
python app.py

# Ou usando o script run.py
python run.py
```

Servidor estará em: http://localhost:4000

## Rotas da API

- `GET /api` — Status da API
- `POST /api/auth/login` — Autenticação
- `POST /api/projects/` — Criar projeto
- `GET /api/projects/{id}` — Obter projeto
- `PUT /api/projects/{id}/layout` — Salvar layout
- `GET /api/projects/{id}/layout` — Obter layout
- `GET /api/assets/` — Listar equipamentos

## Estrutura

```
backend/
├── app.py              # Aplicação Flask principal
├── run.py              # Script de inicialização
├── requirements.txt    # Dependências Python
└── venv/              # Ambiente virtual (não commitar)
```
