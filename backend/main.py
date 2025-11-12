from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route, Mount
from starlette.middleware.cors import CORSMiddleware
import os
import json
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# ===== ROUTERS SIMPLES (SEM PYDANTIC) =====

# Auth Router
async def login(request):
    """Login endpoint"""
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

# Projects Router
async def create_project(request):
    """Create new project"""
    try:
        data = await request.json()
        return JSONResponse({
            "id": "proj-001",
            "name": data.get("name"),
            "client": data.get("client"),
            "status": "active"
        }, status_code=201)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

async def get_project(request):
    """Get project by ID"""
    project_id = request.path_params.get("project_id")
    return JSONResponse({
        "id": project_id,
        "name": "Sample Project",
        "client": "Sample Client",
        "status": "active"
    })

projects_routes = [
    Route("/", create_project, methods=["POST"]),
    Route("/{project_id}", get_project, methods=["GET"]),
]

# Assets Router
async def get_assets(request):
    """Get available assets/equipment"""
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

# ===== APP SETUP =====

routes = [
    Route("/", endpoint=lambda r: JSONResponse({
        "ok": True,
        "msg": "Unifique PDP API (Python/Starlette)",
        "version": "0.1.0"
    }), methods=["GET"]),
    Mount("/auth", routes=auth_routes),
    Mount("/projects", routes=projects_routes),
    Mount("/assets", routes=assets_routes),
]

app = Starlette(routes=routes)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 4000))
    uvicorn.run(app, host="0.0.0.0", port=port)
