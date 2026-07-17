from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from app.services.facebook_service import FacebookService

router = APIRouter(
    prefix="/facebook",
    tags=["Facebook"],
)


@router.get("/login")
def facebook_login():
    return RedirectResponse(
        FacebookService.get_login_url()
    )


@router.get("/callback")
async def facebook_callback(code: str | None = None):

    if not code:
        raise HTTPException(
            status_code=400,
            detail="Authorization code not received."
        )

    return {
        "message": "Facebook authorization successful",
        "code": code
    }