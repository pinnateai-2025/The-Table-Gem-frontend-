import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { ArrowLeft, ChevronRight, RefreshCw, Search, X, ShoppingBag, XCircle, Edit3 } from 'lucide-react';
import api from '../api/axios';

const G = "'Cormorant Garamond', serif";

const STATUS_CFG = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Pending' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400', label: 'Confirmed' },
  processing: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400', label: 'Processing' },
  shipped: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-400', label: 'Shipped' },
  out_for_delivery: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400', label: 'Out for Delivery' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400', label: 'Cancelled' },
};

// ✅ Orders can only be cancelled/modified before shipping
const CANCELLABLE_STATUSES = ['pending', 'confirmed'];

const StatusBadge = ({ status }) => {
  const c = STATUS_CFG[status] || { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-300', label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 ${c.bg} ${c.text} text-xs font-semibold px-3 py-1.5 rounded-full`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

/* ── Cancel Confirmation Modal ── */
const CancelModal = ({ order, onConfirm, onClose, loading }) => (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <XCircle size={20} className="text-red-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Cancel Order</h3>
          <p className="text-xs text-gray-400">{order.orderNumber || `#${order.id}`}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to cancel this order? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          Keep Order
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
        >
          {loading ? 'Cancelling...' : 'Yes, Cancel'}
        </button>
      </div>
    </div>
  </div>
);

/* ── Modify Order Modal ── */
const ModifyModal = ({ order, onClose, onSuccess, onRefresh }) => {
  const [note, setNote] = useState(order.customerNote || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ FIX: check if shipped — show warning instead of form
  const isShipped = !CANCELLABLE_STATUSES.includes(order.status);

  if (isShipped) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚚</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Order Already Shipped</h3>
          <p className="text-sm text-gray-500 mb-5">
            Your order has been <strong>{order.status}</strong> and can no longer be modified.
            Please contact support if you need help.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#0D4017] text-white rounded-xl text-sm font-semibold hover:bg-[#0a3313] transition"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await api.patch(`/order/${order.id}`, { customerNote: note });
      onSuccess('Order note updated successfully');
      onRefresh(); // ✅ refresh orders list
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D4017]/10 flex items-center justify-center">
              <Edit3 size={18} className="text-[#0D4017]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Modify Order</h3>
              <p className="text-xs text-gray-400">{order.orderNumber || `#${order.id}`}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={13} />
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
          <p className="text-xs text-amber-700 font-medium">
            ⚠️ You can update the delivery note below. To change items, please cancel and place a new order.
          </p>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1.5 block tracking-wider uppercase">
            Delivery Note
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Add delivery instructions (e.g. leave at door, call before delivery...)"
            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0D4017] resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">{note.length}/500</p>
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 bg-[#0D4017] text-white rounded-xl text-sm font-semibold hover:bg-[#0a3313] transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Order Detail Modal ── */
const OrderModal = ({ order, onClose, onCancelSuccess }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!order) return null;

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  const formatCurrency = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

  const steps = ['pending', 'confirmed', 'shipped', 'delivered'];
  const stepIdx = steps.indexOf(order.status);
  const items = order.items || [];

  // ✅ Can cancel/modify only if pending or confirmed
  const canModify = CANCELLABLE_STATUSES.includes(order.status);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      await api.patch(`/order/${order.id}/cancel`, { reason: 'Cancelled by customer' });
      setShowCancelConfirm(false);
      setSuccessMsg('Order cancelled successfully');
      // ✅ Notify parent to refresh orders list
      setTimeout(() => {
        onCancelSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ fontFamily: G }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl">

          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between z-10 rounded-t-2xl">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-0.5">Order Details</p>
              <h2 className="text-xl font-semibold text-gray-900">
                {order.orderNumber || `#${order.id}`}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={order.status} />
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">

            {/* Success message */}
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-emerald-700 text-sm font-medium text-center">
                ✓ {successMsg}
              </div>
            )}

            {/* ✅ Action buttons — only show if cancellable */}
            {canModify && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModify(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#0D4017] text-[#0D4017] rounded-xl text-sm font-semibold hover:bg-[#0D4017] hover:text-white transition"
                >
                  <Edit3 size={14} /> Modify Order
                </button>
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-red-400 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white transition"
                >
                  <XCircle size={14} /> Cancel Order
                </button>
              </div>
            )}

            {/* ✅ Info when order can't be modified */}
            {!canModify && order.status !== 'cancelled' && order.status !== 'delivered' && (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                <p className="text-xs text-gray-500 text-center">
                  🚚 This order cannot be modified or cancelled as it has been <strong>{order.status}</strong>.
                </p>
              </div>
            )}

            {/* Progress tracker */}
            {order.status !== 'cancelled' && (
              <div>
                <p className="text-xs text-gray-400 mb-4 tracking-wider uppercase">Order Progress</p>
                <div className="flex items-center">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= stepIdx ? 'bg-[#0D4017] text-white' : 'bg-gray-100 text-gray-400'
                          }`}>
                          {i < stepIdx ? '✓' : i + 1}
                        </div>
                        <p className={`text-[10px] mt-1.5 capitalize tracking-wide ${i <= stepIdx ? 'text-[#0D4017] font-semibold' : 'text-gray-400'
                          }`}>
                          {step}
                        </p>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${i < stepIdx ? 'bg-[#0D4017]' : 'bg-gray-100'
                          }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Order Date', value: formatDate(order.createdAt) },
                { label: 'Total Amount', value: formatCurrency(order.totalAmount) },
                { label: 'Payment', value: order.paymentMethod || order.payment?.method || 'Online' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#FAFAF7] rounded-xl p-4">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Tracking */}
            {order.trackingNumber && (
              <div className="bg-[#FAFAF7] rounded-xl p-4">
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Tracking</p>
                <p className="text-sm font-semibold text-gray-900">
                  {order.trackingNumber} {order.carrier && `· ${order.carrier}`}
                </p>
              </div>
            )}

            {/* Items */}
            <div>
              <p className="text-xs text-gray-400 mb-3 tracking-wider uppercase">
                Items ({items.length})
              </p>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-[#FAFAF7] rounded-xl">
                    <img
                      src={item.productImage || item.product?.image_url || '/placeholder.png'}
                      alt={item.productName || item.product?.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                      onError={e => { e.currentTarget.src = '/placeholder.png'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.productName || item.product?.name || '—'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                      {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
                    </div>
                    <p className="text-sm font-semibold text-[#0D4017] shrink-0">
                      {formatCurrency(item.totalPrice || (item.unitPrice || item.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping address */}
            {order.shippingAddress && (
              <div className="bg-[#FAFAF7] rounded-xl p-4">
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Shipping To</p>
                {typeof order.shippingAddress === 'object' ? (
                  <div className="text-sm text-gray-700 leading-relaxed space-y-0.5">
                    {order.shippingAddress.name && <p className="font-semibold">{order.shippingAddress.name}</p>}
                    {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
                    <p>
                      {[
                        order.shippingAddress.line1,
                        order.shippingAddress.line2,
                        order.shippingAddress.city,
                        order.shippingAddress.state,
                        order.shippingAddress.pincode,
                      ].filter(Boolean).join(', ')}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                )}
              </div>
            )}

            {/* Customer note */}
            {order.customerNote && (
              <div className="bg-[#FAFAF7] rounded-xl p-4">
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Delivery Note</p>
                <p className="text-sm text-gray-700">{order.customerNote}</p>
              </div>
            )}

            {/* Price breakdown */}
            <div className="bg-[#FAFAF7] rounded-xl p-4 space-y-2">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3">Price Breakdown</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className={Number(order.shippingCharge) === 0 ? 'text-green-600 font-medium' : ''}>
                  {Number(order.shippingCharge) === 0 ? 'FREE' : formatCurrency(order.shippingCharge)}
                </span>
              </div>
              {Number(order.discountAmount) > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>− {formatCurrency(order.discountAmount)}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Paid</p>
              <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: G }}>
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel confirmation */}
      {showCancelConfirm && (
        <CancelModal
          order={order}
          onConfirm={handleCancel}
          onClose={() => setShowCancelConfirm(false)}
          loading={cancelling}
        />
      )}

      {/* Modify modal */}
      {showModify && (
        <ModifyModal
          order={order}
          onClose={() => setShowModify(false)}
          onSuccess={(msg) => setSuccessMsg(msg)}
          onRefresh={onCancelSuccess}
        />
      )}
    </>
  );
};

/* ── Main Orders Page ── */
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const formatCurrency = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

  const loadOrders = () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/register/login'); return; }

    setLoading(true);
    api.get('/order/my')
      .then(({ data }) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.items)
              ? data.items
              : Array.isArray(data?.rows)
                ? data.rows
                : Array.isArray(data?.orders)
                  ? data.orders
                  : [];
        setOrders(list);
      })
      .catch(err => {
        if (err.response?.status === 401) navigate('/register/login');
        console.error("Failed to fetch orders:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = orders
    .filter(o => filter === 'all' || o.status === filter)
    .filter(o => {
      const s = search.toLowerCase();
      return !s
        || String(o.id).includes(s)
        || (o.orderNumber || '').toLowerCase().includes(s)
        || (o.items || []).some(i => (i.productName || i.product?.name || '').toLowerCase().includes(s));
    });

  const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp 0.6s ease both; }
      `}</style>

      <div style={{ fontFamily: G }}>

        {/* Hero */}
        <div className="bg-[#0D4017] py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 75% 50%, #4a9a5a 0%, transparent 55%)' }} />
          <div className="max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3">Account</p>
            <h1 className="text-white text-5xl font-light">My <em>Orders</em></h1>
            <div className="mt-5 w-10 h-px bg-white/25" />
          </div>
        </div>

        {/* Body */}
        <div className="bg-[#FAFAF7] min-h-screen">
          <div className="max-w-4xl mx-auto px-5 py-10">

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search orders or products…"
                  className="w-full pl-10 pr-9 py-3 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:border-[#0D4017] transition-all"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600">
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`text-xs px-4 py-2.5 rounded-full whitespace-nowrap transition-all border ${filter === f ? 'bg-[#0D4017] text-white border-[#0D4017]' : 'border-gray-200 text-gray-600 hover:border-[#0D4017] bg-white'
                      }`}>
                    {f === 'all' ? 'All Orders' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            {!loading && orders.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Total Orders', value: orders.length },
                  { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length },
                  { label: 'In Progress', value: orders.filter(o => ['pending', 'confirmed', 'processing', 'shipped'].includes(o.status)).length },
                  { label: 'Total Spent', value: `₹${orders.reduce((s, o) => s + Number(o.totalAmount || 0), 0).toLocaleString('en-IN')}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm fu">
                    <p className="text-xl font-semibold text-[#0D4017]" style={{ fontFamily: G }}>{value}</p>
                    <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-1">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* List */}
            {loading ? (
              <div className="flex justify-center py-20">
                <RefreshCw size={22} className="text-[#0D4017] animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center mb-6">
                  <ShoppingBag size={28} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-light text-gray-500 mb-2">No orders yet</h3>
                <p className="text-gray-300 text-sm mb-8">
                  {search || filter !== 'all' ? 'Try different filters' : 'Your orders will appear here once you shop with us'}
                </p>
                <button onClick={() => navigate('/')}
                  className="bg-[#0D4017] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#0a3313] transition-all">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((order, idx) => {
                  const canModify = CANCELLABLE_STATUSES.includes(order.status);
                  return (
                    <div key={order.id} onClick={() => setSelected(order)}
                      className="fu bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-[#0D4017]/20 transition-all group"
                      style={{ animationDelay: `${idx * 0.04}s` }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex -space-x-2 shrink-0">
                            {(order.items || []).slice(0, 3).map((item, i) => (
                              <img key={i}
                                src={item.productImage || item.product?.image_url || '/placeholder.png'}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover border-2 border-white"
                                style={{ zIndex: 3 - i }}
                                onError={e => { e.currentTarget.src = '/placeholder.png'; }}
                              />
                            ))}
                            {(order.items || []).length > 3 && (
                              <div className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-medium" style={{ zIndex: 0 }}>
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-gray-900">
                                {order.orderNumber || `Order #${order.id}`}
                              </p>
                              <StatusBadge status={order.status} />
                              {/* ✅ Show "cancellable" hint on card */}
                              {canModify && (
                                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                  Modifiable
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(order.createdAt)} · {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-base font-semibold text-gray-900" style={{ fontFamily: G }}>
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0D4017] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <OrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onCancelSuccess={() => {
            setSelected(null);
            loadOrders(); // ✅ refresh list after cancel
          }}
        />
      )}
    </Layout>
  );
};

export default Orders;