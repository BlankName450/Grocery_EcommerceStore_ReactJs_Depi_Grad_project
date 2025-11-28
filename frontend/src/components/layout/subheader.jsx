import React from "react";
import "./subheader.css";
import {
  faTruck,
  faRotateLeft,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import SubHeaderCard from "../common/subheader-card";

const SubHeader = () => {
  const highlights = [
    {
      title: "Free Delivery",
      description: "For all orders over $100",
      icon: faTruck,
    },
    {
      title: "Refundable",
      description: "Return items without damage, hassle-free",
      icon: faRotateLeft,
    },
    {
      title: "Secure Payment",
      description: "100% secure checkout",
      icon: faShieldHalved,
    },
    {
      title: "24/7 Support",
      description: "Dedicated customer service",
      icon: faHeadset,
    },
  ];

  return (
    <section className="subheader-section">
      <div className="container subheader-grid">
        {highlights.map((item) => (
          <SubHeaderCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default SubHeader;

