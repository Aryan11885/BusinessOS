import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

from sqlalchemy.orm import Session

from app.models.gmail_integration import GmailIntegration


SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
]


class GmailAuthService:

    def __init__(
        self,
        db: Session,
        organization_id: int,
        user_id: int,
    ):
        self.db = db
        self.organization_id = organization_id
        self.user_id = user_id

    def get_gmail_integration(
        self,
    ) -> GmailIntegration:

        gmail_integration = (
            self.db.query(GmailIntegration)
            .filter(
                GmailIntegration.organization_id == self.organization_id,
                GmailIntegration.user_id == self.user_id,
                GmailIntegration.is_connected == True,
            )
            .first()
        )

        if not gmail_integration:
            raise Exception("No Gmail account connected.")

        return gmail_integration

    def get_credentials(
        self,
    ) -> Credentials:

        gmail_integration = self.get_gmail_integration()

        credentials = Credentials(
            token=gmail_integration.access_token,
            refresh_token=gmail_integration.refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=os.getenv("GOOGLE_CLIENT_ID"),
            client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
            scopes=SCOPES,
        )

        return credentials

    def get_valid_credentials(
        self,
    ) -> Credentials:

        credentials = self.get_credentials()

        if credentials.expired and credentials.refresh_token:

            credentials.refresh(Request())

            gmail_integration = self.get_gmail_integration()

            gmail_integration.access_token = credentials.token

            self.db.commit()
            self.db.refresh(gmail_integration)

        return credentials


def get_credentials(
    db: Session,
    organization_id: int,
    user_id: int,
) -> Credentials:
    """
    Returns valid Gmail OAuth credentials for the
    specified organization and user.
    """

    auth_service = GmailAuthService(
        db=db,
        organization_id=organization_id,
        user_id=user_id,
    )

    return auth_service.get_valid_credentials()