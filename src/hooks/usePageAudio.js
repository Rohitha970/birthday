import { useEffect, useRef } from "react";

// 🟢 Single global audio instance to avoid overlapping
let globalAudio = null;

export default function usePageAudio(src, autoPlay = true) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    // Stop any previously playing audio
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.currentTime = 0;
    }

    // Create new Audio instance
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    globalAudio = audio;

    if (autoPlay) {
      audio
        .play()
        .catch(() => {
          console.log("Autoplay blocked by browser");
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, autoPlay]);

  return audioRef;
}
