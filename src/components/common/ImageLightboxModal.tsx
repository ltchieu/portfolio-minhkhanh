import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { ImageLightboxModalProps } from '../../models/imageLightboxModal';

export const ImageLightboxModal = memo(function ImageLightboxModal({
  selectedImage,
  onClose,
}: ImageLightboxModalProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111111] border border-white/20 text-white max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-30 shadow-lg cursor-pointer"
              aria-label="Close image preview"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>

            {/* Left Image View */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center p-4 min-h-[350px]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            {/* Right Content View */}
            <div className="lg:w-2/5 p-8 flex flex-col justify-between space-y-6 bg-[#181818] border-l border-white/10">
              <div className="space-y-4">
                <span className="font-narrow text-xs font-black text-white/50 tracking-[0.25em] uppercase block">
                  {selectedImage.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-snug">
                  {selectedImage.title}
                </h3>
                <div className="h-0.5 bg-white/20 w-16"></div>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  {selectedImage.description || 'Campaign media asset preview.'}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-[#111111] font-narrow text-xs uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-white/90 transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default ImageLightboxModal;
