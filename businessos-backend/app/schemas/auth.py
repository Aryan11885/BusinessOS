from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    organization_id: int
    first_name: str
    last_name: str | None = None
    email: EmailStr
    phone: str | None = None
    password: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str