import { motion } from "motion/react";

interface HeroProps {
  currentDateString: string;
  currentTime: string;
}

export default function Hero({ currentDateString, currentTime }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] md:h-screen w-full flex flex-col justify-between bg-[#EBEBEB] py-12 px-6 pt-[120px] overflow-hidden select-none">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-start w-full z-10 max-w-[1440px] mx-auto">
        <div className="font-narrow text-xs font-black tracking-[0.2em] text-[#111111] uppercase max-w-xs md:max-w-none">
          UGC &amp; CONTENT CREATOR
        </div>
        
        <div className="flex items-center gap-3 font-narrow text-xs font-black tracking-[0.1em] text-[#111111]">
          <span className="hidden sm:inline">{currentDateString}</span>
          <div className="flex items-center gap-1.5 bg-[#111111] text-white py-1 px-2.5 rounded font-mono text-[11px]">
            <i className="fa-regular fa-clock text-xs text-[#E31E24] animate-pulse"></i>
            <span>{currentTime || "00:00:00"} GMT+7</span>
          </div>
          <i className="fa-solid fa-arrow-right text-xs text-[#E31E24] animate-bounce-horizontal"></i>
        </div>
      </div>

      {/* Center Massive Portfolio Logo with Overlay Signature */}
      <div className="relative flex flex-col items-center justify-center w-full flex-grow py-8">
        {/* Elegant red cursive floating overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="absolute top-[12%] sm:top-[18%] md:top-[15%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <span className="font-cursive text-[#E31E24] text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide whitespace-nowrap drop-shadow-sm select-none">
            Welcome to
          </span>
        </motion.div>

        {/* Huge Lowercase portfolio outline / solid text */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[#111111] leading-[0.75] tracking-tight lowercase text-center w-full select-none break-words"
          style={{ fontSize: "clamp(3.8rem, 18vw, 20rem)" }}
        >
          portfolio
        </motion.h1>
      </div>

      {/* Bottom Metadata Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full z-10 font-mono text-[11px] tracking-widest text-[#5E5E5E] max-w-[1440px] mx-auto pt-4 border-t border-[#CCCCCC]/60">
        <div className="text-left flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
          <a href="https://instagram.com/mnisliz" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E24] transition-colors">
            @mnisliz — UGC SPECIALIST
          </a>
        </div>
        <div className="text-center sm:text-left md:text-center">
          <a href="mailto:liz.contentcreator@gmail.com" className="hover:text-[#E31E24] transition-colors">
            liz.contentcreator@gmail.com
          </a>
        </div>
        <div className="text-right sm:text-left md:text-right flex items-center justify-end gap-1.5">
          <i className="fa-solid fa-location-dot text-xs text-[#E31E24]"></i>
          <span>Krasnodar, Russia — Global Remote</span>
        </div>
      </div>
    </section>
  );
}
