class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private clickSfx: HTMLAudioElement | null = null;
  private hoverSfx: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  public isPlaying = false;

  private constructor() {
    if (typeof window !== "undefined") {
      // Gentle, high-end synth pad/melody
      this.audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
      this.audio.loop = true;
      this.audio.volume = 0.1; // Low ambient sound

      // Light tactile click sound
      this.clickSfx = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
      this.clickSfx.volume = 0.05;

      // Soft high-frequency hover sweep
      this.hoverSfx = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
      this.hoverSfx.volume = 0.02;
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public toggle() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.warn("Audio play blocked by browser policy. User gesture required.", err);
        });
    }
    this.notify();
  }

  public playClick() {
    if (this.clickSfx) {
      const clone = this.clickSfx.cloneNode(true) as HTMLAudioElement;
      clone.volume = 0.05;
      clone.play().catch(() => {});
    }
  }

  public playHover() {
    if (this.hoverSfx) {
      const clone = this.hoverSfx.cloneNode(true) as HTMLAudioElement;
      clone.volume = 0.02;
      clone.playbackRate = 1.8;
      clone.play().catch(() => {});
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }
}

export const getAudioManager = () => {
  if (typeof window !== "undefined") {
    return AudioManager.getInstance();
  }
  return null;
};
export default getAudioManager;
