import React, { Component } from 'react';
import Link1 from '../common/li';
const SubNav  = () => {
    return (
        <div
      style={{ backgroundColor: "#FFFFFF", height: "8vh" }}
      className="container-fluid d-flex flex-row justify-content-start align-items-center  py-2  mx-0"
      >
      <ul className="d-flex fs-6 list-unstyled text-black flex-row px-0 my-0 mx-0">
        <Link1 className="text-black" title="Apply Online"></Link1>
        <Link1 className="text-black" title="News"></Link1>
        <Link1 className="text-black" title="Blog Articles"></Link1>
        <Link1 className="text-black" title="CIB International"></Link1>
        <Link1 className="text-black" title="Sustainable Finance"></Link1>
        <Link1 className="text-black" title="Awards"></Link1>
      </ul>
    </div>
      );
}
export default SubNav;