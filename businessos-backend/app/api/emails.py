from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
)

from fastapi.responses import RedirectResponse

from app.db.database import get_db

from app.models.gmail_integration import GmailIntegration

from app.services.gmail_service import GmailService
from app.services.gmail_oauth_service import GmailOAuthService


router = APIRouter(
    prefix="/emails",
    tags=["Emails"],
)


@router.get("/login")
async def gmail_login():
    """
    Redirect user to Google's OAuth Consent Screen.
    """

    try:

        gmail_oauth = GmailOAuthService()

        oauth_data = gmail_oauth.get_login_url()

        return RedirectResponse(
            url=oauth_data["login_url"]
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/callback")
async def gmail_callback(
    code: str = Query(...),
    state: str | None = Query(None),
    db: Session = Depends(get_db),
):
    """
    Google OAuth callback endpoint.
    """

    try:

        gmail_oauth = GmailOAuthService()

        token_data = gmail_oauth.exchange_code_for_token(
            code
        )

        access_token = token_data.get(
            "access_token"
        )

        refresh_token = token_data.get(
            "refresh_token"
        )

        if not access_token:

            raise HTTPException(
                status_code=400,
                detail="Access token not received from Google.",
            )

        user_info = gmail_oauth.get_user_info(
            access_token
        )

        organization_id = 1
        user_id = 1
        gmail_integration = (
            db.query(GmailIntegration)
            .filter(
                GmailIntegration.organization_id == organization_id,
                GmailIntegration.user_id == user_id,
            )
            .first()
        )

        if gmail_integration:

            gmail_integration.gmail_email = user_info.get(
                "email"
            )

            gmail_integration.gmail_name = user_info.get(
                "name"
            )

            if refresh_token:

                gmail_integration.refresh_token = (
                    refresh_token
                )

            gmail_integration.access_token = access_token

            gmail_integration.token_type = token_data.get(
                "token_type"
            )

            gmail_integration.scope = token_data.get(
                "scope"
            )

            gmail_integration.expires_in = token_data.get(
                "expires_in"
            )

            gmail_integration.is_connected = True

        else:

            if not refresh_token:

                raise HTTPException(
                    status_code=400,
                    detail=(
                        "Google did not return a refresh "
                        "token. Please disconnect the app "
                        "from your Google Account and "
                        "connect again."
                    ),
                )

            gmail_integration = GmailIntegration(

                organization_id=organization_id,

                user_id=user_id,

                gmail_email=user_info.get(
                    "email"
                ),

                gmail_name=user_info.get(
                    "name"
                ),

                refresh_token=refresh_token,

                access_token=access_token,

                token_type=token_data.get(
                    "token_type"
                ),

                scope=token_data.get(
                    "scope"
                ),

                expires_in=token_data.get(
                    "expires_in"
                ),

                is_connected=True,
            )

            db.add(
                gmail_integration
            )

        db.commit()

        db.refresh(
            gmail_integration
        )
        return {
            "success": True,
            "message": "Gmail account connected successfully.",
            "data": {
                "organization_id": gmail_integration.organization_id,
                "user_id": gmail_integration.user_id,
                "gmail_email": gmail_integration.gmail_email,
                "gmail_name": gmail_integration.gmail_name,
                "is_connected": gmail_integration.is_connected,
                "scope": gmail_integration.scope,
            },
        }

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Gmail connection failed: {str(e)}",
        )
    
@router.post("/send")
async def send_email_route(
    recipient_email: str = Form(...),
    subject: str = Form(...),
    body: str = Form(...),
    attachments: list[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    """
    Send an email using the connected Gmail account.
    """

    try:

        organization_id = 1
        user_id = 1

        gmail_integration = (
            db.query(GmailIntegration)
            .filter(
                GmailIntegration.organization_id == organization_id,
                GmailIntegration.user_id == user_id,
                GmailIntegration.is_connected == True,
            )
            .first()
        )

        if not gmail_integration:

            raise HTTPException(
                status_code=404,
                detail="No Gmail account connected.",
            )

        gmail_service = GmailService(
            db=db,
            organization_id=organization_id,
            user_id=user_id,
        )

        response = await gmail_service.send_email(
            
            recipient_email=recipient_email,
            subject=subject,
            body=body,
            attachments=attachments,
        )

        return {
            "success": True,
            "message": "Email sent successfully.",
            "data": response,
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}",
        )
    
@router.get("/connection-status")
async def gmail_connection_status(
    db: Session = Depends(get_db),
):
    """
    Check whether a Gmail account is connected.
    """

    try:

        organization_id = 1
        user_id = 1

        gmail_integration = (
            db.query(GmailIntegration)
            .filter(
                GmailIntegration.organization_id == organization_id,
                GmailIntegration.user_id == user_id,
            )
            .first()
        )

        if not gmail_integration:

            return {
                "success": True,
                "connected": False,
                "data": None,
            }

        return {
            "success": True,
            "connected": gmail_integration.is_connected,
            "data": {
                "gmail_email": gmail_integration.gmail_email,
                "gmail_name": gmail_integration.gmail_name,
            },
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to get Gmail connection status: {str(e)}",
        )