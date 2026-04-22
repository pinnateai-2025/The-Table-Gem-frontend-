import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import {
    MapPin, CreditCard, Smartphone, Package,
    ChevronRight, ChevronLeft, Check, RefreshCw,
    Plus, Edit3, Shield
} from "lucide-react";

const G = "'Cormorant Garamond', serif";
const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#0D4017] focus:ring-2 focus:ring-[#0D4017]/10 focus:bg-white transition-all";

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
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0">
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
                        <span>Discount</span><span>−₹{(totalMrp - clientSubtotal).toLocaleString("en-IN")}</span>
                    </div>
                )}
                {Number(discountAmount) > 0 && (
                    <div className="flex justify-between text-emerald-600">
                        <span>Coupon {couponCode && `(${couponCode})`}</span>
                        <span>−₹{Number(discountAmount).toLocaleString("en-IN")}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-500">
                    <span>Delivery</span><span className="text-emerald-600 font-medium">FREE</span>
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
════════════════════════════════════════════════════════ */
const AddressStep = ({ onNext }) => {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        label: "Home", fullName: "", phone: "", line1: "",
        line2: "", city: "", state: "", pincode: "", country: "India",
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
        const required = ["fullName", "phone", "line1", "city", "state", "pincode"];
        if (required.some(k => !form[k]?.trim())) {
            alert("Please fill in all required fields."); return;
        }
        setSaving(true);
        try {
            const { data } = await api.post("/auth/address", form);
            const newAddr = data?.address || data;
            setSavedAddresses(prev => [...prev, newAddr]);
            setSelectedId(newAddr.id);
            setShowForm(false);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save address.");
        } finally {
            setSaving(false);
        }
    };

    const handleNext = () => {
        const addr = savedAddresses.find(a => a.id === selectedId);
        if (!addr && !showForm) { alert("Please select or add an address."); return; }
        // If using form directly (no saved addresses), construct address string
        const addrStr = addr
            ? `${addr.fullName}, ${addr.line1}${addr.line2 ? ", " + addr.line2 : ""}, ${addr.city}, ${addr.state} - ${addr.pincode}, ${addr.country}`
            : `${form.fullName}, ${form.line1}${form.line2 ? ", " + form.line2 : ""}, ${form.city}, ${form.state} - ${form.pincode}, ${form.country}`;
        onNext({ address: addrStr, addressId: addr?.id });
    };

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
                            onClick={() => { setSelectedId(addr.id); setShowForm(false); }}
                            className={`flex items-start gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedId === addr.id ? "border-[#0D4017] bg-[#0D4017]/4" : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedId === addr.id ? "border-[#0D4017]" : "border-gray-300"
                                }`}>
                                {selectedId === addr.id && <div className="w-2 h-2 rounded-full bg-[#0D4017]" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-sm font-semibold text-gray-900">{addr.fullName}</p>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider">{addr.label}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} — {addr.pincode}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => { setShowForm(v => !v); setSelectedId(null); }}
                        className="flex items-center gap-2 text-sm text-[#0D4017] hover:underline"
                    >
                        <Plus size={14} /> Add a new address
                    </button>
                </div>
            )}

            {/* Address form */}
            {showForm && (
                <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Address</p>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: "label", label: "Label", placeholder: "Home / Office", span: 1 },
                            { name: "fullName", label: "Full Name *", placeholder: "Recipient name", span: 1 },
                            { name: "phone", label: "Phone *", placeholder: "+91 00000 00000", span: 2 },
                            { name: "line1", label: "Address *", placeholder: "House / Flat / St", span: 2 },
                            { name: "line2", label: "Area", placeholder: "Area / Landmark", span: 2 },
                            { name: "city", label: "City *", placeholder: "City", span: 1 },
                            { name: "state", label: "State *", placeholder: "State", span: 1 },
                            { name: "pincode", label: "Pincode *", placeholder: "000000", span: 1 },
                            { name: "country", label: "Country", placeholder: "India", span: 1 },
                        ].map(({ name, label, placeholder, span }) => (
                            <div key={name} className={span === 2 ? "col-span-2" : "col-span-1"}>
                                <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
                                <input name={name} value={form[name]} onChange={handleChange}
                                    placeholder={placeholder} className={inputCls} />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#0D4017] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0a3313] transition-all disabled:opacity-60"
                    >
                        {saving ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</> : <><Check size={13} />Save Address</>}
                    </button>
                </div>
            )}

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
════════════════════════════════════════════════════════ */
const PaymentStep = ({ onNext, onBack, grandTotal, cartItems }) => {
    const [method, setMethod] = useState("cod");
    const [upiId, setUpiId] = useState("");

    const display = Number(grandTotal) || cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
    );

    const METHODS = [
        { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: Package },
        { id: "upi", label: "UPI", sub: "Pay via UPI ID or scan QR code", icon: Smartphone },
        { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay via Razorpay", icon: CreditCard },
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
                {METHODS.map(({ id, label, sub, icon: Icon }) => (
                    <div
                        key={id}
                        onClick={() => setMethod(id)}
                        className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${method === id ? "border-[#0D4017] bg-[#0D4017]/4" : "border-gray-100 hover:border-gray-200"
                            }`}
                    >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${method === id ? "border-[#0D4017]" : "border-gray-300"
                            }`}>
                            {method === id && <div className="w-2 h-2 rounded-full bg-[#0D4017]" />}
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === id ? "bg-[#0D4017]" : "bg-gray-100"}`}>
                            <Icon size={18} className={method === id ? "text-white" : "text-gray-400"} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{label}</p>
                            <p className="text-xs text-gray-400">{sub}</p>
                        </div>
                        {id !== "cod" && (
                            <div className="ml-auto">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/200px-Razorpay_logo.svg.png"
                                    alt="Razorpay" className="h-5 opacity-50" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* UPI ID input */}
            {method === "upi" && (
                <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Enter UPI ID</p>
                    <input
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className={inputCls}
                    />
                    <p className="text-xs text-gray-400 mt-2">You'll receive a payment request on your UPI app</p>
                </div>
            )}

            {/* Card info */}
            {method === "card" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                    <Shield size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600 leading-relaxed">
                        You'll be redirected to Razorpay's secure payment gateway to complete your payment.
                        Your card details are never stored on our servers.
                    </p>
                </div>
            )}

            {/* COD info */}
            {method === "cod" && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                    <p className="text-xs text-amber-700 leading-relaxed">
                        💵 Pay <strong>₹{display.toLocaleString("en-IN")}</strong> in cash when your order is delivered.
                        Please keep exact change ready.
                    </p>
                </div>
            )}

            <div className="flex gap-3">
                <button onClick={onBack}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-6 py-3.5 rounded-xl hover:border-[#0D4017] hover:text-[#0D4017] transition-all">
                    <ChevronLeft size={15} /> Back
                </button>
                <button onClick={handleNext}
                    className="flex-1 bg-[#0D4017] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0a3313] transition-all flex items-center justify-center gap-2 text-sm">
                    Review Order <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════
   STEP 3 — CONFIRM + PLACE ORDER
════════════════════════════════════════════════════════ */
const ConfirmStep = ({ onBack, address, paymentMethod, upiId, cartItems, grandTotal, onPlaceOrder, placing }) => {
    const display = Number(grandTotal) || cartItems.reduce(
        (s, i) => s + i.quantity * Number(i.product?.price || i.priceAtAddition || 0), 0
    );

    const methodLabel = { cod: "Cash on Delivery", upi: "UPI", card: "Card (Razorpay)" }[paymentMethod];

    return (
        <div className="space-y-5">
            <div>
                <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Step 3</p>
                <h2 className="text-2xl font-light text-gray-900">Review & Place Order</h2>
            </div>

            {/* Address */}
            <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
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
                <div className="flex items-center justify-between mb-3">
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
                                    <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{price.toLocaleString("en-IN")}</p>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 shrink-0">
                                    ₹{(price * item.quantity).toLocaleString("en-IN")}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{display.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button onClick={() => onBack(1)}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-6 py-3.5 rounded-xl hover:border-[#0D4017] hover:text-[#0D4017] transition-all">
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
   MAIN CHECKOUT PAGE
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/register/login"); return; }
        if (cartItems.length === 0) { navigate("/cart"); }
    }, [cartItems]);

    /* ── Place order ── */
    const handlePlaceOrder = async () => {
        setPlacing(true);
        try {
            // 1. Create order on backend
            const { data } = await api.post("/order", {
                shippingAddress: address,
                addressId: addressId || undefined,
                paymentMethod,
                couponCode: couponCode || undefined,
            });

            const orderId = data?.order?.id || data?.orderId;

            // 2. COD → go to success page
            if (paymentMethod === "cod") {
                await clearCart();
                navigate("/orders", { state: { orderId, success: true } });
                return;
            }

            // 3. Razorpay (UPI / Card) → create Razorpay order then open checkout
            const { data: rpData } = await api.post("/payments/razorpay/create-order", { orderId });

            const options = {
                key: rpData.key,
                amount: rpData.amount,
                currency: rpData.currency,
                name: "The Table Gem",
                description: `Order ${rpData.orderNumber}`,
                order_id: rpData.razorpayOrderId,
                prefill: {
                    contact: "",
                    ...(paymentMethod === "upi" && upiId ? { vpa: upiId } : {}),
                },
                method: paymentMethod === "upi" ? { upi: true } : undefined,
                theme: { color: "#0D4017" },
                handler: async (response) => {
                    // 4. Verify payment
                    try {
                        await api.post("/payments/razorpay/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId,
                        });
                        await clearCart();
                        navigate("/orders", { state: { orderId, success: true } });
                    } catch {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                modal: {
                    ondismiss: () => setPlacing(false),
                },
            };

            // Load Razorpay script if not loaded
            if (!window.Razorpay) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            const rzp = new window.Razorpay(options);
            rzp.open();
            rzp.on("payment.failed", (response) => {
                alert(`Payment failed: ${response.error.description}`);
                setPlacing(false);
            });

        } catch (err) {
            console.error("Order error:", err.response?.data || err.message);
            const msg = err.response?.data?.message
                || err.response?.data?.errors?.[0]?.msg
                || "Failed to place order. Please try again.";
            alert(msg);
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
                    {/* Header */}
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
                        {/* Main panel */}
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
                                        setPaymentMethod(method); setUpiId(uid || ""); setStep(2);
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
                                    onBack={(s) => setStep(s)}
                                    onPlaceOrder={handlePlaceOrder}
                                />
                            )}
                        </div>

                        {/* Summary */}
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