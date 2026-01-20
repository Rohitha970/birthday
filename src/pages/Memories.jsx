import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Memories.css";

export default function Memories() {
  const nav = useNavigate();
  
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Try autoplay on mount
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playing");
          })
          .catch((error) => {
            console.log("Autoplay blocked, user interaction required");
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const leftImages = [
    { src: "/assets/images/mom1.jpeg", text: "Sweet smile ❤️" },
    { src: "/assets/images/mom2.jpeg", text: "Warm hug 💖" },
    { src: "/assets/images/mom3.jpeg", text: "Lovely moments 🌸" },
  ];

  const rightImages = [
    { src: "/assets/images/birth.jpeg", text: "Cherished laugh 😍" },
    { src: "/assets/images/mom5.jpeg", text: "Caring heart 💕" },
    { src: "/assets/images/mom8.jpeg", text: "Precious memories 🌷" },
  ];

  return (
    <div className="memories-wrapper">
      {/* Audio */}
      <audio ref={audioRef} src="/assets/audio/mother-song.mp3" loop autoPlay />

      {/* Floating Hearts */}
      <div className="hearts-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="heart" style={{ "--i": i / 50 }}></span>
        ))}
      </div>

      {/* Happy Birthday at TOP CENTER */}
      <motion.div
        className="birthday-msg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        🎉 Happy Birthday Mummy ! 🎉
      </motion.div>

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

  {/* Center Typed Text */}
{/* Center Text */}
<motion.div
  className="center-message fade-glow"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 2, duration: 1.2 }}
>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.2, duration: 1 }}
  >
    A mother’s love is endless 💖
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.8, duration: 1 }}
  >
    A bond beyond words, time, and distance.
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 3.4, duration: 1 }}
  >
    Every memory with you is a blessing,<br />
    every smile is a ray of warmth,<br />
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 4.4, duration: 1 }}
  >
    
  </motion.p>
</motion.div>

      

      
      

    
      <button
        className="celebrate-btn glowing"
      
        onClick={() => nav("/celebration")}
      >
        🎂 Celebrate 🎂 
      </button>
    </div>
  );
}
