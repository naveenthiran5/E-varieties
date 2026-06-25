import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Checkout() {
  const [checks, setChecks] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/shoe/${id}`)
      .then((res) => res.json())
      .then((data) => setChecks(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!checks) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={checks.shoe_pic}
            alt={checks.name}
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2>{checks.name}</h2>
          <h4>₹{checks.price}</h4>
          <p>{checks.description}</p>

          <button
            className="btn btn-success me-3"
            onClick={() => (alert("Order Placed Successfully"),Navigate('/'))}
          >
            Place Order
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;