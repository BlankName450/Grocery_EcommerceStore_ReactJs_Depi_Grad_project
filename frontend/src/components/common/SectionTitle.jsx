import React, { Component } from 'react';
const Title = (props) => {
    return (
      <h5 style={{marginTop:"3rem", color:"#656565"}} title={props.title}>
        {props.title}
      </h5>
    );
  };
  
  export default Title;