import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, PartyPopper, Share2, Check, RotateCcw } from 'lucide-react';
import { fireGrandFireworks, firePinkHeartConfetti, fireSideCannons } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

export const FinalWishesSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Heart-shaped Fireworks & Glowing Stardust Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rose Petals & Little Heart Particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angularSpeed: number;
      color: string;
      isPetal: boolean;
    }

    const particles: Particle[] = [];
    const colors = ['#f472b6', '#fb7185', '#fbcfe8', '#fda4af', '#f43f5e', '#c084fc', '#e879f9'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: Math.sin(Math.random() * Math.PI) * 0.8,
        angle: Math.random() * 360,
        angularSpeed: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isPetal: Math.random() > 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle * (Math.PI / 180)) * 0.5;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.65;

        if (p.isPetal) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          const s = p.size * 0.5;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.5, 0, s * 1.4);
          ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleIgniteShow = () => {
    soundEngine.playCheer();
    fireGrandFireworks();
    firePinkHeartConfetti();
    fireSideCannons();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Archita's Pookie Birthday Wonderland 🎀",
        text: "Happy Birthday Archita (Lusi)! Check out your special birthday wonderland ♡",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      soundEngine.playHeartSound();
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Replay the Magic button: resets and smoothly scrolls to top
  const handleReplayMagic = () => {
    soundEngine.playCheer();
    fireGrandFireworks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 px-4 z-20 overflow-hidden text-center bg-gradient-to-b from-transparent via-purple-950/70 to-[#080112]">
      {/* Falling Petals & Floating Butterflies Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-10" />

      {/* Floating Butterflies & Star Decor */}
      <div className="absolute top-12 left-10 text-4xl animate-float-slow select-none z-20 hidden sm:block">
        🦋
      </div>
      <div className="absolute top-24 right-12 text-4xl animate-float-reverse select-none z-20 hidden sm:block">
        🌸
      </div>
      <div className="absolute bottom-16 left-1/4 text-4xl animate-float-slow select-none z-20 hidden sm:block">
        🍓
      </div>

      <div className="max-w-4xl mx-auto relative z-30 flex flex-col items-center">
        {/* Cute Bow Icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-6xl sm:text-7xl mb-4 select-none filter drop-shadow-[0_0_20px_#ec4899]"
        >
          🎀
        </motion.div>

        {/* Huge Glowing Typography as specified */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute tracking-tight leading-tight uppercase drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]"
        >
          HAPPY BIRTHDAY MY POOKIE,{' '}
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent underline decoration-pink-400 decoration-wavy">
            ARCHITA!
          </span>{' '}
          🎀
        </motion.h2>

        {/* Personalized Emotional Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-pink-200/90 font-serif-dreamy italic max-w-2xl leading-relaxed"
        >
          "Stay cute, stay magical, keep shining and never forget how precious you are. The world is a little more beautiful because you exist."
        </motion.p>

        {/* Final Glowing Love Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="my-8 px-8 py-5 rounded-3xl glass-card border-2 border-pink-400/60 shadow-2xl shadow-pink-500/30 inline-flex items-center gap-3 animate-glow cursor-pointer"
          onClick={handleIgniteShow}
        >
          <span className="text-3xl">💖</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 font-script tracking-wide">
            LOTS OF LOVE, LUSI! ♡
          </span>
          <span className="text-3xl">💖</span>
        </motion.div>

        {/* Action Buttons: Fireworks, Share, Replay the Magic */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
          <button
            onClick={handleIgniteShow}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-glow"
          >
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <span>Ignite Heart Fireworks Show! 🎆</span>
          </button>

          <button
            onClick={handleReplayMagic}
            className="px-5 py-3.5 rounded-full bg-purple-900/80 hover:bg-purple-800 text-pink-200 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-pink-400/40 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-pink-400" />
            <span>Replay the Magic 🪄</span>
          </button>

          <button
            onClick={handleShare}
            className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-pink-400/30"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Wonderland Link'}</span>
          </button>
        </div>

        {/* Cute Cosmic Footer Signature */}
        <div className="mt-16 pt-8 border-t border-purple-800/40 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-pink-300/80 font-semibold gap-2">
          <div className="flex items-center gap-1">
            <span>Crafted with infinite cosmic love for Archita (Lusi)</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          </div>
          <div>
            <span>Birthday: 02 November 2006 • Always Our Pookie 🎀</span>
          </div>
        </div>
      </div>
    </section>
  );
};
