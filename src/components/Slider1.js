import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// Use imported images
import img7 from '../image/img7.jpg';
import img6 from '../image/img6.jpg';
import img4 from '../image/img4.jpg';

const images = [img7, img6, img4];

const Slider1 = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full relative h-[200px] sm:h-[250px] md:h-[350px] ">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 2000 }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full z-20"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 rounded-[15px] shadow-md text-center max-w-[280px] sm:max-w-[320px] w-full">
        <h2 className="text-[#0f2e0f] text-lg sm:text-xl font-bold border-2 border-[#0f2e0f] mb-2 py-2 sm:py-3 w-[200px] sm:w-[240px] mx-auto">
          15% OFF
        </h2>
        <p className="text-[#222] md:text-lg sm:text-base font-serif mb-4 leading-5 sm:leading-6 uppercase">
         Discover our <br /> unique collection
        </p>
        <button className="bg-[#0D4017] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#2a4a2a] transition h-[40px] sm:h-[50px] w-[160px] sm:w-[200px]">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Slider1;