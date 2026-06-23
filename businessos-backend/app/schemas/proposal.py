from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProposalCreate(BaseModel):
    organization_id: int
    opportunity_id: int

    proposal_number: str

    title: str
    description: Optional[str] = None

    amount: int

    status: str = "DRAFT"


class ProposalResponse(BaseModel):
    id: int

    organization_id: int
    opportunity_id: int

    proposal_number: str

    title: str
    description: Optional[str]

    amount: int

    status: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True