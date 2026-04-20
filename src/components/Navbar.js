import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, User, ChevronDown } from "lucide-react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import logo from "../image/logo.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/wholesale", label: "Wholesale" },
  { path: "/shop", label: "Shop" },
  { path: "/newarrival", label: "New Arrival" },
  { path: "/ourstory", label: "Our Story" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!token) return;
    api.get("/auth/profile")
      .then(res => setUser(res.data.user))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setShowProfile(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Import Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .nav-font { font-family: 'Cormorant Garamond', serif; }
        .nav-link-line::after {
          content: ''; display: block; height: 1px;
          background: #0D4017; transform: scaleX(0);
          transition: transform 0.3s ease; transform-origin: left;
        }
        .nav-link-line:hover::after, .nav-link-line.active::after { transform: scaleX(1); }
      `}</style>

      <nav
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(238,238,238,0.97)' : '#EEEEEE',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        }}
      >
        {/* DESKTOP */}
        <div className="hidden xl:flex items-center h-[80px] px-10 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link to="/" className="shrink-0 mr-12">
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0D4017]/20" />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8 flex-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-font nav-link-line ${isActive ? 'active' : ''} text-[17px] tracking-wide pb-0.5 text-gray-800 hover:text-[#0D4017] transition-colors`}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: isActive ? 600 : 400 }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfile(v => !v)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-[#0D4017] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D4017]/10 flex items-center justify-center">
                  {isLoggedIn && user
                    ? <span className="text-xs font-bold text-[#0D4017]">{user.name[0].toUpperCase()}</span>
                    : <User size={15} className="text-[#0D4017]" />}
                </div>
                <ChevronDown size={13} className={`transition-transform ${showProfile ? 'rotate-180' : ''}`} />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {!isLoggedIn ? (
                    <div className="p-5">
                      <p className="nav-font text-lg font-semibold text-gray-900 mb-0.5">Welcome</p>
                      <p className="text-xs text-gray-400 mb-4">Sign in to manage your orders</p>
                      <button
                        onClick={() => { navigate("/register/login"); setShowProfile(false); }}
                        className="w-full bg-[#0D4017] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#0a3313] transition-colors"
                      >
                        Login / Sign Up
                      </button>
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                        {["Orders", "Wishlist", "Contact Us"].map(l => (
                          <Link key={l} to={`/${l.toLowerCase().replace(' ', '-')}`} onClick={() => setShowProfile(false)} className="block text-sm text-gray-600 hover:text-[#0D4017] transition-colors py-1">{l}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="p-5 bg-[#0D4017]/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0D4017] flex items-center justify-center text-white font-bold">
                            {(user?.name || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 space-y-1">
                        {[["Orders", "/orders"], ["Wishlist", "/wishlist"], ["Edit Profile", "/profile"]].map(([l, p]) => (
                          <Link key={l} to={p} onClick={() => setShowProfile(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0D4017] rounded-lg transition-colors">{l}</Link>
                        ))}
                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-[#0D4017] transition-colors">
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-[#0D4017] transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0D4017] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE */}
        <div className="xl:hidden flex justify-between items-center px-5 h-[60px]">
          <button onClick={() => setMenuOpen(v => !v)} className="text-gray-700 hover:text-[#0D4017] transition-colors">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0D4017]/20" />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="text-gray-700 hover:text-[#0D4017]"><Heart size={19} /></Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-[#0D4017]">
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0D4017] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="xl:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? '600px' : '0', opacity: menuOpen ? 1 : 0 }}
        >
          <div className="bg-white border-t border-gray-100 px-5 py-4">
            {/* User section */}
            {!isLoggedIn ? (
              <div className="pb-4 mb-4 border-b border-gray-100">
                <p className="nav-font text-base font-semibold mb-1">Welcome</p>
                <p className="text-xs text-gray-400 mb-3">Sign in to manage your orders</p>
                <button onClick={() => navigate("/register/login")} className="w-full bg-[#0D4017] text-white text-sm py-2.5 rounded-xl">Login / Sign Up</button>
              </div>
            ) : (
              <div className="pb-4 mb-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0D4017] flex items-center justify-center text-white font-bold text-sm">
                  {(user?.name || "U")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="space-y-1 mb-4">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path}
                    className={`block px-3 py-2.5 rounded-xl text-sm transition-colors nav-font text-[15px] ${isActive ? 'bg-[#0D4017]/10 text-[#0D4017] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Account links */}
            <div className="pt-3 border-t border-gray-100 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0D4017]">Edit Profile</Link>
                  <button onClick={handleLogout} className="block px-3 py-2 text-sm text-red-500 w-full text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/orders" className="block px-3 py-2 text-sm text-gray-600">Orders</Link>
                  <Link to="/wishlist" className="block px-3 py-2 text-sm text-gray-600">Wishlist</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;