from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.invoice import Invoice


class PaymentService:

    @staticmethod
    def create_payment(
        db: Session,
        payload
    ):
        payment = Payment(
            organization_id=payload.organization_id,
            invoice_id=payload.invoice_id,

            amount=payload.amount,

            payment_method=payload.payment_method,

            transaction_id=payload.transaction_id,

            payment_date=payload.payment_date,

            status=payload.status,

            notes=payload.notes
        )

        db.add(payment)
        db.commit()
        db.refresh(payment)

        if payment.status == "SUCCESS":
            invoice = (
                db.query(Invoice)
                .filter(
                    Invoice.id == payment.invoice_id
                )
                .first()
            )

            if invoice:
                invoice.status = "PAID"
                db.commit()
        
        return payment

    @staticmethod
    def get_payments(
        db: Session
    ):
        return db.query(Payment).all()

    @staticmethod
    def get_payment(
        db: Session,
        payment_id: int
    ):
        return (
            db.query(Payment)
            .filter(Payment.id == payment_id)
            .first()
        )

    @staticmethod
    def update_payment(
        db: Session,
        payment_id: int,
        payload
    ):
        payment = (
            db.query(Payment)
            .filter(Payment.id == payment_id)
            .first()
        )

        if not payment:
            return None

        payment.organization_id = payload.organization_id
        payment.invoice_id = payload.invoice_id

        payment.amount = payload.amount

        payment.payment_method = payload.payment_method

        payment.transaction_id = payload.transaction_id

        payment.payment_date = payload.payment_date

        payment.status = payload.status

        payment.notes = payload.notes

        db.commit()
        db.refresh(payment)

        invoice = (
            db.query(Invoice)
            .filter(
                Invoice.id == payment.invoice_id
            )
            .first()
        )
        
        if invoice:
        
            if payment.status == "SUCCESS":
                invoice.status = "PAID"
        
            else:
                invoice.status = "SENT"
        
            db.commit()
        
        return payment

    @staticmethod
    def delete_payment(
        db: Session,
        payment_id: int
    ):
        payment = (
            db.query(Payment)
            .filter(Payment.id == payment_id)
            .first()
        )

        if not payment:
            return None

        db.delete(payment)
        db.commit()

        return True