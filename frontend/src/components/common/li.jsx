import React, { Component, Fragment } from "react";
const Link1  = (props) => {
    return (  <li className="me-md-5 "><a style={{cursor:"pointer"}} className={`link-offset-0 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover ${props.className}`} id={props.id}  href={props.href} title={props.title}>{props.title}</a></li> );
}
export default Link1;