import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import {
    MapPin, CreditCard, Smartphone, Package,
    ChevronRight, ChevronLeft, Check, RefreshCw,
    Plus, Edit3, Shield, AlertCircle
} from "lucide-react";

const G = "'Cormorant Garamond', serif";
const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#0D4017] focus:ring-2 focus:ring-[#0D4017]/10 focus:bg-white transition-all";

/* ── Inline error box (no browser alert) ── */
const ErrorBox = ({ msg }) => msg ? (
    <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
        <AlertCircle size={15} className="shrink-0 mt-0.5" />
        <span>{msg}</span>
    </div>
) : null;

/* ── Step indicator ── */
const Steps = ({ current }) => {
    const steps = ["Address", "Payment", "Confirm"];
    return (
        <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((label, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-[#0D4017] text-white" :
                                active ? "bg-[#0D4017] text-white ring-4 ring-[#0D4017]/20" :
                                    "bg-gray-100 text-gray-400"
                                }`}>
                                {done ? <Check size={14} /> : i + 1}
                            </div>
                            <p className={`text-[10px] mt-1.5 tracking-wider uppercase ${active || done ? "text-[#0D4017] font-semibold" : "text-gray-400"}`}>
                                {label}
                            </p>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-colors ${done ? "bg-[#0D4017]" : "bg-gray-200"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

/* ── Order summary sidebar ── */
const OrderSummary = ({ cartItems, grandTotal, discountAmount, couponCode }) => {
    const totalMrp = cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.mrp || i.product?.price || i.priceAtAddition || 0), 0
    );
    const clientSubtotal = cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
    );
    const display = grandTotal || clientSubtotal;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-1">Your Order</p>
            <h3 className="text-xl font-light text-gray-900 mb-5">Summary</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-5">
                {cartItems.map(item => {
                    const price = Number(item.product?.price || item.priceAtAddition || 0);
                    return (
                        <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                                <img src={item.product?.image_url || "/placeholder.png"} alt={item.product?.name}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.currentTarget.src = "/placeholder.png"; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">{item.product?.name}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-xs font-bold text-gray-900 shrink-0">
                                ₹{(price * item.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                    <span>MRP</span><span>₹{totalMrp.toLocaleString("en-IN")}</span>
                </div>
                {totalMrp > clientSubtotal && (
                    <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span>−₹{(totalMrp - clientSubtotal).toLocaleString("en-IN")}</span>
                    </div>
                )}
                {Number(discountAmount) > 0 && (
                    <div className="flex justify-between text-emerald-600">
                        <span>Coupon {couponCode && `(${couponCode})`}</span>
                        <span>−₹{Number(discountAmount).toLocaleString("en-IN")}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span>₹{Number(display).toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   STEP 1 — ADDRESS
   FIX: uses Address model field names (name, not fullName)
        label is ENUM: home | work | other
        sends to POST /auth/address
════════════════════════════════════════════════════════ */
const AddressStep = ({ onNext }) => {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    /* Address model uses "name" not "fullName", label is enum home/work/other */
    const [form, setForm] = useState({
        label: "home", name: "", phone: "", line1: "",
        line2: "", city: "", state: "", pincode: "",
        country: "India", landmark: "",
    });

    useEffect(() => {
        api.get("/auth/me")
            .then(({ data }) => {
                const addrs = data?.user?.addresses || [];
                setSavedAddresses(addrs);
                if (addrs.length > 0) setSelectedId(addrs[0].id);
                else setShowForm(true);
            })
            .catch(() => setShowForm(true));
    }, []);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        setSaveError("");
        const required = ["name", "phone", "line1", "city", "state", "pincode"];
        const missing = required.filter(k => !form[k]?.trim());
        if (missing.length) {
            setSaveError(`Please fill: ${missing.join(", ")}`);
            return;
        }
        setSaving(true);
        try {
            const payload = {
                label: form.label || "home",
                name: form.name.trim(),
                phone: form.phone.trim(),
                line1: form.line1.trim(),
                line2: form.line2.trim() || undefined,
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim(),
                country: form.country.trim() || "India",
                landmark: form.landmark.trim() || undefined,
            };
            const { data } = await api.post("/auth/address", payload);
            const newAddr = data?.address || data;
            setSavedAddresses(prev => [...prev, newAddr]);
            setSelectedId(newAddr.id);
            setShowForm(false);
        } catch (err) {
            const msg = err.response?.data?.message
                || err.response?.data?.errors?.[0]?.msg
                || "Failed to save address. Please check all fields.";
            setSaveError(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleNext = () => {
        const addr = savedAddresses.find(a => a.id === selectedId);
        if (!addr) {
            if (showForm) {
                setSaveError("Please save your address first.");
            } else {
                setSaveError("Please select or add a delivery address.");
            }
            return;
        }
        /* Build display string for confirm step */
        const addrStr = [
            addr.name,
            addr.line1,
            addr.line2,
            addr.landmark,
            addr.city,
            `${addr.state} — ${addr.pincode}`,
            addr.country,
        ].filter(Boolean).join(", ");

        onNext({ address: addrStr, addressId: addr.id });
    };

    const LABEL_OPTIONS = [
        { value: "home", label: "🏠 Home" },
        { value: "work", label: "🏢 Work" },
        { value: "other", label: "📍 Other" },
    ];

    return (
        <div className="space-y-5">
            <div>
                <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Step 1</p>
                <h2 className="text-2xl font-light text-gray-900">Delivery Address</h2>
            </div>

            {/* Saved addresses */}
            {savedAddresses.length > 0 && (
                <div className="space-y-3">
                    {savedAddresses.map(addr => (
                        <div
                            key={addr.id}
                            onClick={() => { setSelectedId(addr.id); setShowForm(false); setSaveError(""); }}
                            className={`flex items-start gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedId === addr.id
                                ? "border-[#0D4017] bg-[#0D4017]/[0.03]"
                                : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedId === addr.id ? "border-[#0D4017]" : "border-gray-300"
                                }`}>
                                {selectedId === addr.id && <div className="w-2 h-2 rounded-full bg-[#0D4017]" />}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                    <p className="text-sm font-semibold text-gray-900">{addr.name}</p>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        {addr.label}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}
                                    {addr.landmark ? `, ${addr.landmark}` : ""},&nbsp;
                                    {addr.city}, {addr.state} — {addr.pincode}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => { setShowForm(v => !v); setSelectedId(null); setSaveError(""); }}
                        className="flex items-center gap-2 text-sm text-[#0D4017] hover:underline"
                    >
                        <Plus size={14} /> {showForm ? "Cancel" : "Add a new address"}
                    </button>
                </div>
            )}

            {/* Address form */}
            {showForm && (
                <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Address</p>

                    {/* Label selector */}
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-2 uppercase tracking-wider">Label</label>
                        <div className="flex gap-2">
                            {LABEL_OPTIONS.map(({ value, label }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, label: value }))}
                                    className={`flex-1 py-2 px-3 text-xs rounded-xl border-2 transition-all ${form.label === value
                                        ? "border-[#0D4017] bg-[#0D4017]/[0.04] text-[#0D4017] font-semibold"
                                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: "name", label: "Full Name *", placeholder: "Recipient name", span: 1 },
                            { name: "phone", label: "Phone *", placeholder: "+91 00000 00000", span: 1 },
                            { name: "line1", label: "Address Line 1 *", placeholder: "House / Flat / St", span: 2 },
                            { name: "line2", label: "Address Line 2", placeholder: "Area / Colony", span: 2 },
                            { name: "landmark", label: "Landmark", placeholder: "Near...", span: 2 },
                            { name: "city", label: "City *", placeholder: "City", span: 1 },
                            { name: "state", label: "State *", placeholder: "State", span: 1 },
                            { name: "pincode", label: "Pincode *", placeholder: "800000", span: 1 },
                            { name: "country", label: "Country", placeholder: "India", span: 1 },
                        ].map(({ name, label, placeholder, span }) => (
                            <div key={name} className={span === 2 ? "col-span-2" : "col-span-1"}>
                                <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
                                <input
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className={inputCls}
                                />
                            </div>
                        ))}
                    </div>

                    <ErrorBox msg={saveError} />

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#0D4017] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0a3313] transition-all disabled:opacity-60"
                    >
                        {saving
                            ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                            : <><Check size={13} />Save Address</>
                        }
                    </button>
                </div>
            )}

            {!showForm && <ErrorBox msg={saveError} />}

            <button
                onClick={handleNext}
                className="w-full bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all flex items-center justify-center gap-2 text-sm"
            >
                Continue to Payment <ChevronRight size={16} />
            </button>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   STEP 2 — PAYMENT
   FIX: card/upi both use paymentMethod="razorpay" for backend
        Razorpay logo replaced with text badge (no broken image)
════════════════════════════════════════════════════════ */
const PaymentStep = ({ onNext, onBack, grandTotal, cartItems }) => {
    const [method, setMethod] = useState("cod");
    const [upiId, setUpiId] = useState("");

    const display = Number(grandTotal) || cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
    );

    const METHODS = [
        {
            id: "cod",
            label: "Cash on Delivery",
            sub: "Pay when your order arrives",
            icon: Package,
            badge: null,
        },
        {
            id: "upi",
            label: "UPI",
            sub: "Pay via UPI ID (Google Pay, PhonePe, etc.)",
            icon: Smartphone,
            badge: "Razorpay",
        },
        {
            id: "card",
            label: "Credit / Debit Card",
            sub: "Visa, Mastercard, RuPay — secured by Razorpay",
            icon: CreditCard,
            badge: "Razorpay",
        },
    ];

    const handleNext = () => {
        if (method === "upi" && !upiId.trim()) {
            alert("Please enter your UPI ID."); return;
        }
        onNext({ method, upiId: method === "upi" ? upiId : undefined });
    };

    return (
        <div className="space-y-5">
            <div>
                <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Step 2</p>
                <h2 className="text-2xl font-light text-gray-900">Payment Method</h2>
            </div>

            <div className="space-y-3">
                {METHODS.map(({ id, label, sub, icon: Icon, badge }) => (
                    <div
                        key={id}
                        onClick={() => setMethod(id)}
                        className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${method === id
                            ? "border-[#0D4017] bg-[#0D4017]/[0.03]"
                            : "border-gray-100 hover:border-gray-200"
                            }`}
                    >
                        {/* Radio */}
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${method === id ? "border-[#0D4017]" : "border-gray-300"
                            }`}>
                            {method === id && <div className="w-2 h-2 rounded-full bg-[#0D4017]" />}
                        </div>

                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${method === id ? "bg-[#0D4017]" : "bg-gray-100"
                            }`}>
                            <Icon size={18} className={method === id ? "text-white" : "text-gray-400"} />
                        </div>

                        {/* Labels */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                        </div>

                        {/* Razorpay badge — text, no broken image */}
                        {badge && (
                            <div className="shrink-0 border border-blue-200 bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wider">
                                {badge}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* UPI ID input */}
            {method === "upi" && (
                <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5 space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Enter UPI ID</p>
                    <input
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@paytm  /  yourname@upi"
                        className={inputCls}
                    />
                    <p className="text-xs text-gray-400">
                        You'll receive a collect request on your UPI app after clicking "Proceed to Payment"
                    </p>
                </div>
            )}

            {/* Card info */}
            {method === "card" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                    <Shield size={15} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600 leading-relaxed">
                        Razorpay's secure checkout will open. Your card details are encrypted and never stored on our servers.
                    </p>
                </div>
            )}

            {/* COD info */}
            {method === "cod" && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                    <p className="text-xs text-amber-700 leading-relaxed">
                        💵 Pay <strong>₹{display.toLocaleString("en-IN")}</strong> in cash at the time of delivery.
                        Please keep exact change ready.
                    </p>
                </div>
            )}

            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-6 py-3.5 rounded-xl hover:border-[#0D4017] hover:text-[#0D4017] transition-all"
                >
                    <ChevronLeft size={15} /> Back
                </button>
                <button
                    onClick={handleNext}
                    className="flex-1 bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all flex items-center justify-center gap-2 text-sm"
                >
                    Review Order <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   STEP 3 — CONFIRM
════════════════════════════════════════════════════════ */
const ConfirmStep = ({ onBack, address, paymentMethod, upiId, cartItems, grandTotal, onPlaceOrder, placing, placeError }) => {
    const display = Number(grandTotal) || cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
    );
    const methodLabel = { cod: "Cash on Delivery", upi: "UPI (Razorpay)", card: "Credit / Debit Card (Razorpay)" }[paymentMethod];

    return (
        <div className="space-y-5">
            <div>
                <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Step 3</p>
                <h2 className="text-2xl font-light text-gray-900">Review & Place Order</h2>
            </div>

            {/* Address */}
            <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin size={12} /> Delivering To
                    </p>
                    <button onClick={() => onBack(0)} className="text-xs text-[#0D4017] hover:underline flex items-center gap-1">
                        <Edit3 size={11} /> Change
                    </button>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{address}</p>
            </div>

            {/* Payment */}
            <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <CreditCard size={12} /> Payment
                    </p>
                    <button onClick={() => onBack(1)} className="text-xs text-[#0D4017] hover:underline flex items-center gap-1">
                        <Edit3 size={11} /> Change
                    </button>
                </div>
                <p className="text-sm text-gray-700">{methodLabel}</p>
                {paymentMethod === "upi" && upiId && (
                    <p className="text-xs text-gray-400 mt-1">UPI ID: {upiId}</p>
                )}
            </div>

            {/* Items */}
            <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Items ({cartItems.length})
                </p>
                <div className="space-y-3">
                    {cartItems.map(item => {
                        const price = Number(item.product?.price || item.priceAtAddition || 0);
                        return (
                            <div key={item.id} className="flex items-center gap-3">
                                <img src={item.product?.image_url || "/placeholder.png"} alt=""
                                    className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                                    onError={e => { e.currentTarget.src = "/placeholder.png"; }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                                    <p className="text-xs text-gray-400">
                                        Qty: {item.quantity} × ₹{price.toLocaleString("en-IN")}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 shrink-0">
                                    ₹{(price * item.quantity).toLocaleString("en-IN")}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{display.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <ErrorBox msg={placeError} />

            <div className="flex gap-3">
                <button
                    onClick={() => onBack(1)}
                    disabled={placing}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-6 py-3.5 rounded-xl hover:border-[#0D4017] hover:text-[#0D4017] transition-all disabled:opacity-50"
                >
                    <ChevronLeft size={15} /> Back
                </button>
                <button
                    onClick={onPlaceOrder}
                    disabled={placing}
                    className="flex-1 bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all flex items-center justify-center gap-2 text-sm shadow-sm shadow-green-900/20 disabled:opacity-60"
                >
                    {placing ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Placing Order…</>
                    ) : (
                        paymentMethod === "cod" ? "Place Order →" : "Proceed to Payment →"
                    )}
                </button>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   MAIN CHECKOUT
════════════════════════════════════════════════════════ */
const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, grandTotal, discountAmount, couponCode, clearCart } = useCart();

    const [step, setStep] = useState(0);
    const [address, setAddress] = useState("");
    const [addressId, setAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [upiId, setUpiId] = useState("");
    const [placing, setPlacing] = useState(false);
    const [placeError, setPlaceError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) { navigate("/register/login"); return; }
        if (cartItems.length === 0) { navigate("/cart"); }
    }, [cartItems]);

    const handlePlaceOrder = async () => {
        setPlaceError("");
        setPlacing(true);
        try {
            const backendMethod =
                paymentMethod === "card" ? "razorpay" :
                    paymentMethod === "upi" ? "razorpay" :
                        "cod";

            const { data } = await api.post("/order", {
                addressId,
                paymentMethod: backendMethod,
                couponCode: couponCode || undefined,
            });

            const orderId = data?.order?.id || data?.orderId;

            if (paymentMethod === "cod") {
                await clearCart();
                navigate("/orders", { state: { orderId, success: true } });
                return;
            }

            // ✅ FIX: better error handling for Razorpay
            let rpData;
            try {
                const rpRes = await api.post("/payment/razorpay/create-order", { orderId });
                rpData = rpRes.data;
            } catch (rpErr) {
                // ✅ Log exact Razorpay error
                console.error("Razorpay create-order error:",
                    rpErr.response?.status,
                    JSON.stringify(rpErr.response?.data)
                );
                setPlaceError(
                    rpErr.response?.data?.message ||
                    `Payment setup failed (${rpErr.response?.status}). Check Razorpay keys in EB environment.`
                );
                setPlacing(false);
                return;
            }

            if (!rpData?.key || !rpData?.razorpayOrderId) {
                console.error("Missing Razorpay data:", rpData);
                setPlaceError("Payment gateway not configured. Please use Cash on Delivery or contact support.");
                setPlacing(false);
                return;
            }

            if (!window.Razorpay) {
                await new Promise((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = "https://checkout.razorpay.com/v1/checkout.js";
                    s.onload = resolve;
                    s.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
                    document.body.appendChild(s);
                });
            }

            const options = {
                key: rpData.key,
                amount: rpData.amount,
                currency: rpData.currency || "INR",
                name: "The Table Gem",
                description: `Order ${rpData.orderNumber}`,
                order_id: rpData.razorpayOrderId,
                prefill: {
                    contact: "",
                    ...(paymentMethod === "upi" && upiId ? { vpa: upiId } : {}),
                },
                theme: { color: "#0D4017" },
                handler: async (response) => {
                    try {
                        await api.post("/payment/razorpay/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId,
                        });
                        await clearCart();
                        navigate("/orders", { state: { orderId, success: true } });
                    } catch (verifyErr) {
                        setPlaceError(
                            "Payment completed but verification failed. " +
                            "Please contact support with order ID: " + orderId
                        );
                        setPlacing(false);
                    }
                },
                modal: { ondismiss: () => setPlacing(false) },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", resp => {
                setPlaceError(`Payment failed: ${resp.error.description}`);
                setPlacing(false);
            });
            rzp.open();

        } catch (err) {
            console.error("Place order error:",
                err.response?.status,
                JSON.stringify(err.response?.data)
            );
            setPlaceError(
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                err.message ||
                "Something went wrong. Please try again later."
            );
            setPlacing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <RefreshCw size={22} className="text-[#0D4017] animate-spin" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600&display=swap');`}</style>
            <div className="bg-[#FAFAF7] min-h-screen" style={{ fontFamily: G }}>
                <div className="max-w-5xl mx-auto px-5 py-10">
                    <div className="mb-8">
                        <button onClick={() => navigate("/cart")}
                            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0D4017] transition-colors mb-6 group">
                            <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Cart
                        </button>
                        <p className="text-[10px] tracking-[0.4em] text-[#0D4017]/50 uppercase mb-2">Secure Checkout</p>
                        <h1 className="text-4xl font-light text-gray-900">Checkout</h1>
                    </div>

                    <Steps current={step} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                            {step === 0 && (
                                <AddressStep
                                    onNext={({ address: addr, addressId: aid }) => {
                                        setAddress(addr); setAddressId(aid); setStep(1);
                                    }}
                                />
                            )}
                            {step === 1 && (
                                <PaymentStep
                                    grandTotal={grandTotal}
                                    cartItems={cartItems}
                                    onBack={() => setStep(0)}
                                    onNext={({ method, upiId: uid }) => {
                                        setPaymentMethod(method);
                                        setUpiId(uid || "");
                                        setPlaceError("");
                                        setStep(2);
                                    }}
                                />
                            )}
                            {step === 2 && (
                                <ConfirmStep
                                    address={address}
                                    paymentMethod={paymentMethod}
                                    upiId={upiId}
                                    cartItems={cartItems}
                                    grandTotal={grandTotal}
                                    placing={placing}
                                    placeError={placeError}
                                    onBack={(s) => { setPlaceError(""); setStep(s); }}
                                    onPlaceOrder={handlePlaceOrder}
                                />
                            )}
                        </div>
                        <div className="lg:col-span-1">
                            <OrderSummary
                                cartItems={cartItems}
                                grandTotal={grandTotal}
                                discountAmount={discountAmount}
                                couponCode={couponCode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;