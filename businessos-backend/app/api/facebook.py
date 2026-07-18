from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse, PlainTextResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from app.db.database import get_db
from app.services.facebook_service import FacebookService
from app.services.facebook_webhook_service import FacebookWebhookService

from fastapi import Body

load_dotenv()

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
def facebook_callback(
    code: str,
    db: Session = Depends(get_db),
):
    try:
        integration = FacebookService.connect_account(
            db=db,
            organization_id=organization_id,
            user_id=user_id,
            code=code,
        )

        return {
            "success": True,
            "integration": {
                "id": integration.id,
                "facebook_user_id": integration.facebook_user_id,
                "page_id": integration.page_id,
                "page_name": integration.page_name,
                "is_connected": integration.is_connected,
            },
        }

    except Exception as e:
        import traceback

        traceback.print_exc()

        return {
            "success": False,
            "error": str(e),
        }


@router.get("/webhook")
def verify_webhook(
    hub_mode: str = None,
    hub_verify_token: str = None,
    hub_challenge: str = None,
):
    verify_token = os.getenv("FACEBOOK_VERIFY_TOKEN")

    if (
        hub_mode == "subscribe"
        and hub_verify_token == verify_token
    ):
        return PlainTextResponse(hub_challenge)

    raise HTTPException(
        status_code=403,
        detail="Webhook verification failed",
    )


@router.post("/webhook")
async def receive_webhook(
    request: Request,
    db: Session = Depends(get_db),
):
    payload = await request.json()

    FacebookWebhookService.process_event(
        payload,
        db,
    )

    return {
        "status": "received"
    }

@router.post("/webhook-test")
async def webhook_test(
    payload: dict = Body(...),
    db: Session = Depends(get_db),
):
    FacebookWebhookService.process_event(
        payload,
        db,
    )

    return {
        "status": "received"
    }