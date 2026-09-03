import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight,
  Activity,
  User,
  LayoutDashboard,
  LogOut,
  Zap
} from 'lucide-react';
import LoginModal from './LoginModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = () => {
      const saved = localStorage.getItem('bsn_user_profile');
      setHasProfile(!!saved);
    };

    checkProfile();

    window.addEventListener('storage', checkProfile);
    return () => window.removeEventListener('storage', checkProfile);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('bsn_user_profile');
    setHasProfile(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(hasProfile ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Agent Services', path: '/payments', highlight: true },
    { name: 'Skill Exchange', path: '/skill-exchange' },
    ...(hasProfile ? [{ name: 'My Profile', path: '/profile' }] : []),
    { name: 'About', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Brand */}
            <Link 
              to={hasProfile ? "/dashboard" : "/"} 
              className="flex items-center space-x-3 group focus:outline-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-9 h-9 rounded-xl bg-white text-black p-[2px] shadow-lg flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  BHARATSKILL NEXUS
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5">
                  x402 &bull; Algorand TestNet
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path && !link.path.includes('#');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5 ${
                      isActive 
                        ? 'text-white bg-zinc-900 border border-zinc-700' 
                        : link.highlight
                        ? 'text-amber-400 hover:text-white hover:bg-zinc-900'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {link.highlight && <Zap className="w-3 h-3 fill-amber-400/30" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/status"
                className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 rounded-xl transition-colors"
                title="System Health & Verification"
              >
                <Activity className="w-4 h-4" />
              </Link>

              {hasProfile ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all shadow-md"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-500/20 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Log Out of Account"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
                  >
                    Log In
                  </button>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <Link
                to="/status"
                className="p-2 text-zinc-400 hover:text-emerald-400 rounded-lg"
              >
                <Activity className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="block px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              {hasProfile ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-semibold text-xs flex items-center justify-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard Command Center</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 border border-rose-500/20 text-rose-400 font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out of Account</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-300 font-semibold text-xs"
                  >
                    Log In
                  </button>
                  <Link
                    to="/onboarding"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Login / Profile Selection Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
