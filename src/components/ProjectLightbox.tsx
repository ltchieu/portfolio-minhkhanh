import { motion, AnimatePresence } from "motion/react";
import { Project } from "../models/Project";
import { ContactFormData } from "../models/Contact";

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (title: string) => void;
}

export default function ProjectLightbox({
  project,
  onClose,
  onInquire,
}: ProjectLightboxProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          id="project-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div 
            initial={{ scale: 0.92, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 15 }}
            className="bg-white text-[#111111] max-w-4xl w-full rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Close Button */}
            <button 
              id="lightbox-close"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/90 text-[#111111] border border-[#CCCCCC] hover:border-black hover:text-black transition-colors z-30 shadow-md cursor-pointer"
              aria-label="Close project modal"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            {/* Left Column: Image */}
            <div className="lg:col-span-6 relative bg-[#EBEBEB] aspect-square lg:aspect-auto lg:h-full min-h-[300px]">
              <img 
                src={project.image} 
                alt={project.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
              <div className="absolute top-6 left-6 bg-[#111111] text-white font-mono text-[9px] tracking-[0.2em] px-3 py-1 uppercase rounded">
                {project.year}
              </div>
            </div>

            {/* Right Column: Narrative Info */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-narrow text-xs font-black hologram-metal-text tracking-[0.25em] uppercase block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase leading-none text-[#111111]">
                    {project.title}
                  </h3>
                </div>
                
                <div className="h-0.5 hologram-metal-bg w-16"></div>

                <p className="font-sans text-sm text-[#5E5E5E] leading-relaxed">
                  {project.narrative}
                </p>

                {/* Deliverables lists */}
                <div className="space-y-2">
                  <p className="font-narrow text-[10px] font-black text-[#5E5E5E] tracking-[0.2em] uppercase">
                    Core Deliverables
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.map((d, i) => (
                      <span key={i} className="font-sans text-xs bg-[#EBEBEB] px-2.5 py-1 text-[#111111] rounded font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools lists */}
                <div className="space-y-2">
                  <p className="font-narrow text-[10px] font-black text-[#5E5E5E] tracking-[0.2em] uppercase">
                    Creator Instruments
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t, i) => (
                      <span key={i} className="font-mono text-[10px] border border-[#CCCCCC] px-2.5 py-1 text-[#5E5E5E] rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#CCCCCC]/40 flex justify-end gap-3">
                <button 
                  onClick={onClose}
                  className="border border-[#111111] font-narrow text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                >
                  CLOSE VIEW
                </button>
                <button 
                  onClick={() => onInquire(project.title)}
                  className="hologram-metal-bg text-black font-narrow text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded hover:opacity-85 transition-opacity cursor-pointer"
                >
                  INQUIRE CONCEPT
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
