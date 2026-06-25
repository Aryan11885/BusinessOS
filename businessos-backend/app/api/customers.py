from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.customer import Customer

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post("/")
def create_customer(
    payload: CustomerCreate,
    db: Session = Depends(get_db)
):
    customer = Customer(
        organization_id=payload.organization_id,
        proposal_id=payload.proposal_id,
        company_name=payload.company_name,
        contact_name=payload.contact_name,
        email=payload.email,
        phone=payload.phone,
        status=payload.status
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return {
        "message": "Customer created successfully",
        "id": customer.id
    }


@router.get("/")
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()


@router.get("/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.put("/{customer_id}")
def update_customer(
    customer_id: int,
    payload: CustomerCreate,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    customer.organization_id = payload.organization_id
    customer.proposal_id = payload.proposal_id
    customer.company_name = payload.company_name
    customer.contact_name = payload.contact_name
    customer.email = payload.email
    customer.phone = payload.phone
    customer.status = payload.status

    db.commit()
    db.refresh(customer)

    return {
        "message": "Customer updated successfully"
    }


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }