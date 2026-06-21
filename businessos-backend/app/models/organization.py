from sqlalchemy import Column, BigInteger, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func

from app.db.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False)

    industry_type = Column(String(100), nullable=True)

    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)

    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), default="India")

    is_active = Column(Boolean, default=True)

    created_at = Column(TIMESTAMP(timezone=True),
                        server_default=func.now())

    updated_at = Column(TIMESTAMP(timezone=True),
                        server_default=func.now(),
                        onupdate=func.now())