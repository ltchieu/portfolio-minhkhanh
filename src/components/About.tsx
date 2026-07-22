import avatarImg from "../../assets/image/avatar.JPG";
import ScrollReveal from "./common/ScrollReveal";

interface AboutProps {
  setShowManifesto: (show: boolean) => void;
}

export default function About({ setShowManifesto }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-white border-b border-[#CCCCCC]/60 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Image and Huge Title */}
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal direction="up" delay={0.1}>
            <h3 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none uppercase text-[#111111] tracking-tighter">
              INTRODUCE
            </h3>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.25}>
            <div className="w-4/5 aspect-[4/5] overflow-hidden bg-[#EBEBEB] group relative rounded-sm shadow-sm">
              <img
                src={avatarImg}
                alt="Portrait of Nguyen Ha Minh Khanh"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Statement, Summary, Skills, and manifesto button */}
        <div className="lg:col-span-7 space-y-8 lg:pl-6">
          <div className="space-y-10">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="space-y-4 mt-[20px]">
                <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em] font-bold">
                  Experience Summary
                </p>
                <div className="font-sans text-sm text-[#5E5E5E] leading-relaxed max-w-xl space-y-3">
                  <p>
                    Marketing Communications Executive with 5+ years of experience in integrated marketing communications, event coordination, content production, and multimedia storytelling across higher education and hospitality industries.
                  </p>
                  <p>
                    Experienced in managing cross-functional projects, coordinating external vendors, developing multi-channel marketing campaigns, and producing digital content for websites and social media platforms. Strong ability to manage stakeholders, execute marketing initiatives, and deliver engaging brand experiences in fast-paced environments.
                  </p>
                  <p>
                    Currently pursuing an MBA at Western Sydney University to strengthen expertise in strategic marketing and business management.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Skills and Education Grid */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#CCCCCC]/40">
                <div className="space-y-4">
                  <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em] font-bold">
                    Skills &amp; Expertise
                  </p>
                  <ul className="font-sans text-sm text-[#111111] space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full hologram-metal-bg"></span>
                      <span>Integrated Marketing Communications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full hologram-metal-bg"></span>
                      <span>Event Coordination &amp; Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full hologram-metal-bg"></span>
                      <span>Multimedia Storytelling &amp; Production</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full hologram-metal-bg"></span>
                      <span>Stakeholder &amp; Vendor Relations</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em] font-bold">
                    Education
                  </p>
                  <div className="font-sans text-sm text-[#111111] space-y-3">
                    <div>
                      <p className="font-bold">Western Sydney University</p>
                      <p className="text-[#5E5E5E] text-xs">Master of Business Administration</p>
                      <p className="text-[#888888] text-[10px] mt-0.5 font-mono">2025 - Present</p>
                    </div>
                    <div className="h-px bg-[#CCCCCC]/40"></div>
                    <div>
                      <p className="font-bold">Ho Chi Minh City Open University</p>
                      <p className="text-[#5E5E5E] text-xs">Bachelor of Business English</p>
                      <p className="text-[#5E5E5E] text-xs">GPA: 3.16 / 4.0</p>
                      <p className="text-[#888888] text-[10px] mt-0.5 font-mono">2020 - 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Manifesto CTA Button */}
            <ScrollReveal direction="up" delay={0.45}>
              <div className="pt-4">
                <button
                  id="manifesto-btn"
                  onClick={() => setShowManifesto(true)}
                  className="group relative inline-flex items-center justify-between border border-[#111111] text-[#111111] px-6 py-3.5 font-narrow text-xs font-black tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:text-white cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                  <span className="relative z-10 mr-4 flex items-center gap-2">
                    <i className="fa-solid fa-book-open text-xs text-[#111111] group-hover:text-white transition-colors"></i>
                    READ FULL MANIFESTO
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square relative z-10 text-xs transition-transform duration-300 group-hover:rotate-45"></i>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
