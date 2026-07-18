from app.schemas.lead import LeadCreate
import uuid


class FacebookLeadMapper:

    @staticmethod
    def to_lead_create(fields: dict):

        lead_code = f"FB-{uuid.uuid4().hex[:8].upper()}"

        return LeadCreate(
            organization_id=1,
            lead_code=lead_code,
            first_name=fields.get("full_name", ""),
            last_name="",
            company_name=fields.get("company_name"),
            email=fields.get("email"),
            phone=fields.get("phone_number", ""),
            source_id=1,
            status_id=1,
            owner_user_id=1,
            lead_value=0,
            city="",
            state="",
            remarks="Facebook Lead"
        )