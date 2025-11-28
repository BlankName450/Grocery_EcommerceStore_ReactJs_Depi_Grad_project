import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CustomNav from "../layout/nav";
const PRODUCTS_PER_PAGE = 10;

export default function CategoryProductsPage() {
  const { categoryName } = useParams(); // get category from URL
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { cart, addToCart, updateQty } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        // ✅ filter by category
        const filtered = data.filter(
          (p) => p.category.toLowerCase() === categoryName.toLowerCase()
        );

        setProducts(filtered);
        setVisibleProducts(filtered.slice(0, PRODUCTS_PER_PAGE));
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]); // refetch when category changes

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
    <div>
    <CustomNav />
    <div style={{ padding: "20px" }}>
        
      <h2 style={{ marginBottom: "10px" }}>
        {categoryName} Products
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-2">
        {visibleProducts.map((p) => (
          <div
            key={p._id}
            style={{
              flex: "0 1 calc(20% - 10px)",
              minWidth: "180px",
              marginBottom: "1rem",
            }}
          >
            <Link
              to={`/product/${p._id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card shadow-sm position-relative h-100 product-card">
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
                    onClick={(e) => e.preventDefault()}
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
                      e.preventDefault();
                      addToCart(p);
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                )}

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
                    alt="No Image"
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="text-success fw-bold">{p.price} EGP</p>
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
          <span className="fw-bold">{totalPrice.toFixed(2)} EGP</span>
        </div>
      )}
    </div>
    </div>
  );
}
