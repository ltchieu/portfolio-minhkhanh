import { awards } from "../data/awards";

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-[#EBEBEB] scroll-mt-20 border-b border-[#CCCCCC]/60">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
              CREATIVE MERITS
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
              AWARDS
            </h2>
          </div>
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
            RECOGNITION
          </span>
        </div>

        <div className="border-t border-[#CCCCCC]">
          {awards.map((award, i) => (
            <div 
              key={i} 
              className="group py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#CCCCCC] hover:bg-white/40 transition-all duration-300 px-4 -mx-4 cursor-default"
            >
              <div className="flex flex-col space-y-1">
                <span className="font-narrow text-xs font-black text-[#E31E24] tracking-widest uppercase">
                  {award.year} / {award.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase leading-none group-hover:translate-x-3 transition-transform duration-300 text-[#111111]">
                  {award.title}
                </h3>
              </div>

              <div className="mt-4 md:mt-0 text-left md:text-right space-y-0.5">
                <p className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                  {award.role}
                </p>
                <p className="font-sans text-xs text-[#5E5E5E] italic">
                  {award.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
