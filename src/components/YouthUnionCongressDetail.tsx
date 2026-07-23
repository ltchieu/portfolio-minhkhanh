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
import ScrollReveal from './common/ScrollReveal';

// Dynamic lazy import for Masonry component
const Masonry = lazy(() => import('./common/Masonry'));

// Vite eager glob for assets under /assets/image/Activities/Đại hội Đoàn 2022
const doanGlob = import.meta.glob<string>(
  '../../assets/image/Activities/Đại hội Đoàn 2022/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

export default function YouthUnionCongressDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Match project metadata from data store
  const project = useMemo(() => {
    return projects.find((p) => p.id === 'dai-hoi-doan-2022') || projects[2];
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

  // Filter 1: Specified 9 images for Masonry component
  // Avatar-01, Avatar-Frame, BG-01, BG-Slide-01, Bìa dự thảo văn kiện, Bìa văn kiện, Book_s cover-Back, Book_s cover-Front, Chi Đoàn TA20DB01-01
  const masonryItems: MasonryItem[] = useMemo(() => {
    const masonryKeywords = [
      'Avatar-01',
      'Avatar-Frame',
      'BG-01',
      'BG-Slide-01',
      'Bìa dự thảo văn kiện',
      'Bìa văn kiện',
      'Book_s cover-Back',
      'Book_s cover-Front',
      'Chi Đoàn TA20DB01-01'
    ];

    const defaultHeights = [440, 360, 520, 380, 460, 400, 480, 350, 420];

    return Object.keys(doanGlob)
      .filter((key) => masonryKeywords.some((kw) => key.toLowerCase().includes(kw.toLowerCase())))
      .map((key, idx) => {
        const src = doanGlob[key];
        const filename = key.split('/').pop() || '';

        let title = `Youth Union Congress Asset 0${idx + 1}`;
        let subtitle = 'Official Publication & Visual Branding 2022';

        if (filename.includes('Avatar-01')) {
          title = 'Official Congress Delegate Profile Avatar Design';
          subtitle = 'Delegate Identity & Social Media Frame';
        } else if (filename.includes('Avatar-Frame')) {
          title = 'Congress Facebook Campaign Avatar Frame';
          subtitle = 'Publicity & Social Media Advocacy Frame';
        } else if (filename.includes('BG-01')) {
          title = 'Congress Key Visual & Backdrop Banner Wall';
          subtitle = 'Stage Pre-press Graphic Scenography';
        } else if (filename.includes('BG-Slide-01')) {
          title = 'Executive Reporting Slide Deck Background';
          subtitle = 'Official Slide Master Template';
        } else if (filename.includes('Bìa dự thảo văn kiện')) {
          title = 'Congress Draft Resolution Booklet Cover';
          subtitle = 'Preliminary Report Publication Design';
        } else if (filename.includes('Bìa văn kiện')) {
          title = 'Official Congress Resolution Book Cover';
          subtitle = 'Formal Term Report Print Cover';
        } else if (filename.includes('Book_s cover-Back')) {
          title = 'Congress Handbook Back Cover Graphics';
          subtitle = 'Print Production Back Layout';
        } else if (filename.includes('Book_s cover-Front')) {
          title = 'Congress Handbook Front Cover Graphics';
          subtitle = 'Print Production Front Layout';
        } else if (filename.includes('Chi Đoàn TA20DB01-01')) {
          title = 'Sub-unit Delegation Banner — English TA20DB01';
          subtitle = 'Class Delegation Unit Identifier';
        }

        return {
          id: `masonry-doan-${idx}`,
          img: src,
          height: defaultHeights[idx % defaultHeights.length],
          title,
          subtitle
        };
      });
  }, []);

  // Filter 2: The rest of the images for standard responsive grid display
  const standardGridImages = useMemo(() => {
    const masonryKeywords = [
      'Avatar-01',
      'Avatar-Frame',
      'BG-01',
      'BG-Slide-01',
      'Bìa dự thảo văn kiện',
      'Bìa văn kiện',
      'Book_s cover-Back',
      'Book_s cover-Front',
      'Chi Đoàn TA20DB01-01'
    ];

    return Object.keys(doanGlob)
      .filter((key) => !masonryKeywords.some((kw) => key.toLowerCase().includes(kw.toLowerCase())))
      .map((key, idx) => {
        const src = doanGlob[key];
        const filename = key.split('/').pop() || '';

        let title = `Congress Document 0${idx + 1}`;
        let category = 'Diplomatic & Event Logistics';
        let description = 'Official printed publication created for Youth Union Congress 2022.';

        if (filename.includes('Cover-01')) {
          title = 'Congress Main Publicity Banner & Header';
          category = 'Header Graphics';
          description = 'Official campaign header visual displayed on social media channels.';
        } else if (filename.includes('Thư mời - Cover-01')) {
          title = 'Diplomatic Invitation Envelope & Folder Cover';
          category = 'Print Invitation';
          description = 'Formal invitation folder cover for executive guests and district leaders.';
        } else if (filename.includes('Thư mời Quận Đoàn Quận 3')) {
          title = 'District 3 Youth Union VIP Invitation Card';
          category = 'Diplomatic Pass';
          description = 'Official invitation card sent to District 3 Youth Union executive leadership.';
        } else if (filename.includes('Thẻ Biểu quyết')) {
          title = 'Congress Resolution Voting Card Ballot';
          category = 'Delegate Ballot Pass';
          description = 'Printed voting ballot card for delegate voting and resolution ratifications.';
        } else if (filename.includes('Thẻ Khách mời')) {
          title = 'VIP Guest & Honor Delegate Badge Pass';
          category = 'Credential Badge';
          description = 'Identification badge pass designed for visiting executive guests.';
        } else if (filename.includes('Thẻ Đại biểu')) {
          title = 'Official Congress Voting Delegate Badge Pass';
          category = 'Delegate Badge';
          description = 'Identification badge pass for official congress delegates.';
        }

        return {
          id: `grid-doan-${idx}`,
          src,
          filename,
          title,
          category,
          description
        };
      });
  }, []);

  // Hero section metric cards
  const heroMetrics: HeroMetricCard[] = useMemo(() => [
    { label: 'Congress Delegates', value: '150+', note: 'Official union leaders', icon: 'fa-solid fa-users' },
    { label: 'Official Publications', value: '15', note: 'Booklets, passes & badges', icon: 'fa-solid fa-book-open' },
    { label: 'VIP Logistics', value: 'District 3', note: 'District Youth Union Guests', icon: 'fa-solid fa-building-columns' },
    { label: 'Congress Year', value: '2022', note: 'Official Union Term', icon: 'fa-solid fa-award' }
  ], []);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="YOUTH UNION CONGRESS 2022"
        badgeText="CONGRESS 2022"
      />

      {/* Hero Overview Section */}
      <JobHeroSection
        japaneseBackgroundText="大会2022"
        categoryText="CORPORATE & DIPLOMATIC EVENT"
        timeframe="Q2 / 2022"
        title="Youth Union Congress 2022 — Publication & Diplomatic Graphic Suite"
        description={
          <p>
            Responsible for the comprehensive corporate identity, publication design, voting passes, VIP invitations, and slide presentation decks for the <strong className="text-[#111111] font-semibold">Youth Union Congress 2022 (Đại Hội Đoàn Khoa)</strong>. Designed official resolution draft booklets, delegate badges, invitation covers for District 3 Youth Union, and executive reporting slide masters.
          </p>
        }
        tags={['Official Draft & Report Booklets', 'Delegate & VIP Guest Badges', 'Voting Cards & Invitations', 'Presentation Decks', 'Press Logistics']}
        metrics={heroMetrics}
      />

      {/* Official Media Publications Bar */}
      <section className="py-8 bg-white border-y border-[#CCCCCC]/40">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block mb-1">
                OFFICIAL RECAP & CONGRESS COVERAGE
              </span>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
                Youth Union Congress 2022 Media Report
              </h3>
            </div>
            <div>
              <a
                href="https://www.facebook.com/share/p/1EX9rW9qoj/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#111111] text-white text-xs font-narrow font-bold uppercase tracking-wider rounded hover:bg-[#333333] transition-all flex items-center gap-2 shadow-sm"
              >
                <i className="fa-brands fa-facebook text-xs text-[#1877F2]"></i>
                <span>Read Official Congress Recap</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 pt-16 space-y-24">
        {/* SHOWCASE 01: MASONRY GALLERY (9 SPECIFIED ASSETS) */}
        <section id="doan-masonry-showcase">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 01 / 02
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    MASONRY GALLERY ({masonryItems.length} ASSETS)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Official Publications, Covers & Stage Artworks
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Staggered masonry arrangement showcasing congress draft booklets, resolution book covers, executive slide backgrounds, avatar frames, and delegation banners. Click any item to inspect in high resolution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<GallerySkeleton height="600px" title="Loading Congress Masonry Gallery..." />}>
            <div className="min-h-[500px]">
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.04}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.97}
                onItemClick={(item) => {
                  setSelectedImage({
                    src: item.img,
                    title: item.title || 'Youth Union Congress 2022 Asset',
                    category: 'Official Congress Publication & Scenography',
                    description: 'Official printed publication and graphic asset created for Youth Union Congress 2022.'
                  });
                }}
              />
            </div>
          </Suspense>
        </section>

        {/* SHOWCASE 02: STANDARD PHOTO GRID (REMAINING ASSETS) */}
        <section id="doan-standard-grid">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    SHOWCASE 02 / 02
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    DIPLOMATIC PASSES & CREDENTIALS ({standardGridImages.length} ASSETS)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  VIP Invitations, Voting Cards & Delegate Passes
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  Standard photo card grid displaying executive guest invitation folders, District 3 Youth Union diplomatic passes, delegate voting cards, and credential badges. Click any item to inspect in full resolution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardGridImages.map((img, idx) => (
              <ScrollReveal key={img.id} direction="up" delay={idx * 0.05}>
                <div
                  onClick={() =>
                    setSelectedImage({
                      src: img.src,
                      title: img.title,
                      category: img.category,
                      description: img.description
                    })
                  }
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#CCCCCC]/60 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-narrow text-[10px] font-black text-white/80 tracking-widest uppercase mb-1">
                      {img.category}
                    </span>
                    <h4 className="font-display text-lg text-white uppercase leading-tight line-clamp-1">
                      {img.title}
                    </h4>
                    <p className="font-sans text-xs text-white/80 font-medium flex items-center gap-2 mt-2">
                      <i className="fa-solid fa-magnifying-glass-plus text-xs"></i> View High-Res Image
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Project Context & Scope Summary */}
        <section id="project-overview-summary" className="pt-12 border-t border-[#CCCCCC]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block mb-2">
                PROJECT METADATA
              </span>
              <h3 className="font-display text-2xl uppercase tracking-tight text-[#111111] mb-4">
                Corporate Pre-press Scope
              </h3>
              <div className="space-y-3 font-sans text-sm text-[#5E5E5E]">
                <p><strong className="text-[#111111]">Role:</strong> Corporate & Press Pre-press Designer</p>
                <p><strong className="text-[#111111]">Deliverables:</strong> Report Booklets, VIP Passes, Presentation Slides, Badges</p>
                <p><strong className="text-[#111111]">Tools Used:</strong> Adobe InDesign, Illustrator, Photoshop</p>
                <p><strong className="text-[#111111]">Diplomatic Reach:</strong> Faculty Leadership & District 3 Youth Union</p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-4 font-sans text-base text-[#5E5E5E] leading-relaxed">
              <p>
                The <strong className="text-[#111111]">Youth Union Congress 2022 (Đại Hội Đoàn Khoa)</strong> required a strict, high-precision corporate graphic system conforming to official diplomatic standards. Khanh managed the complete pre-press workflow for all printed publications, from resolution draft handbooks to delegate credential badges.
              </p>
              <p>
                Special emphasis was placed on brand consistency across both digital channels (social media avatar frames, executive reporting slide decks) and physical diplomatic stationery sent to high-level partners such as District 3 Youth Union.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Back to top floating button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={handleScrollTop}
          className="w-12 h-12 rounded-full bg-[#111111] text-white shadow-xl flex items-center justify-center hover:bg-[#333333] transition-all hover:scale-110 active:scale-95"
          title="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-sm"></i>
        </button>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={handleCloseLightbox} />
    </div>
  );
}
