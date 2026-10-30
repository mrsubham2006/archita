import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, RotateCcw, Heart, Cake } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti, fireGrandFireworks } from '../utils/confetti';

export const CakeSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [hasMadeWish, setHasMadeWish] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSaved, setWishSaved] = useState(false);

  const handleBlowAll = () => {
    soundEngine.playBlow();
    setCandlesLit([false, false, false, false, false]);
    setHasMadeWish(true);

    setTimeout(() => {
      soundEngine.playCheer();
      firePinkHeartConfetti();
      fireGrandFireworks();
    }, 400);
  };

  const toggleSingleCandle = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (!updated[index]) {
      soundEngine.playBlow();
    } else {
      soundEngine.playPop();
    }

    if (updated.every(lit => !lit)) {
      setHasMadeWish(true);
      setTimeout(() => {
        soundEngine.playCheer();
        firePinkHeartConfetti();
      }, 300);
    }
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true, true, true]);
    setHasMadeWish(false);
    setWishSaved(false);
    soundEngine.playPop();
  };

  const handleSaveSecretWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setWishSaved(true);
    soundEngine.playHeartSound();
    firePinkHeartConfetti();
  };

  return (
    <section id="cake-section" className="py-24 px-4 relative z-20 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-400/30 mb-3 backdrop-blur-md"
        >
          <Cake className="w-4 h-4 text-pink-400" />
          <span>The Sweet Ritual</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute">
          The Birthday Cake Surprise 🎂🎀
        </h2>
        <p className="text-sm sm:text-base text-pink-200/80 font-medium max-w-lg mt-2">
          A three-tier dreamy strawberry cake baked with all our love! Close your eyes, think of your sweetest dream, and blow out the candles!
        </p>

        {/* 3D Layered Pink Birthday Cake Graphic Container */}
        <div className="relative my-10 sm:my-14 w-72 sm:w-96 flex flex-col items-center justify-end">
          {/* Floating strawberries and hearts around cake */}
          <motion.span
            className="absolute -top-10 -left-6 sm:-left-12 text-3xl select-none filter drop-shadow-[0_0_12px_#f43f5e]"
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🍓
          </motion.span>
          <motion.span
            className="absolute top-1/4 -right-6 sm:-right-10 text-3xl select-none filter drop-shadow-[0_0_12px_#ec4899]"
            animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          >
            💖
          </motion.span>
          <motion.span
            className="absolute bottom-12 -left-8 text-3xl select-none filter drop-shadow-[0_0_12px_#e879f9]"
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
          >
            🧁
          </motion.span>

          {/* CANDLES ROW */}
          <div className="flex justify-center items-end gap-5 sm:gap-7 z-30 mb-[-6px]">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => toggleSingleCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Click to blow out candle' : 'Click to light candle'}
              >
                {/* Flame / Smoke */}
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.95, 1], rotate: [-3, 3, -2, 2] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="relative"
                      >
                        {/* Realistic Glow halo */}
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-90 scale-175 animate-pulse" />
                        <div className="absolute -inset-1 bg-rose-400 rounded-full blur-lg opacity-60 animate-ping" />
                        {/* Outer Flame */}
                        <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full shadow-lg relative z-10" />
                        {/* Inner Wick light */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full z-20" />
                      </motion.div>
                    ) : (
                      /* Smoke curl */
                      <motion.div
                        initial={{ opacity: 0.8, y: 0 }}
                        animate={{ opacity: 0, y: -18, x: idx % 2 === 0 ? 5 : -5 }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
                        className="text-xs text-pink-300 font-bold select-none"
                      >
                        ☁️
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div
                  className="w-3.5 h-12 rounded-t-sm shadow-sm relative overflow-hidden"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'repeating-linear-gradient(45deg, #f472b6, #f472b6 4px, #ffffff 4px, #ffffff 8px)'
                        : 'repeating-linear-gradient(-45deg, #fb7185, #fb7185 4px, #fef08a 4px, #fef08a 8px)',
                  }}
                >
                  <div className="w-0.5 h-2 bg-neutral-800 mx-auto -mt-1 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* LAYER 1: Top Cake Tier (Small) */}
          <div className="relative z-20 w-36 sm:w-44 h-16 bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 rounded-t-2xl border-2 border-white shadow-xl flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/95 rounded-t-2xl flex justify-around px-2">
              <div className="w-3 h-4 bg-white rounded-b-full shadow-sm" />
              <div className="w-3.5 h-5 bg-white rounded-b-full shadow-sm" />
              <div className="w-3 h-3 bg-white rounded-b-full shadow-sm" />
              <div className="w-3 h-4 bg-white rounded-b-full shadow-sm" />
            </div>
            <div className="flex gap-2 text-sm z-10">
              <span>🍓</span>
              <span>🎀</span>
              <span>🍓</span>
            </div>
          </div>

          {/* LAYER 2: Middle Cake Tier (Medium) */}
          <div className="relative z-10 w-52 sm:w-64 h-20 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-t-2xl border-2 border-white shadow-xl flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-5 bg-white/95 rounded-t-2xl flex justify-around px-4">
              <div className="w-4 h-5 bg-white rounded-b-full shadow-sm" />
              <div className="w-5 h-7 bg-white rounded-b-full shadow-sm" />
              <div className="w-4 h-4 bg-white rounded-b-full shadow-sm" />
              <div className="w-5 h-6 bg-white rounded-b-full shadow-sm" />
              <div className="w-4 h-4 bg-white rounded-b-full shadow-sm" />
            </div>
            <div className="flex items-center gap-3 text-white font-script text-xl z-10 pt-2 drop-shadow">
              <span>♡ Archita ♡</span>
            </div>
          </div>

          {/* LAYER 3: Bottom Cake Tier (Large) */}
          <div className="relative w-68 sm:w-80 h-24 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 rounded-t-3xl border-2 border-white shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute bottom-1 inset-x-0 flex justify-around px-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-white/90 shadow-sm" />
              ))}
            </div>
            <div className="text-white/95 font-bold tracking-widest text-xs uppercase flex items-center gap-2 drop-shadow">
              <span>🍓</span>
              <span>Sweet 20th Celebration</span>
              <span>🍓</span>
            </div>
          </div>

          {/* Cake Stand Tray */}
          <div className="relative w-80 sm:w-96 h-5 bg-gradient-to-r from-gray-100 via-pink-100 to-gray-200 rounded-full shadow-2xl border border-pink-200 flex items-center justify-center">
            <div className="w-24 h-6 bg-pink-100/80 rounded-b-2xl border-x border-b border-pink-200 shadow-md" />
          </div>
        </div>

        {/* Celebration Wish Banner Reveal */}
        <AnimatePresence>
          {hasMadeWish && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="my-6 p-6 sm:p-8 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-3xl shadow-2xl shadow-pink-500/50 max-w-lg border-4 border-white/60 text-center"
            >
              <div className="text-4xl mb-2 animate-bounce">🎀 ✨ 🎂</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                MAY ALL YOUR WISHES COME TRUE, LUSI! 💗
              </h3>
              <p className="text-xs sm:text-sm text-pink-100 mt-2 font-medium leading-relaxed">
                Your wish has been caught by fairy stars and sealed with cosmic love. 2026 is going to be your sweetest, happiest year yet!
              </p>

              {/* Secret Wish Diary Box */}
              {!wishSaved ? (
                <form onSubmit={handleSaveSecretWish} className="mt-5 space-y-2">
                  <p className="text-xs text-pink-200 font-bold uppercase tracking-wider">
                    Whisper your secret birthday wish here:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      placeholder="e.g. Endless happiness, cozy memories & dreams..."
                      className="flex-1 px-4 py-2 rounded-xl text-xs sm:text-sm bg-white text-pink-900 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-300 hover:bg-amber-400 text-pink-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Lock Wish 🔒
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 p-3 bg-white/20 rounded-xl text-xs font-bold text-amber-200 flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 fill-amber-200" />
                  Your secret wish is locked in the cosmic vault forever! ♡
                </div>
              )}

              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={handleRelight}
                  className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Relight Candles & Wish Again
                </button>
                <button
                  onClick={() => {
                    soundEngine.playCheer();
                    firePinkHeartConfetti();
                  }}
                  className="px-4 py-2 rounded-full bg-white text-pink-600 text-xs font-bold hover:bg-pink-50 transition-all shadow-md cursor-pointer"
                >
                  Cheer For Archita! 🎉
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wish Button */}
        {!hasMadeWish && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              onClick={handleBlowAll}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 animate-glow cursor-pointer"
            >
              <Wind className="w-6 h-6 text-pink-100" />
              <span>Make a Wish & Blow Candles 🎂💗</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </button>
            <p className="text-xs text-pink-300 font-medium">
              (You can also click individual candles to blow them out one by one!)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
