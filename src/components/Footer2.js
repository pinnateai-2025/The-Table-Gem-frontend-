const Footer2 = () => {
  return (
    <div
      className="bg-[#0D4017] text-white/70 text-center px-6 py-5 text-xs tracking-wide"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <p className="text-white/90">© {new Date().getFullYear()} The Table Gem. All rights reserved.</p>
      <p className="mt-1">
        Designed & developed by{" "}
        <a href="https://pinnate.vercel.app/" target="_blank" rel="noopener noreferrer"
          className="text-white hover:underline transition-all">
          Pinnate Technologies
        </a>
      </p>
    </div>
  );
};

export default Footer2;