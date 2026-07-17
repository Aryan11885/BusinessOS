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
async def facebook_callback(code: str):

    token = FacebookService.exchange_code_for_token(code)

    return token