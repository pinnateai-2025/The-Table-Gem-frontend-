import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../image/logo.png";

const sections = [
  {
    title: 'Shop',
    items: [
      { label: 'Home', path: '/' },
      { label: 'New Arrivals', path: '/newarrival' },
      { label: 'Collection', path: '/shop' },
      { label: 'Wholesale', path: '/wholesale' },
    ],
  },
  {
    title: 'Information',
    items: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Shipping Policy', path: '/shipping' },
      { label: 'Return Policy', path: '/returns' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Contact', path: '/contact' },
      { label: 'Our Story', path: '/ourstory' },
      { label: 'Feedback', path: '/feedback' },
    ],
  },
  {
    title: 'Our Office',
    items: [
      { label: 'The Table Gem', path: null },
      { label: 'Ashok Rajpath, Patna, Bihar 800004', path: null },
      { label: 'Mon–Fri: 10:30am – 6:30pm', path: null },
      { label: '+91-8051550460', path: 'tel:+918051550460' },
      { label: 'thetablegem@gmail.com', path: 'mailto:thetablegem@gmail.com' },
    ],
  },
];

const Footer1 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');`}</style>

      <footer className="bg-[#FAFAF7] border-t border-gray-200" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-10 max-w-6xl mx-auto py-16 px-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-5 font-medium">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map(({ label, path }) => (
                  <li key={label}>
                    {path && path.startsWith('/') ? (
                      <Link to={path} className="text-sm text-gray-600 hover:text-[#0D4017] transition-colors">{label}</Link>
                    ) : path ? (
                      <a href={path} className="text-sm text-gray-600 hover:text-[#0D4017] transition-colors">{label}</a>
                    ) : (
                      <span className="text-sm text-gray-500">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden divide-y divide-gray-200 border-b border-gray-200">
          {sections.map((section, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={section.title}>
                <button
                  className="w-full flex justify-between items-center px-5 py-4"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">{section.title}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <ul className="px-5 pb-4 space-y-3">
                    {section.items.map(({ label, path }) => (
                      <li key={label}>
                        {path && path.startsWith('/') ? (
                          <Link to={path} className="text-sm text-gray-600">{label}</Link>
                        ) : path ? (
                          <a href={path} className="text-sm text-gray-600">{label}</a>
                        ) : (
                          <span className="text-sm text-gray-500">{label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="text-center py-10 px-6">
          <div className="flex justify-center mb-5">
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0D4017]/20" />
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.instagram.com/the_table_gem/" target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-[#0D4017] text-white rounded-full flex items-center justify-center hover:bg-[#0a3313] transition-colors">
              <FaInstagram size={15} />
            </a>
            <a href="https://www.facebook.com/the_table_gem/" target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-[#0D4017] text-white rounded-full flex items-center justify-center hover:bg-[#0a3313] transition-colors">
              <FaFacebook size={15} />
            </a>
            <a href="mailto:thetablegem@gmail.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-[#0D4017] text-white rounded-full flex items-center justify-center hover:bg-[#0a3313] transition-colors">
              <FaEnvelope size={15} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer1;