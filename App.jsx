// App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';

// ============ CONTEXT ============
const AppContext = createContext();

const useApp = () => useContext(AppContext);

// ============ MOCK DATA ============
const CATEGORIES = [
  { id: 'presets', name: 'Presets', icon: '🎨', count: 1240, desc: 'Color grading presets for Lightroom, Premiere & more' },
  { id: 'luts', name: 'LUTs', icon: '🎞️', count: 860, desc: 'Cinematic look-up tables for pro color grading' },
  { id: 'overlays', name: 'Overlays', icon: '✨', count: 640, desc: 'Light leaks, dust, VHS and cinematic overlays' },
  { id: 'transitions', name: 'Transitions', icon: '⚡', count: 920, desc: 'Seamless transitions for every edit style' },
  { id: 'sfx', name: 'Sound Effects', icon: '🎧', count: 1500, desc: 'Whooshes, impacts, risers & foley' },
  { id: 'projects', name: 'Project Files', icon: '📁', count: 380, desc: 'Complete project templates ready to customize' },
];

const CREATORS = [
  { id: 'c1', name: 'Alex Rivera', handle: 'alexrivera', avatar: '🎬', bio: 'Cinematic colorist & editor. 10+ years crafting looks for brands.', followers: 12400, products: 24, rating: 4.9, banner: 'from-purple-600 to-blue-600' },
  { id: 'c2', name: 'Maya Chen', handle: 'mayaedits', avatar: '🎨', bio: 'Motion designer specializing in short-form content.', followers: 8900, products: 18, rating: 4.8, banner: 'from-pink-600 to-purple-600' },
  { id: 'c3', name: 'Jordan Kim', handle: 'jkvisuals', avatar: '📸', bio: 'Documentary-style color grading & sound design.', followers: 15600, products: 32, rating: 5.0, banner: 'from-blue-600 to-cyan-600' },
  { id: 'c4', name: 'Sam Patel', handle: 'sampatel', avatar: '⚡', bio: 'Fast-paced editor. YouTube & TikTok transitions expert.', followers: 22100, products: 41, rating: 4.9, banner: 'from-indigo-600 to-purple-600' },
];

const PRODUCTS = [
  { id: 'p1', title: 'Cinematic Orange & Teal LUT Pack', creatorId: 'c1', category: 'luts', price: 29, originalPrice: 49, rating: 4.9, reviews: 342, sales: 2100, tags: ['cinematic', 'color grading', 'premiere'], software: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'], gradient: 'from-orange-500 to-teal-500', desc: '25 hand-crafted cinematic LUTs designed to deliver that Hollywood orange-and-teal look in one click. Works with all major NLEs.', files: ['25 .cube LUT files', 'Installation guide PDF', 'Video tutorial'] },
  { id: 'p2', title: 'Smooth Transitions Mega Pack', creatorId: 'c4', category: 'transitions', price: 39, originalPrice: 59, rating: 4.8, reviews: 512, sales: 3400, tags: ['transitions', 'premiere', 'smooth'], software: ['Premiere Pro', 'After Effects'], gradient: 'from-blue-500 to-purple-500', desc: '150+ drag-and-drop seamless transitions for fast-paced edits. Perfect for YouTube, TikTok, and Reels.', files: ['150 .mogrt files', 'Sound FX included', 'Tutorial video'] },
  { id: 'p3', title: 'Moody Film Presets Collection', creatorId: 'c2', category: 'presets', price: 24, originalPrice: 39, rating: 4.9, reviews: 289, sales: 1800, tags: ['moody', 'film', 'lightroom'], software: ['Lightroom', 'Photoshop'], gradient: 'from-amber-600 to-red-600', desc: '20 moody film presets for photo and video. Capture that analog aesthetic instantly.', files: ['20 .xmp presets', 'Mobile DNG files', 'Setup guide'] },
  { id: 'p4', title: 'Light Leaks & Dust Overlays', creatorId: 'c3', category: 'overlays', price: 19, rating: 4.7, reviews: 198, sales: 1200, tags: ['overlays', 'light leaks', '4k'], software: ['Any NLE'], gradient: 'from-yellow-500 to-orange-500', desc: '50 organic 4K light leak and dust overlays to add soul to your footage.', files: ['50 ProRes files', '4K resolution', 'Usage guide'] },
  { id: 'p5', title: 'Cinematic Whoosh SFX Pack', creatorId: 'c3', category: 'sfx', price: 14, rating: 4.8, reviews: 421, sales: 4200, tags: ['sfx', 'whoosh', 'cinematic'], software: ['Any DAW'], gradient: 'from-emerald-500 to-blue-500', desc: '100+ professional whoosh, impact and riser sound effects for trailers and edits.', files: ['100 WAV files', 'Royalty free license'] },
  { id: 'p6', title: 'YouTube Intro Template Pack', creatorId: 'c4', category: 'projects', price: 49, originalPrice: 79, rating: 4.9, reviews: 156, sales: 890, tags: ['youtube', 'intro', 'template'], software: ['After Effects'], gradient: 'from-red-500 to-pink-500', desc: '10 customizable YouTube intro templates. Just drop your logo and render.', files: ['10 .aep files', 'Music included', 'Tutorial'] },
  { id: 'p7', title: 'Vintage VHS Overlay Pack', creatorId: 'c2', category: 'overlays', price: 16, rating: 4.6, reviews: 134, sales: 760, tags: ['vhs', 'vintage', 'retro'], software: ['Any NLE'], gradient: 'from-purple-500 to-pink-500', desc: '30 authentic VHS overlays with glitches, noise, and tape artifacts.', files: ['30 MP4 overlays', '1080p & 4K'] },
  { id: 'p8', title: 'Teal Skin Tone LUTs Pro', creatorId: 'c1', category: 'luts', price: 34, rating: 4.9, reviews: 267, sales: 1540, tags: ['skin tones', 'luts', 'portrait'], software: ['Premiere Pro', 'DaVinci Resolve'], gradient: 'from-teal-500 to-cyan-500', desc: 'Professional LUTs optimized for preserving natural skin tones.', files: ['15 .cube files', 'Before/after examples'] },
  { id: 'p9', title: 'Flash Transitions Pack', creatorId: 'c4', category: 'transitions', price: 22, rating: 4.7, reviews: 178, sales: 1100, tags: ['flash', 'fast', 'transitions'], software: ['Premiere Pro'], gradient: 'from-white to-yellow-400', desc: '40 energetic flash transitions for high-energy edits.', files: ['40 presets', 'SFX included'] },
  { id: 'p10', title: 'Impact & Riser SFX Bundle', creatorId: 'c3', category: 'sfx', price: 18, rating: 4.8, reviews: 302, sales: 2300, tags: ['impact', 'riser', 'trailer'], software: ['Any DAW'], gradient: 'from-slate-600 to-slate-900', desc: 'Cinematic impacts and risers for trailers, sports edits and more.', files: ['80 WAV files'] },
  { id: 'p11', title: 'Mobile Lightroom Presets', creatorId: 'c2', category: 'presets', price: 12, rating: 4.7, reviews: 445, sales: 5600, tags: ['mobile', 'lightroom', 'instagram'], software: ['Lightroom Mobile'], gradient: 'from-pink-400 to-purple-500', desc: '25 Instagram-ready mobile presets for creators on the go.', files: ['25 DNG files', 'Install guide'] },
  { id: 'p12', title: 'Podcast Project Template', creatorId: 'c1', category: 'projects', price: 59, rating: 4.8, reviews: 89, sales: 420, tags: ['podcast', 'template', 'premiere'], software: ['Premiere Pro'], gradient: 'from-indigo-500 to-blue-600', desc: 'Complete podcast editing template with waveforms, lower thirds and intro.', files: ['.prproj file', 'Assets pack'] },
];

// ============ ICONS ============
const Icon = ({ name, className = "w-5 h-5" }) => {
  const paths = {
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    cart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    menu: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    star: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.446a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.54 1.118l-3.37-2.446a1 1 0 00-1.175 0l-3.37 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.05 2.927z" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m0 0v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    arrow: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.03A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    spark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  };
  return (
    <svg className={className} fill={name === 'star' ? 'currentColor' : 'none'} stroke={name === 'star' ? 'none' : 'currentColor'} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
};

// ============ LAYOUT ============
const Navbar = () => {
  const { user, cart, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) navigate(`/marketplace?q=${encodeURIComponent(searchQ)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">EzyPzy</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/marketplace" className="text-sm text-slate-300 hover:text-white transition">Marketplace</Link>
              <Link to="/category/presets" className="text-sm text-slate-300 hover:text-white transition">Categories</Link>
              <Link to="/pricing" className="text-sm text-slate-300 hover:text-white transition">Sell</Link>
              <Link to="/about" className="text-sm text-slate-300 hover:text-white transition">About</Link>
            </div>
          </div>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search presets, LUTs, transitions..."
                className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/wishlist" className="p-2 text-slate-300 hover:text-white transition">
              <Icon name="heart" />
            </Link>
            <Link to="/checkout" className="p-2 text-slate-300 hover:text-white relative transition">
              <Icon name="cart" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to={user.role === 'seller' ? '/seller' : '/buyer'} className="px-3 py-1.5 text-sm text-slate-200 hover:text-white transition">
                  Dashboard
                </Link>
                <button onClick={logout} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 text-sm text-slate-200 hover:text-white transition">Log in</Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-medium">Sign up</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white">
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/5">
            <Link to="/marketplace" onClick={() => setOpen(false)} className="block py-2 text-slate-300">Marketplace</Link>
            <Link to="/category/presets" onClick={() => setOpen(false)} className="block py-2 text-slate-300">Categories</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="block py-2 text-slate-300">Sell</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-slate-300">About</Link>
            <div className="pt-3 border-t border-white/5 flex gap-2">
              {user ? (
                <>
                  <Link to={user.role === 'seller' ? '/seller' : '/buyer'} onClick={() => setOpen(false)} className="flex-1 px-4 py-2 text-center bg-slate-800 rounded-lg text-white">Dashboard</Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="flex-1 px-4 py-2 bg-slate-800 rounded-lg text-slate-300">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="flex-1 px-4 py-2 text-center bg-slate-800 rounded-lg text-white">Log in</Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">Sign up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 border-t border-white/5 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">EzyPzy</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">The marketplace where creators buy and sell premium editing assets. Built for video editors, by video editors.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Marketplace</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/marketplace" className="hover:text-white">Explore</Link></li>
            <li><Link to="/category/presets" className="hover:text-white">Categories</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Start Selling</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/5 text-center text-sm text-slate-500">
        © 2025 EzyPzy. Built for creators.
      </div>
    </div>
  </footer>
);

// ============ COMPONENTS ============
const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist } = useApp();
  const creator = CREATORS.find(c => c.id === product.creatorId);
  const saved = wishlist.includes(product.id);

  return (
    <div className="group relative bg-slate-900/60 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className={`aspect-[4/3] bg-gradient-to-br ${product.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Icon name="play" className="w-6 h-6 text-white" />
            </div>
          </div>
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition ${saved ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
      >
        <Icon name="heart" className="w-4 h-4" />
      </button>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-semibold mb-1 line-clamp-1 hover:text-blue-400 transition">{product.title}</h3>
        </Link>
        <Link to={`/creator/${creator.id}`} className="flex items-center gap-2 mb-3 text-xs text-slate-400 hover:text-slate-200">
          <span>{creator.avatar}</span>
          <span>{creator.name}</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Icon name="star" className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-white font-medium">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            {product.originalPrice && <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>}
            <span className="text-white font-bold">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90',
    secondary: 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
    outline: 'border border-white/20 text-white hover:bg-white/5',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' };
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ============ PAGES ============

const LandingPage = () => {
  const trending = PRODUCTS.slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 mb-6">
            <Icon name="spark" className="w-3.5 h-3.5" />
            <span>Trusted by 50,000+ creators worldwide</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Premium editing assets.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Made easy.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Discover thousands of LUTs, presets, transitions, overlays, and SFX from top creators. Buy, download, and ship faster edits today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="w-full sm:w-auto">Browse Marketplace <Icon name="arrow" className="w-4 h-4" /></Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Start Selling</Button>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[{ n: '50K+', l: 'Creators' }, { n: '120K+', l: 'Products' }, { n: '4.9★', l: 'Avg. Rating' }].map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">{s.n}</div>
                <div className="text-xs text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Explore Categories</h2>
            <p className="text-slate-400 mt-1">Find exactly what your edit needs</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="group relative bg-slate-900/60 border border-white/5 rounded-xl p-5 hover:border-blue-500/30 hover:bg-slate-900 transition">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.count.toLocaleString()} assets</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            <p className="text-slate-400 mt-1">The hottest assets this week</p>
          </div>
          <Link to="/marketplace" className="text-sm text-blue-400 hover:text-blue-300">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Top Creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-2">Top Creators</h2>
        <p className="text-slate-400 mb-8">The pros making assets you'll love</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CREATORS.map(c => (
            <Link key={c.id} to={`/creator/${c.id}`} className="bg-slate-900/60 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition">
              <div className={`h-20 bg-gradient-to-br ${c.banner}`} />
              <div className="p-5 -mt-10">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-3xl mb-3">{c.avatar}</div>
                <h3 className="text-white font-semibold">{c.name}</h3>
                <p className="text-xs text-slate-500">@{c.handle}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span>{c.products} products</span>
                  <span className="flex items-center gap-1"><Icon name="star" className="w-3 h-3 text-yellow-400" />{c.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-2">How it works</h2>
        <p className="text-slate-400 text-center mb-12">From discover to download in seconds</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', t: 'Discover', d: 'Browse thousands of premium assets filtered by category, software and style.' },
            { n: '02', t: 'Purchase', d: 'Checkout securely with Stripe in a few clicks. No subscriptions, no surprises.' },
            { n: '03', t: 'Download', d: 'Get instant access to your files. Re-download anytime from your library.' },
          ].map(s => (
            <div key={s.n} className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/30 border border-white/5">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">{s.n}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{s.t}</h3>
              <p className="text-sm text-slate-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Loved by creators</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "EzyPzy cut my color grading time in half. The LUT quality is ridiculous.", n: 'Tyler B.', r: 'YouTuber, 1.2M subs' },
            { q: "Best marketplace for video editors. Fast delivery and high quality every time.", n: 'Priya M.', r: 'Freelance editor' },
            { q: "Started selling presets here last year. It's now my main income stream.", n: 'Marcus L.', r: 'Creator' },
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Icon key={i} name="star" className="w-4 h-4 text-yellow-400" />)}</div>
              <p className="text-slate-300 mb-4">"{t.q}"</p>
              <div>
                <div className="text-white text-sm font-medium">{t.n}</div>
                <div className="text-xs text-slate-500">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to monetize your craft?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Join thousands of creators earning from their editing assets. Zero setup fees, keep up to 90% of each sale.</p>
          <Link to="/signup"><Button variant="secondary" size="lg">Start selling today</Button></Link>
        </div>
      </section>
    </div>
  );
};

const MarketplacePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('popular');
  const [priceMax, setPriceMax] = useState(100);

  let products = PRODUCTS.filter(p =>
    (cat === 'all' || p.category === cat) &&
    p.price <= priceMax &&
    (q === '' || p.title.toLowerCase().includes(q.toLowerCase()) || p.tags.some(t => t.includes(q.toLowerCase())))
  );

  if (sort === 'popular') products.sort((a, b) => b.sales - a.sales);
  if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
  if (sort === 'price-low') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') products.sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
      <p className="text-slate-400 mb-8">Discover {PRODUCTS.length}+ premium assets</p>

      <div className="mb-6 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none">
          <option value="popular">Most popular</option>
          <option value="rating">Top rated</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Category</h3>
            <div className="space-y-1">
              <button onClick={() => setCat('all')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${cat === 'all' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400 hover:bg-slate-800'}`}>All categories</button>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${cat === c.id ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400 hover:bg-slate-800'}`}>
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Max Price: ${priceMax}</h3>
            <input type="range" min="5" max="100" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full accent-blue-500" />
          </div>
        </aside>

        <div>
          <p className="text-sm text-slate-400 mb-4">{products.length} results</p>
          {products.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { id } = useParams();
  const cat = CATEGORIES.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.category === id);
  if (!cat) return <div className="max-w-7xl mx-auto p-10 text-white">Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="text-5xl mb-3">{cat.icon}</div>
        <h1 className="text-4xl font-bold text-white">{cat.name}</h1>
        <p className="text-slate-400 mt-2">{cat.desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.filter(c => c.id !== id).map(c => (
          <Link key={c.id} to={`/category/${c.id}`} className="px-3 py-1.5 text-sm bg-slate-900 border border-white/5 rounded-full text-slate-300 hover:border-white/20">
            {c.icon} {c.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return <div className="max-w-7xl mx-auto p-10 text-white">Product not found</div>;
  const creator = CREATORS.find(c => c.id === product.creatorId);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const saved = wishlist.includes(product.id);

  const handleBuy = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
        <div>
          <div className={`aspect-video bg-gradient-to-br ${product.gradient} rounded-2xl mb-4 relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Icon name="play" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`aspect-square bg-gradient-to-br ${product.gradient} rounded-lg opacity-60 hover:opacity-100 cursor-pointer transition`} />
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">About this product</h2>
            <p className="text-slate-300 leading-relaxed">{product.desc}</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">What's included</h3>
            <ul className="space-y-2">
              {product.files.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300"><Icon name="check" className="w-4 h-4 text-green-400" />{f}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Software compatibility</h3>
            <div className="flex flex-wrap gap-2">
              {product.software.map(s => <span key={s} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">{s}</span>)}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">Reviews ({product.reviews})</h2>
            <div className="space-y-4">
              {[
                { n: 'Chris W.', r: 5, c: 'Exactly what I needed. Saved me hours on my latest edit.' },
                { n: 'Sarah M.', r: 5, c: 'Top quality. Easy to install and the look is stunning.' },
                { n: 'Derek L.', r: 4, c: 'Great value. Would love to see more variations in the future.' },
              ].map((r, i) => (
                <div key={i} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{r.n}</span>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Icon key={j} name="star" className={`w-3.5 h-3.5 ${j < r.r ? 'text-yellow-400' : 'text-slate-700'}`} />)}</div>
                  </div>
                  <p className="text-slate-400 text-sm">{r.c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 self-start">
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6">
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded text-xs">{t}</span>)}
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="star" className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">{product.rating}</span>
                <span className="text-slate-400">({product.reviews} reviews)</span>
              </div>
              <span className="text-slate-400">{product.sales.toLocaleString()} sales</span>
            </div>
            <Link to={`/creator/${creator.id}`} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg mb-6 hover:bg-slate-800 transition">
              <div className="text-2xl">{creator.avatar}</div>
              <div>
                <div className="text-white text-sm font-medium">{creator.name}</div>
                <div className="text-xs text-slate-400">@{creator.handle}</div>
              </div>
            </Link>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              {product.originalPrice && <span className="text-slate-500 line-through">${product.originalPrice}</span>}
            </div>
            <div className="space-y-2">
              <Button onClick={handleBuy} size="lg" className="w-full">Buy Now</Button>
              <Button onClick={() => addToCart(product)} variant="secondary" size="lg" className="w-full">Add to Cart</Button>
              <Button onClick={() => toggleWishlist(product.id)} variant="ghost" size="md" className="w-full">
                <Icon name="heart" className="w-4 h-4" /> {saved ? 'Saved' : 'Save for later'}
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-400" />Instant download</div>
              <div className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-400" />Lifetime access</div>
              <div className="flex items-center gap-2"><Icon name="lock" className="w-4 h-4 text-green-400" />Secure checkout</div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

const CreatorStorefrontPage = () => {
  const { id } = useParams();
  const creator = CREATORS.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.creatorId === id);
  if (!creator) return <div className="max-w-7xl mx-auto p-10 text-white">Creator not found</div>;

  return (
    <div>
      <div className={`h-48 md:h-64 bg-gradient-to-br ${creator.banner}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
          <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-6xl">{creator.avatar}</div>
          <div className="flex-1 pt-4">
            <h1 className="text-3xl font-bold text-white">{creator.name}</h1>
            <p className="text-slate-400">@{creator.handle}</p>
            <p className="text-slate-300 mt-2 max-w-2xl">{creator.bio}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
              <span><strong className="text-white">{creator.followers.toLocaleString()}</strong> followers</span>
              <span><strong className="text-white">{creator.products}</strong> products</span>
              <span className="flex items-center gap-1"><Icon name="star" className="w-4 h-4 text-yellow-400" /><strong className="text-white">{creator.rating}</strong> rating</span>
            </div>
          </div>
          <Button>Follow</Button>
        </div>
        <div className="mt-10 pb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Products ({products.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ mode = 'login' }) => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState('buyer');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = (e) => {
    e.preventDefault();
    login({ name: form.name || form.email.split('@')[0], email: form.email, role });
    navigate(role === 'seller' ? '/seller' : '/buyer');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="text-sm text-slate-400 mb-6">{mode === 'login' ? 'Sign in to continue to EzyPzy' : 'Start buying or selling in minutes'}</p>

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button onClick={() => setRole('buyer')} className={`p-3 rounded-lg border text-sm transition ${role === 'buyer' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-slate-400'}`}>
                🛒 I'm a Buyer
              </button>
              <button onClick={() => setRole('seller')} className={`p-3 rounded-lg border text-sm transition ${role === 'seller' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-slate-400'}`}>
                🎨 I'm a Seller
              </button>
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-slate-300 mb-1">Full name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            )}
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50" />
            </div>
            {mode === 'signup' && <label className="flex items-start gap-2 text-xs text-slate-400"><input type="checkbox" required className="mt-0.5" />I agree to the <Link to="/terms" className="text-blue-400">Terms</Link> and <Link to="/privacy" className="text-blue-400">Privacy Policy</Link></label>}
            <Button type="submit" size="lg" className="w-full">{mode === 'login' ? 'Log in' : 'Create account'}</Button>
          </form>

          <div className="mt-5 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center"><span className="bg-slate-900 px-3 text-xs text-slate-500">or continue with</span></div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={submit} className="py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm text-white">Google</button>
            <button type="button" onClick={submit} className="py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm text-white">GitHub</button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? <>No account? <Link to="/signup" className="text-blue-400">Sign up</Link></> : <>Have an account? <Link to="/login" className="text-blue-400">Log in</Link></>}
          </p>
        </div>
      </div>
    </div>
  );
};

const BuyerDashboard = () => {
  const { user, orders } = useApp();
  const [tab, setTab] = useState('purchases');
  if (!user) return <div className="max-w-7xl mx-auto p-10 text-white">Please log in</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
      <p className="text-slate-400 mb-8">Your buyer dashboard</p>

      <div className="flex gap-2 border-b border-white/5 mb-8 overflow-x-auto">
        {[['purchases', 'Purchases'], ['downloads', 'Downloads'], ['wishlist', 'Wishlist'], ['settings', 'Settings']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition ${tab === k ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'purchases' && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-white/5">
              <p className="text-slate-400 mb-4">No purchases yet</p>
              <Link to="/marketplace"><Button>Start browsing</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(o => (
                <div key={o.id} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${o.gradient}`} />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{o.title}</h3>
                    <p className="text-xs text-slate-400">Ordered {o.date} · ${o.price}</p>
                  </div>
                  <Button size="sm"><Icon name="download" className="w-4 h-4" /> Download</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {tab === 'downloads' && <div className="text-slate-400">Your download history will appear here.</div>}
      {tab === 'wishlist' && <WishlistContent />}
      {tab === 'settings' && (
        <div className="max-w-xl space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input defaultValue={user.name} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input defaultValue={user.email} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
          <Button>Save changes</Button>
        </div>
      )}
    </div>
  );
};

const SellerDashboard = () => {
  const { user } = useApp();
  const [tab, setTab] = useState('overview');
  if (!user) return <div className="max-w-7xl mx-auto p-10 text-white">Please log in</div>;
  const sellerProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
          <p className="text-slate-400">Manage products, sales, and payouts</p>
        </div>
        <Link to="/seller/upload"><Button><Icon name="plus" className="w-4 h-4" /> New Product</Button></Link>
      </div>

      <div className="flex gap-2 border-b border-white/5 mb-8 overflow-x-auto">
        {[['overview', 'Overview'], ['products', 'Products'], ['orders', 'Orders'], ['payouts', 'Payouts']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition ${tab === k ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: 'Total Revenue', v: '$12,480', c: 'from-blue-500 to-cyan-500' },
              { l: 'Sales this month', v: '142', c: 'from-purple-500 to-pink-500' },
              { l: 'Products listed', v: '24', c: 'from-green-500 to-emerald-500' },
              { l: 'Avg rating', v: '4.9', c: 'from-yellow-500 to-orange-500' },
            ].map(s => (
              <div key={s.l} className="p-5 bg-slate-900/60 border border-white/5 rounded-xl">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.c} mb-3 flex items-center justify-center`}>
                  <Icon name="chart" className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-xs text-slate-400 mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl">
            <h3 className="text-white font-semibold mb-4">Revenue this week</h3>
            <div className="flex items-end gap-2 h-40">
              {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2 text-center text-xs text-slate-500">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i}>{d}</div>)}
            </div>
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div className="bg-slate-900/60 border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50">
              <tr className="text-left text-slate-400">
                <th className="p-4">Product</th>
                <th className="p-4 hidden sm:table-cell">Price</th>
                <th className="p-4 hidden md:table-cell">Sales</th>
                <th className="p-4 hidden md:table-cell">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map(p => (
                <tr key={p.id} className="border-t border-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded bg-gradient-to-br ${p.gradient}`} />
                      <span className="text-white">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell text-slate-300">${p.price}</td>
                  <td className="p-4 hidden md:table-cell text-slate-300">{p.sales}</td>
                  <td className="p-4 hidden md:table-cell text-slate-300">{p.rating}★</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link to={`/seller/edit/${p.id}`} className="text-blue-400 hover:text-blue-300 text-xs">Edit</Link>
                      <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-white text-sm">Order #000{i}</div>
                <div className="text-xs text-slate-400">2 hours ago · Smooth Transitions Pack</div>
              </div>
              <div className="text-white font-semibold">$39.00</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'payouts' && (
        <div className="max-w-xl space-y-4">
          <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-xl">
            <div className="text-sm text-slate-300">Available balance</div>
            <div className="text-4xl font-bold text-white mt-1">$1,247.30</div>
            <Button className="mt-4">Withdraw</Button>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Payout method</label>
            <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white"><option>Stripe Connect</option><option>PayPal</option><option>Bank Transfer</option></select>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadProductPage = ({ editMode = false }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', desc: '', category: 'presets', price: 19, tags: '' });

  const submit = (e) => {
    e.preventDefault();
    alert(editMode ? 'Product updated!' : 'Product published!');
    navigate('/seller');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">{editMode ? 'Edit product' : 'Upload new product'}</h1>
      <p className="text-slate-400 mb-8">Fill in the details to {editMode ? 'update' : 'publish'} your asset</p>
      <form onSubmit={submit} className="space-y-6">
        <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Product title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="E.g. Cinematic LUT Pack" className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={4} placeholder="Describe your product..." className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white">
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Price (USD)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} min="0" className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="cinematic, moody, warm" className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
        </div>

        <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl space-y-4">
          <h3 className="text-white font-semibold">Media & Files</h3>
          {['Thumbnail', 'Preview media', 'Downloadable files'].map(l => (
            <div key={l} className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-blue-500/30 transition cursor-pointer">
              <Icon name="upload" className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-300">{l}</p>
              <p className="text-xs text-slate-500 mt-1">Click to upload or drag & drop</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg">{editMode ? 'Save changes' : 'Publish product'}</Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/seller')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart, addOrder, user } = useApp();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const subtotal = cart.reduce((s, p) => s + p.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'EZY10') setDiscount(subtotal * 0.1);
    else alert('Invalid coupon');
  };

  const checkout = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    cart.forEach(p => addOrder({ id: 'o' + Date.now() + p.id, title: p.title, gradient: p.gradient, price: p.price, date: new Date().toLocaleDateString() }));
    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <Link to="/marketplace"><Button>Browse marketplace</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <form onSubmit={checkout} className="space-y-6">
          <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl space-y-4">
            <h3 className="text-white font-semibold">Billing details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Full name" required className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
              <input type="email" placeholder="Email" required className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
            </div>
            <input placeholder="Country" required className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          </div>
          <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Payment</h3>
              <div className="flex items-center gap-1 text-xs text-slate-400"><Icon name="lock" className="w-3 h-3" /> Secured by Stripe</div>
            </div>
            <input placeholder="Card number" required className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="MM / YY" required className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
              <input placeholder="CVC" required className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">Pay ${total.toFixed(2)}</Button>
        </form>
        <aside>
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Order summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map(p => (
                <div key={p.id} className="flex gap-3">
                  <div className={`w-14 h-14 rounded bg-gradient-to-br ${p.gradient} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{p.title}</div>
                    <div className="text-xs text-slate-400">${p.price}</div>
                  </div>
                  <button onClick={() => removeFromCart(p.id)} className="text-slate-400 hover:text-red-400"><Icon name="trash" className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              <Button type="button" size="sm" variant="secondary" onClick={applyCoupon}>Apply</Button>
            </div>
            <p className="text-xs text-slate-500 mb-3">Try EZY10 for 10% off</p>
            <div className="space-y-2 pt-4 border-t border-white/5 text-sm">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-slate-400"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-white font-semibold text-base pt-2 border-t border-white/5"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const OrderConfirmationPage = () => {
  const { orders } = useApp();
  const latest = orders[orders.length - 1];
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
        <Icon name="check" className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Thanks for your purchase!</h1>
      <p className="text-slate-400 mb-8">Your order is confirmed. You can download your files from your library at any time.</p>
      {latest && (
        <div className="p-6 bg-slate-900/60 border border-white/5 rounded-xl mb-8 text-left">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${latest.gradient}`} />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{latest.title}</h3>
              <p className="text-xs text-slate-400">Order placed {latest.date}</p>
            </div>
            <Button><Icon name="download" className="w-4 h-4" /> Download</Button>
          </div>
        </div>
      )}
      <div className="flex gap-3 justify-center">
        <Link to="/buyer"><Button variant="secondary">Go to Library</Button></Link>
        <Link to="/marketplace"><Button>Continue shopping</Button></Link>
      </div>
    </div>
  );
};

const WishlistContent = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  if (items.length === 0) return <div className="text-center py-16 text-slate-400">Your wishlist is empty. <Link to="/marketplace" className="text-blue-400">Browse products</Link></div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(p => (
        <div key={p.id} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
          <div className={`aspect-video bg-gradient-to-br ${p.gradient} rounded-lg mb-3`} />
          <h3 className="text-white font-medium mb-2">{p.title}</h3>
          <div className="flex items-center justify-between mb-3"><span className="text-white font-bold">${p.price}</span><span className="text-xs text-slate-400">★ {p.rating}</span></div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => addToCart(p)}>Add to cart</Button>
            <Button size="sm" variant="ghost" onClick={() => toggleWishlist(p.id)}><Icon name="trash" className="w-4 h-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const WishlistPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="text-3xl font-bold text-white mb-8">Your Wishlist</h1>
    <WishlistContent />
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for creators, by creators.</h1>
    <p className="text-lg text-slate-300 mb-6">EzyPzy started from one simple frustration: finding and selling premium editing assets shouldn't be this hard. So we built a marketplace that just… works.</p>
    <div className="grid md:grid-cols-3 gap-6 my-12">
      {[
        { t: 'Our Mission', d: 'Empower creators to make better content, faster — by making quality assets accessible to everyone.' },
        { t: 'Who We Serve', d: 'Video editors, YouTubers, motion designers, and anyone who creates visual stories.' },
        { t: 'Our Promise', d: 'Fair pricing for buyers, fair cuts for creators. No middlemen. Just tools that ship.' },
      ].map(c => (
        <div key={c.t} className="p-6 bg-slate-900/60 border border-white/5 rounded-xl">
          <h3 className="text-white font-semibold mb-2">{c.t}</h3>
          <p className="text-sm text-slate-400">{c.d}</p>
        </div>
      ))}
    </div>
    <Link to="/signup"><Button size="lg">Join EzyPzy</Button></Link>
  </div>
);

const PricingPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, creator-friendly pricing</h1>
      <p className="text-slate-400">Keep up to 90% of every sale. No monthly fees. No surprises.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { name: 'Starter', fee: '15%', f: ['Unlimited products', 'Basic analytics', 'Email support'] },
        { name: 'Pro', fee: '10%', badge: 'Popular', f: ['Unlimited products', 'Advanced analytics', 'Priority support', 'Custom storefront', 'Coupons'] },
        { name: 'Business', fee: '7%', f: ['Everything in Pro', 'Dedicated account manager', 'API access', 'Affiliate program'] },
      ].map((p, i) => (
        <div key={p.name} className={`p-6 rounded-xl border ${i === 1 ? 'border-blue-500/50 bg-gradient-to-br from-blue-600/10 to-purple-600/10' : 'border-white/5 bg-slate-900/60'}`}>
          {p.badge && <div className="text-xs text-blue-300 mb-2">{p.badge}</div>}
          <h3 className="text-2xl font-bold text-white">{p.name}</h3>
          <div className="mt-4 mb-6"><span className="text-4xl font-bold text-white">{p.fee}</span><span className="text-slate-400"> per sale</span></div>
          <ul className="space-y-2 mb-6">{p.f.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Icon name="check" className="w-4 h-4 text-green-400" />{f}</li>)}</ul>
          <Link to="/signup"><Button variant={i === 1 ? 'primary' : 'secondary'} className="w-full">Get started</Button></Link>
        </div>
      ))}
    </div>
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently asked</h2>
      <div className="space-y-3">
        {[
          { q: 'When do I get paid?', a: 'Payouts process weekly on Mondays via Stripe Connect.' },
          { q: 'Can I sell non-video assets?', a: 'Yes — we support presets, overlays, SFX, project files, and more.' },
          { q: 'Do you take a cut of custom work?', a: 'No, only on marketplace sales. Off-platform work is yours to keep 100%.' },
        ].map(f => (
          <details key={f.q} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
            <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
            <p className="text-slate-400 text-sm mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </div>
);

const HelpPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="text-4xl font-bold text-white mb-4 text-center">How can we help?</h1>
    <div className="relative max-w-xl mx-auto mb-10">
      <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input placeholder="Search help articles..." className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white" />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { t: 'Getting Started', d: 'How to sign up, browse, and make your first purchase' },
        { t: 'For Sellers', d: 'Uploading products, pricing, and payouts' },
        { t: 'Downloads & Access', d: 'Finding your files and re-downloading' },
        { t: 'Refunds & Support', d: 'Refund policy and contacting support' },
      ].map(c => (
        <div key={c.t} className="p-6 bg-slate-900/60 border border-white/5 rounded-xl hover:border-white/20 transition cursor-pointer">
          <h3 className="text-white font-semibold mb-1">{c.t}</h3>
          <p className="text-sm text-slate-400">{c.d}</p>
        </div>
      ))}
    </div>
    <div className="mt-10 text-center">
      <p className="text-slate-400 mb-3">Still stuck?</p>
      <Link to="/contact"><Button>Contact Support</Button></Link>
    </div>
  </div>
);

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Contact us</h1>
      <p className="text-slate-400 mb-8">We usually respond within 24 hours</p>
      {sent ? (
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300">Message sent! We'll be in touch soon.</div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <input placeholder="Your name" required className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          <input type="email" placeholder="Email" required className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white"><option>General inquiry</option><option>Seller support</option><option>Bug report</option><option>Business</option></select>
          <textarea rows={5} placeholder="How can we help?" required className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white" />
          <Button type="submit" size="lg" className="w-full">Send message</Button>
        </form>
      )}
    </div>
  );
};

const LegalPage = ({ title, content }) => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
    <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm leading-relaxed">
      {content}
    </div>
  </div>
);

// ============ PROVIDER & APP ============
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ezypzy_user') || 'null'));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('ezypzy_cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('ezypzy_wishlist') || '[]'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('ezypzy_orders') || '[]'));

  useEffect(() => { localStorage.setItem('ezypzy_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('ezypzy_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ezypzy_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('ezypzy_orders', JSON.stringify(orders)); }, [orders]);

  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  const addToCart = (p) => setCart(c => c.find(x => x.id === p.id) ? c : [...c, p]);
  const removeFromCart = (id) => setCart(c => c.filter(p => p.id !== id));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const addOrder = (o) => setOrders(os => [...os, o]);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart, wishlist, toggleWishlist, orders, addOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/creator/:id" element={<CreatorStorefrontPage />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/upload" element={<UploadProductPage />} />
              <Route path="/seller/edit/:id" element={<UploadProductPage editMode />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<LegalPage title="Terms of Service" content={<><p>Welcome to EzyPzy. By using our platform, you agree to these terms.</p><p>EzyPzy provides a marketplace for digital assets. We are not responsible for the quality of third-party products but moderate content to maintain standards.</p><p>All purchases are subject to our Refund Policy. Sellers retain ownership of their intellectual property and grant buyers a license to use purchased assets.</p></>} />} />
              <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={<><p>We collect information you provide when creating an account, making purchases, or contacting support.</p><p>Your data is used to provide services, process payments, and improve the platform. We never sell your data to third parties.</p><p>You have the right to access, correct, or delete your data at any time.</p></>} />} />
              <Route path="/refund" element={<LegalPage title="Refund Policy" content={<><p>Due to the digital nature of our products, all sales are generally final.</p><p>Refunds may be issued within 14 days if the product is defective, substantially different from the description, or you encounter a technical issue we cannot resolve.</p><p>To request a refund, contact support with your order details.</p></>} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}