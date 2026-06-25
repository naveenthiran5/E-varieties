import React from "react";

function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <div className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">
            Something New is Coming. Join the Waitlist.
          </h2>
          <p className="lead">
            Subscribe to our newsletter. Get waitlisted for what is to come.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light">
        <div className="container py-5">
          <div className="row g-4">
            
            <div className="col-12 col-md-6 col-lg-3">
              <h3>Varieties</h3>
              <p>
                Socially and environmentally progressive outdoor footwear
              </p>

              <div className="d-flex gap-3 fs-4">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-tiktok"></i>
                <i className="bi bi-pinterest"></i>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <h5>Our Shop</h5>

              <p>All Products</p>
              <p>The Weekend Boot™</p>
              <p>The Anyday Rain Boot™</p>
              <p>The Modern Winter Boot™</p>
              <p>The Winter Weekend Boot Z™</p>
              <p>The Varieties™ Clog</p>
              <p>Accessories</p>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <h5>Help</h5>

              <p>Size Guide</p>
              <p>Shipping Policy</p>
              <p>Refund Policy</p>
              <p>Wear & Care FAQ</p>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <h5>About Us</h5>

              <p>Values</p>
              <p>Contact Us</p>
            </div>
          </div>

          <hr className="my-4" />

          {/* Payment Icons */}
          <div className="text-center">
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
              <img src="/assets/AE.png" alt="" width="40" />
              <img src="/assets/ap.png" alt="" width="40" />
              <img src="/assets/ban.jpg" alt="" width="40" />
              <img src="/assets/dc.png" alt="" width="40" />
              <img src="/assets/gpay.png" alt="" width="40" />
              <img src="/assets/mc.png" alt="" width="40" />
              <img src="/assets/visa.png" alt="" width="40" />
            </div>

            <p className="mb-0 small">
              © 2026 Varieties™ Outdoors Powered by Shopify
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;