import os
from email.message import EmailMessage

import aiosmtplib
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


async def send_email(
    to: str,
    subject: str,
    body: str,
    attachment: UploadFile | None = None,
):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        raise Exception(
            "SMTP credentials not found in .env"
        )

    message = EmailMessage()

    message["From"] = SMTP_EMAIL
    message["To"] = to
    message["Subject"] = subject
    message["Reply-To"] = SMTP_EMAIL

    message.set_content(body)

    # Attach uploaded file
    if attachment:

        file_data = await attachment.read()

        content_type = (
            attachment.content_type
            or "application/octet-stream"
        )

        maintype, subtype = content_type.split("/", 1)

        message.add_attachment(
            file_data,
            maintype=maintype,
            subtype=subtype,
            filename=attachment.filename,
        )

    response = await aiosmtplib.send(
        message,
        hostname=SMTP_SERVER,
        port=SMTP_PORT,
        start_tls=True,
        username=SMTP_EMAIL,
        password=SMTP_PASSWORD,
    )

    return response