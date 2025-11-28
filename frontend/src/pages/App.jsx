import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomNav from "../components/layout/nav";
import Header1 from "../components/layout/header";
import SubHeader from "../components/layout/subheader";
import ShopByCategory from "../components/layout/ShopByCategory"; 
import FeaturedProducts from "../components/layout/FeaturedProducts";
import ProductView from "../components/layout/ProductView";
import CategoryProductsPage from "../components/layout/CategoryProductPage"; 
import AdminProductManagement from "./admin/AdminProductManagement";
import SubcategoryProductsPage from "../components/layout/SubCategoryPage";
import StickyCartBar from "../components/common/StickyCartBar";
import CartPage from "../components/layout/CartPage";
import LoginPage from "../components/layout/LoginPage";
import RegisterPage from "../components/layout/RegisterPage";
import AdminLoginPage from "../components/layout/AdminLoginPage";
import DeliveryBanner from "../components/layout/DeliverySection";
import { UserProvider, useUser } from "../context/UserContext";
import { CartProvider } from "../context/CartContext";
import Footer from "../components/layout/footer";
// ---------------- HOME PAGE ----------------
function HomePage() {
  return (
    <>
      <CustomNav />
      <Header1 />
      <SubHeader />
      <ShopByCategory />
      <FeaturedProducts />
      <DeliveryBanner />
      <StickyCartBar />
      <Footer />
    </>
  );
}

// ---------------- PRODUCT PAGE ----------------
function ProductPage() {
  return (
    <>
      <CustomNav />
      <ProductView />
      <StickyCartBar />
    </>
  );
}

// ---------------- WRAPPER (gets user then provides cart) ----------------
function AppWrapper() {

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
        <Route path="/subcategory/:subcategoryName" element={<SubcategoryProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminProductManagement />} />
      </Routes>
    </CartProvider>
  );
}

// ---------------- MAIN APP ----------------
function App() {
  return (
    <Router>
      <UserProvider>
        <AppWrapper />
      </UserProvider>
    </Router>
  );
}

export default App;
