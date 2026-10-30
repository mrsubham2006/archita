// High-fidelity Web Audio API synthesizer for dreamy music box melodies & cute kawaii sound effects

class DreamyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private currentTrackIndex: number = 0;
  private musicLoopTimeout: any = null;
  private masterVolume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  // Play a soft music-box bell tone
  private playBellTone(freq: number, duration: number, gainMultiplier: number = 1.0) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass to give that soft celestial music box warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, this.ctx.currentTime);

      // Attack and gentle decay (like a celesta / music box tine)
      const now = this.ctx.currentTime;
      const effectiveGain = this.masterVolume * 0.18 * gainMultiplier;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(effectiveGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Ignore audio interruptions
    }
  }

  // Sound Effects
  public playPop() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(this.masterVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  public playChime() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBellTone(freq, 0.8, 0.9);
      }, idx * 70);
    });
  }

  public playBlow() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(this.masterVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.42);
    } catch {}
  }

  public playCheer() {
    this.initContext();
    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.4 },
      { f: 1318.5, d: 0.6 }
    ];
    let offset = 0;
    fanfare.forEach(item => {
      setTimeout(() => {
        this.playBellTone(item.f, item.d * 2.5, 1.2);
      }, offset);
      offset += item.d * 1000;
    });
  }

  public playHeartSound() {
    this.initContext();
    this.playBellTone(880, 0.6, 0.8);
    setTimeout(() => {
      this.playBellTone(1174.66, 0.9, 0.9);
    }, 90);
  }

  // Track 1: "O Maahi" by Arijit Singh (Music Box Celesta Edition)
  private playOMaahiTrack(stepCallback?: (note: number) => void) {
    if (!this.isPlayingMusic) return;
    // O Maahi melody notes (Arijit Singh)
    // "O maahi o maahi, o maahi o maahi..."
    const D4 = 293.66, E4 = 329.63, Fs4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, Cs5 = 554.37, D5 = 587.33;

    const sequence = [
      // "O maahi..."
      { f: A4, d: 350 }, { f: B4, d: 350 }, { f: D5, d: 500 }, { f: Cs5, d: 650 },
      // "...o maahi"
      { f: B4, d: 350 }, { f: A4, d: 350 }, { f: G4, d: 450 }, { f: Fs4, d: 700 },
      // "O maahi o maahi..."
      { f: A4, d: 350 }, { f: B4, d: 350 }, { f: D5, d: 500 }, { f: Cs5, d: 650 },
      { f: B4, d: 350 }, { f: A4, d: 350 }, { f: B4, d: 800 },
      // "Dil ki yeh dua hai..."
      { f: Fs4, d: 300 }, { f: G4, d: 300 }, { f: A4, d: 400 }, { f: A4, d: 400 }, { f: B4, d: 400 }, { f: A4, d: 650 },
      // "kabhi door tu na jaave..."
      { f: G4, d: 300 }, { f: Fs4, d: 300 }, { f: E4, d: 400 }, { f: Fs4, d: 400 }, { f: G4, d: 400 }, { f: Fs4, d: 750 },
      // "Tere bin akele..."
      { f: Fs4, d: 300 }, { f: G4, d: 300 }, { f: A4, d: 400 }, { f: A4, d: 400 }, { f: B4, d: 400 }, { f: A4, d: 650 },
      // "pal ek bhi na reh paaye..."
      { f: G4, d: 300 }, { f: Fs4, d: 300 }, { f: E4, d: 400 }, { f: Fs4, d: 400 }, { f: E4, d: 400 }, { f: D4, d: 900 }
    ];

    let currentDelay = 0;
    sequence.forEach((item, idx) => {
      setTimeout(() => {
        if (this.isPlayingMusic) {
          this.playBellTone(item.f, 1.3, 0.85);
          if (stepCallback) stepCallback(idx);
        }
      }, currentDelay);
      currentDelay += item.d;
    });

    this.musicLoopTimeout = setTimeout(() => {
      if (this.isPlayingMusic) {
        this.playCurrentTrack(stepCallback);
      }
    }, currentDelay + 1000);
  }

  // Track 2: Happy Birthday to You
  private playHappyBirthdayTrack(stepCallback?: (note: number) => void) {
    if (!this.isPlayingMusic) return;
    const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
    
    const sequence = [
      { f: G4, d: 300 }, { f: G4, d: 250 }, { f: A4, d: 550 }, { f: G4, d: 550 }, { f: C5, d: 550 }, { f: B4, d: 900 },
      { f: G4, d: 300 }, { f: G4, d: 250 }, { f: A4, d: 550 }, { f: G4, d: 550 }, { f: D5, d: 550 }, { f: C5, d: 900 },
      { f: G4, d: 300 }, { f: G4, d: 250 }, { f: G5, d: 550 }, { f: E5, d: 550 }, { f: C5, d: 550 }, { f: B4, d: 550 }, { f: A4, d: 850 },
      { f: F5, d: 300 }, { f: F5, d: 250 }, { f: E5, d: 550 }, { f: C5, d: 550 }, { f: D5, d: 550 }, { f: C5, d: 1100 }
    ];

    let currentDelay = 0;
    sequence.forEach((item, idx) => {
      setTimeout(() => {
        if (this.isPlayingMusic) {
          this.playBellTone(item.f, 1.2, 0.85);
          if (stepCallback) stepCallback(idx);
        }
      }, currentDelay);
      currentDelay += item.d;
    });

    this.musicLoopTimeout = setTimeout(() => {
      if (this.isPlayingMusic) {
        this.playCurrentTrack(stepCallback);
      }
    }, currentDelay + 1200);
  }

  // Track 3: Dreamy Pookie Lullaby
  private playLullabyTrack(stepCallback?: (note: number) => void) {
    if (!this.isPlayingMusic) return;
    const notes = [
      523.25, 659.25, 783.99, 987.77, 1046.50, 783.99, 659.25, 587.33,
      523.25, 659.25, 880.00, 783.99, 659.25, 587.33, 523.25, 392.00,
      440.00, 523.25, 659.25, 783.99, 880.00, 659.25, 523.25, 440.00,
      523.25, 587.33, 659.25, 783.99, 1046.50, 987.77, 880.00, 1046.50
    ];

    let currentDelay = 0;
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.isPlayingMusic) {
          this.playBellTone(freq, 1.4, 0.75);
          if (stepCallback) stepCallback(idx);
        }
      }, currentDelay);
      currentDelay += 360;
    });

    this.musicLoopTimeout = setTimeout(() => {
      if (this.isPlayingMusic) {
        this.playCurrentTrack(stepCallback);
      }
    }, currentDelay + 800);
  }

  private playCurrentTrack(stepCallback?: (note: number) => void) {
    if (this.currentTrackIndex === 0) {
      this.playOMaahiTrack(stepCallback);
    } else if (this.currentTrackIndex === 1) {
      this.playHappyBirthdayTrack(stepCallback);
    } else {
      this.playLullabyTrack(stepCallback);
    }
  }

  public startMusic(trackIndex: number = 0, stepCallback?: (note: number) => void) {
    this.initContext();
    this.stopMusic();
    this.isPlayingMusic = true;
    this.currentTrackIndex = trackIndex;
    this.playCurrentTrack(stepCallback);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicLoopTimeout) {
      clearTimeout(this.musicLoopTimeout);
      this.musicLoopTimeout = null;
    }
  }

  public toggleMusic(trackIndex: number = 0, stepCallback?: (note: number) => void): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(trackIndex, stepCallback);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }
}

export const soundEngine = new DreamyAudioEngine();
