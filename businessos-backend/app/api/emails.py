from fastapi import (
    APIRouter,
    HTTPException,
    UploadFile,
    File,
    Form,
)

from app.services.gmail_service import GmailService

router = APIRouter(
    prefix="/emails",
    tags=["Emails"],
)

gmail = GmailService()


@router.post("/send")
async def send_email_route(
    to: str = Form(...),
    subject: str = Form(...),
    body: str = Form(...),
    attachment: UploadFile | None = File(None),
):
    try:

        response = await gmail.send_email(
            to=to,
            subject=subject,
            body=body,
            attachment=attachment,
        )

        return response

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )