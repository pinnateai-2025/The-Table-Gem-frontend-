import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductFilter from "./ProductFilter";

const PlatterProducts = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();

    // Products passed from ServewareProduct
    const products = location.state?.products || [];

    const isLiked = (id) => wishlist.some((item) => item.id === id);

    return (
        <div className="w-full px-4 py-6">
            <h2 className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase">
                Platter
            </h2>

            <ProductFilter />

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-2 justify-items-center">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg hover:shadow-md transition flex-shrink-0"
                        >
                            {/* Image Section */}
                            <div className="w-[360px] h-[360px] max-[1024px]:w-[220px] max-[1024px]:h-[200px] max-[768px]:h-[250px] max-[500px]:w-[120px] max-[500px]:h-[120px] max-[375px]:w-[100px] max-[375px]:h-[100px]  max-[320px]:w-[90px] max-[320px]:h-[90px] overflow-hidden rounded-md relative group cursor-pointer">
                                <img
                                    onClick={() => navigate("/productdetails", { state: { product } })}
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-md transition-opacity duration-300"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="px-2 py-3 max-[500px]:px-0 max-[500px]:py-0">
                                <div className="flex items-center justify-between max-[500px]:mt-2">
                                    <div className="flex flex-col w-full max-[500px]:w-[100px]">
                                        <div className="flex items-center justify-between max-[500px]:w-[120px] max-[375px]:w-[100px] max-[320px]:w-[90px]">
                                            <h3 className="text-base max-[1024px]:text-[12px] max-[768px]:text-[14px] max-[500px]:text-[10px] max-[500px]:w-[80px] max-[500px]:leading-tight font-semibold text-gray-900">
                                                {product.name}
                                            </h3>
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
                                                    <FaHeart className="text-red-500 text-[20px] max-[500px]:text-[16px] cursor-pointer" />
                                                ) : (
                                                    <FaRegHeart className="text-black text-[20px] max-[500px]:text-[16px] hover:text-red-500 cursor-pointer" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-row max-[500px]:flex-col max-[500px]:items-start gap-2 mt-2">
                                            {product.originalPrice && (
                                                <p className="text-[16px] text-red-700 line-through md:text-[12px]">
                                                    Rs. {product.originalPrice}.00
                                                </p>
                                            )}
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
                    ))
                ) : (
                    <p className="text-center text-gray-600">No products found.</p>
                )}
            </div>

            {/* Back button */}
            <div className="flex justify-center mt-[20px] w-full">
                <button
                    className="flex items-center justify-center w-[110px] h-[40px] max-[500px]:w-[90px] max-[500px]:h-[30px] font-lato font-semibold text-[14px] max-[500px]:text-[12px] leading-[120%] tracking-[0.02em] border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default PlatterProducts;
