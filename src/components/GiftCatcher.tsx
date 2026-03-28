import React, { useState, useEffect, useRef } from 'react';
import './GiftCatcher.css';

interface Item {
    id: number;
    x: number;
    y: number;
    emoji: string;
    speed: number;
}

const GiftCatcher: React.FC = () => {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const [score, setScore] = useState(0);
    const [basketX, setBasketX] = useState(50);
    const [items, setItems] = useState<Item[]>([]);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | undefined>(undefined);
    const lastItemTime = useRef<number>(0);

    const emojis = ['🎁', '🍰', '🎈', '🎉', '🌟'];

    const startGame = () => {
        setScore(0);
        setItems([]);
        setGameState('PLAYING');
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (gameState !== 'PLAYING' || !gameAreaRef.current) return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const x = ((clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(10, Math.min(90, x)));
    };

    const updateGame = (time: number) => {
        if (gameState !== 'PLAYING') return;

        // Spawn items
        if (time - lastItemTime.current > 1000) {
            const newItem: Item = {
                id: Date.now(),
                x: Math.random() * 80 + 10,
                y: -10,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                speed: 2 + Math.random() * 2
            };
            setItems(prev => [...prev, newItem]);
            lastItemTime.current = time;
        }

        // Move items and check collisions
        setItems(prev => {
            const newItems: Item[] = [];
            let scored = false;
            
            for (const item of prev) {
                const nextY = item.y + item.speed;
                
                // Collision detection (roughly basket height)
                if (nextY > 82 && nextY < 88 && Math.abs(item.x - basketX) < 12) {
                    scored = true;
                    continue; 
                }

                if (nextY < 105) {
                    newItems.push({ ...item, y: nextY });
                }
            }
            if (scored) setScore(s => s + 1);
            return newItems;
        });

        requestRef.current = requestAnimationFrame(updateGame);
    };

    useEffect(() => {
        if (gameState === 'PLAYING') {
            requestRef.current = requestAnimationFrame(updateGame);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, basketX]);

    return (
        <section className="section-container" id="gift-catcher">
            <h2 className="section-title">Gift Catcher</h2>
            <div 
                className="game-area" 
                ref={gameAreaRef} 
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
            >
                {gameState === 'IDLE' && (
                    <div className="game-overlay">
                        <h3>Tangkap Kado Sebanyak Mungkin!</h3>
                        <button className="btn-start-game" onClick={startGame}>Mulai Game</button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <>
                        <div className="game-score">Score: {score}</div>
                        {items.map(item => (
                            <div 
                                key={item.id} 
                                className="falling-item"
                                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                            >
                                {item.emoji}
                            </div>
                        ))}
                        <div 
                            className="basket"
                            style={{ left: `${basketX}%` }}
                        >
                            🧺
                        </div>
                    </>
                )}
            </div>
            <p className="game-hint">Gerakkan keranjang (geser jari/mouse) buat nangkep kado!</p>
        </section>
    );
};

export default GiftCatcher;
