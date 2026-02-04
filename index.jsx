import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Layout, 
  Code2, 
  Lock, 
  Search, 
  Zap, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  CheckCircle2
} from 'lucide-react';

// --- Typewriter Hook for Terminal ---
const useTypewriter = (text, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const i = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(i);
    }
  }, [displayedText, text, speed, started]);

  return displayedText;
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Security Lab', href: '#lab' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">CODE<span className="text-blue-500">HOLIC</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-slate-300 hover:text-blue-400 transition-colors font-medium text-sm tracking-wide">
              {link.name}
            </a>
          ))}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#1E293B] p-6 flex flex-col gap-4 md:hidden shadow-2xl border-t border-slate-700"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-blue-400 text-lg font-medium">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const words = ["Web Development", "UI/UX Design", "Penetration Testing"];
  const [index, setIndex] = useState(0);

  // Terminal text lines
  const line1 = useTypewriter("$ run codeholic --audit", 40, 500);
  const line2 = useTypewriter("> Scanning vulnerabilities... Done.", 30, 2000);
  const line3 = useTypewriter("> Status: SYSTEM SECURED (100%)", 30, 3500);
  const line4 = useTypewriter("$ build --frontend --secure", 40, 5000);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0F172A]">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Lock size={14} />
            <span>Secure by Design Philosophy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Digital Fortress
            </span>
          </h1>
          <div className="h-12 mb-8">
            <AnimatePresence mode="wait">
              <motion.p key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-2xl text-slate-400 font-medium">
                Expertise in {words[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
            Membangun ekosistem digital yang memukau secara visual, fungsional secara teknis, dan kebal terhadap ancaman siber.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
              Mulai Proyek <ChevronRight size={18} />
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all border border-slate-700">
              Lihat Portofolio
            </button>
          </div>
        </motion.div>

        {/* Animated Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <div className="relative z-10 bg-[#020617]/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="flex-1 bg-slate-900/50 rounded py-1 px-3 text-[10px] text-slate-500 font-mono text-center">
                zsh — codeholic@terminal
              </div>
            </div>
            <div className="font-mono text-sm leading-relaxed min-h-[220px]">
              <div className="text-slate-300 mb-2">{line1}<span className="animate-pulse">|</span></div>
              <div className="text-emerald-400 mb-2">{line2}</div>
              <div className="text-emerald-500 font-bold mb-4">{line3}</div>
              <div className="text-slate-300 mb-2">{line4}</div>
              {line4.length === 26 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-blue-400"
                >
                  {`> Creating optimized build...`}
                  <br />
                  {`> UI Components rendered.`}
                  <br />
                  {`> Ready to deploy.`}
                </motion.div>
              )}
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 border border-blue-500/10 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Menciptakan antarmuka yang intuitif dan berpusat pada pengguna (User-Centric) dengan prototipe high-fidelity.",
      icon: <Layout className="text-blue-500" size={32} />,
      features: ["User Research", "Wireframing", "Interaction Design"],
      color: "border-blue-500/20 hover:border-blue-500/50"
    },
    {
      title: "Web Development",
      desc: "Pengembangan web modern menggunakan Next.js 14 yang cepat, SEO-friendly, dan mudah ditingkatkan (Scalable).",
      icon: <Code2 className="text-white" size={32} />,
      features: ["Next.js/React", "Performance Optimization", "SEO Mastery"],
      color: "border-slate-700 bg-blue-600 shadow-xl shadow-blue-600/20",
      dark: true
    },
    {
      title: "Penetration Testing",
      desc: "Audit keamanan mendalam berdasarkan OWASP Top 10 untuk menemukan dan menutup celah sebelum dieksploitasi.",
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      features: ["Vulnerability Assessment", "Cloud Security", "Full Reports"],
      color: "border-emerald-500/20 hover:border-emerald-500/50"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-white mb-6">Layanan Profesional 360°</p>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Kami menggabungkan estetika desain dengan ketahanan sistem tingkat tinggi untuk bisnis modern Anda.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className={`p-8 rounded-3xl border transition-all duration-300 ${s.color} ${s.dark ? 'text-white' : 'bg-[#1E293B] text-slate-300'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${s.dark ? 'bg-white/20' : 'bg-slate-900'}`}>{s.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
              <p className={`mb-8 leading-relaxed ${s.dark ? 'text-blue-100' : 'text-slate-400'}`}>{s.desc}</p>
              <ul className="space-y-3">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 size={18} className={s.dark ? 'text-blue-200' : 'text-blue-500'} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Dev', 'UI/UX', 'Pen-test'];
  
  /**
   * DATA PORTOFOLIO - KOSONGKAN/ISI DI SINI
   * Silakan tambahkan objek proyek Anda ke dalam array di bawah ini.
   */
  const projects = [
    /* CONTOH FORMAT ISI:
    { 
      title: "Nama Proyek Anda", 
      category: "Web Dev", // Sesuai kategori: Web Dev, UI/UX, atau Pen-test
      stat: "Statistik (Misal: +20% Speed)", 
      img: "URL_GAMBAR_SQUARE_ATAU_LANDSCAPE" 
    },
    */
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4">Case Studies</h2>
            <p className="text-4xl font-bold text-white">Project Unggulan Kami</p>
          </div>
          <div className="flex gap-2 bg-[#1E293B] p-1.5 rounded-2xl border border-slate-700">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${filter === c ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="py-20 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-500">
            <div className="p-4 bg-slate-800 rounded-full mb-4">
              <Code2 size={40} />
            </div>
            <p className="text-lg font-medium">Belum ada portofolio yang dimasukkan.</p>
            <p className="text-sm italic">Silakan isi bagian 'projects' di App.jsx</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((p) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={p.title} className="group relative bg-[#1E293B] rounded-3xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all shadow-2xl">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{p.title}</h4>
                    <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mb-4">
                      <Zap size={16} /> {p.stat}
                    </div>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm font-bold transition-colors">
                      Lihat Studi Kasus <ExternalLink size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const SecurityLab = () => {
  const tools = [
    { name: 'Burp Suite', level: 'Expert' },
    { name: 'Metasploit', level: 'Advanced' },
    { name: 'Nmap', level: 'Expert' },
    { name: 'Wireshark', level: 'Advanced' },
    { name: 'OWASP ZAP', level: 'Expert' },
    { name: 'Nessus', level: 'Advanced' },
  ];

  return (
    <section id="lab" className="py-24 bg-[#0F172A] relative overflow-hidden border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Search size={14} /> <span>Security Research Laboratory</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Membangun Otoritas di Bidang Keamanan</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Setiap baris kode diuji dengan standar industri. Lab kami memantau ancaman terbaru untuk memastikan sistem Anda kebal terhadap eksploitasi.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.name} className="bg-[#1E293B] border border-slate-700 p-4 rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <div className="text-white font-bold mb-1">{tool.name}</div>
                  <div className="text-emerald-500 text-xs font-mono uppercase tracking-widest">{tool.level}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-700 rounded-3xl p-8 shadow-inner">
             <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Lock className="text-emerald-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">Vulnerability Disclosure</h4>
                <p className="text-slate-500 text-sm">Active Monitoring Status</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-500 text-xs font-bold font-mono">LIVE</span>
              </div>
            </div>
            <div className="space-y-6">
              {['Network Scan', 'Data Encryption', 'Threat Mitigation'].map((label, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 text-slate-400">
                    <span>{label}</span>
                    <span className="text-white font-mono">100% Secure</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, delay: i * 0.2 }} className="bg-emerald-500 h-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Mengirim...');
    setTimeout(() => {
      setStatus('Pesan Terkirim!');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#1E293B] border border-slate-700 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Hubungi Codeholic</h2>
            <p className="text-slate-400">Konsultasi gratis untuk keamanan dan pengembangan digital Anda.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-[#0F172A] border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Nama Anda" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-[#0F172A] border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Email Anda" />
            </div>
            <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#0F172A] border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none" placeholder="Pesan Anda..." />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3">
              {status || 'Kirim Pesan Aman'} <Lock size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#0F172A] border-t border-slate-800 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6 text-white font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><ShieldCheck size={20} /></div>
            CODE<span className="text-blue-500">HOLIC</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
            Membangun fondasi digital yang kuat melalui desain yang bermakna dan kode yang aman dari ancaman.
          </p>
          <div className="flex gap-4">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all"><Icon size={20} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Navigasi</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#portfolio" className="hover:text-blue-400">Portfolio</a></li>
            <li><a href="#lab" className="hover:text-blue-400">Security Lab</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Compliance</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><a href="#" className="text-emerald-500/80 hover:text-emerald-400 flex items-center gap-2">Security Policy <Lock size={12} /></a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 flex justify-between items-center text-slate-500 text-xs">
        <p>© 2024 Codeholic Team. All rights reserved.</p>
        <p>Handcrafted with ❤️ & 100% Secure Code.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <SecurityLab />
      <Contact />
      <Footer />
    </div>
  );
}
