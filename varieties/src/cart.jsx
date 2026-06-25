import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Menubar from './menubar';
import Footer from './Footer';

function Cart() {
  const [carts, setCarts] = useState([]);

  const fetchCart = () => {
    fetch('http://localhost:8000/cart')
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1
        }));

        setCarts(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cart/${id}`);

      setCarts((prev) =>
        prev.filter((cart) => cart.id !== id)
      );

      alert('Cart item deleted');
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.patch(`http://localhost:8000/cart/${id}`, {
        quantity: newQuantity
      });

      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === id
            ? { ...cart, quantity: newQuantity }
            : cart
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Menubar />

      <div className="container mt-5">
        {carts.length > 0 ? (
          carts.map((cart) => {
           const quantity = Number(cart.quantity) || 1;
const price = parseFloat(
  cart.price.toString().replace(/,/g, '')
) || 0;
const totalPrice = price * quantity;
            return (
              <div
                key={cart.id}
                className="d-flex gap-3 border p-3 mt-5"
              >
                <div>
                  <img
                    src={cart.image}
                    alt="shoe"
                    height="150"
                    width="100"
                  />
                </div>

                <div className="cart-details">
                  <h5>{cart.name}</h5>

                  <h5>
                    <strong>₹ {totalPrice}</strong>
                  </h5>
<div className='mb-2'>
                    <i
                      className="bi bi-dash-circle fs-5"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        updateQuantity(
                          cart.id,
                          quantity - 1
                        )
                      }
                    ></i>

                    <span>{quantity}</span>

                    <i
                      className="bi bi-plus-circle fs-5"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        updateQuantity(
                          cart.id,
                          quantity + 1
                        )
                      }
                    ></i>
</div>
                  <div className="">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeCart(cart.id)
                      }
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <button className="btn btn-success ms-2">
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h4 className="text-center">
            Cart is Empty
          </h4>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;