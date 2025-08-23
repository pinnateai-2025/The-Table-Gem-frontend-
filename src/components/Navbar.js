import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaRegHeart } from 'react-icons/fa';
import profile from "../image/profile.svg";
import fav from "../image/Fav.svg";
import cartIcon from "../image/cart icon.svg";
import logo from "../image/logo.png";

const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/newarrival', label: 'NEW ARRIVAL' },
    { path: '/gifts', label: 'GIFTS' },
    { path: '/collection', label: 'COLLECTION' },
    { path: '/custommade', label: 'CUSTOM MADE' },
    { path: '/contact', label: 'CONTACT' },
    { path: '/ourstory', label: 'OUR STORY' },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    const toggleSearch = () => setShowSearch(!showSearch);

    return (
        <nav className="bg-[#EEEEEE] w-full shadow-md sticky top-0 z-50">

            {/* Desktop Navbar (>1024px only) */}
            <div className="hidden xl:flex items-center relative mx-auto h-[90px]">
                {/* Logo */}
                <div className="flex items-center absolute left-0 px-6 lg:px-8">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full object-cover cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Nav Links - Center */}
                <div className="flex items-center mx-auto 
                  space-x-6 lg:space-x-8 xl:space-x-10 
                  text-sm lg:text-base font-medium">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-2 lg:px-3 py-1 rounded transition duration-200 ${isActive
                                    ? 'underline text-black'
                                    : 'text-black hover:border-b-2 hover:border-[#0D4017]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Icons */}
                <div className="flex items-center absolute right-0 px-6 lg:px-8 space-x-3 lg:space-x-4">
                    <img src={profile} alt="Profile" className="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer" />
                    <img src={fav} alt="Fav" className="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer" />
                    <img src={cartIcon} alt="Cart" className="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer" />
                </div>
            </div>

            {/* Mobile/Tablet Navbar (≤1024px) */}
            <div className="xl:hidden flex justify-between items-center px-4 h-[60px] max-[426px]:h-[50px] max-[426px]:px-2">
                {/* Left: Menu & Search */}
                <div className="flex items-center space-x-4 max-[426px]:space-x-2">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <FaTimes size={20} className="text-black max-[426px]:w-4 max-[426px]:h-4" />
                        ) : (
                            <FaBars size={20} className="text-black max-[426px]:w-4 max-[426px]:h-4" />
                        )}
                    </button>
                    <button onClick={toggleSearch}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-black max-[425px]:w-5 max-[425px]:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Right: Icons + Logo */}
                <div className="flex items-center space-x-4 max-[426px]:space-x-2">
                    {/* Icons */}
                    <img src={profile} alt="Profile" className="w-6 h-6 cursor-pointer max-[426px]:w-4 max-[426px]:h-4" />
                    <FaRegHeart size={22} className="hover:text-[#0D4017] w-6 h-6 max-[426px]:w-4 max-[426px]:h-4" />
                    <img src={cartIcon} alt="Cart" className="w-6 h-6 cursor-pointer max-[426px]:w-4 max-[426px]:h-4" />

                    {/* Logo */}
                    <img src={logo} alt="Logo" className="w-[50px] h-[50px] rounded-full object-cover max-[426px]:w-[30px] max-[426px]:h-[30px]" />
                </div>
            </div>

            {/* Search Bar (visible if toggled) */}
            {showSearch && (
                <div className="absolute top-[60px] left-0 w-full bg-white px-4 py-3 shadow-md z-40 
                  xl:top-[90px] xl:right-8 xl:left-auto xl:w-[300px] xl:rounded-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D4017]"
                    />
                </div>
            )}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white px-6 py-4 shadow-md border-t z-40">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-2 px-3 rounded font-medium max-[426px]:text-[12px] ${isActive ? 'underline text-[#0D4017]' : 'text-[#0D4017]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
