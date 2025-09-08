import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";
import { useLocation } from "react-router-dom";
import Share from "../image/share.png";

const ProductDetails = () => {
    const { state } = useLocation();
    const product = state?.product;

    const [quantity, setQuantity] = useState(1);
    const { wishlist, toggleWishlist } = useWishlist();

    const images = product?.images || (product?.image_url ? [product.image_url] : []);
    const [mainImage, setMainImage] = useState(images[0] || "");

    const isLiked = (id) => wishlist.some((item) => item.id === id);

    if (!product) {
        return (
            <p className="text-center text-gray-600 mt-10 text-[26px]">
                No product selected
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-10 max-[768px]:gap-4 mt-[20px]">
            {/* Images */}
            <div className="space-y-4">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="rounded-xl w-full h-[600px]  max-[768px]:h-[560px] max-[500px]:h-[400px] max-[375px]:h-[300px] object-cover shadow-lg border border-gray-200"
                />

                {/* Thumbnails */}
                {/* <div className="grid grid-cols-3 gap-3 w-full">
                    {images.map((img, index) => (
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
                </div> */}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
                <div className="relative">
                    {/* Title */}
                    <h1 className="font-lato font-semibold text-[36px] max-[768px]:text-[24px] leading-[120%] tracking-[0.02em] text-black">
                        {product.title || product.name}
                    </h1>

                    {/* Price Section */}
                    <div className="flex items-center mt-2">
                        {product.originalPrice && (
                            <span className="font-lato font-semibold text-[16px] leading-[120%] tracking-[0.02em] text-gray-400 line-through">
                                {/* Rs. {product.originalPrice} */}
                            </span>
                        )}
                        <span className="font-lato font-semibold text-[20px] leading-[120%] tracking-[0.02em] text-black">
                            Rs. {product.price}
                        </span>
                    </div>

                    {/* Wishlist Icon */}
                    <div onClick={() => {
                        const wishlistProduct = {
                            id: product.id,
                            title: product.name,
                            image: product.image_url,
                            price: product.price,
                        };
                        toggleWishlist(wishlistProduct);
                    }}>
                        {isLiked(product.id) ? (
                            <FaHeart className="w-[28px] h-[27px] text-red-500 text-[20px] cursor-pointer absolute right-0 hover:text-red-500" />
                        ) : (
                           <FaRegHeart className="w-[28px] h-[27px] text-black text-[20px] hover:text-red-500 cursor-pointer absolute right-0" />
                        )}
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex flex-col space-y-2">
                    <p className="font-lato font-semibold text-[16px] text-black">Quantity</p>
                    <div className="flex items-center">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-[35px] h-[35px] border-l border-t border-b border-[#0D4017] rounded-l-md font-lato font-semibold text-[18px] text-[#0D4017] hover:bg-[#0D4017] hover:text-white"
                        >
                            −
                        </button>
                        <div className="w-[50px] h-[35px] flex items-center justify-center border-y border-[#0D4017] font-lato font-semibold text-[14px]">
                            {quantity}
                        </div>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-[35px] h-[35px] border-t border-r border-b border-[#0D4017] rounded-r-md font-lato font-semibold text-[18px] text-[#0D4017] hover:bg-[#0D4017] hover:text-white"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <button className="bg-white hover:bg-[#0D4017] hover:text-white py-2 px-4 rounded w-full border-2 border-[#0D4017] text-[#0d4017]">
                    Add to Cart
                </button>
                <button className="bg-[#0D4017] hover:bg-white hover:text-[#0D4017] py-2 px-4 rounded w-full border-2 border-[#0D4017] text-white">
                    Buy it now
                </button>

                <div className="mt-4 space-y-1">
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Material:</span> Ceramic
                    </p>
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Color:</span> White (Green-Blue Glossy Finish)
                    </p>
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Size:</span> 7 inch Diameter
                    </p>
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Contents:</span> Dinner Set of 6 Pcs
                    </p>
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black  mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Finish:</span> Glossy
                    </p>
                    <p className="font-lato font-semibold text-[16px] max-[768px]:text-[14px] text-black mt-[30px] max-[768px]:mt-[10px]">
                        <span className="font-bold">Features:</span> Freezer, Dishwasher & Microwave Safe
                    </p>
                    <p className="font-lato font-semibold text-[14px] max-[768px]:text-[12px] text-gray-500 mt-[30px] max-[768px]:mt-[10px]">
                        Disclaimer: The actual products may be subject to minor variations in measurement and colour specification as they are handmade, hand-painted that make them unique. They might slightly vary from the images shown on website due to different photographic resolutions. Lead-free and Non-Toxic.
                    </p>
                </div>

                {/* Share */}
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
    );
};

export default ProductDetails;
