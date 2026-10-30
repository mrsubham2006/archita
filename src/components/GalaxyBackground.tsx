import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audio';

interface GlassBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  heart: string;
  wobbleSpeed: number;
}

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

interface Meteor {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
}

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [cursorParticles, setCursorParticles] = useState<CursorParticle[]>([]);
  const [bubbles, setBubbles] = useState<GlassBubble[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [shootingStarWish, setShootingStarWish] = useState<string | null>(null);

  // Mouse trail and glowing light effect
  useEffect(() => {
    let lastTime = 0;
    const emojis = ['✨', '💖', '⭐', '🌸', '🎀', '💫'];

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const now = performance.now();
      if (now - lastTime > 60) {
        lastTime = now;
        const newParticle: CursorParticle = {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.floor(Math.random() * 8) + 12,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        };

        setCursorParticles(prev => [...prev.slice(-14), newParticle]);

        setTimeout(() => {
          setCursorParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize interactive floating glass bubbles containing hearts
  useEffect(() => {
    const heartEmojis = ['💖', '💗', '💕', '💓', '✨', '🍓', '🎀'];
    const initialBubbles: GlassBubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 85 + 10,
      size: Math.random() * 25 + 45,
      speedY: Math.random() * 0.4 + 0.25,
      heart: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      wobbleSpeed: Math.random() * 2 + 2,
    }));
    setBubbles(initialBubbles);

    // Occasional shooting stars / meteor shower
    const meteorInterval = setInterval(() => {
      const newMeteor: Meteor = {
        id: Date.now(),
        x: Math.random() * window.innerWidth * 0.8 + 100,
        y: Math.random() * (window.innerHeight * 0.4),
        length: Math.random() * 80 + 120,
        speed: Math.random() * 8 + 12,
      };
      setMeteors(prev => [...prev.slice(-4), newMeteor]);

      setTimeout(() => {
        setMeteors(prev => prev.filter(m => m.id !== newMeteor.id));
      }, 1200);
    }, 4500);

    return () => clearInterval(meteorInterval);
  }, []);

  // Multi-layer Galaxy Starfield, Fireflies, Rose Petals and Heart Constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Multi-layer stars (Depth Parallax)
    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
      layer: number;
    }

    const stars: Star[] = [];
    const starColors = ['#ffffff', '#fbcfe8', '#e9d5ff', '#fed7aa', '#f472b6'];

    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        layer: Math.floor(Math.random() * 3) + 1,
      });
    }

    // Fireflies / Stardust Particles
    interface Firefly {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      pulse: number;
    }

    const fireflies: Firefly[] = [];
    for (let i = 0; i < 30; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Falling Rose Petals
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angularSpeed: number;
      color: string;
    }

    const petals: Petal[] = [];
    const petalColors = ['#f472b6', '#fb7185', '#f43f5e', '#fda4af', '#fecdd3'];
    for (let i = 0; i < 24; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 7,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.sin(Math.random() * Math.PI) * 0.8,
        angle: Math.random() * 360,
        angularSpeed: (Math.random() - 0.5) * 1.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Heart Constellation Star Points
    const getConstellationPoints = () => {
      const cx = width * 0.82;
      const cy = height * 0.24;
      const scale = Math.min(width, height) * 0.08;
      const pts = [];
      for (let t = 0; t < Math.PI * 2; t += Math.PI / 8) {
        // Parametric heart formula
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        pts.push({ x: cx + (x / 16) * scale, y: cy + (y / 16) * scale });
      }
      return pts;
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // 1. Draw Multi-Layer Parallax Twinkling Stars
      stars.forEach(star => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.1, star.baseAlpha + Math.sin(star.phase) * 0.35);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Heart-shaped Constellation with Glowing Cosmic Lines
      const constPoints = getConstellationPoints();
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      constPoints.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.stroke();

      // Constellation star joints
      constPoints.forEach((pt, idx) => {
        const pulse = Math.sin(time * 2 + idx) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.8 + pulse * 0.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ec4899';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Floating Glowing Fireflies
      fireflies.forEach(f => {
        f.x += f.speedX;
        f.y += f.speedY;
        f.pulse += 0.03;

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const currentAlpha = Math.max(0.1, f.alpha + Math.sin(f.pulse) * 0.4);

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fde047';
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#facc15';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Falling Rose Petals
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle * (Math.PI / 180)) * 0.6;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -15;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.65;

        // Realistic petal contour
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
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

  // Pop a glass bubble on tap
  const handlePopBubble = (id: number) => {
    soundEngine.playPop();
    setBubbles(prev => prev.filter(b => b.id !== id));

    // Spawn a replacement bubble after a couple seconds
    setTimeout(() => {
      const heartEmojis = ['💖', '💗', '💕', '💓', '✨', '🍓', '🎀'];
      setBubbles(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 85 + 5,
          y: 95,
          size: Math.random() * 25 + 45,
          speedY: Math.random() * 0.4 + 0.25,
          heart: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          wobbleSpeed: Math.random() * 2 + 2,
        },
      ]);
    }, 2500);
  };

  // Trigger custom shooting star wish
  const handleMakeShootingStarWish = () => {
    soundEngine.playChime();
    const wishes = [
      "🌠 Wish granted: A year overflowing with endless laughter & love for Lusi!",
      "✨ Cosmic promise: All of Archita's secret dreams are turning into reality!",
      "🎀 Starlight blessing: Protected by the warmest hugs in the galaxy!",
      "💖 Stellar fortune: 2026 is going to be your sweetest, most magical chapter!",
    ];
    setShootingStarWish(wishes[Math.floor(Math.random() * wishes.length)]);

    // Trigger visual meteor across center screen
    const newMeteor: Meteor = {
      id: Date.now(),
      x: window.innerWidth * 0.7,
      y: 80,
      length: 220,
      speed: 16,
    };
    setMeteors(prev => [...prev, newMeteor]);

    setTimeout(() => setShootingStarWish(null), 5000);
  };

  return (
    <>
      {/* 1. Deep Cosmic Galaxy Canvas with Multi-layer Parallax Stars, Petals & Constellations */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-90"
      />

      {/* 2. Mouse-Following Pink & Purple Cosmic Spotlight Glow (pointer-events-none) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.14), rgba(168, 85, 247, 0.1), transparent 70%)`,
        }}
      />

      {/* 3. Cursor Sparkle & Tiny Heart Trail */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {cursorParticles.map(p => (
          <span
            key={p.id}
            className="absolute select-none animate-ping"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              fontSize: `${p.size}px`,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.9))',
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* 4. Shooting Stars & Meteors Streaking Through Galaxy */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {meteors.map(m => (
          <div
            key={m.id}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-pink-200 to-white shadow-[0_0_12px_#fff]"
            style={{
              left: `${m.x}px`,
              top: `${m.y}px`,
              width: `${m.length}px`,
              transform: 'rotate(-42deg)',
              animation: 'meteor-streak 1.1s linear forwards',
            }}
          />
        ))}
      </div>

      {/* 5. Realistic 3D Floating Hearts with Gentle 3D Axis Rotations */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { left: '6%', top: '22%', size: 34, delay: 0, dur: 7 },
          { left: '92%', top: '35%', size: 28, delay: 1.5, dur: 8 },
          { left: '14%', top: '75%', size: 38, delay: 3, dur: 9 },
          { left: '88%', top: '80%', size: 32, delay: 2, dur: 7.5 },
        ].map((h, i) => (
          <motion.div
            key={i}
            className="absolute select-none perspective-1000"
            style={{ left: h.left, top: h.top, fontSize: `${h.size}px` }}
            animate={{
              y: [-16, 16, -16],
              rotateY: [0, 180, 360],
              rotateX: [-15, 15, -15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: h.dur,
              repeat: Infinity,
              delay: h.delay,
              ease: 'easeInOut',
            }}
          >
            <span className="filter drop-shadow-[0_0_16px_rgba(244,114,182,0.65)]">
              💖
            </span>
          </motion.div>
        ))}
      </div>

      {/* 6. Interactive Glass Bubbles with Tiny Hearts (can be clicked/popped!) */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {bubbles.map(b => (
          <motion.div
            key={b.id}
            onClick={() => handlePopBubble(b.id)}
            className="absolute rounded-full flex items-center justify-center cursor-pointer pointer-events-auto group backdrop-blur-[2px] transition-transform hover:scale-125 active:scale-90"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(244,114,182,0.18) 50%, rgba(168,85,247,0.2) 80%, rgba(255,255,255,0.4) 100%)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              boxShadow: '0 0 15px rgba(244,114,182,0.35), inset 0 0 8px rgba(255,255,255,0.5)',
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 8, -8, 0],
            }}
            transition={{
              duration: b.wobbleSpeed * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            title="Tap to pop the bubble! 💖"
          >
            {/* Bubble shine highlight */}
            <div className="absolute top-1.5 left-2 w-3 h-2 bg-white/70 rounded-full blur-[0.5px] transform -rotate-30" />
            <span className="text-sm select-none group-hover:scale-130 transition-transform">
              {b.heart}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 7. Shooting Star Wish Floating Notification */}
      <AnimatePresence>
        {shootingStarWish && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-purple-950/90 text-pink-100 px-6 py-3 rounded-full border-2 border-pink-400/80 shadow-2xl shadow-pink-500/50 backdrop-blur-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <span>{shootingStarWish}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Floating Action: Make a Wish on a Shooting Star 🌠 */}
      <div className="fixed top-20 right-4 sm:right-6 z-30 select-none">
        <button
          onClick={handleMakeShootingStarWish}
          className="group px-3.5 py-1.5 rounded-full bg-purple-950/70 hover:bg-purple-900/90 border border-pink-400/40 text-pink-200 text-xs font-semibold backdrop-blur-md shadow-lg shadow-purple-950/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          title="Wish upon a cosmic shooting star"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🌠</span>
          <span className="hidden sm:inline">Make a Wish on a Star</span>
        </button>
      </div>
    </>
  );
};
