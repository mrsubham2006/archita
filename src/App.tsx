/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { LetterSection } from './components/LetterSection';
import { PhotoScrapbookSection } from './components/PhotoScrapbookSection';
import { PhotoReelSection } from './components/PhotoReelSection';
import { SpecialReasonsSection } from './components/SpecialReasonsSection';
import { CakeSection } from './components/CakeSection';
import { MiniSurprisesSection } from './components/MiniSurprisesSection';
import { FinalWishesSection } from './components/FinalWishesSection';
import { MusicPlayer } from './components/MusicPlayer';
import { GalaxyBackground } from './components/GalaxyBackground';
import { FloatingParticles } from './components/FloatingParticles';
import { ClickSparkles } from './components/ClickSparkles';

export default function App() {
  const [isHeroSurpriseOpened, setIsHeroSurpriseOpened] = useState(false);

  const handleExploreClick = () => {
    const nextSection = document.getElementById('countdown-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-galaxy-universe text-pink-100 font-cute selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* 3D Cosmic Galaxy Canvas, Parallax Stars, Rose Petals, Meteors & Bubbles */}
      <GalaxyBackground />

      {/* Global Interactive Click Sparkles / Floating Hearts */}
      <ClickSparkles />

      {/* Ambient Floating Ribbons, Bows, Butterflies & Stars */}
      <FloatingParticles />

      {/* Navigation Header */}
      <Navbar onSurpriseOpen={() => setIsHeroSurpriseOpened(true)} />

      {/* Main Content Sections */}
      <main className="relative z-20">
        {/* 1. Hero Grand Surprise */}
        <HeroSection
          isOpened={isHeroSurpriseOpened}
          setIsOpened={setIsHeroSurpriseOpened}
          onExploreClick={handleExploreClick}
        />

        {/* 2. Birthday Date & Animated Countdown (02 • 11 • 2006) */}
        <CountdownSection />

        {/* 3. A Little Message for Lusi (Wax-sealed Animated Envelope) */}
        <LetterSection />

        {/* 4. Pookie Gallery (Polaroid Scrapbook with upload/replace) */}
        <PhotoScrapbookSection />

        {/* 4.5. Archita's Spotlight Reel (Cinematic Animation & High Clarity) */}
        <PhotoReelSection />

        {/* 5. Why You Are So Special (6 Interactive Cards) */}
        <SpecialReasonsSection />

        {/* 6. The Birthday Cake Surprise (3D Tiered Cake with Blowable Candles) */}
        <CakeSection />

        {/* 7. Interactive Mini Surprises (Mystery Boxes, Compliments, Hugs, Fortunes) */}
        <MiniSurprisesSection />

        {/* 8. Final Birthday Celebration Screen with Fireworks & Falling Petals */}
        <FinalWishesSection />
      </main>

      {/* Floating Dreamy Music Player */}
      <MusicPlayer />
    </div>
  );
}
