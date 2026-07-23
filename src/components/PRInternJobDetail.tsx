import { useState, useMemo, useCallback, lazy, Suspense, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './common/ScrollReveal';
import HeaderNav from './common/HeaderNav';
import JobHeroSection from './common/JobHeroSection';
import GallerySkeleton from './common/GallerySkeleton';
import ImageLightboxModal from './common/ImageLightboxModal';
import BounceCards from './common/BounceCards';
import type { HeroMetricCard } from '../models/jobHeroSection';
import type { LightboxImageData } from '../models/imageLightboxModal';
import type { MasonryItem } from '../models/masonry';
import type { MarqueeItem } from '../models/infiniteMarquee';

// Dynamic lazy imports for heavy 3D component suites
const Masonry = lazy(() => import('./common/Masonry'));
const DomeGallery = lazy(() => import('./common/DomeGallery'));
const InfiniteMarquee = lazy(() => import('./common/InfiniteMarquee'));

// Vite eager glob for all assets under /assets/image/PRIntern
const prRawImages = import.meta.glob<string>(
  '/assets/image/PRIntern/**/*.{jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

// Helper function to extract images matching subfolder paths
const getImagesForPath = (pathSubstr: string): string[] => {
  const normalizedSearch = pathSubstr.replace(/\\/g, '/').toLowerCase();
  return Object.keys(prRawImages)
    .filter((key) => key.replace(/\\/g, '/').toLowerCase().includes(normalizedSearch))
    .map((key) => prRawImages[key]);
};

// Impact & Key Responsibilities Summary Component
const KeyResponsibilitiesSection = memo(function KeyResponsibilitiesSection() {
  return (
    <section className="py-12 bg-white border-b border-[#CCCCCC]/40">
      <div className="max-w-[1440px] mx-auto px-6">
        <ScrollReveal direction="up" distance={20}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#CCCCCC]/40 rounded-lg">
              <div className="w-10 h-10 rounded bg-[#111111] text-white flex items-center justify-center mb-4">
                <i className="fa-solid fa-bullhorn text-sm"></i>
              </div>
              <h3 className="font-display text-xl uppercase text-[#111111]">PR & Student Recruitment</h3>
              <p className="font-sans text-sm text-[#5E5E5E] leading-relaxed">
                Designed and deployed multi-channel recruitment communication campaigns targeting prospective students for 4 international credit-transfer programs (Flinders University, USW, Bond University, UniSQ).
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#CCCCCC]/40 rounded-lg">
              <div className="w-10 h-10 rounded bg-[#111111] text-white flex items-center justify-center mb-4">
                <i className="fa-solid fa-handshake text-sm"></i>
              </div>
              <h3 className="font-display text-xl uppercase text-[#111111]">Corporate & MOU Relations</h3>
              <p className="font-sans text-sm text-[#5E5E5E] leading-relaxed">
                Coordinated end-to-end press release workflows, guest invitations, and event management for MOU signing ceremonies with premier enterprises: BE Group, LPBank, Miraways, and WESET English Center.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#CCCCCC]/40 rounded-lg">
              <div className="w-10 h-10 rounded bg-[#111111] text-white flex items-center justify-center mb-4">
                <i className="fa-solid fa-language text-sm"></i>
              </div>
              <h3 className="font-display text-xl uppercase text-[#111111]">Bilingual PR Asset Production</h3>
              <p className="font-sans text-sm text-[#5E5E5E] leading-relaxed">
                Translated and edited English/Vietnamese press kits, official speeches, brochure materials, standees, and LED background key visuals for international delegation visits and orientation days.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default function PRInternJobDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Filter image arrays using path substrings
  const mouImages = useMemo(() => getImagesForPath('2024.03.28 MOU signing'), []);
  const tuyenSinhDomeImages = useMemo(() => getImagesForPath('Ảnh tuyển sinh chương trình liên kết'), []);
  const creditDesignImages = useMemo(() => getImagesForPath('Creadit-transfer Program/DESIGN'), []);
  const creditHighlightImages = useMemo(() => getImagesForPath('Creadit-transfer Program/Highlight event photos'), []);
  const flindersImages = useMemo(() => getImagesForPath('2024.09.18 Flinders x OU'), []);
  const standeeImages = useMemo(() => getImagesForPath('Standee tuyển sinh'), []);

  // Hero Section Metrics
  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    {
      label: 'Converted Enrollments',
      value: '30+',
      note: 'From 70+ prospects',
      icon: 'fa-solid fa-user-check'
    },
    {
      label: 'Global Programs',
      value: '4',
      note: 'UK & Australia partners',
      icon: 'fa-solid fa-globe'
    },
    {
      label: 'Corporate Partners',
      value: '10+',
      note: 'MOU & Ed partners',
      icon: 'fa-solid fa-handshake'
    },
    {
      label: 'Asset Deliverables',
      value: '70+',
      note: 'Designs & Event Photos',
      icon: 'fa-solid fa-layer-group'
    }
  ], []);

  // Format Masonry items for MOU Signing Ceremony
  const mouMasonryItems: MasonryItem[] = useMemo(() => {
    return mouImages.map((img, idx) => ({
      id: `mou-${idx}`,
      img,
      height: [420, 360, 480, 390, 510, 440][idx % 6],
      title: `MOU Ceremony Photo 0${idx + 1}`,
      subtitle: 'BE Group • LPBank • Miraways • WESET'
    }));
  }, [mouImages]);

  // Format Marquee items for Credit-Transfer Program LED designs
  const creditDesignMarqueeItems: MarqueeItem[] = useMemo(() => {
    return creditDesignImages.map((img, idx) => ({
      id: `design-${idx}`,
      img,
      title: `LED Key Visual 0${idx + 1}`,
      subtitle: 'International Program Stage Graphic'
    }));
  }, [creditDesignImages]);

  // Format Masonry items for Credit-Transfer Highlight Event Photos
  const creditHighlightMasonryItems: MasonryItem[] = useMemo(() => {
    return creditHighlightImages.map((img, idx) => ({
      id: `highlight-${idx}`,
      img,
      height: [400, 460, 380, 500, 420, 450][idx % 6],
      title: `Credit-Transfer Event Highlight 0${idx + 1}`,
      subtitle: 'Student Workshop & Program Launch'
    }));
  }, [creditHighlightImages]);

  // Navigation handlers
  const handleNavigateHome = useCallback(() => {
    const savedPos = sessionStorage.getItem('portfolio_home_scroll_pos');
    sessionStorage.setItem('portfolio_from_detail', 'true');
    navigate('/');
    if (savedPos) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPos, 10));
      }, 50);
    }
  }, [navigate]);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMasonryClick = useCallback((item: MasonryItem) => {
    setSelectedImage({
      src: item.img,
      title: item.title || 'MOU & Campaign Event Asset',
      category: 'PR & Corporate Relations',
      description: item.subtitle || 'Official photography asset produced during the PR Practitioner Internship.'
    });
  }, []);

  const handleMarqueeClick = useCallback((item: MarqueeItem) => {
    setSelectedImage({
      src: item.img,
      title: item.title || 'Key Visual & LED Design',
      category: 'Creative Design & Key Visual',
      description: 'Stage LED background graphic designed for credit-transfer program events.'
    });
  }, []);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* 1. Reusable Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="CASE STUDY 04 / 04"
        badgeText="PR & RECRUITMENT INTERN"
      />

      {/* 2. Reusable Hero Section */}
      <JobHeroSection
        japaneseBackgroundText="広報インターン"
        categoryText="CORPORATE PARTNERSHIPS & STUDENT RECRUITMENT"
        timeframe="Q3/2023 — Q4/2023"
        title="Public Relations Practitioner Intern"
        description={
          <p>
            Spearheaded public relations, student recruitment campaigns, and strategic corporate partnership agreements for the <strong className="text-[#111111] font-semibold">School of Advanced Study at Ho Chi Minh City Open University</strong>. Successfully converted <strong className="text-[#111111] font-semibold">30+ enrollments</strong> across 4 global credit-transfer programs and facilitated MOU signings with leading enterprises including <strong className="text-[#111111] font-semibold">BE Group, LPBank, Miraways, and WESET</strong>.
          </p>
        }
        tags={['PR & Recruitment', 'MOU Partnership Signings', 'Enrollment Conversion', 'Credit-Transfer Programs', 'Bilingual Translation']}
        metrics={heroMetrics}
      />

      {/* 3. Key Responsibilities & Deliverables */}
      <KeyResponsibilitiesSection />

      {/* 4. MAIN PROJECT VISUAL SHOWCASES */}
      <div className="max-w-[1440px] mx-auto px-6 pt-16 space-y-24">

        {/* SECTION 1: MOU SIGNING CEREMONY - MASONRY */}
        <section id="mou-signing-ceremony">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 01 / 06
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    MARCH 28, 2024
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  MOU Signing Ceremony with BE Group, LPBank, Miraways & WESET
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed">
                  Coordinated corporate communications, press distribution, guest hospitality, and media coverage for the landmark MOU partnership signing between Ho Chi Minh City Open University and leading enterprise partners.
                </p>
              </div>

              {/* Official News Links */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://ou.edu.vn/tin_tuc/le-ky-ket-thoa-thuan-hop-tac-giua-truong-dai-hoc-mo-thanh-pho-ho-chi-minh-va-cac-doanh-nghiep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#111111] text-white text-xs font-narrow font-bold uppercase tracking-wider rounded hover:bg-[#333333] transition-all flex items-center gap-2 shadow-sm"
                >
                  <i className="fa-solid fa-newspaper text-xs"></i>
                  <span>Read News Article</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70"></i>
                </a>

                <a
                  href="https://www.facebook.com/share/p/1BUwERNgog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white border border-[#CCCCCC]/80 text-[#111111] text-xs font-narrow font-bold uppercase tracking-wider rounded hover:border-[#111111] transition-all flex items-center gap-2 shadow-sm"
                >
                  <i className="fa-brands fa-facebook text-xs text-[#1877F2]"></i>
                  <span>BE x HCMCOU Social Post</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70"></i>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="550px" title="Loading MOU Ceremony Masonry..." />}>
            <div className="min-h-[500px]">
              <Masonry
                items={mouMasonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.03}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                onItemClick={handleMasonryClick}
              />
            </div>
          </Suspense>
        </section>

        {/* SECTION 2: INTERNATIONAL PROGRAM RECRUITMENT - DOME GALLERY */}
        <section id="joint-program-recruitment">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  SHOWCASE 02 / 06
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                  STUDENT RECRUITMENT & PR
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                International Credit-Transfer Program Recruitment Visuals
              </h2>
              <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                Interactive sphere dome gallery displaying campaign visuals, prospective student engagement, and recruitment drives across international partner programs. Drag to rotate and explore tiles.
              </p>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="600px" title="Loading Interactive Dome Gallery..." />}>
            <div className="w-full h-[600px] sm:h-[700px] overflow-hidden rounded-xl bg-[#0A0A0A]">
              <DomeGallery
                images={tuyenSinhDomeImages}
                fit={0.8}
                minRadius={320}
                maxRadius={800}
                segments={30}
                grayscale={false}
              />
            </div>
          </Suspense>
        </section>

        {/* SECTION 3: CREDIT-TRANSFER PROGRAM STAGE & LED DESIGNS - MARQUEE */}
        <section id="credit-transfer-designs">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 03 / 06
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    STAGE GRAPHICS & KEY VISUALS
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
                  Credit-Transfer Program LED & Key Visual Designs
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#5E5E5E] uppercase tracking-widest bg-white border border-[#CCCCCC]/60 px-3 py-1.5 rounded">
                INFINITE SCROLLING MARQUEE
              </span>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="320px" title="Loading Infinite Marquee..." />}>
            <div className="py-4 bg-[#111111] rounded-2xl border border-[#111111] overflow-hidden shadow-lg">
              <InfiniteMarquee
                items={creditDesignMarqueeItems}
                speed={30}
                onItemClick={handleMarqueeClick}
              />
            </div>
          </Suspense>
        </section>

        {/* SECTION 4: CREDIT-TRANSFER PROGRAM HIGHLIGHT EVENT PHOTOS - MASONRY */}
        <section id="credit-transfer-event-photos">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 04 / 06
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    EVENT DOCUMENTATION
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Credit-Transfer Program Highlight Event Photos
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  On-site photography coverage capturing academic orientation, student orientation workshops, faculty speeches, and partner interaction sessions.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[#5E5E5E] uppercase tracking-widest bg-white border border-[#CCCCCC]/60 px-3 py-1.5 rounded">
                {creditHighlightImages.length} EVENT PHOTOS
              </span>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="550px" title="Loading Event Photos Masonry..." />}>
            <div className="min-h-[500px]">
              <Masonry
                items={creditHighlightMasonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.03}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                onItemClick={handleMasonryClick}
              />
            </div>
          </Suspense>
        </section>

        {/* SECTION 5: FLINDERS X OU COLLABORATION (2024.09.18) */}
        <section id="flinders-ou-collaboration">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 05 / 06
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    AUSTRALIA PARTNER DELEGATION
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Flinders University x OU Partnership Exchange
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Bilingual coordination, student welcome, and executive photojournalism for the visiting academic delegation from Flinders University (Australia).
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center py-6 bg-white border border-[#CCCCCC]/50 rounded-xl shadow-sm p-4">
              <BounceCards
                images={flindersImages.slice(0, 5)}
                containerWidth={340}
                containerHeight={340}
                animationStagger={0.08}
                onCardClick={(idx) => {
                  setSelectedImage({
                    src: flindersImages[idx],
                    title: `Flinders x OU Delegation — Photo 0${idx + 1}`,
                    category: 'Flinders University (Australia) Exchange',
                    description: 'Academic exchange meeting and student interaction between Flinders University delegation and School of Advanced Study.'
                  });
                }}
              />
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {flindersImages.map((src, fIdx) => (
                  <div
                    key={fIdx}
                    onClick={() => {
                      setSelectedImage({
                        src,
                        title: `Flinders x OU Photo 0${fIdx + 1}`,
                        category: 'Flinders University Exchange',
                        description: 'Official exchange event photograph between HCMC Open University and Flinders University.'
                      });
                    }}
                    className="aspect-square rounded-lg overflow-hidden bg-[#FAF9F6] border border-[#CCCCCC]/60 relative group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={`Flinders ${fIdx + 1}`}
                      loading={fIdx < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <i className="fa-solid fa-magnifying-glass-plus text-white text-base"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: RECRUITMENT STANDEE DESIGNS */}
        <section id="recruitment-standees">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 06 / 06
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    COLLATERAL DESIGNS
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter text-[#111111]">
                  International Credit-Transfer Recruitment Standees
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  High-format promotional standee graphics created for student recruitment fairs showcasing partner university pathways (Bond University, Flinders University, University of South Wales, University of Southern Queensland).
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standeeImages.map((src, sIdx) => {
              const titles = [
                'Bond University (Australia)',
                'Flinders University (Australia)',
                'University of South Wales (UK)',
                'UniSQ — University of Southern Queensland'
              ];
              const titleName = titles[sIdx] || `Standee Design 0${sIdx + 1}`;

              return (
                <div
                  key={sIdx}
                  onClick={() => {
                    setSelectedImage({
                      src,
                      title: titleName,
                      category: 'Recruitment Standee Collateral',
                      description: `High-resolution recruitment banner for ${titleName} credit-transfer pathway.`
                    });
                  }}
                  className="bg-white border border-[#CCCCCC]/60 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#111111] transition-all group cursor-pointer flex flex-col"
                >
                  <div className="aspect-[9/16] w-full rounded-lg overflow-hidden bg-[#FAF9F6] border border-[#CCCCCC]/40 relative mb-4">
                    <img
                      src={src}
                      alt={titleName}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-narrow font-bold uppercase tracking-wider bg-black/70 px-3 py-1.5 rounded flex items-center gap-2">
                        <i className="fa-solid fa-magnifying-glass-plus text-xs"></i> View Full Standee
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-1">
                    <span className="font-mono text-[10px] text-[#5E5E5E] uppercase tracking-wider block">
                      STANDEE 0{sIdx + 1}
                    </span>
                    <h4 className="font-narrow text-sm font-bold uppercase text-[#111111] group-hover:text-[#5E5E5E] transition-colors">
                      {titleName}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* 5. Bottom Navigation & CTA */}
      <ScrollReveal direction="up" distance={20}>
        <section className="max-w-[1440px] mx-auto px-6 pt-20 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-[#CCCCCC]/40 mt-24">
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

      {/* 6. Reusable Lightbox Modal */}
      <ImageLightboxModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
