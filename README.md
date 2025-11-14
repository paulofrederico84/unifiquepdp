# Unifique PDP - Sistema de Projetos CFTV

Sistema completo para design e gerenciamento de projetos de CFTV e redes, com editor visual drag-and-drop, integração Google Maps e geração de relatórios.

---

## 📋 Requisitos

- **Python 3.10+** (backend)
- **Node.js 18+** (build do frontend)
- **Google Maps API Key** (para autocomplete de endereços)

---

## 🚀 Instalação e Configuração

### 1. Backend (Python/Starlette)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### 2. Frontend (React/Vite)

```bash
cd frontend
npm install
```

### 3. Configurar Google Maps API

1. Crie/ative uma chave no [Google Cloud Console](https://console.cloud.google.com):
   - Ative: **Maps JavaScript API** e **Places API**
   - Restrições de referenciador: `http://127.0.0.1:*`, `http://localhost:*`
   - Copie a chave gerada

2. Crie o arquivo `frontend/.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
   ```

---

## ▶️ Como Executar

### Desenvolvimento (Frontend HMR + Backend separado)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
# Roda em http://127.0.0.1:4000
```

**Terminal 2 - Frontend (dev server):**
```bash
cd frontend
npm run dev
# Roda em http://127.0.0.1:5173
```

---

### Produção (Backend serve frontend buildado)

**Passo 1 - Build do frontend:**
```bash
cd frontend
npm run build
# Gera frontend/dist/
```

**Passo 2 - Rodar backend (serve API + frontend):**
```bash
cd backend
source venv/bin/activate
python main.py
```

**Acesse:** http://127.0.0.1:4000

---

## 📁 Estrutura do Projeto

```
UnifiquePDP/
├── backend/
│   ├── main.py              # Backend API + servidor de arquivos estáticos
│   ├── requirements.txt     # Dependências Python
│   └── venv/               # Ambiente virtual Python
│
├── frontend/
│   ├── src/
│   │   ├── pages/          # Dashboard, NewProject, Editor
│   │   ├── components/     # Header, Sidebar, Canvas, etc.
│   │   ├── services/       # API client (api.js)
│   │   └── styles/         # Tailwind CSS
│   ├── dist/               # Build de produção (gerado por npm run build)
│   ├── package.json        # Dependências e scripts
│   ├── vite.config.js      # Configuração Vite
│   └── .env                # Variáveis de ambiente (VITE_GOOGLE_MAPS_API_KEY)
│
└── README.md               # Este arquivo
```

---

## 🛠️ Comandos Úteis

### Frontend

```bash
cd frontend

# Desenvolvimento com hot-reload
npm run dev

# Build de produção
npm run build
```

### Backend

```bash
cd backend
source venv/bin/activate

# Rodar servidor
python main.py

# Instalar nova dependência
pip install <pacote>
pip freeze > requirements.txt
```

---

## 🌐 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Autenticar usuário

### Projetos
- `POST /api/projects/` - Criar novo projeto
- `GET /api/projects/{id}` - Obter projeto
- `PUT /api/projects/{id}/layout` - Salvar layout de equipamentos
- `GET /api/projects/{id}/layout` - Obter layout de equipamentos

### Assets
- `GET /api/assets/` - Listar equipamentos disponíveis

### Frontend
- `GET /` - SPA (React Router)
- `GET /assets/*` - Arquivos estáticos (JS, CSS, imagens)

---

## 🔧 Troubleshooting

### Erro: "Frontend build não encontrado"
```bash
cd frontend
npm run build
```

### Erro: "Connection refused" no backend
Verifique se o backend está rodando:
```bash
cd backend
source venv/bin/activate
python main.py
```

### Autocomplete do Google Maps não funciona
1. Verifique `frontend/.env` - a chave está correta?
2. No Google Cloud Console:
   - APIs ativadas: Maps JavaScript API + Places API
   - Restrições de referenciador: incluir `http://127.0.0.1:*`
3. Rebuild do frontend após alterar `.env`:
   ```bash
   cd frontend
   npm run build
   ```

### Porta 4000 já em uso
Mate processos na porta:
```bash
lsof -ti:4000 | xargs kill -9
```

Ou altere a porta no backend:
```bash
PORT=5000 python main.py
```

---

## 📦 Tecnologias Utilizadas

### Backend
- **Python 3.14**
- **Starlette** - Framework ASGI leve
- **Uvicorn** - Servidor ASGI
- **python-dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 18** - Interface
- **Vite 5** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento SPA
- **React DnD** - Drag and drop
- **Framer Motion** - Animações
- **Recharts** - Gráficos
- **react-google-autocomplete** - Autocomplete de endereços

---

## 👨‍💻 Para Desenvolvedores

### Estrutura de Código Limpo

- **Backend (`main.py`):** Organizado em seções claras com comentários descritivos
- **Frontend:** Componentes modulares, services para API
- **Sem código legado:** Removidos servidores Express e scripts obsoletos
- **Documentação inline:** Docstrings em Python, comentários em JS

### Próximos Passos

1. Implementar banco de dados (PostgreSQL/SQLite)
2. Autenticação JWT real
3. Upload de imagens de fundo
4. Geração de PDFs de relatórios
5. Deploy (Docker + Railway/Render)

---

## 📄 Licença

Propriedade da Unifique - Uso interno.

---

**Desenvolvido com ❤️ pela equipe Unifique**
