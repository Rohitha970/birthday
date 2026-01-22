import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Confetti from "../effects/Confetti";
import "./Celebration.css";

export default function Celebration() {
  const nav = useNavigate();
  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Create audio and autoplay
    audioRef.current = new Audio(
      `${import.meta.env.BASE_URL}assets/audio/birthday.mp3`
    );
    audioRef.current.loop = true;

    // Try autoplay
    audioRef.current
      .play()
      .catch(() => console.log("Autoplay blocked by browser"));

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    // Cleanup when leaving page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="scene celebration-page">
      <Confetti />

      {/* Sparkles overlay */}
      <div className="sparkles">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.5, 1], y: [-20, 20, -20] }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Happy Birthday Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="celebration-title"
      >
        🎉 Happy Birthday princess! 🎉
      </motion.h1>

      {/* Countdown text */}
      {countdown > 0 && (
        <motion.div
          className="countdown"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.6 }}
        >
          {countdown}
        </motion.div>
      )}

      {/* Centered cake image */}
      <motion.img
        src={`${import.meta.env.BASE_URL}assets/images/cake.jpeg`}
        alt="Birthday Cake"
        className="cake-image"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Open gift button */}
      <motion.button
        className="open-gift-btn"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        onClick={() => nav("/surprise")}
      >
        🎁 Open Gift
      </motion.button>
    </div>
  );
}
