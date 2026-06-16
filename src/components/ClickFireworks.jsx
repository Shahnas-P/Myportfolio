import React, { useEffect, useRef } from 'react';

const ClickFireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let ripples = [];
    let sparks = [];

    // Cosmic glow colors matching the portfolio theme
    const themeColors = [
      '#6366f1', // Indigo (Primary)
      '#14b8a6', // Teal (Secondary)
      '#a855f7', // Purple (Accent)
      '#ffffff', // High-energy white core
    ];

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = 38;
        this.alpha = 1;
        this.decay = 0.035; // Fades out in about 30 frames
        this.lineWidth = 2;
      }

      update() {
        // Expand radius and fade out
        this.radius += (this.maxRadius - this.radius) * 0.12;
        this.alpha -= this.decay;
        this.lineWidth = Math.max(0.2, this.lineWidth * 0.95);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Glowing stroke shadow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#14b8a6'; // Glowing Teal shockwave ring

        ctx.strokeStyle = '#14b8a6';
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      isDead() {
        return this.alpha <= 0 || this.radius >= this.maxRadius;
      }
    }

    class Spark {
      constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015; // Lifespan decay
        this.size = Math.random() * 2 + 1; // Size in pixels
        this.friction = 0.93; // High friction so sparks slow down near click point
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size *= 0.98; // Slowly shrink
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        // Apply a glowing neon halo matching the theme color
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;

        // Draw colored spark body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw a hot white core in the center of the particle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      isDead() {
        return this.alpha <= 0 || this.size <= 0.2;
      }
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleClick = (e) => {
      // Spawn one shockwave ripple
      ripples.push(new Ripple(e.clientX, e.clientY));

      // Spawn 10 weightless glowing sparks in a 360 degree radial spread
      const sparkCount = 10;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        const color = themeColors[Math.floor(Math.random() * (themeColors.length - 1))]; // Exclude pure white from list selection
        sparks.push(new Spark(e.clientX, e.clientY, angle, speed, color));
      }
    };

    window.addEventListener('mousedown', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw ripples
      ripples = ripples.filter((ripple) => {
        ripple.update();
        if (!ripple.isDead()) {
          ripple.draw();
          return true;
        }
        return false;
      });

      // Update and draw sparks
      sparks = sparks.filter((spark) => {
        spark.update();
        if (!spark.isDead()) {
          spark.draw();
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        background: 'transparent',
      }}
    />
  );
};

export default ClickFireworks;
