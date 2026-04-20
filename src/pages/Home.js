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
    api.get("/category")
      .then(({ data }) => {
        const topLevel = data.filter(cat => !cat.parentId);
        setCategories(topLevel.map(cat => ({
          name: cat.name,
          path: `/category/${cat.id}`,
          state: { categoryId: cat.id, categoryName: cat.name },
        })));
      })
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <HeroSection />
      <CategoriesButton categories={categories} />
      <Slider1 />
      <BestSelling />
      <Slider2 />
      <SubscribeSection />
      <Footer1 />
      <Footer2 />
    </div>
  );
};

export default Home;