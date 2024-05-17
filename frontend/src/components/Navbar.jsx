import React, { useState } from "react";
import { IoMdMenu, IoMdSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/UserApiSlice";
import { logout } from "../slices/AuthSlice";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";

const Navbar = ({ size }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutApiCall] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductsClick = () => {
    // Navigate to the products page
    navigate("/products");
    // Close the mobile menu if open
    setMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    // Navigate to the products page
    navigate("/cart");
    // Close the mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between mx-auto max-w-[1200px] my-5 px-5 h-16 text-3xl">
        <a href="/" className="w-80">
          <img className="cursor-pointer" src={Logo} alt="company logo" />
        </a>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <IoMdMenu className="w-8 h-8" />
          </button>
        </div>
        <div className="hidden md:flex items-center border w-2/5">
          <IoMdSearch className="mx-3 h-12 w-12" />
          <input
            className="outline-none w-11/12"
            type="search"
            placeholder="Search"
          />
          <button className="ml-auto h-full bg-amber-400 px-6 py-1 hover:bg-yellow-300">
            Search
          </button>
        </div>
        <div className="hidden md:flex gap-6">
          <div onClick={handleProductsClick}>
            <a className="inline-block2 p-3 duration-200 text-3xl md:text-lg cursor-pointer">
              Products
            </a>
          </div>
          {/* <div>
            <TiShoppingCart onClick={() => setShow(true)} />
          </div> */}
          <div onClick={handleCartClick} className="relative">
            <a className="inline-block duration-200 text-3xl md:text-lg cursor-pointer p-3">
              Cart
            </a>
            <p className="absolute bg-red-600 rounded-full w-6 h-6 text-center text-white text-sm flex items-center justify-center top-0 right-0 -mr-2">
              {size}
            </p>
          </div>

          {/* <div onClick={handleCartClick}>
            <a className="inline-block px-1 duration-200 text-3xl sm:text-lg cursor-pointer">
              Cart {size}
            </a>
          </div> */}
          <div className="flex justify-between items-center gap-6">
            {userInfo ? (
              <>
                <a
                  href="/profile"
                  className="inline-block px-1 duration-200 text-3xl md:text-lg cursor-pointer font-bold"
                >
                  {userInfo.data.name}
                </a>
                <div
                  onClick={handleLogOut}
                  className="inline-block px-1 duration-200 text-3xl md:text-lg  cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <div className="text-3xl md:text-lg ">
                <a href="/login">Sign In</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <section className="absolute z-50 flex flex-col items-center justify-center top-16 left-0 w-full h-screen bg-white">
          <div className="flex flex-col items-center gap-3">
            <TiShoppingCart />

            <a className="inline-block px-1 duration-200 text-lg sm:text-lg cursor-pointer">
              Cart {size}{" "}
            </a>

            <div className="flex justify-between items-center gap-4">
              {userInfo ? (
                <>
                  <a
                    href="/profile"
                    className="inline-block px-1 duration-200 text-lg sm:text-lg cursor-pointer font-bold"
                  >
                    {userInfo.data.name}
                  </a>
                  <div
                    onClick={handleLogOut}
                    className="inline-block px-1 duration-200 text-lg sm:text-lg cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <div>
                  <a href="/login">Sign In</a>
                </div>
              )}
            </div>
          </div>
          <form className="flex items-center border w-2/3">
            <IoMdSearch className="mx-3 h-4 w-4" />
            <input
              className="outline-none w-11/12"
              type="search"
              placeholder="Search"
            />
            <button className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300">
              Search
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Navbar;
