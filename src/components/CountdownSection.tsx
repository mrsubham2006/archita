import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Clock, Cake, PartyPopper } from 'lucide-react';
import { firePinkHeartConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

export const CountdownSection: React.FC = () => {
  const [forceCelebration, setForceCelebration] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthdayToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const thisYearBirthday = new Date(currentYear, 10, 2, 0, 0, 0);
      const isTodayNov2 = now.getMonth() === 10 && now.getDate() === 2;

      let targetDate = thisYearBirthday;
      if (now.getTime() > thisYearBirthday.getTime() && !isTodayNov2) {
        targetDate = new Date(currentYear + 1, 10, 2, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (isTodayNov2 || diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthdayToday: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isBirthdayToday: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isCelebrationMode = timeLeft.isBirthdayToday || forceCelebration;

  const handleToggleMode = () => {
    setForceCelebration(!forceCelebration);
    soundEngine.playPop();
    if (!forceCelebration) {
      firePinkHeartConfetti();
    }
  };

  return (
    <section id="countdown-section" className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-400/30 mb-3 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>The Sacred Birthday Chronicle</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-pink-400 to-purple-200 font-cute">
            The Day An Angel Was Born 🎀
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-2xl filter drop-shadow-[0_0_8px_#fde047]">✨</span>
            <div className="px-6 py-2.5 rounded-2xl glass-card border-2 border-pink-400/50 shadow-xl shadow-purple-950/70 inline-block">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 bg-clip-text text-transparent">
                02 • 11 • 2006
              </span>
            </div>
            <span className="text-2xl filter drop-shadow-[0_0_8px_#fde047]">✨</span>
          </div>

          <p className="text-sm sm:text-base text-pink-200/80 font-medium mt-3">
            November 2nd • A day written in stars and spun in cosmic sugar ♡
          </p>
        </div>

        {/* Content Layout: Illustrated Calendar & Animated Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Illustrated Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm glass-card rounded-3xl p-6 border-4 border-pink-400/40 shadow-2xl shadow-purple-950/80 text-center">
              {/* Cute top bow */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-4xl filter drop-shadow-[0_0_12px_#ec4899]">
                🎀
              </div>

              {/* Calendar Binder Rings */}
              <div className="flex justify-around -mt-10 mb-4 px-4">
                <div className="w-3.5 h-7 rounded-full bg-pink-400 border-2 border-white shadow-sm" />
                <div className="w-3.5 h-7 rounded-full bg-pink-400 border-2 border-white shadow-sm" />
                <div className="w-3.5 h-7 rounded-full bg-pink-400 border-2 border-white shadow-sm" />
                <div className="w-3.5 h-7 rounded-full bg-pink-400 border-2 border-white shadow-sm" />
              </div>

              {/* Month Header */}
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-2xl py-3 px-4 shadow-lg mb-4">
                <h3 className="text-xl font-bold tracking-wider font-cute">NOVEMBER</h3>
                <p className="text-xs text-pink-200 font-medium">Month of Pure Magic 🌸</p>
              </div>

              {/* Day Highlight */}
              <div className="py-4 my-2 relative">
                <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 via-pink-400 to-purple-300 tracking-tight font-serif-dreamy drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  02
                </span>
                <span className="absolute top-2 right-12 text-2xl animate-spin" style={{ animationDuration: '8s' }}>
                  ⭐
                </span>
                <span className="absolute bottom-2 left-12 text-2xl animate-bounce">
                  🍓
                </span>
                <p className="text-sm font-bold text-pink-300 tracking-widest uppercase mt-1">
                  Archita's Day
                </p>
              </div>

              {/* Cute milestones */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-purple-800/40 text-left">
                <div className="bg-purple-950/60 p-2.5 rounded-xl border border-pink-400/20">
                  <p className="text-[11px] text-pink-400 font-bold uppercase">Born In</p>
                  <p className="text-sm font-extrabold text-pink-100">2006 Vintage ♡</p>
                </div>
                <div className="bg-purple-950/60 p-2.5 rounded-xl border border-pink-400/20">
                  <p className="text-[11px] text-pink-400 font-bold uppercase">Nickname</p>
                  <p className="text-sm font-extrabold text-pink-100">Lusi 🧸</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Dynamic Countdown or Birthday Celebration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {isCelebrationMode ? (
              <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-pink-700 text-white rounded-3xl p-8 shadow-2xl shadow-pink-500/30 border-4 border-pink-300/60 relative overflow-hidden">
                <div className="relative z-10 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
                    <PartyPopper className="w-4 h-4 text-yellow-300" />
                    <span>CELEBRATION IN FULL SWING!</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                    TODAY IS ARCHITA'S BIRTHDAY! 🎉🎀
                  </h3>

                  <p className="text-sm sm:text-base text-pink-100 font-medium mt-3 leading-relaxed">
                    The wait is over! Today we shower our favorite girl Lusi with unlimited affection, strawberry treats, sweet hugs, and all the wonders of the universe!
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
                    <button
                      onClick={() => {
                        soundEngine.playCheer();
                        firePinkHeartConfetti();
                      }}
                      className="px-6 py-3 rounded-full bg-white text-pink-700 font-bold text-sm shadow-xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Cake className="w-4 h-4 text-pink-600" />
                      <span>Blow Party Horns! 🎺</span>
                    </button>

                    <button
                      onClick={handleToggleMode}
                      className="px-4 py-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 text-xs font-semibold hover:bg-white/30 transition-all"
                    >
                      View Live Countdown Timer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border-4 border-pink-400/40 shadow-2xl shadow-purple-950/80 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Countdown to Nov 2
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-100 font-cute mt-1">
                      Counting Every Sweet Second ⏳♡
                    </h3>
                  </div>

                  <button
                    onClick={handleToggleMode}
                    className="text-xs bg-purple-900/80 hover:bg-purple-800 text-pink-200 font-bold px-3 py-1.5 rounded-full transition-colors border border-pink-400/30"
                  >
                    🎉 Preview Birthday Bash Mode
                  </button>
                </div>

                {/* 4 Animated Countdown Boxes */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 my-6">
                  {[
                    { label: 'DAYS', value: timeLeft.days, emoji: '🎀' },
                    { label: 'HOURS', value: timeLeft.hours, emoji: '🌸' },
                    { label: 'MINUTES', value: timeLeft.minutes, emoji: '✨' },
                    { label: 'SECONDS', value: timeLeft.seconds, emoji: '💖' },
                  ].map((unit, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      className="bg-purple-950/70 rounded-2xl p-3 sm:p-4 border-2 border-pink-400/30 text-center shadow-lg relative group"
                    >
                      <span className="text-xs absolute top-1 right-1.5 opacity-60">
                        {unit.emoji}
                      </span>
                      <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 to-purple-300 block tracking-tight font-cute">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-pink-400 uppercase tracking-wider block mt-1">
                        {unit.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-pink-300/80 font-semibold pt-4 border-t border-purple-800/40">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    Celebrating Lusi's 20th Milestone!
                  </span>
                  <span>2 November 🎂</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
