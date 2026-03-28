import React, { useState } from 'react';
import './Gallery.css';

const polaroids = [
  {
    id: 1,
    imageUrl: '/1.png', // Taro gambar 1 di folder 'public' dengan nama 'photo1.jpg'
    caption: 'Masih ingat momen ini? Waktu itu kita disuruh Pak Acik membuat folder di Google Drive dan mengisinya dengan foto kita masing-masing.',
    rotation: -5
  },
  {
    id: 2,
    imageUrl: '/3.png', // Taro gambar 2 di folder 'public' dengan nama 'photo2.jpg'
    caption: 'Ini momen ketika Abdul sedang berada di masa prima-primanya dalam berolahraga.',
    rotation: 2
  },
  {
    id: 3,
    imageUrl: '/2.png', // Taro gambar 3 di folder 'public' dengan nama 'photo3.jpg'
    caption: 'Abdul Ibuccomp, di mana waktu itu Abdul sedang memperbaiki laptopnya yang artefak. Eh, ternyata malah sia-sia—tetap tidak hidup. 😝',
    rotation: -3
  }
];

const PolaroidCard = ({ photo }: { photo: any }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      className="polaroid-card"
      style={{ 
        transform: `rotate(${photo.rotation}deg) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        zIndex: tilt.x !== 0 || tilt.y !== 0 ? 100 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="polaroid-image-wrapper">
        <img src={photo.imageUrl} alt={photo.caption} className="polaroid-image" />
      </div>
      <div className="polaroid-caption">
        {photo.caption}
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section className="section-container" id="gallery">
      <h2 className="section-title">Memories Gallery</h2>
      
      <div className="gallery-container">
        {polaroids.map((photo) => (
          <PolaroidCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
