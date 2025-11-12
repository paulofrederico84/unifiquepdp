# Unifique PDP - Backend (Python/FastAPI)

API backend em Python com FastAPI.

## Setup

```bash
# Criar virtual environment (recomendado)
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# edite .env conforme necessário
```

## Rodar

```bash
# Desenvolvimento (com reload automático)
python -m uvicorn main:app --reload --host 0.0.0.0 --port 4000

# Ou diretamente
uvicorn main:app --reload
```

Servidor estará em: http://localhost:4000
Docs automáticos (Swagger): http://localhost:4000/docs

## Rotas

- `GET /` — status API
- `POST /auth/login` — autenticação mock
- `POST /projects` — criar projeto
- `GET /projects/{id}` — obter projeto
- `GET /assets` — listar assets (câmeras, dispositivos)
