import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Heart, Wand2, RefreshCw, Copy, Check, Star, Trophy, Sparkle } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti, fireSideCannons, fireGrandFireworks } from '../utils/confetti';
import { MysteryBox } from '../types';

const MYSTERY_BOXES: MysteryBox[] = [
  {
    id: 1,
    label: 'Cosmic Box #1',
    boxColor: 'from-pink-600/90 to-purple-600/90',
    ribbonColor: 'bg-yellow-300',
    prizeTitle: 'Lifetime Supply of Pookie Hugs 🧸',
    prizeDescription: 'Redeemable anytime, anywhere, with zero expiration date! Guaranteed warm, cozy comfort forever.',
    prizeIcon: '🤗',
  },
  {
    id: 2,
    label: 'Cosmic Box #2',
    boxColor: 'from-purple-600/90 to-indigo-600/90',
    ribbonColor: 'bg-pink-300',
    prizeTitle: 'Golden Strawberry Cake Voucher 🍓🍰',
    prizeDescription: 'Entitles Archita to as many sweet desserts, boba teas, and pastries as her heart desires!',
    prizeIcon: '🧁',
  },
  {
    id: 3,
    label: 'Cosmic Box #3',
    boxColor: 'from-rose-600/90 to-pink-500/90',
    ribbonColor: 'bg-white',
    prizeTitle: 'Crown of the Cutest Girl 👑',
    prizeDescription: 'Official royal decree that Archita (Lusi) holds the undisputed title of the most adorable human.',
    prizeIcon: '👑',
  },
  {
    id: 4,
    label: 'Cosmic Box #4',
    boxColor: 'from-fuchsia-600/90 to-amber-500/90',
    ribbonColor: 'bg-yellow-200',
    prizeTitle: 'Infinite Luck & Fairy Sparkles ✨',
    prizeDescription: 'All your exams, goals, dreams and secret wishes are blessed by lucky fairy dust throughout 2026!',
    prizeIcon: '🪄',
  },
];

const SURPRISE_CARDS = [
  {
    id: 1,
    title: 'A Secret Memory with Lusi',
    tag: 'Memory #01',
    icon: '✨',
    image: '/assets/aistudio/image_eb3c8496.png',
    message: 'The very moment you flash that radiant smile, the entire universe pauses. You bring so much effortless warmth wherever you step!',
  },
  {
    id: 2,
    title: 'A Starlight Romantic Promise',
    tag: 'Promise #02',
    icon: '🌸',
    image: '/assets/aistudio/image_90ad7402.png',
    message: 'No matter how many birthdays come and go, you will always be cherished, protected, and celebrated as my favorite human in the world.',
  },
  {
    id: 3,
    title: 'The Pookie Royal Decree',
    tag: 'Decree #03',
    icon: '👑',
    image: '/assets/aistudio/image_28c22b69.png',
    message: 'Certified 100% adorable, uniquely irreplaceable, and the sweetest girl to ever grace 2 November! Forever our darling princess.',
  },
];

const COMPLIMENTS = [
  "You are 100% pure sunshine in human form! ☀️",
  "If cuteness was an Olympic sport, you would take the gold medal every single year! 🥇",
  "Your laugh is genuinely the prettiest sound in this galaxy! 🌸",
  "The world became a million times brighter the day you were born in 2006! ✨",
  "You have the softest heart and the most heartwarming personality, Lusi! 💖",
  "You don't even have to try; being iconic and lovable is just your default state! 🎀",
  "If there were a hall of fame for best humans, you would be the grand VIP! 🏆",
  "Your kindness makes everyone feel safe, appreciated, and loved! 🧸",
  "Strawberry sweet, cupcake cute, and diamond strong! 🍓💎",
];

const FORTUNES = [
  "🌸 A magical surprise awaits you within the next 48 hours!",
  "✨ Your biggest dream for 2026 is quietly aligning right now.",
  "🎀 Someone is smiling right now just thinking about your cute face.",
  "🍓 An unexpected sweet treat and endless laughs are heading your way.",
  "💖 The universe is plotting something wonderfully lucky for you this month!",
  "🧸 A big warm hug and delightful memory will make your week unforgettable.",
];

export const MiniSurprisesSection: React.FC = () => {
  // Mystery Box State
  const [openedBox, setOpenedBox] = useState<MysteryBox | null>(null);

  // Surprise Cards State
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Compliment Generator State
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Hug Animation State
  const [hugCount, setHugCount] = useState(1);
  const [isHugging, setIsHugging] = useState(false);

  // Scratch-off Heart State
  const [isHeartRevealed, setIsHeartRevealed] = useState(false);

  // Fortune Cookie State
  const [fortuneIdx, setFortuneIdx] = useState(0);

  // Interactive Bear speech state
  const [bearSpeech, setBearSpeech] = useState("Hi Archita! Tap me for cute giggles! 🧸");

  // Hidden Easter Egg: Click small heart 5 times
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [isEasterEggUnlocked, setIsEasterEggUnlocked] = useState(false);

  // Tap to Send Love floating heart shower
  const [floatingHeartShower, setFloatingHeartShower] = useState<{ id: number; left: number; emoji: string }[]>([]);

  const handleOpenBox = (box: MysteryBox) => {
    setOpenedBox(box);
    soundEngine.playChime();
    firePinkHeartConfetti();
  };

  const handleToggleSurpriseCard = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    soundEngine.playPop();
    if (!flippedCards[id]) {
      firePinkHeartConfetti();
    }
  };

  const handleNextCompliment = () => {
    soundEngine.playPop();
    const next = (complimentIdx + 1) % COMPLIMENTS.length;
    setComplimentIdx(next);
    setCopied(false);
  };

  const handleCopyCompliment = () => {
    navigator.clipboard.writeText(COMPLIMENTS[complimentIdx]);
    setCopied(true);
    soundEngine.playHeartSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGiveHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    soundEngine.playHeartSound();
    firePinkHeartConfetti();
    setTimeout(() => setIsHugging(false), 1400);
  };

  const handleRevealHeart = () => {
    setIsHeartRevealed(true);
    soundEngine.playChime();
    firePinkHeartConfetti();
  };

  const handleNextFortune = () => {
    soundEngine.playPop();
    const next = (fortuneIdx + 1) % FORTUNES.length;
    setFortuneIdx(next);
  };

  const handleBearClick = () => {
    soundEngine.playPop();
    const messages = [
      "Lusi is my favorite human forever! 🧸",
      "*waves paws* Have the best birthday ever! 🎀",
      "Sending you a warm squishy bear hug! 🐾",
      "You're the sweetest pookie ever! 🌸",
      "Can I have a slice of your birthday cake? 🍰",
    ];
    setBearSpeech(messages[Math.floor(Math.random() * messages.length)]);
    fireSideCannons();
  };

  // Easter Egg Click Handler
  const handleEasterEggHeartClick = () => {
    const nextClicks = easterEggClicks + 1;
    setEasterEggClicks(nextClicks);
    soundEngine.playHeartSound();

    if (nextClicks >= 5) {
      setIsEasterEggUnlocked(true);
      soundEngine.playCheer();
      fireGrandFireworks();
    }
  };

  // Tap to Send Love shower
  const handleSendLoveShower = () => {
    soundEngine.playHeartSound();
    firePinkHeartConfetti();

    const emojis = ['💖', '💗', '💕', '💓', '💝', '🌸', '✨'];
    const newHearts = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setFloatingHeartShower(prev => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHeartShower([]);
    }, 2500);
  };

  return (
    <section id="surprises-section" className="py-24 px-4 relative z-20 overflow-hidden">
      {/* Floating Love Shower Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHeartShower.map(h => (
          <motion.span
            key={h.id}
            initial={{ y: '90vh', opacity: 1, scale: 0.8 }}
            animate={{ y: '-10vh', opacity: 0, scale: 1.8 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute text-3xl select-none filter drop-shadow-[0_0_10px_#f472b6]"
            style={{ left: `${h.left}%` }}
          >
            {h.emoji}
          </motion.span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-400/30 mb-3 backdrop-blur-md"
          >
            <Wand2 className="w-4 h-4 text-pink-400" />
            <span>Secret Surprise Experiences</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute">
            Interactive Mini Surprises & Secret Wonders 🎀✨
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 font-medium max-w-xl mx-auto mt-2">
            A cosmic playground of mystery boxes, hidden photo surprises, virtual hugs, and magical fortunes crafted just for Lusi!
          </p>

          {/* Quick Action: Tap to Send Love Button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleSendLoveShower}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-glow cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Tap to Send Love to Lusi! 💖 (Shower Hearts)</span>
            </button>
          </div>
        </div>

        {/* 1. THREE INTERACTIVE SURPRISE CARDS (Personalized Message, Memory & Photo) */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-pink-400 uppercase tracking-widest bg-purple-950/80 px-3 py-1 rounded-full border border-pink-400/30">
              Interactive Reveal
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-100 font-cute mt-2">
              Three Secret Surprise Cards 💌
            </h3>
            <p className="text-xs sm:text-sm text-pink-300/70">
              Click each card to flip and reveal a special memory, photo, and sweet message for Archita!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SURPRISE_CARDS.map(card => {
              const isFlipped = flippedCards[card.id];
              return (
                <div
                  key={card.id}
                  onClick={() => handleToggleSurpriseCard(card.id)}
                  className="perspective-1000 h-96 cursor-pointer select-none"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="w-full h-full relative transform-style-3d"
                  >
                    {/* Front Face (Unrevealed Surprise) */}
                    <div className="absolute inset-0 backface-hidden glass-card rounded-3xl p-6 flex flex-col items-center justify-between text-center border-2 border-pink-400/30 hover:border-pink-400/60 transition-colors shadow-2xl">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                          {card.tag}
                        </span>
                        <span className="text-2xl">{card.icon}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/30 border border-pink-400/40 flex items-center justify-center text-4xl mb-4 shadow-inner animate-pulse">
                          🎁
                        </div>
                        <h4 className="text-xl font-extrabold text-pink-100 font-cute">
                          {card.title}
                        </h4>
                        <p className="text-xs text-pink-300/70 mt-2 font-medium">
                          Contains a secret photo & personal message.
                        </p>
                      </div>

                      <div className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-400/30">
                        Tap to Flip Card ✨
                      </div>
                    </div>

                    {/* Back Face (Revealed Memory, Photo & Message) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-5 flex flex-col justify-between border-2 border-pink-400 shadow-2xl shadow-pink-500/30 overflow-hidden">
                      {/* Photo Thumbnail */}
                      <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 border border-pink-300/40 shadow-md bg-black/40">
                        <img
                          src={card.image}
                          alt="Archita"
                          className="w-full h-full object-cover contrast-[1.08] brightness-[1.04]"
                        />
                      </div>

                      {/* Revealed Message */}
                      <p className="text-xs sm:text-sm text-pink-100 font-handwriting leading-relaxed flex-1 px-1">
                        "{card.message}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-pink-400 font-bold pt-2 border-t border-pink-500/30">
                        <span className="font-script text-sm text-pink-300">Archita (Lusi) ♡</span>
                        <span>Click to flip back ↺</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MYSTERY GIFT BOXES WITH GLOWING RIBBONS */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-cute text-center mb-6 flex items-center justify-center gap-2">
            <span>🎁</span> Clickable Mystery Gift Boxes with Glowing Ribbons <span>🎁</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {MYSTERY_BOXES.map(box => (
              <motion.div
                key={box.id}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenBox(box)}
                className={`relative bg-gradient-to-br ${box.boxColor} p-6 rounded-3xl shadow-2xl shadow-pink-500/20 border-2 border-pink-300/50 cursor-pointer flex flex-col items-center justify-center text-center h-48 select-none group overflow-hidden`}
              >
                {/* Glowing Ribbon Bow on Box */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-3xl group-hover:scale-125 transition-transform filter drop-shadow-[0_0_10px_#f472b6]">
                  🎀
                </div>
                {/* Glowing Ribbon Stripes */}
                <div className={`w-4 h-full ${box.ribbonColor} absolute inset-y-0 opacity-80 shadow-[0_0_12px_#fff]` } />
                <div className={`h-4 w-full ${box.ribbonColor} absolute inset-x-0 opacity-80 shadow-[0_0_12px_#fff]` } />

                <div className="relative z-10 bg-purple-950/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-pink-300/40">
                  <span className="text-xs font-black text-pink-100 uppercase tracking-widest block">
                    {box.label}
                  </span>
                  <span className="text-[11px] text-pink-300 font-bold">Tap to open ✨</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. COMPLIMENT GENERATOR & VIRTUAL HUG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* COMPLIMENT GENERATOR */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-pink-400/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-pink-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  Cute Compliment Dispenser
                </span>
                <span className="text-xl">🌸</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-cute mb-3">
                Daily Dose of Pookie Love
              </h4>

              <div className="min-h-[100px] flex items-center justify-center p-4 bg-purple-900/40 rounded-2xl border border-pink-400/20 text-center my-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={complimentIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="font-handwriting text-xl sm:text-2xl font-bold text-pink-200 leading-snug"
                  >
                    "{COMPLIMENTS[complimentIdx]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={handleNextCompliment}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Another Compliment! ✨</span>
              </button>

              <button
                onClick={handleCopyCompliment}
                className="py-3 px-4 rounded-2xl bg-purple-900/60 hover:bg-purple-800/80 text-pink-200 font-bold text-xs transition-colors flex items-center gap-1.5 border border-pink-400/30"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* VIRTUAL HUG BUTTON & ANIMATION */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-pink-400/30 shadow-2xl flex flex-col items-center justify-between text-center">
            <div>
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-black text-pink-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  Unlimited Warmth
                </span>
                <span className="text-xl">🧸</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-cute mb-1">
                Virtual Hug Sender
              </h4>
              <p className="text-xs text-pink-300/80 font-medium mb-4">
                Need a soft, cozy, comforting squeeze? Tap for a warm pookie hug!
              </p>
            </div>

            {/* Hug Visualizer */}
            <div className="relative my-4 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isHugging ? [1, 1.35, 1.2, 1] : [1, 1.05, 1],
                  rotate: isHugging ? [-8, 8, -4, 0] : 0,
                }}
                transition={{ duration: isHugging ? 0.8 : 2.5, repeat: isHugging ? 0 : Infinity }}
                className="text-7xl select-none filter drop-shadow-md cursor-pointer"
                onClick={handleGiveHug}
              >
                {isHugging ? '🫂💖' : '🧸'}
              </motion.div>

              {isHugging && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="text-4xl animate-ping absolute">💗</span>
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="text-xs font-extrabold text-pink-400 mb-2">
                Hugs Delivered to Lusi: <span className="text-sm font-black text-pink-100">{hugCount}</span>
              </div>

              <button
                onClick={handleGiveHug}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer animate-glow"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>SEND BIG WARM HUG! 🤗♡</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. HIDDEN EASTER EGG (Click 5 times) & BEAR & FORTUNE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* TEDDY BEAR */}
          <div
            onClick={handleBearClick}
            className="glass-card rounded-3xl p-6 border-2 border-pink-400/30 shadow-xl flex flex-col items-center text-center cursor-pointer group hover:border-pink-400/70 transition-all"
          >
            <span className="text-xs font-black text-pink-400 uppercase tracking-widest mb-2">
              Lusi's Teddy Companion
            </span>

            <div className="bg-purple-900/70 text-pink-100 text-xs font-bold px-3.5 py-2 rounded-2xl mb-3 shadow-sm border border-pink-400/30 relative">
              {bearSpeech}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-900/70 rotate-45 border-r border-b border-pink-400/30" />
            </div>

            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
              className="text-6xl my-2 select-none group-hover:scale-110 transition-transform"
            >
              🧸🎀
            </motion.div>

            <p className="text-xs text-pink-300 font-semibold mt-2">
              (Tap bear to make him wave & giggle!)
            </p>
          </div>

          {/* HIDDEN EASTER EGG: 5 CLICKS */}
          <div className="glass-card rounded-3xl p-6 border-2 border-pink-400/30 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
            <span className="text-xs font-black text-pink-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> Secret Easter Egg
            </span>

            <div className="my-2 flex flex-col items-center">
              {!isEasterEggUnlocked ? (
                <div
                  onClick={handleEasterEggHeartClick}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex flex-col items-center justify-center text-white cursor-pointer shadow-xl shadow-pink-500/40 border-2 border-pink-200/80 animate-glow hover:scale-110 active:scale-90 transition-transform"
                >
                  <Heart className="w-9 h-9 fill-white" />
                  <span className="text-[10px] font-black uppercase mt-1">
                    {easterEggClicks > 0 ? `${easterEggClicks} / 5` : 'Click 5x'}
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-3 bg-purple-900/90 border-2 border-amber-300 rounded-2xl text-pink-100 text-xs font-bold leading-relaxed shadow-lg"
                >
                  <span className="text-2xl block mb-1">👑 🏆 ✨</span>
                  "POOKIE LEVEL 1000 UNLOCKED! Archita is officially crowned the most precious soul in the entire cosmos!"
                </motion.div>
              )}
            </div>

            <p className="text-xs text-pink-300/80 font-semibold">
              {isEasterEggUnlocked ? 'Cosmic secret unlocked! ♡' : 'Click the small heart 5 times to reveal!'}
            </p>
          </div>

          {/* BIRTHDAY FORTUNE */}
          <div className="glass-card rounded-3xl p-6 border-2 border-pink-400/30 shadow-xl flex flex-col items-center justify-between text-center">
            <span className="text-xs font-black text-pink-400 uppercase tracking-widest mb-2">
              Birthday Fortune Crystal
            </span>

            <div className="my-2 p-3 bg-purple-900/50 rounded-2xl border border-pink-400/20 w-full min-h-[85px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={fortuneIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs font-bold text-pink-100 leading-snug"
                >
                  {FORTUNES[fortuneIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              onClick={handleNextFortune}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-pink-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-pink-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Next Fortune 🔮</span>
            </button>
          </div>
        </div>

        {/* MYSTERY BOX MODAL DIALOG */}
        <AnimatePresence>
          {openedBox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setOpenedBox(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-pink-400 text-center relative text-pink-100"
              >
                <div className="text-5xl mb-3 animate-bounce">
                  {openedBox.prizeIcon}
                </div>

                <div className="inline-block bg-purple-900/90 text-pink-300 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-pink-400/30">
                  Unboxed from {openedBox.label} 🎀
                </div>

                <h3 className="text-2xl font-extrabold text-pink-100 font-cute mb-2">
                  {openedBox.prizeTitle}
                </h3>

                <p className="text-xs sm:text-sm text-pink-200/90 font-medium leading-relaxed my-3 bg-purple-950/60 p-4 rounded-2xl border border-pink-400/20">
                  {openedBox.prizeDescription}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      soundEngine.playHeartSound();
                      firePinkHeartConfetti();
                      setOpenedBox(null);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    Claim My Gift! 💖
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
