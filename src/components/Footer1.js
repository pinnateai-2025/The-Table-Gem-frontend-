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
    <footer
      className={`bg-white text-gray-800 
    ${isMobile ? "w-full m-0 p-0 mt-4" : "py-10 px-5"}`}
    >
      {/* Top Sections */}
      <div
        className={`${isMobile
          ? "w-full grid grid-cols-1"
          : "max-w-7xl mx-auto grid grid-cols-4 gap-12"
          }`}
      >
        {sections.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="w-full flex flex-col md:items-start" // ✅ stack title + items vertically
            >
              {/* Section Header */}
              <div
                onClick={() => toggle(index)}
                className={`flex justify-between items-center cursor-pointer px-3 py-3 uppercase font-semibold
            md:bg-transparent md:cursor-default`}
                style={{
                  backgroundColor: isMobile && isOpen ? "#0D4017" : "white",
                  color: isMobile
                    ? isOpen
                      ? "#FFFFFF"
                      : "rgba(13, 64, 23, 0.38)"
                    : "#000000",
                  borderBottom: isMobile ? "1px solid rgba(13, 64, 23, 1)" : "none",
                  borderTop:
                    isMobile && index === 0
                      ? "1px solid rgba(13, 64, 23, 1)"
                      : "none",
                }}
              >
                <h3
                  className={`${isMobile
                    ? ""
                    : "flex items-center justify-center h-[48px] font-trajan text-[20px] font-normal tracking-[0.02em] text-black rounded-md shadow-sm bg-gradient-to-r from-white via-gray-300 to-white uppercase w-fit px-6"
                    }`}
                  style={
                    isMobile
                      ? {
                        fontFamily: "Trajan Pro, serif",
                        fontWeight: 400,
                        fontSize: "11px",
                        color: isOpen ? "#FFFFFF" : "rgba(13, 64, 23, 1)",
                      }
                      : {}
                  }
                >
                  {section.title}
                </h3>


                {isMobile &&
                  (isOpen ? (
                    <IoIosArrowUp color="#FFFFFF" />
                  ) : (
                    <IoIosArrowDown color="rgba(0,0,0,1)" />
                  ))}
              </div>

              {/* Section Items */}
              <ul
                className={`${isMobile
                  ? isOpen
                    ? "block"
                    : "hidden"
                  : "block px-3 py-2 space-y-2"
                  }`}
              >
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className={`text-[16px] w-full ${isMobile ? "px-0 mx-0" : "px-3"
                      }`}
                    style={{
                      borderBottom: isMobile
                        ? "0.5px solid rgba(13, 64, 23, 0.38)"
                        : "none",
                    }}
                  >
                    <div
                      className={`text-[14px] font-semibold ${isMobile ? "p-3" : "px-3 py-2"
                        }`}
                    >
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom Logo + Social Icons */}
      <div
        className={`text-center w-full ${isMobile ? "mt-20 mb-10 pt-4" : "mt-20 pt-6"
          }`}
      >
        <div className="mb-4 flex justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[78px] h-[78px] rounded-full"
          />
        </div>
        <div className="flex justify-center gap-3 lg:gap-10 text-lg md:text-base text-white">
          <a href="https://www.instagram.com/the_table_gem/" className="bg-[#0D4017] p-4 rounded-full">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/the_table_gem/" className="bg-[#0D4017] p-4 rounded-full">
            <FaFacebook />
          </a>
          <a href="https://www.youtube.com/channel/UCW8g1g1g1g1g1g1g1g1g1g" className="bg-[#0D4017] p-4 rounded-full">
            <FaYoutube />
          </a>
          <a href="https://www.linkedin.com/company/the-table-gem/" className="bg-[#0D4017] p-4 rounded-full">
            <FaLinkedin />
          </a>
          <a href="mailto:info@thetablegem.com" className="bg-[#0D4017] p-4 rounded-full">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
