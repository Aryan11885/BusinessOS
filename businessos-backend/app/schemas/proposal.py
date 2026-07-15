from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class ProposalCreate(BaseModel):
    organization_id: int
    opportunity_id: int

    proposal_number: str

    proposal_date: Optional[date] = None
    valid_until: Optional[date] = None

    title: str
    description: Optional[str] = None

    terms_conditions: Optional[str] = None
    notes: Optional[str] = None

    subtotal: float = 0
    discount: float = 0
    tax: float = 0
    total_amount: float = 0

    status: str = "DRAFT"


class ProposalResponse(BaseModel):
    id: int

    organization_id: int
    opportunity_id: int

    proposal_number: str

    proposal_date: Optional[date]
    valid_until: Optional[date]

    title: str
    description: Optional[str]

    terms_conditions: Optional[str]
    notes: Optional[str]

    subtotal: float
    discount: float
    tax: float
    total_amount: float

    status: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True