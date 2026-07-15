from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
)

from sqlalchemy.sql import func

from app.db.database import Base


class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    invoice_id = Column(
        Integer,
        ForeignKey("invoices.id"),
        nullable=False
    )

    item_name = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    hsn_code = Column(
        String,
        nullable=True
    )

    quantity = Column(
        Float,
        default=1
    )

    unit = Column(
        String,
        default="Nos"
    )

    rate = Column(
        Float,
        default=0
    )

    gst_percentage = Column(
        Float,
        default=0
    )

    taxable_amount = Column(
        Float,
        default=0
    )

    gst_amount = Column(
        Float,
        default=0
    )

    line_total = Column(
        Float,
        default=0
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