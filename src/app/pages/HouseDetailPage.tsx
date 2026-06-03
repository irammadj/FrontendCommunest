import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Bed, Bath, Square, Shield, CheckCircle2, Send, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { mockEstates, mockHouses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function HouseDetailPage() {
  const { estateId, houseId } = useParams<{ estateId: string; houseId: string }>();
  const navigate = useNavigate();
  const { user, applyForRent } = useAuth();

  const estate = mockEstates.find(e => e.id === estateId);
  const house = mockHouses.find(h => h.id === houseId);

  const [activePhoto, setActivePhoto] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!house || !estate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d17' }}>
        <Home size={48} style={{ color: '#1e3a5f', marginBottom: 16 }} />
        <h2 className="text-white mb-3" style={{ fontWeight: 700 }}>House not found</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
          Go Back
        </button>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    applyForRent(house.id, estate.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#060d17' }}>
        <div className="max-w-md w-full text-center rounded-3xl p-12" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}>
            <CheckCircle2 size={36} style={{ color: '#10b981' }} />
          </div>
          <h2 className="text-white mb-3" style={{ fontWeight: 800, fontSize: 28 }}>Application Submitted!</h2>
          <p className="mb-4 leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.8 }}>
            Your application for <strong className="text-white">Unit {house.houseNumber}</strong> at <strong className="text-white">{estate.name}</strong> has been sent to the estate management.
          </p>
          <p className="text-sm mb-8" style={{ color: '#64748b' }}>
            The management team at {estate.management} will review your application and contact you at <span style={{ color: '#3b82f6' }}>{form.email}</span> or <span style={{ color: '#3b82f6' }}>{form.phone}</span>.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/estate')}
              className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
            >
              Go to My Estate
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="w-full py-3 rounded-xl transition-colors hover:bg-white/5"
              style={{ border: '1px solid #1e3a5f', color: '#94a3b8', fontWeight: 500 }}
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#060d17', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(`/explore/${estateId}`)}
          className="flex items-center gap-2 text-sm mb-8 hover:text-blue-400 transition-colors"
          style={{ color: '#94a3b8' }}
        >
          <ArrowLeft size={16} /> Back to {estate.name}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photos */}
          <div>
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 mb-3" style={{ background: '#0d1a2e' }}>
              <img
                src={house.photos[activePhoto]}
                alt={`Unit ${house.houseNumber} photo ${activePhoto + 1}`}
                className="w-full h-full object-cover"
              />
              {house.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setActivePhoto(p => Math.max(0, p - 1))}
                    disabled={activePhoto === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                    style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActivePhoto(p => Math.min(house.photos.length - 1, p + 1))}
                    disabled={activePhoto === house.photos.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                    style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {house.photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className="rounded-full transition-all"
                        style={{ width: i === activePhoto ? 20 : 6, height: 6, background: i === activePhoto ? '#3b82f6' : 'rgba(255,255,255,0.4)' }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {house.photos.length > 1 && (
              <div className="flex gap-2">
                {house.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all"
                    style={{ outline: i === activePhoto ? '2px solid #1d6fce' : 'none', outlineOffset: 2 }}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* House details */}
            <div className="rounded-2xl p-6 mt-5" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-lg inline-block mb-2" style={{ background: 'rgba(29,111,206,0.12)', color: '#3b82f6' }}>
                    {house.type}
                  </span>
                  <h2 className="text-white" style={{ fontWeight: 800, fontSize: 24 }}>Unit {house.houseNumber}</h2>
                  <p className="text-sm mt-1" style={{ color: '#64748b' }}>{estate.name} · Floor {house.floor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-1" style={{ color: '#64748b' }}>Monthly Rent</p>
                  <p style={{ color: '#10b981', fontWeight: 800, fontSize: 26 }}>KES {house.rent.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-5 py-4" style={{ borderTop: '1px solid #1e3a5f', borderBottom: '1px solid #1e3a5f' }}>
                <div className="flex items-center gap-2" style={{ color: '#94a3b8' }}>
                  <Bed size={16} style={{ color: '#3b82f6' }} />
                  <span className="text-sm">{house.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#94a3b8' }}>
                  <Bath size={16} style={{ color: '#3b82f6' }} />
                  <span className="text-sm">{house.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#94a3b8' }}>
                  <Square size={16} style={{ color: '#3b82f6' }} />
                  <span className="text-sm">{house.area}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-4" style={{ color: '#94a3b8', lineHeight: 1.85 }}>{house.description}</p>

              <div className="mt-5">
                <p className="text-sm mb-3" style={{ color: '#e2e8f0', fontWeight: 600 }}>Unit Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {house.amenities.map(a => (
                    <div key={a} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs" style={{ background: 'rgba(29,111,206,0.08)', border: '1px solid rgba(29,111,206,0.2)', color: '#3b82f6' }}>
                      <Shield size={11} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rent application form */}
          <div>
            <div className="rounded-2xl p-7" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f', position: 'sticky', top: 24 }}>
              <h3 className="text-white mb-2" style={{ fontWeight: 800, fontSize: 22 }}>Apply for Rent</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748b' }}>
                Fill in your details below. Your application will be sent directly to <strong style={{ color: '#94a3b8' }}>{estate.management}</strong>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: '#060d17', border: `1px solid ${errors.name ? '#ef4444' : '#1e3a5f'}`, color: '#e2e8f0' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                    onBlur={e => e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#1e3a5f'}
                  />
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: '#060d17', border: `1px solid ${errors.email ? '#ef4444' : '#1e3a5f'}`, color: '#e2e8f0' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                    onBlur={e => e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#1e3a5f'}
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: '#060d17', border: `1px solid ${errors.phone ? '#ef4444' : '#1e3a5f'}`, color: '#e2e8f0' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                    onBlur={e => e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#1e3a5f'}
                  />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Additional Message (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Introduce yourself or ask a question…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                    onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
                  />
                </div>

                <div className="rounded-xl p-4" style={{ background: 'rgba(29,111,206,0.06)', border: '1px solid rgba(29,111,206,0.2)' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                    By submitting, you agree that your information will be shared with <span style={{ color: '#3b82f6' }}>{estate.management}</span> for rental consideration. Communest does not process rental payments.
                  </p>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 700, fontSize: 15 }}
                >
                  <Send size={16} />
                  Submit for Approval
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
