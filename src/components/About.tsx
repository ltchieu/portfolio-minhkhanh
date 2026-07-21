
interface AboutProps {
  setShowManifesto: (show: boolean) => void;
}

export default function About({ setShowManifesto }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-white border-b border-[#CCCCCC]/60 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image and Huge Title */}
        <div className="lg:col-span-5 space-y-8">
          <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden bg-[#EBEBEB] group relative rounded-sm shadow-sm">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXgHkqjkGu-wSkNZZauWNliukyIO-n_VbfAoEJoC37EpQPlg87xiX-SbMm6BXIwa7NoZPrufdp43cDLO-mu2rDu6XszZoD60YUNKMduihvVdimb-4nwsJjMT5Xtq3TPb3IGbffA1c5HqWCUL-yFBtNWztJMpRCoPCu90GVYMZZsTor2nsZm0qskFsieRLdvxoQwo8DVidicztlww9LuFaxSaQuheIPkDAVP9_oH4pjnI6wOeCi6Z_DOrdTTh6QON_fyfX51rJfMPU" 
              alt="Portrait of Liza Chupanova" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#E31E24]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
          <h3 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none uppercase text-[#111111] tracking-tighter">
            INTRODUCE
          </h3>
        </div>

        {/* Right Column: Statement, Summary, Skills, and manifesto button */}
        <div className="lg:col-span-7 space-y-8 lg:pl-6">
          <div className="space-y-4">
            <p className="font-narrow text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] leading-tight tracking-tight">
              Designing the future of digital and physical experiences through a lens of aggressive minimalism and structural integrity.
            </p>
            <div className="h-[2px] w-24 bg-[#E31E24] mt-6"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em]">
                Experience Summary
              </p>
              <p className="font-sans text-sm text-[#5E5E5E] leading-relaxed max-w-xl">
                With a background in architectural theory and interaction design, I bridge the gap between static form and dynamic utility. Over the past decade, I have led design campaigns and visual curation in New York, Berlin, and Tokyo, focusing on stripping away the superfluous to reveal the core essence of global brands. This is high-performance content design for brands who value clarity over noise.
              </p>
            </div>

            {/* Skills and Education Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#CCCCCC]/40">
              <div className="space-y-4">
                <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em]">
                  Skills &amp; Expertise
                </p>
                <ul className="font-sans text-sm text-[#111111] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
                    <span>UI/UX &amp; Brand Curation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
                    <span>Architectural Visualization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
                    <span>UGC Strategy &amp; Video Art</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
                    <span>Parametric Concept Modeling</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="font-narrow text-xs font-black text-[#5E5E5E] uppercase tracking-[0.25em]">
                  Education
                </p>
                <div className="font-sans text-sm text-[#111111]">
                  <p className="font-bold">Master of Architecture</p>
                  <p className="text-[#5E5E5E] text-xs">Tokyo University</p>
                  <div className="h-px bg-[#CCCCCC]/40 my-2"></div>
                  <p className="font-bold">BFA in Interactive Media</p>
                  <p className="text-[#5E5E5E] text-xs">Berlin Academy of Art</p>
                </div>
              </div>
            </div>

            {/* Manifesto CTA Button */}
            <div className="pt-4">
              <button 
                id="manifesto-btn"
                onClick={() => setShowManifesto(true)}
                className="group relative inline-flex items-center justify-between border border-[#111111] text-[#111111] px-6 py-3.5 font-narrow text-xs font-black tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:text-white cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 mr-4 flex items-center gap-2">
                  <i className="fa-solid fa-book-open text-xs text-[#E31E24] group-hover:text-white transition-colors"></i>
                  READ FULL MANIFESTO
                </span>
                <i className="fa-solid fa-arrow-up-right-from-square relative z-10 text-xs transition-transform duration-300 group-hover:rotate-45"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
