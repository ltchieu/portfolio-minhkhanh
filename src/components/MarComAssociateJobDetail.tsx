import { useState, useMemo, useCallback, lazy, Suspense, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './common/ScrollReveal';

// Dynamic lazy imports for interactive component suites
const BounceCards = lazy(() => import('./common/BounceCards'));
const Masonry = lazy(() => import('./common/Masonry'));
const CircularGallery = lazy(() => import('./common/CircularGallery'));
const InfiniteMarquee = lazy(() => import('./common/InfiniteMarquee'));

// Vite eager glob for all drive download asset images
const rawImages = import.meta.glob<string>(
  '/assets/image/drive-download-20260722T121611Z-1-001/**/*.{jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

// Component Skeleton for Suspense boundaries
function GallerySkeleton({ height = '450px', title = 'Loading Visuals...' }: { height?: string; title?: string }) {
  return (
    <div
      style={{ height }}
      className="w-full bg-[#1A1A1A] animate-pulse rounded-xl flex flex-col items-center justify-center border border-white/10 p-6 text-center"
    >
      <div className="flex items-center gap-3 text-white/60 text-xs font-mono">
        <i className="fa-solid fa-spinner fa-spin text-base"></i>
        <span>{title}</span>
      </div>
    </div>
  );
}

// 1. Header Navigation Component
const HeaderNav = memo(function HeaderNav({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#CCCCCC]/40">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-3 font-narrow text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:text-[#5E5E5E] transition-colors"
          aria-label="Return to main portfolio"
        >
          <span className="w-8 h-8 rounded-full border border-[#CCCCCC] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </span>
          <span>Return to Portfolio</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-[0.25em] uppercase hidden sm:inline-block">
            CASE STUDY 03 / 04
          </span>
          <span className="h-4 w-[1px] bg-[#CCCCCC] hidden sm:block"></span>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-[#111111] text-white rounded">
            OU NEWS & MARCOM
          </span>
        </div>
      </div>
    </header>
  );
});

// 2. Hero Section Component
const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 border-b border-[#CCCCCC]/40 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#F4F3EF] to-[#FAF9F6]">
      <div className="absolute right-8 top-12 select-none pointer-events-none opacity-5 font-display text-8xl md:text-9xl text-[#111111] writing-vertical hidden lg:block tracking-widest">
        広報チームリーダー
      </div>

      <div className="max-w-[1440px] mx-auto px-6">
        <ScrollReveal direction="up" distance={30}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block">
                  ROLE & TEAM LEADERSHIP
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                  Q1/2021 — PRESENT
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-[#111111] leading-[1.05]">
                Freelance MarCom Associate | Team Leader Assistant
              </h1>

              <p className="font-sans text-lg sm:text-xl text-[#5E5E5E] max-w-3xl leading-relaxed">
                Leading multi-channel marketing communication strategies, event visual identity, and team operations for OU NEWS at Ho Chi Minh City Open University. Directed visual assets, media coverage, livestream broadcasting, and student collaborator workflows for major campus campaigns including <strong className="text-[#111111] font-semibold">The Open Run 2025</strong> and <strong className="text-[#111111] font-semibold">Miss & Mister OU 2025</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Open Run Participants
                  </span>
                  <i className="fa-solid fa-person-running text-xs text-[#111111]"></i>
                </div>
                <div className="font-display text-3xl text-[#111111]">600+</div>
                <div className="font-mono text-[10px] text-[#5E5E5E] mt-1">3,000+ Online Users</div>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Miss & Mister OU
                  </span>
                  <i className="fa-solid fa-crown text-xs text-[#111111]"></i>
                </div>
                <div className="font-display text-3xl text-[#111111]">100+</div>
                <div className="font-mono text-[10px] text-[#5E5E5E] mt-1">1,000+ Interactions</div>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Team Members
                  </span>
                  <i className="fa-solid fa-users text-xs text-[#111111]"></i>
                </div>
                <div className="font-display text-3xl text-[#111111]">10+</div>
                <div className="font-mono text-[10px] text-[#5E5E5E] mt-1">Supervised & Mentored</div>
              </div>

              <div className="bg-white border border-[#CCCCCC]/50 p-5 rounded shadow-sm hover:border-[#111111] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-narrow text-xs font-bold text-[#5E5E5E] uppercase tracking-wider">
                    Admission PR
                  </span>
                  <i className="fa-solid fa-graduation-cap text-xs text-[#111111]"></i>
                </div>
                <div className="font-display text-3xl text-[#111111]">30+</div>
                <div className="font-mono text-[10px] text-[#5E5E5E] mt-1">Direct Enrollments</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default function MarComAssociateJobDetail() {
  const navigate = useNavigate();

  // Selected image state for interactive Lightbox modal
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    category: string;
    description?: string;
  } | null>(null);

  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // 1. Process Miss & Mister OU DSC photos for <BounceCards />
  const missMisterDscImages = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Miss & Mister OU') && /\/DSC[0-9]+\.JPG$/i.test(path))
      .map(path => rawImages[path]);
  }, []);

  // Organizers photos for Miss & Mister OU
  const missMisterOrganizers = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Miss & Mister OU') && path.includes('Organizer'))
      .map((path, idx) => ({
        id: `organizer-${idx}`,
        img: rawImages[path],
        title: `Organizing Team Snapshot ${idx + 1}`,
        category: 'Miss & Mister OU 2025'
      }));
  }, []);

  // 2. Process The Open Run 2025 Photography for <Masonry />
  const openRunPhotos = useMemo(() => {
    const paths = Object.keys(rawImages).filter(path => path.includes('The Open Run 2025/Photography'));
    return paths.map((path, idx) => {
      const fileName = path.split('/').pop() || `photo-${idx}`;
      // Dynamic height calculations to give natural masonry variation
      const heights = [380, 480, 520, 420, 600, 340, 460];
      const height = heights[idx % heights.length];
      return {
        id: `openrun-photo-${idx}`,
        img: rawImages[path],
        height,
        title: `Event Photo: ${fileName.split('.')[0]}`,
        subtitle: 'The Open Run 2025 Photography'
      };
    });
  }, []);

  // 3. Process The Open Run 2025 Design for <CircularGallery />
  const openRunImportantDesigns = useMemo(() => {
    const importantKeys = [
      { key: '6m5x3m3 backdrop', text: 'Main Stage Backdrop' },
      { key: 'FB Cover', text: 'Facebook Cover & Key Visual' },
      { key: 'Huy chuong Ao', text: 'Shirt & Medal Design' },
      { key: 'Lo trinh', text: '5K/10K Race Route Map' },
      { key: 'Qua tang', text: 'Runner Gift Kit' },
      { key: 'Banner web', text: 'Web Header Banner' },
      { key: '1x6m xuat phat', text: 'Start/Finish Arch' }
    ];

    const results: { image: string; text: string }[] = [];
    importantKeys.forEach(item => {
      const matchKey = Object.keys(rawImages).find(
        p => p.includes('The Open Run 2025/Design') && p.toLowerCase().includes(item.key.toLowerCase())
      );
      if (matchKey) {
        results.push({
          image: rawImages[matchKey],
          text: item.text
        });
      }
    });
    return results;
  }, []);

  // 4. Process rest of The Open Run 2025 Design for <InfiniteMarquee />
  const openRunMarqueeDesigns = useMemo(() => {
    const importantNames = ['6m5x3m3 backdrop', 'fb cover', 'huy chuong ao', 'lo trinh', 'qua tang', 'banner web', '1x6m xuat phat'];
    return Object.keys(rawImages)
      .filter(path => {
        if (!path.includes('The Open Run 2025/Design')) return false;
        const lower = path.toLowerCase();
        return !importantNames.some(name => lower.includes(name));
      })
      .map((path, idx) => {
        const rawName = path.split('/').pop()?.split('.')[0] || `Design ${idx + 1}`;
        return {
          id: `marquee-design-${idx}`,
          img: rawImages[path],
          title: rawName.replace(/_/g, ' '),
          subtitle: 'Open Run Collateral Design'
        };
      });
  }, []);

  // 5. Process International Admission Brochures, Posters, and Leaflets
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

  // Transform styles custom angles for 7 DSC BounceCards
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
      {/* Sticky Header */}
      <HeaderNav onNavigateHome={handleNavigateHome} />

      {/* Hero Overview */}
      <HeroSection />

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
                  className="font-mono text-xs px-3.5 py-1.5 bg-[#EBEBEB] border border-[#CCCCCC]/60 rounded text-[#111111] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: MISS & MISTER OU 2025 (Featuring <BounceCards />) */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-gradient-to-b from-white to-[#F7F6F2]">
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
                Miss & Mister OU 2025
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Coordinated communication, contestant highlights, and photography execution for the annual flagship university pageant (100+ registered applicants, 1,000+ online interactions). Hover over the dynamic card stack below to inspect high-impact stage and contestant photography.
              </p>
            </div>
          </ScrollReveal>

          {/* Integrated <BounceCards /> Component */}
          <div className="my-16 flex flex-col items-center justify-center relative">
            <div className="bg-[#111111] text-white px-5 py-2 rounded-full font-narrow text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-md flex items-center gap-2">
              <i className="fa-solid fa-hand-pointer text-xs"></i>
              <span>Hover & Click Cards to Expand Photography</span>
            </div>

            <Suspense fallback={<GallerySkeleton height="400px" title="Loading Miss & Mister OU Bounce Cards..." />}>
              <BounceCards
                className="mx-auto"
                images={missMisterDscImages}
                containerWidth={650}
                containerHeight={380}
                animationDelay={0.3}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={bounceTransformStyles}
                enableHover={true}
                onCardClick={(index) => {
                  setSelectedImage({
                    src: missMisterDscImages[index],
                    title: `Miss & Mister OU 2025 - Snapshot ${index + 1}`,
                    category: 'Stage Photography',
                    description: 'High-resolution stage performance and contestant highlight photography.'
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
                      <i className="fa-solid fa-[#111111] fa-expand text-xs text-[#5E5E5E] group-hover:text-[#111111]"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: THE OPEN RUN 2025 PHOTOGRAPHY (Featuring <Masonry />) */}
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

          {/* Integrated <Masonry /> Component */}
          <div className="my-8">
            <Suspense fallback={<GallerySkeleton height="600px" title="Loading Event Photography Masonry Grid..." />}>
              <Masonry
                items={openRunPhotos}
                ease="power3.out"
                duration={0.7}
                stagger={0.04}
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

      {/* SECTION 4: CAMPAIGN COLLATERAL (Featuring Infinite Horizontal Loop) */}
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

        {/* Integrated <InfiniteMarquee /> Component */}
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

      {/* SECTION 5: ADMISSION PR & BROCHURES */}
      <section className="py-24 border-b border-[#CCCCCC]/40 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-16 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                  ACADEMIC PR & MEDIA
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] uppercase tracking-wider">
                  INTERNATIONAL PROGRAMS
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-[#111111]">
                Admission Campaign & Credit-Transfer Brochures
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#5E5E5E] leading-relaxed">
                Designed promotional brochures, leaflets, and social media posters for international joint-degree programs and credit-transfer admissions. Successfully drove 30+ direct student enrollments.
              </p>
            </div>
          </ScrollReveal>

          {/* Brochures & Leaflets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...admissionBrochures, ...admissionLeaflets, ...admissionPosters].map(item => (
              <div
                key={item.id}
                className="group relative bg-[#FAF9F6] border border-[#CCCCCC]/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage({
                  src: item.img,
                  title: item.title,
                  category: item.category,
                  description: 'PR campaign material for International Open University Admissions.'
                })}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EBEBEB]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex items-center justify-between border-t border-[#CCCCCC]/30 bg-white">
                  <div>
                    <span className="font-narrow text-[10px] font-black text-[#5E5E5E] tracking-widest uppercase block">
                      {item.category}
                    </span>
                    <h4 className="font-display text-lg text-[#111111] uppercase">
                      {item.title}
                    </h4>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-[#CCCCCC] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all">
                    <i className="fa-solid fa-expand text-xs"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Return & Navigation */}
      <footer className="py-16 bg-[#111111] text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-narrow text-xs font-black tracking-[0.25em] text-white/50 uppercase block">
              NEXT CASE STUDY
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Public Relations Practitioner Intern
            </h3>
          </div>

          <button
            onClick={handleNavigateHome}
            className="px-8 py-4 bg-white text-[#111111] hover:bg-[#CCCCCC] transition-all font-narrow text-xs uppercase tracking-[0.25em] font-bold rounded-full flex items-center gap-3 shadow-lg group"
          >
            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
            <span>Return to All Experiences</span>
          </button>
        </div>
      </footer>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111111] border border-white/20 text-white max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-30 shadow-lg cursor-pointer"
                aria-label="Close image preview"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>

              {/* Left Image View */}
              <div className="lg:w-3/5 bg-black flex items-center justify-center p-4 min-h-[350px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded"
                />
              </div>

              {/* Right Content View */}
              <div className="lg:w-2/5 p-8 flex flex-col justify-between space-y-6 bg-[#181818] border-l border-white/10">
                <div className="space-y-4">
                  <span className="font-narrow text-xs font-black text-white/50 tracking-[0.25em] uppercase block">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-snug">
                    {selectedImage.title}
                  </h3>
                  <div className="h-0.5 bg-white/20 w-16"></div>
                  <p className="font-sans text-sm text-white/70 leading-relaxed">
                    {selectedImage.description || 'Campaign visual and media asset designed and managed for OU NEWS projects.'}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-3 bg-white text-[#111111] font-narrow text-xs uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-white/90 transition-all"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
