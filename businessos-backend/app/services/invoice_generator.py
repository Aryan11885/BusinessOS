from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem
from app.models.customer import Customer
from app.models.organization import Organization
from app.models.project import Project


class InvoiceGenerator:

    @staticmethod
    def build_pdf_data(
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
            return None

        organization = (
            db.query(Organization)
            .filter(
                Organization.id == invoice.organization_id
            )
            .first()
        )

        customer = (
            db.query(Customer)
            .filter(
                Customer.id == invoice.customer_id
            )
            .first()
        )

        project = (
            db.query(Project)
            .filter(
                Project.id == invoice.project_id
            )
            .first()
        )

        invoice_items = (
            db.query(InvoiceItem)
            .filter(
                InvoiceItem.invoice_id == invoice.id
            )
            .all()
        )

        items = []

        for item in invoice_items:
            items.append(
                {
                    "item_name": item.item_name,
                    "description": item.description,
                    "hsn_code": item.hsn_code,
                    "quantity": item.quantity,
                    "unit": item.unit,
                    "rate": item.rate,
                    "gst_percentage": item.gst_percentage,
                    "taxable_amount": item.taxable_amount,
                    "gst_amount": item.gst_amount,
                    "line_total": item.line_total,
                }
            )

        return {
            "invoice_number": invoice.invoice_number,
            "invoice_date": invoice.invoice_date,
            "due_date": invoice.due_date,
            "delivery_date": invoice.delivery_date,
            "payment_mode": invoice.payment_mode,
            "reverse_charge": invoice.reverse_charge,
            "buyer_order_number": invoice.buyer_order_number,
            "supplier_reference": invoice.supplier_reference,
            "vehicle_number": invoice.vehicle_number,
            "transport_details": invoice.transport_details,
            "terms_of_delivery": invoice.terms_of_delivery,

            "subtotal": invoice.subtotal,
            "tax": invoice.tax,
            "cgst": invoice.cgst,
            "sgst": invoice.sgst,
            "igst": invoice.igst,
            "freight_charge": invoice.freight_charge,
            "packing_charge": invoice.packing_charge,
            "round_off": invoice.round_off,
            "total_amount": invoice.total_amount,

            "declaration": invoice.declaration,
            "notes": invoice.notes,
            "status": invoice.status,

            "organization": organization,
            "customer": customer,
            "project": project,

            "items": items,
        }