import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API_URL from "../../config";

const PRODUCTS_PER_PAGE = 10;

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ use global cart from context
  const { cart, addToCart, updateQty } = useCart();

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log('Fetching products from:', `${API_URL}/api/products`);
      const res = await fetch(`${API_URL}/api/products`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Products received:', data);

      if (!Array.isArray(data)) {
        console.error('Products data is not an array:', data);
        setProducts([]);
        setVisibleProducts([]);
        return;
      }

      // shuffle products randomly
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      setProducts(shuffled);
      setVisibleProducts(shuffled.slice(0, PRODUCTS_PER_PAGE));
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
      setVisibleProducts([]);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newVisible = products.slice(0, nextPage * PRODUCTS_PER_PAGE);
      setVisibleProducts(newVisible);
      setPage(nextPage);
      setLoading(false);
    }, 500);
  };

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <>
      <section className="my-5">
        <h3 className="fw-bold mb-4">Featured Products</h3>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          {visibleProducts.map((p) => (
            <div
              key={p._id}
              style={{
                flex: "0 1 calc(20% - 10px)", // 5 per row
                minWidth: "180px",
                marginBottom: "1rem",
              }}
            >
              <Link
                to={`/product/${p._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card shadow-sm position-relative h-100 product-card">
                  {/* ---- CART BTN OR COUNTER ---- */}
                  {cart.find((c) => c._id === p._id) ? (
                    <div
                      className="position-absolute d-flex align-items-center"
                      style={{
                        top: "10px",
                        right: "10px",
                        background: "#222",
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "4px 8px",
                        gap: "10px",
                        zIndex: 10,
                      }}
                      onClick={(e) => e.preventDefault()} // prevent navigation
                    >
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(p._id, -1);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <span>{cart.find((c) => c._id === p._id).qty}</span>

                      <button
                        className="btn btn-sm btn-dark"
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(p._id, +1);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-light position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        borderRadius: "50%",
                        zIndex: 10,
                      }}
                      onClick={(e) => {
                        e.preventDefault(); // prevent navigation
                        addToCart(p);
                      }}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  )}

                  {/* ---- IMAGE ---- */}
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="card-img-top"
                      style={{ height: "160px", objectFit: "contain" }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/160x160?text=No+Image"
                      alt="Product placeholder"
                      className="card-img-top"
                      style={{ height: "160px", objectFit: "contain" }}
                    />
                  )}

                  {/* ---- TEXT ---- */}
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="text-success fw-bold">{p.price} $</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {!loading && visibleProducts.length < products.length && (
          <div className="text-center my-4">
            <button className="btn btn-dark px-4 py-2" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </section>

      {/* ---- BOTTOM CART BAR ---- */}
      {cart.length > 0 && (
        <div
          className="position-fixed w-100 d-flex justify-content-between align-items-center"
          style={{
            bottom: 0,
            left: 0,
            background: "#222",
            color: "#fff",
            padding: "15px 20px",
            zIndex: 9999,
          }}
        >
          <span>Added {cart.reduce((s, i) => s + i.qty, 0)} Items</span>
          <span className="fw-bold">{totalPrice.toFixed(2)} $</span>
        </div>
      )}
    </>
  );
}
console.log("API_URL =", API_URL);