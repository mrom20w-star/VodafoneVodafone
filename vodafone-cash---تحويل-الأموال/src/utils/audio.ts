/**
 * Audio playback helper for Vodafone Cash
 * Uses the exact user-uploaded audio file: /assets/aistudio/file_6c92a2ac.mp3
 * Ensures strictly ONCE playback per transaction with 2.5s debounce guard.
 */

const AUDIO_SRC = '/assets/aistudio/file_6c92a2ac.mp3';

let audioContext: AudioContext | null = null;
let cachedAudioBuffer: AudioBuffer | null = null;
let isAudioBufferLoading = false;
let userAudioElement: HTMLAudioElement | null = null;

// Debounce timer to strictly prevent duplicate "cha-ching" plays
let lastPlayTimestamp = 0;
const MIN_PLAY_INTERVAL_MS = 2500;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }
  return audioContext;
}

export function preloadSuccessAudio() {
  if (typeof window === 'undefined') return;

  // 1. Preload HTMLAudioElement
  if (!userAudioElement) {
    userAudioElement = new Audio(AUDIO_SRC);
    userAudioElement.preload = 'auto';
  }

  // 2. Pre-fetch & decode into Web Audio Buffer for 0ms zero-latency playback
  if (!cachedAudioBuffer && !isAudioBufferLoading) {
    const ctx = getAudioContext();
    if (ctx) {
      isAudioBufferLoading = true;
      fetch(AUDIO_SRC)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
        .then((decoded) => {
          cachedAudioBuffer = decoded;
          isAudioBufferLoading = false;
        })
        .catch(() => {
          isAudioBufferLoading = false;
        });
    }
  }
}

export function unlockAudio() {
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    preloadSuccessAudio();
    if (userAudioElement) {
      userAudioElement.load();
    }
  } catch {
    // Ignore error
  }
}

export function playKeypadTick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Ignore
  }
}

/**
 * Plays the user's custom cash register ("جي جينج" / "cha-ching") sound.
 * Strictly plays ONCE per trigger and rejects duplicate concurrent requests within 2.5 seconds.
 */
export function playCashRegisterSound() {
  const now = Date.now();
  if (now - lastPlayTimestamp < MIN_PLAY_INTERVAL_MS) {
    // Already played recently - strictly prevent repetition!
    return;
  }
  lastPlayTimestamp = now;

  try {
    let playedViaWebAudio = false;

    // Method 1: Web Audio Buffer (Instant, 0 latency, immune to browser HTMLAudio locks)
    const ctx = getAudioContext();
    if (ctx && cachedAudioBuffer) {
      try {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const source = ctx.createBufferSource();
        source.buffer = cachedAudioBuffer;
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(1.0, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
        playedViaWebAudio = true;
      } catch {
        playedViaWebAudio = false;
      }
    }

    // Method 2: Fallback to HTMLAudioElement ONLY if Web Audio didn't play (NEVER BOTH!)
    if (!playedViaWebAudio) {
      try {
        if (!userAudioElement) {
          userAudioElement = new Audio(AUDIO_SRC);
        }
        userAudioElement.currentTime = 0;
        userAudioElement.volume = 1.0;
        const promise = userAudioElement.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      } catch {
        // Ignore
      }
    }
  } catch {
    // Ignore error
  }
}

// Automatically initiate preload on script import
if (typeof window !== 'undefined') {
  preloadSuccessAudio();
}
