from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProposalItemCreate(BaseModel):

    proposal_id: int

    item_name: str

    description: Optional[str] = None

    quantity: float = 1

    unit: str = "Nos"

    unit_price: float = 0

    discount: float = 0

    tax_percentage: float = 0

    line_total: float | None = None


class ProposalItemResponse(BaseModel):

    id: int

    proposal_id: int

    item_name: str

    description: Optional[str]

    quantity: float

    unit: str

    unit_price: float

    discount: float

    tax_percentage: float

    line_total: float

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True