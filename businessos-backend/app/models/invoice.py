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
        nullable=False,
        unique=True
    )

    amount = Column(
        Float,
        nullable=False
    )

    tax = Column(
        Float,
        default=0
    )

    total_amount = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="DRAFT"
    )

    due_date = Column(
        Date,
        nullable=True
    )

    notes = Column(
        Text,
        nullable=True
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