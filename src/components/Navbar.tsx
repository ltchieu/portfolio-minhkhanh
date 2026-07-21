import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setShowContactDrawer: (show: boolean) => void;
}

export default function Navbar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setShowContactDrawer,
}: NavbarProps) {
  return (
    <>
      <nav id="navbar" className="fixed top-0 left-0 w-full z-40 bg-[#EBEBEB]/70 backdrop-blur-md border-b border-[#CCCCCC] py-4 px-6 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <a href="#" className="font-display text-sm tracking-[0.2em] font-black uppercase hover:opacity-60 transition-all duration-300">
            MINH KHANH
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="font-narrow text-xs font-bold tracking-[0.15em] hover:text-[#E31E24] hover:scale-105 transition-all duration-300 uppercase">
              INTRODUCE
            </a>
            <a href="#experience" className="font-narrow text-xs font-bold tracking-[0.15em] hover:text-[#E31E24] hover:scale-105 transition-all duration-300 uppercase">
              EXPERIENCE
            </a>
            <a href="#work" className="font-narrow text-xs font-bold tracking-[0.15em] hover:text-[#E31E24] hover:scale-105 transition-all duration-300 uppercase">
              PROJECTS
            </a>
            <a href="#awards" className="font-narrow text-xs font-bold tracking-[0.15em] hover:text-[#E31E24] hover:scale-105 transition-all duration-300 uppercase">
              AWARDS
            </a>
            <button 
              onClick={() => setShowContactDrawer(true)} 
              className="font-narrow text-xs font-bold tracking-[0.15em] text-[#E31E24] hover:opacity-75 hover:scale-105 transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer"
            >
              CONTACT <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {/* Mobile hamburger menu */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1 hover:opacity-60 transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-50 bg-[#EBEBEB] flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center border-b border-[#CCCCCC] pb-6">
              <span className="font-display text-sm tracking-[0.2em] font-black uppercase text-[#111111]">
                MENU
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:opacity-60 transition-all text-[#111111]"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex flex-col gap-8 my-auto">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-narrow text-4xl font-extrabold tracking-[0.05em] hover:text-[#E31E24] transition-colors"
              >
                01 / INTRODUCE
              </a>
              <a 
                href="#experience" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-narrow text-4xl font-extrabold tracking-[0.05em] hover:text-[#E31E24] transition-colors"
              >
                02 / EXPERIENCE
              </a>
              <a 
                href="#work" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-narrow text-4xl font-extrabold tracking-[0.05em] hover:text-[#E31E24] transition-colors"
              >
                03 / SELECTED WORKS
              </a>
              <a 
                href="#awards" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-narrow text-4xl font-extrabold tracking-[0.05em] hover:text-[#E31E24] transition-colors"
              >
                04 / AWARDS
              </a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => setShowContactDrawer(true), 300);
                }}
                className="font-narrow text-4xl font-extrabold tracking-[0.05em] text-left text-[#E31E24] hover:opacity-80 transition-opacity cursor-pointer"
              >
                05 / SAY HELLO →
              </button>
            </div>

            <div className="border-t border-[#CCCCCC] pt-6 flex justify-between items-center text-xs font-mono text-[#5E5E5E]">
              <span>@mnisliz</span>
              <span>Krasnodar, Russia</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
