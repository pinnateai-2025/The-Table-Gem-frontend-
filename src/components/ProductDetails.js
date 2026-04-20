import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Share from "../image/share.png";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [quantity, setQuantity] = useState(1);
  const { wishlist, toggleWishlist } = useWishlist();

  const images = product?.images?.length
    ? product.images
    : [product?.image_url];
  const [mainImage] = useState(images[0] || "");

  const isLiked = (id) => wishlist.some((item) => item.id === id);

  if (!product) {
    return (
      <p className="text-center text-gray-600 mt-10 text-[26px]">
        No product selected
      </p>
    );
  }

  // ✅ FIX: Parse description lines from product.description
  const descriptionLines = product.description
    ? product.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  // ✅ FIX: Calculate discount
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // ✅ FIX: Add to cart handler
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register/login");
      return;
    }
    try {
      const { default: api } = await import("../api/axios");
      await api.post("/cart", {
        productId: product.id,
        quantity,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart");
    }
  };

  // ✅ FIX: Buy it now handler
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register/login");
      return;
    }
    try {
      const { default: api } = await import("../api/axios");
      await api.post("/cart", {
        productId: product.id,
        quantity,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Buy now failed:", err);
      alert("Failed to proceed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-10 max-[768px]:gap-4 mt-[20px]">

      {/* Image */}
      <div className="space-y-4">
        <img
          src={mainImage || product.image_url}
          alt={product.name}
          className="rounded-xl w-full h-[600px] max-[768px]:h-[560px] max-[500px]:h-[400px] max-[375px]:h-[300px] object-cover shadow-lg border border-gray-200"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="relative">

          {/* Title */}
          <h1 className="font-lato font-semibold text-[36px] max-[768px]:text-[24px] leading-[120%] tracking-[0.02em] text-black">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mt-2">
            {/* ✅ FIX: use product.mrp instead of product.originalPrice */}
            {product.mrp && product.mrp > product.price && (
              <span className="font-lato font-semibold text-[16px] text-gray-400 line-through">
                ₹{Number(product.mrp).toFixed(0)}
              </span>
            )}
            <span className="font-lato font-semibold text-[20px] text-black">
              ₹{Number(product.price).toFixed(0)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-green-600 font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Icon */}
          {/* ✅ FIX: use name and image_url instead of title and image */}
          <div
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                image_url: product.image_url,
                price: product.price,
              })
            }
            role="button"
          >
            {isLiked(product.id) ? (
              <FaHeart className="w-[28px] h-[27px] text-red-500 cursor-pointer absolute right-0 top-0" />
            ) : (
              <FaRegHeart className="w-[28px] h-[27px] text-black hover:text-red-500 cursor-pointer absolute right-0 top-0" />
            )}
          </div>
        </div>

        {/* Size */}
        {product.size && (
          <p className="text-sm text-gray-600">
            <span className="font-bold">Size:</span> {product.size}
          </p>
        )}

        {/* Quantity Selector */}
        <div className="flex flex-col space-y-2">
          <p className="font-lato font-semibold text-[16px] text-black">Quantity</p>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-[35px] h-[35px] border-l border-t border-b border-[#0D4017] rounded-l-md font-semibold text-[18px] text-[#0D4017] hover:bg-[#0D4017] hover:text-white"
            >
              −
            </button>
            <div className="w-[50px] h-[35px] flex items-center justify-center border-y border-[#0D4017] font-semibold text-[14px]">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-[35px] h-[35px] border-t border-r border-b border-[#0D4017] rounded-r-md font-semibold text-[18px] text-[#0D4017] hover:bg-[#0D4017] hover:text-white"
            >
              +
            </button>
          </div>
        </div>

        {/* ✅ FIX: Add to Cart with onClick */}
        <button
          onClick={handleAddToCart}
          className="bg-white hover:bg-[#0D4017] hover:text-white py-2 px-4 rounded w-full border-2 border-[#0D4017] text-[#0d4017] transition"
        >
          Add to Cart
        </button>

        {/* ✅ FIX: Buy it now with onClick */}
        <button
          onClick={handleBuyNow}
          className="bg-[#0D4017] hover:bg-white hover:text-[#0D4017] py-2 px-4 rounded w-full border-2 border-[#0D4017] text-white transition"
        >
          Buy it now
        </button>

        {/* ✅ FIX: Dynamic description from API instead of hardcoded text */}
        <div className="mt-4 space-y-2">
          {descriptionLines.length > 0 ? (
            descriptionLines.map((line, index) => {
              // Check if line has "Key: Value" format
              const colonIndex = line.indexOf(":");
              if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                return (
                  <p
                    key={index}
                    className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black"
                  >
                    <span className="font-bold">{key}:</span> {value}
                  </p>
                );
              }
              return (
                <p
                  key={index}
                  className="font-lato text-[14px] text-gray-600"
                >
                  {line}
                </p>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No description available.</p>
          )}
        </div>

        {/* Disclaimer */}
        <p className="font-lato text-[14px] max-[768px]:text-[12px] text-gray-500 mt-4">
          Disclaimer: The actual products may be subject to minor variations in
          measurement and colour specification as they are handmade, hand-painted
          that make them unique. They might slightly vary from the images shown on
          website due to different photographic resolutions. Lead-free and Non-Toxic.
        </p>

        {/* Share */}
        <div className="flex items-center mt-[40px] space-x-2">
          <img src={Share} alt="Share icon" className="w-[16px] h-[16px]" />
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied!");
            }}
            className="font-lato font-semibold text-[16px] text-red-500 hover:underline"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;