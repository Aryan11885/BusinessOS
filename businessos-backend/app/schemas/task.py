from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    project_id: int

    title: str
    description: Optional[str] = None

    status: str = "TODO"
    priority: str = "MEDIUM"

    assignee: Optional[str] = None


class TaskResponse(BaseModel):
    id: int

    project_id: int

    title: str
    description: Optional[str]

    status: str
    priority: str

    assignee: Optional[str]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True