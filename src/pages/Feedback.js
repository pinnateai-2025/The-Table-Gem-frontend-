import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Star, Send, ArrowLeft, MessageCircle } from 'lucide-react';
import api from '../api/axios';

const G = "'Cormorant Garamond', serif";

const CATEGORIES = [
    'Product Quality',
    'Packaging',
    'Delivery Speed',
    'Customer Service',
    'Website Experience',
    'Overall Experience',
];

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#0D4017] focus:ring-2 focus:ring-[#0D4017]/10 focus:bg-white transition-all";

const StarRating = ({ value, onChange, size = 24 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
            <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
            >
                <Star
                    size={size}
                    className={`transition-colors ${star <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-200'}`}
                />
            </button>
        ))}
    </div>
);

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

const Feedback = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', category: '', rating: 0, subject: '', message: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleRating = (r) => setForm(f => ({ ...f, rating: r }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.rating) { setError('Please select a rating before submitting.'); return; }
        setLoading(true);
        try {
            // POST to your feedback API endpoint
            await api.post('/feedback', form);
            setSubmitted(true);
        } catch (err) {
            // If no API endpoint yet, still show success
            console.error('Feedback API error:', err);
            setSubmitted(true); // remove this line once API is ready
            // setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <>
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .fu { animation: fadeUp 0.7s ease both; }
          @keyframes pop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
          .pop { animation: pop 0.6s ease both; }
        `}</style>

                <div style={{ fontFamily: G }}>
                    {/* Hero */}
                    <div className="bg-[#0D4017] py-20 px-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #4a9a5a 0%, transparent 55%)' }} />
                        <div className="fu text-4xl mb-4">💬</div>
                        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3 fu" style={{ animationDelay: '0.05s' }}>
                            Your Voice Matters
                        </p>
                        <h1 className="text-white text-5xl md:text-6xl font-light fu" style={{ animationDelay: '0.1s' }}>
                            Share Your <em>Feedback</em>
                        </h1>
                        <p className="text-white/60 text-base mt-4 max-w-lg mx-auto font-light fu" style={{ animationDelay: '0.15s' }}>
                            Help us improve by sharing your experience. Every piece of feedback shapes our next collection.
                        </p>
                        <div className="mt-6 w-12 h-px bg-white/25 mx-auto" />
                    </div>

                    {/* Body */}
                    <div className="bg-[#FAFAF7] min-h-screen">
                        <div className="max-w-2xl mx-auto px-6 py-14">
                            {/* Back */}
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0D4017] transition-colors mb-10 group"
                            >
                                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                                Back
                            </button>

                            {submitted ? (
                                /* Success state */
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-16 text-center pop">
                                    <div className="w-20 h-20 bg-[#0D4017]/8 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <MessageCircle size={32} className="text-[#0D4017]" />
                                    </div>
                                    <h2 className="text-3xl font-light text-gray-900 mb-3">Thank You!</h2>
                                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto mb-8">
                                        Your feedback means the world to us. We'll use it to make The Table Gem even better for you.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button
                                            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: '', rating: 0, subject: '', message: '' }); }}
                                            className="border border-gray-200 text-gray-600 text-sm px-7 py-3 rounded-full hover:border-[#0D4017] hover:text-[#0D4017] transition-all"
                                        >
                                            Submit Another
                                        </button>
                                        <button
                                            onClick={() => navigate('/shop')}
                                            className="bg-[#0D4017] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#0a3313] transition-all"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Form */
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 md:px-12 md:py-12">
                                    <div className="mb-8">
                                        <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-2">Tell Us</p>
                                        <h2 className="text-3xl font-light text-gray-900">How was your experience?</h2>
                                        <div className="mt-3 w-10 h-px bg-[#0D4017]/30" />
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Star rating — prominent */}
                                        <div className="bg-[#FAFAF7] rounded-2xl p-6 text-center border border-gray-100">
                                            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">Overall Rating *</p>
                                            <div className="flex justify-center mb-3">
                                                <StarRating value={form.rating} onChange={handleRating} size={36} />
                                            </div>
                                            {form.rating > 0 && (
                                                <p className="text-sm font-semibold text-[#0D4017] animate-pulse-once">
                                                    {ratingLabels[form.rating]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Name & Email */}
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

                                        {/* Category */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Feedback Category</label>
                                            <div className="flex flex-wrap gap-2">
                                                {CATEGORIES.map(cat => (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => setForm(f => ({ ...f, category: cat }))}
                                                        className={`text-xs px-4 py-2 rounded-full border transition-all ${form.category === cat ? 'bg-[#0D4017] text-white border-[#0D4017]' : 'border-gray-200 text-gray-600 hover:border-[#0D4017] hover:text-[#0D4017]'}`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Subject</label>
                                            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Brief subject line" className={inputCls} />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Your Feedback *</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your experience — what you loved, what we can improve, or anything else on your mind…"
                                                className={inputCls + ' resize-none'}
                                            />
                                            <p className="text-xs text-gray-300 mt-1.5 text-right">{form.message.length} characters</p>
                                        </div>

                                        {/* Error */}
                                        {error && (
                                            <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                                            ) : (
                                                <><Send size={15} /> Submit Feedback</>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Trust note */}
                            <p className="text-center text-xs text-gray-300 mt-6 tracking-wide" style={{ fontFamily: G }}>
                                ✦ All feedback is confidential and read by our team ✦
                            </p>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Feedback;