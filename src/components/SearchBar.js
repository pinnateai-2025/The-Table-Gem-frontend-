import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');`}</style>
      <div className="hidden md:flex items-center justify-center w-full bg-[#0D4017] h-[100px]">
        <form onSubmit={handleSubmit} className="relative w-full max-w-xl px-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-white/60 h-5 w-5 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full h-[52px] rounded-full border border-white/30 bg-white/10 backdrop-blur-sm pl-12 pr-32 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-white text-[#0D4017] text-sm font-semibold px-5 h-[40px] rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;