import React, { useEffect, useState } from 'react';

const messages = [
  '2000+ Happy Customers',
  'Summer sale is live 40% Discount',
  'For bulk purchase, please contact +91 8051550460',
];

const TopBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 2000); // switch every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[rgba(13,64,23,1)] w-full text-center text-xs flex items-center justify-center font-semibold z-50 relative h-[50px] max-[768px]:h-[40px] max-[425px]:h-[30px]">
      <p className="fade-in transition-all duration-500 text-[12px] sm:text-[18px] md:text-[20px] text-white font-semibold">
        {messages[currentIndex]}
      </p>
    </div>
  );
};

export default TopBar;