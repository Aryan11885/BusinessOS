import base64
import mimetypes
import os

from email.message import EmailMessage

from fastapi import UploadFile

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from app.services.gmail_auth import get_credentials
from google.auth.transport.requests import Request


class GmailService:

    def __init__(self):
        credentials = get_credentials()

        if not credentials.valid:
            credentials.refresh(Request())

        self.service = build(
            "gmail",
            "v1",
            credentials=credentials,
        )

    def _create_message(
        self,
        to: str,
        subject: str,
        body: str,
    ) -> EmailMessage:

        message = EmailMessage()

        message["To"] = to
        message["Subject"] = subject

        # Plain text version
        message.set_content(body)

        # HTML version
        message.add_alternative(
            f"""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <p>{body.replace(chr(10), "<br>")}</p>
                </body>
            </html>
            """,
            subtype="html",
        )

        return message

    def _encode_message(
        self,
        message: EmailMessage,
    ):

        raw = base64.urlsafe_b64encode(
            message.as_bytes()
        ).decode()

        return {
            "raw": raw
        }
    
    async def _add_attachment(
        self,
        message: EmailMessage,
        attachment: UploadFile | None,
    ):
        if not attachment:
            return

        file_bytes = await attachment.read()

        content_type = (
            attachment.content_type
            or mimetypes.guess_type(attachment.filename)[0]
            or "application/octet-stream"
        )

        maintype, subtype = content_type.split("/", 1)

        message.add_attachment(
            file_bytes,
            maintype=maintype,
            subtype=subtype,
            filename=attachment.filename,
        )

    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        attachment: UploadFile | None = None,
    ):
        message = self._create_message(
            to,
            subject,
            body,
        )

        await self._add_attachment(
            message,
            attachment,
        )
        try:
            encoded_message = self._encode_message(
                message
            )

            response = (
                self.service.users()
                .messages()
                .send(
                    userId="me",
                    body=encoded_message,
                )
                .execute()
            )

            return {
                "success": True,
                "message": "Email sent successfully",
                "gmail_message_id": response.get("id"),
            }

        except HttpError as error:

            raise Exception(
                f"Gmail API Error: {error}"
            )

        except Exception as error:

            raise Exception(
                str(error)
            )