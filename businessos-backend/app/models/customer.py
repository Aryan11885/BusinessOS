from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func

from app.db.database import Base


class Customer(Base):
    __tablename__ = "customers"

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

    proposal_id = Column(
        Integer,
        ForeignKey("proposals.id"),
        nullable=False
    )

    company_name = Column(
        String,
        nullable=False
    )

    contact_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=True
    )

    phone = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        default="ACTIVE"
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