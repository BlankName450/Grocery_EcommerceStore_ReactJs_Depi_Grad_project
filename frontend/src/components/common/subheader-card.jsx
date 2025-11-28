import React from "react";
import "./subheader-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubHeaderCard = ({ icon, title, description }) => {
  return (
    <div className="subheader-card d-flex align-items-center gap-3 ">
      <div className="subheader-card__icon">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <div>
        <p className="subheader-card__title mb-0">{title}</p>
        <p className="subheader-card__description mb-0">{description}</p>
      </div>
    </div>
  );
};

export default SubHeaderCard;

