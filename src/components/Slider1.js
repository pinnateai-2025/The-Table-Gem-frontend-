import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import img7 from '../image/img7.jpg';
import img6 from '../image/img6.jpg';
import img4 from '../image/img4.jpg';

const images = [img7, img6, img4];

const Slider1 = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');
      `}</style>

      <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Centered card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <div
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-8 sm:px-12 sm:py-10 shadow-2xl max-w-sm w-full"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/60 uppercase mb-3">Limited Time</p>
            <div className="border-2 border-[#0D4017] rounded-xl py-3 px-6 mb-4 inline-block w-full">
              <span className="text-4xl font-light text-[#0D4017]">15<span className="text-2xl">% OFF</span></span>
            </div>
            <p className="text-gray-700 text-lg font-light italic mb-6 leading-snug">
              Discover our unique<br />handcrafted collection
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#0D4017] text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-[#0a3313] transition-all duration-300 w-full"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider1;