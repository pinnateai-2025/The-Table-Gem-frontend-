import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import HeroVideo from "../image/video.mp4";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        .hero-title { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up-1 { animation: fadeUp 1s ease 0.2s both; }
        .fade-up-2 { animation: fadeUp 1s ease 0.5s both; }
        .fade-up-3 { animation: fadeUp 1s ease 0.8s both; }
      `}</style>

      {/* Desktop Hero — full screen video */}
      <div className="relative w-full hidden md:block" style={{ height: 'calc(100vh - 90px)' }}>
        <video className="absolute inset-0 w-full h-full object-cover" src={HeroVideo} autoPlay muted loop playsInline />

        {/* Dark overlay — gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="fade-up-1 text-white/70 text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Premium Handcrafted Collection
          </p>
          <h1 className="fade-up-2 hero-title text-white text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 drop-shadow-lg">
            Elevate Your <br /><em>Table Experience</em>
          </h1>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="fade-up-3 w-full max-w-xl">
            <div className="relative flex items-center bg-white/15 backdrop-blur-md border border-white/40 rounded-full px-5 h-14 shadow-xl">
              <Search size={18} className="text-white/70 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                className="flex-1 bg-transparent text-white placeholder-white/60 text-base px-4 focus:outline-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px' }}
              />
              <button type="submit" className="bg-white text-[#0D4017] text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#0D4017] hover:text-white transition-all duration-300 shrink-0">
                Search
              </button>
            </div>
          </form>

          {/* CTA buttons */}
          <div className="fade-up-3 flex gap-4 mt-8">
            <button onClick={() => navigate('/shop')} className="bg-[#0D4017] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-white hover:text-[#0D4017] transition-all duration-300 tracking-wide">
              Shop Now
            </button>
            <button onClick={() => navigate('/ourstory')} className="border border-white text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 tracking-wide">
              Our Story
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <p className="text-white text-[10px] tracking-[0.2em] uppercase">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Mobile Hero — static gradient banner */}
      <div className="md:hidden relative w-full h-[280px] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={HeroVideo} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-end justify-end p-6">
          <h2 className="hero-title text-white text-3xl font-light leading-tight mb-4">
            Elevate Your <br /><em>Table Experience</em>
          </h2>
          <button onClick={() => navigate('/shop')} className="bg-[#0D4017] text-white text-xs font-medium px-6 py-2.5 rounded-full">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;