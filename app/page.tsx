"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarHeart, MapPin, Music, Pause, Palette } from "lucide-react";
import { motion } from "framer-motion";

const themes = [
  {
    name: "Rose",
    color: "#ffb6c1",
    bg: "bg-[#fff5f7]",
    border: "border-[#ffe4e1]",
    primaryText: "text-[#d4af37]",
    primaryBg: "bg-[#d4af37]",
    secondaryBg: "bg-[#e6a8d7]",
    secondaryText: "text-[#e6a8d7]",
    accentText: "text-[#b76e79]",
    accentBg: "bg-[#b76e79]",
    envDark: "bg-[#ffb6c1]",
    envLight: "bg-[#ffe4e1]",
    envInside: "bg-[#fff0f5]",
  },
  {
    name: "Emerald",
    color: "#a3c9a8",
    bg: "bg-[#f2fbf5]",
    border: "border-[#d1e8d5]",
    primaryText: "text-[#d4af37]",
    primaryBg: "bg-[#d4af37]",
    secondaryBg: "bg-[#8fbc8f]",
    secondaryText: "text-[#8fbc8f]",
    accentText: "text-[#556b2f]",
    accentBg: "bg-[#556b2f]",
    envDark: "bg-[#a3c9a8]",
    envLight: "bg-[#d1e8d5]",
    envInside: "bg-[#e8f4e9]",
  },
  {
    name: "Lavender",
    color: "#d8b4fe",
    bg: "bg-[#f8f5ff]",
    border: "border-[#e9d5ff]",
    primaryText: "text-[#d4af37]",
    primaryBg: "bg-[#d4af37]",
    secondaryBg: "bg-[#c084fc]",
    secondaryText: "text-[#c084fc]",
    accentText: "text-[#7e22ce]",
    accentBg: "bg-[#7e22ce]",
    envDark: "bg-[#d8b4fe]",
    envLight: "bg-[#e9d5ff]",
    envInside: "bg-[#f3e8ff]",
  }
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const theme = themes[themeIndex];

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-18T19:00:00").getTime();

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
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => {
        console.log("Audio play failed:", e);
        alert("لم يتم تشغيل الموسيقى، تأكد من رفع ملف الأغنية بمسار صحيح في مجلد public");
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-start font-[family-name:var(--font-cairo)] relative overflow-x-hidden ${theme.bg} transition-colors duration-1000`}>
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Theme Switcher */}
      <div className="fixed top-4 left-4 z-[999] flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg items-center">
        <Palette className="w-5 h-5 text-gray-500 ml-1" />
        {themes.map((t, i) => (
          <button 
            key={t.name}
            onClick={() => setThemeIndex(i)}
            className={`w-6 h-6 rounded-full transition-transform ${themeIndex === i ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-110'}`}
            style={{ backgroundColor: t.color }}
            aria-label={`Change theme to ${t.name}`}
          />
        ))}
      </div>
      
      {/* Music Control */}
      {isOpen && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          onClick={toggleMusic}
          className={`fixed bottom-6 right-6 z-[999] w-14 h-14 ${theme.secondaryBg} rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-500`}
        >
          {isPlaying ? <Music className="w-6 h-6 animate-spin-slow" /> : <Pause className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Envelope Section */}
      <div className={`relative w-[90vw] max-w-[500px] h-[60vw] max-h-[350px] cursor-pointer perspective-[1000px] z-[200] transition-all duration-1000 ease-in-out mt-[15vh] ${isOpen ? 'opacity-0 pointer-events-none -translate-y-[50vh] fixed' : ''}`} onClick={openEnvelope}>
        <div className={`absolute inset-0 ${theme.envDark} rounded-[5px] shadow-[0_15px_35px_rgba(0,0,0,0.15)] z-10 transition-colors duration-1000`}></div>
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className={`absolute inset-y-0 left-0 w-1/2 ${theme.envLight} transition-colors duration-1000`} style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
          <div className={`absolute inset-y-0 right-0 w-1/2 ${theme.envLight} transition-colors duration-1000`} style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-[60%] ${theme.envInside} z-40 pointer-events-none transition-colors duration-1000`} style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        <div className={`absolute top-0 left-0 right-0 h-[60%] ${theme.envDark} origin-top z-50 transition-colors duration-1000`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65px] h-[65px] ${theme.primaryBg} rounded-full text-white flex justify-center items-center font-[family-name:var(--font-great-vibes)] text-3xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] z-[60] transition-colors duration-1000`}>M&K</div>
        </div>
        <div className={`absolute -bottom-[50px] left-1/2 -translate-x-1/2 font-bold ${theme.accentText} bg-white px-6 py-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-bounce whitespace-nowrap z-[70] text-lg transition-colors duration-1000`}>اضغط للفتح 👇</div>
      </div>

      {/* Main Scrolling Content */}
      <div className={`w-full ${theme.bg} transition-all duration-1000 delay-500 flex flex-col items-center absolute inset-x-0 top-0 ${isOpen ? 'opacity-100 min-h-screen pb-20' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        {/* Hero Section */}
        <div className="w-full max-w-[800px] min-h-[95vh] flex flex-col items-center justify-center p-5 text-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} 
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="relative w-full max-w-[600px] flex flex-col items-center justify-center mt-16 mb-16 py-20 px-4"
          >
            {/* Glowing Aura Background (No Images!) */}
            <div className={`absolute inset-0 rounded-full blur-[80px] opacity-40 ${theme.primaryBg} transition-colors duration-1000 scale-125`}></div>
            <div className={`absolute inset-0 rounded-full blur-[60px] opacity-30 ${theme.secondaryBg} transition-colors duration-1000 scale-90 translate-y-10`}></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center">
              <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 0.9 }} className={`font-[family-name:var(--font-cairo)] text-2xl sm:text-4xl ${theme.primaryText} font-bold mb-6 sm:mb-8 transition-colors duration-1000 drop-shadow-sm`}>
                عقد قران وحفل زفاف
              </motion.div>

              <motion.h1 initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1 }} className="font-[family-name:var(--font-amiri)] text-7xl sm:text-9xl text-[#4a4a4a] mb-4 sm:mb-6 font-bold drop-shadow-md">محمد & قمر</motion.h1>
              <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.2 }} className={`font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl ${theme.secondaryText} tracking-[6px] sm:tracking-[10px] uppercase font-bold transition-colors duration-1000 drop-shadow-sm leading-tight`}>
                <span className="block sm:inline">MOHAMED</span>
                <span className="block sm:inline text-2xl sm:text-5xl sm:mx-4 my-2 sm:my-0">&</span>
                <span className="block sm:inline">KAMAR</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.4 }} className={`font-[family-name:var(--font-amiri)] ${theme.accentText} text-xl sm:text-3xl leading-relaxed mb-12 px-4 sm:px-10 z-10 max-w-2xl font-bold transition-colors duration-1000`}>
            &quot;وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ&quot;
          </motion.div>
          
          <motion.div initial={{ width: 0 }} animate={isOpen ? { width: 150 } : { width: 0 }} transition={{ delay: 1.6, duration: 1 }} className={`h-[3px] ${theme.primaryBg} mx-auto mb-10 z-10 transition-colors duration-1000`}></motion.div>
        </div>

        {/* Countdown Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className={`w-full max-w-[800px] py-20 flex flex-col items-center text-center relative border-t border-b ${theme.border} transition-colors duration-1000`}>
          <h2 className={`font-[family-name:var(--font-amiri)] text-4xl sm:text-5xl ${theme.primaryText} mb-12 font-bold transition-colors duration-1000`}>باقي على الفرح</h2>
          
          <div className={`flex gap-4 sm:gap-8 ${theme.accentText} transition-colors duration-1000`} dir="ltr">
            {[ 
              { label: 'Days', value: timeLeft.days }, 
              { label: 'Hours', value: timeLeft.hours }, 
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds }
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.5 }} className={`flex flex-col items-center bg-white p-5 rounded-2xl shadow-lg w-20 sm:w-28 border ${theme.border} transition-colors duration-1000`}>
                <span className="text-3xl sm:text-5xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-[#4a4a4a]">{item.value}</span>
                <span className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${theme.secondaryText} transition-colors duration-1000`}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="w-full max-w-[800px] py-20 px-5 flex flex-col items-center text-center">
          <h2 className={`font-[family-name:var(--font-amiri)] text-4xl sm:text-5xl ${theme.primaryText} mb-10 font-bold transition-colors duration-1000`}>تفاصيل الفرح</h2>
          
          <div className="text-2xl sm:text-3xl font-bold mb-10 text-[#4a4a4a]">الجمعة، ١٨ سبتمبر ٢٠٢٦</div>
          
          <div className="text-xl sm:text-2xl text-gray-600 mb-2 font-bold">فندق لي سيل - Le Ciel Hotel</div>
          <div className={`text-lg sm:text-xl ${theme.accentText} mb-2 flex items-center justify-center gap-3 transition-colors duration-1000`}>
            <MapPin className={`${theme.secondaryText} w-7 h-7 transition-colors duration-1000`} />
            قاعة Le Ciel
          </div>
          <div className={`text-2xl font-bold ${theme.primaryText} mb-10 tracking-wider font-[family-name:var(--font-playfair)] transition-colors duration-1000`}>
            7:00 PM
          </div>

          <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-12 bg-gray-200">
            <iframe 
              src="https://maps.google.com/maps?q=Le%20Ciel%20Hotel,%20Cairo&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://maps.app.goo.gl/zkqe5JG3N5UvJuSP9?g_st=aw" target="_blank" className={`inline-flex items-center justify-center gap-3 ${theme.secondaryBg} text-white px-8 py-4 rounded-full no-underline font-bold text-lg sm:text-xl transition-all duration-500 hover:bg-[#d4af37] shadow-lg`}>
              <MapPin className="w-6 h-6" />
              فتح في خرائط جوجل
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className={`inline-flex items-center justify-center gap-3 ${theme.accentBg} text-white px-8 py-4 rounded-full no-underline font-bold text-lg sm:text-xl transition-all duration-500 hover:bg-[#d4af37] shadow-lg`}>
              <CalendarHeart className="w-6 h-6" />
              حفظ موعد الفرح
            </motion.a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
