import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductFilter from './ProductFilter';
import img3 from "../image/img3.png";
import imgHover from "../image/hover.jpg";

const NewArrivalProductSection = () => {
    const navigate = useNavigate();

    const products = Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        title: "Ceramic Dinner Set of 6 Pcs",
        originalPrice: 999,
        price: 450,
        image: img3,
        hoverImage: imgHover,
    }));

    return (
        <div className="w-full px-4 py-6">
            <h2 className="text-center text-2xl font-serif tracking-wide text-black py-3 rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase tracking-widest">
                New Arrivals
            </h2>
            <ProductFilter />

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-2 justify-items-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-3 rounded-lg  hover:shadow-md transition max-w-sm w-full"
                    >
                        <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] overflow-hidden shadow-md rounded-md relative group">
                            <img
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
                        {/* Product Info */}
                        <div className="px-2 py-3">
                            <div className="flex items-center justify-between">
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

                            {/* Actions */}
                            <div className="mt-10 flex justify-between items-center md:mt-[16px]">
                                <button className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm lg:text-xl">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-[20px] w-full">
                <button
                    onClick={() => navigate("/")}
                    className="w-[110px] h-[40px] flex items-center justify-center border border-green-900 py-2 px-10 rounded bg-[#0D4017] text-white transition hover:bg-white hover:text-green-900"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default NewArrivalProductSection;
