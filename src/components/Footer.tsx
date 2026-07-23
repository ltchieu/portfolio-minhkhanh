import ScrollReveal from "./common/ScrollReveal";

export default function Footer() {
  return (
    <>
      <section id="contact" className="py-24 bg-[#111111] text-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase leading-[0.8] text-white tracking-tight">
                  READY TO<br />CREATE?
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <p className="font-narrow text-xl text-white/60 max-w-md">
                  Currently accepting new collaborative projects for 2026. Let&apos;s co-create something beautiful and enduring.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="pt-6">
                  <a
                    id="cta-say-hello"
                    href="mailto:n.khanhwork@gmail.com"
                    className="inline-flex items-center gap-3 hologram-metal-bg text-black px-8 py-4 font-narrow text-xs font-black tracking-[0.2em] uppercase rounded hover:opacity-85 transition-all duration-300 hover:scale-105 shadow-md group cursor-pointer"
                  >
                    SAY HELLO
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1.5 transition-transform"></i>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-end items-start lg:items-end space-y-12">
              <ScrollReveal direction="left" delay={0.2}>
                <a
                  href="mailto:n.khanhwork@gmail.com"
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] hover:opacity-75 transition-opacity break-all border-b-2 border-white/20 pb-4 w-full text-left lg:text-right"
                >
                  n.khanhwork@gmail.com
                </a>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.35}>
                <div className="grid grid-cols-2 gap-12 w-full lg:w-auto">
                  <div className="space-y-4">
                    <p className="font-narrow text-xs font-black text-white/40 uppercase tracking-widest">
                      SOCIAL CONNECTS
                    </p>
                    <ul className="space-y-2 font-narrow text-xs font-bold tracking-wider text-white/80">
                      <li>
                        <a href="https://instagram.com/mnisliz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                          <i className="fa-brands fa-instagram hologram-metal-text"></i> INSTAGRAM
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                          <i className="fa-brands fa-linkedin hologram-metal-text"></i> LINKEDIN
                        </a>
                      </li>
                      <li>
                        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                          <i className="fa-brands fa-facebook hologram-metal-text"></i> FACEBOOK
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Footer copyright and final brand anchor */}
      <footer className="bg-[#111111] border-t border-white/10 w-full py-12 px-6 text-white">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-xl tracking-[0.2em] font-black uppercase text-white hover:opacity-75 transition-opacity">
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
