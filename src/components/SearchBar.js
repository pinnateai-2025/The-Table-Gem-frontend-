import { useState } from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="hidden md:flex sm:hidden items-center justify-center w-full bg-[#0D4017] h-[120px]">
             <form onSubmit={handleSubmit} className="relative max-w-xl flex items-center justify-center">
                <FaSearch
                    className="absolute top-1/2 left-7 transform -translate-y-1/2 z-50 text-white cursor-pointer w-[25px] h-[29px]"
                    onClick={handleSubmit}
                />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-[590px] h-[60px] rounded-[10px] text-center border-[3px] border-white bg-white/20 backdrop-blur-sm py-2 pl-12 pr-4 text-white text-2xl focus:outline-none focus:ring-2 focus:border-white-600 hover:border-white-400 
                 placeholder:text-[26px] placeholder:font-semibold placeholder:leading-[120%] placeholder:tracking-[0.02em] placeholder:align-middle placeholder-white"
                />
            </form>
        </div>
    )
}

export default SearchBar;