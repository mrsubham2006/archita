import confetti from 'canvas-confetti';

export function firePinkHeartConfetti() {
  // Burst from center
  const scalar = 2;
  const pinkHeart = confetti.shapeFromText({ text: '💗', scalar });
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });
  const ribbon = confetti.shapeFromText({ text: '🎀', scalar });
  const strawberry = confetti.shapeFromText({ text: '🍓', scalar });

  // Multiple bursts
  confetti({
    shapes: [pinkHeart, sparkle, ribbon, strawberry],
    scalar,
    particleCount: 40,
    spread: 100,
    origin: { y: 0.6 },
    ticks: 200,
  });

  // Standard colorful pastel confetti mix
  confetti({
    particleCount: 80,
    spread: 90,
    origin: { y: 0.65 },
    colors: ['#f472b6', '#fb7185', '#fbcfe8', '#e879f9', '#fed7aa', '#fde047', '#ffffff'],
    disableForReducedMotion: true,
  });
}

export function fireGrandFireworks() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#ff69b4', '#ffb6c1', '#ff1493', '#ffc0cb', '#ffd700', '#ffffff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#e066ff', '#ff85c0', '#ffadd2', '#fff0f6', '#ffd591', '#ffffff'],
    });
  }, 250);
}

export function fireSideCannons() {
  const end = Date.now() + 1000;
  const colors = ['#f472b6', '#fda4af', '#f0abfc', '#fef08a'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
