from sqlalchemy import (
    Column,
    Integer,
    BigInteger,
    String,
    Boolean,
    ForeignKey,
    TIMESTAMP,
    Text,
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class FacebookIntegration(Base):
    __tablename__ = "facebook_integrations"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(
        BigInteger,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    facebook_user_id = Column(String, nullable=True)

    page_id = Column(String, nullable=True)

    page_name = Column(String, nullable=True)

    access_token = Column(Text, nullable=True)

    token_expires_at = Column(TIMESTAMP, nullable=True)

    is_connected = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    organization = relationship(
        "Organization",
        back_populates="facebook_integrations",
    )