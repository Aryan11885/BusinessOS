from sqlalchemy.orm import Session
import os

from app.services.invoice_generator import InvoiceGenerator
from app.pdf.invoice_template import generate_invoice_pdf

from app.models.customer import Customer
from app.services.gmail_service import GmailService

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

            invoice_date=payload.invoice_date,
            due_date=payload.due_date,
            delivery_date=payload.delivery_date,

            payment_mode=payload.payment_mode,
            reverse_charge=payload.reverse_charge,

            buyer_order_number=payload.buyer_order_number,
            supplier_reference=payload.supplier_reference,
            vehicle_number=payload.vehicle_number,
            transport_details=payload.transport_details,
            terms_of_delivery=payload.terms_of_delivery,

            subtotal=payload.subtotal,
            tax=payload.tax,

            cgst=payload.cgst,
            sgst=payload.sgst,
            igst=payload.igst,

            freight_charge=payload.freight_charge,
            packing_charge=payload.packing_charge,
            round_off=payload.round_off,

            total_amount=payload.total_amount,

            declaration=payload.declaration,
            notes=payload.notes,

            status=payload.status,
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
            .filter(
                Invoice.id == invoice_id
            )
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
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )

        if not invoice:
            return None

        invoice.organization_id = payload.organization_id
        invoice.customer_id = payload.customer_id
        invoice.project_id = payload.project_id

        invoice.invoice_number = payload.invoice_number

        invoice.invoice_date = payload.invoice_date
        invoice.due_date = payload.due_date
        invoice.delivery_date = payload.delivery_date

        invoice.payment_mode = payload.payment_mode
        invoice.reverse_charge = payload.reverse_charge

        invoice.buyer_order_number = payload.buyer_order_number
        invoice.supplier_reference = payload.supplier_reference
        invoice.vehicle_number = payload.vehicle_number
        invoice.transport_details = payload.transport_details
        invoice.terms_of_delivery = payload.terms_of_delivery

        invoice.subtotal = payload.subtotal
        invoice.tax = payload.tax

        invoice.cgst = payload.cgst
        invoice.sgst = payload.sgst
        invoice.igst = payload.igst

        invoice.freight_charge = payload.freight_charge
        invoice.packing_charge = payload.packing_charge
        invoice.round_off = payload.round_off

        invoice.total_amount = payload.total_amount

        invoice.declaration = payload.declaration
        invoice.notes = payload.notes

        invoice.status = payload.status

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
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )

        if not invoice:
            return None

        db.delete(invoice)
        db.commit()

        return True
    
    @staticmethod
    def generate_pdf(
        db: Session,
        invoice_id: int,
    ):
        pdf_data = InvoiceGenerator.build_pdf_data(
            db,
            invoice_id,
        )
    
        if not pdf_data:
            return None
    
        output_folder = "generated_pdfs"
    
        os.makedirs(
            output_folder,
            exist_ok=True,
        )
    
        output_file = os.path.join(
            output_folder,
            f"{pdf_data['invoice_number']}.pdf",
        )
    
        generate_invoice_pdf(
            pdf_data,
            output_file,
        )
    
        return output_file
    
    @staticmethod
    async def send_invoice_email(
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
            return {
                "success": False,
                "message": "Invoice not found",
            }
    
        customer = (
            db.query(Customer)
            .filter(
                Customer.id == invoice.customer_id
            )
            .first()
        )
    
        if not customer:
            return {
                "success": False,
                "message": "Customer not found",
            }
    
        pdf_path = InvoiceService.generate_pdf(
            db,
            invoice_id,
        )
    
        gmail = GmailService()
    
        await gmail.send_email(
            to=customer.email,
            subject=f"Invoice - {invoice.invoice_number}",
            body=f"""
    Hello {customer.contact_name},
    
    Please find attached your invoice.
    
    Invoice Number : {invoice.invoice_number}
    
    Thank you for your business.
    
    BusinessOS Team
            """,
            file_paths=[
                pdf_path,
            ],
        )
    
        return {
            "success": True,
            "message": "Invoice emailed successfully.",
            "recipient": customer.email,
        }