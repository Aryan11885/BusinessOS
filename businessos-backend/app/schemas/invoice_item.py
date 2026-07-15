from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class InvoiceItemCreate(BaseModel):

    invoice_id: int

    item_name: str

    description: Optional[str] = None

    hsn_code: Optional[str] = None

    quantity: float = 1

    unit: str = "Nos"

    rate: float = 0

    gst_percentage: float = 0

    taxable_amount: float = 0

    gst_amount: float = 0

    line_total: float = 0


class InvoiceItemResponse(BaseModel):

    id: int

    invoice_id: int

    item_name: str

    description: Optional[str]

    hsn_code: Optional[str]

    quantity: float

    unit: str

    rate: float

    gst_percentage: float

    taxable_amount: float

    gst_amount: float

    line_total: float

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True