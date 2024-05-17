import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./Pages/HomePage";

import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignUp from "./Pages/AdminSignUp";
import { useState } from "react";
import UserLogin from "./Pages/UserLogin";
import UserSignUp from "./Pages/UserSignUp";
import Error from "./Pages/Error";
import Profile from "./Pages/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationPage from "./Pages/VerificationPage";
import ResetPassword from "./Pages/ResetPassword";
import Forgotpassword from "./Pages/Forgotpassword";
import { useCart } from "./utils/context";
import "./styles.css"; // Import your CSS file
import ProductsCatalog from "./Pages/ProductsCatalog";
// import Catalog from "./Pages/catalog";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./components/cart";
import Footer from "./components/Footer";
function App() {
  // const { cart } = useCart();
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleProductClick = (product) => {
    let isPresent = false;
    cart.forEach((item) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    product.amount = 1;
    setCart([...cart, product]);
  };

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };
  return (
    <>
      <Navbar size={cart.length || 0} />
      {warning && (
        <div className="warning p-6 bg-red-300 border text-red-950 font-medium w-1/2 mx-auto">
          Item is already added to your cart
        </div>
      )}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/products"
          element={<ProductsCatalog handleProductClick={handleProductClick} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetails handleProductClick={handleProductClick} />}
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
          }
        />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />

        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/reset-Password/:token" element={<ResetPassword />} />
        <Route path="/reset-Password/" element={<ResetPassword />} />
        <Route path="/forgot-Password" element={<Forgotpassword />} />
        <Route path="/not-found" element={<Error />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
