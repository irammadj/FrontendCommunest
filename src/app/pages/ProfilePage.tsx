import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Mail, Lock, Eye, EyeOff, Upload, Building2, Trash2, X, CheckCircle2, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockHouses, mockEstates } from '../data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser, deleteAccount, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState<'none' | 'name' | 'email' | 'password'>('none');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState('');

  const rentedHouse = user?.rentedHouseId ? mockHouses.find(h => h.id === user.rentedHouseId) : null;
  const rentedEstate = user?.rentedEstateId ? mockEstates.find(e => e.id === user.rentedEstateId) : null;

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d17' }}>
        <User size={52} style={{ color: '#1e3a5f', marginBottom: 20 }} />
        <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 28 }}>No Account Found</h2>
        <p className="mb-8 max-w-sm leading-relaxed" style={{ color: '#64748b', lineHeight: 1.8 }}>
          You need to create an account or sign in to view your profile.
        </p>
        <Link to="/signin" className="px-8 py-3.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>
          Sign In / Register
        </Link>
      </div>
    );
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateUser({ profilePicture: url });
      setSaveMsg('Profile picture updated!');
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  const handleSaveName = () => {
    if (!editName.trim()) return setEditError('Name cannot be empty');
    updateUser({ name: editName });
    setEditMode('none');
    setEditError('');
    setSaveMsg('Name updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleSaveEmail = () => {
    if (!editEmail.includes('@')) return setEditError('Please enter a valid email');
    updateUser({ email: editEmail });
    setEditMode('none');
    setEditError('');
    setSaveMsg('Email updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleSavePassword = () => {
    if (editPassword.length < 6) return setEditError('Password must be at least 6 characters');
    setEditMode('none');
    setEditPassword('');
    setEditError('');
    setSaveMsg('Password updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    signOut();
    navigate('/');
  };

  return (
    <div style={{ background: '#060d17', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-12 px-6" style={{ background: 'linear-gradient(135deg, #040b14, #060d17, #0a1830)', borderBottom: '1px solid #1e3a5f' }}>
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-full overflow-hidden cursor-pointer group"
              style={{ border: '3px solid #1d6fce' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 800 }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                <Upload size={18} className="text-white" />
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>

          <div>
            <h1 className="text-white mb-1" style={{ fontWeight: 800, fontSize: 28 }}>{user.name}</h1>
            <p style={{ color: '#64748b' }}>{user.email}</p>
            {user.isAdmin && (
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(29,111,206,0.12)', color: '#3b82f6', border: '1px solid rgba(29,111,206,0.3)', fontWeight: 600 }}>
                ⭐ Estate Admin
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">
        {/* Save success message */}
        {saveMsg && (
          <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <CheckCircle2 size={16} style={{ color: '#10b981' }} />
            <p className="text-sm" style={{ color: '#10b981' }}>{saveMsg}</p>
          </div>
        )}

        {/* Estate info */}
        {rentedHouse && rentedEstate && (
          <div className="rounded-2xl p-6" style={{ background: 'rgba(29,111,206,0.06)', border: '1px solid rgba(29,111,206,0.25)' }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,111,206,0.15)' }}>
                  <Building2 size={18} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#3b82f6', fontWeight: 600 }}>Rented Home</p>
                  <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 700 }}>{rentedEstate.name} · Unit {rentedHouse.houseNumber}</p>
                  <p className="text-xs" style={{ color: '#64748b' }}>{rentedEstate.location}</p>
                </div>
              </div>
              <Link
                to="/estate"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
              >
                <Building2 size={15} /> View My Estate
              </Link>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
          <div className="px-7 py-5" style={{ borderBottom: '1px solid #1e3a5f' }}>
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: 18 }}>Personal Information</h2>
          </div>

          <div className="divide-y" style={{ borderColor: '#1e3a5f' }}>
            {/* Name */}
            <div className="px-7 py-5">
              {editMode === 'name' ? (
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full Name</label>
                  <div className="flex gap-3">
                    <input
                      value={editName}
                      onChange={e => { setEditName(e.target.value); setEditError(''); }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#060d17', border: '1px solid #1d6fce', color: '#e2e8f0' }}
                      autoFocus
                    />
                    <button onClick={handleSaveName} className="px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>Save</button>
                    <button onClick={() => { setEditMode('none'); setEditName(user.name); setEditError(''); }} className="px-3 py-2.5 rounded-xl" style={{ background: '#1e3a5f', color: '#94a3b8' }}><X size={16} /></button>
                  </div>
                  {editError && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{editError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User size={16} style={{ color: '#3b82f6' }} />
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: '#475569' }}>Full Name</p>
                      <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>{user.name}</p>
                    </div>
                  </div>
                  <button onClick={() => { setEditMode('name'); setEditName(user.name); }} className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors" style={{ color: '#3b82f6', fontWeight: 500 }}>
                    <Edit3 size={13} /> Edit
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="px-7 py-5">
              {editMode === 'email' ? (
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email Address</label>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={editEmail}
                      onChange={e => { setEditEmail(e.target.value); setEditError(''); }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#060d17', border: '1px solid #1d6fce', color: '#e2e8f0' }}
                      autoFocus
                    />
                    <button onClick={handleSaveEmail} className="px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>Save</button>
                    <button onClick={() => { setEditMode('none'); setEditEmail(user.email); setEditError(''); }} className="px-3 py-2.5 rounded-xl" style={{ background: '#1e3a5f', color: '#94a3b8' }}><X size={16} /></button>
                  </div>
                  {editError && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{editError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail size={16} style={{ color: '#3b82f6' }} />
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: '#475569' }}>Email Address</p>
                      <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>{user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { setEditMode('email'); setEditEmail(user.email); }} className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors" style={{ color: '#3b82f6', fontWeight: 500 }}>
                    <Edit3 size={13} /> Edit
                  </button>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="px-7 py-5">
              {editMode === 'password' ? (
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>New Password</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={editPassword}
                        onChange={e => { setEditPassword(e.target.value); setEditError(''); }}
                        placeholder="Min. 6 characters"
                        className="w-full px-4 pr-10 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: '#060d17', border: '1px solid #1d6fce', color: '#e2e8f0' }}
                        autoFocus
                      />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }}>
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <button onClick={handleSavePassword} className="px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}>Save</button>
                    <button onClick={() => { setEditMode('none'); setEditPassword(''); setEditError(''); }} className="px-3 py-2.5 rounded-xl" style={{ background: '#1e3a5f', color: '#94a3b8' }}><X size={16} /></button>
                  </div>
                  {editError && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{editError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock size={16} style={{ color: '#3b82f6' }} />
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: '#475569' }}>Password</p>
                      <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>••••••••</p>
                    </div>
                  </div>
                  <button onClick={() => setEditMode('password')} className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors" style={{ color: '#3b82f6', fontWeight: 500 }}>
                    <Edit3 size={13} /> Change
                  </button>
                </div>
              )}
            </div>

            {/* Profile picture */}
            <div className="px-7 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Upload size={16} style={{ color: '#3b82f6' }} />
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#475569' }}>Profile Picture</p>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>
                      {user.profilePicture ? 'Custom photo set' : 'Using initials avatar'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors"
                  style={{ color: '#3b82f6', fontWeight: 500 }}
                >
                  <Edit3 size={13} /> Change Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin: add admin accounts */}
        {user.isAdmin && (
          <div className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Admin Management</h3>
            <p className="text-sm mb-4" style={{ color: '#64748b' }}>
              As estate admin, you can add up to 3 additional admin accounts to help manage your estate.
            </p>
            <button className="px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90" style={{ background: 'rgba(29,111,206,0.12)', border: '1px solid rgba(29,111,206,0.3)', color: '#3b82f6', fontWeight: 600 }}>
              + Add Admin Account
            </button>
          </div>
        )}

        {/* Danger zone */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <h3 className="mb-2" style={{ color: '#f87171', fontWeight: 700 }}>Danger Zone</h3>
          <p className="text-sm mb-5" style={{ color: '#64748b', lineHeight: 1.7 }}>
            Permanently delete your Communest account. This action cannot be undone and you will lose all data including your rental history.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:bg-red-500/20"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontWeight: 600 }}
          >
            <Trash2 size={15} /> Delete Account
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-8 text-center" style={{ background: '#0d1a2e', border: '1px solid rgba(239,68,68,0.4)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)' }}>
              <Trash2 size={24} style={{ color: '#ef4444' }} />
            </div>
            <h3 className="text-white mb-3" style={{ fontWeight: 800, fontSize: 22 }}>Confirm Deletion</h3>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.8 }}>
              Are you sure you want to permanently delete your account? <strong className="text-white">This cannot be undone.</strong>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl text-sm transition-colors hover:bg-white/5"
                style={{ border: '1px solid #1e3a5f', color: '#94a3b8', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#ef4444', fontWeight: 700 }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
