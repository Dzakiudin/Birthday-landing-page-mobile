import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import './Cake.css';

const Candle = ({ onBlowOut }: { onBlowOut: () => void }) => {
  const [lit, setLit] = useState(true);

  const handleClick = () => {
    if (lit) {
      setLit(false);
      onBlowOut();
    }
  };

  return (
    <div className={`candle-container ${lit ? 'lit' : 'out'}`} onClick={handleClick}>
      <div className="flame"></div>
      <div className="wick"></div>
      <div className="candle-body"></div>
    </div>
  );
};

const Cake: React.FC = () => {
  const [candlesOut, setCandlesOut] = useState(0);
  const totalCandles = 5;
  const [allOut, setAllOut] = useState(false);

  const handleBlowOut = () => {
    setCandlesOut(prev => prev + 1);
  };

  useEffect(() => {
    if (candlesOut === totalCandles && totalCandles > 0) {
      setAllOut(true);
      // Big confetti burst
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [candlesOut]);

  return (
    <section className="section-container" id="cake">
      <h2 className="section-title">Tiup Lilinnya!</h2>
      
      <div className="cake-display">
        <div className="cake-body-wrapper">
          <div className="candles-container">
            {[...Array(totalCandles)].map((_, i) => (
              <Candle key={i} onBlowOut={handleBlowOut} />
            ))}
          </div>
          
          <div className="cake-layer cake-layer-top"></div>
          <div className="cake-layer cake-layer-middle"></div>
          <div className="cake-layer cake-layer-bottom"></div>
        </div>
      </div>

      {allOut && createPortal(
        <div className="wish-modal-overlay">
          <div className="wish-message bounce-in">
             <h2>✨ Make a Wish, Abdul! ✨</h2>
             <p>Semoga semua impianmu terkabul!</p>
             <button className="btn-close-wish" onClick={() => setAllOut(false)}>Tutup</button>
          </div>
        </div>,
        document.body
      )}

      
      <p className="cake-hint">Ketuk lilin untuk meniupnya!</p>
    </section>
  );
};

export default Cake;
