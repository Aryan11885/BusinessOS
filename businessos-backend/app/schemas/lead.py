from pydantic import BaseModel


class LeadCreate(BaseModel):
    organization_id: int
    lead_code: str
    first_name: str
    last_name: str | None = None
    company_name: str | None = None
    email: str | None = None
    phone: str

    source_id: int
    status_id: int

    owner_user_id: int | None = None

    lead_value: float = 0

    city: str | None = None
    state: str | None = None

    remarks: str | None = None


class LeadResponse(BaseModel):
    id: int
    lead_code: str
    first_name: str
    email: str | None = None
    phone: str

    class Config:
        from_attributes = True