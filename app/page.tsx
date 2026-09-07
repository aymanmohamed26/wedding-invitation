"use client";

import { useState } from "react";
import { CalendarHeart } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center font-[family-name:var(--font-cairo)]">
      <div 
        className={`relative w-[90vw] max-w-[500px] h-[60vw] max-h-[350px] cursor-pointer perspective-[1000px] z-10 transition-all duration-1000 ease-in-out mt-[50px] ${isOpen ? 'pointer-events-none' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        {/* Envelope Back */}
        <div className={`absolute inset-0 bg-[#d4c4a8] rounded-[5px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] z-10 transition-opacity duration-1000 ${isOpen ? 'opacity-0 delay-1000' : ''}`}></div>
        
        {/* The Letter */}
        <div className={`absolute top-[10px] left-[10px] right-[10px] bottom-[10px] bg-white rounded-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex flex-col items-center p-5 text-center bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] overflow-hidden transition-all duration-1200 ease-in-out ${isOpen ? '-translate-y-[80px] !h-[90vh] !w-[95vw] max-w-[600px] fixed !top-[5vh] left-1/2 -translate-x-1/2 rounded-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] !overflow-y-auto z-[100]' : 'z-20'}`}>
          <div className={`w-full h-full flex flex-col items-center text-[#4a4a4a] transition-opacity duration-1000 delay-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <CalendarHeart className="w-12 h-12 text-[#a98f5b] mt-5" strokeWidth={1.5} />

            <h1 className="font-[family-name:var(--font-amiri)] text-4xl sm:text-5xl md:text-6xl text-[#4a4a4a] mt-4 mb-2">أيمن & نجلاء</h1>
            <div className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-[#a98f5b] tracking-[4px] mb-6">Ayman & Naglaa</div>

            <div className="font-[family-name:var(--font-amiri)] text-[#5A6B50] text-lg sm:text-xl leading-relaxed mb-6 px-4 sm:px-10">
              &quot;وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ&quot;
            </div>

            <div className="w-[80px] h-[2px] bg-[#a98f5b] mx-auto mb-6"></div>

            <div className="text-xl sm:text-2xl font-bold mb-2">الخميس، ١ أكتوبر ٢٠٢٦</div>
            <div className="text-lg sm:text-xl text-gray-600 mb-8">📍 نادي السكة</div>

            <a href="#" className="inline-flex items-center gap-2 bg-[#5A6B50] text-white px-6 py-3 rounded-full no-underline font-bold transition-colors hover:bg-[#44523c] mt-auto mb-5">
              <CalendarHeart className="w-5 h-5" />
              حفظ في التقويم
            </a>
          </div>
        </div>
        
        {/* Envelope Front Flaps */}
        <div className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-0 delay-1000' : ''}`}>
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e8decb]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e8decb]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        </div>
        
        {/* Envelope Bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-[60%] bg-[#f2eadb] z-40 pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-0 delay-1000' : ''}`} style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        
        {/* Envelope Top Flap */}
        <div className={`absolute top-0 left-0 right-0 h-[60%] bg-[#c9b99b] origin-top transition-transform duration-1000 ease-in-out z-50 ${isOpen ? 'rotate-x-180 z-10' : ''}`} style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#a98f5b] rounded-full text-white flex justify-center items-center font-[family-name:var(--font-great-vibes)] text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-opacity duration-500 z-[60] ${isOpen ? 'opacity-0' : 'opacity-100'}`}>A&N</div>
        </div>
        
        {/* Tap Message */}
        <div className={`absolute -bottom-[50px] left-1/2 -translate-x-1/2 font-bold text-[#5A6B50] bg-white px-5 py-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] animate-bounce whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          اضغط للفتح 👇
        </div>
      </div>
    </main>
  );
}
