import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './common/ScrollReveal';
import HeaderNav from './common/HeaderNav';
import JobHeroSection from './common/JobHeroSection';
import GallerySkeleton from './common/GallerySkeleton';
import ImageLightboxModal from './common/ImageLightboxModal';
import type { HeroMetricCard } from '../models/jobHeroSection';
import type { LightboxImageData } from '../models/imageLightboxModal';
import type { MasonryItem } from '../models/masonry';

// Dynamic lazy imports for interactive component suites
const BounceCards = lazy(() => import('./common/BounceCards'));
const Masonry = lazy(() => import('./common/Masonry'));
const CircularGallery = lazy(() => import('./common/CircularGallery'));
const InfiniteMarquee = lazy(() => import('./common/InfiniteMarquee'));

// Vite eager glob for all drive download asset images
const rawImages = import.meta.glob<string>(
  '/assets/image/drive-download-20260722T121611Z-1-001/**/*.{webp,jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

export default function MarComAssociateJobDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

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

  // Hero Metrics
  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    {
      label: 'Open Run Participants',
      value: '600+',
      note: '3,000+ Online Users',
      icon: 'fa-solid fa-person-running'
    },
    {
      label: 'Miss & Mister OU',
      value: '100+',
      note: '1,000+ Interactions',
      icon: 'fa-solid fa-crown'
    },
    {
      label: 'Team Members',
      value: '10+',
      note: 'Supervised & Mentored',
      icon: 'fa-solid fa-users'
    },
    {
      label: 'Admission PR',
      value: '30+',
      note: 'Direct Enrollments',
      icon: 'fa-solid fa-graduation-cap'
    }
  ], []);

  // Filtered Image Sets
  const missMisterImages = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Miss & Mister OU') && path.includes('DSC0'))
      .map(path => rawImages[path]);
  }, []);

  const missMisterOrganizers = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Miss & Mister OU') && path.includes('Organizer'))
      .map((path, idx) => ({
        id: `organizer-${idx}`,
        img: rawImages[path],
        title: `Organizing Team ${idx + 1}`,
        category: 'Event Operations & Backstage'
      }));
  }, []);

  const openRunPhotos: MasonryItem[] = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('The Open Run 2025') && path.includes('Photo'))
      .map((path, idx) => ({
        id: `openrun-photo-${idx}`,
        img: rawImages[path],
        height: [380, 480, 360, 520, 420, 460][idx % 6],
        title: `The Open Run 2025 Moment ${idx + 1}`,
        subtitle: 'Marathon & Community Event'
      }));
  }, []);

  const openRunMarqueeDesigns = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('The Open Run 2025') && path.includes('Design'))
      .map((path, idx) => ({
        id: `openrun-design-${idx}`,
        img: rawImages[path],
        title: path.split('/').pop()?.split('.')[0] || `Design Visual ${idx + 1}`,
        subtitle: 'The Open Run 2025 Collateral'
      }));
  }, []);

  const circularGalleryImages = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('International Admission Campaign 2026') && !path.includes('.txt'))
      .map((path, idx) => ({
        image: rawImages[path],
        text: `Admission Visual ${idx + 1}`
      }));
  }, []);

  const admissionBrochures = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Brochure of International Admission'))
      .map((path, idx) => ({
        id: `brochure-${idx}`,
        img: rawImages[path],
        title: `International Admission Brochure Mockup ${idx + 1}`,
        category: 'Brochure Design'
      }));
  }, []);

  const admissionPosters = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('International Admission Campaign 2026') && !path.includes('.txt'))
      .map((path, idx) => {
        const name = path.split('/').pop()?.split('.')[0] || `Poster ${idx + 1}`;
        return {
          id: `poster-${idx}`,
          img: rawImages[path],
          title: name,
          category: 'Campaign Poster & Media'
        };
      });
  }, []);

  const admissionLeaflets = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Leaflet Credit-tranfer Program Admission 2026'))
      .map((path, idx) => ({
        id: `leaflet-${idx}`,
        img: rawImages[path],
        title: `Credit-Transfer Program Leaflet ${idx + 1}`,
        category: 'Leaflet Mockup'
      }));
  }, []);

  const bounceTransformStyles = useMemo(() => [
    'rotate(12deg) translate(-220px)',
    'rotate(7deg) translate(-150px)',
    'rotate(3deg) translate(-75px)',
    'rotate(-2deg)',
    'rotate(-7deg) translate(75px)',
    'rotate(-12deg) translate(150px)',
    'rotate(5deg) translate(220px)'
  ], []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* 1. Reusable Sticky Header */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="CASE STUDY 03 / 04"
        badgeText="OU NEWS & MARCOM"
      />

      {/* 2. Reusable Hero Overview */}
      <JobHeroSection
        japaneseBackgroundText="広報チームリーダー"
        categoryText="ROLE & TEAM LEADERSHIP"
        timeframe="Q1/2021 — PRESENT"
        title="Freelance MarCom Associate | Team Leader Assistant"
        description={
          <p>
            Leading multi-channel marketing communication strategies, event visual identity, and team operations for OU NEWS at Ho Chi Minh City Open University. Directed visual assets, media coverage, livestream broadcasting, and student collaborator workflows for major campus campaigns including <strong className="text-[#111111] font-semibold">The Open Run 2025</strong> and <strong className="text-[#111111] font-semibold">Miss & Mister OU 2025</strong>.
          </p>
        }
        metrics={heroMetrics}
      />

      {/* Core Competencies & Deliverables Bar */}
      <section className="py-12 bg-white border-b border-[#CCCCCC]/40">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#111111]"></span>
              <span className="font-narrow text-sm font-bold uppercase tracking-[0.2em] text-[#111111]">
                CORE STRATEGIC RESPONSIBILITIES
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'MarCom Strategy',
                'Press Releases',
                'Event Visual Identity',
                'Workflow SOPs',
                'Livestream Operations',
                'KOL Collaboration',
                'Team Mentorship'
              ].map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-xs bg-[#FAF9F6] border border-[#CCCCCC]/60 text-[#111111] px-3.5 py-1.5 rounded font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: MISS & MISTER OU 2025 */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  CAMPAIGN 01
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                  BEAUTY & TALENT COMPETITION
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#111111]">
                Miss & Mister OU 2025 — Visual Identity & Backstage
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Supervised student team of 10+ members during photo sessions, stage rehearsals, and live broadcasting. Below is an interactive GSAP Bounce Cards showcase featuring 7 hero moments. Click any card to expand details.
              </p>
            </div>
          </ScrollReveal>

          {/* Integrated BounceCards */}
          <div className="my-16 flex justify-center overflow-hidden py-10">
            <Suspense fallback={<GallerySkeleton height="450px" title="Loading Interactive Bounce Cards..." />}>
              <BounceCards
                images={missMisterImages.slice(0, 7)}
                containerWidth={600}
                containerHeight={550}
                transformStyles={bounceTransformStyles}
                enableHover={true}
                onCardClick={(index) => {
                  setSelectedImage({
                    src: missMisterImages[index],
                    title: `Miss & Mister OU 2025 Moment ${index + 1}`,
                    category: 'Event Photography & Backstage',
                    description: 'Directing photography coverage, contestant posing, and main stage lighting.'
                  });
                }}
              />
            </Suspense>
          </div>

          {/* Organizing Committee Gallery Grid */}
          {missMisterOrganizers.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#CCCCCC]/40">
              <h3 className="font-narrow text-xs font-bold uppercase tracking-[0.2em] text-[#5E5E5E] mb-6">
                ORGANIZING COMMITTEE & OPERATIONS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {missMisterOrganizers.map(item => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-[#CCCCCC]/50 bg-white cursor-pointer shadow-sm hover:shadow-md transition-all"
                    onClick={() => setSelectedImage({
                      src: item.img,
                      title: item.title,
                      category: item.category,
                      description: 'On-site event coordination and backstage team management.'
                    })}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#EBEBEB]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                        {item.title}
                      </span>
                      <i className="fa-solid fa-expand text-xs text-[#5E5E5E] group-hover:text-[#111111]"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: THE OPEN RUN 2025 PHOTOGRAPHY */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  CAMPAIGN 02
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                  ANNUAL MARATHON & COMMUNITY EVENT
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#111111]">
                The Open Run 2025 — Photography
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Capturing the energy of 600+ runners, sponsors, guests, and award ceremonies. Below is an interactive GSAP Masonry grid displaying 24 curated event moments. Click any image to view full resolution.
              </p>
            </div>
          </ScrollReveal>

          {/* Integrated Masonry Component */}
          <div className="my-8">
            <Suspense fallback={<GallerySkeleton height="600px" title="Loading Event Photography Masonry Grid..." />}>
              <Masonry
                items={openRunPhotos}
                ease="power3.out"
                duration={0.4}
                stagger={0.01}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.97}
                blurToFocus={true}
                colorShiftOnHover={false}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'The Open Run 2025 Event Moment',
                    category: 'Event Photography',
                    description: 'Official photography coverage for The Open Run 2025.'
                  });
                }}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* SECTION 3: CAMPAIGN COLLATERAL */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-[#F4F3EF] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 mb-10">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  FULL COLLATERAL SUITE
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                  INFINITE HORIZONTAL MARQUEE
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#111111]">
                Open Run 2025 — Campaign Design
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Comprehensive suite of promotional graphics including elevator LED screens, sponsor acknowledgment boards, contestant invitation cards, cheering banners, and official thank you letters.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Integrated InfiniteMarquee Component */}
        <Suspense fallback={<GallerySkeleton height="280px" title="Loading Campaign Marquee..." />}>
          <InfiniteMarquee
            items={openRunMarqueeDesigns}
            speed={40}
            onItemClick={(item) => {
              setSelectedImage({
                src: item.img,
                title: item.title || 'Campaign Visual',
                category: 'Collateral & Graphic Design',
                description: 'Promotional and print marketing material for The Open Run 2025.'
              });
            }}
          />
        </Suspense>
      </section>

      {/* SECTION 4: ADMISSION PR & BROCHURES */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-16 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  CAMPAIGN 03
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                  STUDENT RECRUITMENT & ADMISSION
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#111111]">
                International Admission 2026 — PR Campaign
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Visual identity and publication design for international credit-transfer programs. Below features an interactive 3D Circular Gallery followed by print mockups.
              </p>
            </div>
          </ScrollReveal>

          {/* Integrated 3D Circular Gallery */}
          {circularGalleryImages.length > 0 && (
            <div className="mb-20 rounded-2xl bg-[#0F0F0F] p-4 border border-[#333333] shadow-2xl">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
                <span className="font-narrow text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  3D CIRCULAR INTERACTIVE CAROUSEL
                </span>
                <span className="font-mono text-xs text-white/50">DRAG HORIZONTALLY TO ROTATE</span>
              </div>
              <Suspense fallback={<GallerySkeleton height="500px" title="Loading 3D Circular Gallery..." />}>
                <div style={{ height: '520px', position: 'relative' }}>
                  <CircularGallery
                    items={circularGalleryImages}
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                  />
                </div>
              </Suspense>
            </div>
          )}

          {/* Admission Brochure & Poster Mockups */}
          <div className="space-y-16 pt-8 border-t border-[#CCCCCC]/40">
            <div>
              <h3 className="font-narrow text-xs font-bold uppercase tracking-[0.2em] text-[#5E5E5E] mb-6">
                OFFICIAL ADMISSION BROCHURES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {admissionBrochures.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-[#CCCCCC]/50 bg-[#FAF9F6] cursor-pointer shadow-sm hover:shadow-md transition-all"
                    onClick={() => setSelectedImage({
                      src: item.img,
                      title: item.title,
                      category: item.category,
                      description: 'Official International Admission 2026 Brochure layout and print proof.'
                    })}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-white">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white border-t border-[#CCCCCC]/30">
                      <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                        {item.title}
                      </span>
                      <i className="fa-solid fa-expand text-xs text-[#5E5E5E] group-hover:text-[#111111]"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Media Posters */}
            <div>
              <h3 className="font-narrow text-xs font-bold uppercase tracking-[0.2em] text-[#5E5E5E] mb-6">
                DIGITAL MEDIA & PROMOTIONAL POSTERS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {admissionPosters.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-[#CCCCCC]/50 bg-[#FAF9F6] cursor-pointer shadow-sm hover:shadow-md transition-all"
                    onClick={() => setSelectedImage({
                      src: item.img,
                      title: item.title,
                      category: item.category,
                      description: 'Digital promotional poster deployed across social channels.'
                    })}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-white">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between bg-white border-t border-[#CCCCCC]/30">
                      <span className="font-narrow text-[11px] font-bold text-[#111111] uppercase tracking-wider truncate">
                        {item.title}
                      </span>
                      <i className="fa-solid fa-expand text-[10px] text-[#5E5E5E]"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Transfer Leaflets */}
            {admissionLeaflets.length > 0 && (
              <div>
                <h3 className="font-narrow text-xs font-bold uppercase tracking-[0.2em] text-[#5E5E5E] mb-6">
                  PROGRAM LEAFLET MOCKUPS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {admissionLeaflets.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-lg border border-[#CCCCCC]/50 bg-[#FAF9F6] cursor-pointer shadow-sm hover:shadow-md transition-all"
                      onClick={() => setSelectedImage({
                        src: item.img,
                        title: item.title,
                        category: item.category,
                        description: 'Detailed curriculum and credit transfer pathway leaflet.'
                      })}
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-white">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white border-t border-[#CCCCCC]/30">
                        <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                          {item.title}
                        </span>
                        <i className="fa-solid fa-expand text-xs text-[#5E5E5E] group-hover:text-[#111111]"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Return & Next Case Navigation */}
      <footer className="py-16 bg-[#111111] border-t border-white/10 text-white">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-narrow text-xs font-black tracking-[0.25em] text-white/50 uppercase block">
              NEXT CASE STUDY
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Public Relations Practitioner Intern
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('/experience/school-advanced-study-pr')}
              className="px-8 py-4 bg-white text-[#111111] hover:bg-white/90 transition-all font-narrow text-xs uppercase tracking-[0.25em] font-bold rounded-full flex items-center gap-3 shadow-lg group cursor-pointer"
            >
              <span>View Next Case Study</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>

            <button
              onClick={handleNavigateHome}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#111111] transition-all font-narrow text-xs uppercase tracking-[0.25em] font-bold rounded-full flex items-center gap-3 shadow-lg group cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
              <span>Return to All Experiences</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Reusable Interactive Lightbox Modal */}
      <ImageLightboxModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
