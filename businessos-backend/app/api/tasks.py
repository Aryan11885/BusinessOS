from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.task import TaskCreate

from app.services.task_service import TaskService

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post("/")
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db)
):
    task = TaskService.create_task(
        db,
        payload
    )

    return {
        "message": "Task created successfully",
        "id": task.id
    }


@router.get("/")
def get_tasks(
    db: Session = Depends(get_db)
):
    return TaskService.get_tasks(db)


@router.get("/{task_id}")
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = TaskService.get_task(
        db,
        task_id
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}")
def update_task(
    task_id: int,
    payload: TaskCreate,
    db: Session = Depends(get_db)
):
    task = TaskService.update_task(
        db,
        task_id,
        payload
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {
        "message": "Task updated successfully"
    }


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    deleted = TaskService.delete_task(
        db,
        task_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {
        "message": "Task deleted successfully"
    }