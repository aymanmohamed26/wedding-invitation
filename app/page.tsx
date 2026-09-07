"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarHeart, MapPin, Music, Pause } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set wedding date (Oct 1, 2026)
    const targetDate = new Date("2026-10-01T20:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openEnvelope = () => {
    setIsOpen(true);
    // Play music when opened
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed:", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start font-[family-name:var(--font-cairo)] relative overflow-x-hidden">
      <audio ref={audioRef} loop src="/music.mp3" />
      
      {/* Music Control */}
      {isOpen && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[999] w-12 h-12 bg-[#a98f5b] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        >
          {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Pause className="w-5 h-5" />}
        </button>
      )}

      {/* Envelope Section */}
      <div className={`relative w-[90vw] max-w-[500px] h-[60vw] max-h-[350px] cursor-pointer perspective-[1000px] z-[200] transition-all duration-1000 ease-in-out mt-[15vh] ${isOpen ? 'opacity-0 pointer-events-none -translate-y-[50vh] fixed' : ''}`} onClick={openEnvelope}>
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#d4c4a8] rounded-[5px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] z-10"></div>
        {/* Envelope Front Flaps */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e8decb]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e8decb]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#f2eadb] z-40 pointer-events-none" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-[#c9b99b] origin-top z-50" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#a98f5b] rounded-full text-white flex justify-center items-center font-[family-name:var(--font-great-vibes)] text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-[60]">A&N</div>
        </div>
        <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 font-bold text-[#5A6B50] bg-white px-5 py-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] animate-bounce whitespace-nowrap z-[70]">اضغط للفتح 👇</div>
      </div>

      {/* Main Scrolling Content (Hidden until opened) */}
      <div className={`w-full bg-[#FAFAF5] transition-opacity duration-1000 delay-500 flex flex-col items-center absolute inset-x-0 top-0 ${isOpen ? 'opacity-100 min-h-screen pb-20' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        {/* Hero Section */}
        <div className="w-full max-w-[800px] min-h-[90vh] flex flex-col items-center justify-center p-5 text-center relative mt-10">
          
          <CalendarHeart className="w-16 h-16 text-[#a98f5b] mt-10 mb-5" strokeWidth={1.5} />
          
          <h1 className="font-[family-name:var(--font-amiri)] text-5xl sm:text-7xl text-[#4a4a4a] mb-2 font-bold">أيمن & نجلاء</h1>
          <div className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#a98f5b] tracking-[8px] mb-10">Ayman & Naglaa</div>
          
          <div className="font-[family-name:var(--font-amiri)] text-[#5A6B50] text-xl sm:text-2xl leading-relaxed mb-10 px-4 sm:px-10">
            &quot;وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ&quot;
          </div>
          
          <div className="w-[100px] h-[2px] bg-[#a98f5b] mx-auto mb-10"></div>
        </div>

        {/* Countdown Section */}
        <div className="w-full max-w-[600px] py-16 flex flex-col items-center text-center relative border-t border-b border-[#e8decb]">
          <h2 className="font-[family-name:var(--font-amiri)] text-4xl text-[#a98f5b] mb-10 font-bold">باقي على الفرح</h2>
          
          <div className="flex gap-4 sm:gap-6 text-[#5A6B50]" dir="ltr">
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] w-20 sm:w-24 border border-[#e8decb]">
              <span className="text-3xl sm:text-4xl font-bold mb-1 font-[family-name:var(--font-playfair)]">{timeLeft.days}</span>
              <span className="text-sm font-bold">Days</span>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] w-20 sm:w-24 border border-[#e8decb]">
              <span className="text-3xl sm:text-4xl font-bold mb-1 font-[family-name:var(--font-playfair)]">{timeLeft.hours}</span>
              <span className="text-sm font-bold">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] w-20 sm:w-24 border border-[#e8decb]">
              <span className="text-3xl sm:text-4xl font-bold mb-1 font-[family-name:var(--font-playfair)]">{timeLeft.minutes}</span>
              <span className="text-sm font-bold">Mins</span>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="w-full max-w-[800px] py-16 px-5 flex flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-amiri)] text-4xl text-[#a98f5b] mb-8 font-bold">تفاصيل الفرح</h2>
          
          <div className="text-2xl font-bold mb-4">الخميس، ١ أكتوبر ٢٠٢٦</div>
          <div className="text-xl text-gray-600 mb-8 flex items-center justify-center gap-2">
            <MapPin className="text-[#a98f5b]" />
            نادي السكة
          </div>

          {/* Google Maps Iframe */}
          <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-10 bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.955938740698!2d31.3090!3d30.0664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e5a5!2sAl%20Sekka%20Al%20Hadid%20Club!5e0!3m2!1sen!2seg!4v1690000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a href="#" className="inline-flex items-center gap-2 bg-[#5A6B50] text-white px-8 py-4 rounded-full no-underline font-bold text-lg transition-transform hover:scale-105 hover:bg-[#44523c] shadow-lg">
            <CalendarHeart className="w-6 h-6" />
            حفظ موعد الفرح
          </a>
        </div>
      </div>
    </main>
  );
}
