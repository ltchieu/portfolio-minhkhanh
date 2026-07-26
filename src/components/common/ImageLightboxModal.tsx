import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { ImageLightboxModalProps } from '../../models/imageLightboxModal';

export const ImageLightboxModal = memo(function ImageLightboxModal({
  selectedImage,
  onClose,
}: ImageLightboxModalProps) {
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, onClose]);

  return (
    <AnimatePresence>
      {selectedImage &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-6xl w-full bg-[#111111]/95 border border-white/20 text-white rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between max-h-[92vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div>
                  <span className="font-narrow text-[11px] font-black text-[#00f2fe] tracking-[0.2em] uppercase block">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-white">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all flex items-center justify-center cursor-pointer border border-white/20"
                  aria-label="Close image preview"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>

              {/* Centered Large Image View */}
              <div className="flex-1 flex items-center justify-center my-3 min-h-[300px] overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[76vh] max-w-full w-auto object-contain rounded-lg shadow-xl border border-white/10"
                />
              </div>

              {/* Optional Description Footer */}
              {selectedImage.description && (
                <div className="pt-3 border-t border-white/15 text-center">
                  <p className="font-sans text-xs sm:text-sm text-white/70 max-w-3xl mx-auto">
                    {selectedImage.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>,
          document.body
        )}
    </AnimatePresence>
  );
});

export default ImageLightboxModal;
