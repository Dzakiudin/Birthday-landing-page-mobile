import React, { useState } from 'react';
import './Hero.css';

const Balloon = ({ color, style }: { color: string, style: React.CSSProperties }) => {
  const [popped, setPopped] = useState(false);

  const handlePop = () => {
    if (!popped) {
      setPopped(true);
    }
  };

  if (popped) {
    return (
      <div className="balloon-wrapper popped" style={style}>
         <span className="pop-emoji">✨</span>
      </div>
    );
  }

  return (
    <div className="balloon-wrapper" style={style} onClick={handlePop}>
      <svg className="balloon" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 120 C 10 120, 0 60, 0 40 C 0 10, 20 0, 50 0 C 80 0, 100 10, 100 40 C 100 60, 90 120, 50 120 Z" fill={color} />
        {/* Balloon tie */}
        <path d="M45 120 L 55 120 L 60 130 L 40 130 Z" fill={color} />
        {/* String */}
        <path d="M50 130 Q 60 160 40 190 Q 60 220 50 250" stroke="#888" strokeWidth="1" fill="none" />
        {/* Highlight/Gloss */}
        <path d="M 20 25 C 20 15, 30 10, 40 10 C 30 15, 25 25, 25 35 C 25 40, 20 30, 20 25 Z" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Background Balloons */}
      <div className="balloons-container">
        <Balloon color="#ff4d94" style={{ left: '-5%', top: '5%', animationDelay: '0s' }} />
        <Balloon color="#9b5de5" style={{ left: '-15%', top: '25%', animationDelay: '1s' }} />
        <Balloon color="#00bbf9" style={{ left: '5%', top: '45%', animationDelay: '2s' }} />
        <Balloon color="#fee440" style={{ right: '-5%', top: '10%', animationDelay: '0.5s' }} />
        <Balloon color="#ff4d94" style={{ right: '-15%', top: '35%', animationDelay: '1.5s' }} />
        <Balloon color="#00bbf9" style={{ right: '5%', top: '55%', animationDelay: '2.5s' }} />
        <Balloon color="#fee440" style={{ right: '15%', top: '75%', animationDelay: '3s' }} />
      </div>

      <div className="hero-content">
        <div className="small-heading">Happy Birthday</div>
        
        <div className="main-title-container">
           <h1 className="main-title">
             <span className="title-word">Happy</span>
             <br/>
             <span className="title-word">Birthday</span>
             <br/>
             <span className="title-word">Abdul!</span>
           </h1>
        </div>
        
        <p className="hero-subtitle">
          Semoga harimu dipenuhi dengan<br/>
          cinta, sukacita, dan tekanan mental dari ahok.
        </p>

        <button className="btn-primary" onClick={() => {
          // scroll to surprise
          const el = document.getElementById('surprise');
          if(el) el.scrollIntoView({ behavior: 'smooth' });
        }}>
          Let's Celebrate
        </button>
      </div>
    </section>
  );
};

export default Hero;
