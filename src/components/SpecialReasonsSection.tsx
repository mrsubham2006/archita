import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Candy, HeartHandshake, Flower2, Wand2, Gem, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti } from '../utils/confetti';

interface ReasonItem {
  id: number;
  title: string;
  tagline: string;
  detail: string;
  icon: any;
  emoji: string;
  accentGlow: string;
}

const REASONS: ReasonItem[] = [
  {
    id: 1,
    title: 'Your smile is pure sunshine.',
    tagline: 'Brightens the gloomiest days',
    detail: 'Whenever you smile, the whole room lights up. It is impossible not to feel warmth, peace, and joy around your infectious positive energy! ☀️',
    icon: Sun,
    emoji: '☀️',
    accentGlow: 'from-amber-400 to-rose-400',
  },
  {
    id: 2,
    title: 'Your presence makes everything sweeter.',
    tagline: 'Like strawberry cream on a warm day',
    detail: 'Even regular conversations become cozy adventures with you, Lusi. You make life feel like a comfort movie filled with soft laughter! 🍓',
    icon: Candy,
    emoji: '🍓',
    accentGlow: 'from-pink-400 to-rose-500',
  },
  {
    id: 3,
    title: 'You deserve all the happiness in the world.',
    tagline: 'Endless hugs and sweet dreams',
    detail: 'Because you give so much pure kindness to others, the entire universe owes you a lifetime of wishes granted and gentle moments! 💖',
    icon: HeartHandshake,
    emoji: '💖',
    accentGlow: 'from-rose-400 to-purple-500',
  },
  {
    id: 4,
    title: 'You are beautiful inside and out.',
    tagline: 'A pure heart with fairy elegance',
    detail: 'It is not just your pretty face and cute style, Archita; it is the genuine empathy, soft voice, and sweet soul you carry everywhere! 🌸',
    icon: Flower2,
    emoji: '🌸',
    accentGlow: 'from-purple-400 to-pink-500',
  },
  {
    id: 5,
    title: 'You make ordinary moments special.',
    tagline: 'Magic in the little everyday things',
    detail: 'A simple text from you, a silly joke, or sharing a cupcake turns into a treasured memory that stays in the heart forever! 🪄',
    icon: Wand2,
    emoji: '🪄',
    accentGlow: 'from-blue-400 to-pink-400',
  },
  {
    id: 6,
    title: 'You are simply one of a kind.',
    tagline: 'Limited edition pookie princess',
    detail: 'Out of eight billion people on Earth, there is only one Archita, and nobody could ever replace your unique, adorable vibe! 💎',
    icon: Gem,
    emoji: '💎',
    accentGlow: 'from-pink-400 to-amber-300',
  },
];

export const SpecialReasonsSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleCardFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    soundEngine.playPop();
    if (!flippedCards[id]) {
      firePinkHeartConfetti();
    }
  };

  return (
    <section id="reasons-section" className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-400/30 mb-3 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Treasures of Your Heart</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute">
            Why You Are So Special 💗
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 font-medium max-w-xl mx-auto mt-2">
            Click each 3D card to flip it over and discover why you mean the absolute universe to everyone around you!
          </p>
        </div>

        {/* 6 3D Animated Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map(item => {
            const Icon = item.icon;
            const isFlipped = flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleCardFlip(item.id)}
                className="perspective-1000 h-80 cursor-pointer select-none"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, type: 'spring', damping: 20 }}
                  className="w-full h-full relative transform-style-3d"
                >
                  {/* FRONT FACE OF CARD */}
                  <div className="absolute inset-0 backface-hidden glass-card rounded-3xl p-7 flex flex-col justify-between border-2 border-pink-400/30 hover:border-pink-400/70 transition-all shadow-2xl shadow-purple-950/50">
                    <div>
                      {/* Top Row: Icon badge & Number */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accentGlow} text-white flex items-center justify-center shadow-lg shadow-pink-500/30 text-xl`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <span className="text-xs font-black tracking-widest text-pink-400 uppercase bg-purple-950/80 px-3 py-1 rounded-full border border-pink-400/30">
                          REASON #{item.id}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-cute leading-snug mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-pink-300 font-semibold flex items-center gap-1.5 mt-2">
                        <span>{item.emoji}</span>
                        <span>{item.tagline}</span>
                      </p>
                    </div>

                    {/* Bottom Flip Indicator */}
                    <div className="pt-3 border-t border-pink-500/20 flex items-center justify-between text-xs text-pink-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-pink-400" /> Tap to Flip Card
                      </span>
                      <span className="text-sm">↺</span>
                    </div>
                  </div>

                  {/* BACK FACE OF CARD (Revealed Truth) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-7 flex flex-col justify-between border-2 border-pink-400 shadow-2xl shadow-pink-500/30 bg-purple-950/80 backdrop-blur-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs font-bold text-pink-400">
                        <span>REASON #{item.id} INSIGHT</span>
                        <span>{item.emoji}</span>
                      </div>

                      <h4 className="text-lg font-bold text-pink-200 font-cute mb-2">
                        "{item.title}"
                      </h4>

                      <p className="text-sm text-pink-100/90 font-medium leading-relaxed bg-purple-900/40 p-4 rounded-2xl border border-pink-400/20">
                        {item.detail}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-pink-300 font-bold pt-3 border-t border-pink-500/20">
                      <span className="flex items-center gap-1 text-pink-400">
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        Archita Special ♡
                      </span>
                      <span>Tap to flip back ↺</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
