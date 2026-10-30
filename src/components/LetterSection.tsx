import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, FastForward } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti } from '../utils/confetti';

const FULL_LETTER_TEXT = `Dear Lusi,

You are one of those rare people who make the world feel a little softer, brighter and more beautiful.

May your life always be filled with endless happiness, warm hugs, beautiful memories, unexpected surprises and all the love your heart deserves.

Never stop smiling, never stop being your adorable self, and always remember how special you are.

Happy Birthday, Archita! You deserve all the magic in this universe. 🎀

With lots of love ♡`;

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showSecretHeart, setShowSecretHeart] = useState(false);

  // Realistic Typewriter effect when envelope opens
  useEffect(() => {
    if (!isOpen) {
      setTypedChars(0);
      setIsTypingComplete(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= FULL_LETTER_TEXT.length) {
        setTypedChars(FULL_LETTER_TEXT.length);
        setIsTypingComplete(true);
        clearInterval(interval);
      } else {
        setTypedChars(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleToggleEnvelope = () => {
    if (!isOpen) {
      soundEngine.playChime();
      firePinkHeartConfetti();
      setIsOpen(true);
    } else {
      soundEngine.playPop();
      setIsOpen(false);
    }
  };

  const handleSkipTyping = () => {
    setTypedChars(FULL_LETTER_TEXT.length);
    setIsTypingComplete(true);
    soundEngine.playPop();
  };

  const handleSecretHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSecretHeart(!showSecretHeart);
    soundEngine.playHeartSound();
    firePinkHeartConfetti();
  };

  const visibleText = FULL_LETTER_TEXT.slice(0, typedChars);

  return (
    <section id="letter-section" className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-400/30 mb-3 shadow-lg shadow-purple-950/50 backdrop-blur-md"
          >
            <Mail className="w-3.5 h-3.5 text-pink-400" />
            <span>Airmail Special Delivery</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute">
            A Little Letter for My Favourite Human 💌
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 font-medium mt-2">
            Click the wax seal to unseal this heartfelt birthday message written exclusively for you.
          </p>
        </div>

        {/* Envelope Interactive Area */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center">
            {/* The Envelope Graphic */}
            <motion.div
              className="relative w-full max-w-lg aspect-[16/10] bg-gradient-to-br from-pink-950/80 via-purple-900/80 to-pink-900/90 rounded-3xl p-5 shadow-2xl shadow-pink-500/20 border-2 border-pink-400/40 cursor-pointer select-none overflow-hidden backdrop-blur-xl group"
              onClick={handleToggleEnvelope}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Envelope Flap Triangles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-purple-500/20" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/5 border-t border-pink-400/30" />
              </div>

              {/* Postal Stamp & Markings */}
              <div className="absolute top-4 right-5 flex flex-col items-center">
                <div className="w-14 h-16 bg-purple-950/90 rounded-lg border-2 border-dashed border-pink-400/70 p-1 flex flex-col items-center justify-center shadow-md rotate-3">
                  <span className="text-xl">🎀</span>
                  <span className="text-[9px] font-black text-pink-300 mt-1 uppercase tracking-tighter">
                    LUSI • 02/11
                  </span>
                </div>
                <div className="text-[9px] text-pink-300/80 font-bold uppercase tracking-widest mt-1">
                  COSMIC AIRMAIL
                </div>
              </div>

              {/* To: Label on envelope face */}
              <div className="absolute bottom-6 left-7">
                <p className="text-[11px] font-bold text-pink-400 uppercase tracking-widest">To:</p>
                <p className="text-2xl font-bold text-pink-100 font-script drop-shadow">
                  Archita (My Little Pookie Lusi) 🌸
                </p>
                <p className="text-xs text-pink-300/70 font-medium">
                  Destination: The Warmest Corner of the Universe ♡
                </p>
              </div>

              {/* Small Hidden Heart Easter Egg on the envelope corner */}
              <button
                onClick={handleSecretHeartClick}
                className="absolute top-4 left-5 p-1 text-pink-400/60 hover:text-pink-300 hover:scale-130 transition-transform"
                title="A tiny hidden secret heart..."
              >
                <Heart className="w-3.5 h-3.5 fill-pink-500/40" />
              </button>

              {/* Wax Seal Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-600 to-purple-500 shadow-xl shadow-pink-600/50 border-4 border-pink-200/80 flex items-center justify-center cursor-pointer text-white animate-glow"
                  animate={{ scale: isOpen ? 0.9 : [1, 1.08, 1] }}
                  transition={{ repeat: isOpen ? 0 : Infinity, duration: 2.2 }}
                >
                  <Heart className={`w-8 h-8 fill-white ${isOpen ? 'rotate-45' : ''} transition-transform`} />
                </motion.div>
                {!isOpen && (
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-pink-100 whitespace-nowrap bg-purple-950/90 px-3 py-0.5 rounded-full border border-pink-400/40 shadow-sm">
                    Tap to Open 💗
                  </span>
                )}
              </div>
            </motion.div>

            {/* Secret Hidden Message Modal / Tooltip */}
            <AnimatePresence>
              {showSecretHeart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="my-3 p-4 rounded-2xl bg-gradient-to-r from-purple-900/90 to-pink-900/90 border border-pink-300 text-pink-100 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-xl text-center max-w-md"
                >
                  <span>✨ Secret Whisper: You found the hidden heart! You make ordinary days feel like poetry, Lusi! 💖</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unfolded Letter Sheet with Realistic Typewriter Animation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 15, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="relative w-full max-w-xl bg-[#fffefc] rounded-3xl p-8 sm:p-12 shadow-2xl shadow-pink-500/20 border-2 border-pink-200 text-neutral-900 my-6"
                  style={{
                    backgroundImage: 'radial-gradient(#fbcfe8 0.75px, transparent 0.75px)',
                    backgroundSize: '16px 16px',
                  }}
                >
                  {/* Decorative Washi Tape on top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 bg-pink-300/90 backdrop-blur-sm transform -rotate-1 rounded-sm shadow-sm flex items-center justify-center border-l-2 border-r-2 border-dashed border-pink-400">
                    <span className="text-[10px] text-pink-950 font-bold uppercase tracking-widest">
                      WITH ALL MY LOVE
                    </span>
                  </div>

                  {/* Corner floral decorations */}
                  <span className="absolute top-4 right-6 text-2xl select-none">🌸</span>
                  <span className="absolute bottom-4 left-6 text-2xl select-none">🍓</span>

                  {/* Skip Typewriter Button */}
                  {!isTypingComplete && (
                    <button
                      onClick={handleSkipTyping}
                      className="absolute top-4 left-6 text-[11px] font-bold text-pink-600 hover:text-pink-800 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200 flex items-center gap-1"
                    >
                      <FastForward className="w-3 h-3" /> Show All
                    </button>
                  )}

                  {/* Typewriter Display Area */}
                  <div className="min-h-[260px] pt-4">
                    <div className="text-base sm:text-lg text-pink-950 font-handwriting leading-relaxed sm:leading-loose tracking-wide whitespace-pre-wrap">
                      {visibleText}
                      {!isTypingComplete && (
                        <span className="inline-block w-2 h-5 bg-pink-500 ml-1 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>

                  {/* Sign-off & Actions */}
                  <div className="mt-8 pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-pink-400 font-bold">Forever & Always,</p>
                      <p className="text-2xl font-bold font-script text-pink-600">
                        With lots of love ♡
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          soundEngine.playHeartSound();
                          firePinkHeartConfetti();
                        }}
                        className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        Send Love Reaction
                      </button>

                      <button
                        onClick={handleToggleEnvelope}
                        className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all"
                      >
                        Fold Letter
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
