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


class ProposalItem(Base):
    __tablename__ = "proposal_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    proposal_id = Column(
        Integer,
        ForeignKey("proposals.id"),
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

    quantity = Column(
        Float,
        default=1
    )

    unit = Column(
        String,
        default="Nos"
    )

    unit_price = Column(
        Float,
        default=0
    )

    discount = Column(
        Float,
        default=0
    )

    tax_percentage = Column(
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