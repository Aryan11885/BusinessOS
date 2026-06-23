from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class OpportunityCreate(BaseModel):
    organization_id: int
    lead_id: int
    owner_user_id: int

    title: str
    value: int

    stage: str = "NEW"
    probability: int = 0

    expected_close_date: Optional[datetime] = None


class OpportunityResponse(BaseModel):
    id: int

    organization_id: int
    lead_id: int
    owner_user_id: int

    title: str
    value: int

    stage: str
    probability: int

    expected_close_date: Optional[datetime]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True