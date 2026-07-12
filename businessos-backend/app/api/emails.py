from fastapi import (
    APIRouter,
    HTTPException,
    UploadFile,
    File,
    Form,
)

from app.services.email_service import send_email

router = APIRouter(
    prefix="/emails",
    tags=["Emails"],
)


@router.post("/send")
async def send_email_route(
    to: str = Form(...),
    subject: str = Form(...),
    body: str = Form(...),
    attachment: UploadFile | None = File(None),
):
    try:
        response = await send_email(
            to=to,
            subject=subject,
            body=body,
            attachment=attachment,
        )

        return {
            "message": "Email sent successfully",
            "smtp_response": str(response),
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )