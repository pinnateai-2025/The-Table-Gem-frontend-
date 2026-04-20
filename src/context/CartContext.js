import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get("/cart");         // ✅ GET /cart
      const items = data.items || [];
      setCartItems(items);
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      // ✅ If cart not found (404), just set empty — don't crash
      if (err.response?.status === 404) {
        setCartItems([]);
        setCartCount(0);
      } else {
        console.error("Failed to fetch cart:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = async (productId, quantity = 1) => {
    if (!token) return { success: false, requiresLogin: true };
    try {
      // ✅ FIX: POST /cart not POST /cart/add
      await api.post("/cart", { productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (err) {
      console.error("Add to cart failed:", err);
      return { success: false, error: err.response?.data?.message };
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      // ✅ FIX: DELETE /cart/:itemId
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      // ✅ FIX: PUT /cart/:itemId
      await api.put(`/cart/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);