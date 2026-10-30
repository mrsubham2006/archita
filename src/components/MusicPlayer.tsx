import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Disc, ChevronDown, Radio } from 'lucide-react';
import { soundEngine } from '../utils/audio';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // Minimized by default as requested!
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const ytPlayerRef = useRef<any>(null);
  const isYtReadyRef = useRef<boolean>(false);

  const TRACKS = [
    {
      title: "O Maahi",
      artist: "Arijit Singh ‧ 2023 (Dunki)",
      type: "youtube",
      videoId: "bjfKyIAlsZs",
      subtitle: "Sab se alag, sab se haseen... O Maahi Ve ♡",
    },
    {
      title: "O Maahi (Celesta Music Box)",
      artist: "Arijit Singh Melodies in Chimes",
      type: "synth",
      synthIndex: 0,
      subtitle: "Soft romantic chimes for Archita",
    },
    {
      title: "Sweet Birthday Chimes 🎂",
      artist: "Music Box for Archita",
      type: "synth",
      synthIndex: 1,
      subtitle: "Happy Birthday to You",
    },
  ];

  useEffect(() => {
    // Inject YouTube IFrame API script
    if (!document.getElementById('yt-iframe-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const startPlayback = () => {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume * 100);
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch {}
      }
    };

    const setupPlayer = () => {
      if (window.YT && window.YT.Player && !ytPlayerRef.current) {
        ytPlayerRef.current = new window.YT.Player('youtube-audio-frame', {
          height: '1',
          width: '1',
          videoId: 'bjfKyIAlsZs',
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'bjfKyIAlsZs',
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              isYtReadyRef.current = true;
              event.target.setVolume(volume * 100);
            },
            onStateChange: (event: any) => {
              if (event.data === 1) setIsPlaying(true);
              else if (event.data === 2) setIsPlaying(false);
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      window.onYouTubeIframeAPIReady = setupPlayer;
    }

    // Start music automatically after user interacts with the page
    const handleFirstGesture = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        startPlayback();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('start-pookie-music', handleFirstGesture);

    // Toggle event listener from navbar
    const handleToggleAudio = () => {
      handleTogglePlay();
    };
    window.addEventListener('toggle-background-audio', handleToggleAudio);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('start-pookie-music', handleFirstGesture);
      window.removeEventListener('toggle-background-audio', handleToggleAudio);
    };
  }, [hasInteracted, volume]);

  const handleTogglePlay = () => {
    const selected = TRACKS[currentTrack];
    if (selected.type === 'youtube') {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          soundEngine.stopMusic();
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume * 100);
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      }
    } else {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        ytPlayerRef.current.pauseVideo();
      }
      const newState = soundEngine.toggleMusic(selected.synthIndex);
      setIsPlaying(newState);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    soundEngine.setVolume(val);
    if (ytPlayerRef.current && isYtReadyRef.current) {
      ytPlayerRef.current.setVolume(val * 100);
      if (val > 0) ytPlayerRef.current.unMute();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      soundEngine.setVolume(volume);
      if (ytPlayerRef.current && isYtReadyRef.current) {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(volume * 100);
      }
    } else {
      setIsMuted(true);
      soundEngine.setVolume(0);
      if (ytPlayerRef.current && isYtReadyRef.current) {
        ytPlayerRef.current.mute();
      }
    }
    soundEngine.playPop();
  };

  return (
    <>
      {/* Hidden YouTube IFrame Audio */}
      <div className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none">
        <div id="youtube-audio-frame" />
      </div>

      {/* Floating Mini Music Player (Minimized by default as requested!) */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <div className="relative">
          {/* Expanded Player Panel */}
          {isExpanded && (
            <div className="absolute bottom-14 right-0 w-80 p-5 rounded-3xl glass-card border-2 border-pink-400/50 shadow-2xl shadow-purple-950/80 text-pink-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 backdrop-blur-2xl">
              {/* Header with Close / Minimize */}
              <div className="flex items-center justify-between pb-3 border-b border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span className="text-[11px] font-black text-pink-300 uppercase tracking-wider">
                    Romantic Soundtrack
                  </span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full text-pink-400 hover:text-pink-200 hover:bg-white/10 transition-colors"
                  title="Minimize"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Center: Rotating Vinyl Record & Song Details */}
              <div className="flex items-center gap-4 my-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-900 via-purple-950 to-neutral-800 border-2 border-pink-400/50 flex items-center justify-center text-pink-300 shadow-xl relative ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '4s' }}
                >
                  <Disc className="w-8 h-8 text-pink-400/80" />
                  <div className="absolute w-4 h-4 rounded-full bg-pink-500 border border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-pink-100 truncate font-cute">
                    {TRACKS[currentTrack].title}
                  </h4>
                  <p className="text-xs text-pink-300/80 font-medium truncate">
                    {TRACKS[currentTrack].artist}
                  </p>
                  <p className="text-[10px] text-pink-400/70 font-handwriting truncate mt-0.5">
                    "{TRACKS[currentTrack].subtitle}"
                  </p>
                </div>
              </div>

              {/* Animated Audio Visualizer Bars */}
              <div className="flex items-end justify-center gap-1.5 h-8 my-3 bg-purple-950/60 rounded-xl p-2 border border-pink-500/20">
                {[40, 75, 55, 95, 60, 85, 45, 90, 65, 80, 50, 70].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full transition-all duration-150"
                    style={{
                      height: isPlaying ? `${Math.max(20, height * 0.9)}%` : '20%',
                      opacity: isPlaying ? 0.95 : 0.35,
                    }}
                  />
                ))}
              </div>

              {/* Play / Pause & Volume Controls */}
              <div className="flex items-center gap-3 pt-2 border-t border-pink-500/20">
                <button
                  onClick={handleTogglePlay}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg text-pink-300 hover:bg-white/10 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 accent-pink-500 h-1.5 bg-purple-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Minimized Mini Floating Record Button (Discreet, Cute, Non-intrusive) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative w-12 h-12 rounded-full glass-card border border-pink-400/50 shadow-xl shadow-purple-950/80 flex items-center justify-center text-pink-300 hover:border-pink-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? "O Maahi playing (Click to view controls)" : "Music player (Click to open)"}
          >
            {/* Spinning Mini Vinyl */}
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-900 to-purple-950 border border-pink-400/40 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Music className="w-4 h-4 text-pink-400" />
            </div>

            {/* Glowing active indicator dot */}
            {isPlaying && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full ring-2 ring-purple-950 animate-ping" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
