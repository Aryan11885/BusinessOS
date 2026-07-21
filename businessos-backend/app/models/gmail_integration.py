from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    BigInteger,
    String,
    Text,
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class GmailIntegration(Base):
    __tablename__ = "gmail_integrations"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True,
    )

    organization_id = Column(
        BigInteger,
        ForeignKey("organizations.id"),
        nullable=False,
    )

    user_id = Column(
        BigInteger,
        ForeignKey("users.id"),
        nullable=False,
    )

    gmail_email = Column(
        String,
        nullable=False,
    )

    gmail_name = Column(
        String,
        nullable=True,
    )

    refresh_token = Column(
        Text,
        nullable=False,
    )

    access_token = Column(
        Text,
        nullable=True,
    )

    token_type = Column(
        String,
        nullable=True,
    )

    scope = Column(
        Text,
        nullable=True,
    )

    expires_in = Column(
        BigInteger,
        nullable=True,
    )

    is_connected = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    organization = relationship(
        "Organization",
        back_populates="gmail_integrations",
    )

    user = relationship(
        "User",
        back_populates="gmail_integrations",
    )