from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.invoice_item import (
    InvoiceItemCreate,
    InvoiceItemResponse,
)

from app.services.invoice_item_service import (
    InvoiceItemService,
)

router = APIRouter(
    prefix="/invoice-items",
    tags=["Invoice Items"],
)


@router.post(
    "",
    response_model=InvoiceItemResponse
)
def create_invoice_item(
    payload: InvoiceItemCreate,
    db: Session = Depends(get_db),
):
    return InvoiceItemService.create_invoice_item(
        db,
        payload,
    )


@router.get(
    "",
    response_model=list[InvoiceItemResponse]
)
def get_invoice_items(
    db: Session = Depends(get_db),
):
    return InvoiceItemService.get_invoice_items(
        db,
    )


@router.get(
    "/{invoice_item_id}",
    response_model=InvoiceItemResponse
)
def get_invoice_item(
    invoice_item_id: int,
    db: Session = Depends(get_db),
):
    invoice_item = (
        InvoiceItemService.get_invoice_item(
            db,
            invoice_item_id,
        )
    )

    if not invoice_item:
        raise HTTPException(
            status_code=404,
            detail="Invoice Item not found",
        )

    return invoice_item


@router.put(
    "/{invoice_item_id}",
    response_model=InvoiceItemResponse
)
def update_invoice_item(
    invoice_item_id: int,
    payload: InvoiceItemCreate,
    db: Session = Depends(get_db),
):
    invoice_item = (
        InvoiceItemService.update_invoice_item(
            db,
            invoice_item_id,
            payload,
        )
    )

    if not invoice_item:
        raise HTTPException(
            status_code=404,
            detail="Invoice Item not found",
        )

    return invoice_item


@router.delete(
    "/{invoice_item_id}"
)
def delete_invoice_item(
    invoice_item_id: int,
    db: Session = Depends(get_db),
):
    deleted = InvoiceItemService.delete_invoice_item(
        db,
        invoice_item_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Invoice Item not found",
        )

    return {
        "message": "Invoice Item deleted successfully"
    }