import { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import logo from "../image/logo.png";

const Footer1 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = (index) => {
    if (isMobile) setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: 'Shop',
      items: ['Home', 'New Arrivals', 'Gift', 'Collection', 'Custom Made'],
    },
    {
      title: 'Information',
      items: ['Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Return and Replacement Policy'],
    },
    {
      title: 'About',
      items: ['Contact', 'Our Story', 'Feedback', 'Help'],
    },
    {
      title: 'Our Office',
      items: [
        'THE TABLE GEM',
        '4456 Ground Floor, Sector 20, Gurgaon, Haryana-123456.',
        'Mon-Fri: 10:30am – 06:30pm',
        'Tel: +91-9123456789',
        'Email: query@thetablegem.in',
      ],
    },
  ];

  return (
    <footer className="bg-white text-gray-800 py-10 px-5">
      {/* Top Sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {sections.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b md:border-none">
              {/* Section Header */}
              <div
                onClick={() => toggle(index)}
                className={`flex justify-between items-center cursor-pointer px-3 py-2 uppercase font-semibold
                  ${isMobile ? (isOpen ? 'bg-[#0D4017] text-white' : 'bg-white text-[#0D4017]') : 'text-black'}
                  md:bg-transparent md:cursor-default`}
              >
                <h3
                  className="text-base tracking-wider text-[20px]"
                  style={{
                    ...(window.innerWidth >= 768 && {
                      background: 'linear-gradient(90deg, rgba(13,64,23,0) 0%, rgba(13,64,23,0.26) 50%, rgba(13,64,23,0) 100%)',
                    }),
                  }}
                >
                  {section.title}
                </h3>
                {isMobile && (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
              </div>

              {/* Section Items */}
              <ul className={`px-3 space-y-2 py-2 ${isMobile ? (isOpen ? 'block' : 'hidden') : 'block'}`}>
                {section.items.map((item, i) => (
                  <li key={i} className=" text-[16px]">{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom Logo + Social Icons */}
      <div className="mt-10 pt-6 text-center w-full">
        <div className="mb-4 flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-[78px] h-[78px] rounded-full" />
        </div>
        <div className="flex justify-center gap-3 lg:gap-10 text-lg md:text-base text-white">
          <a href="#" className='bg-[#0D4017] p-4 rounded-full'><FaInstagram /></a>
          <a href="#" className='bg-[#0D4017] p-4 rounded-full'><FaFacebook /></a>
          <a href="#" className='bg-[#0D4017] p-4 rounded-full'><FaYoutube /></a>
          <a href="#" className='bg-[#0D4017] p-4 rounded-full'><FaLinkedin /></a>
          <a href="#" className='bg-[#0D4017] p-4 rounded-full'><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
