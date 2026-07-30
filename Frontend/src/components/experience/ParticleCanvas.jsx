import React, { useEffect, useRef } from "react";

/**
 * ParticleCanvas component for floating ambient background effects.
 * 
 * @param {string} [type="hearts"] - Particle shape ('hearts' | 'sparkles' | 'bubbles')
 * @param {number} [count=30] - Max particle count
 * @param {string} [color="#ec4899"] - Base color theme (hex string)
 */
const ParticleCanvas = ({ type = "hearts", count = 30, color = "#ec4899" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create particles
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
    }));

    const drawHeart = (ctx, x, y, size, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const d = size;
      ctx.moveTo(x, y + d / 4);
      ctx.quadraticCurveTo(x, y, x - d / 2, y);
      ctx.quadraticCurveTo(x - d, y, x - d, y + d / 2);
      ctx.quadraticCurveTo(x - d, y + (d * 3) / 4, x, y + d);
      ctx.quadraticCurveTo(x + d, y + (d * 3) / 4, x + d, y + d / 2);
      ctx.quadraticCurveTo(x + d, y, x + d / 2, y);
      ctx.quadraticCurveTo(x, y, x, y + d / 4);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (ctx, x, y, size, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (type === "sparkles") {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, count, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleCanvas;
