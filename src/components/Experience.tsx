import { motion, AnimatePresence } from "motion/react";
import { experiences } from "../data/experiences";

interface ExperienceSectionProps {
  activeExperience: string | null;
  setActiveExperience: (id: string | null) => void;
}

export default function ExperienceSection({
  activeExperience,
  setActiveExperience,
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-[#EBEBEB] scroll-mt-20 border-b border-[#CCCCCC]/60">
      <div className="max-w-[1440px] mx-auto px-6 relative">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 gap-4">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
              CAREER TRACK
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
              EXPERIENCE
            </h2>
          </div>
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] border-b-2 border-[#E31E24] pb-1 uppercase">
            2018 — PRESENT
          </span>
        </div>

        {/* Timeline Center line (for large screens) */}
        <div className="hidden lg:block absolute left-1/2 top-[180px] bottom-12 w-px bg-[#CCCCCC] -translate-x-1/2 z-0"></div>

        <div className="space-y-8 lg:space-y-0 relative z-10">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 1;
            const isOpen = activeExperience === exp.id;

            return (
              <div 
                key={exp.id} 
                className={`flex flex-col lg:flex-row ${isEven ? "lg:justify-end" : "lg:justify-start"} relative w-full`}
              >
                {/* Point node on timeline axis */}
                <div className="hidden lg:block absolute left-1/2 top-8 w-3 h-3 rounded-full bg-[#111111] border-2 border-[#FAF9F6] -translate-x-1/2 z-20 transition-colors"></div>

                <div className={`w-full lg:w-[46%] bg-white/45 backdrop-blur-sm border border-[#CCCCCC]/40 p-6 md:p-8 rounded transition-all duration-300 hover:bg-white hover:shadow-md ${isOpen ? "bg-white shadow-sm border-l-4 border-l-[#E31E24]" : ""}`}>
                  
                  {/* Header trigger */}
                  <div 
                    onClick={() => setActiveExperience(isOpen ? null : exp.id)}
                    className="cursor-pointer flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <span className="font-narrow text-xs font-black text-[#E31E24] tracking-widest block">
                        {exp.index} / {exp.role}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none text-[#111111]">
                        {exp.company}
                      </h3>
                      <p className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-wider uppercase">
                        {exp.location}
                      </p>
                    </div>

                    {/* Icon */}
                    <button 
                      className={`p-2 rounded-full border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 ${isOpen ? "rotate-45 border-[#E31E24] bg-[#E31E24] text-white" : ""}`}
                      aria-expanded={isOpen}
                      aria-label="Expand role details"
                    >
                      <i className="fa-solid fa-plus text-sm"></i>
                    </button>
                  </div>

                  {/* Expandable Content Container */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-4 border-t border-[#CCCCCC]/40 mt-6">
                          <p className="font-narrow text-sm font-bold text-[#111111] italic leading-tight">
                            &ldquo;{exp.summary}&rdquo;
                          </p>
                          <p className="font-sans text-xs text-[#5E5E5E] leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Tech pills */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.tech.map((t, i) => (
                              <span 
                                key={i} 
                                className="font-mono text-[9px] bg-[#EBEBEB] text-[#111111] px-2.5 py-1 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Experience Work Image */}
                          <div className="aspect-video w-full overflow-hidden rounded bg-[#EBEBEB] mt-4 relative group">
                            <img 
                              src={exp.image} 
                              alt={`${exp.company} campaign`} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
