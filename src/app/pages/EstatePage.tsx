import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Building2, Bell, Wrench, CreditCard, MessageSquare, PlusSquare,
  Megaphone, Home, AlertCircle, ChevronRight, X, Send, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockEstates, mockHouses } from '../data/mockData';

const mockAnnouncements = [
  { id: '1', title: 'Water supply maintenance', body: 'Water will be off on Saturday 7th June from 8am–2pm for routine maintenance.', date: '2026-06-01', type: 'notice' },
  { id: '2', title: 'Community Clean-up Day', body: 'Join us this Sunday for the quarterly estate clean-up. Refreshments will be provided!', date: '2026-05-29', type: 'event' },
  { id: '3', title: 'June Rent Reminder', body: 'Please ensure rent is paid by 5th June to avoid late fees. M-Pesa Paybill: 123456.', date: '2026-05-28', type: 'payment' },
];

const mockMaintenance = [
  { id: 'm1', issue: 'Broken gate motor — Block A entrance', status: 'In Progress', date: '2026-05-30' },
  { id: 'm2', issue: 'Burst pipe — Level 2 corridor', status: 'Resolved', date: '2026-05-22' },
  { id: 'm3', issue: 'Gym equipment inspection', status: 'Scheduled', date: '2026-06-05' },
];

const mockBills = [
  { month: 'June 2026', rent: 55000, electricity: 3200, water: 1800, total: 60000, paid: false },
  { month: 'May 2026', rent: 55000, electricity: 2900, water: 1650, total: 59550, paid: true },
];

type Tab = 'overview' | 'announcements' | 'maintenance' | 'payments' | 'inquiries' | 'manage';

export default function EstatePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [showPostHouse, setShowPostHouse] = useState(false);
  const [showPostAnnouncement, setShowPostAnnouncement] = useState(false);
  const [newHouseForm, setNewHouseForm] = useState({ number: '', bedrooms: '', rent: '', amenities: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', body: '' });
  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  // Not signed in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d17' }}>
        <Building2 size={56} style={{ color: '#1e3a5f', marginBottom: 20 }} />
        <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 28 }}>Sign In Required</h2>
        <p className="mb-8 max-w-sm leading-relaxed" style={{ color: '#64748b', lineHeight: 1.8 }}>
          You need to be signed in to access the Estate Portal.
        </p>
        <Link to="/signin" className="px-8 py-3.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
          Sign In / Register
        </Link>
      </div>
    );
  }

  // Signed in but no rented house
  if (!user?.rentedEstateId && !user?.listedEstateId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d17' }}>
        <div className="rounded-3xl p-12 max-w-md w-full" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <AlertCircle size={28} style={{ color: '#f59e0b' }} />
          </div>
          <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 24 }}>No Estate Access</h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.8 }}>
            You need to rent a house in a listed estate before you can access the Estate Portal. Once you're a tenant, you'll have full access to announcements, payments, maintenance, and more.
          </p>
          <Link
            to="/explore"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
          >
            <Home size={16} /> Find a House to Rent
          </Link>
          <p className="text-xs mt-4" style={{ color: '#475569' }}>
            Already an estate manager?{' '}
            <Link to="/list-estate" className="hover:text-blue-400 transition-colors" style={{ color: '#3b82f6' }}>
              List your estate
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const estate = mockEstates.find(e => e.id === (user.isAdmin ? user.listedEstateId : user.rentedEstateId));
  const rentedHouse = mockHouses.find(h => h.id === user.rentedHouseId);
  const isAdmin = user.isAdmin;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    ...(isAdmin ? [{ id: 'manage' as Tab, label: 'Manage', icon: Building2 }] : []),
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim()) {
      setInquirySubmitted(true);
      setInquiryText('');
    }
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.body) {
      setAnnouncements(prev => [
        { id: Date.now().toString(), ...newAnnouncement, date: new Date().toISOString().split('T')[0], type: 'notice' },
        ...prev,
      ]);
      setNewAnnouncement({ title: '', body: '' });
      setShowPostAnnouncement(false);
    }
  };

  return (
    <div style={{ background: '#060d17', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-10 px-6" style={{ background: 'linear-gradient(135deg, #040b14, #060d17, #0a1830)', borderBottom: '1px solid #1e3a5f' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm mb-2" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estate Portal</p>
          <h1 className="text-white mb-1" style={{ fontWeight: 800, fontSize: 32 }}>{estate?.name}</h1>
          <p style={{ color: '#64748b' }}>{estate?.location} · {estate?.county}</p>
          {rentedHouse && (
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm" style={{ color: '#10b981', fontWeight: 500 }}>Your Unit: {rentedHouse.houseNumber}</span>
            </div>
          )}
          {isAdmin && (
            <div className="inline-flex items-center gap-2 ml-2 mt-3 px-3 py-1.5 rounded-full" style={{ background: 'rgba(29,111,206,0.1)', border: '1px solid rgba(29,111,206,0.3)' }}>
              <span className="text-sm" style={{ color: '#3b82f6', fontWeight: 500 }}>⭐ Admin</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activeTab === id ? 'linear-gradient(135deg, #1d6fce, #0ea5e9)' : '#0d1a2e',
                color: activeTab === id ? '#fff' : '#64748b',
                border: `1px solid ${activeTab === id ? 'transparent' : '#1e3a5f'}`,
                fontWeight: activeTab === id ? 600 : 400,
              }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: 'Latest Announcement', value: announcements[0]?.title || '—', icon: Bell, color: '#3b82f6', onClick: () => setActiveTab('announcements') },
              { label: 'Open Maintenance', value: `${mockMaintenance.filter(m => m.status !== 'Resolved').length} issues`, icon: Wrench, color: '#f59e0b', onClick: () => setActiveTab('maintenance') },
              { label: 'Next Payment Due', value: 'June 5, 2026', icon: CreditCard, color: '#10b981', onClick: () => setActiveTab('payments') },
            ].map(({ label, value, icon: Icon, color, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5 group"
                style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <ChevronRight size={16} style={{ color: '#475569' }} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs mb-1" style={{ color: '#475569' }}>{label}</p>
                <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>{value}</p>
              </button>
            ))}

            {estate && (
              <div className="md:col-span-2 lg:col-span-3 rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <h3 className="text-white mb-5" style={{ fontWeight: 700 }}>Estate Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Management', value: estate.management },
                    { label: 'Contact', value: estate.phone },
                    { label: 'Email', value: estate.email },
                    { label: 'Total Area', value: estate.area },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs mb-1" style={{ color: '#475569' }}>{label}</p>
                      <p className="text-sm" style={{ color: '#94a3b8', fontWeight: 500 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div>
            <div className="space-y-4">
              {announcements.map(a => (
                <div key={a.id} className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: a.type === 'payment' ? 'rgba(16,185,129,0.1)' : a.type === 'event' ? 'rgba(14,165,233,0.1)' : 'rgba(245,158,11,0.1)' }}>
                        {a.type === 'payment' ? <CreditCard size={16} style={{ color: '#10b981' }} /> : a.type === 'event' ? <Megaphone size={16} style={{ color: '#0ea5e9' }} /> : <Bell size={16} style={{ color: '#f59e0b' }} />}
                      </div>
                      <h3 className="text-white" style={{ fontWeight: 700 }}>{a.title}</h3>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: '#475569' }}>{a.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.8 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Maintenance */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            {mockMaintenance.map(m => (
              <div key={m.id} className="rounded-2xl p-6 flex items-center justify-between gap-4" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.1)' }}>
                    <Wrench size={18} style={{ color: '#f59e0b' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>{m.issue}</p>
                    <p className="text-xs mt-1" style={{ color: '#475569' }}>Reported: {m.date}</p>
                  </div>
                </div>
                <span
                  className="px-3 py-1.5 rounded-full text-xs flex-shrink-0"
                  style={{
                    background: m.status === 'Resolved' ? 'rgba(16,185,129,0.12)' : m.status === 'In Progress' ? 'rgba(245,158,11,0.12)' : 'rgba(29,111,206,0.12)',
                    color: m.status === 'Resolved' ? '#10b981' : m.status === 'In Progress' ? '#f59e0b' : '#3b82f6',
                    border: `1px solid ${m.status === 'Resolved' ? 'rgba(16,185,129,0.3)' : m.status === 'In Progress' ? 'rgba(245,158,11,0.3)' : 'rgba(29,111,206,0.3)'}`,
                    fontWeight: 600,
                  }}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            {mockBills.map(bill => (
              <div key={bill.month} className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white" style={{ fontWeight: 700 }}>{bill.month}</h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ background: bill.paid ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: bill.paid ? '#10b981' : '#f87171', border: `1px solid ${bill.paid ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, fontWeight: 600 }}>
                    {bill.paid ? 'Paid' : 'Due'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: 'Rent', value: bill.rent },
                    { label: 'Electricity', value: bill.electricity },
                    { label: 'Water', value: bill.water },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 rounded-xl" style={{ background: '#060d17' }}>
                      <p className="text-xs mb-1" style={{ color: '#475569' }}>{label}</p>
                      <p className="text-sm" style={{ color: '#94a3b8', fontWeight: 600 }}>KES {value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #1e3a5f' }}>
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Total Due</p>
                    <p style={{ color: '#e2e8f0', fontWeight: 800, fontSize: 20 }}>KES {bill.total.toLocaleString()}</p>
                  </div>
                  {!bill.paid && (
                    <button className="px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="max-w-2xl">
            {inquirySubmitted && (
              <div className="rounded-2xl p-5 mb-6 flex items-center gap-3" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <p className="text-sm" style={{ color: '#10b981' }}>Your inquiry has been sent to estate management.</p>
              </div>
            )}
            <div className="rounded-2xl p-7" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: 20 }}>Send an Inquiry or Complaint</h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>
                Have a question or issue? Send it directly to {estate?.management}.
              </p>
              <form onSubmit={handleInquirySubmit}>
                <textarea
                  value={inquiryText}
                  onChange={e => setInquiryText(e.target.value)}
                  placeholder="Describe your inquiry or complaint in detail…"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all mb-4"
                  style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                  onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
                />
                <button
                  type="submit"
                  disabled={!inquiryText.trim()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                >
                  <Send size={15} /> Send Inquiry
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Manage (admin only) */}
        {activeTab === 'manage' && isAdmin && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                onClick={() => setShowPostHouse(true)}
                className="rounded-2xl p-7 flex items-center gap-5 text-left transition-all hover:-translate-y-1 group"
                style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(29,111,206,0.12)' }}>
                  <PlusSquare size={22} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <p className="text-white mb-1" style={{ fontWeight: 700 }}>Post Vacant House</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>Add a vacant unit with amenities and rent details</p>
                </div>
              </button>
              <button
                onClick={() => setShowPostAnnouncement(true)}
                className="rounded-2xl p-7 flex items-center gap-5 text-left transition-all hover:-translate-y-1 group"
                style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(14,165,233,0.1)' }}>
                  <Megaphone size={22} style={{ color: '#0ea5e9' }} />
                </div>
                <div>
                  <p className="text-white mb-1" style={{ fontWeight: 700 }}>Post Announcement</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>Send notices, events or payment reminders to tenants</p>
                </div>
              </button>
            </div>

            {/* Post House modal */}
            {showPostHouse && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                <div className="w-full max-w-md rounded-2xl p-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white" style={{ fontWeight: 700, fontSize: 20 }}>Post Vacant Unit</h3>
                    <button onClick={() => setShowPostHouse(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Unit Number', key: 'number', placeholder: 'e.g. A-205' },
                      { label: 'Bedrooms', key: 'bedrooms', placeholder: 'e.g. 2' },
                      { label: 'Monthly Rent (KES)', key: 'rent', placeholder: 'e.g. 55000' },
                      { label: 'Amenities (comma-separated)', key: 'amenities', placeholder: 'Balcony, BIC, Internet…' },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1.5" style={{ color: '#94a3b8', fontWeight: 500 }}>{label}</label>
                        <input
                          type="text"
                          value={newHouseForm[key as keyof typeof newHouseForm]}
                          onChange={e => setNewHouseForm(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowPostHouse(false)}
                    className="mt-6 w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                  >
                    Submit Listing
                  </button>
                </div>
              </div>
            )}

            {/* Post Announcement modal */}
            {showPostAnnouncement && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                <div className="w-full max-w-md rounded-2xl p-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white" style={{ fontWeight: 700, fontSize: 20 }}>Post Announcement</h3>
                    <button onClick={() => setShowPostAnnouncement(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                  </div>
                  <form onSubmit={handlePostAnnouncement} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: '#94a3b8', fontWeight: 500 }}>Title</label>
                      <input
                        type="text"
                        value={newAnnouncement.title}
                        onChange={e => setNewAnnouncement(a => ({ ...a, title: e.target.value }))}
                        placeholder="Announcement title"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: '#94a3b8', fontWeight: 500 }}>Message</label>
                      <textarea
                        value={newAnnouncement.body}
                        onChange={e => setNewAnnouncement(a => ({ ...a, body: e.target.value }))}
                        placeholder="Write your announcement…"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                      />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
                      Post Announcement
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
