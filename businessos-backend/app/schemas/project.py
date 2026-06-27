from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProjectCreate(BaseModel):
    organization_id: int
    customer_id: int

    name: str
    description: Optional[str] = None

    status: str = "NOT_STARTED"
    progress: int = 0


class ProjectResponse(BaseModel):
    id: int

    organization_id: int
    customer_id: int

    name: str
    description: Optional[str]

    status: str
    progress: int

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True