import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const G = "'Cormorant Garamond', serif";

const whyUs = [
  { title: 'Handcrafted Quality', desc: 'Every piece is made with care by skilled artisans.' },
  { title: 'Eco-Friendly & Sustainable', desc: 'Non-toxic, food-safe glazes and responsible materials.' },
  { title: 'Customizable Options', desc: 'Shapes, glazes, and finishes tailored for your brand.' },
  { title: 'Scalable Orders', desc: 'From small-batch to large-volume requirements.' },
  { title: 'Global Shipping', desc: 'Secure delivery across India and worldwide.' },
];

const whoWeWork = [
  { title: 'Restaurants & Cafés', desc: 'Elevate your dining experience with unique tableware.' },
  { title: 'Hotels & Resorts', desc: 'Enhance guest experiences with elegant ceramics.' },
  { title: 'Retailers', desc: 'Offer your customers exclusive, handcrafted products.' },
  { title: 'Event Curators', desc: 'Create memorable events with customizable table settings.' },
];

const benefits = [
  { title: 'Competitive Pricing', desc: 'Significant savings on bulk orders.' },
  { title: 'Priority Support', desc: 'Dedicated account management for seamless service.' },
  { title: 'Exclusive Previews', desc: 'Early access to new collections & designs.' },
  { title: 'Sustainability Commitment', desc: 'Partner with a brand that values eco-friendly practices.' },
];

const howItWorks = [
  { step: '01', title: 'Inquiry', desc: 'Reach out via our contact form or email to discuss your needs.' },
  { step: '02', title: 'Consultation', desc: 'Our team will understand your requirements & recommend solutions.' },
  { step: '03', title: 'Sample Approval', desc: 'Receive samples for review & approval.' },
  { step: '04', title: 'Order Placement', desc: 'Confirm details, quantities & delivery timelines.' },
  { step: '05', title: 'Production & Delivery', desc: 'Timely production & secure shipping to your door.' },
];

const keyInfo = [
  { title: 'MOQ', desc: 'Varies by product; contact us for details.' },
  { title: 'Lead Time', desc: 'Typically 4–6 weeks.' },
  { title: 'Payment Terms', desc: 'Flexible options available during consultation.' },
];

const faqs = [
  { q: 'What is the MOQ?', a: 'Flexible depending on category. Most ceramics start from 20–50 pieces.' },
  { q: 'Can I customize products?', a: 'Yes! Shapes, glazes & finishes can be tailored to your brand.' },
  { q: 'What is the lead time?', a: '4–6 weeks depending on order size & customization.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with secure packaging.' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer, credit card, and flexible terms during consultation.' },
  { q: 'How do I get started?', a: 'Reach out via our contact form and our team will guide you within 24–48 hrs.' },
];

const WholesaleProduct = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { background: #0D4017; color: white; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(13,64,23,0.2); }
        .card-hover:hover * { color: white !important; }
        .dark-card-hover { transition: all 0.3s ease; }
        .dark-card-hover:hover { background: white; transform: translateY(-3px); }
        .dark-card-hover:hover * { color: #0D4017 !important; }
      `}</style>

      <div className="w-full" style={{ fontFamily: G }}>

        {/* ── HERO BANNER ── */}
        <div className="relative bg-[#0D4017] py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #4a9a5a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #2d7a3d 0%, transparent 60%)' }} />
          <p className="text-white/50 text-[11px] tracking-[0.4em] uppercase mb-4 fade-up">Partnership Programme</p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
            Wholesale at<br /><em>The Table Gem</em>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed fade-up" style={{ animationDelay: '0.2s' }}>
            Partner with us to source handcrafted, eco-friendly ceramics in bulk for restaurants, cafés, hotels, retailers, and event curators.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center fade-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={() => navigate('/contact')}
              className="bg-white text-[#0D4017] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all duration-300 tracking-wider">
              Get In Touch
            </button>
            <button onClick={() => navigate('/shop')}
              className="border border-white/40 text-white font-medium text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300 tracking-wider">
              Browse Products
            </button>
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-20 px-6 bg-[#FAFAF7]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3">Our Promise</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">Why Choose The Table Gem?</h2>
              <div className="mt-4 w-12 h-px bg-[#0D4017]/40 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyUs.map((item, i) => (
                <div key={i} className="card-hover bg-white border border-gray-100 rounded-2xl p-7 cursor-default" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="w-8 h-8 rounded-full bg-[#0D4017]/10 flex items-center justify-center mb-4">
                    <CheckCircle size={16} className="text-[#0D4017]" />
                  </div>
                  <h3 className="text-[#0D4017] font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE WORK WITH ── */}
        <section className="py-20 px-6 bg-[#0D4017]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">Our Partners</p>
              <h2 className="text-4xl md:text-5xl font-light text-white">Who We Work With</h2>
              <div className="mt-4 w-12 h-px bg-white/30 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whoWeWork.map((item, i) => (
                <div key={i} className="dark-card-hover border border-white/20 rounded-2xl p-7 cursor-default group">
                  <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-[#0D4017] transition-colors">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-[#0D4017]/70 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHOLESALE BENEFITS ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3">Perks</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">Wholesale Benefits</h2>
              <div className="mt-4 w-12 h-px bg-[#0D4017]/40 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((item, i) => (
                <div key={i} className="card-hover flex items-start gap-4 bg-[#FAFAF7] border border-gray-100 rounded-2xl p-7 cursor-default">
                  <div className="w-8 h-8 rounded-full bg-[#0D4017]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={16} className="text-[#0D4017]" />
                  </div>
                  <div>
                    <h3 className="text-[#0D4017] font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-6 bg-[#0D4017]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-light text-white">How It Works</h2>
              <div className="mt-4 w-12 h-px bg-white/30 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {howItWorks.map((item, i) => (
                <div key={i} className="dark-card-hover border border-white/20 rounded-2xl p-6 text-center cursor-default group">
                  <div className="text-white/30 text-4xl font-light mb-3 group-hover:text-[#0D4017]/30 transition-colors">{item.step}</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#0D4017] transition-colors">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-[#0D4017]/60 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY INFO ── */}
        <section className="py-20 px-6 bg-[#FAFAF7]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3">Details</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">Key Information</h2>
              <div className="mt-4 w-12 h-px bg-[#0D4017]/40 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {keyInfo.map((item, i) => (
                <div key={i} className="card-hover text-center bg-white border border-gray-100 rounded-2xl p-8 cursor-default">
                  <h3 className="text-[#0D4017] font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-6 bg-[#0D4017]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">Questions</p>
              <h2 className="text-4xl md:text-5xl font-light text-white">Frequently Asked</h2>
              <div className="mt-4 w-12 h-px bg-white/30 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {faqs.map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                  <h3 className="text-white font-semibold mb-3 text-base">{item.q}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 bg-white text-center">
          <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-4">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3 max-w-2xl mx-auto leading-snug">
            Our team responds within <em>24–48 hours</em>
          </h2>
          <p className="text-gray-400 text-sm mb-10">For customization and bulk orders — let's build something beautiful together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')}
              className="bg-[#0D4017] text-white font-semibold text-sm px-10 py-3.5 rounded-full hover:bg-[#0a3313] transition-all tracking-wider">
              Contact Us
            </button>
            <button onClick={() => navigate('/')}
              className="border border-gray-200 text-gray-600 font-medium text-sm px-8 py-3.5 rounded-full hover:border-[#0D4017] hover:text-[#0D4017] transition-all flex items-center gap-2 justify-center">
              <ArrowLeft size={15} /> Back to Home
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default WholesaleProduct;