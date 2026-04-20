import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductFilter from './ProductFilter';
import { useWishlist } from "../context/WishlistContext";
import { fetchProducts } from "../api/fetchProducts";

const CollectionProduct = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLiked = (id) => wishlist.some((item) => item.id === id);

  // ✅ FIX: fetch from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        setAllProducts(result.products);
        setFilteredProducts(result.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ✅ FIX: apply filters when filter changes
  const handleFilterChange = ({ availability, priceSort, dateSort }) => {
    let result = [...allProducts];

    if (availability === "In Stock") {
      result = result.filter((p) => p.stock > 0);
    } else if (availability === "Out of Stock") {
      result = result.filter((p) => p.stock === 0);
    }

    if (priceSort === "Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (dateSort === "Newest First") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (dateSort === "Oldest First") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredProducts(result);
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase">
        Collection
      </h2>

      {/* ✅ FIX: pass onFilterChange and totalCount */}
      <ProductFilter
        onFilterChange={handleFilterChange}
        totalCount={filteredProducts.length}
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-2 justify-items-center">
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg hover:shadow-md transition flex-shrink-0"
            >
              {/* Image */}
              <div
                className="w-full h-[360px] max-[1024px]:h-[200px] max-[768px]:h-[250px] max-[500px]:w-[100px] max-[500px]:h-[100px] overflow-hidden rounded-md cursor-pointer"
                onClick={() => navigate("/productdetails", { state: { product } })}
              >
                <img
                  src={product.image_url || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                />
              </div>

              {/* Info */}
              <div className="px-2 py-3 max-[500px]:px-0 max-[500px]:py-0">
                <div className="flex items-center justify-between max-[500px]:mt-2">
                  <div className="flex flex-col w-full max-[500px]:w-[100px]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base max-[500px]:text-[10px] max-[500px]:w-[80px] font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <div
                        onClick={() => toggleWishlist({
                          id: product.id,
                          name: product.name,
                          image_url: product.image_url,
                          price: product.price,
                        })}
                        role="button"
                      >
                        {isLiked(product.id) ? (
                          <FaHeart className="text-red-500 text-[20px] cursor-pointer" />
                        ) : (
                          <FaRegHeart className="text-black text-[20px] hover:text-red-500 cursor-pointer" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center mt-2">
                      {product.mrp && product.mrp > product.price && (
                        <p className="text-[16px] max-[500px]:text-[10px] text-red-700 line-through md:text-[12px]">
                          ₹{Number(product.mrp).toFixed(0)}
                        </p>
                      )}
                      <p className="text-[16px] max-[500px]:text-[10px] font-medium text-green-800 md:text-[12px]">
                        ₹{Number(product.price).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 max-[500px]:mt-2 flex justify-between items-center md:mt-[16px]">
                  <button
                    onClick={() => navigate("/productdetails", { state: { product } })}
                    className="border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p className="col-span-4 text-center text-gray-500 mt-10">No products found.</p>
          )}
        </div>
      )}

      <div className="flex justify-center mt-[20px] w-full">
        <button
          className="flex items-center justify-center w-[110px] h-[40px] border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#0D4017] transition"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CollectionProduct;