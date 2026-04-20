import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NewArrivalPage from './pages/NewArrival';
import Gifts from './pages/Gifts';
import Collection from './pages/Collection';
import Wholesale from './pages/Wholesale';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import OurStory from './pages/OurStory';
import Products from "./pages/Products";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import GiftCards from "./pages/GiftCards";
import CategoryPage from "./pages/Category";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext"; // ✅ add

const App = () => (
  <Router>
    <WishlistProvider>
      <CartProvider> {/* ✅ wrap everything */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newarrival" element={<NewArrivalPage />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/productdetails" element={<Products />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ add cart page */}
        </Routes>
      </CartProvider>
    </WishlistProvider>
  </Router>
);

export default App;