import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Heart, Share2, ShoppingCart, Zap, Minus, Plus,
  ChevronLeft, Check, Package, RotateCcw, Shield
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const G = "'Cormorant Garamond', serif";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const { wishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [addingCart, setAddingCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
        style={{ fontFamily: G }}>
        <Package size={48} className="text-gray-200" />
        <p className="text-2xl font-light text-gray-400">No product selected</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#0D4017] text-white text-sm px-8 py-3 rounded-full hover:bg-[#0a3313] transition-all mt-2"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  /* ── derived values ── */
  const images = (product.images?.length ? product.images.map(i => i?.url || i) : [])
    .filter(Boolean);
  if (images.length === 0 && product.image_url) images.push(product.image_url);
  if (images.length === 0) images.push("/placeholder.png");

  const discount = product.mrp && Number(product.mrp) > Number(product.price)
    ? Math.round(((Number(product.mrp) - Number(product.price)) / Number(product.mrp)) * 100)
    : 0;

  const isLiked = wishlist.some(w => w.id === product.id);

  const descLines = product.description
    ? product.description.split("\n").map(l => l.trim()).filter(Boolean)
    : [];

  const inStock = (product.stock ?? 1) > 0;

  /* ── handlers ── */
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/register/login"); return; }
    setAddingCart(true);
    try {
      const { default: api } = await import("../api/axios");
      await api.post("/cart", { productId: product.id, quantity });
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2500);
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setAddingCart(false);
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/register/login"); return; }
    setBuyingNow(true);
    try {
      const { default: api } = await import("../api/axios");
      await api.post("/cart", { productId: product.id, quantity });
      navigate("/cart");
    } catch (err) {
      console.error("Buy now failed:", err);
      alert("Failed to proceed. Please try again.");
    } finally {
      setBuyingNow(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => { setShareMsg(true); setTimeout(() => setShareMsg(false), 2000); })
      .catch(() => { });
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      image_url: product.image_url,
      price: product.price,
      mrp: product.mrp,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp 0.55s ease both; }
        .thumb-active { border-color: #0D4017; opacity: 1; }
        .thumb-item { transition: all 0.2s; opacity: 0.6; cursor: pointer; }
        .thumb-item:hover { opacity: 1; }
        .img-main { transition: opacity 0.25s ease; }
      `}</style>

      <div className="bg-white min-h-screen" style={{ fontFamily: G }}>
        {/* ── Back button ── */}
        <div className="max-w-6xl mx-auto px-5 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0D4017] transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>

        {/* ── Main grid ── */}
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── LEFT: Images ── */}
          <div className="fu space-y-4">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#FAFAF7] border border-gray-100 shadow-sm aspect-square">
              <img
                src={images[selectedImg]}
                alt={product.name}
                className="img-main w-full h-full object-cover"
                onError={e => { e.currentTarget.src = "/placeholder.png"; }}
              />

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#0D4017] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {discount}% OFF
                </div>
              )}

              {/* Out of stock overlay */}
              {!inStock && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-500 tracking-widest uppercase bg-white px-4 py-2 rounded-full border border-gray-200">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  size={18}
                  className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`thumb-item shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${i === selectedImg ? "thumb-active" : "border-gray-100"
                      }`}
                  >
                    <img
                      src={src}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => { e.currentTarget.src = "/placeholder.png"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="fu space-y-6" style={{ animationDelay: "0.1s" }}>
            {/* Category */}
            {product.category?.name && (
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/60 uppercase">
                {product.category.name}
              </p>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.size && (
                <p className="text-sm text-gray-400 mt-2 tracking-wide">
                  Size / Variant: <span className="font-medium text-gray-600">{product.size}</span>
                </p>
              )}
            </div>

            {/* Price row */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-semibold text-gray-900 tracking-tight">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              {product.mrp && Number(product.mrp) > Number(product.price) && (
                <>
                  <span className="text-lg text-gray-400 line-through mb-0.5">
                    ₹{Number(product.mrp).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 mb-0.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${inStock ? "bg-emerald-400" : "bg-red-400"}`} />
              <span className={`text-xs font-medium ${inStock ? "text-emerald-600" : "text-red-500"}`}>
                {inStock ? `In Stock${product.stock ? ` (${product.stock} available)` : ""}` : "Out of Stock"}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0 w-fit border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="w-14 h-11 flex items-center justify-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-l border-gray-200 disabled:opacity-40"
                  disabled={!inStock || quantity >= (product.stock || 99)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!inStock || addingCart}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#0D4017] text-[#0D4017] font-semibold py-3.5 rounded-xl hover:bg-[#0D4017] hover:text-white transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
              >
                {addingCart ? (
                  <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Adding…</>
                ) : cartSuccess ? (
                  <><Check size={16} /> Added to Cart!</>
                ) : (
                  <><ShoppingCart size={16} /> Add to Cart</>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!inStock || buyingNow}
                className="w-full flex items-center justify-center gap-2 bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide shadow-sm shadow-green-900/20"
              >
                {buyingNow ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing…</>
                ) : (
                  <><Zap size={15} /> Buy it Now</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Package, label: "Free shipping", sub: "above ₹999" },
                { icon: RotateCcw, label: "Easy returns", sub: "within 7 days" },
                { icon: Shield, label: "Lead-free", sub: "non-toxic glaze" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center bg-[#FAFAF7] rounded-xl p-3 border border-gray-100">
                  <Icon size={16} className="text-[#0D4017] mb-1.5" />
                  <p className="text-[10px] font-semibold text-gray-700 leading-tight">{label}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Description */}
            {descLines.length > 0 ? (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-4">
                  Details
                </p>
                <div className="space-y-2.5">
                  {descLines.map((line, i) => {
                    const ci = line.indexOf(":");
                    if (ci > -1) {
                      const key = line.substring(0, ci).trim();
                      const val = line.substring(ci + 1).trim();
                      return (
                        <div key={i} className="flex gap-2 text-sm">
                          <span className="font-semibold text-gray-700 min-w-[90px] shrink-0">{key}</span>
                          <span className="text-gray-500">{val}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="text-sm text-gray-500 leading-relaxed">{line}</p>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Disclaimer */}
            <div className="bg-[#FAFAF7] border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-500">Handmade note: </span>
                Actual products may have minor variations in measurement and colour as each piece is
                handmade and hand-painted, making them truly unique. Images may slightly differ due
                to photographic resolution.
              </p>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0D4017] transition-colors"
            >
              <Share2 size={15} />
              {shareMsg ? (
                <span className="text-emerald-600 font-medium">Link copied!</span>
              ) : (
                "Share this product"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;