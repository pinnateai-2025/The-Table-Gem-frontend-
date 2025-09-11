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


const Home = () => (
    <>
        <TopBar />
        <Navbar />
        <HeroSection />

        {/* Wrap in flex/column so we can reorder */}
        <div className="flex flex-col">
            <div className="order-2 md:order-1">
                <CategoriesButton
                    categories={[
                        { name: "Drinkware", path: "/drinkware" },
                        { name: "Serveware", path: "/serveware" },
                        { name: "Home Decor", path: "/home-decor" },
                    ]}
                />
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

export default Home;