from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    organization_id: int
    first_name: str
    last_name: str | None = None
    email: EmailStr
    phone: str | None = None
    password: str
    role: str


class UserResponse(BaseModel):
    id: int
    organization_id: int
    first_name: str
    last_name: str | None = None
    email: str
    phone: str | None = None
    role: str

    class Config:
        from_attributes = True