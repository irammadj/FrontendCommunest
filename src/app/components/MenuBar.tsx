import { Link, useLocation } from 'react-router';
import { X, Home, Search, Building2, Info, PlusSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface MenuBarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Explore', to: '/explore', icon: Search },
  { label: 'My Estate', to: '/estate', icon: Building2 },
  { label: 'About', to: '/about', icon: Info },
  { label: 'List Your Estate', to: '/list-estate', icon: PlusSquare },
];

export function MenuBar({ open, onClose }: MenuBarProps) {
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => { signOut(); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          />
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 left-0 h-full z-50 flex flex-col"
            style={{ width: 280, background: '#080f1c', borderRight: '1px solid #1e3a5f' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)' }}>
                  <Home size={14} className="text-white" />
                </div>
                <span className="text-white" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>COMMUNEST</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#1e3a5f', color: '#94a3b8' }}>
                <X size={16} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <p className="text-xs px-3 mb-3" style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Navigation</p>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to} onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all"
                    style={{
                      background: isActive ? 'rgba(29,111,206,0.15)' : 'transparent',
                      color: isActive ? '#3b82f6' : '#94a3b8',
                      borderLeft: isActive ? '3px solid #1d6fce' : '3px solid transparent',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Profile bottom */}
            <div className="px-3 pb-5" style={{ borderTop: '1px solid #1e3a5f' }}>
              <div className="pt-4">
                {isAuthenticated && user ? (
                  <>
                    <Link to="/profile" onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl mb-2 transition-colors"
                      style={{ background: 'rgba(29,111,206,0.08)', color: '#e2e8f0' }}
                    >
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 700 }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate" style={{ fontWeight: 600, color: '#e2e8f0' }}>{user.name}</p>
                        <p className="text-xs truncate" style={{ color: '#64748b' }}>{user.email}</p>
                      </div>
                      <User size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                    </Link>
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-colors hover:bg-red-500/10" style={{ color: '#ef4444' }}>
                      <LogOut size={16} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link to="/signin" onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white"
                    style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 600 }}
                  >
                    <User size={16} /> Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
