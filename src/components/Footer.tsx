export default function Footer() {
  return (
    <>
      <section id="contact" className="py-24 bg-[#111111] text-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase leading-[0.8] text-white tracking-tight">
                READY TO<br />CREATE?
              </h2>
              <p className="font-narrow text-xl text-white/60 max-w-md">
                Currently accepting new collaborative projects for 2026. Let&apos;s co-create something beautiful and enduring.
              </p>
              
              <div className="pt-6">
                <a 
                  id="cta-say-hello"
                  href="mailto:liz.contentcreator@gmail.com"
                  className="inline-flex items-center gap-3 bg-[#E31E24] text-white px-8 py-4 font-narrow text-xs font-black tracking-[0.2em] uppercase rounded hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-md group cursor-pointer"
                >
                  SAY HELLO
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1.5 transition-transform"></i>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-end items-start lg:items-end space-y-12">
              <a 
                href="mailto:liz.contentcreator@gmail.com" 
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] hover:text-[#E31E24] transition-colors break-all border-b-2 border-white/20 pb-4 w-full text-left lg:text-right"
              >
                liz.contentcreator@gmail.com
              </a>

              <div className="grid grid-cols-2 gap-12 w-full lg:w-auto">
                <div className="space-y-4">
                  <p className="font-narrow text-xs font-black text-white/40 uppercase tracking-widest">
                    SOCIAL CONNECTS
                  </p>
                  <ul className="space-y-2 font-narrow text-xs font-bold tracking-wider text-white/80">
                    <li>
                      <a href="https://instagram.com/mnisliz" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E24] transition-colors flex items-center gap-1.5">
                        <i className="fa-brands fa-instagram text-[#E31E24]"></i> INSTAGRAM
                      </a>
                    </li>
                    <li>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E24] transition-colors flex items-center gap-1.5">
                        <i className="fa-brands fa-linkedin text-[#E31E24]"></i> LINKEDIN
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E24] transition-colors flex items-center gap-1.5">
                        <i className="fa-brands fa-x-twitter text-[#E31E24]"></i> TWITTER
                      </a>
                    </li>
                    <li>
                      <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E24] transition-colors flex items-center gap-1.5">
                        <i className="fa-brands fa-dribbble text-[#E31E24]"></i> DRIBBBLE
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="font-narrow text-xs font-black text-white/40 uppercase tracking-widest">
                    OFFICE STUDIO
                  </p>
                  <p className="font-narrow text-xs font-bold tracking-wider text-white/80 leading-relaxed uppercase">
                    102 Canal St.<br />
                    New York, NY<br />
                    10002 — USA
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer copyright and final brand anchor */}
      <footer className="bg-[#111111] border-t border-white/10 w-full py-12 px-6 text-white">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-xl tracking-[0.2em] font-black uppercase text-white hover:text-[#E31E24] transition-colors">
            PORTFOLIO
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="font-narrow text-xs font-bold tracking-wider text-white/60 hover:text-white transition-colors">INTRODUCE</a>
            <a href="#experience" className="font-narrow text-xs font-bold tracking-wider text-white/60 hover:text-white transition-colors">EXPERIENCE</a>
            <a href="#work" className="font-narrow text-xs font-bold tracking-wider text-white/60 hover:text-white transition-colors">PROJECTS</a>
            <a href="#awards" className="font-narrow text-xs font-bold tracking-wider text-white/60 hover:text-white transition-colors">AWARDS</a>
          </div>

          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            © {new Date().getFullYear()} PORTFOLIO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
