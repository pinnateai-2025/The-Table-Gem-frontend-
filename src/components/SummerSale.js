import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";

const ServewareProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isLiked = (id) => wishlist.some((item) => item.id === id);

  // Use API base URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data?.data) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return (
    <div className="w-full">

      {/* Products Section */}
      <div className="px-6 py-10 max-[500px]:py-5">
        <h2
          className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
        >
          Best Selling
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
                  {/* Image Section */}
                  <div className="w-[240px] h-[260px] max-[1024px]:w-[210px] max-[1024px]:h-[210px] max-[768px]:w-[200px] max-[768px]:h-[200px] max-[500px]:w-[100px] max-[500px]:h-[100px] overflow-hidden rounded-md relative group cursor-pointer">
                    <img
                      onClick={() =>
                        navigate("/productdetails", { state: { product } })
                      }
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md transition-opacity duration-300"
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

                        <div className="flex flex-row max-[500px]:flex-col max-[500px]:items-start gap-2 max-[500px]:gap-0 items-center mt-2 max-[500px]:mt-1">
                          {product.originalPrice && (
                            <p className="text-[16px] max-[500px]:text-[10px] text-red-700 line-through md:text-[12px]">
                              {/* Rs. {product.originalPrice}.00 */}
                            </p>
                          )}
                          <p className="text-[16px] max-[500px]:text-[10px] font-medium text-green-800 md:text-[12px]">
                            Rs. {product.price}.00
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 max-[500px]:mt-2 flex justify-between items-center md:mt-[16px]">
                      <button className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm lg:text-xl max-[500px]:w-[100px] max-[500px]:text-[10px]">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-10 text-[26px]">No products found.</p>
            )}
          </div>
        )}
      </div>

      {/* View All Button */}
      {/* <div className="flex justify-center mb-10 w-full">
        <button
          onClick={() => navigate("/serveware/platter", { state: { products } })}
          className="w-[140px] h-[40px] max-[500px]:w-[100px] max-[500px]:h-[30px] max-[500px]:text-[14px] flex items-center justify-center border border-green-900 py-2 px-10 max-[500px]:px-5 rounded bg-[#0D4017] text-white transition hover:bg-white hover:text-green-900"
        >
          View All
        </button>
      </div> */}
    </div>
  );
};

export default ServewareProduct;
