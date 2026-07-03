from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
)

from app.services.payment_service import (
    PaymentService,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


@router.post(
    "",
    response_model=PaymentResponse,
)
def create_payment(
    payload: PaymentCreate,
    db: Session = Depends(get_db),
):
    return PaymentService.create_payment(
        db,
        payload,
    )


@router.get(
    "",
    response_model=list[PaymentResponse],
)
def get_payments(
    db: Session = Depends(get_db),
):
    return PaymentService.get_payments(db)


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
):
    payment = PaymentService.get_payment(
        db,
        payment_id,
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return payment


@router.put(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def update_payment(
    payment_id: int,
    payload: PaymentCreate,
    db: Session = Depends(get_db),
):
    payment = PaymentService.update_payment(
        db,
        payment_id,
        payload,
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return payment


@router.delete(
    "/{payment_id}",
)
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
):
    deleted = PaymentService.delete_payment(
        db,
        payment_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return {
        "message": "Payment deleted successfully"
    }