import { useState, useCallback, useMemo } from 'react';
import { awards, ieltsPdfUrl } from '../data/awards';
import { Award } from '../models/Award';
import ScrollReveal from './common/ScrollReveal';
import ImageLightboxModal from './common/ImageLightboxModal';
import type { LightboxImageData } from '../models/imageLightboxModal';

export default function Awards() {
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);
  const [showAllNormal, setShowAllNormal] = useState(false);

  // Split awards into Top 4 Featured/Highlighted awards and the Rest
  const featuredAwards = useMemo(() => {
    return awards.filter((a) => a.isFeatured);
  }, []);

  const normalAwards = useMemo(() => {
    return awards.filter((a) => !a.isFeatured);
  }, []);

  const displayedNormalAwards = useMemo(() => {
    return showAllNormal ? normalAwards : normalAwards.slice(0, 3);
  }, [normalAwards, showAllNormal]);

  const handleAwardClick = useCallback((award: Award) => {
    if (award.pdfUrl && !award.image) {
      window.open(award.pdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (award.image) {
      setSelectedImage({
        src: award.image,
        title: award.title,
        category: `${award.year} — ${award.category}`,
        description: `${award.description} (Issued by: ${award.issuer})`
      });
    } else if (award.pdfUrl) {
      window.open(award.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section id="awards" className="py-24 bg-[#FAF9F6] scroll-mt-20 border-b border-[#CCCCCC]/60">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Title Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
                CREATIVE MERITS & ACCREDITATION
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
                AWARDS & CERTIFICATIONS
              </h2>
            </div>
            <p className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-widest uppercase max-w-xs md:text-right">
              Curated record of academic distinctions, professional certifications, and leadership honors.
            </p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* FEATURED HIGHLIGHTED AWARDS (TOP 4 MAIN CARDS)                             */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111111]"></span>
              <span className="font-narrow text-xs font-black tracking-[0.25em] text-[#111111] uppercase">
                FEATURED HIGHLIGHTS
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredAwards.map((award, idx) => (
              <ScrollReveal key={award.id} direction="up" delay={idx * 0.1}>
                <div
                  onClick={() => handleAwardClick(award)}
                  className="group relative bg-white border border-[#CCCCCC]/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#111111] transition-all duration-500 flex flex-col justify-between cursor-pointer min-h-[380px]"
                >
                  {/* Top Badge & Category Bar */}
                  <div className="p-6 pb-4 flex items-center justify-between border-b border-[#CCCCCC]/30 bg-[#FAF9F6]">
                    <span className="font-narrow text-[10px] font-black hologram-metal-text tracking-[0.25em] uppercase">
                      {award.category}
                    </span>
                    <span className="font-mono text-xs font-bold bg-[#111111] text-white px-2.5 py-0.5 rounded">
                      {award.year}
                    </span>
                  </div>

                  {/* Body Content & Media */}
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start justify-between flex-grow">
                    <div className="space-y-3 flex-grow">
                      <h3 className="font-display text-2xl sm:text-3xl uppercase leading-tight text-[#111111] group-hover:text-black transition-colors">
                        {award.title}
                      </h3>
                      <p className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-wider uppercase flex items-center gap-2">
                        <i className="fa-solid fa-building-columns text-[10px]"></i>
                        <span>{award.issuer}</span>
                      </p>
                      <p className="font-sans text-xs text-[#5E5E5E] leading-relaxed line-clamp-3">
                        {award.description}
                      </p>
                    </div>

                    {/* Image / PDF Thumbnail Preview */}
                    {award.image ? (
                      <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-[#EBEBEB] border border-[#CCCCCC]/60 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={award.image}
                          alt={award.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fa-solid fa-magnifying-glass-plus text-white text-base"></i>
                        </div>
                      </div>
                    ) : award.pdfUrl ? (
                      <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-[#111111] text-white border border-[#CCCCCC]/60 flex-shrink-0 flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-500 shadow-inner">
                        <i className="fa-solid fa-file-pdf text-3xl text-red-400 mb-2"></i>
                        <span className="font-narrow text-[10px] font-black uppercase tracking-widest text-white/90">
                          OFFICIAL ETRF PDF
                        </span>
                        <span className="font-sans text-[9px] text-white/60 mt-1">Click to View PDF</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 py-4 bg-[#FAF9F6] border-t border-[#CCCCCC]/30 flex items-center justify-between">
                    <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                      {award.role}
                    </span>
                    <span className="font-sans text-xs font-semibold text-[#111111] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                      <span>{award.pdfUrl && !award.image ? 'Open PDF Report' : 'Inspect Certificate'}</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NORMAL AWARDS & CERTIFICATIONS (REMAINING ITEMS LIST)                       */}
        {/* ========================================================================= */}
        <div>
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-narrow text-xs font-black tracking-[0.25em] text-[#5E5E5E] uppercase">
                ADDITIONAL CERTIFICATIONS & HONORS
              </span>
            </div>
          </ScrollReveal>

          <div className="border-t border-[#CCCCCC]">
            {displayedNormalAwards.map((award, i) => (
              <ScrollReveal key={award.id} direction="up" delay={i * 0.05}>
                <div
                  onClick={() => handleAwardClick(award)}
                  className="group py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#CCCCCC] hover:bg-white transition-all duration-300 px-4 -mx-4 cursor-pointer rounded-lg"
                >
                  <div className="flex flex-col space-y-1 md:max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-widest uppercase">
                        {award.year}
                      </span>
                      <span className="text-[#CCCCCC]">•</span>
                      <span className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-widest uppercase">
                        {award.category}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl uppercase leading-snug text-[#111111] group-hover:translate-x-2 transition-transform duration-300">
                      {award.title}
                    </h3>
                    <p className="font-sans text-xs text-[#5E5E5E]">
                      {award.issuer} — {award.description}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center gap-4 self-start md:self-auto">
                    {award.image && (
                      <img
                        src={award.image}
                        alt={award.title}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded object-cover border border-[#CCCCCC]/60 flex-shrink-0"
                      />
                    )}
                    <button className="px-3.5 py-2 bg-[#FAF9F6] border border-[#CCCCCC]/80 text-[#111111] text-xs font-narrow font-bold uppercase tracking-wider rounded group-hover:bg-[#111111] group-hover:text-white transition-all flex items-center gap-2">
                      <i className="fa-solid fa-magnifying-glass-plus text-xs"></i>
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More / Show Less Toggle Button */}
          {normalAwards.length > 3 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllNormal((prev) => !prev)}
                className="px-6 py-3.5 bg-[#111111] text-white text-xs font-narrow font-bold uppercase tracking-widest rounded-lg hover:bg-[#333333] transition-all flex items-center gap-2.5 shadow-md cursor-pointer group"
              >
                <span>{showAllNormal ? 'SHOW LESS CERTIFICATIONS' : `LOAD MORE CERTIFICATIONS`}</span>
                <i className={`fa-solid ${showAllNormal ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs group-hover:translate-y-0.5 transition-transform`}></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={handleCloseLightbox} />
    </section>
  );
}
