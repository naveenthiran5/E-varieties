from sqlalchemy import Column, Integer, String, JSON
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class Shoe(Base):
    __tablename__ = "shoes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    blackstar = Column(String, nullable=True)
    rating = Column(String, nullable=True)
    price = Column(String, nullable=False)
    shoe_pic = Column(String, nullable=False)
    size = Column(JSON, nullable=False)  # List of sizes, e.g., ["6", "7", "8"]
    colors = Column(JSON, nullable=False)  # Dict of images, e.g., {"image1": "...", "image2": "..."}

class CartItem(Base):
    __tablename__ = "cart"

    id = Column(String, primary_key=True, index=True)
    shoeId = Column(String, nullable=False)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    size = Column(String, nullable=False)
    image = Column(String, nullable=False)
    quantity = Column(Integer, default=1)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    shoeId = Column(String, nullable=False)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    size = Column(String, nullable=False)
    image = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    address = Column(String, nullable=False)
