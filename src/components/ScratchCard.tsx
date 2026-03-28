import React, { useRef, useEffect, useState } from 'react';
import './ScratchCard.css';

const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill canvas with gray "scratch" layer
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise/texture
    for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    ctx.font = 'bold 20px Nunito';
    ctx.fillStyle = '#888';
    ctx.textAlign = 'center';
    ctx.fillText('GOSOK DI SINI!', canvas.width / 2, canvas.height / 2 + 10);
  }, []);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check progress (optional but good for auto-reveal)
    checkReveal(ctx);
  };

  const checkReveal = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 50) {
      setIsRevealed(true);
    }
  };

  return (
    <section className="section-container" id="scratch">
      <h2 className="section-title">Pesan Rahasia</h2>
      <div className="scratch-card-wrapper">
        <div className="hidden-content">
          <h3>💌 Special Note 💌</h3>
          <p>Selamat ulang tahun Abdul! Apapun tantangan yang dateng (termasuk dari Pak Ahok wkwk), inget ya lo itu keren banget!</p>
          <div className="secret-code">Code: ABSOLUTE-LEGEND-2024</div>
        </div>
        
        <canvas
          ref={canvasRef}
          width={320}
          height={200}
          className={`scratch-canvas ${isRevealed ? 'revealed' : ''}`}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseMove={scratch}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={scratch}
        />
      </div>
      <p className="scratch-hint">Gosok kotak perak di atas buat liat pesannya!</p>
    </section>
  );
};

export default ScratchCard;
