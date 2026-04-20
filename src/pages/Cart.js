import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Layout from "../layout/Layout";
import api from "../api/axios";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, loading, removeFromCart, updateQuantity, clearCart } = useCart();

  const [ordering, setOrdering] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/register/login");
    }
  }, [token]);

  // ✅ Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  );

  const totalMrp = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.mrp || item.product?.price || 0),
    0
  );

  const totalDiscount = totalMrp - subtotal;

  // ✅ Place order
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      setOrdering(true);
      const { data } = await api.post("/order");
      clearCart();
      navigate("/orders", {
        state: { orderId: data.orderId, success: true }
      });
    } catch (err) {
      console.error("Order failed:", err);
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-center text-gray-600">Loading cart...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">
          My Cart {cartCount > 0 && `(${cartCount} items)`}
        </h2>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="text-6xl">🛒</div>
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-[#0D4017] text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#0D4017] border-2 border-[#0D4017] transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  {/* Product Image */}
                  <img
                    src={item.product?.image_url || "/placeholder.png"}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      navigate("/productdetails", { state: { product: item.product } })
                    }
                    onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-gray-900 truncate cursor-pointer hover:text-[#0D4017]"
                      onClick={() =>
                        navigate("/productdetails", { state: { product: item.product } })
                      }
                    >
                      {item.product?.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-1">
                      {item.product?.mrp && item.product.mrp > item.product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{Number(item.product.mrp).toFixed(0)}
                        </span>
                      )}
                      <span className="text-base font-semibold text-[#0D4017]">
                        ₹{Number(item.product?.price).toFixed(0)}
                      </span>
                      {item.product?.mrp && item.product.mrp > item.product.price && (
                        <span className="text-xs text-green-600 font-semibold">
                          {Math.round(
                            ((item.product.mrp - item.product.price) / item.product.mrp) * 100
                          )}% OFF
                        </span>
                      )}
                    </div>

                    {/* Size */}
                    {item.product?.size && (
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.product.size}
                      </p>
                    )}

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#0D4017] rounded-md">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            } else {
                              removeFromCart(item.id);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center text-[#0D4017] hover:bg-[#0D4017] hover:text-white transition rounded-l-md"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#0D4017] hover:bg-[#0D4017] hover:text-white transition rounded-r-md"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 hover:underline transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">
                      ₹{(item.quantity * (item.product?.price || 0)).toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-4 border-b pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      MRP ({cartCount} items)
                    </span>
                    <span>₹{totalMrp.toFixed(0)}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>− ₹{totalDiscount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-bold text-base">
                    <span>Total Amount</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <p className="text-green-600 text-xs text-center">
                      🎉 You save ₹{totalDiscount.toFixed(0)} on this order!
                    </p>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={ordering || cartItems.length === 0}
                  className="mt-6 w-full bg-[#0D4017] text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0D4017] border-2 border-[#0D4017] transition disabled:opacity-50"
                >
                  {ordering ? "Placing Order..." : "Place Order"}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="mt-3 w-full text-[#0D4017] py-2 text-sm hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;