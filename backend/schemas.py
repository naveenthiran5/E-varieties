from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Optional

# --- Authentication Schemas ---

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    repassword: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    email: str

# --- Shoe/Product Schemas ---

class ShoeBase(BaseModel):
    id: str
    name: str
    blackstar: Optional[str] = "0"
    rating: Optional[str] = "0"
    price: str
    shoe_pic: str
    size: List[str]
    colors: Dict[str, str]

class ShoeCreate(ShoeBase):
    pass

class ShoeResponse(ShoeBase):
    class Config:
        from_attributes = True

# --- Cart Schemas ---

class CartItemBase(BaseModel):
    shoeId: str
    name: str
    price: str
    size: str
    image: str
    quantity: int = 1

class CartItemCreate(CartItemBase):
    id: Optional[str] = None  # Allow client to supply ID, or we can generate

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(CartItemBase):
    id: str

    class Config:
        from_attributes = True

# --- Order Schemas ---

class OrderBase(BaseModel):
    shoeId: str
    name: str
    price: str
    size: str
    image: str
    customer_name: str
    mobile: str
    address: str

class OrderCreate(OrderBase):
    id: Optional[str] = None  # Allow client to supply ID, or we can generate

class OrderResponse(OrderBase):
    id: str

    class Config:
        from_attributes = True
