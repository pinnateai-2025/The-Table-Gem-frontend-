import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import img4 from "../image/img4.jpg";
import img6 from "../image/img6.jpg";
import img7 from "../image/img7.jpg";

const images = [img4, img6, img7];

const Slider2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');`}</style>

      <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden mt-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-black/35 z-10" />

        {/* Right-aligned card on desktop, centered on mobile */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-end md:pr-24 px-6">
          <div
            className="text-center bg-white/92 backdrop-blur-sm rounded-2xl px-8 py-8 sm:px-10 sm:py-10 shadow-2xl max-w-xs w-full"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/60 uppercase mb-3">Featured</p>
            <div className="border-2 border-[#0D4017] rounded-xl py-3 px-4 mb-4">
              <span className="text-xl font-semibold tracking-widest text-[#0D4017] uppercase">Coffee Mugs</span>
            </div>
            <p className="text-gray-600 text-base font-light italic mb-6 leading-snug">
              Explore our trendy<br />artisan collection
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#0D4017] text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-[#0a3313] transition-all duration-300 w-full"
            >
              EXPLORE
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider2;