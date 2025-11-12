from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_assets():
    return [
        {"id": "a1", "type": "camera", "model": "AXIS P3225", "location": "Entrada"},
        {"id": "a2", "type": "router", "model": "TP-Link AX1500", "location": "Rack"}
    ]
