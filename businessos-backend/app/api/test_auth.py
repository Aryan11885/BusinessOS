from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/test",
    tags=["JWT Test"]
)


@router.get("/me")
def me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "organization_id": current_user.organization_id,
        "email": current_user.email,
        "role": current_user.role
    }