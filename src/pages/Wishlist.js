import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ShoppingBag, RefreshCw } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const G = "'Cormorant Garamond', serif";

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart() || {};

    const handleAddToCart = (item) => {
        if (addToCart) addToCart(item);
        navigate('/productdetails', { state: { product: item } });
    };

    const handleMoveAll = () => {
        wishlist.forEach(item => { if (addToCart) addToCart(item); });
        clearWishlist?.();
        navigate('/cart');
    };

    return (
        <Layout>
            <>
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
          @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
          @keyframes fadeIn  { from{opacity:0}to{opacity:1} }
          @keyframes heartPop{ 0%{transform:scale(1)}40%{transform:scale(1.35)}70%{transform:scale(0.9)}100%{transform:scale(1)} }
          .fu   { animation: fadeUp  0.55s ease both; }
          .fi   { animation: fadeIn  0.4s  ease both; }
          .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }
          .img-zoom img { transition: transform 0.6s ease; }
          .card-hover:hover .img-zoom img { transform: scale(1.06); }
          .cart-reveal { transform: translateY(100%); transition: transform 0.3s ease; }
          .card-hover:hover .cart-reveal { transform: translateY(0); }
        `}</style>

                <div style={{ fontFamily: G }}>
                    {/* Hero */}
                    <div className="bg-[#0D4017] py-16 px-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #4a9a5a 0%, transparent 55%)' }} />
                        <div className="max-w-6xl mx-auto">
                            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
                                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back
                            </button>
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div>
                                    <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3">Saved Items</p>
                                    <h1 className="text-white text-5xl font-light flex items-center gap-3">
                                        My <em>Wishlist</em>
                                        {wishlist.length > 0 && (
                                            <span className="text-base font-normal bg-white/15 text-white px-3 py-1 rounded-full">
                                                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </h1>
                                </div>
                                {wishlist.length > 1 && (
                                    <div className="flex gap-3 pb-1">
                                        <button
                                            onClick={handleMoveAll}
                                            className="flex items-center gap-2 bg-white text-[#0D4017] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#0D4017] hover:text-white hover:border hover:border-white transition-all"
                                        >
                                            <ShoppingCart size={13} /> Move All to Cart
                                        </button>
                                        <button
                                            onClick={() => clearWishlist?.()}
                                            className="flex items-center gap-2 border border-white/25 text-white/70 hover:text-white text-xs px-5 py-2.5 rounded-full hover:bg-white/10 transition-all"
                                        >
                                            <Trash2 size={13} /> Clear All
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-5 w-10 h-px bg-white/25" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#FAFAF7] min-h-screen">
                        <div className="max-w-6xl mx-auto px-5 py-12">
                            {wishlist.length === 0 ? (
                                /* Empty state */
                                <div className="flex flex-col items-center justify-center py-28 text-center fi">
                                    <div className="relative mb-8">
                                        <div className="w-28 h-28 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center">
                                            <Heart size={42} className="text-gray-200" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#0D4017] rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">0</span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-light text-gray-400 mb-3" style={{ fontFamily: G }}>
                                        Your wishlist is empty
                                    </h2>
                                    <p className="text-gray-300 text-base max-w-xs leading-relaxed mb-10">
                                        Save items you love by tapping the heart icon on any product.
                                    </p>
                                    <button
                                        onClick={() => navigate('/shop')}
                                        className="bg-[#0D4017] text-white text-sm font-medium px-10 py-3.5 rounded-full hover:bg-[#0a3313] transition-all shadow-sm"
                                    >
                                        Explore Collection
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Summary bar */}
                                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                                        <div>
                                            <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-1">Your Saved Items</p>
                                            <p className="text-2xl font-light text-gray-900">
                                                {wishlist.length} piece{wishlist.length !== 1 ? 's' : ''} you love
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 mb-1">Combined Value</p>
                                            <p className="text-xl font-semibold text-[#0D4017]" style={{ fontFamily: G }}>
                                                ₹{wishlist.reduce((s, i) => s + Number(i.price || 0), 0).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Products grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
                                        {wishlist.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className="card-hover fu bg-white rounded-2xl overflow-hidden border border-gray-100 relative group"
                                                style={{ animationDelay: `${idx * 0.05}s` }}
                                            >
                                                {/* Image */}
                                                <div
                                                    className="img-zoom relative overflow-hidden aspect-[4/5] bg-gray-50 cursor-pointer"
                                                    onClick={() => navigate('/productdetails', { state: { product: item } })}
                                                >
                                                    <img
                                                        src={item.image_url || '/placeholder.png'}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={e => { e.currentTarget.src = '/placeholder.png'; }}
                                                    />

                                                    {/* Remove from wishlist */}
                                                    <button
                                                        onClick={e => { e.stopPropagation(); toggleWishlist(item); }}
                                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                                                        title="Remove from wishlist"
                                                    >
                                                        <Heart size={14} className="fill-red-500 text-red-500" />
                                                    </button>

                                                    {/* Cart slide-up */}
                                                    <div
                                                        className="cart-reveal absolute bottom-0 left-0 right-0 bg-[#0D4017] text-white text-xs font-medium py-3 flex items-center justify-center gap-2 tracking-wide z-10 cursor-pointer"
                                                        onClick={e => { e.stopPropagation(); handleAddToCart(item); }}
                                                    >
                                                        <ShoppingCart size={13} /> Add to Cart
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="p-3.5">
                                                    <p
                                                        className="text-sm font-semibold text-gray-900 truncate mb-1 cursor-pointer hover:text-[#0D4017] transition-colors"
                                                        onClick={() => navigate('/productdetails', { state: { product: item } })}
                                                    >
                                                        {item.name}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[#0D4017] font-semibold text-sm">
                                                            ₹{Number(item.price || 0).toLocaleString('en-IN')}
                                                        </p>
                                                        {item.mrp && item.mrp > item.price && (
                                                            <p className="text-xs text-gray-400 line-through">
                                                                ₹{Number(item.mrp).toLocaleString('en-IN')}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Mobile add to cart */}
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className="sm:hidden mt-3 w-full border border-[#0D4017] text-[#0D4017] text-xs font-medium py-2 rounded-xl hover:bg-[#0D4017] hover:text-white transition-all"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom CTA */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                                        <p className="text-xs tracking-[0.25em] text-gray-300 uppercase mb-3">Ready to buy?</p>
                                        <h3 className="text-2xl font-light text-gray-800 mb-5" style={{ fontFamily: G }}>
                                            You have {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <button
                                                onClick={handleMoveAll}
                                                className="flex items-center justify-center gap-2 bg-[#0D4017] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#0a3313] transition-all shadow-sm"
                                            >
                                                <ShoppingCart size={15} /> Move All to Cart
                                            </button>
                                            <button
                                                onClick={() => navigate('/shop')}
                                                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-sm px-8 py-3.5 rounded-full hover:border-[#0D4017] hover:text-[#0D4017] transition-all"
                                            >
                                                <ShoppingBag size={15} /> Continue Shopping
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Wishlist;