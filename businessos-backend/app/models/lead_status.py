from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Integer,
    Boolean
)

from app.db.database import Base


class LeadStatus(Base):
    __tablename__ = "lead_statuses"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    status_name = Column(
        String(50),
        unique=True,
        nullable=False
    )

    sequence_no = Column(
        Integer,
        nullable=False
    )

    color_code = Column(
        String(10),
        nullable=True
    )

    is_closed = Column(
        Boolean,
        default=False
    )