from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class InvoiceCreate(BaseModel):
    organization_id: int
    customer_id: int
    project_id: int

    invoice_number: str

    amount: float
    tax: float = 0
    total_amount: float

    status: str = "DRAFT"

    due_date: Optional[date] = None
    notes: Optional[str] = None


class InvoiceResponse(BaseModel):
    id: int

    organization_id: int
    customer_id: int
    project_id: int

    invoice_number: str

    amount: float
    tax: float
    total_amount: float

    status: str

    due_date: Optional[date]
    notes: Optional[str]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True