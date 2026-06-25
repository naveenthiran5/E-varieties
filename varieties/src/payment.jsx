import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  const [collection, setCollection] = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setCollection(data))
      .catch((e) => console.log(e));
  }, [id]);

  if (!collection) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-5 border p-3">
          <h3>Product Details</h3>

          <img
            src={collection.image}
            alt="product"
            width="150"
          />

          <p><b>Product:</b> {collection.name}</p>
          <p><b>Size:</b> {collection.size}</p>
          <p><b>Price:</b> ₹{collection.price}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-7 border p-3">
          <h3>Payment Options</h3>

          <select
            className="form-select mb-3"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="CARD">Debit / Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="COD">Cash On Delivery</option>
          </select>

          {/* CARD PAYMENT */}
          {paymentType === "CARD" && (
            <div className="border p-3">
              <h4>Card Payment</h4>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Card Holder Name"
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Card Number"
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="CVV"
              />

              <button
                className="btn btn-success"
                onClick={() => {
                  alert("Payment Successful");
                  navigate("/");
                }}
              >
                PAY ₹{collection.price}
              </button>
            </div>
          )}

          {/* UPI PAYMENT */}
          {paymentType === "UPI" && (
            <div className="border p-3">
              <h4>UPI Payment</h4>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter UPI ID"
              />

              <button
                className="btn btn-success"
                onClick={() => {
                  alert("Payment Successful");
                  navigate("/");
                }}
              >
                PAY ₹{collection.price}
              </button>
            </div>
          )}

          {/* COD */}
          {paymentType === "COD" && (
            <div className="border p-3">
              <h4>Cash On Delivery</h4>

              <button
                className="btn btn-primary"
                onClick={() => {
                  alert("Order Successfully Placed");
                  navigate("/");
                }}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Payment;