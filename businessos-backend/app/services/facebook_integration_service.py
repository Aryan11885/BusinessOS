from sqlalchemy.orm import Session

from app.models.facebook_integration import FacebookIntegration


class FacebookIntegrationService:

    @staticmethod
    def get_by_page_id(
        db: Session,
        page_id: str,
    ):
        return (
            db.query(FacebookIntegration)
            .filter(
                FacebookIntegration.page_id == page_id,
                FacebookIntegration.is_connected == True,
            )
            .first()
        )