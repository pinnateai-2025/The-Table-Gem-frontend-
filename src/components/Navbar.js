import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaRegHeart } from "react-icons/fa";
import api from "../api/axios";

import profile from "../image/profile.svg";
import fav from "../image/Fav.svg";
import cartIcon from "../image/cart icon.svg";
import logo from "../image/logo.png";

const navLinks = [
  { path: "/", label: "HOME" },
  { path: "/wholesale", label: "WHOLESALE" },
  { path: "/contact", label: "CONTACT" },
  { path: "/ourstory", label: "OUR STORY" },
  { path: "/newarrival", label: "NEW ARRIVAL" },
  { path: "/shop", label: "SHOP" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log("Profile error:", err);
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleDropdownLinkClick = () => {
    setShowProfileMenu(false);
  };

  return (
    <nav className="bg-[#EEEEEE] w-full shadow-md sticky top-0 z-50">

      {/* DESKTOP NAVBAR */}
      <div className="hidden xl:flex items-center relative mx-auto h-[90px]">

        {/* LOGO */}
        <div className="flex items-center absolute left-0 px-6 lg:px-8">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full object-cover"
            />
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center mx-auto space-x-10 text-base font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 py-1 ${
                  isActive
                    ? "underline text-black"
                    : "text-black hover:border-b-2 hover:border-[#0D4017]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center absolute right-0 px-6 lg:px-8 space-x-4">

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={profile}
              alt="Profile"
              className="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />

            {showProfileMenu && (
              <div className="absolute right-0 mt-4 w-64 bg-white shadow-lg rounded-lg p-4 z-50">

                {/* NOT LOGGED IN */}
                {!isLoggedIn && (
                  <>
                    <div className="pb-3 border-b">
                      <p className="font-semibold text-lg">Welcome</p>
                      <p className="text-sm text-gray-500">
                        To access account and manage orders
                      </p>
                      <button
                        onClick={() => {
                          navigate("/register/login");
                          handleDropdownLinkClick();
                        }}
                        className="mt-3 w-full border border-red-400 text-red-500 py-2 rounded hover:bg-red-50"
                      >
                        LOGIN / SIGNUP
                      </button>
                    </div>

                    <div className="pt-3 flex flex-col space-y-2 text-sm">
                      <Link to="/orders" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Orders</Link>
                      <Link to="/wishlist" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Wishlist</Link>
                      <Link to="/gift-cards" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Gift Cards</Link>
                      <Link to="/contact" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Contact Us</Link>
                    </div>
                  </>
                )}

                {/* LOGGED IN */}
                {isLoggedIn && (
                  <>
                    <div className="border-b pb-3">
                      <p className="font-semibold text-base">
                        {user ? `Hello ${user.name}` : "Hello"}
                        </p>
                      <p className="text-sm text-gray-500">
                        {user ? user.email : "Loading..."}
                      </p>
                    </div>

                    <div className="py-3 flex flex-col space-y-2 text-sm border-b">
                      <Link to="/orders" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Orders</Link>
                      <Link to="/wishlist" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Wishlist</Link>
                      <Link to="/gift-cards" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Gift Cards</Link>
                      <Link to="/contact" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Contact Us</Link>
                    </div>

                    <div className="py-3 flex flex-col space-y-2 text-sm border-b">
                      <Link to="/profile" onClick={handleDropdownLinkClick} className="hover:text-[#0D4017]">Edit Profile</Link>
                    </div>

                    <div className="pt-3">
                      <button
                        className="text-red-500 text-sm text-left hover:text-red-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}

              </div>
            )}
          </div> {/* ✅ FIX: closes dropdownRef div */}

          <Link to="/wishlist">
            <img src={fav} alt="Fav" className="w-6 h-6 lg:w-7 lg:h-7" />
          </Link>

          <img src={cartIcon} alt="Cart" className="w-6 h-6 lg:w-7 lg:h-7" />

        </div> {/* closes right icons */}
      </div> {/* closes desktop navbar */}

      {/* MOBILE NAVBAR */}
      <div className="xl:hidden flex justify-between items-center px-4 h-[60px]">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <Link to="/">
          <img src={logo} alt="Logo" className="w-[40px] h-[40px] rounded-full" />
        </Link>

        <div className="flex items-center space-x-3">
          <Link to="/wishlist">
            <FaRegHeart size={20} />
          </Link>
          <img src={cartIcon} alt="Cart" className="w-5 h-5" />
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="xl:hidden bg-white shadow-md">
          <div className="py-4 px-6 border-b">
            {!isLoggedIn ? (
              <>
                <p className="font-semibold text-lg">Welcome</p>
                <p className="text-sm text-gray-500">To access account and manage orders</p>
                <button
                  onClick={() => navigate("/register/login")}
                  className="mt-3 w-full border border-red-400 text-red-500 py-2 rounded"
                >
                  LOGIN / SIGNUP
                </button>
                <div className="mt-3 flex flex-col space-y-2 text-sm">
                  <Link to="/orders" className="hover:text-[#0D4017]">Orders</Link>
                  <Link to="/wishlist" className="hover:text-[#0D4017]">Wishlist</Link>
                  <Link to="/gift-cards" className="hover:text-[#0D4017]">Gift Cards</Link>
                  <Link to="/contact" className="hover:text-[#0D4017]">Contact Us</Link>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold">Hello {user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <div className="mt-3 flex flex-col space-y-2 text-sm">
                  <Link to="/orders" className="hover:text-[#0D4017]">Orders</Link>
                  <Link to="/wishlist" className="hover:text-[#0D4017]">Wishlist</Link>
                  <Link to="/gift-cards" className="hover:text-[#0D4017]">Gift Cards</Link>
                  <Link to="/contact" className="hover:text-[#0D4017]">Contact Us</Link>
                </div>
              </>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 pl-6 ${isActive ? "text-[#0D4017]" : ""} border-b`}
              >
                {link.label}
              </Link>
            );
          })}

          {isLoggedIn && (
            <div className="border-t">
              <Link to="/profile" className="block py-3 pl-6">Edit Profile</Link>
              <button className="block py-3 pl-6 text-red-500" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;