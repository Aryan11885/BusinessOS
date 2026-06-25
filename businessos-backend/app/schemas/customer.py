from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CustomerCreate(BaseModel):
    organization_id: int
    proposal_id: int

    company_name: str
    contact_name: str

    email: Optional[str] = None
    phone: Optional[str] = None

    status: str = "ACTIVE"


class CustomerResponse(BaseModel):
    id: int

    organization_id: int
    proposal_id: int

    company_name: str
    contact_name: str

    email: Optional[str]
    phone: Optional[str]

    status: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True