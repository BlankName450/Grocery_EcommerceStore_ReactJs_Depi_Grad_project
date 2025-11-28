import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function StickyCartBar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null;

  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);
  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div
      onClick={handleClick}
      className="sticky-cart-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        cursor: "pointer",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <FontAwesomeIcon icon={faCartShopping} size="lg" />
        <strong>
          {totalItems} {totalItems === 1 ? "Item" : "Items"} Added
        </strong>
      </div>
      <h5 style={{ margin: 0 }}>{total.toFixed(2)} EGP</h5>
    </div>
  );
}