import os
import base64

import resend
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email(
    to: str,
    subject: str,
    body: str,
    attachment: UploadFile | None = None,
):
    if not resend.api_key:
        raise Exception("RESEND_API_KEY not found")

    attachments = []

    if attachment:

        file_bytes = attachment.file.read()

        attachments.append(
            {
                "filename": attachment.filename,
                "content": base64.b64encode(file_bytes).decode(),
            }
        )

    params = {
        "from": "BusinessOS <onboarding@resend.dev>",
        "to": [to],
        "subject": subject,
        "html": f"""
        <div style="font-family:Arial,sans-serif;">
            {body.replace(chr(10), "<br>")}
        </div>
        """,
    }

    if attachments:
        params["attachments"] = attachments

    response = resend.Emails.send(params)

    return response