import React, { useEffect, useState } from 'react';

const messages = [
  '✦  2000+ Happy Customers  ✦',
  '✦  Summer Sale — 40% Off Sitewide  ✦',
  '✦  Bulk Orders: +91 8051550460  ✦',
];

const TopBar = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(p => (p + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0D4017] w-full h-10 flex items-center justify-center overflow-hidden">
      <p
        style={{
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
          letterSpacing: '0.12em',
          fontFamily: "'Cormorant Garamond', serif",
        }}
        className="text-white text-xs sm:text-sm font-medium tracking-widest"
      >
        {messages[current]}
      </p>
    </div>
  );
};

export default TopBar;