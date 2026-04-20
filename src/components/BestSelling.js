import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../api/fetchProducts";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isLiked = (id) => wishlist.some(item => item.id === id);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        setProducts(result.products);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');
        .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .product-img-wrap { overflow: hidden; }
        .product-img-wrap img { transition: transform 0.6s ease; }
        .product-card:hover .product-img-wrap img { transform: scale(1.06); }
        .add-cart-btn { transform: translateY(100%); transition: transform 0.3s ease; }
        .product-card:hover .add-cart-btn { transform: translateY(0); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .prod-animate { animation: fadeInUp 0.5s ease both; }
      `}</style>

      <section className="w-full py-16 px-6 bg-white">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Curated Collection
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Shop All
          </h2>
          <div className="mt-4 w-16 h-px bg-[#0D4017]/40 mx-auto" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#0D4017]/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-20" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px' }}>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-[1400px] mx-auto">
            {products.map((product, idx) => {
              const discount = product.mrp && product.mrp > product.price
                ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
              const liked = isLiked(product.id);

              return (
                <div
                  key={product.id}
                  className="product-card prod-animate bg-white rounded-2xl overflow-hidden border border-gray-100 group relative cursor-pointer"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Image */}
                  <div
                    className="product-img-wrap relative aspect-[4/5] bg-gray-50"
                    onClick={() => navigate("/productdetails", { state: { product } })}
                  >
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.currentTarget.src = "/placeholder.png"; }}
                    />

                    {/* Discount badge */}
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#0D4017] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                      onClick={e => { e.stopPropagation(); toggleWishlist({ id: product.id, name: product.name, image_url: product.image_url, price: product.price }); }}
                    >
                      <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </button>

                    {/* Add to cart - slides up on hover */}
                    <div className="add-cart-btn absolute bottom-0 left-0 right-0 bg-[#0D4017] text-white text-xs font-medium py-2.5 flex items-center justify-center gap-2 tracking-wide">
                      <ShoppingCart size={13} /> Add to Cart
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[15px] font-semibold text-[#0D4017]">₹{Number(product.price).toFixed(0)}</span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-xs text-gray-400 line-through">₹{Number(product.mrp).toFixed(0)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all button */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/shop')}
              className="border border-[#0D4017] text-[#0D4017] hover:bg-[#0D4017] hover:text-white text-sm px-10 py-3 rounded-full transition-all duration-300 tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px' }}
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default BestSelling;