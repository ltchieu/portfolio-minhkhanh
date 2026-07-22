import { useState, useEffect, useMemo, useCallback, lazy, Suspense, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { freelanceProjects } from '../data/freelanceProjectsData';
import type { FreelanceProject } from '../models/freelanceProjects';
import ScrollReveal from './common/ScrollReveal';
import TikTokEmbed from './common/TikTokEmbed';

// 1. Dynamic / Lazy Imports for Heavy 3D Components (Bundle Size & LCP Optimization)
const Stack = lazy(() => import('./common/Stack'));
const DomeGallery = lazy(() => import('./common/DomeGallery'));

// 2. Static Hoisting for Filter Tabs (Prevents Allocation on Every Render)
const FILTER_TABS = [
  { id: 'all', label: 'All Projects (6)' },
  { id: 'dome', label: '3D Dome Gallery' },
  { id: 'stack', label: 'Card Stack' },
] as const;

// Component Skeleton for Suspense boundaries
function GallerySkeleton({ height = '450px' }: { height?: string }) {
  return (
    <div
      style={{ height }}
      className="w-full bg-[#1A1A1A] animate-pulse rounded-lg flex items-center justify-center border border-white/10"
    >
      <div className="flex items-center gap-3 text-white/50 text-xs font-mono">
        <i className="fa-solid fa-spinner fa-spin text-sm"></i>
        <span>Loading Interactive Gallery...</span>
      </div>
    </div>
  );
}

// 3. Memoized Header Component
const HeaderNav = memo(function HeaderNav({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#CCCCCC]/40">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-3 font-narrow text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:text-[#5E5E5E] transition-colors"
          aria-label="Back to portfolio main page"
        >
          <span className="w-8 h-8 rounded-full border border-[#CCCCCC] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </span>
          <span>Return to Portfolio</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-[0.25em] uppercase hidden sm:inline-block">
            CASE STUDY 01 / 04
          </span>
          <span className="h-4 w-[1px] bg-[#CCCCCC] hidden sm:block"></span>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-[#111111] text-white rounded">
            FREELANCE
          </span>
        </div>
      </div>
    </header>
  );
});

// 4. Memoized Hero Component
const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 border-b border-[#CCCCCC]/40 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#F4F3EF] to-[#FAF9F6]">
      <div className="absolute right-8 top-12 select-none pointer-events-none opacity-5 font-display text-8xl md:text-9xl text-[#111111] writing-vertical hidden lg:block tracking-widest">
        独立広報活動
      </div>

      <div className="max-w-[1440px] mx-auto px-6">
        <ScrollReveal direction="up" distance={30}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block">
                  ROLE & EXPERTISE
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                  Q2/2025 — PRESENT
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-[#111111] leading-[1.05]">
                Independent Communications Associate & Event Coordinator
              </h2>

              <p className="font-sans text-lg sm:text-xl text-[#5E5E5E] max-w-3xl leading-relaxed">
                Coordinating end-to-end communication, brand activations, and event projects for HCMC Open University and independent clients. Overseeing creative production, vendor logistics, micro-timelines, and attendee experience for events scaling up to 350+ guests.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Max Attendance
                  </span>
                  <i className="fa-solid fa-users text-[#111111] text-sm"></i>
                </div>
                <span className="font-display text-2xl sm:text-3xl text-[#111111]">
                  350+
                </span>
                <p className="font-sans text-xs text-[#5E5E5E] mt-1">Live guests managed</p>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Vendors
                  </span>
                  <i className="fa-solid fa-handshake text-[#111111] text-sm"></i>
                </div>
                <span className="font-display text-2xl sm:text-3xl text-[#111111]">
                  5 Partners
                </span>
                <p className="font-sans text-xs text-[#5E5E5E] mt-1">SOP & timeline sync</p>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Assets
                  </span>
                  <i className="fa-solid fa-photo-film text-[#111111] text-sm"></i>
                </div>
                <span className="font-display text-2xl sm:text-3xl text-[#111111]">
                  100+
                </span>
                <p className="font-sans text-xs text-[#5E5E5E] mt-1">Creative media files</p>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Projects
                  </span>
                  <i className="fa-solid fa-cubes text-[#111111] text-sm"></i>
                </div>
                <span className="font-display text-2xl sm:text-xl text-[#111111]">
                  6 Delivered
                </span>
                <p className="font-sans text-xs text-[#5E5E5E] mt-1">Full case portfolio</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

// 5. Memoized Filter Tabs Component
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
              PROJECT ARCHIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
              FREELANCE CASE STUDIES
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
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

// 6. Memoized Project Card Component (Prevents Fan-Out Re-renders)
const ProjectCard = memo(function ProjectCard({
  project,
  onSelectImage,
}: {
  project: FreelanceProject;
  onSelectImage: (src: string) => void;
}) {
  const featuredImages = useMemo(() => project.images.slice(0, 6), [project.images]);
  const remainingImages = useMemo(() => project.images.slice(6, 56), [project.images]);

  // Memoized cards array for Stack component
  const stackCards = useMemo(() => {
    if (project.displayType !== 'stack') return [];
    return project.images.map((src, imgIdx) => (
      <div key={imgIdx} className="w-full h-full relative">
        <img
          src={src}
          alt={`Cốm Gừng Ceramic ${imgIdx + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ));
  }, [project.displayType, project.images]);

  return (
    <ScrollReveal direction="up" distance={30}>
      <article
        id={project.id}
        className="bg-white border border-[#CCCCCC]/50 rounded-lg p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Top Meta info bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#CCCCCC]/30 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-narrow text-sm font-black text-[#111111] tracking-widest">
              {project.index}
            </span>
            <span className="text-[#CCCCCC]">•</span>
            <span className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-widest uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#111111]">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-narrow font-bold uppercase text-[#5E5E5E]">
          <span className="px-3 py-1.5 bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded">
            Client: {project.client}
          </span>
          <span className="px-3 py-1.5 bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded">
            {project.timeframe}
          </span>
        </div>
      </div>

      {/* Description & Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] uppercase">
            PROJECT SUMMARY & EXECUTION
          </h4>
          <p className="font-sans text-[#111111] text-base leading-relaxed">
            {project.description}
          </p>
          <p className="font-narrow text-sm font-bold text-[#111111] italic bg-[#FAF9F6] p-4 rounded border-l-4 border-[#111111]">
            &ldquo;{project.summary}&rdquo;
          </p>
          {project.tiktokUrl && (
            <div className="pt-2">
              <a
                href={project.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#111111] text-white text-xs font-narrow font-bold uppercase tracking-wider rounded hover:bg-[#333333] transition-all shadow-sm group border border-[#111111]"
              >
                <i className="fa-brands fa-tiktok text-sm text-[#00f2fe] group-hover:scale-110 transition-transform"></i>
                <span>Watch Campaign Video on TikTok</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-white/70"></i>
              </a>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#CCCCCC]/40 p-6 rounded space-y-4">
          <h4 className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] uppercase flex items-center gap-2">
            <i className="fa-solid fa-trophy text-[#111111]"></i>
            KEY RESULT & HIGHLIGHTS
          </h4>
          <p className="font-sans text-sm text-[#111111] font-medium leading-relaxed">
            {project.result}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.highlights.map((item, hIdx) => (
              <span
                key={hIdx}
                className="font-mono text-xs bg-white border border-[#CCCCCC]/60 px-3 py-1 rounded text-[#111111] flex items-center gap-1.5"
              >
                <i className="fa-solid fa-check text-[10px] text-[#111111]"></i>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Showcase rendering based on displayType */}
      {project.displayType === 'stack' ? (
        /* === STACK DISPLAY + EMBEDDED TIKTOK VIDEO FOR COM GUNG CERAMIC === */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Ceramic Card Stack & Thumbnails */}
          <div className="lg:col-span-7 bg-[#FAF9F6] p-6 sm:p-8 rounded-lg border border-[#CCCCCC]/40 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                <div>
                  <h4 className="font-narrow text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-layer-group"></i>
                    Interactive Ceramic Card Stack ({project.images.length} Photos)
                  </h4>
                  <p className="font-sans text-xs text-[#5E5E5E]">
                    Drag cards or click to cycle through product editorial shots.
                  </p>
                </div>
                <span className="font-mono text-xs bg-[#111111] text-white px-3 py-1 rounded self-start sm:self-auto">
                  DRAG & CLICK TO SWIPE
                </span>
              </div>

              <div className="flex justify-center items-center py-6">
                <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] relative">
                  <Suspense fallback={<GallerySkeleton height="320px" />}>
                    <Stack
                      randomRotation={true}
                      sensitivity={180}
                      sendToBackOnClick={true}
                      autoplay={false}
                      cards={stackCards}
                    />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Thumbnail gallery preview row */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-6 border-t border-[#CCCCCC]/30 mt-4">
              {project.images.map((src, thumbIdx) => (
                <button
                  key={thumbIdx}
                  onClick={() => onSelectImage(src)}
                  className="aspect-square rounded overflow-hidden border border-[#CCCCCC]/60 hover:border-[#111111] transition-all group"
                >
                  <img
                    src={src}
                    alt={`thumb-${thumbIdx}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Embedded TikTok Video Player */}
          <div className="lg:col-span-5 bg-[#111111] text-white p-6 rounded-lg border border-[#111111] flex flex-col items-center justify-between">
            <div className="w-full mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-tiktok text-lg text-[#00f2fe]"></i>
                <h4 className="font-narrow text-sm font-black uppercase tracking-wider text-white">
                  CAMPAIGN REEL & TIKTOK VIDEO
                </h4>
              </div>
              <span className="font-mono text-xs bg-white/10 text-white px-2.5 py-0.5 rounded border border-white/20">
                EMBEDDED VIDEO
              </span>
            </div>

            <div className="w-full flex-1 flex justify-center items-center py-2 overflow-auto">
              <TikTokEmbed
                url={project.tiktokUrl || "https://www.tiktok.com/@comgung_ceramic/video/7546055391021419797"}
                videoId="7546055391021419797"
                title="Cốm Gừng Ceramic Side project"
                author="@comgung_ceramic"
              />
            </div>

            <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-narrow text-white/70">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-circle-play text-[#00f2fe] text-xs"></i>
                @comgung_ceramic
              </span>
              <a
                href={project.tiktokUrl || "https://www.tiktok.com/@comgung_ceramic/video/7546055391021419797"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open in TikTok</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      ) : project.displayType === 'dome' ? (
        /* === FEATURED GRID + DOME GALLERY FOR COCOROSE X CHEESE COFFEE === */
        <div className="space-y-10">
          <div>
            <h4 className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] uppercase mb-4 flex items-center justify-between">
              <span>FEATURED EVENT HIGHLIGHTS (6 KEY SHOTS)</span>
              <span className="font-mono text-xs text-[#111111]">
                Total 87 Campaign Photos
              </span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {featuredImages.map((src, fIdx) => (
                <div
                  key={fIdx}
                  onClick={() => onSelectImage(src)}
                  className="aspect-[4/3] rounded overflow-hidden bg-[#FAF9F6] border border-[#CCCCCC]/40 relative group cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Cocorose Featured ${fIdx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-narrow font-bold uppercase tracking-wider bg-black/60 px-3 py-1.5 rounded flex items-center gap-2">
                      <i className="fa-solid fa-magnifying-glass-plus"></i> View Image
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-lg border border-[#111111] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
              <div>
                <h4 className="font-narrow text-sm font-black uppercase tracking-wider flex items-center gap-2 text-white">
                  <i className="fa-solid fa-globe text-white/80"></i>
                  3D Sphere Dome Gallery ({remainingImages.length} Photos)
                </h4>
                <p className="font-sans text-xs text-white/60">
                  Drag left/right to rotate the 3D sphere dome. Click any tile to expand.
                </p>
              </div>
              <span className="font-mono text-xs bg-white/10 text-white px-3 py-1 rounded border border-white/20">
                DRAG & ROTATE SPHERE
              </span>
            </div>

            <div className="w-full h-[450px] sm:h-[550px] rounded-lg overflow-hidden relative">
              <Suspense fallback={<GallerySkeleton height="500px" />}>
                <DomeGallery
                  images={remainingImages}
                  fit={0.55}
                  minRadius={450}
                  segments={35}
                  grayscale={false}
                  overlayBlurColor="#111111"
                  imageBorderRadius="12px"
                />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        /* === STANDARD GRID DISPLAY FOR PROJECTS WITH <= 6 IMAGES === */
        <div className="space-y-4">
          <h4 className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] uppercase flex items-center justify-between">
            <span>PROJECT GALLERY ({project.images.length} ASSETS)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((src, gIdx) => (
              <div
                key={gIdx}
                onClick={() => onSelectImage(src)}
                className="aspect-[4/3] rounded overflow-hidden bg-[#FAF9F6] border border-[#CCCCCC]/40 relative group cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={src}
                  alt={`${project.title} asset ${gIdx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-narrow font-bold uppercase tracking-wider bg-black/60 px-3 py-1.5 rounded flex items-center gap-2">
                    <i className="fa-solid fa-magnifying-glass-plus"></i> Expand Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </article>
    </ScrollReveal>
  );
});

// 7. Memoized Lightbox Modal Component
const LightboxModal = memo(function LightboxModal({
  selectedImage,
  onClose,
}: {
  selectedImage: string | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 font-narrow text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <span>Close</span>
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <img
              src={selectedImage}
              alt="Enlarged case asset"
              className="max-w-full max-h-[80vh] object-contain rounded border border-white/20 shadow-2xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// 8. Main JobDetail Page Component
export default function JobDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Stable callbacks for handlers
  const handleNavigateHome = useCallback(() => {
    sessionStorage.setItem("portfolio_from_detail", "true");
    navigate('/');
  }, [navigate]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleSelectImage = useCallback((src: string) => {
    setSelectedImage(src);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoized filter results
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return freelanceProjects;
    return freelanceProjects.filter((p) => p.displayType === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* 1. Header Navigation Bar */}
      <HeaderNav onNavigateHome={handleNavigateHome} />

      {/* 2. Hero Header */}
      <HeroSection />

      {/* 3. Project Filter Tabs */}
      <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 4. Projects Showcase Section */}
      <section className="max-w-[1440px] mx-auto px-6 space-y-24 pt-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectImage={handleSelectImage}
          />
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

      {/* 6. Image Lightbox Modal */}
      <LightboxModal selectedImage={selectedImage} onClose={handleCloseLightbox} />
    </div>
  );
}
