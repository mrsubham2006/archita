import React, { useState, useEffect } from 'react';
import { PartyPopper, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti } from '../utils/confetti';

interface NavbarProps {
  onSurpriseOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSurpriseOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    setIsMuted(!isMuted);
    window.dispatchEvent(new CustomEvent('toggle-background-audio'));
    soundEngine.playPop();
  };

  const navItems = [
    { label: 'Surprise', href: '#' },
    { label: '02•11•2006', href: '#countdown-section' },
    { label: 'Letter', href: '#letter-section' },
    { label: 'Memories', href: '#gallery-section' },
    { label: 'Why Special', href: '#reasons-section' },
    { label: 'Cake', href: '#cake-section' },
    { label: 'Surprises', href: '#surprises-section' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-purple-950/80 backdrop-blur-md border-b border-pink-500/20 shadow-lg shadow-purple-950/50 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#"
          onClick={() => {
            soundEngine.playPop();
          }}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">🎀</span>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white font-cute drop-shadow">
              ARCHITA <span className="text-pink-400 font-script font-bold text-xl drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">(Lusi)</span>
            </span>
            <span className="text-[10px] text-pink-300/90 font-bold uppercase tracking-widest hidden sm:block">
              Pookie Birthday Wonderland ♡
            </span>
          </div>
        </a>

        {/* Quick Nav Links (hidden on mobile, visible on desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-purple-900/40 backdrop-blur-md p-1 rounded-full border border-pink-500/20 text-xs font-bold text-pink-200">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => soundEngine.playPop()}
              className="px-3 py-1.5 rounded-full hover:bg-pink-500/20 hover:text-white transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Subtle Sound Mute/Unmute in Navbar */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-purple-900/60 border border-pink-500/30 shadow-sm text-pink-300 hover:bg-pink-500/20 hover:text-white hover:scale-105 active:scale-95 transition-all"
            title={isMuted ? "Unmute O Maahi" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-400/60" /> : <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />}
          </button>

          {/* Quick Celebration Confetti Trigger */}
          <button
            onClick={() => {
              soundEngine.playHeartSound();
              firePinkHeartConfetti();
            }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PartyPopper className="w-3.5 h-3.5 text-amber-200" />
            <span>Cheer 💗</span>
          </button>
        </div>
      </div>
    </header>
  );
};
