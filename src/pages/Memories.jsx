import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Memories.css";

export default function Memories() {
  const nav = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio dynamically from public folder
    audioRef.current = new Audio(
      `${import.meta.env.BASE_URL}assets/audio/mother-song.mp3`
    );
    audioRef.current.loop = true;

    // Try to autoplay safely
    audioRef.current
      .play()
      .then(() => console.log("Audio playing"))
      .catch(() => console.log("Autoplay blocked, user interaction required"));

    // Cleanup on leaving page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const leftImages = [
    { src: `${import.meta.env.BASE_URL}assets/images/mom1.jpeg`, text: "❤️Sweet smile ❤️" },
    { src: `${import.meta.env.BASE_URL}assets/images/mom2.jpeg`, text: "Warm hug 💖" },
    { src: `${import.meta.env.BASE_URL}assets/images/mom3.jpeg`, text: "💕Lovely moments 🌸" },
  ];

  const rightImages = [
    { src: `${import.meta.env.BASE_URL}assets/images/birth.jpeg`, text: "😍Cherished laugh 😍" },
    { src: `${import.meta.env.BASE_URL}assets/images/mom5.jpeg`, text: "💕Caring heart 💕" },
    { src: `${import.meta.env.BASE_URL}assets/images/mom8.jpeg`, text: "💝Precious memories 💝" },
  ];

  return (
    <div className="memories-wrapper">
      {/* Floating Hearts */}
      <div className="hearts-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="heart" style={{ "--i": i / 50 }}></span>
        ))}
      </div>

      {/* Happy Birthday at Top Center */}
      <motion.div
        className="birthday-msg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        🎉 Happy Birthday Mummy! 🎉
      </motion.div>
<div className="left-column">
      {/* LEFT IMAGES */}
      {leftImages.map((img, idx) => (
        <motion.div
          key={idx}
          className="mem-img floating"
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.5 + 1, duration: 1.5 }}
          style={{ top: `${15 + idx * 30}%`, left: "3%" }}
        >
          <img src={img.src} alt="" />
          <p className="img-text">{img.text}</p>
        </motion.div>
      ))}
</div>
<div className="right-column">
      {/* RIGHT IMAGES */}
      {rightImages.map((img, idx) => (
        <motion.div
          key={idx}
          className="mem-img floating"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.5 + 1, duration: 1.5 }}
          style={{ top: `${15 + idx * 30}%`, right: "3%" }}
        >
          <img src={img.src} alt="" />
          <p className="img-text">{img.text}</p>
        </motion.div>
      ))}
</div>
      {/* Center Text */}
      <motion.div
        className="center-message fade-glow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
      >
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 1 }}>
          A mother’s love is endless 💖
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 1 }}>
          A bond beyond words, time, and distance.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4, duration: 1 }}>
          Every memory with you is a blessing,<br />every smile is a ray of warmth.
        </motion.p>
      </motion.div>

      {/* Navigate to Celebration */}
      <button className="celebrate-btn glowing" onClick={() => nav("/celebration")}>
        🎂 Celebrate 🎂
      </button>
    </div>
  );
}
