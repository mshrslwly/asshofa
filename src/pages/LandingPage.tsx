import React, { useState } from 'react';
import {
  KeyRound,
  LogIn,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';
import { dataService } from '../services/dataService';
import { UserAdmin } from '../types';

interface LandingPageProps {
  onEnterKode: (kode: string) => void;
  onLoginSuccess: (user: UserAdmin) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterKode,
  onLoginSuccess
}) => {
  const { showToast } = useToast();
  const [manualCode, setManualCode] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // Email dan password pengurus dikosongkan secara default
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Animasi Transisi Masuk Dashboard Setelah Login Berhasil
  const [isTransitioningToDashboard, setIsTransitioningToDashboard] = useState(false);
  const [loggedUser, setLoggedUser] = useState<UserAdmin | null>(null);

  const handleSubmitKode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = manualCode.trim().toUpperCase();
    if (!clean) {
      showToast('Silakan masukkan 10 karakter kode akses', 'error');
      return;
    }
    onEnterKode(clean);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      showToast('Email dan kata sandi wajib diisi', 'error');
      return;
    }

    try {
      setIsLoggingIn(true);
      const user = await dataService.loginPengurus(loginEmail.trim(), loginPassword.trim());
      setIsLoginModalOpen(false);
      setLoggedUser(user);
      setIsTransitioningToDashboard(true);

      // Mainkan efek portal transisi masuk dashboard selama 1.2 detik
      setTimeout(() => {
        onLoginSuccess(user);
      }, 1250);
    } catch (err: any) {
      showToast(err.message || 'Gagal masuk. Periksa kembali email & kata sandi.', 'error');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBF5EA] text-[#2C241E] flex flex-col justify-between overflow-hidden">
      {/* Ambient Decorative Lighting & Geometric Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#5F8F6B]/15 via-[#F6B98A]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#5F8F6B]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-[#E8D5C4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full animate-slide-down">
        <Logo size="md" />
        <button
          type="button"
          onClick={() => {
            setLoginEmail('');
            setLoginPassword('');
            setIsLoginModalOpen(true);
          }}
          className="clay-btn clay-btn-primary py-2 px-4 text-xs sm:text-sm font-bold gap-1.5 cursor-pointer shadow-md hover-lift active:scale-95 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>Masuk Pengurus</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto w-full px-5 py-6 space-y-6 text-center">
        {/* Hero Title & Pill with Staggered Entrance */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5F8F6B]/15 text-[#3F6B4D] text-xs font-bold shadow-xs border border-[#5F8F6B]/20 animate-pop-in">
            <img src="/logo.svg" alt="Logo" className="w-4 h-4 rounded-md shrink-0 shadow-xs" />
            <span>SiPontren - Sistem Manajemen Pondok Pesantren</span>
          </div>

          <div className="animate-slide-up delay-75 space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#29221C] tracking-tight">
              Selamat Datang di <span className="text-[#5F8F6B] drop-shadow-xs">SiPontren</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6F5F50] leading-relaxed max-w-sm mx-auto">
              Portal pemantauan kedisiplinan dan perizinan santri pondok pesantren.
            </p>
          </div>
        </div>

        {/* Card Input Kode Akses Wali */}
        <div className="clay-card p-6 sm:p-7 border-2 border-[#D9B99B]/50 space-y-4 text-left shadow-xl hover-lift animate-slide-up delay-150 transition-all">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8D5C4]/60">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5F8F6B]/25 to-[#5F8F6B]/10 text-[#3D6649] flex items-center justify-center shadow-xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-base text-[#2E251E]">
                Portal Wali Santri
              </h2>
              <span className="text-[11px] text-[#7A6959]">
                Buka data ananda dengan memasukkan kode dari pengurus.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitKode} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#4B3C2F] mb-1">
                Masukkan 10 Karakter Kode Akses:
              </label>
              <input
                type="text"
                maxLength={10}
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="Contoh: K7N4M9X2WP"
                className="w-full p-3 font-mono text-center tracking-widest text-lg font-black uppercase rounded-2xl bg-[#FBF7F0] border-2 border-[#E8D5C4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#5F8F6B] shadow-inner transition-all"
              />
            </div>

            <button
              type="submit"
              className="clay-btn clay-btn-primary w-full py-3.5 text-sm font-bold gap-2 cursor-pointer shadow-md hover-lift active:scale-95 transition-all"
            >
              <span>Buka Informasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Decorative Feature Badges */}
        <div className="flex items-center justify-center gap-2 pt-1 animate-slide-up delay-200">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/70 border border-[#E8D5C4] text-[11px] font-semibold text-[#665444] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5F8F6B]" />
            <span>Akses Mandiri</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/70 border border-[#E8D5C4] text-[11px] font-semibold text-[#665444] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E69F40]" />
            <span>Format Rapi</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/70 border border-[#E8D5C4] text-[11px] font-semibold text-[#665444] shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#5F8F6B]" />
            <span>Realtime</span>
          </span>
        </div>

        <p className="text-[11px] text-[#867566] animate-slide-up delay-250">
          * Wali santri cukup membuka tautan langsung dari WhatsApp pengurus atau mengetik kode.
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-[#8A796A] border-t border-[#E8D5C4]/50">
        © 2026 SiPontren — Sistem Manajemen Santri & Portal Wali
      </footer>

      {/* Modal Login Pengurus */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Masuk Pengurus Pesantren"
        subtitle="Masukkan email dan kata sandi akun"
        maxWidth="sm"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4B3C2F] mb-1">
              Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7B6B]" />
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="masukkan email"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-[#FBF7F0] border border-[#E8D5C4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#5F8F6B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4B3C2F] mb-1">
              Kata Sandi *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7B6B]" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Masukkan kata sandi akun"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-[#FBF7F0] border border-[#E8D5C4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#5F8F6B]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-[#6D5D4E] hover:bg-black/5 rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="clay-btn clay-btn-primary py-2.5 px-5 text-xs font-bold cursor-pointer"
            >
              {isLoggingIn ? 'Memverifikasi...' : 'Masuk Sekarang'}
            </button>
          </div>
        </form>
      </Modal>

      {/* OVERLAY ANIMASI MOTION GRAPHIC MASUK DASHBOARD */}
      {isTransitioningToDashboard && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1B1612]/85 backdrop-blur-md text-white select-none animate-fade-in">
          {/* Subtle Islamic Geometric Radial Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(#5F8F6B_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm px-6 text-center animate-motion-zoom space-y-4">
            {/* Motion Graphic Dual Orbital Ring & Glowing Seal */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Cincin Orbital Luar - Berputar Searah Jarum Jam */}
              <svg className="absolute inset-0 w-full h-full animate-orbital pointer-events-none" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#5F8F6B"
                  strokeWidth="1.5"
                  strokeDasharray="8 6 14 6"
                  strokeOpacity="0.6"
                />
              </svg>

              {/* Cincin Orbital Dalam - Berputar Berlawanan Arah */}
              <svg className="absolute inset-2 w-24 h-24 animate-orbital-reverse pointer-events-none" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#F6B98A"
                  strokeWidth="1"
                  strokeDasharray="4 8 12 4"
                  strokeOpacity="0.5"
                />
              </svg>

              {/* Pulsing Aura */}
              <div className="absolute inset-2 rounded-full bg-[#5F8F6B]/30 blur-lg animate-pulse" />

              {/* Emblem Tengah dengan Checkmark Animasi */}
              <div className="relative w-18 h-18 rounded-full bg-gradient-to-tr from-[#315E3C] via-[#4F845C] to-[#7BB88A] flex items-center justify-center text-white shadow-[0_0_25px_rgba(95,143,107,0.7)] border-2 border-white/50 animate-pop-in">
                <CheckCircle2 className="w-9 h-9 drop-shadow-md animate-fade-in" />
              </div>
            </div>

            <div className="space-y-1.5 pt-1 animate-slide-up delay-75">
              <span className="text-[10px] font-black tracking-widest uppercase text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                Otentikasi Berhasil
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                Ahlan wa Sahlan!
              </h3>
              <p className="text-xs text-white/80">
                Selamat datang kembali, Pengurus Pesantren.
              </p>
              {loggedUser?.email && (
                <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-emerald-200 shadow-inner">
                  {loggedUser.email}
                </div>
              )}
            </div>

            {/* Kinetic Shimmer Progress Bar */}
            <div className="w-56 h-2 bg-white/15 rounded-full overflow-hidden mt-3 shadow-inner border border-white/10 animate-slide-up delay-150">
              <div className="h-full bg-gradient-to-r from-[#4E8E5E] via-[#A3E3B2] to-[#4E8E5E] rounded-full animate-[shimmerGlow_0.9s_infinite] w-full" />
            </div>

            <span className="text-[11px] text-emerald-200/90 font-medium tracking-wide animate-pulse">
              Membuka Dasbor SiPontren...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
