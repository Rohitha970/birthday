import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Confetti from "../effects/Confetti";
import FloatingHearts from "../effects/FloatingHearts";
import usePageAudio from "../hooks/usePageAudio";


export default function Landing() {
  const nav = useNavigate();

  // ▶ Auto-play landing song from public folder
  usePageAudio("/assets/audio/birthday.mp3", true);

  return (
    <div className="scene landing">
      <Confetti />
      <FloatingHearts />

      <motion.h1
        className="landing-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        🎉💖 Happy Birthday Mom💖🎉
      </motion.h1>

      {/* 🎂 FADE IN / OUT IMAGE from public folder */}
      <motion.img
        src="/assets/images/birth.jpeg"  // ✅ reference directly from public
        className="landing-img"
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        alt="Happy Birthday"
      />

      <motion.button
        className="landing-btn"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => nav("/memories")}
      >
        🎂 Celebrate 🎂 
      </motion.button>
    </div>
  );
}
