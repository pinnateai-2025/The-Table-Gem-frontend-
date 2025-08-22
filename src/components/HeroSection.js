import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaSearch } from "react-icons/fa";
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

            <div className="absolute inset-0 z-10 hidden xl:flex justify-center mt-[70px]">
                <form onSubmit={handleSubmit} className="relative max-w-md">
                    <FaSearch
                        className="absolute top-1/2 left-7 transform -translate-y-1/2 z-50 text-white cursor-pointer w-[25px] h-[29px]"
                        onClick={handleSubmit}
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="w-[590px] h-[75px] rounded-[10px] text-center border-[3px] border-white bg-white/20 backdrop-blur-sm py-2 pl-12 pr-4 text-white text-2xl focus:outline-none focus:ring-2 focus:border-white-600 hover:border-white-400 
        placeholder:text-[26px] placeholder:font-semibold placeholder:leading-[120%] placeholder:tracking-[0.02em] placeholder:align-middle placeholder-white"
                    />
                </form>
            </div>
        </div>
    );
};

export default Hero;
