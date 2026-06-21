from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Text,
    ForeignKey,
    Boolean,
    DECIMAL,
    TIMESTAMP
)
from sqlalchemy.sql import func

from app.db.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(BigInteger, primary_key=True, index=True)

    organization_id = Column(
        BigInteger,
        ForeignKey("organizations.id"),
        nullable=False
    )

    lead_code = Column(
        String(30),
        unique=True,
        nullable=False
    )

    first_name = Column(
        String(100),
        nullable=False
    )

    last_name = Column(
        String(100),
        nullable=True
    )

    company_name = Column(
        String(255),
        nullable=True
    )

    email = Column(
        String(255),
        nullable=True
    )

    phone = Column(
        String(20),
        nullable=False
    )

    source_id = Column(
        BigInteger,
        ForeignKey("lead_sources.id"),
        nullable=False
    )

    status_id = Column(
        BigInteger,
        ForeignKey("lead_statuses.id"),
        nullable=False
    )

    owner_user_id = Column(
        BigInteger,
        ForeignKey("users.id"),
        nullable=True
    )

    lead_value = Column(
        DECIMAL(15, 2),
        default=0
    )

    lead_score = Column(
        DECIMAL(5, 2),
        default=0
    )

    city = Column(
        String(100),
        nullable=True
    )

    state = Column(
        String(100),
        nullable=True
    )

    remarks = Column(
        Text,
        nullable=True
    )

    is_converted = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )