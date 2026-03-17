import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SubscribeSection from '../components/SubscribeSection';
import Footer2 from '../components/Footer2';
import BestSelling from '../components/BestSelling';
import Footer1 from '../components/Footer1';
import Slider1 from '../components/Slider1';
import Slider2 from '../components/Slider2';
import CategoriesButton from '../components/CategoriesButton';
import api from '../api/axios';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/category");

        // ✅ Only top-level categories (no parent)
        const topLevel = data.filter((cat) => !cat.parentId);

        const mapped = topLevel.map((cat) => ({
          name: cat.name,
          path: `/category/${cat.id}`,
          state: { categoryId: cat.id, categoryName: cat.name },
        }));

        setCategories(mapped);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSection />

      <div className="flex flex-col">
        <div className="order-2 md:order-1">
          {/* ✅ 100% dynamic — no hardcoded categories */}
          <CategoriesButton categories={categories} />
        </div>
        <div className="order-1 md:order-2">
          <Slider1 />
        </div>
      </div>

      <BestSelling />
      <Slider2 />
      <SubscribeSection />
      <Footer1 />
      <Footer2 />
    </>
  );
};

export default Home;