from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class PaymentCreate(BaseModel):
    organization_id: int
    invoice_id: int

    amount: float

    payment_method: str

    transaction_id: Optional[str] = None

    payment_date: Optional[date] = None

    status: str = "PENDING"

    notes: Optional[str] = None


class PaymentResponse(BaseModel):
    id: int

    organization_id: int
    invoice_id: int

    amount: float

    payment_method: str

    transaction_id: Optional[str]

    payment_date: Optional[date]

    status: str

    notes: Optional[str]

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True