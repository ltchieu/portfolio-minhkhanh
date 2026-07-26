import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { experiences } from "../data/experiences";
import ScrollReveal from "./common/ScrollReveal";
import FreelanceExperienceShowcase from "./common/FreelanceExperienceShowcase";
import MarComExperienceShowcase from "./common/MarComExperienceShowcase";
import MarketingExecutiveExperienceShowcase from "./common/MarketingExecutiveExperienceShowcase";
import PRInternExperienceShowcase from "./common/PRInternExperienceShowcase";
import ViceChairmanExperienceShowcase from "./common/ViceChairmanExperienceShowcase";

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

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleToggleExperience = (id: string) => {
    const isOpening = activeExperience !== id;
    const prevOpenId = activeExperience;

    if (isOpening) {
      const clickedIdx = experiences.findIndex((e) => e.id === id);
      let collapseHeight = 0;

      if (prevOpenId) {
        const prevIdx = experiences.findIndex((e) => e.id === prevOpenId);
        // Only subtract collapse height if previously open job was ABOVE the newly clicked job
        if (prevIdx < clickedIdx && contentRefs.current[prevOpenId]) {
          collapseHeight = contentRefs.current[prevOpenId]!.getBoundingClientRect().height;
        }
      }

      const el = itemRefs.current[id];
      if (el) {
        const yOffset = 90; // Top header offset
        const currentTop = el.getBoundingClientRect().top;
        const targetY = window.scrollY + currentTop - collapseHeight - yOffset;

        setActiveExperience(id);

        // Instantly align scroll position to targetY with zero delayed smooth-scroll bounce
        requestAnimationFrame(() => {
          window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });
        });
        return;
      }
    }

    setActiveExperience(isOpening ? id : null);
  };

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
            const isFullWidth =
              isOpen &&
              (exp.id === "freelance-event-coordinator" ||
                exp.id === "ou-news-marcom-associate" ||
                exp.id === "amor-resort-marketing-executive" ||
                exp.id === "school-advanced-study-pr" ||
                exp.id === "vsa-vice-chairman");

            return (
              <ScrollReveal
                key={exp.id}
                direction={isEven ? "left" : "right"}
                delay={idx * 0.1}
                className="py-4"
              >
                <div
                  className={`flex flex-col lg:flex-row ${isEven && !isFullWidth ? "lg:justify-end" : "lg:justify-start"
                    } relative w-full`}
                >
                  {/* Point node on timeline axis */}
                  <div className="hidden lg:block absolute left-1/2 top-8 w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-white -translate-x-1/2 z-20 transition-all duration-300 shadow-sm group-hover:scale-125"></div>

                  <div
                    ref={(el) => {
                      itemRefs.current[exp.id] = el;
                    }}
                    className={`w-full ${isFullWidth ? "lg:w-full z-30" : "lg:w-[46%]"
                      } bg-white/45 backdrop-blur-sm border border-[#CCCCCC]/40 p-6 md:p-8 rounded transition-all duration-300 hover:bg-white hover:shadow-lg scroll-mt-24 ${isOpen
                        ? "bg-white shadow-md border-l-4 border-l-[#111111]"
                        : ""
                      }`}
                  >
                    {/* Header trigger */}
                    <div
                      onClick={() => handleToggleExperience(exp.id)}
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
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                          ref={(el) => {
                            contentRefs.current[exp.id] = el;
                          }}
                        >
                          <div className="pt-6 space-y-4 border-t border-[#CCCCCC]/40 mt-6">
                            {exp.sections ? (
                              <div className="space-y-4 pt-1">
                                {exp.sections.map((sec, sIdx) => (
                                  <div key={sIdx} className="space-y-2">
                                    <h6 className="font-narrow text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                                      <i className="fa-solid fa-chevron-right text-[10px] text-[#111111]"></i>
                                      {sec.title}
                                    </h6>
                                    <ul className="space-y-1.5 pl-2 font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                                      {sec.items.map((item, iIdx) => {
                                        if (typeof item === "string") {
                                          return (
                                            <li key={iIdx} className="flex items-start gap-2">
                                              <span className="text-[#111111] font-bold text-xs mt-0.5">•</span>
                                              <span>{item}</span>
                                            </li>
                                          );
                                        } else {
                                          return (
                                            <li key={iIdx} className="space-y-2 pt-1">
                                              <div className="flex items-start gap-2">
                                                <span className="text-[#111111] font-bold text-xs mt-0.5">•</span>
                                                <span className="font-medium text-[#111111]">{item.subtitle}</span>
                                              </div>
                                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-4 pt-1">
                                                {item.subitems.map((sub, subIdx) => (
                                                  <div
                                                    key={subIdx}
                                                    className="px-3 py-1.5 bg-[#FAF9F6] border border-[#111111]/30 rounded-md flex items-center gap-1.5 font-narrow font-black text-xs text-[#111111] shadow-2xs hover:bg-[#111111] hover:text-white transition-all group/sub"
                                                  >
                                                    <i className="fa-solid fa-chart-line text-[#111111] group-hover/sub:text-[#00f2fe] text-[10px] transition-colors"></i>
                                                    <span>{sub}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </li>
                                          );
                                        }
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="font-sans text-sm sm:text-base text-[#5E5E5E] leading-relaxed">
                                {exp.description}
                              </p>
                            )}

                            {exp.id === "freelance-event-coordinator" ? (
                              <FreelanceExperienceShowcase />
                            ) : exp.id === "ou-news-marcom-associate" ? (
                              <MarComExperienceShowcase />
                            ) : exp.id === "amor-resort-marketing-executive" ? (
                              <MarketingExecutiveExperienceShowcase />
                            ) : exp.id === "school-advanced-study-pr" ? (
                              <PRInternExperienceShowcase />
                            ) : exp.id === "vsa-vice-chairman" ? (
                              <ViceChairmanExperienceShowcase />
                            ) : (
                              <>
                                {/* Experience Work Image */}
                                <div className="aspect-video w-full overflow-hidden rounded bg-[#EBEBEB] mt-4 relative group">
                                  <img
                                    src={exp.image}
                                    alt={`${exp.company} campaign`}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                                  />
                                </div>
                              </>
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
