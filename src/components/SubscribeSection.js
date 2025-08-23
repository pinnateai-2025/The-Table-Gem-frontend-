import React from 'react';
import bgImage from '../image/img7.jpg';

const SubscribeSection = () => {
  return (
    <div
      className="relative w-full h-[450px] bg-cover bg-center flex justify-center items-center mt-8 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#0d4013a3] z-0" />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <h2 className="text-white text-2xl sm:text-base md:text-3xl font-semibold mb-6 px-2">
          SUBSCRIBE FOR GREAT OFFERS <br /> AND OUR NEWSLETTERS.
        </h2>

        <form className="flex flex-row  md:w-[590px] md:ml-20 bg-white/20 backdrop-blur-sm shadow-md rounded-lg overflow-hidden border border-white">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 text-sm text-white placeholder-white bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black md:w-[180px] text-white px-6 py-3 text-sm hover:bg-red-500 transition-all duration-300 border rounded-[10px]" 
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeSection;
