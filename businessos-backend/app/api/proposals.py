from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.customer import Customer
from app.models.opportunity import Opportunity
from app.models.lead import Lead

from app.db.database import get_db

from app.models.proposal import Proposal

from app.schemas.proposal import (
    ProposalCreate,
    ProposalResponse
)

router = APIRouter(
    prefix="/proposals",
    tags=["Proposals"]
)


@router.post("/")
def create_proposal(
    payload: ProposalCreate,
    db: Session = Depends(get_db)
):
    proposal = Proposal(
        organization_id=payload.organization_id,
        opportunity_id=payload.opportunity_id,
        proposal_number=payload.proposal_number,
        title=payload.title,
        description=payload.description,
        amount=payload.amount,
        status=payload.status
    )

    db.add(proposal)
    db.commit()
    db.refresh(proposal)

    return {
        "message": "Proposal created successfully",
        "id": proposal.id
    }


@router.get("/")
def get_proposals(
    db: Session = Depends(get_db)
):
    return db.query(Proposal).all()


@router.get("/{proposal_id}")
def get_proposal(
    proposal_id: int,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(
            Proposal.id == proposal_id
        )
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    return proposal


@router.put("/{proposal_id}")
def update_proposal(
    proposal_id: int,
    payload: ProposalCreate,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(
            Proposal.id == proposal_id
        )
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    proposal.organization_id = payload.organization_id
    proposal.opportunity_id = payload.opportunity_id
    proposal.proposal_number = payload.proposal_number
    proposal.title = payload.title
    proposal.description = payload.description
    proposal.amount = payload.amount
    proposal.status = payload.status

    db.commit()
    db.refresh(proposal)

    return {
        "message": "Proposal updated successfully"
    }


@router.delete("/{proposal_id}")
def delete_proposal(
    proposal_id: int,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(
            Proposal.id == proposal_id
        )
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    db.delete(proposal)
    db.commit()

    return {
        "message": "Proposal deleted successfully"
    }

@router.post("/{proposal_id}/convert")
def convert_proposal(
    proposal_id: int,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(Proposal.id == proposal_id)
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    opportunity = (
        db.query(Opportunity)
        .filter(
            Opportunity.id == proposal.opportunity_id
        )
        .first()
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    lead = (
        db.query(Lead)
        .filter(
            Lead.id == opportunity.lead_id
        )
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    customer = Customer(
        organization_id=lead.organization_id,
        proposal_id=proposal.id,
        company_name=lead.company_name,
        contact_name=f"{lead.first_name} {lead.last_name}",
        email=lead.email,
        phone=lead.phone,
        status="ACTIVE"
    )

    db.add(customer)

    proposal.status = "APPROVED"

    db.commit()
    db.refresh(customer)

    return {
        "message": "Proposal converted successfully",
        "customer_id": customer.id
    }