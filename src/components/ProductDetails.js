import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import Image10 from "../image/img10.png";
import Image12 from "../image/img12.png";
import Image13 from "../image/img13.jpg";
import { useNavigate } from "react-router-dom";
import Share from "../image/share.png";
import img3 from "../image/img3.png";
import imgHover from "../image/hover.jpg";

const ProductDetails = () => {
    const images = [Image10, Image12, Image13]
    const [mainImage, setMainImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()

    const products = Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        title: "Ceramic Dinner Set of 6 Pcs",
        originalPrice: 999,
        price: 450,
        image: img3,
        hoverImage: imgHover,
    }));

    return (
        <>
            <div className="max-w-5xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-10 mt-[20px] sm:mt-[100px]">
                <div className="space-y-4">
                    {/* Main Image */}
                    <img
                        src={mainImage}
                        alt="Ceramic Dinner Set"
                        className="rounded-xl w-full object-cover shadow-lg border border-gray-200"
                    />

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-3 w-full">
                        {images.slice(0, 3).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`rounded-md cursor-pointer border-2 w-full object-cover 
                    ${mainImage === img ? "border-[#0D4017]" : "border-transparent"} 
                    hover:border-black`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}

                <div className="space-y-4">

                    <div className="relative">
                        {/* Title */}
                        <h1 className="font-lato font-semibold text-[36px] leading-[120%] tracking-[0.02em] text-black">
                            Ceramic Dinner Set of 6 Pcs
                        </h1>

                        {/* Price Section */}
                        <div className="flex items-center mt-2">
                            <span className="font-lato font-semibold text-[16px] leading-[120%] tracking-[0.02em] text-gray-400 line-through">
                                Rs. 999.00
                            </span>
                            <span className="font-lato font-semibold text-[20px] leading-[120%] tracking-[0.02em] text-black ml-3">
                                Rs. 450.00
                            </span>
                        </div>

                        {/* Heart Icon */}
                        <FaRegHeart
                            className="absolute right-0 mt-2 hover:text-red-500"
                            style={{
                                width: "28px",
                                height: "27px",
                            }}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        {/* Label */}
                        <p
                            className="font-lato font-semibold text-[16px] leading-[120%] tracking-[0.02em] text-black"
                        >
                            Quantity
                        </p>

                        {/* Quantity Selector */}
                        <div className="flex items-center">
                            {/* Minus Button */}
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-[35px] h-[35px] flex items-center justify-center 
             border-l border-t border-b border-[#0D4017] rounded-l-[7px] 
             font-lato font-semibold text-[18px] text-[#0D4017]
             hover:bg-[#0D4017] hover:text-white transition"
                            >
                                −
                            </button>

                            {/* Quantity Display */}
                            <div
                                className="w-[50px] h-[35px] flex items-center justify-center 
                 border-y border-[#0D4017] 
                 font-lato font-semibold text-[14px] leading-[120%] tracking-[0.02em] text-black"
                            >
                                {quantity}
                            </div>

                            {/* Plus Button */}
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-[35px] h-[35px] flex items-center justify-center 
             border-t border-r border-b border-[#0D4017] rounded-r-[7px] 
             font-lato font-semibold text-[18px] text-[#0D4017]
             hover:bg-[#0D4017] hover:text-white transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button

                        className="bg-white hover:bg-[#0D4017] hover:text-white py-2 px-4 rounded w-full border-2 border-[#0D4017] text-[#0d4017]"
                    >
                        Add to Cart
                    </button>

                    <button

                        className="bg-[#0D4017] hover:bg-white hover:text-[#0D4017] py-2 px-4 rounded w-full border-2 border-[#0D4017] text-white"
                    >
                        Buy it now
                    </button>

                    <div className="mt-4 space-y-1">
                        <p className="font-lato font-semibold text-[16px] text-black mt-[30px]">
                            <span className="font-bold">Material:</span> Ceramic
                        </p>
                        <p className="font-lato font-semibold text-[16px] text-black mt-[30px]">
                            <span className="font-bold">Color:</span> White (Green-Blue Glossy Finish)
                        </p>
                        <p className="font-lato font-semibold text-[16px] text-black mt-[30px]">
                            <span className="font-bold">Size:</span> 7 inch Diameter
                        </p>
                        <p className="font-lato font-semibold text-[16px] text-black mt-[30px]">
                            <span className="font-bold">Contents:</span> Dinner Set of 6 Pcs
                        </p>
                        <p className="font-lato font-semibold text-[16px] text-black  mt-[30px]">
                            <span className="font-bold">Finish:</span> Glossy
                        </p>
                        <p className="font-lato font-semibold text-[16px] text-black mt-[30px]">
                            <span className="font-bold">Features:</span> Freezer, Dishwasher & Microwave Safe
                        </p>
                        <p className="font-lato font-semibold text-[14px] text-gray-500 mt-[30px]">
                            Disclaimer: The actual products may be subject to minor variations in measurement and colour specification as they are handmade, hand-painted that make them unique. They might slightly vary from the images shown on website due to different photographic resolutions. Lead-free and Non-Toxic.
                        </p>
                    </div>
                    <div className="flex items-center mt-[40px] space-x-2">
                        {/* Icon */}
                        <img src={Share} alt="Share icon" className="w-[16px] h-[16px]" />

                        {/* Share Text */}
                        <a
                            href="https://example.com/details"
                            className="font-lato font-semibold text-[16px] text-[rgba(255,1,1,1)]"
                        >
                            Share
                        </a>
                    </div>
                </div>
            </div>

            <div className="px-6 py-10 mt-[50px]">
                <h2
                    className="flex items-center justify-center h-[48px] font-trajan text-[40px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
                >
                    You May Also Like
                </h2>

                <div className="hide-scrollbar flex overflow-x-auto mt-[50px] gap-4 pb-2">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg hover:shadow-md transition flex-shrink-0 
                        w-[calc(42vw-1rem)] sm:w-[calc(50vw-1rem)] md:w-[250px] lg:w-[22%]"
                        >
                            <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] overflow-hidden rounded-md relative group">
                                <img
                                    onClick={() => navigate('/productpage')}
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                    src={product.hoverImage}
                                    alt={`${product.title} hover`}
                                    className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-[10px]">
                                {/* LEFT SIDE (Title + Prices) */}
                                <div className="flex flex-col w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 md:text-[16px]">
                                            {product.title}
                                        </h3>
                                        <FaRegHeart className="text-black text-[20px] hover:text-red-500 cursor-pointer ml-3" />
                                    </div>

                                    <div className="flex flex-row gap-2 items-center mt-2">
                                        <p className="text-[16px] text-red-700 line-through md:text-[12px]">
                                            Rs. {product.originalPrice}.00
                                        </p>
                                        <p className="text-[16px] font-medium text-green-800 md:text-[12px]">
                                            Rs. {product.price}.00
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between items-center md:mt-[16px]">
                                <button className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm lg:text-xl">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button
                        className="w-[110px] h-[40px] font-lato font-semibold text-[14px] leading-[120%] tracking-[0.02em] text-center align-middle border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;