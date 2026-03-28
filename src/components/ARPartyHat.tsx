import React, { useRef, useState, useEffect } from 'react';
import './ARPartyHat.css';

const ARPartyHat: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1080 },
                    height: { ideal: 1440 },
                    aspectRatio: { ideal: 0.75 } // 3:4 ratio
                }, 
                audio: false 
            });
            setStream(mediaStream);
            setIsCameraOpen(true);
            setCapturedImage(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Gak bisa buka kamera nih, pastikan izin kameranya diaktifkan ya!");
        }
    };

    // Use effect to handle stream assignment when video element becomes available
    useEffect(() => {
        if (isCameraOpen && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play().catch(e => console.error("Video play error:", e));
            };
        }
    }, [isCameraOpen, stream]);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState < 2) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Target aspect ratio 3:4
        const targetRatio = 3 / 4;
        const videoRatio = video.videoWidth / video.videoHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        // Calculate dimensions to crop video to 3:4
        if (videoRatio > targetRatio) {
            // Video is wider than 3:4 (e.g. 16:9)
            drawHeight = video.videoHeight;
            drawWidth = video.videoHeight * targetRatio;
            offsetX = (video.videoWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Video is taller than 3:4
            drawWidth = video.videoWidth;
            drawHeight = video.videoWidth / targetRatio;
            offsetX = 0;
            offsetY = (video.videoHeight - drawHeight) / 2;
        }

        // Set canvas to the cropped size (let's use a decent height like 1200)
        canvas.height = 1200;
        canvas.width = 1200 * targetRatio;

        // Mirror and draw cropped video
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(
            video, 
            offsetX, offsetY, drawWidth, drawHeight, 
            0, 0, canvas.width, canvas.height
        );
        
        // Reset transform to draw emojis
        context.setTransform(1, 0, 0, 1, 0, 0);
        
        const hatSize = canvas.width * 0.18;
        context.font = `${hatSize}px serif`;
        context.textAlign = 'center';
        
        // Match UI positions (relative to 3:4 canvas)
        // Center hat (8% from top)
        context.fillText('🥳', canvas.width * 0.5, canvas.height * 0.12);

        // Left balloon (15% from top, 15% from left)
        context.save();
        context.translate(canvas.width * 0.15, canvas.height * 0.20);
        context.rotate(-0.3);
        context.fillText('🎈', 0, 0);
        context.restore();

        // Right gift (15% from top, 85% from left)
        context.save();
        context.translate(canvas.width * 0.85, canvas.height * 0.20);
        context.rotate(0.3);
        context.fillText('🎁', 0, 0);
        context.restore();

        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        stopCamera();
    };

    return (
        <section className="section-container" id="ar-selfie">
            <h2 className="section-title">AR Selfie Party</h2>
            <div className="ar-container">
                {!isCameraOpen && !capturedImage && (
                    <div className="ar-placeholder">
                        <div className="ar-icon">📸</div>
                        <button className="btn-ar" onClick={startCamera}>Buka Kamera Selfie</button>
                    </div>
                )}

                {isCameraOpen && (
                    <div className="video-wrapper">
                        <video ref={videoRef} autoPlay playsInline muted className="video-feed" />
                        <div className="ar-arch">
                            <span className="ar-item left">🎈</span>
                            <span className="ar-item center">🥳</span>
                            <span className="ar-item right">🎁</span>
                        </div>
                        <div className="camera-controls">
                            <button className="btn-capture" onClick={takePhoto}>📸 Foto!</button>
                            <button className="btn-cancel" onClick={stopCamera}>Batal</button>
                        </div>
                    </div>
                )}

                {capturedImage && (
                    <div className="result-wrapper">
                        <img src={capturedImage} alt="Selfie Result" className="captured-img" />
                        <div className="result-controls">
                            <button className="btn-ar" onClick={startCamera}>Foto Lagi</button>
                            <a href={capturedImage} download="abdul-party.png" className="btn-download">Simpan Foto</a>
                        </div>
                    </div>
                )}
                
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <p className="ar-hint">Pasang topi pesta digitalmu dan ambil foto gokil!</p>
        </section>
    );
};

export default ARPartyHat;
