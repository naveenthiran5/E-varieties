import os
import json
import uuid
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
import auth
from database import engine, Base, get_db

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Varieties Shoe Store API", version="1.0.0")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seeding database from db.json on startup
@app.on_event("startup")
def seed_database():
    db = next(get_db())
    try:
        # Check if database is already seeded
        if db.query(models.Shoe).count() > 0:
            print("Database already contains shoe data. Skipping seeding.")
            return

        # Path to db.json
        # We check a few locations to ensure it's found
        possible_paths = [
            os.path.join(os.path.dirname(__file__), "..", "varieties", "db", "db.json"),
            os.path.join(os.path.dirname(__file__), "varieties", "db", "db.json"),
            "d:\\E-varieties-main\\varieties\\db\\db.json"
        ]
        
        db_json_path = None
        for path in possible_paths:
            if os.path.exists(path):
                db_json_path = path
                break
                
        if not db_json_path:
            print("WARNING: db.json not found! Cannot seed database.")
            return

        print(f"Seeding database from: {db_json_path}")
        with open(db_json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Seed Shoes
        if "shoe" in data:
            for item in data["shoe"]:
                shoe = models.Shoe(
                    id=str(item["id"]),
                    name=item["name"],
                    blackstar=item.get("blackstar", "0"),
                    rating=item.get("rating", "0"),
                    price=item["price"],
                    shoe_pic=item["shoe_pic"],
                    size=item["size"],
                    colors=item["colors"]
                )
                db.add(shoe)
            
        # Seed Cart Items
        if "cart" in data:
            for item in data["cart"]:
                cart_item = models.CartItem(
                    id=str(item["id"]),
                    shoeId=str(item["shoeId"]),
                    name=item["name"],
                    price=item["price"],
                    size=str(item["size"]),
                    image=item["image"],
                    quantity=item.get("quantity", 1)
                )
                db.add(cart_item)

        # Seed Orders
        if "orders" in data:
            for item in data["orders"]:
                order = models.Order(
                    id=str(item["id"]),
                    shoeId=str(item["shoeId"]),
                    name=item["name"],
                    price=item["price"],
                    size=str(item["size"]),
                    image=item["image"],
                    customer_name=item["customer_name"],
                    mobile=item["mobile"],
                    address=item["address"]
                )
                db.add(order)

        db.commit()
        print("Database seeded successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


# --- Authentication Endpoints ---

@app.post("/api/auth/register", response_model=dict, status_code=status.HTTP_201_CREATED)
def register(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    # Check if passwords match
    if user_data.password != user_data.repassword:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    # Create new user
    hashed_password = auth.get_password_hash(user_data.password)
    new_user = models.User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Registration successful"}


@app.post("/api/auth/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    if not user or not auth.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    access_token = auth.create_access_token(data={"sub": user.email, "id": user.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "name": user.name,
        "email": user.email
    }


# --- Shoes Endpoints ---

@app.get("/shoe", response_model=List[schemas.ShoeResponse])
def get_shoes(db: Session = Depends(get_db)):
    return db.query(models.Shoe).all()


@app.get("/shoe/{shoe_id}", response_model=schemas.ShoeResponse)
def get_shoe(shoe_id: str, db: Session = Depends(get_db)):
    shoe = db.query(models.Shoe).filter(models.Shoe.id == shoe_id).first()
    if not shoe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shoe with ID {shoe_id} not found"
        )
    return shoe


@app.post("/shoe", response_model=schemas.ShoeResponse, status_code=status.HTTP_201_CREATED)
def create_shoe(shoe_data: schemas.ShoeCreate, db: Session = Depends(get_db)):
    # Check if ID already exists
    existing = db.query(models.Shoe).filter(models.Shoe.id == shoe_data.id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Shoe with ID {shoe_data.id} already exists"
        )
        
    new_shoe = models.Shoe(
        id=shoe_data.id,
        name=shoe_data.name,
        blackstar=shoe_data.blackstar,
        rating=shoe_data.rating,
        price=shoe_data.price,
        shoe_pic=shoe_data.shoe_pic,
        size=shoe_data.size,
        colors=shoe_data.colors
    )
    db.add(new_shoe)
    db.commit()
    db.refresh(new_shoe)
    return new_shoe


# --- Cart Endpoints ---

@app.get("/cart", response_model=List[schemas.CartItemResponse])
def get_cart(db: Session = Depends(get_db)):
    return db.query(models.CartItem).all()


@app.post("/cart", response_model=schemas.CartItemResponse, status_code=status.HTTP_201_CREATED)
def add_to_cart(item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    # To prevent duplicate cart entries with the exact same shoe details and size,
    # we can check if it exists and increment its quantity.
    # Note: frontend sometimes doesn't send cart items with the same size grouped,
    # but grouping them is standard. Let's do it:
    existing_item = db.query(models.CartItem).filter(
        models.CartItem.shoeId == item.shoeId,
        models.CartItem.size == item.size
    ).first()
    
    if existing_item:
        existing_item.quantity += item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item
        
    # Otherwise, create a new item
    cart_id = item.id if item.id else uuid.uuid4().hex[:12]
    new_item = models.CartItem(
        id=cart_id,
        shoeId=item.shoeId,
        name=item.name,
        price=item.price,
        size=item.size,
        image=item.image,
        quantity=item.quantity
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@app.patch("/cart/{cart_id}", response_model=schemas.CartItemResponse)
def update_cart_item(cart_id: str, update_data: schemas.CartItemUpdate, db: Session = Depends(get_db)):
    cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart item with ID {cart_id} not found"
        )
    cart_item.quantity = update_data.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item


@app.delete("/cart/{cart_id}", response_model=dict)
def delete_cart_item(cart_id: str, db: Session = Depends(get_db)):
    cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart item with ID {cart_id} not found"
        )
    db.delete(cart_item)
    db.commit()
    return {"message": "Item deleted from cart"}


# --- Orders Endpoints ---

@app.get("/orders", response_model=List[schemas.OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()


@app.get("/orders/{order_id}", response_model=schemas.OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {order_id} not found"
        )
    return order


@app.post("/orders", response_model=schemas.OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    order_id = order_data.id if order_data.id else uuid.uuid4().hex[:12]
    new_order = models.Order(
        id=order_id,
        shoeId=order_data.shoeId,
        name=order_data.name,
        price=order_data.price,
        size=order_data.size,
        image=order_data.image,
        customer_name=order_data.customer_name,
        mobile=order_data.mobile,
        address=order_data.address
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order
