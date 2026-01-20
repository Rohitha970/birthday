import React from "react";
import { useEffect } from "react";

export default function Confetti() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const confetti = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);
        c.y += c.speed;
        if (c.y > canvas.height) c.y = -10;
      });
      requestAnimationFrame(animate);
    }

    animate();
    return () => canvas.remove();
  }, []);

  return null;
}
