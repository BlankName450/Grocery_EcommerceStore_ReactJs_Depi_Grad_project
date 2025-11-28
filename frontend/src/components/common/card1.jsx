import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faIdCard,faCreditCard,faNewspaper } from '@fortawesome/free-solid-svg-icons'; 



const Card1 = ({ icon, title }) => {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center p-4 mx-2 my-3 border-0 shadow-sm"
        style={{
            width: "100%",          
            maxWidth: "315px",    
            height: "190px",       
          backgroundColor: "#fff",
        }}
      >
       
        <div
          className="d-flex align-items-center justify-content-center p-3"
          style={{
            width: "62px",
            height: "57px",
            borderRadius: "50%",
            border: "1px solid #004aad",
            backgroundColor: "#eaf1ff",
          }}
        >
          <FontAwesomeIcon  style={{height:"50px"}} icon={icon} color="#004aad" />
        </div>
  
        
        <h6 className="fw-semibold fs-4 text-primary ms-1">{title}</h6>
      </div>
    );
  };
  
  export default Card1;
