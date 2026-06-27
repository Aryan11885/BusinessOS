from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.project import (
    ProjectCreate
)

from app.services.project_service import (
    ProjectService
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/")
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db)
):
    project = ProjectService.create_project(
        db,
        payload
    )

    return {
        "message": "Project created successfully",
        "id": project.id
    }


@router.get("/")
def get_projects(
    db: Session = Depends(get_db)
):
    return ProjectService.get_projects(db)


@router.get("/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = ProjectService.get_project(
        db,
        project_id
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project

@router.put("/{project_id}")
def update_project(
    project_id: int,
    payload: ProjectCreate,
    db: Session = Depends(get_db)
):
    project = ProjectService.update_project(
        db,
        project_id,
        payload
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return {
        "message": "Project updated successfully"
    }


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    deleted = ProjectService.delete_project(
        db,
        project_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return {
        "message": "Project deleted successfully"
    }