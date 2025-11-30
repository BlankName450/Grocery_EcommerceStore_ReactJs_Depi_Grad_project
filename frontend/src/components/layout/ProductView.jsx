import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../config";

export default function ProductView() {
  const { id } = useParams();
  const { cart, addToCart, updateQty } = useCart();
  const [product, setProduct] = useState(null);

  const itemInCart = cart.find((p) => p._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row g-5">

        {/* IMAGE */}
        <div className="col-md-6">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="img-fluid rounded"
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <h3 className="text-success">{product.price} EGP</h3>

          <p className="mt-4">{product.short_description}</p>

          {/* Add To Cart / Counter */}
          {!itemInCart ? (
            <button
              className="btn btn-dark px-5 py-2 mt-3"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          ) : (
            <div className="d-flex align-items-center gap-3 mt-3">
              <button
                className="btn btn-dark px-3"
                onClick={() => updateQty(product._id, -1)}
              >
                -
              </button>

              <span className="fw-bold">{itemInCart.qty}</span>

              <button
                className="btn btn-dark px-3"
                onClick={() => updateQty(product._id, +1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}