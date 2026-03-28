import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import './Wishes.css';

const wishesData = [
  { id: 1, text: "Semoga Anda selalu sehat, kaya, dan bahagia selamanya. Karena kalau tidak, setidaknya umurmu sudah cukup panjang untuk menyesal.", author: "Ahok", color: "pink" },
  { id: 2, text: "Gimana wisata masalalunya dul? 🤭", author: "Ardy", color: "purple" },
  { id: 3, text: "#", author: "Fizi", color: "purple" },
  { id: 4, text: "Semua manusia hanyalah alat.", author: "Ayanokouji", color: "yellow" },
  { id: 5, text: "Kenapa buku matematika sedih? Karena terlalu banyak masalah xixixi", author: "ChatGPT", color: "pink" },
  { id: 6, text: "Linganguli guli guli wacha, lingangu, lingangu talamalekom malekom talaaaaa", author: "Don Pollo", color: "cyan" }
];

const Wishes: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isDisco, setIsDisco] = useState(false);
  const clickTimerRef = useRef<any>(null);

  const triggerConfetti = () => {
    // Disco mode logic: if clicked 5 times rapidly
    setClickCount(prev => prev + 1);
    
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setClickCount(0), 1000);

    if (clickCount + 1 >= 5) {
      setIsDisco(!isDisco);
      setClickCount(0);
    }

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section className={`section-container ${isDisco ? 'disco-active' : ''}`} id="wishes">
      <h2 className="section-title">Wishes Wall</h2>
      
      <div className="wishes-grid">
        {wishesData.map((wish) => (
          <div key={wish.id} className={`wish-bubble bubble-${wish.color}`}>
            <p className="wish-text">"{wish.text}"</p>
            <p className="wish-author">- {wish.author}</p>
          </div>
        ))}
      </div>

      <div className={`party-box ${isDisco ? 'disco-party' : ''}`}>
        <h2 className="party-title">{isDisco ? '🕺 DISCO MODE! 💃' : 'Ready to party?'}</h2>
        <p className="party-subtitle">{isDisco ? 'Wooohooo! Terus klik buat heboh!' : "Let's make this the best birthday yet!"}</p>
        <button className="btn-confetti" onClick={triggerConfetti}>
          🎉 Trigger Confetti
        </button>
      </div>
    </section>
  );
};

export default Wishes;
