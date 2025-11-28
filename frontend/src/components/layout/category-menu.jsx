import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CategoryMenu = ({ categories, openCategory, onToggle, variant = "inline", onHoverChange }) => {
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (name) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (typeof onHoverChange === "function") onHoverChange(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      if (typeof onHoverChange === "function") onHoverChange(null);
    }, 150); // 150ms delay to allow smooth hover
    setHoverTimeout(timeout);
  };

  if (variant === "mobile") {
    return (
      <div className="mobile-categories-menu-list">
        {categories.map((category) => {
          const isOpen = openCategory === category.name;
          return (
            <div className="mobile-category" key={category.name}>
              <button
                className="mobile-category-btn"
                onClick={() => onToggle(category.name)}
              >
                <span>{category.name}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`chevron-icon ${isOpen ? "rotated" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="mobile-subcategory-list">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      to={`/subcategory/${encodeURIComponent(sub)}`}
                      className="mobile-subcategory"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const listClassName =
    variant === "subnav"
      ? "category-menu subnav-links"
      : "category-menu center-nav-links fade-in";

  return (
    <ul className={listClassName}>
      {categories.map((category) => {
        const isOpen = openCategory === category.name;
        return (
          <li
            className={`nav-item dropdown-wrapper ${isOpen ? "open" : ""}`}
            key={category.name}
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="nav-link fw-medium dropdown-toggle-btn"
              onClick={(e) => {
                e.preventDefault();
                onToggle(category.name);
              }}
            >
              <span>{category.name}</span>
              <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
            </button>

            <div
  className="dropdown-panel"
  style={{
    position: "absolute",
    top: "100%",
    left: "50%",           // center horizontally
    transform: "translateX(-50%)", // shift back by 50% of panel width
    display: isOpen ? "block" : "none",
    pointerEvents: isOpen ? "auto" : "none",
    zIndex: 999,
    whiteSpace: "nowrap",  // prevent subcategory wrapping
  }}
>
  {category.subcategories.map((sub) => (
    <Link
      key={sub}
      to={`/subcategory/${encodeURIComponent(sub)}`}
      className="dropdown-link"
    >
      {sub}
    </Link>
  ))}
</div>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryMenu;
