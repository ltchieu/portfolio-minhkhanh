import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./common/ScrollReveal";
import FacebookEmbed from "./common/FacebookEmbed";
import { marketingExecutiveBrands } from "../data/marketingExecutiveData";
import type { VideoItem } from "../models/marketingExecutive";

// Filter specifically for DREAM CLUB (L117-L141) and HCMCOU (L142-L182)
const selectedVideoBrands = marketingExecutiveBrands.filter(
  (brand) => brand.id === "dream-club" || brand.id === "hcmcou"
);

export default function Work() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const handleOpenVideoModal = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="work" className="py-24 bg-[#FAF9F6] scroll-mt-20 border-b border-[#CCCCCC]/60">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-[#111111]/15 pb-8">
            <div>
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
                CURATED CREATIVE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
                SELECTED WORKS
              </h2>
            </div>
            <p className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-widest max-w-xs md:text-right">
              A precise collision of volunteer leadership, brand identity, and creative event production
            </p>
          </div>
        </ScrollReveal>

        {/* Video Brand Collections */}
        <div className="space-y-16">
          {selectedVideoBrands.map((brandSection, bIdx) => (
            <div key={brandSection.id} className="space-y-6">
              {/* Brand Header */}
              <ScrollReveal direction="up" delay={bIdx * 0.1}>
                <div className="bg-white border border-[#CCCCCC]/60 p-6 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <span className="font-narrow text-[10px] font-black text-[#008b8b] tracking-[0.2em] uppercase block">
                      {brandSection.category}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide">
                      {brandSection.brand}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5E5E5E] leading-relaxed pt-1">
                      {brandSection.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs bg-[#111111] text-white px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold self-start md:self-auto">
                    {brandSection.videos.length} VIDEO REELS
                  </span>
                </div>
              </ScrollReveal>

              {/* Videos Grid */}
              <div
                className={`grid grid-cols-1 ${
                  brandSection.videos.length === 2
                    ? "md:grid-cols-2 gap-6"
                    : "sm:grid-cols-2 lg:grid-cols-4 gap-5"
                }`}
              >
                {brandSection.videos.map((video, vIdx) => (
                  <ScrollReveal key={video.stt} direction="up" delay={vIdx * 0.08}>
                    <div
                      onClick={() => handleOpenVideoModal(video)}
                      className="group relative bg-[#111111] rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                    >
                      {/* Video Thumbnail with Play Button Overlay */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-85 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                        {/* Centered Glowing Play Button Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#00f2fe] group-hover:text-[#111111] transition-all duration-300 shadow-lg">
                            <i className="fa-solid fa-play text-sm ml-0.5"></i>
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="font-mono text-[10px] font-bold bg-black/80 text-white px-2.5 py-1 rounded border border-white/20">
                            #{video.stt}
                          </span>
                          <span className="font-mono text-[10px] font-bold bg-[#1877F2] text-white px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                            <i className="fa-brands fa-facebook-f text-[9px]"></i>
                            REEL
                          </span>
                        </div>
                      </div>

                      {/* Card Content & Action Trigger */}
                      <div className="p-4 bg-[#141416] text-white space-y-3 flex-1 flex flex-col justify-between">
                        <h4 className="font-sans text-xs sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#00f2fe] transition-colors">
                          {video.title}
                        </h4>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-narrow font-bold text-white/70 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <i className="fa-solid fa-circle-play text-[10px] text-[#00f2fe]"></i>
                            Watch Video
                          </span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-xs text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all"></i>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal Portal */}
      {createPortal(
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideoModal}
              className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full max-h-[92vh] flex flex-col bg-[#141416] border border-white/20 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 overflow-hidden"
              >
                {/* Modal Header */}
                <div className="w-full flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="space-y-0.5">
                    <span className="font-narrow text-[10px] font-black text-[#00f2fe] tracking-[0.2em] uppercase block">
                      #{selectedVideo.stt} • {selectedVideo.platform} REEL
                    </span>
                    <h3 className="font-display text-base sm:text-lg text-white uppercase tracking-wide line-clamp-1">
                      {selectedVideo.title}
                    </h3>
                  </div>

                  <button
                    onClick={handleCloseVideoModal}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    aria-label="Close video modal"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>

                {/* Facebook Video Player Box */}
                <div className="w-full flex-1 min-h-[320px] max-h-[60vh] rounded-xl overflow-hidden bg-black border border-white/10 relative flex items-center justify-center p-2">
                  <FacebookEmbed url={selectedVideo.url} />
                </div>

                {/* Modal Footer */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/15">
                  <span className="font-sans text-xs text-white/70">
                    Watching interactive Facebook video Reel embed
                  </span>
                  <a
                    href={selectedVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#1877F2] text-white hover:bg-[#166fe5] transition-all font-narrow text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2"
                  >
                    <span>Watch on Facebook</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
