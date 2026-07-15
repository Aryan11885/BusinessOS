from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class InvoiceCreate(BaseModel):

    organization_id: int
    customer_id: int
    project_id: int

    invoice_number: str

    invoice_date: Optional[date] = None
    due_date: Optional[date] = None
    delivery_date: Optional[date] = None

    payment_mode: Optional[str] = None
    reverse_charge: str = "No"

    buyer_order_number: Optional[str] = None
    supplier_reference: Optional[str] = None
    vehicle_number: Optional[str] = None
    transport_details: Optional[str] = None
    terms_of_delivery: Optional[str] = None

    subtotal: float = 0
    tax: float = 0

    cgst: float = 0
    sgst: float = 0
    igst: float = 0

    freight_charge: float = 0
    packing_charge: float = 0
    round_off: float = 0

    total_amount: float = 0

    declaration: Optional[str] = None
    notes: Optional[str] = None

    status: str = "DRAFT"


class InvoiceResponse(BaseModel):

    id: int

    organization_id: int
    customer_id: int
    project_id: int

    invoice_number: str

    invoice_date: Optional[date]
    due_date: Optional[date]
    delivery_date: Optional[date]

    payment_mode: Optional[str]
    reverse_charge: str

    buyer_order_number: Optional[str]
    supplier_reference: Optional[str]
    vehicle_number: Optional[str]
    transport_details: Optional[str]
    terms_of_delivery: Optional[str]

    subtotal: float
    tax: float

    cgst: float
    sgst: float
    igst: float

    freight_charge: float
    packing_charge: float
    round_off: float

    total_amount: float

    declaration: Optional[str]
    notes: Optional[str]

    status: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True