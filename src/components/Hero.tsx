import { motion } from "motion/react";
import ThreeWavyBackground from "./common/ThreeWavyBackground";

interface HeroProps {
  currentDateString: string;
  currentTime: string;
}


export default function Hero({ currentDateString, currentTime }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] md:h-screen w-full flex flex-col justify-between py-12 px-6 pt-[120px] overflow-hidden select-none bg-white">
      {/* Three.js Monochrome Wavy Background */}
      <ThreeWavyBackground />

      {/* Top Header Row - White, Black, and Grey theme */}
      <div className="relative flex justify-between items-start w-full z-10 max-w-[1440px] mx-auto">
        <div className="font-narrow text-xs font-black tracking-[0.2em] text-[#111111] uppercase max-w-xs md:max-w-none">
          BRAND &amp; MARKETING COMMUNICATIONS
        </div>

        <div className="flex items-center gap-3 font-narrow text-xs font-bold tracking-[0.1em] text-[#5E5E5E]">
          <span className="hidden sm:inline">{currentDateString}</span>
          <div className="flex items-center gap-1.5 bg-[#111111] text-white py-1 px-2.5 rounded font-mono text-[11px]">
            <i className="fa-regular fa-clock text-xs text-white/70 animate-pulse"></i>
            <span>{currentTime || "00:00:00"} GMT+7</span>
          </div>
          <i className="fa-solid fa-arrow-right text-xs text-[#111111] animate-bounce-horizontal"></i>
        </div>
      </div>

      {/* Center content redesigned exactly like the user-uploaded image */}
      <div className="relative flex flex-col items-center justify-center w-full flex-grow py-8 z-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-fit flex flex-col text-left"
        >
          {/* Pre-headline */}
          <span className="font-sans text-base sm:text-lg md:text-xl text-[#5E5E5E] font-medium tracking-wide block mb-1 ml-2">
            Nguyễn Hà Minh Khánh (Mia Nguyen)
          </span>

          {/* Headline */}
          <h1 className="font-sans font-black text-black leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem]">
            Portfolio.
          </h1>

        </motion.div>
      </div>

      {/* Bottom Metadata Info Grid - White, Black, and Grey theme */}
      <div className="relative flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4 w-full z-10 font-mono text-xs sm:text-sm md:text-[15px] tracking-widest text-[#2c2b2b] max-w-[1440px] mx-auto pt-4 border-t border-[#CCCCCC]/60">
        <div className="flex items-center justify-start gap-2 text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-black/60 flex-shrink-0"></span>
          <a href="https://www.linkedin.com/in/mknh13/" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:opacity-60 transition-colors">
            @mknh13
          </a>
        </div>
        <div className="flex items-center justify-start md:justify-center gap-2 text-left md:text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-black/60 flex-shrink-0 md:hidden"></span>
          <a href="mailto:n.khanhwork@gmail.com" className="hover:text-black hover:opacity-60 transition-colors break-all">
            n.khanhwork@gmail.com
          </a>
        </div>
        <div className="flex items-center justify-start md:justify-end gap-1.5 text-left md:text-right">
          <i className="fa-solid fa-location-dot text-xs text-black/60 flex-shrink-0"></i>
          <span>Ho Chi Minh, Viet Nam — Global Remote</span>
        </div>
      </div>
    </section>
  );
}
