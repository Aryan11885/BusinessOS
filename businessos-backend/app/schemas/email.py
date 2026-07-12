from pydantic import BaseModel, EmailStr
from typing import List, Optional


class EmailRequest(BaseModel):
    to: EmailStr
    subject: str
    body: str

    cc: Optional[List[EmailStr]] = []
    bcc: Optional[List[EmailStr]] = []

    attachment_paths: Optional[List[str]] = []