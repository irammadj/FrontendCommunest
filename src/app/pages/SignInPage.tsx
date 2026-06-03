import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Upload, Home, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn, register } = useAuth();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'signin') {
      const success = signIn(form.email, form.password);
      if (success) navigate('/profile');
      else setError('Invalid email or password. Password must be at least 6 characters.');
    } else {
      if (!form.name.trim()) return setError('Please enter your full name.');
      if (!form.email.trim()) return setError('Please enter your email address.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      if (!agreed) return setError('Please agree to the Terms & Conditions and Privacy Policy.');
      register(form.name, form.email, form.password, profilePreview || undefined);
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16" style={{ background: '#060d17' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)' }}>
              <Home size={20} className="text-white" />
            </div>
            <span className="text-white text-xl" style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>COMMUNEST</span>
          </Link>
          <h1 className="text-white mb-2" style={{ fontWeight: 700, fontSize: 28 }}>
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-sm" style={{ color: '#64748b' }}>
            {mode === 'signin' ? 'Sign in to continue to Communest' : 'Join thousands of Kenyans finding homes'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-xl p-1 mb-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
          {(['signin', 'register'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setForm({ name: '', email: '', password: '' }); }}
              className="flex-1 py-2.5 rounded-lg text-sm transition-all"
              style={{ background: mode === m ? 'linear-gradient(135deg, #1d6fce, #0ea5e9)' : 'transparent', color: mode === m ? '#fff' : '#64748b', fontWeight: mode === m ? 700 : 400 }}
            >
              {m === 'signin' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
          {mode === 'register' && (
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer mb-3 overflow-hidden relative group"
                style={{ background: profilePreview ? 'transparent' : '#1e3a5f', border: '2px dashed #1d6fce' }}
                onClick={() => fileInputRef.current?.click()}
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={28} style={{ color: '#3b82f6' }} />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                  <Upload size={16} className="text-white" />
                </div>
              </div>
              <p className="text-xs" style={{ color: '#64748b' }}>Click to upload profile picture</p>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          )}

          {mode === 'register' && (
            <div className="mb-5">
              <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                  onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
                />
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: '#94a3b8', fontWeight: 500 }}>Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder={mode === 'signin' ? '••••••••' : 'Min. 6 characters'}
                className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: '#060d17', border: '1px solid #1e3a5f', color: '#e2e8f0' }}
                onFocus={e => e.currentTarget.style.borderColor = '#1d6fce'}
                onBlur={e => e.currentTarget.style.borderColor = '#1e3a5f'}
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="mb-6 flex items-start gap-3">
              <button type="button" onClick={() => setAgreed(a => !a)}
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{ background: agreed ? '#1d6fce' : 'transparent', border: `2px solid ${agreed ? '#1d6fce' : '#1e3a5f'}` }}
              >
                {agreed && <CheckCircle2 size={12} className="text-white" />}
              </button>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                I agree to Communest's{' '}
                <a href="#" className="hover:text-blue-300 transition-colors" style={{ color: '#3b82f6' }}>Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="hover:text-blue-300 transition-colors" style={{ color: '#3b82f6' }}>Privacy Policy</a>
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <button type="submit" className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 700 }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-sm mt-5" style={{ color: '#64748b' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => { setMode(mode === 'signin' ? 'register' : 'signin'); setError(''); }}
              className="hover:text-blue-300 transition-colors" style={{ color: '#3b82f6', fontWeight: 600 }}
            >
              {mode === 'signin' ? 'Register here' : 'Sign in'}
            </button>
          </p>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>
          By using Communest you agree to our{' '}
          <a href="#" className="hover:text-blue-400 transition-colors" style={{ color: '#3b82f6' }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
