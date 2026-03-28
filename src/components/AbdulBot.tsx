import React, { useState, useRef, useEffect } from 'react';
import './AbdulBot.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const AbdulBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Halo Abdul! Selamat ulang tahun ya! Mau ngobrol apa kita hari ini? Aku beneran pinter sekarang! 🤖✨", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const getBotResponse = async (userText: string) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
        
        if (!apiKey || apiKey === 'undefined') {
            return "Waduh, kunci Gemini-nya belum kebaca nih! Coba bapak restart dulu 'npm run dev'-nya ya. 🔑";
        }

        console.log("Abdul-Bot: Manggil Gemini API...");

        try {
            // Re-trying gemini-1.5-flash with v1beta endpoint
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{ "text": `System: You are Abdul-Bot, a fun AI companion for Abdul's birthday. Use casual Indonesian slang. Mention things like martabak or Pak Ahok if funny. Keep it short.\n\nUser: ${userText}` }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Gemini Error Detail:", errorData);
                return `Waduh, ada error ${response.status}: ${errorData.error?.message || 'Coba cek API Key bapak udah di-enable buat Gemini API belum?'}`;
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || "Aduh, AI-nya diem aja... Tapi HBD ya Abdul! 🎉";
        } catch (error) {
            console.error("Fetch Exception:", error);
            return "Waduh, gagal konek ke internet/server AI! Coba cek koneksi bapak ya. 🎁";
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const botResponseText = await getBotResponse(input);
        
        const botMsg: Message = { 
            id: Date.now() + 1, 
            text: botResponseText, 
            sender: 'bot' 
        };
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
    };

    return (
        <>
            <button className={`bot-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '🤖'}
            </button>

            {isOpen && (
                <div className="bot-window bounce-in">
                    <div className="bot-header">
                        <h3>Abdul-Bot 🤖</h3>
                        <p>AI Birthday Companion</p>
                    </div>
                    <div className="bot-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-bubble bot loading">
                                <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="bot-input-area">
                        <input 
                            type="text" 
                            placeholder="Tanya sesuatu ke bot..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="btn-send" onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AbdulBot;
