"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarHeart, MapPin, Music, Pause } from "lucide-react";
import { motion } from "framer-motion";

const theme = {
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
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    <main className={`min-h-screen flex flex-col items-center justify-start font-[family-name:var(--font-cairo)] relative overflow-x-hidden ${theme.bg}`}>
      <audio ref={audioRef} loop src="/music.mpeg" />
      
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
        <div className={`absolute inset-0 ${theme.envDark} rounded-[5px] shadow-[0_15px_35px_rgba(0,0,0,0.15)] z-10`}></div>
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className={`absolute inset-y-0 left-0 w-1/2 ${theme.envLight}`} style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
          <div className={`absolute inset-y-0 right-0 w-1/2 ${theme.envLight}`} style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-[60%] ${theme.envInside} z-40 pointer-events-none`} style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        <div className={`absolute top-0 left-0 right-0 h-[60%] ${theme.envDark} origin-top z-50`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65px] h-[65px] ${theme.primaryBg} rounded-full text-white flex justify-center items-center font-[family-name:var(--font-great-vibes)] text-3xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] z-[60]`}>M&K</div>
        </div>
        <div className={`absolute -bottom-[50px] left-1/2 -translate-x-1/2 font-bold ${theme.accentText} bg-white px-8 py-3 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-bounce whitespace-nowrap z-[70] text-xl`}>حفل زفاف</div>
      </div>

      {/* Main Scrolling Content */}
      <div className={`w-full ${theme.bg} transition-all duration-1000 delay-500 flex flex-col items-center absolute inset-x-0 top-0 ${isOpen ? 'opacity-100 min-h-screen pb-20' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        {/* Glowing Aura Background */}
        <div className="w-full relative flex flex-col items-center justify-center p-5 pt-12 pb-24 text-center overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">
          
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] pointer-events-none">
            <div className={`absolute inset-0 rounded-full blur-[80px] opacity-40 ${theme.primaryBg} scale-125`}></div>
            <div className={`absolute inset-0 rounded-full blur-[60px] opacity-30 ${theme.secondaryBg} scale-90 translate-y-10`}></div>
          </div>
          
          {/* Quranic Verse at the top */}
          <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 0.9 }} className="flex flex-col items-center mt-8 mb-8 z-10 relative">
            <h2 className={`font-[family-name:var(--font-amiri)] ${theme.primaryText} text-4xl sm:text-5xl mb-6 font-bold text-center drop-shadow-sm`}>
              بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
            </h2>
            <div className={`font-[family-name:var(--font-amiri)] ${theme.accentText} text-3xl sm:text-4xl leading-relaxed px-4 sm:px-10 max-w-2xl font-bold text-center`}>
              «وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»
            </div>
          </motion.div>
          
          <motion.div initial={{ width: 0 }} animate={isOpen ? { width: 150 } : { width: 0 }} transition={{ delay: 1.1, duration: 1 }} className={`h-[3px] ${theme.primaryBg} mx-auto mb-12 z-10 relative`}></motion.div>

          {/* Families Section */}
          <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.3 }} className="flex flex-col items-center text-center px-4 max-w-3xl z-10 w-full mb-10">
            <p className={`text-2xl sm:text-3xl ${theme.accentText} mb-12 font-bold`}>بكل الحب والسرور، تتشرف</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full mb-12">
              {/* First Family */}
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#4a4a4a] font-[family-name:var(--font-amiri)]">عائلة فرحات</span>
                <span className={`text-2xl sm:text-3xl ${theme.accentBg} text-white px-8 py-2 rounded-full font-bold shadow-md whitespace-nowrap`}>الحاج / وليد مجدي فرحات</span>
              </div>

              {/* Ampersand */}
              <span className={`text-5xl ${theme.primaryText} font-[family-name:var(--font-amiri)]`}>&</span>
              
              {/* Second Family */}
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#4a4a4a] font-[family-name:var(--font-amiri)]">عائلة إمام</span>
                <span className={`text-2xl sm:text-3xl ${theme.accentBg} text-white px-8 py-2 rounded-full font-bold shadow-md whitespace-nowrap`}>الأستاذ / ماجد محمد إمام</span>
              </div>
            </div>
            
            <p className={`text-2xl sm:text-3xl ${theme.accentText} mb-4 font-bold`}>بدعوتكم لحضور عقد قران وحفل زفاف</p>
          </motion.div>
          
          {/* Main Titles (Big Names) */}
          <div className="relative z-10 flex flex-col items-center justify-center mb-16">
            <motion.h1 initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.5 }} className="font-[family-name:var(--font-amiri)] text-7xl sm:text-9xl text-[#4a4a4a] mb-4 sm:mb-6 font-bold drop-shadow-md">محمد & قمر</motion.h1>
            
            <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.7 }} className={`font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl ${theme.secondaryText} tracking-[6px] sm:tracking-[10px] uppercase font-bold drop-shadow-sm leading-tight mb-8`}>
              <span className="block sm:inline">MOHAMED</span>
              <span className="block sm:inline text-2xl sm:text-5xl sm:mx-4 my-2 sm:my-0">&</span>
              <span className="block sm:inline">KAMAR</span>
            </motion.div>
          </div>

          {/* Rest of Formal Text */}
          <motion.div initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 1.9 }} className="flex flex-col items-center text-center px-4 max-w-3xl z-10 w-full mb-10">
            <p className={`text-2xl sm:text-3xl text-gray-700 mb-16 leading-relaxed max-w-2xl font-bold font-[family-name:var(--font-cairo)]`}>
              ليكتمل أنسنا ويسعدنا حضوركم لتشاركونا فرحتنا بهذه المناسبة السعيدة.
            </p>

            {/* Event Details Card */}
            <div className={`bg-white/80 p-8 sm:p-12 rounded-3xl shadow-xl border-2 ${theme.border} w-full max-w-2xl mb-16 flex flex-col gap-6 text-right backdrop-blur-md`}>
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl">🗓</span>
                <span className="text-xl sm:text-3xl font-bold text-[#4a4a4a] leading-relaxed">التاريخ: الجمعة، ١٨ سبتمبر ٢٠٢٦ م</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl">🕖</span>
                <span className="text-xl sm:text-3xl font-bold text-[#4a4a4a]">الموعد: الساعة 7:00 مساءً</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl">📍</span>
                <span className="text-xl sm:text-3xl font-bold text-[#4a4a4a] leading-relaxed">المكان: فندق لي سيل - قاعة لي سيل</span>
              </div>
            </div>

            <p className={`text-4xl sm:text-5xl ${theme.accentText} font-bold font-[family-name:var(--font-amiri)] leading-relaxed`}>
              دامت دياركم عامرة بالأفراح والمسرات
            </p>
          </motion.div>

          {/* Location Map Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="w-full max-w-[800px] px-5 flex flex-col items-center text-center z-10 mb-20">
            <motion.div whileHover={{ scale: 1.02 }} className={`w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 ${theme.border} mb-12 bg-gray-200`}>
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

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://maps.app.goo.gl/zkqe5JG3N5UvJuSP9?g_st=aw" target="_blank" className={`inline-flex items-center justify-center gap-3 ${theme.secondaryBg} text-white px-8 py-4 rounded-full no-underline font-bold text-xl transition-all duration-500 hover:opacity-90 shadow-lg w-full sm:w-auto`}>
                <MapPin className="w-6 h-6" />
                فتح في خرائط جوجل
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className={`inline-flex items-center justify-center gap-3 ${theme.accentBg} text-white px-8 py-4 rounded-full no-underline font-bold text-xl transition-all duration-500 hover:opacity-90 shadow-lg w-full sm:w-auto`}>
                <CalendarHeart className="w-6 h-6" />
                حفظ موعد الفرح
              </motion.a>
            </div>
          </motion.div>

          {/* Countdown Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className={`w-full max-w-[800px] py-16 flex flex-col items-center text-center relative border-t ${theme.border} z-10`}>
            <h2 className={`font-[family-name:var(--font-amiri)] text-4xl sm:text-5xl ${theme.primaryText} mb-12 font-bold`}>باقي على الفرح</h2>
            
            <div className={`flex gap-4 sm:gap-8 ${theme.accentText}`} dir="ltr">
              {[ 
                { label: 'Days', value: timeLeft.days }, 
                { label: 'Hours', value: timeLeft.hours }, 
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.5 }} className={`flex flex-col items-center bg-white/90 p-5 rounded-2xl shadow-lg w-20 sm:w-28 border ${theme.border}`}>
                  <span className="text-3xl sm:text-5xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-[#4a4a4a]">{item.value}</span>
                  <span className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${theme.secondaryText}`}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
