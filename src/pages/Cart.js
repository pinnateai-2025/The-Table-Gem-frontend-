import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Layout from "../layout/Layout";
import api from "../api/axios";
import {
  ShoppingBag, Trash2, Plus, Minus, Tag, X,
  ArrowLeft, RefreshCw, Check
} from "lucide-react";

const G = "'Cormorant Garamond', serif";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems, cartCount, subtotal, grandTotal,
    discountAmount, couponCode,
    loading, updateQuantity, removeFromCart,
    clearCart, applyCoupon, removeCoupon, fetchCart,
  } = useCart();

  const [ordering, setOrdering] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/register/login"); return; }
    // Refresh cart when page mounts
    fetchCart();
  }, []);

  /* ── Price calculations ─────────────────────────── */
  // Use backend-provided values when available, fallback to client calc
  const totalMrp = cartItems.reduce(
    (s, i) => s + i.quantity * Number(i.product?.mrp || i.product?.price || i.priceAtAddition || 0), 0
  );
  const clientSubtotal = cartItems.reduce(
    (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
  );
  const displaySubtotal = subtotal || clientSubtotal;
  const displayGrandTotal = grandTotal || clientSubtotal;
  const displayDiscount = discountAmount || (totalMrp - clientSubtotal);

  /* ── Place order ────────────────────────────────── */
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  /* ── Apply coupon ────────────────────────────────── */
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponMsg({ text: "", type: "" });
    const result = await applyCoupon(couponInput.trim().toUpperCase());
    setCouponMsg({ text: result.message, type: result.success ? "success" : "error" });
    if (result.success) setCouponInput("");
    setCouponLoading(false);
  };

  /* ── Remove coupon ───────────────────────────────── */
  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponMsg({ text: "", type: "" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <RefreshCw size={22} className="text-[#0D4017] animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');`}</style>

      <div className="bg-[#FAFAF7] min-h-screen" style={{ fontFamily: G }}>
        <div className="max-w-5xl mx-auto px-5 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-1">Your Selection</p>
              <h1 className="text-3xl font-light text-gray-900">
                Shopping Cart
                {cartCount > 0 && (
                  <span className="ml-3 text-base font-normal text-gray-400">
                    ({cartCount} item{cartCount !== 1 ? "s" : ""})
                  </span>
                )}
              </h1>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0D4017] transition-colors"
            >
              <ArrowLeft size={15} /> Continue Shopping
            </button>
          </div>

          {/* Empty state */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-24 h-24 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center mb-6">
                <ShoppingBag size={36} className="text-gray-200" />
              </div>
              <h2 className="text-3xl font-light text-gray-400 mb-2">Your cart is empty</h2>
              <p className="text-gray-300 text-sm mb-10 max-w-xs">
                Add some beautiful pieces to your cart and they'll appear here.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-[#0D4017] text-white text-sm font-medium px-10 py-3.5 rounded-full hover:bg-[#0a3313] transition-all shadow-sm"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── Cart items ── */}
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map((item) => {
                  const price = Number(item.product?.price || item.priceAtAddition || 0);
                  const mrp = Number(item.product?.mrp || price);
                  const disc = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                  const imgSrc = item.product?.image_url || "/placeholder.png";

                  return (
                    <div key={item.id}
                      className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">

                      {/* Image */}
                      <div
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer"
                        onClick={() => navigate("/productdetails", { state: { product: item.product } })}
                      >
                        <img
                          src={imgSrc}
                          alt={item.product?.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={e => { e.currentTarget.src = "/placeholder.png"; }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            {item.product?.category?.name && (
                              <p className="text-[9px] tracking-[0.2em] text-[#0D4017]/50 uppercase mb-0.5">
                                {item.product.category.name}
                              </p>
                            )}
                            <h3
                              className="text-sm font-semibold text-gray-900 truncate cursor-pointer hover:text-[#0D4017] transition-colors"
                              onClick={() => navigate("/productdetails", { state: { product: item.product } })}
                            >
                              {item.product?.name}
                            </h3>
                            {item.size && <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>}
                            {item.color && <p className="text-xs text-gray-400">Colour: {item.color}</p>}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                            title="Remove"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold text-gray-900 text-sm">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          {mrp > price && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{mrp.toLocaleString("en-IN")}
                            </span>
                          )}
                          {disc > 0 && (
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              {disc}% OFF
                            </span>
                          )}
                        </div>

                        {/* Qty + line total */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => item.quantity > 1
                                ? updateQuantity(item.id, item.quantity - 1)
                                : removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-9 text-center text-sm font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-gray-900">
                            ₹{(price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Clear cart */}
                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={12} /> Clear cart
                  </button>
                </div>
              </div>

              {/* ── Order Summary ── */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-1">Summary</p>
                    <h3 className="text-xl font-light text-gray-900">Order Details</h3>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>MRP ({cartCount} items)</span>
                      <span>₹{totalMrp.toLocaleString("en-IN")}</span>
                    </div>
                    {displayDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Product Discount</span>
                        <span>− ₹{displayDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Coupon ({couponCode})</span>
                        <span>− ₹{Number(discountAmount).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="text-emerald-600 font-medium">FREE</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-base text-gray-900">
                      <span>Total</span>
                      <span>₹{Number(displayGrandTotal).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Savings callout */}
                  {(displayDiscount > 0 || discountAmount > 0) && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 text-center">
                      <p className="text-emerald-700 text-xs font-semibold">
                        🎉 You're saving ₹{(displayDiscount + Number(discountAmount)).toLocaleString("en-IN")} on this order!
                      </p>
                    </div>
                  )}

                  {/* Coupon */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Have a coupon?
                    </p>
                    {couponCode ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-700">{couponCode}</span>
                        </div>
                        <button onClick={handleRemoveCoupon} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag size={13} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                          <input
                            value={couponInput}
                            onChange={e => setCouponInput(e.target.value.toUpperCase())}
                            onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                            placeholder="COUPON CODE"
                            className="w-full pl-8 pr-3 py-2.5 text-xs font-mono border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0D4017] transition-colors"
                          />
                        </div>
                        <button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponInput}
                          className="bg-[#0D4017] text-white text-xs font-semibold px-4 rounded-xl hover:bg-[#0a3313] transition-colors disabled:opacity-50"
                        >
                          {couponLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : "Apply"}
                        </button>
                      </div>
                    )}
                    {couponMsg.text && (
                      <p className={`text-xs mt-2 ${couponMsg.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                        {couponMsg.text}
                      </p>
                    )}
                  </div>

                  {/* Place order */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={ordering || cartItems.length === 0}
                    className="w-full bg-[#0D4017] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0a3313] transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-sm shadow-green-900/20"
                  >
                    {ordering ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order…</>
                    ) : (
                      "Place Order →"
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;