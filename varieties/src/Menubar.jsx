import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Menubar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
   const [shoes, setShoes] = useState([]);
   const navigate = useNavigate();
   const [cart,setCart]=useState([]);
  useEffect(()=>{
    fetch(`http://localhost:8000/shoe`)
    .then(data=>data.json())
    .then(data=>setShoes(data))
    .catch(err=> console.log(err))
  },[]);


  const filteredShoes = shoes.filter((shoe) =>
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    fetch('http://localhost:8000/cart')
    .then(data=>data.json())
    .then(data=>setCart(data))
  },[]);

  return (
    <div className="menubar">
      {!showSearch ? (
       
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
          <div className="container">
            <a href="/" className="navbar-brand ms-4">
              <img src="../assets/logo.png" alt="logo" height="50px" width="50px"/>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-target="#menu"
              data-bs-toggle="collapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              id="menu"
              className="collapse navbar-collapse justify-content-start"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href={'/'} className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/aboutus" className="nav-link">
                    About us
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/#model-images" className="nav-link">Gallery</a>
                </li>
                <li className="nav-item">
                  <a href="/#products" className="nav-link">Products</a>
                </li>
              </ul>

              <div className="d-flex ms-auto gap-4">
                <a href={'/cart'} style={{textDecoration:"none", color:"black"}}>
                  <i className="bi bi-bag"></i>
                  <sup className="cart-count rounded-full" id="cart-count">{cart.length}</sup>
                </a>
                
                <a href="/login" style={{ color: "black" }}>
                  <i className="bi bi-person"></i>
                </a>

                {/*  SEARCH ICON */}
                <i
                  className="bi bi-search"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowSearch(true)}
                ></i>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar bg-light fixed-top ">
          <div className="container d-flex" key={shoes.id}>
            <input
              type="text"
              className="form-control me-auto"
              placeholder="Search products..."
              autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              className="btn btn-outline-dark ms-auto"
              onClick={() => setShowSearch(false)}
            >
              Close
            </button>
          </div>

          {searchTerm && (
      <div className="bg-white w-100 mt-2 shadow p-2">
        {filteredShoes.length > 0 ? (
          filteredShoes.map((shoe) => (
            <div key={shoe.id} className="p-2 border-bottom" 
             onClick={() => {
            navigate(`/shoedetails/${shoe.id}`);
            setShowSearch(false);
            setSearchTerm("");
          }} style={{cursor:"pointer"}}>
              {shoe.name}
            </div>
          ))
        ) : (
          <div className="p-2 text-muted">No products found</div>
        )}
      </div>
    )}

        </nav>
      )}
      
    </div>
    
  );
}

export default Menubar;