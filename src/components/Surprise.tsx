import React, { useState } from 'react';
import './Surprise.css';

const GiftSvg = ({ isShaking }: { isShaking: boolean }) => (
  <svg 
    className={`gift-svg ${isShaking ? 'shaking' : ''}`} 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="100" cy="180" rx="60" ry="10" fill="rgba(0,0,0,0.1)" />
    
    {/* Box Bottom */}
    <rect x="50" y="90" width="100" height="80" rx="5" fill="#00bcd4" />
    <rect x="50" y="90" width="40" height="80" fill="#00acc1" />
    
    {/* Ribbon Vertical */}
    <rect x="90" y="90" width="20" height="80" fill="#e91e63" />
    
    {/* Box Lid */}
    <rect x="40" y="70" width="120" height="25" rx="5" fill="#ff4081" />
    <rect x="40" y="70" width="120" height="10" fill="#f50057" />
    
    {/* Ribbon Horizontal on Lid */}
    <rect x="90" y="70" width="20" height="25" fill="#ffeb3b" />
    
    {/* Bow */}
    <path d="M 100 70 C 80 40, 50 50, 80 70 Z" fill="#ffeb3b" stroke="#fbc02d" strokeWidth="2" />
    <path d="M 100 70 C 120 40, 150 50, 120 70 Z" fill="#ffeb3b" stroke="#fbc02d" strokeWidth="2" />
    
    {/* Action lines for shaking effect */}
    {isShaking && (
      <>
        <path d="M 20 100 Q 10 120 20 140" stroke="#f50057" strokeWidth="3" fill="none" />
        <path d="M 30 90 Q 20 110 30 130" stroke="#f50057" strokeWidth="3" fill="none" />
        <path d="M 180 100 Q 190 120 180 140" stroke="#f50057" strokeWidth="3" fill="none" />
        <path d="M 170 90 Q 180 110 170 130" stroke="#f50057" strokeWidth="3" fill="none" />
        
        {/* Sparkles */}
        <path d="M 40 40 L 45 30 L 50 40 L 40 45 Z" fill="#ffeb3b" />
        <path d="M 160 50 L 165 40 L 170 50 L 160 55 Z" fill="#ffeb3b" />
      </>
    )}
  </svg>
);

const Surprise: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <section className="section-container" id="surprise">
      <h2 className="section-title">Hadiah kamu</h2>
      
      <div className="card">
        <div 
          className="gift-container" 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpen}
        >
          {!opened ? (
            <GiftSvg isShaking={isHovered} />
          ) : (
            <div className="opened-message bounce-in">
              <h3>🎉 Surprise! 🎉</h3>
              <p>Terima kasih sudah membuktikan bahwa bertambah umur tidak selalu berarti bertambah bijak 🤭.</p>
            </div>
          )}
        </div>
        
        <div className="card-content">
          <div className="card-text">
            <h3 className="card-subtitle">Kotak Hadiah Interaktif</h3>
            <p className="card-desc">Ketuk kotak untuk melihat pesan ulang tahun spesial Anda!</p>
          </div>
          
          {!opened && (
            <button className="btn-secondary" onClick={handleOpen}>
              Buka Hadiah
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Surprise;
