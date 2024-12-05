import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MATRIX_CHARACTERS, ANIMATION_CONFIG, THEME_COLORS } from '../constants';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      const { devicePixelRatio: ratio = 1 } = window;
      
      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      
      ctx.scale(ratio, ratio);
    };
    
    setCanvasSize();

    const characters = MATRIX_CHARACTERS.split("");
    const fontSize = ANIMATION_CONFIG.fontSize;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);
    
    let animationFrameId;
    let lastTime = 0;
    const fps = ANIMATION_CONFIG.fps;
    const frameInterval = 1000 / fps;

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;

      const bgOpacity = isDark ? '0.1' : '0.1';
      const bgColor = isDark ? `rgba(0, 0, 0, ${bgOpacity})` : `rgba(255, 255, 255, ${bgOpacity})`;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `bold ${fontSize}px monospace`; 
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
        
        if (isDark) {
          gradient.addColorStop(0, '#00FF00');
          gradient.addColorStop(0.5, '#00DD00');
          gradient.addColorStop(1, '#00AA00');
        } else {
          gradient.addColorStop(0, '#006400');
          gradient.addColorStop(0.5, '#008000');
          gradient.addColorStop(1, '#009900');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);
        
        if (Math.random() > 0.99) {
          ctx.fillStyle = isDark ? '#FFFFFF' : '#004400';
          ctx.fillText(text, x, y);
        }
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      lastTime = currentTime;
    };
    
    animationFrameId = requestAnimationFrame(draw);
    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity: isDark ? ANIMATION_CONFIG.matrixOpacity.dark : ANIMATION_CONFIG.matrixOpacity.light, 
        zIndex: 0,
        background: isDark ? THEME_COLORS.dark.background : THEME_COLORS.light.background
      }}
    />
  );
};

export default MatrixRain;
