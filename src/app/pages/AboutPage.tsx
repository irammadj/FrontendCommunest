import { Link } from 'react-router';
import { Target, Eye, Heart, Shield, Users, Building2, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Transparency', desc: 'Every estate is vetted and verified before listing. We ensure all documentation is legitimate and up-to-date.' },
  { icon: Heart, title: 'Affordability', desc: 'We believe every Kenyan deserves quality housing. We work with estates across all price ranges.' },
  { icon: Users, title: 'Community', desc: 'We build communities, not just fill houses. Our estate portal keeps tenants and managers connected.' },
  { icon: Building2, title: 'Empowerment', desc: 'We empower estate managers with digital tools to run professional, efficient, and transparent operations.' },
];

const team = [
  { name: 'Amina Wanjiku', role: 'Chief Executive Officer', initial: 'A' },
  { name: 'Brian Otieno', role: 'Head of Technology', initial: 'B' },
  { name: 'Christine Muthoni', role: 'Head of Operations', initial: 'C' },
  { name: 'David Kipchoge', role: 'Head of Partnerships', initial: 'D' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #040b14, #060d17, #0a1830)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm mb-4" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>About Communest</p>
          <h1 className="text-white mb-6" style={{ fontWeight: 800, fontSize: 46, letterSpacing: '-1px', lineHeight: 1.15 }}>
            Transforming How Kenyans<br />
            <span style={{ background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Find & Manage Homes
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#94a3b8' }}>
            Founded in Nairobi, Communest is Kenya's first dedicated platform bridging the gap between house hunters and estate managers — making affordable, quality housing accessible across all 47 counties.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6" style={{ background: '#060d17' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl p-10" style={{ background: 'linear-gradient(135deg, #0d1a2e, #091220)', border: '1px solid #1e3a5f' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(29,111,206,0.15)', border: '1px solid rgba(29,111,206,0.3)' }}>
              <Target size={26} style={{ color: '#3b82f6' }} />
            </div>
            <h2 className="text-white mb-4" style={{ fontWeight: 700, fontSize: 28 }}>Our Mission</h2>
            <p className="leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              To democratize access to quality housing in Kenya by creating a transparent, efficient, and trusted digital marketplace that connects house hunters with verified residential estates across every county.
            </p>
            <p className="leading-relaxed mt-4" style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              We believe the process of finding a home should be simple, honest, and stress-free — regardless of your budget or location.
            </p>
          </div>
          <div className="rounded-3xl p-10" style={{ background: 'linear-gradient(135deg, #0d1a2e, #091220)', border: '1px solid #1e3a5f' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)' }}>
              <Eye size={26} style={{ color: '#0ea5e9' }} />
            </div>
            <h2 className="text-white mb-4" style={{ fontWeight: 700, fontSize: 28 }}>Our Vision</h2>
            <p className="leading-relaxed" style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              To be the most trusted housing platform in East Africa — a place where every Kenyan can find a home they're proud to live in, and where every estate manager can build a thriving, connected community.
            </p>
            <p className="leading-relaxed mt-4" style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              We envision a Kenya where quality housing is not a privilege, but a reality for all.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: '#04090f' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm mb-3" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>What Drives Us</p>
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: 36 }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-7 transition-all hover:-translate-y-1" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(29,111,206,0.12)', border: '1px solid rgba(29,111,206,0.25)' }}>
                  <Icon size={22} style={{ color: '#3b82f6' }} />
                </div>
                <h3 className="text-white mb-3" style={{ fontWeight: 700 }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: '#060d17' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: '2022', label: 'Founded' },
            { value: '120+', label: 'Listed Estates' },
            { value: '20+', label: 'Counties' },
            { value: '5,000+', label: 'Happy Tenants' },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-2xl p-6" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <div className="text-3xl text-white mb-2" style={{ fontWeight: 800, background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {value}
              </div>
              <div className="text-sm" style={{ color: '#64748b' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6" style={{ background: '#04090f' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm mb-3" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our People</p>
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: 36 }}>Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, initial }) => (
              <div key={name} className="rounded-2xl p-6 text-center" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #1d6fce, #0ea5e9)', fontWeight: 700 }}>
                  {initial}
                </div>
                <h4 className="text-white" style={{ fontWeight: 700 }}>{name}</h4>
                <p className="text-xs mt-1" style={{ color: '#64748b' }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Socials */}
      <section className="py-20 px-6" style={{ background: '#060d17' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm mb-3" style={{ color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Get in Touch</p>
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: 36 }}>Contact Communest</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h3 className="text-white mb-6" style={{ fontWeight: 700 }}>Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={18} style={{ color: '#3b82f6', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 500 }}>Headquarters</p>
                    <p className="text-sm mt-1" style={{ color: '#64748b' }}>Upperhill Business District,<br />Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                  <div>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 500 }}>Phone</p>
                    <a href="tel:+254700000000" className="text-sm hover:text-blue-400 transition-colors" style={{ color: '#64748b' }}>+254 700 000 000</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                  <div>
                    <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 500 }}>Email</p>
                    <a href="mailto:hello@communest.co.ke" className="text-sm hover:text-blue-400 transition-colors" style={{ color: '#64748b' }}>hello@communest.co.ke</a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #1e3a5f' }}>
                <p className="text-sm mb-4" style={{ color: '#94a3b8', fontWeight: 500 }}>Follow us on Social Media</p>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, label: 'Facebook', hoverBg: '#1877f2' },
                    { Icon: Instagram, label: 'Instagram', hoverBg: '#e1306c' },
                    { Icon: Twitter, label: 'X (Twitter)', hoverBg: '#000' },
                  ].map(({ Icon, label, hoverBg }) => (
                    <a key={label} href="#" aria-label={label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: '#1e3a5f', color: '#94a3b8' }}
                      onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ background: '#0d1a2e', border: '1px solid #1e3a5f' }}>
              <h3 className="text-white mb-6" style={{ fontWeight: 700 }}>Quick Navigation</h3>
              <div className="space-y-3">
                {[
                  { label: 'Explore Estates', to: '/explore', desc: 'Browse all verified estates' },
                  { label: 'My Estate', to: '/estate', desc: 'Access your estate portal' },
                  { label: 'List Your Estate', to: '/list-estate', desc: 'Get your estate on Communest' },
                  { label: 'Sign In / Register', to: '/signin', desc: 'Create or access your account' },
                  { label: 'Profile', to: '/profile', desc: 'Manage your personal details' },
                ].map(({ label, to, desc }) => (
                  <Link key={to} to={to}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-white/5 group"
                    style={{ border: '1px solid transparent' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#1e3a5f'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div>
                      <p className="text-sm" style={{ color: '#e2e8f0', fontWeight: 600 }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{desc}</p>
                    </div>
                    <ChevronRight size={16} style={{ color: '#3b82f6' }} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
