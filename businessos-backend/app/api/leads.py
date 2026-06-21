from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.lead import Lead

from app.schemas.lead import LeadCreate

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


@router.get("/test")
def test_leads():
    return {
        "message": "Lead Router Working"
    }


@router.post("/")
def create_lead(
    payload: LeadCreate,
    db: Session = Depends(get_db)
):

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

    return {
        "message": "Lead created successfully",
        "lead_id": lead.id
    }

@router.get("/")
def get_all_leads(
    db: Session = Depends(get_db)
):
    leads = db.query(Lead).all()

    return leads

@router.get("/{lead_id}")
def get_lead_by_id(
    lead_id: int,
    db: Session = Depends(get_db)
):
    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return lead

@router.put("/{lead_id}")
def update_lead(
    lead_id: int,
    payload: LeadCreate,
    db: Session = Depends(get_db)
):
    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    lead.first_name = payload.first_name
    lead.last_name = payload.last_name
    lead.company_name = payload.company_name
    lead.email = payload.email
    lead.phone = payload.phone
    lead.source_id = payload.source_id
    lead.status_id = payload.status_id
    lead.owner_user_id = payload.owner_user_id
    lead.lead_value = payload.lead_value
    lead.city = payload.city
    lead.state = payload.state
    lead.remarks = payload.remarks

    db.commit()
    db.refresh(lead)

    return {
        "message": "Lead updated successfully"
    }

@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db)
):
    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    db.delete(lead)
    db.commit()

    return {
        "message": "Lead deleted successfully"
    }