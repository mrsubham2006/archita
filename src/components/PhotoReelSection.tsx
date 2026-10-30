import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Crown, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti } from '../utils/confetti';

const REEL_PHOTOS = [
  {
    url: '/assets/aistudio/image_eb3c8496.png',
    title: 'The Iconic Mirror Portrait 👑',
    sub: 'Radiant smile, effortless beauty and pure confidence.',
    mood: 'Sunshine & Charm',
    quote: '"A smile that can turn any dark room into a festival of lights."',
  },
  {
    url: '/assets/aistudio/image_90ad7402.png',
    title: 'Fairycore Angel 🌸',
    sub: 'Soft aesthetic, golden warmth and dreamy gentle vibes.',
    mood: 'Pure Sweetness',
    quote: '"Gentle like morning dew, magical like fairy dust."',
  },
  {
    url: '/assets/aistudio/image_28c22b69.png',
    title: 'Pookie Gaze in Crimson ♡',
    sub: 'Deep dark eyes and that tender, unforgettable expression.',
    mood: 'Heart Stealer',
    quote: '"Some people leave a little sparkle wherever they go."',
  },
  {
    url: '/assets/aistudio/image_d881bddd.png',
    title: 'Lucy Butterfly Beats 🎧',
    sub: 'Casual chic, headphone vibes and that cozy smile.',
    mood: 'Cute & Iconic',
    quote: '"Listening to life’s sweetest melodies with the prettiest girl."',
  },
  {
    url: '/assets/aistudio/image_1fb6cbfa.png',
    title: 'Golden Hour Mystery 🧸',
    sub: 'Warm moody sunset tones and sweet laughter.',
    mood: 'Warm Romance',
    quote: '"Warm like a cup of hot chocolate on a rainy day."',
  },
  {
    url: '/assets/aistudio/image_73e78722.png',
    title: 'Floral Elegance 🌺',
    sub: 'Dressed in petals, forever our birthday princess.',
    mood: 'Royal Pookie',
    quote: '"Born to shine, born to be celebrated every single day."',
  },
];

export const PhotoReelSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % REEL_PHOTOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % REEL_PHOTOS.length);
    soundEngine.playPop();
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + REEL_PHOTOS.length) % REEL_PHOTOS.length);
    soundEngine.playPop();
  };

  const current = REEL_PHOTOS[currentIndex];

  return (
    <section className="py-20 px-4 relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-500/30 mb-3 backdrop-blur-md"
          >
            <Crown className="w-4 h-4 text-pink-400" />
            <span>Archita's Spotlight Reel</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cute drop-shadow-[0_0_20px_rgba(244,114,182,0.35)]">
            Lusi in Motion & High Clarity ✨
          </h2>
          <p className="text-sm sm:text-base text-pink-200/90 font-medium max-w-lg mx-auto mt-2">
            An animated high-definition cinematic showcase celebrating every facet of our favorite birthday girl!
          </p>
        </div>

        {/* Cinematic Card Layout */}
        <div className="relative bg-purple-950/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-pink-500/30 shadow-2xl shadow-purple-950/80 overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: High-Clarity Animated Image with Floating Accents */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-300/40 ring-4 ring-pink-500/20 bg-neutral-900 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={current.url}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover contrast-[1.08] brightness-[1.04] saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
                    style={{
                      imageRendering: 'auto',
                      objectPosition: 'center 20%',
                    }}
                  />
                </AnimatePresence>

                {/* Floating Corner Bow */}
                <div className="absolute top-3 left-3 text-3xl filter drop-shadow z-20">
                  🎀
                </div>

                {/* HD Tag Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider border border-white/20 z-20">
                  HD Clear 1080p
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-950/90 via-purple-950/40 to-transparent flex items-end p-4 pointer-events-none">
                  <span className="text-white font-script text-2xl drop-shadow-md">
                    Archita (Lusi) ♡
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Emotional Spotlight Details */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 text-pink-300 text-xs font-bold w-fit mx-auto lg:mx-0 mb-3 border border-pink-500/30">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>{current.mood}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-cute mb-2">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-pink-200/90 font-medium mb-6">
                {current.sub}
              </p>

              {/* Romantic Quote Card */}
              <div className="p-5 bg-purple-900/40 backdrop-blur-md rounded-2xl border border-pink-500/30 mb-6 relative shadow-inner">
                <span className="text-3xl text-pink-400 absolute -top-3 left-4 font-serif">“</span>
                <p className="font-handwriting text-xl sm:text-2xl text-pink-100 font-bold leading-relaxed px-2">
                  {current.quote}
                </p>
                <div className="text-right text-xs font-bold text-pink-400 uppercase tracking-wider mt-2">
                  — Dedicated to Lusi ♡
                </div>
              </div>

              {/* Navigation and Auto-play controls */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-purple-900/70 hover:bg-purple-800 text-pink-300 border border-pink-500/30 transition-transform hover:scale-105 active:scale-95"
                  title="Previous Snapshot"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="px-4 py-2.5 rounded-full bg-purple-900/70 border border-pink-500/30 text-pink-200 text-xs font-bold shadow-sm hover:bg-purple-800 transition-all flex items-center gap-1.5"
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-pink-400" /> : <Play className="w-3.5 h-3.5 text-pink-400" />}
                  <span>{isAutoPlay ? 'Pause Reel' : 'Play Slideshow'}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-purple-900/70 hover:bg-purple-800 text-pink-300 border border-pink-500/30 transition-transform hover:scale-105 active:scale-95"
                  title="Next Snapshot"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    soundEngine.playHeartSound();
                    firePinkHeartConfetti();
                  }}
                  className="ml-auto hidden sm:flex px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Love This! 💖
                </button>
              </div>

              {/* Thumbnail Quick Selector Dots */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
                {REEL_PHOTOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      soundEngine.playPop();
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === idx
                        ? 'w-8 bg-pink-500 shadow-md shadow-pink-500/50'
                        : 'w-2.5 bg-purple-800 hover:bg-pink-400'
                    }`}
                    title={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
