import React from "react";
import Button1 from "../common/btn";

const Header1 = () => {
  return (
    <header
      className="position-relative d-flex align-items-center justify-content-end text-white"
      style={{
        marginTop:"1%",
        marginLeft:"5%",
        marginRight:"5%",
        backgroundImage: `url(${require("../../assets/header-bg.jpg")})`,
        backgroundSize:"cover",
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat",
        height: "80vh",
        width:"90vw",
        borderRadius:"50px"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(11, 11, 11, 0.3)", // black overlay with 50% opacity
          borderRadius: "50px",
          zIndex: 1,
        }}
      ></div>

      <div
        className="position-relative"
        style={{zIndex: 2, marginRight: "12%", maxWidth: "500px" }}
      >
        <h1 className=" mb-3">Title</h1>
        <p className="mb-4 fs-5">
        Stay home & get

your daily need's
        </p>
        <Button1 title="Order Now" />
      </div>
    </header>
  );
};

export default Header1;
