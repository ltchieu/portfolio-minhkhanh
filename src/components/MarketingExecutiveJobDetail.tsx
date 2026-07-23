import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { marketingExecutiveBrands } from '../data/marketingExecutiveData';
import type { MarketingExecutiveBrand, VideoItem } from '../models/marketingExecutive';
import ScrollReveal from './common/ScrollReveal';
import TikTokEmbed from './common/TikTokEmbed';
import FacebookEmbed from './common/FacebookEmbed';
import HeaderNav from './common/HeaderNav';
import JobHeroSection from './common/JobHeroSection';
import type { HeroMetricCard } from '../models/jobHeroSection';

// Filter tabs definition
const BRAND_TABS = [
  { id: 'all', label: 'All Projects (24 Videos)' },
  { id: 'protea-garden', label: 'Protea Garden (13 Videos)' },
  { id: 'dream-club', label: 'Dream Club (2 Videos)' },
  { id: 'hcmcou', label: 'HCMCOU (4 Videos)' },
  { id: 'amor-resort', label: 'Amor Resort (5 Videos)' },
  { id: 'aqua-jardin', label: 'Aqua Jardin (6 Videos)' },
] as const;

// Helper function for platform styling & colors
function getPlatformStyle(platform: VideoItem['platform']) {
  switch (platform) {
    case 'TikTok':
      return {
        badgeBg: 'bg-[#00F2FE] text-black font-black',
        icon: 'fa-brands fa-tiktok',
        hoverBorder: 'group-hover:border-[#00F2FE]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]'
      };
    case 'Facebook':
      return {
        badgeBg: 'bg-[#1877F2] text-white font-extrabold',
        icon: 'fa-brands fa-facebook',
        hoverBorder: 'group-hover:border-[#1877F2]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]'
      };
    case 'Google Drive':
      return {
        badgeBg: 'bg-[#0F9D58] text-white font-extrabold',
        icon: 'fa-brands fa-google-drive',
        hoverBorder: 'group-hover:border-[#0F9D58]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(15,157,88,0.3)]'
      };
    default:
      return {
        badgeBg: 'bg-[#111111] text-white font-extrabold',
        icon: 'fa-solid fa-play',
        hoverBorder: 'group-hover:border-[#111111]',
        glow: ''
      };
  }
}

// 1. Sleek Video Card Component (Autoplays video player on hover, hides text/tags on hover)
const VideoCard = memo(function VideoCard({
  video,
  onSelect,
}: {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const platformStyle = getPlatformStyle(video.platform);

  const videoIdMatch = video.url.match(/\/video\/(\d+)/);
  const tiktokId = videoIdMatch ? videoIdMatch[1] : '';

  return (
    <div
      className={`group relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#18181B] border border-white/10 ${platformStyle.hoverBorder} ${platformStyle.glow} shadow-md transition-all duration-300 cursor-pointer select-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(video)}
    >
      {/* Background Poster Image */}
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Gradient Overlay - Hidden when hovered */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>

      {/* Hover Autoplay Video Player Overlay with Audio/Volume enabled */}
      {isHovered && video.platform === 'TikTok' && tiktokId ? (
        <iframe
          src={`https://www.tiktok.com/player/v1/${tiktokId}?autoplay=1`}
          title={video.title}
          className="w-full h-full border-0 pointer-events-none absolute inset-0 z-20"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      ) : isHovered && video.platform === 'Facebook' ? (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(video.url)}&show_text=false&width=560&t=0&autoplay=true`}
          title={video.title}
          className="w-full h-full border-0 pointer-events-none absolute inset-0 z-20"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      ) : isHovered && video.platform === 'Google Drive' && video.embedUrl ? (
        <iframe
          src={video.embedUrl}
          title={video.title}
          className="w-full h-full border-0 pointer-events-none absolute inset-0 z-20"
          allow="autoplay; fullscreen"
        ></iframe>
      ) : null}

      {/* Bottom Floating Info Box - Hidden when hovered to keep video player 100% clean */}
      <div className={`absolute bottom-3 left-3 right-3 z-30 bg-[#1E1E22]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-2 pointer-events-none transition-all duration-300 ${isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <h4 className="font-sans text-xs font-bold text-white line-clamp-2 tracking-tight leading-snug">
          {video.title}
        </h4>
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1.5 ${platformStyle.badgeBg}`}>
            <i className={platformStyle.icon}></i>
            {video.platform}
          </span>
        </div>
      </div>
    </div>
  );
});

// 2. Lightbox Modal Component (Fully interactive player with controls & play fallback)
const VideoLightboxModal = memo(function VideoLightboxModal({
  selectedVideo,
  onClose,
}: {
  selectedVideo: VideoItem | null;
  onClose: () => void;
}) {
  const platformStyle = selectedVideo ? getPlatformStyle(selectedVideo.platform) : null;

  return (
    <AnimatePresence>
      {selectedVideo && platformStyle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-[#141416] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${platformStyle.badgeBg}`}>
                  #{selectedVideo.stt}
                </span>
                <div>
                  <h3 className="font-sans text-sm sm:text-base font-bold text-white line-clamp-1">
                    {selectedVideo.title}
                  </h3>
                  <span className="font-narrow text-[10px] uppercase tracking-widest text-white/60 flex items-center gap-1.5 mt-0.5">
                    <i className={platformStyle.icon}></i>
                    {selectedVideo.platform} Video Player
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Video Player Box with 100% interactive controls */}
            <div className="w-full min-h-[60vh] max-h-[75vh] rounded-xl overflow-y-auto bg-black border border-white/10 relative flex items-center justify-center p-2">
              {selectedVideo.platform === 'TikTok' && (
                <TikTokEmbed
                  url={selectedVideo.url}
                  title={selectedVideo.title}
                />
              )}

              {selectedVideo.platform === 'Facebook' && (
                <FacebookEmbed
                  url={selectedVideo.url}
                />
              )}

              {selectedVideo.platform === 'Google Drive' && selectedVideo.embedUrl && (
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="w-full h-[60vh] border-0 pointer-events-auto"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              <span className="font-sans text-xs text-white/70">
                Click controls in player above or watch directly on {selectedVideo.platform}:
              </span>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all ${platformStyle.badgeBg} hover:opacity-90`}
              >
                <span>Open in {selectedVideo.platform}</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});



// 5. Filter Tabs Component
const FilterTabs = memo(function FilterTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-6">
      <ScrollReveal direction="up" distance={20}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#CCCCCC]/40 pb-6">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] block uppercase mb-1">
              VIDEO GALLERY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
              VIDEO PORTFOLIO & CAMPAIGNS
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {BRAND_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-xs font-narrow font-bold uppercase tracking-wider rounded transition-all ${activeTab === tab.id
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#5E5E5E] border border-[#CCCCCC]/60 hover:border-[#111111]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
});

// 6. Brand Section Component
const BrandCard = memo(function BrandCard({
  brand,
  onSelectVideo,
}: {
  brand: MarketingExecutiveBrand;
  onSelectVideo: (video: VideoItem) => void;
}) {
  return (
    <ScrollReveal direction="up" distance={30}>
      <article className="bg-white border border-[#CCCCCC]/50 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#CCCCCC]/30 gap-4">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block mb-1">
              {brand.category}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#111111]">
              {brand.brand}
            </h3>
          </div>
          <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider bg-[#FAF9F6] border border-[#CCCCCC]/60 px-3.5 py-1.5 rounded-full flex items-center gap-2">
            <i className="fa-solid fa-clapperboard text-xs"></i>
            {brand.videos.length} Videos
          </span>
        </div>

        <p className="font-sans text-sm text-[#5E5E5E] mb-8 leading-relaxed max-w-3xl">
          {brand.description}
        </p>

        {/* 6-Column Video Card Grid (Matching user reference image design) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brand.videos.map((video) => (
            <VideoCard key={video.stt} video={video} onSelect={onSelectVideo} />
          ))}
        </div>
      </article>
    </ScrollReveal>
  );
});

// Main Page Component
export default function MarketingExecutiveJobDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Ensure top scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateHome = useCallback(() => {
    sessionStorage.setItem('portfolio_from_detail', 'true');
    navigate('/');
  }, [navigate]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectVideo = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    {
      label: 'Total Videos',
      value: '24+',
      note: 'Campaign Videos',
      icon: 'fa-solid fa-video'
    },
    {
      label: 'Brands',
      value: '5 Brands',
      note: 'Content ecosystem',
      icon: 'fa-solid fa-bullhorn'
    },
    {
      label: 'Platforms',
      value: 'TikTok / FB',
      note: 'Multi-channel reach',
      icon: 'fa-solid fa-share-nodes'
    },
    {
      label: 'Lightbox',
      value: 'Interactive',
      note: 'Click to play video',
      icon: 'fa-solid fa-expand',
      darkBg: true
    }
  ], []);

  const filteredBrands = useMemo(() => {
    if (activeTab === 'all') return marketingExecutiveBrands;
    return marketingExecutiveBrands.filter((b) => b.id === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* 1. Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="Mia Nguyen — Portfolio"
        badgeText="Marketing Executive (Probation)"
      />

      {/* 2. Hero Section */}
      <JobHeroSection
        japaneseBackgroundText="マーケティング"
        categoryText="ROLE & CAMPAIGNS"
        timeframe="Q1/2025 — PRESENT"
        title="Marketing Executive (Probation) & Video Production"
        description={
          <p>
            Directing short-form social video campaigns, brand storytelling series, and short film productions across 5 major brands: Protea Garden, Dream Club, HCMCOU, Amor Resort, and Aqua Jardin. Click any video card to open the interactive player modal.
          </p>
        }
        metrics={heroMetrics}
      />

      {/* 3. Filter Tabs */}
      <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 4. Video Brands Showcase */}
      <section className="max-w-[1440px] mx-auto px-6 space-y-16 pt-6">
        {filteredBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} onSelectVideo={handleSelectVideo} />
        ))}
      </section>

      {/* 5. Bottom Navigation & CTA */}
      <ScrollReveal direction="up" distance={20}>
        <section className="max-w-[1440px] mx-auto px-6 pt-16 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-[#CCCCCC]/40 mt-20">
          <button
            onClick={handleNavigateHome}
            className="group flex items-center gap-3 font-narrow text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:text-[#5E5E5E] transition-colors"
          >
            <span className="w-10 h-10 rounded-full border border-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </span>
            <span>Back to Portfolio Main Page</span>
          </button>

          <button
            onClick={handleScrollTop}
            className="font-narrow text-xs font-bold text-[#5E5E5E] hover:text-[#111111] uppercase tracking-widest flex items-center gap-2"
          >
            <span>Top of Page</span>
            <i className="fa-solid fa-arrow-up text-xs"></i>
          </button>
        </section>
      </ScrollReveal>

      {/* 6. Video Lightbox Modal */}
      <VideoLightboxModal selectedVideo={selectedVideo} onClose={handleCloseLightbox} />
    </div>
  );
}
