from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.opportunity import Opportunity

from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityResponse
)

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"]
)


@router.post("/")
def create_opportunity(
    payload: OpportunityCreate,
    db: Session = Depends(get_db)
):
    opportunity = Opportunity(
        organization_id=payload.organization_id,
        lead_id=payload.lead_id,
        owner_user_id=payload.owner_user_id,
        title=payload.title,
        value=payload.value,
        stage=payload.stage,
        probability=payload.probability,
        expected_close_date=payload.expected_close_date
    )

    db.add(opportunity)
    db.commit()
    db.refresh(opportunity)

    return {
        "message": "Opportunity created successfully",
        "id": opportunity.id
    }


@router.get("/")
def get_opportunities(
    db: Session = Depends(get_db)
):
    return db.query(Opportunity).all()


@router.get("/{opportunity_id}")
def get_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db)
):
    opportunity = (
        db.query(Opportunity)
        .filter(
            Opportunity.id == opportunity_id
        )
        .first()
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    return opportunity


@router.put("/{opportunity_id}")
def update_opportunity(
    opportunity_id: int,
    payload: OpportunityCreate,
    db: Session = Depends(get_db)
):
    opportunity = (
        db.query(Opportunity)
        .filter(
            Opportunity.id == opportunity_id
        )
        .first()
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    opportunity.organization_id = payload.organization_id
    opportunity.lead_id = payload.lead_id
    opportunity.owner_user_id = payload.owner_user_id
    opportunity.title = payload.title
    opportunity.value = payload.value
    opportunity.stage = payload.stage
    opportunity.probability = payload.probability
    opportunity.expected_close_date = payload.expected_close_date

    db.commit()
    db.refresh(opportunity)

    return {
        "message": "Opportunity updated successfully"
    }


@router.delete("/{opportunity_id}")
def delete_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db)
):
    opportunity = (
        db.query(Opportunity)
        .filter(
            Opportunity.id == opportunity_id
        )
        .first()
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found"
        )

    db.delete(opportunity)
    db.commit()

    return {
        "message": "Opportunity deleted successfully"
    }