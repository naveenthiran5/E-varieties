import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menubar from './Menubar.jsx';
import Footer from './Footer';
import Shoedetails from './Shoedetails.jsx';


function Home() {

  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/shoe")
      .then(data => data.json())
      .then(data => setShoes(data))
      .catch(err => console.log(err))
  }, []);
  return (
    <div>
      <div>
        <Menubar />
      </div>
      <div className='headline my-5' style={{ textAlign: "center" }}>
        <h3>We're Making Room for <br />What's Next</h3>
        <button className='btn btn-light rounded'>Shop the sale</button>
      </div>
      <div className='headline2'>
        <h3>Comfy All Day. Cosy All year. <br /> Sustainably Made.</h3>
      </div>
      <div id="products" className="container2 mt-3">
        <div className='row'>
          {
            shoes.length > 0 ? (
              shoes.map((shoe) => {
                return <div className='col-lg-3 col-md-4 col-sm-6 col-mb-4' key={shoe.id}>
                  <div className="card" onClick={() => navigate(`/shoedetails/${shoe.id}`)}>
                    <img src={shoe.shoe_pic} alt="" />
                    <div className="card-body">
                      <h6 className='card-title'>{shoe.name}</h6>
                      <div className='blackstar my-2'>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i><span>({shoe.blackstar})</span>
                      </div>
                      <div className='goldenstar my-2'>
                        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                        <span>({shoe.rating})</span>
                      </div>
                      <div className='price'>
                        <strike>Rs.27,000.00</strike>
                        <span className='mx-2'>Rs.{shoe.price}</span>
                      </div>
                      <button className='btn btn-light border-dark b-1 my-2' style={{ width: "100%" }}>Choose options</button>
                    </div>
                  </div>
                </div>


              })


            ) : (
              <p>loading...</p>
            )
          }
        </div>
      </div>
      <div className="row g-3 brand-section">

        <div className="col-6 col-md-3">
          <div className="brand-card">
            <img src="/assets/adidas.png" alt="Adidas" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="brand-card">
            <img src="/assets/puma.png" alt="Puma" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="brand-card">
            <img src="/assets/reebok.png" alt="Reebok" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="brand-card">
            <img src="/assets/nike.png" alt="Nike" />
          </div>
        </div>

      </div>
      <div className='content2 ms-5'>
        <h4>Thesus footwear is <br /> thoughtfully designed from <br /> natural and recycled materials.</h4>
        <h2>Each pair is made for <br /> durability, keeps you comfy all <br /> and cozy all year.</h2>
      </div>
      <div className='instalink'>
        <p>Join Us on Instagram</p>
        <a href="http://instagram.com">@Varieties_shoes</a>
      </div>
      <div id='model-images' className='model-images d-flex justify-content-around'>
        <img src="\assets\boot-1.jpg" alt="" />
        <img src="\assets\boot-2.webp" alt="" />
        <img src="\assets\boot-3.jpg" alt="" />
        <img src="\assets\boot-4.jpg" alt="" />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home