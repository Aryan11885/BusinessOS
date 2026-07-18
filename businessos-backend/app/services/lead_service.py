from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.lead import Lead


class LeadService:

    @staticmethod
    def create_lead(db: Session, payload):

        existing_lead = (
            db.query(Lead)
            .filter(
                Lead.lead_code == payload.lead_code
            )
            .first()
        )

        if existing_lead:
            raise HTTPException(
                status_code=400,
                detail="Lead code already exists"
            )

        lead = Lead(
            organization_id=payload.organization_id,
            lead_code=payload.lead_code,
            first_name=payload.first_name,
            last_name=payload.last_name,
            company_name=payload.company_name,
            email=payload.email,
            phone=payload.phone,
            source_id=payload.source_id,
            status_id=payload.status_id,
            owner_user_id=payload.owner_user_id,
            lead_value=payload.lead_value,
            city=payload.city,
            state=payload.state,
            remarks=payload.remarks
        )

        db.add(lead)

        db.commit()

        db.refresh(lead)

        return lead