import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopByCategory.css";

import vegetablesImage from "../../assets/vegetables.webp";
import dairyImage from "../../assets/milk.webp";
import meatImage from "../../assets/meat.webp";
import organicImage from "../../assets/organic.webp";
import snacksImage from "../../assets/snacks.webp";
import bakeryImage from "../../assets/bakery.webp";

const categories = [
  { name: "Dairy", image: dairyImage },
  { name: "Bakery & Pastry", image: bakeryImage },
  { name: "Vegetables", image: vegetablesImage },
  { name: "Fish & Meat", image: meatImage },
  { name: "Organic", image: organicImage },
  { name: "Snacks & Beverages", image: snacksImage },
];

const CARD_WIDTH = 264;

export default function ShopByCategory() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const infiniteCategories = [...categories, ...categories, ...categories];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollLeft = categories.length * CARD_WIDTH;

    const handleScroll = () => {
      const maxScroll = categories.length * CARD_WIDTH * 2;
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft += categories.length * CARD_WIDTH;
      } else if (slider.scrollLeft >= maxScroll) {
        slider.scrollLeft -= categories.length * CARD_WIDTH;
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (distance) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const duration = 400;
    const start = slider.scrollLeft;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      slider.scrollLeft = start + distance * progress;
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="shop-by-category">
      <div className="container">
        <div className="category-header">
          <h2 className="fw-bold">Shop by Category</h2>
          <p>Visit our shop to see amazing products</p>
        </div>

        <div className="category-slider">
          <button 
            className="slider-arrow slider-arrow-left"
            onClick={() => smoothScroll(-CARD_WIDTH)}
          >
            &#8249;
          </button>

          <div className="category-track" ref={sliderRef}>
            {infiniteCategories.map((cat, i) => (
              <div
                className="category-card"
                key={`${cat.name}-${i}`}
                onClick={() => navigate(`/category/${cat.name}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <p className="category-label">{cat.name}</p>
              </div>
            ))}
          </div>

          <button 
            className="slider-arrow slider-arrow-right"
            onClick={() => smoothScroll(CARD_WIDTH)}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
