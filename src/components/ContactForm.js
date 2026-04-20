import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const G = "'Cormorant Garamond', serif";

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#0D4017] focus:ring-2 focus:ring-[#0D4017]/10 focus:bg-white transition-all";

const ContactForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to your API
    await new Promise(r => setTimeout(r, 1000)); // simulate
    setSubmitted(true);
    setLoading(false);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactCards = [
    { icon: Phone, title: 'Call Us', lines: ['+91-8051550460'] },
    { icon: Mail, title: 'Email Us', lines: ['thetablegem@gmail.com'] },
    { icon: Clock, title: 'Working Hours', lines: ['Mon–Fri', '10:30am – 6:30pm'] },
    { icon: MapPin, title: 'Find Our Store', lines: ['Ashok Rajpath,', 'Patna, Bihar 800004', '(Opening Soon)'] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.7s ease both; }
      `}</style>

      <div className="w-full bg-white" style={{ fontFamily: G }}>
        {/* Hero */}
        <div className="bg-[#0D4017] py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #4a9a5a 0%, transparent 60%)' }} />
          <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-4">Reach Out</p>
          <h1 className="text-white text-5xl md:text-6xl font-light">Get In <em>Touch</em></h1>
          <div className="mt-6 w-12 h-px bg-white/30 mx-auto" />
        </div>

        {/* Contact cards */}
        <section className="py-16 px-6 bg-[#FAFAF7]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map(({ icon: Icon, title, lines }, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow fu" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-10 h-10 bg-[#0D4017]/8 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={18} className="text-[#0D4017]" />
                </div>
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">{title}</p>
                {lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-600 leading-relaxed">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3">Send a Message</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">Contact Form</h2>
              <div className="mt-4 w-12 h-px bg-[#0D4017]/40 mx-auto" />
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={20} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24–48 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-[#0D4017] text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Message *</label>
                  <textarea name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="How can we help you?" className={inputCls + " resize-none"} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}

            {/* Back */}
            <div className="flex justify-center mt-10">
              <button onClick={() => navigate('/')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#0D4017] transition-colors">
                <ArrowLeft size={14} /> Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactForm;