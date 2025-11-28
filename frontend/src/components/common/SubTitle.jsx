import React, { Component } from 'react';
const SubTitle = (props) => {
    return (
      <h2 style={{marginTop:"0.25rem", color:"#F58420"}} title={props.title}>
        {props.title}
      </h2>
    );
  };
  
  export default SubTitle;