import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  Save, Check, ArrowLeft, Camera, Shield,
  Bell, Trash2, LogOut
} from 'lucide-react';
import api from '../api/axios';

const G = "'Cormorant Garamond', serif";
const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#0D4017] focus:ring-2 focus:ring-[#0D4017]/10 focus:bg-white transition-all";

const TABS = [
  { id: 'profile', label: 'Personal Info', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifs', label: 'Notifications', icon: Bell },
];

/* ── SaveBar ── */
const SaveBar = ({ onSave, loading, saved }) => (
  <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
    <button
      onClick={onSave}
      disabled={loading}
      className="flex items-center gap-2 bg-[#0D4017] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#0a3313] transition-all active:scale-[0.98] disabled:opacity-60"
    >
      {loading ? (
        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
      ) : saved ? (
        <><Check size={15} /> Saved!</>
      ) : (
        <><Save size={15} /> Save Changes</>
      )}
    </button>
  </div>
);

/* ── Profile Tab ── */
const ProfileTab = ({ user, onUpdate }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setError(''); setLoading(true);
    try {
      const { data } = await api.put('/auth/me', form);
      onUpdate(data.user || form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Personal Information</p>
        <h3 className="text-xl font-light text-gray-900" style={{ fontFamily: G }}>Edit Your Details</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Full Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls + ' pl-10'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Email Address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls + ' pl-10'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Phone Number</label>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inputCls + ' pl-10'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Delivery Address</label>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Your default address" className={inputCls} />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
      <SaveBar onSave={handleSave} loading={loading} saved={saved} />
    </div>
  );
};

/* ── Security Tab ── */
const SecurityTab = () => {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setError('');
    if (!form.current || !form.newPass || !form.confirm) { setError('All fields are required.'); return; }
    if (form.newPass !== form.confirm) { setError('New passwords do not match.'); return; }
    if (form.newPass.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await api.put('/auth/change-password', { currentPassword: form.current, newPassword: form.newPass });
      setForm({ current: '', newPass: '', confirm: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally { setLoading(false); }
  };

  const pwField = (name, placeholder) => (
    <div className="relative">
      <Lock size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
      <input
        name={name} type={show ? 'text' : 'password'} value={form[name]}
        onChange={handleChange} placeholder={placeholder}
        className={inputCls + ' pl-10 pr-11'}
      />
      <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600">
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Account Security</p>
        <h3 className="text-xl font-light text-gray-900" style={{ fontFamily: G }}>Change Password</h3>
      </div>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Current Password</label>
          {pwField('current', 'Enter current password')}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">New Password</label>
          {pwField('newPass', 'Enter new password')}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wider uppercase">Confirm New Password</label>
          {pwField('confirm', 'Repeat new password')}
        </div>
      </div>
      <div className="bg-[#FAFAF7] border border-gray-100 rounded-xl p-4 max-w-md">
        <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
          <Shield size={13} className="text-[#0D4017]" /> Requirements
        </p>
        {['At least 8 characters', 'Mix of letters and numbers', 'At least one special character'].map(r => (
          <p key={r} className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
            <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" /> {r}
          </p>
        ))}
      </div>
      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl max-w-md">{error}</p>}
      <SaveBar onSave={handleSave} loading={loading} saved={saved} />
    </div>
  );
};

/* ── Notifications Tab ── */
const NotifsTab = () => {
  const [prefs, setPrefs] = useState({ orders: true, offers: true, newArrivals: false, newsletter: false });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const Toggle = ({ k, label, desc }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setPrefs(p => ({ ...p, [k]: !p[k] }))}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${prefs[k] ? 'bg-[#0D4017]' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${prefs[k] ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/auth/notification-prefs', prefs);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#0D4017]/50 uppercase mb-1">Preferences</p>
        <h3 className="text-xl font-light text-gray-900" style={{ fontFamily: G }}>Notification Settings</h3>
      </div>
      <div className="bg-[#FAFAF7] border border-gray-100 rounded-xl px-5 max-w-lg">
        <Toggle k="orders" label="Order Updates" desc="Shipping, delivery and order status changes" />
        <Toggle k="offers" label="Exclusive Offers" desc="Special discounts and personalised deals" />
        <Toggle k="newArrivals" label="New Arrivals" desc="Be first to know about new collections" />
        <Toggle k="newsletter" label="Newsletter" desc="Monthly stories, tips and inspiration" />
      </div>
      <SaveBar onSave={handleSave} loading={loading} saved={saved} />
    </div>
  );
};

/* ── Main Profile Page ── */
const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/register/login'); return; }
    api.get('/auth/me')
      .then(({ data }) => setUser(data.user || data))
      .catch(() => navigate('/register/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const ActivePanel = { profile: ProfileTab, security: SecurityTab, notifs: NotifsTab }[activeTab];

  return (
    <Layout>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
          .fu { animation: fadeUp 0.6s ease both; }
        `}</style>

        <div style={{ fontFamily: G }}>
          {/* Hero */}
          <div className="bg-[#0D4017] py-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4a9a5a 0%, transparent 55%)' }} />
            <div className="max-w-4xl mx-auto">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back
              </button>

              {loading ? (
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse" />
                  <div className="space-y-2"><div className="w-32 h-5 bg-white/10 rounded animate-pulse" /><div className="w-24 h-3 bg-white/10 rounded animate-pulse" /></div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 fu">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-3xl font-light" style={{ fontFamily: G }}>
                      {(user?.name || 'U')[0].toUpperCase()}
                    </div>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <Camera size={12} className="text-[#0D4017]" />
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                  </div>
                  <div>
                    <h1 className="text-white text-3xl font-light">{user?.name || 'My Account'}</h1>
                    <p className="text-white/50 text-sm mt-1">{user?.email}</p>
                  </div>
                  <div className="sm:ml-auto flex gap-3">
                    <button onClick={() => navigate('/orders')} className="border border-white/25 text-white text-xs px-5 py-2.5 rounded-full hover:bg-white/10 transition-all">
                      My Orders
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs px-4 py-2.5 rounded-full hover:bg-white/10 transition-all">
                      <LogOut size={13} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="bg-[#FAFAF7] min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-10">
              <div className="flex flex-col md:flex-row gap-7">
                {/* Sidebar tabs */}
                <nav className="flex md:flex-col gap-1 md:w-48 shrink-0 overflow-x-auto md:overflow-visible">
                  {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm whitespace-nowrap transition-colors ${activeTab === id ? 'bg-[#0D4017] text-white shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'
                        }`}
                    >
                      <Icon size={15} className={activeTab === id ? 'text-white' : 'text-gray-400'} />
                      {label}
                    </button>
                  ))}
                  {/* Danger zone */}
                  <div className="hidden md:block mt-auto pt-6 border-t border-gray-200 mt-6">
                    <button className="flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl w-full transition-colors">
                      <Trash2 size={14} /> Delete Account
                    </button>
                  </div>
                </nav>

                {/* Panel */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-7 md:p-8">
                  {!loading && <ActivePanel user={user} onUpdate={setUser} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Profile;