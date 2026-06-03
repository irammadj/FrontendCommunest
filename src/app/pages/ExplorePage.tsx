import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Search, ChevronRight, Home, Filter } from 'lucide-react';
import { mockEstates, KENYA_COUNTIES } from '../data/mockData';

export default function ExplorePage() {
  const [selectedCounty, setSelectedCounty] = useState('All Counties');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filtered = mockEstates.filter(e => {
    const matchesCounty = selectedCounty === 'All Counties' || e.county === selectedCounty;
    const matchesSearch =
      !searchQuery ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCounty && matchesSearch;
  });

  return (
    <div style={{ background: '#060d17', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-14 px-6 text-center" style={{ background: 'linear-gradient(135deg, #040b14, #060d17, #0a1830)' }}>
        <p className="text-sm mb-3" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Browse Listings</p>
        <h1 className="text-white mb-4" style={{ fontWeight: 800, fontSize: 40, letterSpacing: '-1px' }}>Explore Estates</h1>
        <p className="mb-8" style={{ color: '#64748b', maxWidth: 480, margin: '0 auto 32px' }}>
          Discover verified residential estates across Kenya. Filter by county to find your perfect neighbourhood.
        </p>
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by estate or location…"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none"
            style={{ background: '#0d1a2e', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">
          {/* Sidebar Filter — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-6 rounded-2xl p-5" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <div className="flex items-center gap-2 mb-5">
                <Filter size={15} style={{ color: '#3b82f6' }} />
                <span className="text-sm" style={{ color: '#e2e8f0', fontWeight: 700 }}>Filter by County</span>
              </div>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {KENYA_COUNTIES.map(county => (
                  <label
                    key={county}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: selectedCounty === county ? 'rgba(29,111,206,0.12)' : 'transparent',
                      color: selectedCounty === county ? '#3b82f6' : '#94a3b8',
                    }}
                  >
                    <input
                      type="radio"
                      name="county"
                      value={county}
                      checked={selectedCounty === county}
                      onChange={() => setSelectedCounty(county)}
                      className="hidden"
                    />
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        border: `2px solid ${selectedCounty === county ? '#1d6fce' : '#1e3a5f'}`,
                        background: selectedCounty === county ? '#1d6fce' : 'transparent',
                      }}
                    >
                      {selectedCounty === county && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="text-sm">{county}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-5">
              <button
                onClick={() => setShowFilter(s => !s)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors"
                style={{ background: '#0d1a2e', border: '1px solid #1e3a5f', color: '#94a3b8' }}
              >
                <Filter size={15} />
                {selectedCounty === 'All Counties' ? 'Filter by County' : selectedCounty}
              </button>
              {showFilter && (
                <div className="mt-3 rounded-2xl p-4" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                  <div className="grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
                    {KENYA_COUNTIES.map(county => (
                      <label
                        key={county}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                        style={{ color: selectedCounty === county ? '#3b82f6' : '#94a3b8' }}
                      >
                        <input
                          type="radio"
                          name="county-mobile"
                          value={county}
                          checked={selectedCounty === county}
                          onChange={() => { setSelectedCounty(county); setShowFilter(false); }}
                          className="hidden"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                          style={{ border: `2px solid ${selectedCounty === county ? '#1d6fce' : '#1e3a5f'}`, background: selectedCounty === county ? '#1d6fce' : 'transparent' }}
                        />
                        <span className="text-xs">{county}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: '#64748b' }}>
                Showing <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{filtered.length}</span> estate{filtered.length !== 1 ? 's' : ''}
                {selectedCounty !== 'All Counties' && <> in <span style={{ color: '#3b82f6' }}>{selectedCounty}</span></>}
              </p>
            </div>

            {/* Estate cards */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <Home size={40} style={{ color: '#1e3a5f', margin: '0 auto 16px' }} />
                <p className="text-white mb-2" style={{ fontWeight: 600 }}>No estates found</p>
                <p className="text-sm" style={{ color: '#64748b' }}>Try selecting a different county or clearing your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(estate => (
                  <div
                    key={estate.id}
                    className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 group"
                    style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={estate.photo}
                        alt={estate.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,13,23,0.7), transparent)' }} />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#10b981' }}>
                        ✓ Verified
                      </div>
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs text-white" style={{ background: 'rgba(6,13,23,0.7)', backdropFilter: 'blur(4px)' }}>
                        {estate.county}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: 16 }}>{estate.name}</h3>
                      <div className="flex items-center gap-1 mb-4">
                        <MapPin size={12} style={{ color: '#3b82f6' }} />
                        <span className="text-xs" style={{ color: '#64748b' }}>{estate.location}</span>
                      </div>

                      {/* Key details */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { label: 'Area', value: estate.area },
                          { label: 'Deed No.', value: estate.titleDeedNumber.split('/').slice(-1)[0] },
                          { label: 'Management', value: estate.management.split(' ').slice(0, 2).join(' ') },
                          { label: 'Phone', value: estate.phone },
                        ].map(({ label, value }) => (
                          <div key={label} className="px-3 py-2 rounded-lg" style={{ background: '#060d17' }}>
                            <p className="text-xs mb-0.5" style={{ color: '#475569' }}>{label}</p>
                            <p className="text-xs truncate" style={{ color: '#94a3b8', fontWeight: 500 }}>{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {estate.amenities.slice(0, 3).map(a => (
                          <span key={a} className="px-2 py-1 rounded-lg text-xs" style={{ background: 'rgba(29,111,206,0.1)', color: '#3b82f6', border: '1px solid rgba(29,111,206,0.2)' }}>
                            {a}
                          </span>
                        ))}
                        {estate.amenities.length > 3 && (
                          <span className="px-2 py-1 rounded-lg text-xs" style={{ background: '#1a2a3a', color: '#64748b' }}>
                            +{estate.amenities.length - 3}
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/explore/${estate.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                      >
                        View Estate <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
