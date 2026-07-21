import base64
import mimetypes
import os

from email.message import EmailMessage

from fastapi import UploadFile

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from sqlalchemy.orm import Session

from app.services.gmail_auth import (
    get_credentials,
)

class GmailService:

    def __init__(
        self,
        db: Session,
        organization_id: int,
        user_id: int,
    ):

        credentials = get_credentials(
            db=db,
            organization_id=organization_id,
            user_id=user_id,
        )

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

        message.set_content(body)

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
    ) -> dict:

        raw = base64.urlsafe_b64encode(
            message.as_bytes()
        ).decode()

        return {
            "raw": raw,
        }

    async def _add_uploaded_attachment(
        self,
        message: EmailMessage,
        attachment: UploadFile,
    ):

        file_bytes = await attachment.read()

        content_type = (
            attachment.content_type
            or mimetypes.guess_type(
                attachment.filename
            )[0]
            or "application/octet-stream"
        )

        maintype, subtype = content_type.split("/", 1)

        message.add_attachment(
            file_bytes,
            maintype=maintype,
            subtype=subtype,
            filename=attachment.filename,
        )

    def _add_file_attachment(
        self,
        message: EmailMessage,
        file_path: str,
    ):

        if not os.path.exists(file_path):

            raise FileNotFoundError(
                file_path
            )

        with open(
            file_path,
            "rb",
        ) as file:

            file_bytes = file.read()

        content_type = (
            mimetypes.guess_type(
                file_path
            )[0]
            or "application/octet-stream"
        )

        maintype, subtype = content_type.split("/", 1)

        message.add_attachment(
            file_bytes,
            maintype=maintype,
            subtype=subtype,
            filename=os.path.basename(
                file_path
            ),
        )

    async def send_email(
        self,
        recipient_email: str,
        subject: str,
        body: str,
        attachments: list[UploadFile] | None = None,
        file_paths: list[str] | None = None,
    ) -> dict:
        """
        Send an email using the authenticated Gmail account.
        """

        message = self._create_message(
            to=recipient_email,
            subject=subject,
            body=body,
        )

        if attachments:

            for attachment in attachments:

                await self._add_uploaded_attachment(
                    message=message,
                    attachment=attachment,
                )

        if file_paths:

            for file_path in file_paths:

                self._add_file_attachment(
                    message=message,
                    file_path=file_path,
                )

        encoded_message = self._encode_message(
            message
        )
        try:

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
                "message": "Email sent successfully.",
                "gmail_message_id": response.get("id"),
                "gmail_thread_id": response.get("threadId"),
            }

        except HttpError as error:

            raise Exception(
                f"Gmail API Error: {error}"
            )

        except Exception as error:

            raise Exception(
                f"Failed to send email: {str(error)}"
            )