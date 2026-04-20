import React, { useState } from 'react';
import bgImage from '../image/img7.jpg';
import { Send } from 'lucide-react';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to API
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');`}</style>

      <section
        className="relative w-full flex items-center justify-center py-24 px-6 overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0D4017]/75 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-2xl text-center">
          <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Stay in the loop
          </p>
          <h2 className="text-white text-4xl sm:text-5xl font-light mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Subscribe & Save
          </h2>
          <p className="text-white/70 text-base mb-10 font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Get exclusive offers, new arrivals, and curated collections delivered to your inbox.
          </p>

          {submitted ? (
            <div className="bg-white/20 border border-white/30 text-white rounded-2xl px-8 py-4 text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ✓ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-white/60 transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}
              />
              <button
                type="submit"
                className="bg-white text-[#0D4017] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <Send size={15} /> Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default SubscribeSection;