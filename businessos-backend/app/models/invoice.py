from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    Text,
    ForeignKey,
    DateTime,
)

from sqlalchemy.sql import func

from app.db.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False
    )

    invoice_number = Column(
        String,
        unique=True,
        nullable=False
    )

    invoice_date = Column(
        Date,
        nullable=True
    )

    due_date = Column(
        Date,
        nullable=True
    )

    payment_mode = Column(
        String,
        nullable=True
    )

    reverse_charge = Column(
        String,
        default="No"
    )

    buyer_order_number = Column(
        String,
        nullable=True
    )

    supplier_reference = Column(
        String,
        nullable=True
    )

    vehicle_number = Column(
        String,
        nullable=True
    )

    delivery_date = Column(
        Date,
        nullable=True
    )

    transport_details = Column(
        String,
        nullable=True
    )

    terms_of_delivery = Column(
        Text,
        nullable=True
    )

    subtotal = Column(
        Float,
        default=0
    )

    tax = Column(
        Float,
        default=0
    )

    cgst = Column(
        Float,
        default=0
    )

    sgst = Column(
        Float,
        default=0
    )

    igst = Column(
        Float,
        default=0
    )

    freight_charge = Column(
        Float,
        default=0
    )

    packing_charge = Column(
        Float,
        default=0
    )

    round_off = Column(
        Float,
        default=0
    )

    total_amount = Column(
        Float,
        default=0
    )

    declaration = Column(
        Text,
        nullable=True
    )

    notes = Column(
        Text,
        nullable=True
    )

    status = Column(
        String,
        default="DRAFT"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )