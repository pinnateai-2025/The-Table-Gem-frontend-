import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import HeroSectcionVideo from "../image/video.mp4";

const Hero = () => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="relative w-full hidden md:block m-0 p-0 box-border h-screen">

            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={HeroSectcionVideo}
                autoPlay
                muted
                loop
            />

            <div className="absolute inset-0 items-center justify-center z-10 hidden xl:flex">
                <form onSubmit={handleSubmit} className="relative max-w-md -mt-[620px]">
                    <CiSearch
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 z-50 text-white text-4xl cursor-pointer"
                        onClick={handleSubmit}
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="w-[550px] h-15 rounded-[10px] text-center border-2 border-gray-300 bg-white/20 backdrop-blur-sm py-2 pl-10 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-yellow-600 hover:border-yellow-400 hover:border-[3px] text-2xl"
                    />
                </form>
            </div>
        </div>
    );
};

export default Hero;
