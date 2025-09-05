import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ProductFilter from './ProductFilter';
import img3 from "../image/img3.png";
import imgHover from "../image/hover.jpg";
import { useWishlist } from "../context/WishlistContext";

const products = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: "Ceramic Dinner Set of 6 Pcs",
    originalPrice: 999,
    price: 450,
    image: img3,
    hoverImage: imgHover,
}));

const GiftProduct = () => {

    const { wishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const isLiked = (id) => wishlist.some((item) => item.id === id);

    return (
        <div className="w-full px-4 py-6">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Gifts
            </h2>

            <ProductFilter />

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-2 justify-items-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg hover:shadow-md transition flex-shrink-0"
                    >
                        {/* Image Section */}
                        <div className="w-full h-[360px] max-[1024px]:h-[200px] max-[768px]:h-[250px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[350px]:w-[90px] max-[350px]:h-[90px] overflow-hidden rounded-md relative group cursor-pointer">
                            <img
                                 onClick={() => navigate("/productdetails")}
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
                            />
                            <img
                                src={product.hoverImage}
                                alt={`${product.title} hover`}
                                className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="px-2 py-3 max-[500px]:px-0 max-[500px]:py-0">
                            <div className="flex items-center justify-between max-[500px]:mt-2">
                                {/* LEFT SIDE (Title + Prices) */}
                                <div className="flex flex-col w-full max-[500px]:w-[100px] max-[350px]:w-[90px]">
                                     <div className="flex items-center justify-between">
                                        <h3 className="text-base max-[1024px]:text-[12px] max-[768px]:text-[14px] max-[500px]:text-[10px] max-[500px]:w-[80px] max-[500px]:leading-tight font-semibold text-gray-900">
                                            {product.title}
                                        </h3>
                                       <div onClick={() => toggleWishlist(product)}>
                                                {isLiked(product.id) ? (
                                                    <FaHeart className="text-red-500 text-[20px] cursor-pointer" />
                                                ) : (
                                                    <FaRegHeart className="text-black text-[20px] hover:text-red-500 cursor-pointer" />
                                                )}
                                            </div>
                                    </div>

                                    <div className="flex flex-row max-[500px]:flex-col max-[500px]:items-start gap-2 max-[500px]:gap-0 items-center mt-2 max-[500px]:mt-1">
                                        <p className="text-[16px] max-[500px]:text-[10px] text-red-700 line-through md:text-[12px]">
                                            Rs. {product.originalPrice}.00
                                        </p>
                                        <p className="text-[16px] max-[500px]:text-[10px] font-medium text-green-800 md:text-[12px]">
                                            Rs. {product.price}.00
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 max-[500px]:mt-2 flex justify-between items-center md:mt-[16px] max-[350px]:w-[90px]">
                                <button className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm lg:text-xl max-[500px]:w-[100px] max-[500px]:text-[10px]">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-[20px] w-full">
                <button
                    className="flex items-center justify-center w-[110px] h-[40px] max-[500px]:w-[90px] max-[500px]:h-[30px] font-lato font-semibold text-[14px] max-[500px]:text-[12px] leading-[120%] tracking-[0.02em] border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default GiftProduct