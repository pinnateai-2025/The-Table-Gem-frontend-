import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Heart, ShoppingCart, Search, X, SlidersHorizontal,
  ChevronDown, ChevronUp, Grid3X3, LayoutList, ArrowUpDown
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import api from '../api/axios';

const G = "'Cormorant Garamond', serif";

/* ─── helpers ─────────────────────────────────────────────── */
function extractList(data) {
  if (!data) return [];
  return data.products ?? data.data ?? data.rows ?? (Array.isArray(data) ? data : []);
}

const SORT_OPTIONS = [
  { value: '',           label: 'Featured'      },
  { value: 'latest',     label: 'Newest First'  },
  { value: 'oldest',     label: 'Oldest First'  },
  { value: 'price_low',  label: 'Price: Low → High' },
  { value: 'price_high', label: 'Price: High → Low' },
];

/* ─── sub-components ───────────────────────────────────────── */
function ProductCard({ product, view, onNavigate, onWishlist, liked }) {
  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  if (view === 'list') {
    return (
      <div className="prod-card bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-5 p-4 hover:shadow-md transition-all">
        <div
          className="prod-img relative overflow-hidden rounded-xl bg-gray-50 shrink-0 w-32 h-32 sm:w-44 sm:h-44 cursor-pointer"
          onClick={() => onNavigate(product)}
        >
          <img
            src={product.image_url || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.src = '/placeholder.png'; }}
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-[#0D4017] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                {product.category?.name && (
                  <span className="text-[10px] tracking-[0.2em] text-[#0D4017]/60 uppercase">{product.category.name}</span>
                )}
                <h3
                  className="text-lg font-semibold text-gray-900 mt-0.5 cursor-pointer hover:text-[#0D4017] transition-colors leading-tight"
                  onClick={() => onNavigate(product)}
                  style={{ fontFamily: G }}
                >
                  {product.name}
                </h3>
              </div>
              <button
                onClick={() => onWishlist(product)}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-red-50 transition-colors shrink-0"
              >
                <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
              </button>
            </div>
            {product.description && (
              <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed" style={{ fontFamily: G }}>
                {product.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-semibold text-[#0D4017]" style={{ fontFamily: G }}>
                ₹{Number(product.price).toFixed(0)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-gray-400 line-through">₹{Number(product.mrp).toFixed(0)}</span>
              )}
              {discount > 0 && (
                <span className="text-xs font-semibold text-emerald-600">{discount}% off</span>
              )}
            </div>
            <button
              onClick={() => onNavigate(product)}
              className="flex items-center gap-2 bg-[#0D4017] text-white text-xs font-medium px-5 py-2.5 rounded-full hover:bg-[#0a3313] transition-all"
            >
              <ShoppingCart size={12} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prod-card prod-in bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group">
      <div
        className="prod-img relative overflow-hidden aspect-[4/5] bg-gray-50"
        onClick={() => onNavigate(product)}
      >
        <img
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src = '/placeholder.png'; }}
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#0D4017] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Out of Stock</span>
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          onClick={e => { e.stopPropagation(); onWishlist(product); }}
        >
          <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        <div className="cart-slide absolute bottom-0 left-0 right-0 bg-[#0D4017] text-white text-xs font-medium py-3 flex items-center justify-center gap-2 tracking-wide z-10">
          <ShoppingCart size={13} /> Add to Cart
        </div>
      </div>
      <div className="p-3.5" style={{ fontFamily: G }}>
        {product.category?.name && (
          <p className="text-[10px] tracking-[0.2em] text-[#0D4017]/50 uppercase mb-1">{product.category.name}</p>
        )}
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
}

/* ─── main component ───────────────────────────────────────── */
const ShopSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist, toggleWishlist } = useWishlist();

  /* state */
  const [products, setProducts]         = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [view, setView]                 = useState('grid');         // 'grid' | 'list'
  const [showFilters, setShowFilters]   = useState(false);          // mobile sidebar toggle
  const [filtersOpen, setFiltersOpen]   = useState({               // desktop accordion
    category: true, price: true, stock: true,
  });

  /* filter / pagination state */
  const [search, setSearch]             = useState('');
  const [searchInput, setSearchInput]   = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort]                 = useState('');
  const [stockFilter, setStockFilter]   = useState('all');          // 'all' | 'in' | 'out'
  const [priceRange, setPriceRange]     = useState([0, 10000]);
  const [maxPrice, setMaxPrice]         = useState(10000);
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalItems, setTotalItems]     = useState(0);
  const LIMIT = 12;

  const isLiked = (id) => wishlist.some(w => w.id === id);

  /* ── read ?q= from URL (from Navbar search) ── */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchInput(q);
    setSearch(q);
  }, [location.search]);

  /* ── fetch categories once ── */
  useEffect(() => {
    api.get('/category')
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.data || []);
        setCategories(list.filter(c => !c.parentId));
      })
      .catch(() => {});
  }, []);

  /* ── fetch products whenever filters change ── */
  const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true); else setLoadingMore(true);
    try {
      const params = new URLSearchParams();
      params.set('page',  pageNum);
      params.set('limit', LIMIT);
      if (search)           params.set('q',        search);
      if (selectedCategory) params.set('category', selectedCategory);
      if (sort)             params.set('sort',      sort);
      if (stockFilter === 'in')  params.set('inStock',  'true');
      if (stockFilter === 'out') params.set('outStock', 'true');

      const { data } = await api.get(`/product?${params.toString()}`);
      const list = extractList(data);

      /* client-side price filter */
      const priceFiltered = list.filter(p =>
        Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
      );

      if (append) {
        setProducts(prev => [...prev, ...priceFiltered]);
      } else {
        setProducts(priceFiltered);
        /* set maxPrice from first full load */
        if (pageNum === 1 && list.length > 0) {
          const highest = Math.max(...list.map(p => Number(p.price)));
          const rounded = Math.ceil(highest / 100) * 100;
          setMaxPrice(rounded);
          setPriceRange([0, rounded]);
        }
      }

      setTotalPages(data?.totalPages  ?? 1);
      setTotalItems(data?.totalItems  ?? priceFiltered.length);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [search, selectedCategory, sort, stockFilter, priceRange[0], priceRange[1]]);

  /* reset to page 1 on filter change */
  useEffect(() => { fetchProducts(1); }, [search, selectedCategory, sort, stockFilter]);

  /* search submit */
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  /* load more */
  const handleLoadMore = () => fetchProducts(page + 1, true);

  /* navigate to product details */
  const handleNavigate = (product) => {
    navigate('/productdetails', { state: { product } });
  };

  /* wishlist toggle */
  const handleWishlist = (product) => {
    toggleWishlist({ id: product.id, name: product.name, image_url: product.image_url, price: product.price });
  };

  /* clear all filters */
  const clearAll = () => {
    setSearch(''); setSearchInput('');
    setSelectedCategory(''); setSort('');
    setStockFilter('all'); setPriceRange([0, maxPrice]);
  };

  const hasActiveFilters = search || selectedCategory || sort || stockFilter !== 'all'
    || priceRange[0] > 0 || priceRange[1] < maxPrice;

  /* ── sidebar filter panel (shared desktop + mobile) ── */
  const FilterPanel = () => (
    <div className="space-y-6" style={{ fontFamily: G }}>
      {/* Clear */}
      {hasActiveFilters && (
        <button onClick={clearAll} className="w-full flex items-center justify-center gap-1.5 text-xs text-red-500 border border-red-100 py-2 rounded-full hover:bg-red-50 transition-colors">
          <X size={12} /> Clear all filters
        </button>
      )}

      {/* Category */}
      <div>
        <button
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3"
          onClick={() => setFiltersOpen(f => ({ ...f, category: !f.category }))}
        >
          Category {filtersOpen.category ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {filtersOpen.category && (
          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedCategory('')}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${!selectedCategory ? 'bg-[#0D4017] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${selectedCategory === String(cat.id) ? 'bg-[#0D4017] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price range */}
      <div>
        <button
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3"
          onClick={() => setFiltersOpen(f => ({ ...f, price: !f.price }))}
        >
          Price Range {filtersOpen.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {filtersOpen.price && (
          <div className="space-y-3 px-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range" min={0} max={maxPrice} step={100}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#0D4017]"
            />
            <input
              type="range" min={0} max={maxPrice} step={100}
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full accent-[#0D4017]"
            />
            <button
              onClick={() => fetchProducts(1)}
              className="w-full text-xs text-[#0D4017] border border-[#0D4017]/30 py-1.5 rounded-full hover:bg-[#0D4017]/5 transition-colors"
            >
              Apply Price Filter
            </button>
          </div>
        )}
      </div>

      {/* Stock */}
      <div>
        <button
          className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3"
          onClick={() => setFiltersOpen(f => ({ ...f, stock: !f.stock }))}
        >
          Availability {filtersOpen.stock ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {filtersOpen.stock && (
          <div className="space-y-1.5">
            {[['all', 'All Products'], ['in', 'In Stock'], ['out', 'Out of Stock']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setStockFilter(val)}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors flex items-center gap-2 ${stockFilter === val ? 'bg-[#0D4017] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className={`w-2 h-2 rounded-full ${val === 'in' ? 'bg-emerald-400' : val === 'out' ? 'bg-red-400' : 'bg-gray-300'} ${stockFilter === val ? 'bg-white' : ''}`} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  /* ─── render ─────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        .prod-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .prod-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }
        .prod-img img { transition: transform 0.6s ease; }
        .prod-card:hover .prod-img img { transform: scale(1.06); }
        .cart-slide { transform: translateY(100%); transition: transform 0.3s ease; }
        .prod-card:hover .cart-slide { transform: translateY(0); }
        @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .prod-in { animation: fadeIn 0.45s ease both; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        /* mobile filter drawer */
        .filter-drawer { transform: translateX(-100%); transition: transform 0.35s ease; }
        .filter-drawer.open { transform: translateX(0); }
      `}</style>

      {/* ── Page hero ── */}
      <div className="bg-[#0D4017] py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4a9a5a 0%, transparent 55%), radial-gradient(circle at 80% 50%, #2d7a3d 0%, transparent 55%)' }} />
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: G }}>Handcrafted Collection</p>
        <h1 className="text-white text-5xl md:text-6xl font-light" style={{ fontFamily: G }}>The Shop</h1>
        <div className="mt-5 w-12 h-px bg-white/30 mx-auto" />

        {/* Search bar inside hero */}
        <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto">
          <div className="relative flex items-center bg-white/12 backdrop-blur-sm border border-white/25 rounded-full px-4 h-12">
            <Search size={16} className="text-white/50 shrink-0" />
            <input
              type="search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-3 focus:outline-none"
              style={{ fontFamily: G, fontSize: '15px' }}
            />
            {searchInput && (
              <button type="button" onClick={() => { setSearchInput(''); setSearch(''); }} className="text-white/50 hover:text-white mr-2">
                <X size={14} />
              </button>
            )}
            <button type="submit" className="bg-white text-[#0D4017] text-xs font-semibold px-5 h-8 rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ── Body ── */}
      <div className="bg-[#FAFAF7] min-h-screen">
        {/* Mobile filter overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="filter-drawer open absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900" style={{ fontFamily: G }}>Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={18} className="text-gray-400" /></button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-sm px-4 py-2.5 rounded-full hover:border-[#0D4017] transition-colors"
              >
                <SlidersHorizontal size={15} /> Filters
                {hasActiveFilters && <span className="w-2 h-2 bg-[#0D4017] rounded-full" />}
              </button>

              <p className="text-sm text-gray-400" style={{ fontFamily: G }}>
                {loading ? 'Loading…' : `${totalItems} product${totalItems !== 1 ? 's' : ''}`}
                {search && <span className="ml-1">for "<em>{search}</em>"</span>}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm pl-4 pr-9 py-2.5 rounded-full focus:outline-none focus:border-[#0D4017] cursor-pointer"
                  style={{ fontFamily: G }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ArrowUpDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-full p-1 gap-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-full transition-colors ${view === 'grid' ? 'bg-[#0D4017] text-white' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-[#0D4017] text-white' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  <LayoutList size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Main layout: sidebar + products */}
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: G }}>Filters</h3>
                  {hasActiveFilters && (
                    <button onClick={clearAll} className="text-[10px] text-red-400 hover:text-red-600 tracking-wider uppercase">
                      Clear
                    </button>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* Products area */}
            <main className="flex-1 min-w-0">
              {loading ? (
                /* Skeleton loader */
                <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                      <div className="aspect-[4/5] bg-gray-100" />
                      <div className="p-3.5 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <ShoppingCart size={28} className="text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-500 mb-2" style={{ fontFamily: G }}>No products found</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {hasActiveFilters ? 'Try adjusting your filters' : 'Products will appear here soon'}
                  </p>
                  {hasActiveFilters && (
                    <button onClick={clearAll} className="text-sm text-[#0D4017] border border-[#0D4017]/30 px-6 py-2.5 rounded-full hover:bg-[#0D4017] hover:text-white transition-all">
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {products.map((product, idx) => (
                      <div key={product.id} style={{ animationDelay: `${(idx % 12) * 0.04}s` }}>
                        <ProductCard
                          product={product}
                          view={view}
                          onNavigate={handleNavigate}
                          onWishlist={handleWishlist}
                          liked={isLiked(product.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  {page < totalPages && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="flex items-center gap-2 border border-[#0D4017] text-[#0D4017] text-sm font-medium px-10 py-3.5 rounded-full hover:bg-[#0D4017] hover:text-white transition-all disabled:opacity-50"
                        style={{ fontFamily: G }}
                      >
                        {loadingMore ? (
                          <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Loading…</>
                        ) : (
                          <>Load More Products</>
                        )}
                      </button>
                    </div>
                  )}

                  {/* End of results */}
                  {page >= totalPages && products.length > 0 && (
                    <div className="text-center mt-12 py-6 border-t border-gray-100">
                      <p className="text-sm text-gray-300 tracking-widest uppercase" style={{ fontFamily: G }}>
                        ✦ End of Collection ✦
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;