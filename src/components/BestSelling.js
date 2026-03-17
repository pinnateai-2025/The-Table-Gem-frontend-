import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";
import api from "../api/axios"; // ✅ FIX: use axios instead of fetch + REACT_APP_API_URL

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isLiked = (id) => wishlist.some((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ FIX: correct endpoint is /product not /products
        const { data } = await api.get("/product");
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="px-6 py-10 max-[500px]:py-5">
        <h2 className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase">
          Shop All
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="hide-scrollbar mt-[50px] max-[500px]:mt-[30px] flex overflow-x-auto gap-6 max-[768px]:gap-3 max-[500px]:gap-5 pb-2">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg hover:shadow-md transition flex-shrink-0"
                >
                  {/* Image */}
                  <div
                    className="w-[240px] h-[260px] max-[1024px]:w-[210px] max-[1024px]:h-[210px] max-[768px]:w-[200px] max-[768px]:h-[200px] max-[500px]:w-[100px] max-[500px]:h-[100px] overflow-hidden rounded-md cursor-pointer"
                    onClick={() =>
                      navigate("/productdetails", { state: { product } })
                    }
                  >
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md transition-opacity duration-300"
                      onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="px-2 py-3 max-[500px]:px-0 max-[500px]:py-0">
                    <div className="flex items-center justify-between max-[500px]:mt-2">
                      <div className="flex flex-col w-full max-[500px]:w-[100px]">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base max-[1024px]:text-[12px] max-[768px]:text-[14px] max-[500px]:text-[10px] max-[500px]:w-[80px] max-[500px]:leading-tight font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <div
                            onClick={() =>
                              toggleWishlist({
                                id: product.id,
                                name: product.name,   // ✅ FIX: was "title"
                                image_url: product.image_url, // ✅ FIX: was "image"
                                price: product.price,
                              })
                            }
                            role="button"
                          >
                            {isLiked(product.id) ? (
                              <FaHeart className="text-red-500 text-[20px] max-[500px]:text-[16px] cursor-pointer" />
                            ) : (
                              <FaRegHeart className="text-black text-[20px] max-[500px]:text-[16px] hover:text-red-500 cursor-pointer" />
                            )}
                          </div>
                        </div>

                        {/* ✅ FIX: use mrp instead of originalPrice */}
                        <div className="flex flex-row max-[500px]:flex-col max-[500px]:items-start gap-2 max-[500px]:gap-0 items-center mt-2 max-[500px]:mt-1">
                          {product.mrp && product.mrp > product.price && (
                            <p className="text-[16px] max-[500px]:text-[10px] text-red-700 line-through md:text-[12px]">
                              ₹{Number(product.mrp).toFixed(2)}
                            </p>
                          )}
                          <p className="text-[16px] max-[500px]:text-[10px] font-medium text-green-800 md:text-[12px]">
                            ₹{Number(product.price).toFixed(2)}
                          </p>
                          {product.mrp && product.mrp > product.price && (
                            <span className="text-xs text-green-600 font-semibold">
                              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-10 max-[500px]:mt-2 flex justify-between items-center md:mt-[16px]">
                      <button className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm lg:text-xl max-[500px]:w-[100px] max-[500px]:text-[10px]">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-10 text-[26px]">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSelling;