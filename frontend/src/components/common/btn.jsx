import "./btn.css";
import React from "react";
const Button1 = (props) => {
    return (
      <button className="btn sam text-dark px-4 py-2 rounded-pill" title={props.title}>
        {props.title}
      </button>
    );
  };
  
  export default Button1;