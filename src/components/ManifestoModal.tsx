import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="manifesto-modal"
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
                See deeper. Grow wiser. Live brighter.
              </h3>

              <div className="h-0.5 bg-[#111111] w-20"></div>

              <div className="font-sans text-sm text-[#5E5E5E] space-y-4 leading-relaxed">
                <p className="font-bold text-[#111111] italic">
                  &ldquo;I believe meaningful brands begin with understanding.&rdquo;
                </p>
                <p>
                  As a lifelong learner, I explore ideas, create with intention, and continuously grow through every experience. Working in Brand & Marketing Communications, I have built experience across PR, Event Marketing, and Multimedia Production – bringing strategy and creativity together to deliver communications that support business objectives.
                </p>
                <p>
                  Currently pursuing an MBA, I am expanding my perspective on Brand Strategy, Marketing Management, and Customer Experience, with the belief that learning fuels better decisions, stronger brands, and more meaningful experiences.
                </p>
                <strong>
                  Creating compassionate value, always moving forward.
                </strong>
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
    </AnimatePresence>,
    document.body
  );
}
