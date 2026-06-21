from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Text,
    Boolean
)

from app.db.database import Base


class LeadSource(Base):
    __tablename__ = "lead_sources"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    source_name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    source_type = Column(
        String(50),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    is_active = Column(
        Boolean,
        default=True
    )