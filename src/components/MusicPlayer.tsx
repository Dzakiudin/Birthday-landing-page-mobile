import React, { useState, useRef } from 'react';
import './MusicPlayer.css';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Play failed:", err);
      });
    }
    setShowOverlay(false);
  };

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log("Play failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="music-overlay" onClick={startExperience}>
          <div className="overlay-content">
            <div className="overlay-icon">🎁</div>
            <h2>Ada kejutan buat Abdul!</h2>
            <p>Klik di mana saja untuk memulai...</p>
          </div>
        </div>
      )}
      
      <div className="music-player-container">
        <audio 
          ref={audioRef} 
          src="/music.mp3" 
          loop 
        />
        <button 
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`} 
          onClick={toggleMusic}
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z" />
            </svg>
          )}
          <span className="music-status-text">{isPlaying ? 'On' : 'Off'}</span>
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
