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
                EXECUTIVE STATEMENT
              </span>

              <h3 className="font-display text-4xl uppercase leading-none tracking-tight">
                THE MARKETING &amp; STORYTELLING MANIFESTO
              </h3>

              <div className="h-0.5 bg-[#111111] w-20"></div>

              <div className="font-sans text-sm text-[#5E5E5E] space-y-4 leading-relaxed">
                <p className="font-bold text-[#111111] italic">
                  &ldquo;In a world of constant noise and fragmented channels, cohesion is the ultimate power.&rdquo;
                </p>
                <p>
                  Integrated marketing is not just about placing logos on different platforms; it is the art of weaving a unified narrative across every touchpoint—digital, physical, and experiential. From large-scale event coordination to micro-content production, every channel must echo the same core message.
                </p>
                <p>
                  We believe in storytelling that engages and converts. When data meets design and structure meets emotion, we build memorable brand experiences that resonate deeply and stand out in fast-paced environments.
                </p>
                <p>
                  True communication is built on clarity, collaboration, and consistency. By managing stakeholders effectively and executing with precision, we transform strategic marketing visions into lived realities.
                </p>
              </div>

              <div className="pt-6 border-t border-[#CCCCCC]/40 flex justify-between items-center">
                <div className="font-cursive hologram-metal-text text-3xl">
                  Minh Khanh
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
