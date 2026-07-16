from sqlalchemy.orm import Session

from app.models.organization import Organization
from app.models.opportunity import Opportunity
from app.models.lead import Lead
from app.models.proposal import Proposal
from app.models.proposal_item import ProposalItem


class ProposalGenerator:

    @staticmethod
    def get_proposal_data(
        db: Session,
        proposal_id: int,
    ):
        proposal = (
            db.query(Proposal)
            .filter(
                Proposal.id == proposal_id
            )
            .first()
        )

        if not proposal:
            return None

        organization = (
            db.query(Organization)
            .filter(
                Organization.id == proposal.organization_id
            )
            .first()
        )

        opportunity = (
            db.query(Opportunity)
            .filter(
                Opportunity.id == proposal.opportunity_id
            )
            .first()
        )

        lead = (
            db.query(Lead)
            .filter(
                Lead.id == opportunity.lead_id
            )
            .first()
        )

        proposal_items = (
            db.query(ProposalItem)
            .filter(
                ProposalItem.proposal_id == proposal.id
            )
            .all()
        )

        return {
            "proposal": proposal,
            "organization": organization,
            "lead": lead,
            "items": proposal_items,
        }
    
    @staticmethod
    def build_pdf_data(
        db: Session,
        proposal_id: int,
    ):
        data = ProposalGenerator.get_proposal_data(
            db,
            proposal_id,
        )

        if not data:
            return None

        proposal = data["proposal"]
        organization = data["organization"]
        lead = data["lead"]
        items = data["items"]

        pdf_items = []

        for item in items:
            pdf_items.append({
                "item_name": item.item_name,
                "description": item.description,
                "quantity": item.quantity,
                "unit": item.unit,
                "unit_price": item.unit_price,
                "discount": item.discount,
                "tax_percentage": item.tax_percentage,
                "line_total": item.line_total,
            })

        return {
            "proposal_number": proposal.proposal_number,
            "title": proposal.title,
            "description": proposal.description,
            "status": proposal.status,

            "subtotal": proposal.subtotal,
            "discount": proposal.discount,
            "tax": proposal.tax,
            "total_amount": proposal.total_amount,

            "company": {
                "name": organization.name,
                "email": organization.email,
                "phone": organization.phone,
                "city": organization.city,
                "state": organization.state,
                "country": organization.country,
            },

            "customer": {
                "name": f"{lead.first_name} {lead.last_name or ''}".strip(),
                "company": lead.company_name,
                "email": lead.email,
                "phone": lead.phone,
                "city": lead.city,
                "state": lead.state,
            },

            "items": pdf_items,
        }