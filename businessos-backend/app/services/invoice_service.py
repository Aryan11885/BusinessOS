from sqlalchemy.orm import Session

from app.models.invoice import Invoice


class InvoiceService:

    @staticmethod
    def create_invoice(
        db: Session,
        payload
    ):
        invoice = Invoice(
            organization_id=payload.organization_id,
            customer_id=payload.customer_id,
            project_id=payload.project_id,

            invoice_number=payload.invoice_number,

            amount=payload.amount,
            tax=payload.tax,
            total_amount=payload.total_amount,

            status=payload.status,

            due_date=payload.due_date,
            notes=payload.notes
        )

        db.add(invoice)
        db.commit()
        db.refresh(invoice)

        return invoice

    @staticmethod
    def get_invoices(
        db: Session
    ):
        return db.query(Invoice).all()

    @staticmethod
    def get_invoice(
        db: Session,
        invoice_id: int
    ):
        return (
            db.query(Invoice)
            .filter(Invoice.id == invoice_id)
            .first()
        )

    @staticmethod
    def update_invoice(
        db: Session,
        invoice_id: int,
        payload
    ):
        invoice = (
            db.query(Invoice)
            .filter(Invoice.id == invoice_id)
            .first()
        )

        if not invoice:
            return None

        invoice.organization_id = payload.organization_id
        invoice.customer_id = payload.customer_id
        invoice.project_id = payload.project_id

        invoice.invoice_number = payload.invoice_number

        invoice.amount = payload.amount
        invoice.tax = payload.tax
        invoice.total_amount = payload.total_amount

        invoice.status = payload.status

        invoice.due_date = payload.due_date
        invoice.notes = payload.notes

        db.commit()
        db.refresh(invoice)

        return invoice

    @staticmethod
    def delete_invoice(
        db: Session,
        invoice_id: int
    ):
        invoice = (
            db.query(Invoice)
            .filter(Invoice.id == invoice_id)
            .first()
        )

        if not invoice:
            return None

        db.delete(invoice)
        db.commit()

        return True