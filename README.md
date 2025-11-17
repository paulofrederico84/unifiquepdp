# Unifique PDP - Sistema de Projetos CFTV

Sistema completo para design e gerenciamento de projetos de CFTV e redes, com editor visual drag-and-drop, integração Google Maps e geração de relatórios.

---

## 📋 Requisitos

- **Python 3.10+**
- **Google Maps API Key** (opcional - para autocomplete de endereços)

---

## 🚀 Instalação

### Setup Automático (Recomendado)

```bash
python3 setup.py
```

### Setup Manual

```bash
# 1. Criar ambiente virtual
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# ou: venv\Scripts\activate  # Windows

# 2. Instalar dependências
pip install -r requirements.txt
```

### 3. Configurar Google Maps API (Opcional)

Crie o arquivo `backend/.env` com sua chave da API:
```
GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

Para obter a chave, acesse [Google Cloud Console](https://console.cloud.google.com) e ative **Maps JavaScript API** e **Places API**.

---

## ▶️ Como Executar

### Usando o script de inicialização

```bash
./start.sh
```

### Manualmente

```bash
cd backend
source venv/bin/activate
python app.py
```

**Acesse:** http://127.0.0.1:4000

---

## 📁 Estrutura do Projeto

```
UnifiquePDP/
├── backend/
│   ├── app.py              # Aplicação Flask principal
│   ├── run.py              # Script de inicialização
│   ├── requirements.txt    # Dependências Python
│   └── venv/              # Ambiente virtual Python
│
├── frontend/              # Interface web
│   └── static/           # Arquivos estáticos (CSS, JS, imagens)
│
├── setup.py              # Script de configuração inicial
├── start.sh              # Script de inicialização rápida
└── README.md            # Este arquivo
```

---

## 🛠️ Comandos Úteis

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

### Status
- `GET /api` - Status da API

---

## 🔧 Troubleshooting

### Erro: "Frontend build não encontrado"
```bash
python3 build_frontend.py
# Ou manualmente:
cd frontend && npm run build
```

### Erro: "Módulo flask não encontrado"
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
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
```bash
# Verificar processo usando a porta
lsof -ti:4000

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

## 📦 Tecnologias

- **Python 3.10+** - Linguagem principal
- **Flask** - Framework web
- **Flask-CORS** - Suporte CORS
- **python-dotenv** - Gerenciamento de variáveis de ambiente

---

## 👨‍💻 Desenvolvimento

### Arquitetura

O projeto utiliza Flask para servir tanto a API REST quanto a interface web. A aplicação é organizada de forma modular com separação clara entre rotas, lógica de negócio e apresentação.

### Próximos Passos

1. Implementar banco de dados (PostgreSQL/SQLite)
2. Autenticação JWT
3. Sistema de relatórios
4. Exportação PDF/Excel
5. Deploy em produção

---

## 📄 Licença

Propriedade da Unifique - Uso interno.

---

**Desenvolvido pela equipe Unifique**
