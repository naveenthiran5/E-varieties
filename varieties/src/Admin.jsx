import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menubar from './Menubar';
import Footer from './Footer';

function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/shoe")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="admin-page">
      <Menubar />

      <div className="container-fluid my-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <i className="bi bi-box-seam me-2"></i>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    <i className="bi bi-people me-2"></i>
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    <i className="bi bi-cart me-2"></i>
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    <i className="bi bi-bar-chart me-2"></i>
                    Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className="btn btn-sm btn-primary">
                  <i className="bi bi-plus-circle me-1"></i>
                  Add Product
                </button>
              </div>
            </div>

            <h2>Manage Products</h2>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((shoe) => (
                      <tr key={shoe.id}>
                        <td>{shoe.id}</td>
                        <td>{shoe.name}</td>
                        <td>Rs.{shoe.price}</td>
                        <td>{shoe.rating}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Loading products...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
