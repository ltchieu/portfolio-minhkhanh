import { motion, AnimatePresence } from "motion/react";

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="manifesto-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#FAF9F6] text-[#111111] max-w-2xl w-full p-8 md:p-12 rounded-sm shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button 
              id="manifesto-close"
              onClick={onClose}
              className="absolute top-6 right-6 p-1 rounded-full border border-[#CCCCCC] hover:border-black hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="space-y-6">
              <span className="font-narrow text-xs font-black hologram-metal-text tracking-[0.25em] block uppercase">
                CREATOR STATEMENT
              </span>
              
              <h3 className="font-display text-4xl uppercase leading-none tracking-tight">
                THE AGGRESSIVE MINIMALIST MANIFESTO
              </h3>
              
              <div className="h-0.5 bg-[#111111] w-20"></div>

              <div className="font-sans text-sm text-[#5E5E5E] space-y-4 leading-relaxed">
                <p className="font-bold text-[#111111] italic">
                  &ldquo;In an era of relentless sensory pollution, quiet is the ultimate rebellion.&rdquo;
                </p>
                <p>
                  Aggressive minimalism isn&apos;t simply about taking things away; it is a violent stripping away of everything that is not load-bearing. It is the architectural discipline applied directly to modern UGC, user experience, and content creation. 
                </p>
                <p>
                  Every grid line, every pixel, every frame of video must exist for a singular, unarguable reason. When we remove noise, the remaining signals are forced to stand on their own merit.
                </p>
                <p>
                  As digital and physical boundaries dissolve, we believe high-performance creation is purely defined by its structural integrity. Clear layout, extreme focus on negative space, honest human typography, and pure cinematic imagery. This is where we build the enduring.
                </p>
              </div>

              <div className="pt-6 border-t border-[#CCCCCC]/40 flex justify-between items-center">
                <div className="font-cursive hologram-metal-text text-3xl">
                  Liza Chupanova
                </div>
                <button 
                  onClick={onClose}
                  className="bg-[#111111] text-white font-narrow text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  CLOSE READ
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
