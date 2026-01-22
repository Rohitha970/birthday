import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Confetti from "../effects/Confetti";
import QRCodeShare from "../components/QRCodeShare";
import "./surprise.css";

export default function Surprise() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [heartInterval, setHeartInterval] = useState(null);

  /* =======================
     TYPING TEXT
  ======================= */
  const fullText =
    "Moom, your love has always been my silent strength and my strongest support. " +
    "Every sacrifice you made, every prayer you whispered, and every smile you gave shaped the person I am today.\n\n" +
    "This birthday is not just about celebrating another year, but about celebrating the heart of our family — " +
    "your kindness, patience, and endless care. You are my comfort, my courage, and my forever home.";

  const [typedText, setTypedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[indexRef.current]);
      indexRef.current++;
      if (indexRef.current >= fullText.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  /* =======================
     AUTOPLAY AUDIO
  ======================= */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay blocked by browser"));
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  /* =======================
     HEART ANIMATION
  ======================= */
  const createHeart = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      size: Math.random() * 20 + 20,
      left: Math.random() * 80 + 10,
      duration: Math.random() * 3 + 3,
      rotate: Math.random() * 360,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(
      () => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)),
      newHeart.duration * 1000
    );
  };

  const handleGiftClick = () => {
    if (heartInterval) return;
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) createHeart();
    }, 300);
    setHeartInterval(interval);
    setTimeout(() => {
      clearInterval(interval);
      setHeartInterval(null);
    }, 5000);
  };

  /* =======================
     QR CODE CLICK
  ======================= */
  const handleQRClick = () => {
    navigate("/");
    setTimeout(() => {
      window.location.href = "https://github.com/Rohitha970";
    }, 2500);
  };

  return (
    <div className="surprise">
      <Confetti />

      {/* Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="heart"
            style={{
              width: heart.size,
              height: heart.size,
              left: `${heart.left}%`,
              rotate: heart.rotate,
            }}
            initial={{ y: 0, opacity: 0.9 }}
            animate={{ y: -window.innerHeight - 100, opacity: 0 }}
            transition={{ duration: heart.duration, ease: "easeOut" }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}assets/audio/my-voice.mp3`}
        preload="auto"
        playsInline
        loop
      />

      <h1 className="top-title">🎉 Happy Birthday Mom 🎉</h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        💖 This is for you 💖
      </motion.p>

      <p className="main-text">{typedText}</p>

      {/* Audio toggle button */}
      <button className="voice-btn center-btn" onClick={toggleAudio}>
        <span className="btn-text">
          {isPlaying
            ? "⏸ The day the world became brighter.💖"
            : "▶ Today is special, because you are 💖"}
        </span>
      </button>

      {/* Bottom Section */}
      <div className="bottom-section">
        <motion.div
          className="bottom-item"
          whileTap={{ scale: 0.9 }}
          onClick={handleGiftClick}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/gift.jpeg`}
            alt="Gift"
          />
        </motion.div>

        <motion.div
          className="bottom-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/birth.jpeg`}
            alt="Mom"
          />
        </motion.div>

        <motion.div
          className="bottom-item qr-wrapper"
          onClick={handleQRClick}
        >
          <div className="qr-code-box">
            <QRCodeShare />
          </div>
          <p className="qr-text">🎉 Mom, it’s for you 🎉</p>
        </motion.div>
      </div>
    </div>
  );
}
