import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NewArrivalPage from './pages/NewArrival';
import Gifts from './pages/Gifts';
import Collection from './pages/Collection';
import CustomMade from './pages/CustomMade';
import Contact from './pages/Contact';
import OurStory from './pages/OurStory';
import Products from "./pages/Products";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";
import Serveware from "./pages/Serveware";
import Platter from "./pages/Platter";

const App = () => (
  <Router>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newarrival" element={<NewArrivalPage />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/custommade" element={<CustomMade />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/productdetails" element={<Products />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/serveware" element={<Serveware />} />
        <Route path="/serveware/platter" element={<Platter />} />
      </Routes>
    </WishlistProvider>
  </Router>
);

export default App;
