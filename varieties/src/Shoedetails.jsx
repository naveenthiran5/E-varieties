import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Menubar from './menubar';
import Footer from './Footer';
import Checkout from './checkout';

function Shoedetails() {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [mainImage, setMainImage] = useState();
const [selectedSize, setSelectedSize] = useState("");
const [showmodel,setShowmodel]=useState(false);
const [name,setName] = useState("");
const [mobile,setMobile] = useState("");
const [address,setAddress] = useState("");

const Navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/shoe/${id}`)
      .then(res => res.json())
      .then(data => {setDetails(data)
        setMainImage(data.shoe_pic)
        setSelectedSize("");
        
      })
      .catch(err => console.log(err));
  }, [id]);


  if (!details) {
    return <p>Loading...</p>;
  }


  const addToCart = (details) => {
  fetch("http://localhost:8000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      shoeId: details.id,
      name: details.name,
      price: details.price,
      size: selectedSize,
      image: mainImage,
      quantity: 1
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added to cart:", data);
      alert("Item added to cart!");
      Navigate('/cart');
    })
    .catch((err) => console.log(err));
  };
   




const placeorder= (details) =>{
      fetch("http://localhost:8000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      shoeId: details.id,
      name: details.name,
      price: details.price,
      size: selectedSize,
      image: mainImage,
      customer_name:name,
      mobile:mobile,
      address:address,
    })
  })
    .then((res) => res.json())
    .then((data) => {
      alert('order added successfully');
        Navigate(`/payment/${data.id}`);
    })
    .catch((err) => console.log(err));

  }

  const closemodel=()=>{
    setShowmodel(false);
    setName("");
    setMobile("");
    setAddress("");
  }
  return (
    <>
    <div>
      <Menubar/>
    </div>
    <div className='contain d-flex justify-content-around'>
      <div className='image'>
      <img src={mainImage} alt={details.name} />
      </div>
      <div>
      <h3 style={{fontSize:"50px"}}>{details.name}</h3>
      <p style={{fontSize:"20px"}}>Price: Rs.{details.price}</p>
      <div className='d-flex'>
        <h4>Size</h4>
        <select
        className="form-select"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="">Select Size</option>

        {details.size.map((sz) => (
          <option key={sz} value={sz}>
            {sz}
          </option>
        ))}
      </select>
      </div>
          <a href="" style={{color:"black",fontSize:"20px"}}>Find your size</a>
      <div className='d-flex gap-2 my-3'>
      {
        Object.values(details.colors).map((image)=>(
          <div key={image}>
            <img  src={image} alt="images" 
            style={{
          width: '60px',
          cursor: 'pointer',
          border: mainImage === image
            ? '2px solid black'
            : '1px solid #ccc'
        }}
        onClick={() => setMainImage(image)}
            />
          </div>
        ))
      }
      </div>
      <div>
      <button className='btn btn-light border-dark my-2' style={{width:"250px"}} 
      onClick={()=>addToCart(details)}
      >Add to cart</button><br />
      <button className='btn btn-primary border-dark my-2' style={{width:"250px"}} onClick={()=>setShowmodel(true)}>BUY NOW</button>
      {
        showmodel && (
          <div className='modal d-block' style={{background:"rgba(0,0,0,0.5)"}}>
            <div className='modal-dialog'>
              <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Customer details</h5>
                <button className='btn-close' onClick={()=>setShowmodel(false)}></button>
              </div>
              <div className="model-body">
                <input type="text" className='form-control mb-3' placeholder='Customer name'  value={name}
  onChange={(e) => setName(e.target.value)}/>
                <input type="tel" className='form-control mb-3' placeholder='mobile'  value={mobile}
  onChange={(e) => setMobile(e.target.value)}/>
                <textarea  className='form-control' rows={"3"} placeholder='address'  value={address}
  onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => closemodel()}
                >
                  Close
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => {
                    placeorder(details);
                   closemodel();
                  }}
                >
                  Confirm Order
                </button>
              </div>
            </div>
            </div>
          </div>
        )
      }
      </div>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );

}

export default Shoedetails;
