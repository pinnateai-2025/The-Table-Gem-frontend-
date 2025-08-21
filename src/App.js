import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NewArrivalPage from './pages/NewArrival';
// import Gifts from './pages/Gifts';
// import Collection from './pages/Collection';
// import CustomMade from './pages/CustomMade';
// import Contact from './pages/Contact';
// import OurStory from './pages/OurStory';
// import ProductPage from './components/ProductPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newarrival" element={<NewArrivalPage />} />
      {/* <Route path="/gifts" element={<Gifts />} /> */}
      {/* <Route path="/collection" element={<Collection />} /> */}
      {/* <Route path="/custommade" element={<CustomMade />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/ourstory" element={<OurStory />} /> */}
      {/* <Route path="/productpage" element={<ProductPage />} /> */}
    </Routes>
  </Router>
);

export default App;
