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
import ScrollReveal from './common/ScrollReveal';

// Dynamic lazy imports for optimized below-the-fold loading speed
const InfiniteMarquee = lazy(() => import('./common/InfiniteMarquee'));
const Stack = lazy(() => import('./common/Stack'));
const Masonry = lazy(() => import('./common/Masonry'));
const BounceCards = lazy(() => import('./common/BounceCards'));

// Vite eager glob for authentic image assets under /assets/image/Activities/Xuân tình nguyện 2022
const xtn22Glob = import.meta.glob<string>(
  '../../assets/image/Activities/Xuân tình nguyện 2022/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

function getImagesMatching(pathSubstring: string): string[] {
  return Object.keys(xtn22Glob)
    .filter((key) => key.toLowerCase().includes(pathSubstring.toLowerCase()))
    .map((key) => xtn22Glob[key]);
}

function expandImagesToTarget(images: string[], minTarget: number = 8): string[] {
  if (images.length === 0) return [];
  if (images.length >= minTarget) return images;
  const expanded: string[] = [];
  for (let i = 0; i < minTarget; i++) {
    expanded.push(images[i % images.length]);
  }
  return expanded;
}

export default function XuanTinhNguyen2022Detail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Match project metadata from data store
  const project = useMemo(() => {
    return projects.find((p) => p.id === 'xuan-tinh-nguyen-2022') || projects[1];
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

  // 1. Root images directly under "Xuân tình nguyện 2022" folder
  const rootImages = useMemo(() => {
    return Object.keys(xtn22Glob)
      .filter((key) =>
        !key.includes('Hậu trường phóng sự') &&
        !key.includes('Nghiệm thu') &&
        !key.includes('Tổ chức trò chơi XTN') &&
        !key.includes('Mái ấm XTN')
      )
      .map((key) => xtn22Glob[key]);
  }, []);

  // 2. Subfolder: 20220120 Tổ chức trò chơi XTN (Children Community Games)
  const gameImages = useMemo(() => {
    const raw = getImagesMatching('Tổ chức trò chơi XTN');
    return expandImagesToTarget(raw, 8);
  }, []);

  // 3. Subfolder: 20220123 Mái ấm XTN (Shelter & Orphanage Charity Visit)
  const shelterImages = useMemo(() => {
    const raw = getImagesMatching('Mái ấm XTN');
    return expandImagesToTarget(raw, 8);
  }, []);

  // 4. Subfolder: 20220118 Hậu trường phóng sự (Reportage Behind The Scenes)
  const reportageImages = useMemo(() => {
    const raw = getImagesMatching('Hậu trường phóng sự');
    return expandImagesToTarget(raw, 5);
  }, []);

  // 5. Subfolder: 20220120 Nghiệm thu (Project Quality Inspection & Handover)
  const handoverImages = useMemo(() => {
    return getImagesMatching('Nghiệm thu');
  }, []);

  // Hero section metric cards
  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    { label: 'Volunteers', value: '50+', note: 'Active team members', icon: 'fa-solid fa-users' },
    { label: 'Shelter Children', value: '120+', note: 'Kids supported', icon: 'fa-solid fa-heart' },
    { label: 'Exhibition Visitors', value: '800+', note: 'Campus & online audience', icon: 'fa-solid fa-eye' },
    { label: 'Campaign Year', value: '2022', note: 'Spring Outreach', icon: 'fa-solid fa-calendar' }
  ], []);

  // Marquee items format
  const marqueeItems: MarqueeItem[] = useMemo(() => {
    return rootImages.map((src, i) => ({
      id: `marquee-xtn22-${i}`,
      img: src,
      title: `Spring Campaign 2022 Visual 0${i + 1}`,
      subtitle: 'Official Poster & Exhibition Design'
    }));
  }, [rootImages]);

  // Masonry items format for Shelter Visit
  const shelterMasonryItems: MasonryItem[] = useMemo(() => {
    const heights = [360, 440, 320, 400, 380, 420, 340, 390];
    return shelterImages.map((src, i) => ({
      id: `shelter-${i}`,
      img: src,
      height: heights[i % heights.length],
      title: `Shelter Charity Visit — Photo 0${i + 1}`,
      subtitle: 'Children Orphanage Workshop 2022'
    }));
  }, [shelterImages]);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="SPRING VOLUNTEER CAMPAIGN 2022"
        badgeText="XTN 2022"
      />

      {/* Hero Header Section */}
      <JobHeroSection
        japaneseBackgroundText="春のボランティア 2022"
        categoryText="COMMUNITY OUTREACH, DOCUMENTARY & EXHIBITION"
        timeframe="JANUARY 2022"
        title="Spring Volunteer Campaign 2022 — Community & Exhibition"
        description={
          <p>
            Leading communications, documentary reportage production, children shelter visits, and the <strong className="text-[#111111] font-semibold">&ldquo;Saigon Wanderlust Chronicle&rdquo;</strong> thematic spring exhibition for <strong className="text-[#111111] font-semibold">Spring Volunteer Campaign 2022</strong>.
          </p>
        }
        tags={['Documentary Production', 'Orphanage Charity Visit', 'Exhibition Scenography', 'Community Youth Games']}
        metrics={heroMetrics}
      />

      <div className="max-w-[1440px] mx-auto px-6 space-y-24 pt-12">
        {/* ========================================================================= */}
        {/* SHOWCASE 01: ROOT GRAPHICS — INFINITE MARQUEE                             */}
        {/* ========================================================================= */}
        <section id="campaign-identity-marquee">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 01 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    FOLDER: SPRING VOLUNTEER CAMPAIGN 2022 (ROOT GRAPHICS)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Campaign Brand Identity & Exhibition Visuals
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Continuous marquee displaying official campaign cover banners, profile avatars, Saigon Wanderlust graphic series, and spring exhibition key visuals.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="320px" title="Loading Campaign Identity Marquee..." />}>
            <div className="py-2">
              <InfiniteMarquee
                items={marqueeItems}
                speed={30}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'Spring Campaign 2022 Visual',
                    category: 'Spring Campaign 2022 Branding',
                    description: 'Official campaign graphic asset for Spring Volunteer Campaign 2022.'
                  });
                }}
              />
            </div>
          </Suspense>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 02: CHILDREN COMMUNITY GAMES — INTERACTIVE STACK                  */}
        {/* ========================================================================= */}
        <section id="children-games-stack">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 02 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: CHILDREN COMMUNITY GAMES (2022.01.20)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Youth Workshop & Community Children Games
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Interactive swipeable card stack capturing outdoor interactive games, team building, and gift distribution organized for local underprivileged children. Click top card to cycle through photos.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
            {/* Left Column: Interactive Stack Component (4 Images) */}
            <div className="lg:col-span-5 flex justify-center items-center py-4">
              <Suspense fallback={<GallerySkeleton height="360px" title="Loading Interactive Card Stack..." />}>
                <div className="w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] relative flex items-center justify-center">
                  <Stack
                    cards={gameImages.slice(0, 4).map((src, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedImage({
                            src,
                            title: `Children Community Games — Stack Photo 0${i + 1}`,
                            category: 'Spring Campaign 2022 Youth Workshop',
                            description: 'Interactive outdoor games and gift giving for community children.'
                          });
                        }}
                        className="w-full h-full rounded-xl overflow-hidden border border-[#CCCCCC]/60 shadow-xl cursor-pointer bg-white"
                      >
                        <img
                          src={src}
                          alt={`Children Games Stack ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    sendToBackOnClick={true}
                    randomRotation={true}
                  />
                </div>
              </Suspense>
            </div>

            {/* Right Column: Grid of Remaining Images */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameImages.slice(4).map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImage({
                        src,
                        title: `Children Community Games — Photo 0${idx + 5}`,
                        category: 'Spring Campaign 2022 Youth Workshop',
                        description: 'Outdoor team activities and interactive games with local kids.'
                      });
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#CCCCCC]/60 shadow-sm cursor-pointer bg-[#EBEBEB]"
                  >
                    <img
                      src={src}
                      alt={`Children Games Photo ${idx + 5}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="font-narrow text-[10px] font-black text-white/80 tracking-widest uppercase">
                        PHOTO 0{idx + 5}
                      </span>
                      <p className="font-sans text-xs text-white font-medium flex items-center gap-1.5 mt-0.5">
                        <i className="fa-solid fa-magnifying-glass-plus text-[10px]"></i> Inspect Photo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 03: SHELTER CHARITY VISIT — MASONRY GRID                         */}
        {/* ========================================================================= */}
        <section id="shelter-visit-masonry">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 03 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: SHELTER & ORPHANAGE CHARITY VISIT (2022.01.23)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Shelter & Orphanage Charity Visit
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Staggered photojournalism grid documenting volunteer interaction, warm gift exchanges, and creative art workshops at local children shelters.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="550px" title="Loading Shelter Masonry Grid..." />}>
            <div className="min-h-[450px]">
              <Masonry
                items={shelterMasonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.03}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'Shelter Charity Visit',
                    category: 'Spring Campaign 2022 Orphanage Visit',
                    description: 'Volunteers spending time and hosting art workshops for children at local shelters.'
                  });
                }}
              />
            </div>
          </Suspense>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 04: REPORTAGE BEHIND THE SCENES — BOUNCE CARDS                   */}
        {/* ========================================================================= */}
        <section id="reportage-behind-scenes">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 04 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: REPORTAGE BEHIND THE SCENES (2022.01.18)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Documentary Reportage Behind-The-Scenes
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Dynamic animated card array showing camera operators, interview setups, and film crew logistics during documentary video production. Hover or click cards to inspect.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex justify-center py-6">
            <Suspense fallback={<GallerySkeleton height="400px" title="Loading Behind The Scenes Cards..." />}>
              <BounceCards
                images={reportageImages}
                containerWidth={400}
                containerHeight={400}
                animationDelay={0.2}
                animationStagger={0.08}
                enableHover={true}
                onCardClick={(idx) => {
                  setSelectedImage({
                    src: reportageImages[idx],
                    title: `Documentary Film Crew — Photo 0${idx + 1}`,
                    category: 'Spring Campaign 2022 Reportage',
                    description: 'Behind-the-scenes camera setup and interview recording during documentary production.'
                  });
                }}
              />
            </Suspense>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHOWCASE 05: PROJECT QUALITY INSPECTION — PHOTO GRID                      */}
        {/* ========================================================================= */}
        <section id="quality-inspection-grid">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 05 / 05
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    SUBFOLDER: PROJECT QUALITY INSPECTION & HANDOVER (2022.01.20)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
                  Project Quality Inspection & Community Handover
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Photo coverage documenting formal project completion inspection, volunteer team leadership, and official community handover ceremonies. Click thumbnail for full view.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {handoverImages.map((src, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage({
                    src,
                    title: `Project Quality Handover — Photo 0${idx + 1}`,
                    category: 'Spring Campaign 2022 Quality Inspection',
                    description: 'Formal quality inspection and community handover of completed volunteer works.'
                  });
                }}
                className="aspect-[16/10] rounded-xl overflow-hidden bg-white border border-[#CCCCCC]/60 shadow-sm relative group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Project Handover ${idx + 1}`}
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
