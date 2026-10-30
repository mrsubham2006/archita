import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, ArrowDown, Stars, PartyPopper } from 'lucide-react';
import { firePinkHeartConfetti, fireGrandFireworks } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  isOpened: boolean;
  setIsOpened: (val: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, isOpened, setIsOpened }) => {
  const [isHoveringBear, setIsHoveringBear] = useState(false);

  const handleOpenSurprise = () => {
    setIsOpened(true);
    soundEngine.playCheer();
    firePinkHeartConfetti();
    window.dispatchEvent(new CustomEvent('start-pookie-music'));
    setTimeout(() => {
      fireGrandFireworks();
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden text-center">
      {/* Background radial cosmic glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[280px] h-[280px] bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-8 sm:left-20 animate-float-slow hidden sm:block">
        <span className="text-4xl filter drop-shadow-[0_0_12px_#ec4899]">🎀</span>
      </div>
      <div className="absolute top-16 right-8 sm:right-24 animate-float-reverse hidden sm:block">
        <span className="text-4xl filter drop-shadow-[0_0_12px_#fde047]">✨</span>
      </div>
      <div className="absolute bottom-20 left-10 sm:left-24 animate-float-slow hidden sm:block">
        <span className="text-3xl filter drop-shadow-[0_0_12px_#f43f5e]">🍓</span>
      </div>
      <div className="absolute bottom-24 right-10 sm:right-28 animate-float-reverse hidden sm:block">
        <span className="text-4xl filter drop-shadow-[0_0_12px_#e879f9]">🧁</span>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* Cute Top Ribbon Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-pink-400/40 shadow-lg shadow-purple-950/60 text-pink-200 text-xs sm:text-sm font-bold mb-6"
        >
          <span className="text-base">🎀</span>
          <span>Archita's Magical Birthday Celebration</span>
          <span className="text-base">🌸</span>
        </motion.div>

        {/* Main Heading with Bows */}
        <div className="relative inline-block mb-3">
          <motion.span
            className="absolute -top-7 -left-9 text-3xl sm:text-4xl filter drop-shadow-[0_0_15px_#ec4899] select-none"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            🎀
          </motion.span>
          <motion.span
            className="absolute -top-7 -right-9 text-3xl sm:text-4xl filter drop-shadow-[0_0_15px_#ec4899] select-none"
            animate={{ rotate: [8, -8, 8] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            🎀
          </motion.span>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            HEY MY LITTLE POOKIE,{' '}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-300 bg-clip-text text-transparent underline decoration-pink-400 decoration-wavy decoration-2">
              LUSI!
            </span>{' '}
            🎀
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-pink-200/90 font-medium max-w-2xl font-serif-dreamy italic mb-8"
        >
          "Today, the universe celebrates someone as magical as you."
        </motion.p>

        {/* Center Stage: Interactive Teddy & Huge Pink Gift Box */}
        <div className="relative my-2 sm:my-4 flex flex-col items-center">
          {/* Animated Cute Teddy Bear holding mini cake */}
          <motion.div
            className="relative cursor-pointer mb-2"
            onHoverStart={() => {
              setIsHoveringBear(true);
              soundEngine.playPop();
            }}
            onHoverEnd={() => setIsHoveringBear(false)}
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            {/* Teddy speech bubble when hovering */}
            <AnimatePresence>
              {isHoveringBear && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-purple-950/95 text-pink-100 px-3.5 py-1.5 rounded-2xl shadow-xl border border-pink-400/50 text-xs font-bold whitespace-nowrap z-30 backdrop-blur-md"
                >
                  "Happy Birthday Lusi Pookie! 🧸🎂"
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cute Teddy Bear SVG Art holding a birthday cake */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {/* Ears */}
                <circle cx="55" cy="55" r="28" fill="#d97706" />
                <circle cx="55" cy="55" r="16" fill="#fde68a" />
                <circle cx="145" cy="55" r="28" fill="#d97706" />
                <circle cx="145" cy="55" r="16" fill="#fde68a" />
                
                {/* Bow on right ear */}
                <path d="M 130 35 C 120 25, 120 45, 130 38 C 140 30, 145 42, 133 42" fill="#f43f5e" />
                <circle cx="130" cy="38" r="4" fill="#fb7185" />
                
                {/* Head */}
                <ellipse cx="100" cy="90" rx="60" ry="52" fill="#f59e0b" />
                
                {/* Cheeks */}
                <circle cx="70" cy="100" r="10" fill="#fbcfe8" opacity="0.8" />
                <circle cx="130" cy="100" r="10" fill="#fbcfe8" opacity="0.8" />
                
                {/* Eyes */}
                <circle cx="78" cy="82" r="6" fill="#1e1b4b" />
                <circle cx="80" cy="80" r="2" fill="#ffffff" />
                <circle cx="122" cy="82" r="6" fill="#1e1b4b" />
                <circle cx="124" cy="80" r="2" fill="#ffffff" />
                
                {/* Snout */}
                <ellipse cx="100" cy="96" rx="20" ry="15" fill="#fef3c7" />
                <ellipse cx="100" cy="91" rx="8" ry="6" fill="#78350f" />
                <path d="M 100 97 L 100 103 M 94 102 Q 100 108 106 102" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                
                {/* Body */}
                <ellipse cx="100" cy="155" rx="50" ry="42" fill="#d97706" />
                <ellipse cx="100" cy="158" rx="34" ry="28" fill="#fde68a" />
                
                {/* Arms holding cake */}
                <ellipse cx="62" cy="148" rx="15" ry="10" fill="#d97706" transform="rotate(-15 62 148)" />
                <ellipse cx="138" cy="148" rx="15" ry="10" fill="#d97706" transform="rotate(15 138 148)" />
                
                {/* Mini Birthday Cake */}
                <rect x="75" y="140" width="50" height="26" rx="6" fill="#fda4af" />
                <path d="M 75 145 Q 85 152 95 145 Q 105 152 115 145 Q 125 152 125 145" fill="#fff1f2" />
                {/* Candle */}
                <rect x="97" y="126" width="6" height="15" rx="2" fill="#fde047" />
                <ellipse cx="100" cy="122" rx="4" ry="6" fill="#f97316" className="animate-pulse" />
              </svg>
            </div>
          </motion.div>

          {/* THE GIANT PINK BIRTHDAY GIFT BOX & REAL PHOTO REVEAL */}
          <div className="relative w-72 sm:w-96 min-h-[300px] flex items-center justify-center">
            {/* Opened Reveal State with Archita's Real Picture */}
            <AnimatePresence>
              {isOpened ? (
                <motion.div
                  key="opened"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 100 }}
                  className="flex flex-col items-center justify-center p-6 glass-card rounded-3xl border-4 border-pink-400 shadow-2xl shadow-pink-500/40 text-center max-w-sm relative"
                >
                  {/* Floating Crown above photo */}
                  <motion.div
                    animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="text-4xl -mt-10 mb-1 filter drop-shadow-[0_0_12px_#facc15] select-none"
                  >
                    👑
                  </motion.div>

                  {/* Real Archita Photo in Heart Frame */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 shadow-xl mb-3 border-2 border-white/80">
                    <img
                      src="/assets/aistudio/image_eb3c8496.png"
                      alt="Archita (Lusi)"
                      className="w-full h-full object-cover rounded-full contrast-[1.06] brightness-[1.03]"
                    />
                    <div className="absolute bottom-1 right-2 text-xl select-none">
                      🎀
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 font-script tracking-wide">
                    HAPPY BIRTHDAY ARCHITA! ♡
                  </h3>

                  <p className="text-xs sm:text-sm text-pink-200 mt-1 leading-relaxed">
                    ✨ You unlocked your magical birthday surprise world, Lusi! Every single part of this place was built for you.
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        soundEngine.playChime();
                        firePinkHeartConfetti();
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-purple-900/80 text-pink-200 text-xs font-bold hover:bg-purple-800 transition-colors flex items-center gap-1 border border-pink-400/40"
                    >
                      <PartyPopper className="w-3.5 h-3.5 text-pink-400" /> More Confetti!
                    </button>
                    <button
                      onClick={onExploreClick}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-md shadow-pink-500/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1"
                    >
                      Explore Below <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Unopened 3D Gift Box */
                <motion.div
                  key="closed-box"
                  className="relative group cursor-pointer"
                  onClick={handleOpenSurprise}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Floating sparkles around box */}
                  <motion.span
                    className="absolute -top-4 -left-6 text-2xl"
                    animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    className="absolute -bottom-2 -right-6 text-2xl"
                    animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.3 }}
                  >
                    💖
                  </motion.span>

                  {/* 3D-effect Gift Box Container */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center justify-end">
                    {/* Big Bow on Top */}
                    <motion.div
                      className="relative z-20 -mb-4 flex items-center justify-center filter drop-shadow-[0_0_15px_#ec4899]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <span className="text-6xl sm:text-7xl">🎀</span>
                    </motion.div>

                    {/* Box Lid */}
                    <div className="relative z-10 w-52 sm:w-60 h-14 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-2xl shadow-2xl border-2 border-pink-300 flex items-center justify-center overflow-hidden">
                      {/* Ribbon across lid */}
                      <div className="w-8 h-full bg-white/95 shadow-[0_0_12px_#fff]" />
                      <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-white/40 to-transparent top-0" />
                    </div>

                    {/* Box Body */}
                    <div className="relative w-48 sm:w-56 h-40 sm:h-44 bg-gradient-to-b from-pink-400 via-rose-500 to-purple-700 rounded-b-3xl shadow-2xl border-x-2 border-b-2 border-pink-300 flex items-center justify-center overflow-hidden">
                      {/* Vertical Ribbon */}
                      <div className="w-8 h-full bg-white/95 shadow-[0_0_12px_#fff] flex items-center justify-center">
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                      </div>
                      {/* Horizontal Ribbon */}
                      <div className="absolute inset-x-0 h-8 bg-white/95 shadow-[0_0_12px_#fff] flex items-center justify-center">
                        <Stars className="w-4 h-4 text-pink-500" />
                      </div>

                      {/* Cute shine highlight */}
                      <div className="absolute top-2 left-3 w-16 h-8 bg-white/30 rounded-full blur-sm transform -rotate-12" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Glowing Button to Open Surprise if not already opened */}
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <button
              onClick={handleOpenSurprise}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 animate-glow cursor-pointer"
            >
              <Gift className="w-6 h-6 text-pink-100 group-hover:rotate-12 transition-transform" />
              <span>OPEN YOUR SURPRISE 💗</span>
              <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
            </button>
            <p className="text-xs text-pink-300 font-semibold tracking-wide">
              Click the box or button to unlock the magic ✨
            </p>
          </motion.div>
        )}

        {/* Quick Jump Navigator if already opened */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-center"
          >
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-950/80 border border-pink-400/40 text-pink-200 font-bold text-sm shadow-lg hover:bg-purple-900/90 hover:scale-105 transition-all"
            >
              <span>Scroll down to Archita's Wonderland</span>
              <ArrowDown className="w-4 h-4 text-pink-400 animate-bounce" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
