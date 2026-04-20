import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { fetchProducts } from '../api/fetchProducts';

const G = "'Cormorant Garamond', serif";

const NewArrivalProductSection = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ availability: 'All', priceSort: '', dateSort: '' });

  const isLiked = (id) => wishlist.some(item => item.id === id);

  useEffect(() => {
    fetchProducts({ sort: 'latest' })
      .then(res => { setAllProducts(res.products); setFiltered(res.products); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...allProducts];
    if (filters.availability === 'In Stock') result = result.filter(p => p.stock > 0);
    if (filters.availability === 'Out of Stock') result = result.filter(p => p.stock === 0);
    if (filters.priceSort === 'Low to High') result.sort((a, b) => a.price - b.price);
    if (filters.priceSort === 'High to Low') result.sort((a, b) => b.price - a.price);
    if (filters.dateSort === 'Newest First') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filters.dateSort === 'Oldest First') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setFiltered(result);
  }, [filters, allProducts]);

  const clearFilters = () => setFilters({ availability: 'All', priceSort: '', dateSort: '' });
  const hasActiveFilters = filters.availability !== 'All' || filters.priceSort || filters.dateSort;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
        .prod-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .prod-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
        .prod-img img { transition: transform 0.6s ease; }
        .prod-card:hover .prod-img img { transform: scale(1.06); }
        .cart-slide { transform: translateY(100%); transition: transform 0.3s ease; }
        .prod-card:hover .cart-slide { transform: translateY(0); }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .prod-in { animation: fadeIn 0.5s ease both; }
      `}</style>

      <section className="w-full bg-white" style={{ fontFamily: G }}>
        {/* Section header */}
        <div className="text-center pt-16 pb-10 px-6">
          <p className="text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-3">Just Landed</p>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900">New Arrivals</h1>
          <div className="mt-4 w-12 h-px bg-[#0D4017]/40 mx-auto" />
        </div>

        {/* Filter toolbar */}
        <div className="px-6 pb-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
            <div className="flex items-center gap-3 flex-wrap">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors">
                  <X size={12} /> Clear filters
                </button>
              )}
              <select
                value={filters.availability}
                onChange={e => setFilters(f => ({ ...f, availability: e.target.value }))}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:border-[#0D4017] cursor-pointer"
              >
                <option value="All">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <select
                value={filters.priceSort}
                onChange={e => setFilters(f => ({ ...f, priceSort: e.target.value }))}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:border-[#0D4017] cursor-pointer"
              >
                <option value="">Price</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
              <select
                value={filters.dateSort}
                onChange={e => setFilters(f => ({ ...f, dateSort: e.target.value }))}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:border-[#0D4017] cursor-pointer"
              >
                <option value="">Date</option>
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="px-6 pb-16 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#0D4017]/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-300 text-5xl mb-4">◎</p>
              <p className="text-gray-400" style={{ fontSize: '18px' }}>No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {filtered.map((product, idx) => {
                const discount = product.mrp && product.mrp > product.price
                  ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
                const liked = isLiked(product.id);
                return (
                  <div
                    key={product.id}
                    className="prod-card prod-in bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <div
                      className="prod-img relative overflow-hidden aspect-[4/5] bg-gray-50"
                      onClick={() => navigate('/productdetails', { state: { product } })}
                    >
                      <img
                        src={product.image_url || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.src = '/placeholder.png'; }}
                      />
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-[#0D4017] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          -{discount}%
                        </span>
                      )}
                      <button
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                        onClick={e => { e.stopPropagation(); toggleWishlist({ id: product.id, name: product.name, image_url: product.image_url, price: product.price }); }}
                      >
                        <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                      </button>
                      <div className="cart-slide absolute bottom-0 left-0 right-0 bg-[#0D4017] text-white text-xs font-medium py-3 flex items-center justify-center gap-2 tracking-wide">
                        <ShoppingCart size={13} /> Add to Cart
                      </div>
                    </div>
                    <div className="p-3.5">
                      <p className="text-sm font-semibold text-gray-900 truncate mb-1.5">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0D4017] font-semibold">₹{Number(product.price).toFixed(0)}</span>
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
        </div>

        {/* Back button */}
        <div className="flex justify-center pb-16">
          <button
            onClick={() => navigate('/')}
            className="border border-gray-200 text-gray-600 text-sm px-8 py-3 rounded-full hover:border-[#0D4017] hover:text-[#0D4017] transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </section>
    </>
  );
};

export default NewArrivalProductSection;