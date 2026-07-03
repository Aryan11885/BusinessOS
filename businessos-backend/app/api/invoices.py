from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceResponse,
)

from app.services.invoice_service import (
    InvoiceService,
)

router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"],
)


@router.post(
    "",
    response_model=InvoiceResponse
)
def create_invoice(
    payload: InvoiceCreate,
    db: Session = Depends(get_db),
):
    return InvoiceService.create_invoice(
        db,
        payload,
    )


@router.get(
    "",
    response_model=list[InvoiceResponse]
)
def get_invoices(
    db: Session = Depends(get_db),
):
    return InvoiceService.get_invoices(db)


@router.get(
    "/{invoice_id}",
    response_model=InvoiceResponse
)
def get_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
):
    invoice = InvoiceService.get_invoice(
        db,
        invoice_id,
    )

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return invoice


@router.put(
    "/{invoice_id}",
    response_model=InvoiceResponse
)
def update_invoice(
    invoice_id: int,
    payload: InvoiceCreate,
    db: Session = Depends(get_db),
):
    invoice = InvoiceService.update_invoice(
        db,
        invoice_id,
        payload,
    )

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return invoice


@router.delete(
    "/{invoice_id}"
)
def delete_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
):
    deleted = InvoiceService.delete_invoice(
        db,
        invoice_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found",
        )

    return {
        "message": "Invoice deleted successfully"
    } 