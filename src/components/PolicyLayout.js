import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const G = "'Cormorant Garamond', serif";

const PolicyLayout = ({ title, subtitle, icon, lastUpdated, children }) => {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.7s ease both; }
        .policy-section h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #0D4017; margin-bottom: 0.75rem; margin-top: 2.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(13,64,23,0.12); }
        .policy-section h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; color: #1a1a18; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .policy-section p { color: #4b5563; line-height: 1.9; margin-bottom: 1rem; font-size: 0.95rem; }
        .policy-section ul { list-style: none; padding: 0; margin-bottom: 1rem; }
        .policy-section ul li { color: #4b5563; font-size: 0.95rem; line-height: 1.8; padding-left: 1.25rem; position: relative; }
        .policy-section ul li::before { content: '✦'; position: absolute; left: 0; color: #0D4017; font-size: 0.55rem; top: 0.45rem; }
        .policy-section a { color: #0D4017; text-decoration: underline; text-decoration-color: rgba(13,64,23,0.3); }
        .policy-section a:hover { text-decoration-color: #0D4017; }
        .highlight-box { background: rgba(13,64,23,0.04); border-left: 3px solid #0D4017; border-radius: 0 12px 12px 0; padding: 1rem 1.25rem; margin: 1.25rem 0; }
        .highlight-box p { margin-bottom: 0; color: #374151; }
      `}</style>

            <div style={{ fontFamily: G }}>
                {/* Hero */}
                <div className="bg-[#0D4017] py-20 px-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #4a9a5a 0%, transparent 55%), radial-gradient(circle at 75% 50%, #2d7a3d 0%, transparent 55%)' }} />
                    <div className="fu text-4xl mb-4">{icon}</div>
                    <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3 fu" style={{ animationDelay: '0.05s' }}>
                        The Table Gem
                    </p>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight fu" style={{ animationDelay: '0.1s' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-white/60 text-base mt-4 max-w-xl mx-auto font-light fu" style={{ animationDelay: '0.15s' }}>
                            {subtitle}
                        </p>
                    )}
                    <div className="mt-6 w-12 h-px bg-white/25 mx-auto fu" style={{ animationDelay: '0.2s' }} />
                    {lastUpdated && (
                        <p className="text-white/40 text-xs mt-4 tracking-wider fu" style={{ animationDelay: '0.25s' }}>
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="bg-[#FAFAF7] min-h-screen">
                    <div className="max-w-3xl mx-auto px-6 py-14">
                        {/* Back button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0D4017] transition-colors mb-10 group"
                        >
                            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                            Back
                        </button>

                        {/* Policy body */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 md:px-12 md:py-12 policy-section">
                            {children}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-8 bg-[#0D4017] rounded-2xl px-8 py-8 text-center">
                            <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-2">Questions?</p>
                            <p className="text-white text-xl font-light mb-5" style={{ fontFamily: G }}>
                                We're happy to help clarify anything.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href="mailto:thetablegem@gmail.com"
                                    className="bg-white text-[#0D4017] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all">
                                    thetablegem@gmail.com
                                </a>
                                <a href="tel:+918051550460"
                                    className="border border-white/30 text-white text-sm px-6 py-2.5 rounded-full hover:bg-white/10 transition-all">
                                    +91-8051550460
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PolicyLayout;