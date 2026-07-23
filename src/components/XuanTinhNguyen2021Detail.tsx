import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import HeaderNav from './common/HeaderNav';
import JobHeroSection from './common/JobHeroSection';
import GallerySkeleton from './common/GallerySkeleton';
import ImageLightboxModal from './common/ImageLightboxModal';
import type { HeroMetricCard } from '../models/jobHeroSection';
import type { LightboxImageData } from '../models/imageLightboxModal';
import type { MasonryItem } from '../models/masonry';
import type { MarqueeItem } from '../models/infiniteMarquee';
import type { DomeImage } from '../models/domeGallery';
import ScrollReveal from './common/ScrollReveal';

import DomeGallery from './common/DomeGallery';
import InfiniteMarquee from './common/InfiniteMarquee';

// Dynamic lazy imports for below-the-fold component suites
const Masonry = lazy(() => import('./common/Masonry'));
const Stack = lazy(() => import('./common/Stack'));

// Vite eager glob for assets under /assets/image/Activities/Xuân tình nguyện 2021
const xtn21Glob = import.meta.glob<string>(
  '../../assets/image/Activities/Xuân tình nguyện 2021/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

function getImagesMatching(pathSubstring: string): string[] {
  return Object.keys(xtn21Glob)
    .filter((key) => key.toLowerCase().includes(pathSubstring.toLowerCase()))
    .map((key) => xtn21Glob[key]);
}

// Expand image array if source count is small, or return all authentic images if count >= minTarget
function expandImagesToTarget(images: string[], minTarget: number = 11): string[] {
  if (images.length === 0) return [];
  if (images.length >= minTarget) return images;
  const expanded: string[] = [];
  for (let i = 0; i < minTarget; i++) {
    expanded.push(images[i % images.length]);
  }
  return expanded;
}

export default function XuanTinhNguyen2021Detail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Match project metadata from data store
  const project = useMemo(() => {
    return projects.find((p) => p.id === 'xuan-tinh-nguyen-2021') || projects[0];
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateHome = useCallback(() => {
    sessionStorage.setItem("portfolio_from_detail", "true");
    navigate('/');
  }, [navigate]);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // 1. Root images directly under "Xuân tình nguyện 2021" folder
  const rootImages = useMemo(() => {
    return Object.keys(xtn21Glob)
      .filter((key) => !key.includes('Hoạt động vẽ tường') &&
        !key.includes('20210125 Vẽ tường XTN21') &&
        !key.includes('20210123 Hoạt động phát cháo đêm') &&
        !key.includes('20210123 Hoạt động nấu cháo'))
      .map((key) => xtn21Glob[key]);
  }, []);

  // 2. Folder: Hoạt động vẽ tường (expanded to 9 images for DomeGallery)
  const wallActivityImages = useMemo(() => {
    const raw = getImagesMatching('Hoạt động vẽ tường');
    return expandImagesToTarget(raw, 9);
  }, []);

  // 3. Folder: 20210125 Vẽ tường XTN21 (Edited) (expanded to 8 images for Masonry)
  const wallEditedImages = useMemo(() => {
    const raw = getImagesMatching('20210125 Vẽ tường XTN21');
    return expandImagesToTarget(raw, 8);
  }, []);

  // 4. Folder: 20210123 Hoạt động phát cháo đêm (edited) (expanded to 8 images for Stack)
  const nightPorridgeImages = useMemo(() => {
    const raw = getImagesMatching('20210123 Hoạt động phát cháo đêm');
    return expandImagesToTarget(raw, 8);
  }, []);

  // 5. Folder: 20210123 Hoạt động nấu cháo (edited) (expanded to 9 images for Normal Grid)
  const cookingPorridgeImages = useMemo(() => {
    const raw = getImagesMatching('20210123 Hoạt động nấu cháo');
    return expandImagesToTarget(raw, 9);
  }, []);

  // Hero section metric cards
  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    { label: 'Volunteers', value: '40+', note: 'Active team members', icon: 'fa-solid fa-users' },
    { label: 'Midnight Porridge', value: '300+', note: 'Servings delivered', icon: 'fa-solid fa-bowl-food' },
    { label: 'Wall Murals', value: '2 Schools', note: 'Primary school art', icon: 'fa-solid fa-paint-roller' },
    { label: 'Campaign Year', value: '2021', note: 'Spring Outreach', icon: 'fa-solid fa-calendar' }
  ], []);

  // DomeGallery images format
  const domeGalleryImages: (string | DomeImage)[] = useMemo(() => {
    return wallActivityImages.map((src) => ({ src, alt: 'Hoạt động vẽ tường XTN 2021' }));
  }, [wallActivityImages]);

  // Marquee items format
  const marqueeItems: MarqueeItem[] = useMemo(() => {
    return rootImages.map((src, i) => ({
      id: `marquee-root-${i}`,
      img: src,
      title: `XTN 2021 Campaign Identity 0${i + 1}`,
      subtitle: 'Official Poster & Graphic Design'
    }));
  }, [rootImages]);

  // Masonry items format
  const masonryItems: MasonryItem[] = useMemo(() => {
    const heights = [340, 420, 310, 390, 350, 400, 320, 380];
    return wallEditedImages.map((src, i) => ({
      id: `wall-edited-${i}`,
      img: src,
      height: heights[i % heights.length],
      title: `Mural Painting Coverage 0${i + 1}`,
      subtitle: '20210125 Vẽ tường XTN21 (Edited)'
    }));
  }, [wallEditedImages]);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="VOLUNTEER CAMPAIGN 2021"
        badgeText="XTN 2021"
      />

      {/* Hero Header Section */}
      <JobHeroSection
        japaneseBackgroundText="春のボランティア"
        categoryText="COMMUNITY OUTREACH & WALL MURAL ART"
        timeframe="JANUARY 2021"
        title="Xuân Tình Nguyện 2021 — Community Campaign"
        description={
          <p>
            Leading community outreach, midnight porridge distribution, and primary school wall mural painting for <strong className="text-[#111111] font-semibold">Xuân Tình Nguyện 2021</strong>. Managed volunteer operations across 4 key fronts and created the complete visual branding suite.
          </p>
        }
        tags={['Wall Mural Painting', 'Midnight Porridge Outreach', 'Campaign Identity', 'Volunteer Logistics']}
        metrics={heroMetrics}
      />

      <div className="max-w-[1440px] mx-auto px-6 space-y-24 pt-12">
        {/* ========================================================================= */}
        {/* SHOWCASE 01: ROOT FOLDER IMAGES — INFINITE MARQUEE                        */}
        {/* ========================================================================= */}
        <section id="campaign-marquee">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 01 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    FOLDER: XUÂN TÌNH NGUYỆN 2021 (ROOT GRAPHICS)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Campaign Visual & Graphic Identity Suite
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Continuous infinite marquee displaying official campaign posters, Facebook cover graphics, scholarship certificates, gratitude letters, and avatar frames created for Xuân Tình Nguyện 2021.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="320px" title="Loading Campaign Identity Marquee..." />}>
            <div className="py-4 bg-[#111111] rounded-2xl border border-[#111111] overflow-hidden shadow-lg">
              <InfiniteMarquee
                items={marqueeItems}
                speed={30}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'XTN 2021 Campaign Identity',
                    category: 'Xuân Tình Nguyện 2021 Branding',
                    description: 'Official campaign graphic asset for Xuân Tình Nguyện 2021.'
                  });
                }}
              />
            </div>
          </Suspense>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 02: HOẠT ĐỘNG VẼ TƯỜNG — DOME GALLERY                            */}
        {/* ========================================================================= */}
        <section id="wall-painting-dome">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 02 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: HOẠT ĐỘNG VẼ TƯỜNG (9 IMAGES)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Primary School Wall Mural Painting
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Interactive 3D dome sphere showcase exhibiting volunteer artists painting colorful wall murals for local primary school children. Click and drag to rotate the dome; click tiles to view in full resolution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="600px" title="Loading Interactive Dome Gallery..." />}>
            <div className="w-full h-[600px] sm:h-[700px] overflow-hidden rounded-xl bg-[#0A0A0A]">
              <DomeGallery
                images={domeGalleryImages}
                fit={0.8}
                minRadius={320}
                maxRadius={800}
                segments={30}
                grayscale={false}
              />
            </div>
          </Suspense>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 03: 20210125 VẼ TƯỜNG XTN21 (EDITED) — MASONRY GRID              */}
        {/* ========================================================================= */}
        <section id="wall-painting-masonry">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 03 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: 20210125 VẼ TƯỜNG XTN21 (EDITED) (8 IMAGES)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Mural Painting High-Res Photojournalism
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Staggered masonry arrangement showcasing detailed brushwork, volunteer collaboration, and final wall mural artwork.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="550px" title="Loading Mural Masonry Grid..." />}>
            <div className="min-h-[450px]">
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.03}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'Mural Painting Coverage',
                    category: 'Xuân Tình Nguyện 2021 Wall Painting',
                    description: 'High-resolution photo coverage of primary school wall mural painting.'
                  });
                }}
              />
            </div>
          </Suspense>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 04: 20210123 PHÁT CHÁO ĐÊM (EDITED) — INTERACTIVE STACK          */}
        {/* ========================================================================= */}
        <section id="night-porridge-stack">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 04 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: 20210123 HOẠT ĐỘNG PHÁT CHÁO ĐÊM (EDITED) (8 IMAGES)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Midnight Porridge Outreach Rounds
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Interactive swipeable card stack capturing late night volunteer rounds distributing warm porridge to hard-working night laborers and street vendors. Click the top card to send to back.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex justify-center py-10 bg-white border border-[#CCCCCC]/50 rounded-2xl shadow-sm">
            <Suspense fallback={<GallerySkeleton height="380px" title="Loading Card Stack..." />}>
              <div className="w-[360px] h-[400px] relative flex items-center justify-center">
                <Stack
                  cards={nightPorridgeImages.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedImage({
                          src,
                          title: `Midnight Porridge Delivery — Photo 0${i + 1}`,
                          category: 'Xuân Tình Nguyện 2021 Outreach',
                          description: 'Volunteers distributing midnight porridge to hard-working night laborers.'
                        });
                      }}
                      className="w-full h-full rounded-xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer bg-[#111111]"
                    >
                      <img src={src} alt={`Night Porridge ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  sendToBackOnClick={true}
                  randomRotation={true}
                />
              </div>
            </Suspense>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 05: 20210123 NẤU CHÁO (EDITED) — NORMAL DISPLAY GRID              */}
        {/* ========================================================================= */}
        <section id="cooking-porridge-grid">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 05 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: 20210123 HOẠT ĐỘNG NẤU CHÁO (EDITED) (9 IMAGES)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
                  Porridge Kitchen Cooking & Packing
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Standard responsive photo grid documenting early morning kitchen prep, large-kettle porridge cooking, and hygienic food portioning. Click any thumbnail to preview in full resolution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {cookingPorridgeImages.map((src, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage({
                    src,
                    title: `Porridge Kitchen Preparation — Photo 0${idx + 1}`,
                    category: 'Xuân Tình Nguyện 2021 Kitchen',
                    description: 'Early morning cooking and packing of fresh nutritious porridge.'
                  });
                }}
                className="aspect-square rounded-xl overflow-hidden bg-white border border-[#CCCCCC]/60 shadow-sm relative group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Cooking Porridge ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-narrow font-bold uppercase tracking-wider bg-black/70 px-3 py-1.5 rounded flex items-center gap-2">
                    <i className="fa-solid fa-magnifying-glass-plus text-xs"></i> View Full Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation & CTA */}
      <ScrollReveal direction="up" distance={20}>
        <section className="max-w-[1440px] mx-auto px-6 pt-16 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-[#CCCCCC]/40 mt-20">
          <button
            onClick={handleNavigateHome}
            className="group flex items-center gap-3 font-narrow text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:text-[#5E5E5E] transition-colors cursor-pointer"
          >
            <span className="w-10 h-10 rounded-full border border-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </span>
            <span>Back to Portfolio Main Page</span>
          </button>

          <button
            onClick={handleScrollTop}
            className="font-narrow text-xs font-bold text-[#5E5E5E] hover:text-[#111111] uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            <span>Top of Page</span>
            <i className="fa-solid fa-arrow-up text-xs"></i>
          </button>
        </section>
      </ScrollReveal>

      {/* Lightbox Modal */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={handleCloseLightbox} />
    </div>
  );
}
