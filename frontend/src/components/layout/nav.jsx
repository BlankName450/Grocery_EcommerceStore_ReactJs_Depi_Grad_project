import React, { useEffect, useRef, useState } from "react";
import "./nav.css";
import {
  faSearch,
  faUser,
  faBars,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryMenu from "./category-menu";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserMenuBox from "../common/UserMenu";
const CustomNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const searchInputRef = useRef(null);

  // const categories = [
  //   {
  //     name: "Vegetables",
  //     subcategories: ["Leafy Greens", "Root Vegetables", "Herbs"],
  //   },
  //   {
  //     name: "Organic",
  //     subcategories: ["Seasonal Picks", "Farm Fresh", "Bundles"],
  //   },
  //   {
  //     name: "Snacks & Beverages",
  //     subcategories: ["Juices", "Chips", "Energy Bars"],
  //   },
  //   {
  //     name: "Fish & Meat",
  //     subcategories: ["Seafood", "Red Meat", "Poultry"],
  //   },
  //   {
  //     name: "Dairy",
  //     subcategories: ["Milk", "Cheese", "Yogurt"],
  //   },
  //   {
  //     name: "Bakery & Pastry",
  //     subcategories: ["Breads", "Cakes", "Croissants"],
  //   },
  // ];

  const categories = [
  { name: "Vegetables", subcategories: ["Leafy Greens", "Root Vegetables", "Herbs", "Packaged"] },
  { name: "Organic", subcategories: ["Spices & Seasonings", "Honey & Syrups", "Cooking Oils", "Vinegars"] },
  { name: "Snacks & Beverages", subcategories: ["Juices", "Chips", "Energy Bars", "Drinks", "Coffee & Tea", "Sweets & Chocolate", "Pantry"] },
  { name: "Fish & Meat", subcategories: ["Seafood", "Red Meat", "Poultry", "Cold Cuts", "Sausage", "Ground Meat", "Pork", "Plant-Based"] },
  { name: "Dairy", subcategories: ["Milk", "Cheese", "Yogurt", "Eggs", "Cottage Cheese"] },
  { name: "Bakery & Pastry", subcategories: ["Breads", "Cakes", "Croissants", "Muffins", "Pastries", "Pies", "Buns"] }
];


  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY <= 80) {
        setSearchActive(false); // reset search when going back up
        setOpenCategory(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const { user } = useUser();
const navigate = useNavigate();
  const closeSearchField = () => {
    setSearchActive(false);
    searchInputRef.current?.blur();
  };

  const toggleCategory = (name) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenCategory(null);
  };

  const handleHoverChange = (name) => {
    setOpenCategory(name);
  };

  // Close search when clicking outside
  useEffect(() => {
    const closeSearch = () => {
      closeSearchField();
    };

    if (searchActive) document.addEventListener("click", closeSearch);
    return () => document.removeEventListener("click", closeSearch);
  }, [searchActive]);

  // Autofocus search when activated in compact mode
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchKeyDown = (e) => {
    if (!searchActive) return;

    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      closeSearchField();
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-lg sticky-top py-2"
        style={{ zIndex: 999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container d-flex align-items-center">
          {/* Mobile menu toggle */}
          <button
            className="category-toggle d-flex d-lg-none me-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
            aria-label="Toggle categories menu"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>

          {/* Logo */}
          <a href="/" className="navbar-brand fw-bold me-auto">Title</a>

          {/* CENTER AREA: Search input (default) or subnav links (scrolled) */}
          <div
            className="d-none d-lg-flex justify-content-center flex-grow-1 position-relative"
            style={{ transition: "0.3s ease" }}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What Are You Looking For?"
              className={`top-search-input ${
                scrolled ? "scrolled-state" : ""
              } ${searchActive ? "active-search" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleSearchKeyDown}
            />

            {/* Links appear only when scrolled AND NOT searching */}
            {scrolled && !searchActive && (
              <CategoryMenu
                categories={categories}
                openCategory={openCategory}
                onToggle={toggleCategory}
                onHoverChange={handleHoverChange}
                variant="inline"
              />
            )}
          </div>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            {user ? <span>Hello, {user.name}</span>:<FontAwesomeIcon
              icon={faSearch}
              size="lg"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (scrolled) {
                  setSearchActive(true);
                  setOpenCategory(null);
                } else {
                  searchInputRef.current?.focus();
                }
              }}
            />}

            

{user ? (
  <UserMenuBox />
) : (
  <FontAwesomeIcon
    icon={faUser}
    size="lg"
    className="cursor-pointer"
    onClick={() => navigate("/login")}
  />
)}
            
            <FontAwesomeIcon
  icon={faShieldAlt}
  size="lg"
  className="cursor-pointer"
  title="Admin Panel"
  onClick={() => {
    navigate("/admin-login"); // always require login
  }}
/>
          </div>
        </div>
      </nav>

      {/* Subnav (Visible only when NOT scrolled) */}
      {!scrolled && (
        <div
          className="subnav border-bottom py-2 position-sticky top-0 d-none d-lg-block"
          style={{ zIndex: 998 }}
        >
          <div className="container d-flex justify-content-center">
            <CategoryMenu
              categories={categories}
              openCategory={openCategory}
              onToggle={toggleCategory}
              onHoverChange={handleHoverChange}
              variant="subnav"
            />
          </div>
        </div>
      )}

      {/* Mobile Categories Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="mobile-menu-backdrop d-lg-none"
            onClick={toggleMobileMenu}
          />
          <div 
            className="mobile-categories-menu d-lg-none" 
            style={{ zIndex: 999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container">
              <div className="mobile-menu-header">
                <span>Categories</span>
              </div>
              <CategoryMenu
                categories={categories}
                openCategory={openCategory}
                onToggle={toggleCategory}
                variant="mobile"
              />
            </div>
          </div>
        </>
      )}

      
    </>
  );
};

export default CustomNav;