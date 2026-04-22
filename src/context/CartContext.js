import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  subtotal: 0,
  grandTotal: 0,
  discountAmount: 0,
  couponCode: null,
  loading: false,
  fetchCart: () => { },
  addToCart: () => { },
  updateQuantity: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  applyCoupon: () => { },
  removeCoupon: () => { },
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);

  const token = localStorage.getItem("token");

  /* ── Parse and apply backend cart response ── */
  const applyCart = useCallback((cart) => {
    if (!cart) return;
    // Backend returns: { id, items: [...], subtotal, totalItems, grandTotal, discountAmount, couponCode }
    setCartId(cart.id);
    setCartItems(cart.items || []);
    setCartCount(cart.totalItems || 0);
    setSubtotal(Number(cart.subtotal || 0));
    setGrandTotal(Number(cart.grandTotal || 0));
    setDiscountAmount(Number(cart.discountAmount || 0));
    setCouponCode(cart.couponCode || null);
  }, []);

  /* ── Fetch cart from GET /cart ── */
  const fetchCart = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      // Not logged in — clear cart silently
      setCartItems([]);
      setCartCount(0);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      // Backend: { success: true, cart: { id, items, subtotal, totalItems, ... } }
      applyCart(data?.cart || data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired — clear cart
        setCartItems([]);
        setCartCount(0);
      }
      console.error("fetchCart error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [applyCart]);

  /* ── Fetch on mount + when token changes ── */
  useEffect(() => {
    fetchCart();
  }, [token]);

  /* ── Add to cart → POST /cart/items ── */
  const addToCart = useCallback(async (productId, quantity = 1, size, color) => {
    try {
      const { data } = await api.post("/cart/items", {
        productId,
        quantity,
        ...(size && { size }),
        ...(color && { color }),
      });
      applyCart(data?.cart || data);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.msg
        || "Failed to add to cart";
      console.error("addToCart error:", msg);
      return { success: false, message: msg };
    }
  }, [applyCart]);

  /* ── Update quantity → PATCH /cart/items/:itemId ── */
  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const { data } = await api.patch(`/cart/items/${itemId}`, { quantity });
      applyCart(data?.cart || data);
    } catch (err) {
      console.error("updateQuantity error:", err.message);
      // Refetch to stay in sync
      fetchCart();
    }
  }, [applyCart, fetchCart]);

  /* ── Remove item → DELETE /cart/items/:itemId ── */
  const removeFromCart = useCallback(async (itemId) => {
    // Optimistic update
    setCartItems(prev => {
      const next = prev.filter(i => i.id !== itemId);
      setCartCount(next.reduce((s, i) => s + i.quantity, 0));
      return next;
    });
    try {
      const { data } = await api.delete(`/cart/items/${itemId}`);
      applyCart(data?.cart || data);
    } catch (err) {
      console.error("removeFromCart error:", err.message);
      fetchCart(); // refetch on error
    }
  }, [applyCart, fetchCart]);

  /* ── Clear cart → DELETE /cart ── */
  const clearCart = useCallback(async () => {
    setCartItems([]);
    setCartCount(0);
    setSubtotal(0);
    setGrandTotal(0);
    setDiscountAmount(0);
    setCouponCode(null);
    try {
      await api.delete("/cart");
    } catch (err) {
      console.error("clearCart error:", err.message);
    }
  }, []);

  /* ── Apply coupon → POST /cart/coupon ── */
  const applyCoupon = useCallback(async (code) => {
    try {
      const { data } = await api.post("/cart/coupon", { code });
      // Refetch to get updated totals
      await fetchCart();
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Invalid coupon",
      };
    }
  }, [fetchCart]);

  /* ── Remove coupon → DELETE /cart/coupon ── */
  const removeCoupon = useCallback(async () => {
    try {
      await api.delete("/cart/coupon");
      await fetchCart();
    } catch (err) {
      console.error("removeCoupon error:", err.message);
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      subtotal,
      grandTotal,
      discountAmount,
      couponCode,
      loading,
      cartId,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);