import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";
import Layout from "../layout/Layout";
import CategoriesButton from "../components/CategoriesButton";
import api from "../api/axios";

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState(
    location.state?.categoryName || ""
  );
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();
  const isLiked = (productId) => wishlist.some((item) => item.id === productId);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Fetch all categories to get subcategories and name
        const { data: allCategories } = await api.get("/category");

        // Get current category name
        const currentCat = allCategories.find(
          (c) => String(c.id) === String(id)
        );
        if (currentCat) setCategoryName(currentCat.name);

        // Get subcategories of current category
        const subs = allCategories
          .filter((c) => String(c.parentId) === String(id))
          .map((c) => ({
            name: c.name,
            path: `/category/${c.id}`,
            state: { categoryId: c.id, categoryName: c.name },
          }));
        setSubcategories(subs);

        // ✅ Fetch products filtered by categoryId
        const { data: allProducts } = await api.get("/product");
        const filtered = allProducts.filter(
          (p) => String(p.categoryId) === String(id)
        );
        setProducts(filtered);

      } catch (err) {
        console.error("Failed to fetch data", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // ✅ re-runs when category id changes

  return (
    <Layout>
      {/* ✅ Show subcategories if any exist */}
      {subcategories.length > 0 && (
        <CategoriesButton categories={subcategories} />
      )}

      <div className="px-6 py-10">
        {/* Category Title */}
        <h2 className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase">
          {categoryName || "Products"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg hover:shadow-md transition"
              >
                {/* Image */}
                <div
                  className="w-full h-[260px] overflow-hidden rounded-md cursor-pointer"
                  onClick={() =>
                    navigate("/productdetails", { state: { product } })
                  }
                >
                  <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="px-2 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 truncate max-w-[80%]">
                      {product.name}
                    </h3>
                    <div
                      onClick={() =>
                        toggleWishlist({
                          id: product.id,
                          name: product.name,
                          image_url: product.image_url,
                          price: product.price,
                        })
                      }
                      role="button"
                    >
                      {isLiked(product.id) ? (
                        <FaHeart className="text-red-500 text-[20px] cursor-pointer" />
                      ) : (
                        <FaRegHeart className="text-black text-[20px] hover:text-red-500 cursor-pointer" />
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex gap-2 items-center mt-2">
                    {product.mrp && product.mrp > product.price && (
                      <p className="text-sm text-red-700 line-through">
                        ₹{Number(product.mrp).toFixed(2)}
                      </p>
                    )}
                    <p className="text-sm font-medium text-green-800">
                      ₹{Number(product.price).toFixed(2)}
                    </p>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-xs text-green-600 font-semibold">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <button className="mt-4 border border-green-900 text-green-900 px-4 py-1 rounded hover:bg-green-900 hover:text-white transition w-full text-sm">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-10 text-center text-xl">
            No products found in this category.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;