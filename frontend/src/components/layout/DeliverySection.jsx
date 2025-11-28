import React from 'react';
import DeliveryImage from "../../assets/delivery.png";
const DeliveryBanner = () => {
  return (
    // 'container-fluid' for full width, 'py-5' for vertical padding
    // We use an inline style for the specific green background color as it's not a default Bootstrap color
    <div 
      className="container-fluid py-0 d-flex align-items-center justify-content-center" 
      style={{ backgroundColor: '#A6AE86', minHeight: '400px',color:'#FDFAF6' }}
    >
      <div className="container">
        <div className="row align-items-center">
        
          <div className="col-md-6 text-start mb-md-0">
            <h1 className="display-4 fw-bold mb-3">
              Fast, Free Shipping,<br />
              Contactless Delivery.
            </h1>
            <p className="lead fs-6">
              Try it now, risk free!
            </p>
            <button 
              className="btn btn-light bg-white fw-bold px-4 py-3 shadow-sm rounded"
              style={{ fontSize: '1rem' }}
            >
              Shop Now <span className="ms-2">&rarr;</span>
            </button>
          </div>

          
          <div className="col-md-6 text-center text-md-end">
            <img 
              src={DeliveryImage} 
              alt="Delivery Person" 
              className="img-fluid"
              style={{ maxHeight: '450px' }} 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;
