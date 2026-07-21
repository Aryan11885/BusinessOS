from sqlalchemy.orm import relationship

from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Boolean,
    ForeignKey,
    TIMESTAMP
)
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, index=True)

    organization_id = Column(
        BigInteger,
        ForeignKey("organizations.id"),
        nullable=False
    )

    first_name = Column(String(100), nullable=False)

    last_name = Column(String(100), nullable=True)

    email = Column(String(255), unique=True, nullable=False)

    phone = Column(String(20), nullable=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(String(50), nullable=False)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    gmail_integrations = relationship(
        "GmailIntegration",
        back_populates="user",
        cascade="all, delete-orphan",
    )