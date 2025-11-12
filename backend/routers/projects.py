from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ProjectCreate(BaseModel):
    name: str
    client: Optional[str] = None
    owner: Optional[str] = None
    address: Optional[str] = None
    due_date: Optional[str] = None

@router.post("/")
def create_project(project: ProjectCreate):
    return {"id": "mock-project-id", **project.dict()}

@router.get("/{project_id}")
def get_project(project_id: str):
    return {"id": project_id, "name": "Mock Project"}
