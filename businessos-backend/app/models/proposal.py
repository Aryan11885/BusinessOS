from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func

from app.db.database import Base


class Proposal(Base):
    __tablename__ = "proposals"

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

    opportunity_id = Column(
        Integer,
        ForeignKey("opportunities.id"),
        nullable=False
    )

    proposal_number = Column(
        String,
        unique=True,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    amount = Column(
        Integer,
        default=0
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