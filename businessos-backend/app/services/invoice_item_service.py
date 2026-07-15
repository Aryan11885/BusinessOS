from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem


class InvoiceItemService:

    @staticmethod
    def calculate_invoice_item(
        quantity: float,
        rate: float,
        gst_percentage: float,
    ):
        taxable_amount = quantity * rate

        gst_amount = (
            taxable_amount * gst_percentage
        ) / 100

        line_total = taxable_amount + gst_amount

        return (
            taxable_amount,
            gst_amount,
            line_total,
        )

    @staticmethod
    def update_invoice_totals(
        db: Session,
        invoice_id: int,
    ):
        invoice = (
            db.query(Invoice)
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )

        if not invoice:
            return

        invoice_items = (
            db.query(InvoiceItem)
            .filter(
                InvoiceItem.invoice_id == invoice_id
            )
            .all()
        )

        subtotal = 0
        total_tax = 0
        total_amount = 0

        for item in invoice_items:
            subtotal += item.taxable_amount
            total_tax += item.gst_amount
            total_amount += item.line_total

        invoice.amount = subtotal
        invoice.tax = total_tax
        invoice.total_amount = total_amount

        db.commit()

    @staticmethod
    def create_invoice_item(
        db: Session,
        payload,
    ):
        taxable_amount, gst_amount, line_total = (
            InvoiceItemService.calculate_invoice_item(
                payload.quantity,
                payload.rate,
                payload.gst_percentage,
            )
        )

        invoice_item = InvoiceItem(
            invoice_id=payload.invoice_id,
            item_name=payload.item_name,
            description=payload.description,
            hsn_code=payload.hsn_code,
            quantity=payload.quantity,
            unit=payload.unit,
            rate=payload.rate,
            gst_percentage=payload.gst_percentage,
            taxable_amount=taxable_amount,
            gst_amount=gst_amount,
            line_total=line_total,
        )

        db.add(invoice_item)
        db.commit()
        db.refresh(invoice_item)

        InvoiceItemService.update_invoice_totals(
            db,
            invoice_item.invoice_id,
        )

        return invoice_item

    @staticmethod
    def get_invoice_items(
        db: Session,
    ):
        return db.query(InvoiceItem).all()

    @staticmethod
    def get_invoice_item(
        db: Session,
        invoice_item_id: int,
    ):
        return (
            db.query(InvoiceItem)
            .filter(
                InvoiceItem.id == invoice_item_id
            )
            .first()
        )

    @staticmethod
    def update_invoice_item(
        db: Session,
        invoice_item_id: int,
        payload,
    ):
        invoice_item = (
            db.query(InvoiceItem)
            .filter(
                InvoiceItem.id == invoice_item_id
            )
            .first()
        )

        if not invoice_item:
            return None

        taxable_amount, gst_amount, line_total = (
            InvoiceItemService.calculate_invoice_item(
                payload.quantity,
                payload.rate,
                payload.gst_percentage,
            )
        )

        invoice_item.invoice_id = payload.invoice_id
        invoice_item.item_name = payload.item_name
        invoice_item.description = payload.description
        invoice_item.hsn_code = payload.hsn_code
        invoice_item.quantity = payload.quantity
        invoice_item.unit = payload.unit
        invoice_item.rate = payload.rate
        invoice_item.gst_percentage = payload.gst_percentage
        invoice_item.taxable_amount = taxable_amount
        invoice_item.gst_amount = gst_amount
        invoice_item.line_total = line_total

        db.commit()
        db.refresh(invoice_item)

        InvoiceItemService.update_invoice_totals(
            db,
            invoice_item.invoice_id,
        )

        return invoice_item

    @staticmethod
    def delete_invoice_item(
        db: Session,
        invoice_item_id: int,
    ):
        invoice_item = (
            db.query(InvoiceItem)
            .filter(
                InvoiceItem.id == invoice_item_id
            )
            .first()
        )

        if not invoice_item:
            return None

        invoice_id = invoice_item.invoice_id

        db.delete(invoice_item)
        db.commit()

        InvoiceItemService.update_invoice_totals(
            db,
            invoice_id,
        )

        return True