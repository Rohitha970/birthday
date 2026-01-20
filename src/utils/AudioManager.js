let bgMusic = null;
let voice = null;

export function stopAll() {
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0; // reset to start
    bgMusic = null;
  }
  if (voice) {
    voice.pause();
    voice.currentTime = 0;s
    voice = null;
  }
}

export function playBackground(src) {
  stopAll(); // stop other audio first
  bgMusic = new Audio(src);
  bgMusic.loop = true;
  bgMusic.volume = 0.7;
  bgMusic.play().catch(err => {
    // catch AbortError silently
    if (err.name !== "AbortError") console.error(err);
  });
}

export function playVoice(src) {
  stopAll(); // stop other audio first
  voice = new Audio(src);
  voice.play().catch(err => {
    // catch AbortError silently
    if (err.name !== "AbortError") console.error(err);
  });
}
