import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { experiences } from "../data/experiences";
import ScrollReveal from "./common/ScrollReveal";

interface ExperienceSectionProps {
  activeExperience: string | null;
  setActiveExperience: (id: string | null) => void;
}

export default function ExperienceSection({
  activeExperience,
  setActiveExperience,
}: ExperienceSectionProps) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress inside the Experience section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Calculate position of the glowing runner node
  const lightTopPosition = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 bg-[#EBEBEB] scroll-mt-20 border-b border-[#CCCCCC]/60 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 gap-4">
            <div>
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
                CAREER TRACK
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
                EXPERIENCE
              </h2>
            </div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] pb-1 uppercase border-b-2 hologram-metal-border">
              2021 — PRESENT
            </span>
          </div>
        </ScrollReveal>

        {/* Static background timeline track line */}
        <div className="hidden lg:block absolute left-1/2 top-[180px] bottom-16 w-0.5 bg-[#CCCCCC]/50 -translate-x-1/2 z-0 rounded-full"></div>

        {/* Scroll-driven active glowing timeline line */}
        <motion.div
          className="hidden lg:block absolute left-1/2 top-[180px] bottom-16 w-1 -translate-x-1/2 z-0 origin-top bg-gradient-to-b from-[#111111] via-[#444444] to-[#111111] shadow-[0_0_12px_rgba(0,0,0,0.25)] rounded-full"
          style={{ scaleY: smoothProgress }}
        />

        {/* Shining light runner beam along timeline */}
        <div className="hidden lg:block absolute left-1/2 top-[180px] bottom-16 w-0 -translate-x-1/2 z-10 pointer-events-none">
          <motion.div
            className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{ top: lightTopPosition }}
          >
            {/* Outer radial ambient glow halo */}
            <div className="absolute w-12 h-12 rounded-full bg-white/90 blur-md animate-pulse shadow-[0_0_30px_10px_rgba(255,255,255,1)]"></div>
            {/* Horizontal light flare ray */}
            <div className="absolute w-24 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[0.5px]"></div>
            {/* Core shining diamond particle */}
            <div className="w-4 h-4 rounded-full bg-white border-2 border-[#111111] shadow-[0_0_20px_4px_rgba(255,255,255,0.9)] relative z-20"></div>
          </motion.div>
        </div>

        <div className="space-y-8 lg:space-y-0 relative z-10">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 1;
            const isOpen = activeExperience === exp.id;

            return (
              <ScrollReveal
                key={exp.id}
                direction={isEven ? "left" : "right"}
                delay={idx * 0.1}
                className="py-4"
              >
                <div
                  className={`flex flex-col lg:flex-row ${isEven ? "lg:justify-end" : "lg:justify-start"
                    } relative w-full`}
                >
                  {/* Point node on timeline axis */}
                  <div className="hidden lg:block absolute left-1/2 top-8 w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-white -translate-x-1/2 z-20 transition-all duration-300 shadow-sm group-hover:scale-125"></div>

                  <div
                    className={`w-full lg:w-[46%] bg-white/45 backdrop-blur-sm border border-[#CCCCCC]/40 p-6 md:p-8 rounded transition-all duration-300 hover:bg-white hover:shadow-lg ${isOpen
                      ? "bg-white shadow-md border-l-4 border-l-[#111111]"
                      : ""
                      }`}
                  >
                    {/* Header trigger */}
                    <div
                      onClick={() =>
                        setActiveExperience(isOpen ? null : exp.id)
                      }
                      className="cursor-pointer flex items-center justify-between gap-4 select-none"
                    >
                      <div className="space-y-1">
                        <span className="font-narrow text-sm sm:text-base font-black hologram-metal-text tracking-widest block">
                          {exp.index} / {exp.role}
                        </span>
                        <h5 className="font-display text-xl sm:text-2xl uppercase leading-none text-[#111111]">
                          {exp.company}
                        </h5>
                        <p className="font-narrow text-xs sm:text-sm font-bold text-[#5E5E5E] tracking-wider uppercase">
                          {exp.location}
                        </p>
                      </div>

                      {/* Icon */}
                      <button
                        className={`p-2 rounded-full border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 ${isOpen
                          ? "rotate-45 border-[#111111] bg-[#111111] text-white"
                          : ""
                          }`}
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
                            <p className="font-narrow text-base sm:text-lg font-bold text-[#111111] italic leading-snug">
                              &ldquo;{exp.summary}&rdquo;
                            </p>
                            <p className="font-sans text-sm sm:text-base text-[#5E5E5E] leading-relaxed">
                              {exp.description}
                            </p>

                            {/* Tech pills */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {exp.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className="font-mono text-xs bg-[#EBEBEB] text-[#111111] px-3 py-1.5 rounded font-medium"
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

                            {/* Direct to Detail Page Button */}
                            {exp.id === "freelance-event-coordinator" && (
                              <div className="pt-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sessionStorage.setItem("portfolio_home_scroll_pos", window.scrollY.toString());
                                    sessionStorage.setItem("portfolio_from_detail", "true");
                                    navigate("/experience/freelance-event-coordinator");
                                  }}
                                  className="w-full sm:w-auto px-5 py-3 bg-[#111111] text-white hover:bg-[#333333] transition-all font-narrow text-xs uppercase tracking-[0.2em] font-bold rounded flex items-center justify-center gap-2 group shadow-sm"
                                >
                                  <span>View Case Study</span>
                                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                </button>
                              </div>
                            )}

                            {exp.id === "amor-resort-marketing-executive" && (
                              <div className="pt-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sessionStorage.setItem("portfolio_home_scroll_pos", window.scrollY.toString());
                                    sessionStorage.setItem("portfolio_from_detail", "true");
                                    navigate("/experience/marketing-executive-probation");
                                  }}
                                  className="w-full sm:w-auto px-5 py-3 bg-[#111111] text-white hover:bg-[#333333] transition-all font-narrow text-xs uppercase tracking-[0.2em] font-bold rounded flex items-center justify-center gap-2 group shadow-sm"
                                >
                                  <span>View Case Study & Videos</span>
                                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
