import React from "react";
import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.innerText = "❤️";
      heart.className = "floating-heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 30 + 40 + "px";

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}
