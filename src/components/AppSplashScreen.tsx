import React, { useEffect, useState } from 'react';

interface AppSplashScreenProps {
  onFinish?: () => void;
}

export const AppSplashScreen: React.FC<AppSplashScreenProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'loading' | 'finishing' | 'hidden'>('loading');
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Menginisialisasi Sistem Pesantren...');
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Timeline Motion Graphic (~3 detik durasi total)
    // 0.0s - 0.7s: Reveal Logo Kubah & Ring Orbital
    // 0.7s - 1.6s: Reveal Teks Besar SiPontren + Laser Sweep
    // 1.6s - 2.5s: Progress Bar Sinkronisasi Data (78% -> 100%)
    // 2.7s - 3.1s: Cinematic Camera Dissolve & Fade Out

    const t1 = setTimeout(() => {
      setProgress(48);
      setStatusText('Sinkronisasi Basis Data Santri & Kelas...');
      setStepIndex(1);
    }, 850);

    const t2 = setTimeout(() => {
      setProgress(82);
      setStatusText('Menyiapkan Portal Wali & Modul Perizinan...');
      setStepIndex(2);
    }, 1750);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Ahlan wa Sahlan di SiPontren');
      setStepIndex(3);
    }, 2450);

    const t4 = setTimeout(() => {
      setPhase('finishing');
    }, 2850);

    const t5 = setTimeout(() => {
      setPhase('hidden');
      if (onFinish) onFinish();
    }, 3250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  const handleSkip = () => {
    if (phase === 'loading') {
      setProgress(100);
      setStatusText('Ahlan wa Sahlan di SiPontren');
      setPhase('finishing');
      setTimeout(() => {
        setPhase('hidden');
        if (onFinish) onFinish();
      }, 200);
    }
  };

  if (phase === 'hidden') return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#F5EFE6] via-[#FBF5EA] to-[#F2E8DC] text-[#2C241E] select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        phase === 'finishing'
          ? 'opacity-0 scale-105 pointer-events-none filter blur-[2px]'
          : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'opacity, transform, filter' }}
      title="Klik untuk lewati animasi"
    >
      {/* Dynamic Background: Ambient Radial Glow & Islamic Geometric Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Ambient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#5F8F6B]/15 via-[#F6B98A]/10 to-transparent blur-3xl animate-halo-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#5F8F6B]/20 blur-2xl animate-pulse-gentle" />

        {/* Micro Islamic Star Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#457453_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      </div>

      {/* Main Motion Graphic Composition */}
      <div className="relative flex flex-col items-center px-4 text-center max-w-xl w-full z-10">
        
        {/* Arabic Calligraphy Basmalah Ornament */}
        <div className="overflow-hidden mb-3 animate-fade-in">
          <p className="font-serif text-xs sm:text-sm text-[#4E7A5A] tracking-widest opacity-90 select-none">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* 1. Cinematic Animated Logo with Orbital Geometric Rings */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Geometric Orbital Ring (Clockwise) */}
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#5F8F6B]/35 animate-orbital pointer-events-none" />
          
          {/* Inner Counter-Orbital Ring with Golden Nodes */}
          <div className="absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full border border-[#D9A779]/30 animate-orbital-reverse pointer-events-none flex items-center justify-between px-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5F8F6B] shadow-sm" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B98A] shadow-sm" />
          </div>

          {/* Central Logo Emblem with Spring Pop */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#6AA078] via-[#51825D] to-[#365A40] p-3.5 shadow-[0_18px_40px_rgba(79,129,91,0.38),0_0_30px_rgba(95,143,107,0.25)] flex items-center justify-center animate-logo-spring">
            {/* Gloss Highlight on Emblem */}
            <div className="absolute inset-x-2 top-1 h-3 rounded-t-2xl bg-white/20 blur-[1px] pointer-events-none" />

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kubah Utama */}
              <path
                d="M50 16 C36 28 26 40 26 58 C26 76 37 84 50 84 C63 84 74 76 74 58 C74 40 64 28 50 16 Z"
                fill="#FAF2E8"
              />
              {/* Gerbang Lengkung Pesantren */}
              <path
                d="M38 84 L38 60 C38 52 43 47 50 47 C57 47 62 52 62 60 L62 84 Z"
                fill="#2E5039"
              />
              {/* Puncak Menara Kubah (Kuning Emas) */}
              <circle cx="50" cy="15" r="4.5" fill="#F6B98A" />
              <path
                d="M50 8 L50 12"
                stroke="#F6B98A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Garis Pusat Pintu Gerbang */}
              <line
                x1="50"
                y1="49"
                x2="50"
                y2="84"
                stroke="#5F8F6B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 2. TEKS BESAR HASIL MOTION GRAPHIC (After Effects Code Style) */}
        <div className="relative flex flex-col items-center">
          {/* Main Huge Typography with Kinetic Blur & Tracking */}
          <div className="relative inline-block overflow-hidden py-1 px-4">
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight sm:tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#243E2B] via-[#4A7A56] to-[#1E3324] drop-shadow-[0_4px_12px_rgba(36,62,43,0.15)] animate-motion-title">
              SiPontren
            </h1>
            {/* Dynamic Light Shimmer Sweep across the big text */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full"
              style={{
                animation: 'shimmerTextSweep 2s ease-in-out infinite 0.7s',
                backgroundSize: '200% 100%'
              }}
            />
          </div>

          {/* Glowing Kinetic Laser Line */}
          <div className="w-48 sm:w-72 h-[2px] my-2 bg-gradient-to-r from-transparent via-[#5F8F6B] to-transparent relative animate-laser-line">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F6B98A] shadow-[0_0_8px_#F6B98A]" />
          </div>

          {/* Kinetic Tracked Subtitle */}
          <p className="font-heading font-bold text-[10px] sm:text-xs md:text-sm uppercase text-[#4D4135] tracking-[0.22em] sm:tracking-[0.28em] animate-kinetic-subtitle">
            Sistem Manajemen Santri &amp; Portal Wali
          </p>
        </div>

        {/* 3. High-Tech Precision Loader & Status Ticker */}
        <div className="mt-8 flex flex-col items-center w-64 sm:w-80 animate-fade-in delay-200">
          {/* Track Bar with Glow Head */}
          <div className="relative w-full h-2 bg-[#E7DCce] rounded-full overflow-hidden shadow-inner p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4E7A5A] via-[#6FA77C] to-[#5F8F6B] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing Leading Edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/70 rounded-full blur-[1px]" />
            </div>
          </div>

          {/* Metric Counter & Status Bar */}
          <div className="flex items-center justify-between w-full mt-2.5 px-1 text-xs">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F8F6B] animate-ping" />
              <span className="text-[11px] sm:text-xs font-medium text-[#6B5A4B] truncate max-w-[190px] sm:max-w-[220px]">
                {statusText}
              </span>
            </div>
            <span className="font-mono tabular-nums font-bold text-[11px] sm:text-xs text-[#3C5D44]">
              {progress}%
            </span>
          </div>
        </div>

        {/* 4. Subtle Skip Affordance */}
        <div className="mt-7 text-[10px] sm:text-[11px] text-[#A69584] hover:text-[#5F8F6B] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
          <span>Ketuk layar untuk lewati</span>
          <span className="text-xs">↷</span>
        </div>
      </div>
    </div>
  );
};
