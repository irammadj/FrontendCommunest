import { useParams, Link, useNavigate } from 'react-router';
import { MapPin, Phone, Mail, Shield, Home, ChevronRight, ArrowLeft, Bed, Bath, Square, ChevronLeft } from 'lucide-react';
import { mockEstates, mockHouses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function EstateDetailPage() {
  const { estateId } = useParams<{ estateId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [photoIdx, setPhotoIdx] = useState<Record<string, number>>({});

  const estate = mockEstates.find(e => e.id === estateId);
  const houses = mockHouses.filter(h => h.estateId === estateId);
  const vacantHouses = houses.filter(h => h.isVacant);
  const occupiedHouses = houses.filter(h => !h.isVacant);

  if (!estate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d17' }}>
        <Home size={48} style={{ color: '#1e3a5f', marginBottom: 16 }} />
        <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 24 }}>Estate not found</h2>
        <p className="mb-6" style={{ color: '#64748b' }}>The estate you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="px-6 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
          Back to Explore
        </Link>
      </div>
    );
  }

  const handleApply = (houseId: string) => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      navigate(`/explore/${estateId}/house/${houseId}`);
    }
  };

  return (
    <div style={{ background: '#060d17', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={estate.photo} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,13,23,0.3) 0%, rgba(6,13,23,0.85) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
          <button onClick={() => navigate('/explore')} className="flex items-center gap-2 text-sm mb-4 hover:text-blue-400 transition-colors" style={{ color: '#94a3b8' }}>
            <ArrowLeft size={16} /> Back to Explore
          </button>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981' }}>
                  ✓ Approved & Verified
                </span>
              </div>
              <h1 className="text-white mb-1" style={{ fontWeight: 800, fontSize: 32, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{estate.name}</h1>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: '#3b82f6' }} />
                <span style={{ color: '#94a3b8' }}>{estate.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 20 }}>About This Estate</h2>
              <p className="leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.85 }}>{estate.description}</p>
            </div>

            {/* Estate details */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h2 className="text-white mb-5" style={{ fontWeight: 700, fontSize: 20 }}>Estate Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Estate Name', value: estate.name },
                  { label: 'Location', value: estate.location },
                  { label: 'County', value: estate.county },
                  { label: 'Total Area', value: estate.area },
                  { label: 'Title Deed No.', value: estate.titleDeedNumber },
                  { label: 'Management', value: estate.management },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ background: '#060d17' }}>
                    <p className="text-xs mb-1" style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 500 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h2 className="text-white mb-5" style={{ fontWeight: 700, fontSize: 20 }}>Estate Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {estate.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(29,111,206,0.1)', border: '1px solid rgba(29,111,206,0.25)', color: '#3b82f6' }}>
                    <Shield size={13} />
                    <span className="text-sm" style={{ fontWeight: 500 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vacant Houses */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white" style={{ fontWeight: 700, fontSize: 22 }}>
                  Vacant Units
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600 }}>
                    {vacantHouses.length}
                  </span>
                </h2>
                {occupiedHouses.length > 0 && (
                  <span className="text-xs" style={{ color: '#64748b' }}>
                    {occupiedHouses.length} occupied
                  </span>
                )}
              </div>

              {vacantHouses.length === 0 ? (
                <div className="rounded-2xl p-10 text-center" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                  <Home size={36} style={{ color: '#1e3a5f', margin: '0 auto 12px' }} />
                  <p className="text-white mb-2" style={{ fontWeight: 600 }}>No vacancies at the moment</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>All units are currently occupied. Check back later.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {vacantHouses.map(house => {
                    const currentPhotoIdx = photoIdx[house.id] || 0;
                    return (
                      <div key={house.id} className="rounded-2xl overflow-hidden" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                        <div className="flex flex-col sm:flex-row">
                          {/* Photo */}
                          <div className="relative w-full sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                            <img
                              src={house.photos[currentPhotoIdx]}
                              alt={`House ${house.houseNumber}`}
                              className="w-full h-full object-cover"
                            />
                            {house.photos.length > 1 && (
                              <div className="absolute bottom-2 right-2 flex gap-1">
                                <button
                                  onClick={() => setPhotoIdx(p => ({ ...p, [house.id]: Math.max(0, (p[house.id] || 0) - 1) }))}
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ background: 'rgba(0,0,0,0.6)' }}
                                  disabled={currentPhotoIdx === 0}
                                >
                                  <ChevronLeft size={12} className="text-white" />
                                </button>
                                <button
                                  onClick={() => setPhotoIdx(p => ({ ...p, [house.id]: Math.min(house.photos.length - 1, (p[house.id] || 0) + 1) }))}
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ background: 'rgba(0,0,0,0.6)' }}
                                  disabled={currentPhotoIdx === house.photos.length - 1}
                                >
                                  <ChevronRight size={12} className="text-white" />
                                </button>
                              </div>
                            )}
                            <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs text-white" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981' }}>
                              Vacant
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-5 flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <span className="text-xs px-2 py-1 rounded-lg mb-2 inline-block" style={{ background: 'rgba(29,111,206,0.12)', color: '#3b82f6' }}>
                                  {house.type}
                                </span>
                                <h3 className="text-white" style={{ fontWeight: 700, fontSize: 18 }}>Unit {house.houseNumber}</h3>
                                <p className="text-xs" style={{ color: '#64748b' }}>Floor {house.floor}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs mb-1" style={{ color: '#64748b' }}>Monthly Rent</p>
                                <p style={{ color: '#10b981', fontWeight: 800, fontSize: 20 }}>
                                  KES {house.rent.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-4 mb-3">
                              <div className="flex items-center gap-1.5 text-sm" style={{ color: '#94a3b8' }}>
                                <Bed size={14} style={{ color: '#3b82f6' }} /> {house.bedrooms} Bed
                              </div>
                              <div className="flex items-center gap-1.5 text-sm" style={{ color: '#94a3b8' }}>
                                <Bath size={14} style={{ color: '#3b82f6' }} /> {house.bathrooms} Bath
                              </div>
                              <div className="flex items-center gap-1.5 text-sm" style={{ color: '#94a3b8' }}>
                                <Square size={14} style={{ color: '#3b82f6' }} /> {house.area}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {house.amenities.slice(0, 4).map(a => (
                                <span key={a} className="px-2 py-0.5 rounded text-xs" style={{ background: '#1a2a3a', color: '#94a3b8' }}>{a}</span>
                              ))}
                              {house.amenities.length > 4 && (
                                <span className="px-2 py-0.5 rounded text-xs" style={{ background: '#1a2a3a', color: '#64748b' }}>+{house.amenities.length - 4}</span>
                              )}
                            </div>

                            <button
                              onClick={() => handleApply(house.id)}
                              className="px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                              style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                            >
                              Apply for Rent
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact card */}
            <div className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h3 className="text-white mb-5" style={{ fontWeight: 700 }}>Contact Management</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(29,111,206,0.12)' }}>
                    <Phone size={16} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Phone</p>
                    <a href={`tel:${estate.phone}`} className="text-sm hover:text-blue-400 transition-colors" style={{ color: '#e2e8f0', fontWeight: 500 }}>
                      {estate.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(29,111,206,0.12)' }}>
                    <Mail size={16} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Email</p>
                    <a href={`mailto:${estate.email}`} className="text-sm hover:text-blue-400 transition-colors break-all" style={{ color: '#e2e8f0', fontWeight: 500 }}>
                      {estate.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick summary */}
            <div className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Quick Summary</h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Vacancies', value: `${vacantHouses.length} units` },
                  { label: 'Estate Area', value: estate.area },
                  { label: 'County', value: estate.county },
                  { label: 'Deed No.', value: estate.titleDeedNumber },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <span className="text-sm" style={{ color: '#64748b' }}>{label}</span>
                    <span className="text-sm" style={{ color: '#e2e8f0', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {!isAuthenticated && (
              <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(29,111,206,0.08)', border: '1px solid rgba(29,111,206,0.25)' }}>
                <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>Sign in to apply for a house in this estate</p>
                <Link
                  to="/signin"
                  className="block w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                >
                  Sign In / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
