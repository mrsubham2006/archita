import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/audio';

interface FloatingClickItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

const EMOJIS = ['💗', '💖', '🎀', '✨', '🌸', '🍓', '🍰', '🧁', '🧸', '💕', '⭐'];

export const ClickSparkles: React.FC = () => {
  const [items, setItems] = useState<FloatingClickItem[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on interactive form inputs or buttons to avoid cluttering if preferred, or still trigger subtly!
      const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const newItem: FloatingClickItem = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji,
        size: Math.floor(Math.random() * 12) + 20,
      };

      setItems(prev => [...prev.slice(-15), newItem]);
      soundEngine.playPop();

      // Remove after animation completes
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {items.map(item => (
        <span
          key={item.id}
          className="absolute select-none animate-ping"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            fontSize: `${item.size}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.9s cubic-bezier(0.1, 0.8, 0.2, 1)',
            filter: 'drop-shadow(0 2px 8px rgba(244,114,182,0.6))',
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};
