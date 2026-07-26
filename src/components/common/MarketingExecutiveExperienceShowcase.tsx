import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import TikTokEmbed from './TikTokEmbed';
import { marketingExecutiveCampaignData } from '../../data/marketingExecutiveData';

export default function MarketingExecutiveExperienceShowcase() {
  const [isCanvaModalOpen, setIsCanvaModalOpen] = useState(false);

  // Close Canva modal on Escape key press
  useEffect(() => {
    if (!isCanvaModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCanvaModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCanvaModalOpen]);

  return (
    <div className="space-y-8 pt-6 border-t border-[#CCCCCC]/40">
      {/* 1. CANVA PRESENTATION POPUP BANNER */}
      <div className="bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#333333] relative overflow-hidden group">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-narrow font-black tracking-widest text-[#00f2fe] uppercase border border-white/10">
              <i className="fa-solid fa-palette text-[10px]"></i>
              <span>Brand Presentation & Strategy</span>
            </div>
            <h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
              Amor Resort & Protea Garden Canva Showcase
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
              Explore the complete visual strategy, campaign moodboards, and brand communication assets crafted on Canva.
            </p>
          </div>

          <button
            onClick={() => setIsCanvaModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#111111] hover:bg-[#00f2fe] hover:text-[#111111] transition-all font-narrow text-xs font-black uppercase tracking-[0.2em] rounded-lg flex items-center justify-center gap-2.5 shadow-md group/btn shrink-0"
          >
            <i className="fa-solid fa-file-powerpoint text-sm"></i>
            <span>View Canva Presentation</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
          </button>
        </div>
      </div>

      {/* 2. INTERNATIONAL WOMEN'S DAY (8/3) CAMPAIGN CONTENT */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#111111]/15 pb-4">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] uppercase block">
              CAMPAIGN HIGHLIGHT
            </span>
            <h4 className="font-display text-2xl sm:text-3xl uppercase text-[#111111] tracking-tight">
              {marketingExecutiveCampaignData.iwdCampaign.title}
            </h4>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-white rounded-full font-narrow text-xs font-bold tracking-widest uppercase">
            <i className="fa-solid fa-heart text-pink-400 text-[10px]"></i>
            <span>8/3 Special</span>
          </span>
        </div>

        {/* SUB-SECTION A: TikTok KOL / KOC Collaborations */}
        <div className="space-y-3">
          <h5 className="font-narrow text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <i className="fa-brands fa-tiktok text-sm text-[#111111]"></i>
            <span>KOL & KOC Campaign Collaborations</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
            {marketingExecutiveCampaignData.iwdCampaign.kols.map((kol) => (
              <div
                key={kol.id}
                className="p-4 bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl hover:border-[#111111] hover:bg-white transition-all flex flex-col justify-between items-center gap-3 group shadow-2xs"
              >
                <div className="w-full flex items-center justify-between gap-2 border-b border-[#CCCCCC]/40 pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-narrow font-bold text-xs shrink-0">
                      {kol.id}
                    </span>
                    <h6 className="font-sans font-bold text-sm text-[#111111] truncate">
                      {kol.kol}
                    </h6>
                  </div>
                  <i className="fa-brands fa-tiktok text-sm text-[#111111] shrink-0"></i>
                </div>

                {kol.url ? (
                  <div className="w-full flex flex-col items-center">
                    <TikTokEmbed
                      url={kol.url}
                      videoId={kol.videoId}
                      author={kol.author}
                      title={kol.kol}
                    />
                    <a
                      href={kol.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 py-2 bg-[#111111] text-white hover:bg-[#333333] transition-colors rounded-lg text-xs font-narrow font-black tracking-wider uppercase inline-flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Open on TikTok</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  </div>
                ) : (
                  <div className="w-full h-[520px] bg-[#EBEBEB] rounded-xl flex flex-col items-center justify-center p-6 text-center gap-3 border border-[#CCCCCC]/40">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <i className="fa-brands fa-tiktok text-2xl text-[#777777]"></i>
                    </div>
                    <div>
                      <h6 className="font-sans font-bold text-sm text-[#111111]">
                        {kol.kol}
                      </h6>
                      <span className="font-narrow text-xs font-bold text-[#777777] uppercase tracking-wider block mt-1">
                        Content Collaboration Partner
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTION B: 8/3 Protea Garden Content (Facebook Posts) */}
        <div className="space-y-3 pt-4">
          <h5 className="font-narrow text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <i className="fa-brands fa-facebook text-sm text-[#1877F2]"></i>
            <span>8/3 Protea Garden Content (Facebook Posts)</span>
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketingExecutiveCampaignData.iwdCampaign.proteaPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl hover:border-[#111111] hover:bg-white transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-[#1877F2]/10 text-[#1877F2] font-narrow text-[10px] font-black uppercase tracking-wider rounded">
                      Facebook Post #{post.id}
                    </span>
                    <i className="fa-brands fa-facebook text-xs text-[#1877F2]"></i>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed whitespace-pre-line line-clamp-4 group-hover:line-clamp-none transition-all">
                    {post.title}
                  </p>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#111111] text-white hover:bg-[#1877F2] transition-colors rounded-lg text-xs font-narrow font-black tracking-widest uppercase inline-flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>View Original Facebook Post</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CANVA EMBED MODAL POPUP */}
      {isCanvaModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCanvaModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#FAF9F6] border border-[#CCCCCC] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between border-b border-[#333333]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#00f2fe]">
                    <i className="fa-solid fa-palette text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-white leading-none">
                      Amor Resort & Protea Garden Canva Showcase
                    </h3>
                    <span className="font-narrow text-xs text-[#AAAAAA] tracking-wider uppercase block mt-0.5">
                      Interactive Canva Design Presentation
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={marketingExecutiveCampaignData.canvaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 hover:bg-white hover:text-[#111111] transition-all rounded text-xs font-narrow font-black uppercase tracking-wider text-white"
                  >
                    <span>Open in Canva</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>

                  <button
                    onClick={() => setIsCanvaModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center text-white"
                    aria-label="Close modal"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Modal Body / Canva Frame */}
              <div className="flex-1 bg-[#EBEBEB] relative overflow-hidden flex flex-col items-center justify-center p-4">
                <iframe
                  src={marketingExecutiveCampaignData.canvaUrl}
                  title="Amor Resort & Protea Garden Canva Showcase"
                  className="w-full h-full border-0 rounded-xl shadow-lg bg-white"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-white border-t border-[#CCCCCC]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="font-sans text-xs text-[#5E5E5E] flex items-center gap-2">
                  <i className="fa-solid fa-circle-info text-[#111111]"></i>
                  <span>If preview is blocked by browser policies, click "Open Direct Canva Link" below.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={marketingExecutiveCampaignData.canvaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-5 py-2 bg-[#111111] text-white hover:bg-[#333333] transition-colors rounded text-xs font-narrow font-black uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Open Direct Canva Link</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>

                  <button
                    onClick={() => setIsCanvaModalOpen(false)}
                    className="px-5 py-2 bg-[#EBEBEB] text-[#111111] hover:bg-[#CCCCCC] transition-colors rounded text-xs font-narrow font-black uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
}
