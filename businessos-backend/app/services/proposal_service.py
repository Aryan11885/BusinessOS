import os

from sqlalchemy.orm import Session

from app.models.proposal import Proposal
from app.models.opportunity import Opportunity
from app.models.lead import Lead

from app.services.gmail_service import GmailService
from app.services.proposal_generator import ProposalGenerator

from app.pdf.proposal_template import generate_proposal_pdf


class ProposalService:

    @staticmethod
    def generate_pdf(
        db: Session,
        proposal_id: int,
    ):

        pdf_data = ProposalGenerator.build_pdf_data(
            db,
            proposal_id,
        )

        if not pdf_data:
            return None

        output_folder = "generated_pdfs"

        os.makedirs(
            output_folder,
            exist_ok=True,
        )

        output_file = os.path.join(
            output_folder,
            f"{pdf_data['proposal_number']}.pdf",
        )

        generate_proposal_pdf(
            pdf_data,
            output_file,
        )

        return output_file

    @staticmethod
    async def send_proposal_email(
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
            return {
                "success": False,
                "message": "Proposal not found",
            }

        opportunity = (
            db.query(Opportunity)
            .filter(
                Opportunity.id == proposal.opportunity_id
            )
            .first()
        )

        if not opportunity:
            return {
                "success": False,
                "message": "Opportunity not found",
            }

        lead = (
            db.query(Lead)
            .filter(
                Lead.id == opportunity.lead_id
            )
            .first()
        )

        if not lead:
            return {
                "success": False,
                "message": "Lead not found",
            }

        pdf_path = ProposalService.generate_pdf(
            db,
            proposal_id,
        )

        gmail = GmailService()

        await gmail.send_email(
            to=lead.email,
            subject=f"Proposal - {proposal.proposal_number}",
            body=f"""
Hello {lead.first_name},

Please find attached your proposal.

Proposal Number : {proposal.proposal_number}

Thank you.

BusinessOS Team
            """,
            file_paths=[
                pdf_path,
            ],
        )

        return {
            "success": True,
            "message": "Proposal emailed successfully.",
            "recipient": lead.email,
        }