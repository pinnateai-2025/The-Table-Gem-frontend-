import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import OurStoryImg from '../image/ourstory.jpeg';

const G = "'Cormorant Garamond', serif";

const Story = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.8s ease both; }
      `}</style>

      <article className="w-full bg-white" style={{ fontFamily: G }}>
        {/* Header */}
        <div className="bg-[#0D4017] py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #4a9a5a 0%, transparent 60%)' }} />
          <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-4 fu">Founded 2025</p>
          <h1 className="text-white text-5xl md:text-6xl font-light leading-tight fu" style={{ animationDelay: '0.1s' }}>
            Our <em>Story</em>
          </h1>
          <div className="mt-6 w-12 h-px bg-white/30 mx-auto fu" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Story content */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="fu">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-[#0D4017]/20 rounded-2xl" />
                <img
                  src={OurStoryImg}
                  alt="Shahinda Abid — Founder"
                  className="relative w-full max-h-[600px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-4">
                  <p className="text-xs tracking-[0.25em] text-[#0D4017]/60 uppercase mb-1">Founder</p>
                  <p className="font-semibold text-gray-900 text-lg">Shahinda Abid</p>
                  <p className="text-gray-400 text-sm">The Table Gem, 2025</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-7 fu" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 bg-[#0D4017]/8 px-4 py-2 rounded-full">
                <Leaf size={14} className="text-[#0D4017]" />
                <span className="text-[#0D4017] text-xs tracking-wider uppercase font-medium">Eco-Friendly Living</span>
              </div>

              <p className="text-gray-700 text-lg leading-loose">
                Hi there, I'm <strong className="font-semibold text-gray-900">Shahinda Abid</strong>, and{' '}
                <strong className="font-semibold text-gray-900">The Table Gem</strong> is a dream that grew straight from my heart.
              </p>

              <p className="text-gray-500 text-base leading-loose">
                I've always believed that the things we bring into our homes should carry more than just beauty — they should hold meaning, care, and responsibility. In 2025, I turned this belief into a journey, with the hope of making eco-friendly living not only accessible but also elegant and joyful.
              </p>

              <p className="text-gray-500 text-base leading-loose">
                What began as a small idea at my table has now become a community that celebrates mindful choices and sustainable living. Every product we create is a reflection of my vision — to design pieces that bring warmth to your home while being gentle on the Earth.
              </p>

              <blockquote className="border-l-2 border-[#0D4017]/40 pl-6 py-2">
                <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                  "Little choices add up, and together, they can shape a more beautiful, conscious world."
                </p>
              </blockquote>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => navigate('/shop')}
                  className="bg-[#0D4017] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#0a3313] transition-all tracking-wider">
                  Shop Our Collection
                </button>
                <button onClick={() => navigate('/')}
                  className="border border-gray-200 text-gray-600 text-sm px-8 py-3.5 rounded-full hover:border-[#0D4017] hover:text-[#0D4017] transition-all flex items-center justify-center gap-2">
                  <ArrowLeft size={14} /> Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div className="bg-[#FAFAF7] border-t border-b border-gray-100 py-14 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {[
              { num: '2025', label: 'Founded' },
              { num: '2000+', label: 'Happy Customers' },
              { num: '100%', label: 'Eco-Friendly' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-4xl font-light text-[#0D4017] mb-2">{num}</p>
                <p className="text-xs tracking-[0.25em] text-gray-400 uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default Story;