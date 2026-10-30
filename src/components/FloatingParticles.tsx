import React from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  emoji: string;
  left: string;
  duration: number;
  delay: number;
  size: number;
}

const PARTICLES: Particle[] = [
  { id: 1, emoji: '🎀', left: '8%', duration: 14, delay: 0, size: 24 },
  { id: 2, emoji: '🌸', left: '18%', duration: 18, delay: 2, size: 20 },
  { id: 3, emoji: '✨', left: '26%', duration: 12, delay: 4, size: 18 },
  { id: 4, emoji: '🍓', left: '38%', duration: 16, delay: 1, size: 22 },
  { id: 5, emoji: '💗', left: '48%', duration: 15, delay: 3, size: 22 },
  { id: 6, emoji: '🦋', left: '60%', duration: 20, delay: 2, size: 24 },
  { id: 7, emoji: '🧸', left: '72%', duration: 22, delay: 5, size: 26 },
  { id: 8, emoji: '🎀', left: '84%', duration: 17, delay: 1, size: 24 },
  { id: 9, emoji: '✨', left: '92%', duration: 13, delay: 3, size: 20 },
  { id: 10, emoji: '💕', left: '12%', duration: 19, delay: 6, size: 20 },
  { id: 11, emoji: '🧁', left: '54%', duration: 18, delay: 7, size: 22 },
  { id: 12, emoji: '🍒', left: '78%', duration: 16, delay: 4, size: 22 },
];

export const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute select-none opacity-40 hover:opacity-80 transition-opacity"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};
