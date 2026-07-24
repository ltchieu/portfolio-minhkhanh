import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import HeaderNav from './common/HeaderNav';
import JobHeroSection from './common/JobHeroSection';
import ImageLightboxModal from './common/ImageLightboxModal';
import type { HeroMetricCard } from '../models/jobHeroSection';
import type { LightboxImageData } from '../models/imageLightboxModal';
import ScrollReveal from './common/ScrollReveal';

// Vite eager glob for assets under /assets/image/Activities/Đêm nhạc hội The Phoenix 2022
const phoenixGlob = import.meta.glob<string>(
  '../../assets/image/Activities/Đêm nhạc hội The Phoenix 2022/**/*.{webp,png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

export default function PhoenixMusicFestivalDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Match project metadata from data store
  const project = useMemo(() => {
    return projects.find((p) => p.id === 'phoenix-music-festival-2022') || projects[1];
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

  // Format image items into standard structured list with English descriptions
  const formattedImages = useMemo(() => {
    return Object.keys(phoenixGlob).map((key, idx) => {
      const src = phoenixGlob[key];
      const filename = key.split('/').pop() || '';

      let title = `Phoenix Music Festival — Asset 0${idx + 1}`;
      let category = 'Music Festival & Brand Activation';
      let description = 'Official graphic design asset created for The Phoenix Music Festival 2022.';

      if (filename.includes('Poster-04')) {
        title = 'Main Key Visual & Official Lineup Poster';
        category = 'Main Key Visual';
        description = 'Official poster design detailing festival lineup, artist schedule, and venue information.';
      } else if (filename.includes('Poster-02')) {
        title = 'Festival Teaser & Promotional Poster';
        category = 'Promotional Poster';
        description = 'Teaser poster series launching the official announcement of The Phoenix Music Festival 2022.';
      } else if (filename.includes('Standee')) {
        title = '1x2m Campus Promotion Standee Banner';
        category = 'Large Format Print';
        description = '1x2m promotional standee banner displayed across campus hallways and entry gates.';
      } else if (filename.includes('Straps-01')) {
        title = 'Festival VIP & General Admission Wristbands';
        category = 'Access Pass Design';
        description = 'Custom festival entry wristbands and security access lanyards for VIP guests and attendees.';
      } else if (filename.includes('Strap')) {
        title = 'Event Wristband Pass Design';
        category = 'Access Pass Design';
        description = 'Official event wristband pass for identity verification and entry control.';
      } else if (filename.includes('LOGO')) {
        title = 'The Phoenix 2022 Official Logo Mark';
        category = 'Brand Identity';
        description = 'Official brand logo graphic mark for The Phoenix Music Festival 2022.';
      }

      return {
        id: `phoenix-img-${idx}`,
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
    { label: 'Festival Audience', value: '500+', note: 'Students & live crowd', icon: 'fa-solid fa-users' },
    { label: 'Design Collaterals', value: '6', note: 'Posters, passes & banners', icon: 'fa-solid fa-layer-group' },
    { label: 'Press & Media Posts', value: '4', note: 'Official Facebook releases', icon: 'fa-solid fa-newspaper' },
    { label: 'Festival Year', value: '2022', note: 'Live Campus Event', icon: 'fa-solid fa-calendar' }
  ], []);

  // Official Facebook Post Links
  const officialLinks = useMemo(() => [
    {
      title: 'Artist Lineup Announcement',
      url: 'https://www.facebook.com/share/p/18wKEjsGpj/',
      icon: 'fa-solid fa-microphone-lines'
    },
    {
      title: 'Festival Program Overview',
      url: 'https://www.facebook.com/share/p/1cmXji2QjH/',
      icon: 'fa-solid fa-bullhorn'
    },
    {
      title: 'Teaser Launch Campaign',
      url: 'https://www.facebook.com/share/p/1azggJiKbd/',
      icon: 'fa-solid fa-star'
    },
    {
      title: 'Event Highlights & Recap',
      url: 'https://www.facebook.com/share/p/18AhhBJ4Ma/',
      icon: 'fa-solid fa-film'
    }
  ], []);

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#111111] selection:text-white pb-24">
      {/* Header Navigation Bar */}
      <HeaderNav
        onNavigateHome={handleNavigateHome}
        caseStudyText="THE PHOENIX MUSIC FESTIVAL 2022"
        badgeText="MUSIC FESTIVAL 2022"
      />

      {/* Hero Overview Section */}
      <JobHeroSection
        japaneseBackgroundText="フェスティバル"
        categoryText="MUSIC FESTIVAL & BRAND ACTIVATION"
        timeframe="Q4 / 2022"
        title="The Phoenix Music Festival 2022 — Visual Identity & Print Campaign"
        description={
          <p>
            Directed complete visual identity and campaign print collateral for <strong className="text-[#111111] font-semibold">The Phoenix Music Festival 2022</strong>, an energetic live campus music gathering over 500+ attendees. Developed main key visual posters, promotional teaser series, 1x2m standees, and VIP wristband passes.
          </p>
        }
        tags={['Key Visual Poster Design', 'Festival Entry Wristbands', '1x2m Standee Banners', 'Brand Identity', 'Event Marketing']}
        metrics={heroMetrics}
      />

      {/* Official Media Publications Bar */}
      <section className="py-8 bg-white border-y border-[#CCCCCC]/40">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block mb-1">
                OFFICIAL PRESS & SOCIAL MEDIA COVERAGE
              </span>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
                Campaign Facebook Releases & Highlights
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {officialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FAF9F6] border border-[#CCCCCC]/80 text-[#111111] text-xs font-narrow font-bold uppercase tracking-wider rounded hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <i className={`${link.icon} text-xs`}></i>
                  <span>{link.title}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Visual Gallery — Standard Clean Grid */}
      <div className="max-w-[1440px] mx-auto px-6 pt-16 space-y-24">
        <section id="phoenix-photo-grid">
          <ScrollReveal direction="up" distance={30}>
            <div className="border-b border-[#CCCCCC]/40 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase">
                    FEATURED SHOWCASE
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                    VISUAL GALLERY ({formattedImages.length} ASSETS)
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111]">
                  Visual Identity & Graphic Design Gallery
                </h2>
                <p className="font-sans text-base text-[#5E5E5E] max-w-3xl leading-relaxed mt-2">
                  High-resolution photo gallery displaying key festival posters, 1x2m promotional standees, VIP access wristbands, and official event logos. Click any image to view in full resolution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedImages.map((img, idx) => (
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
                Design Scope & Impact
              </h3>
              <div className="space-y-3 font-sans text-sm text-[#5E5E5E]">
                <p><strong className="text-[#111111]">Role:</strong> Visual Identity & Lead Designer</p>
                <p><strong className="text-[#111111]">Deliverables:</strong> Posters, Wristbands, Standees, Social Media Graphics</p>
                <p><strong className="text-[#111111]">Tools Used:</strong> Adobe Illustrator, Photoshop, Print Pre-press</p>
                <p><strong className="text-[#111111]">Target Audience:</strong> 500+ University Students & Music Fans</p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-4 font-sans text-base text-[#5E5E5E] leading-relaxed">
              <p>
                <strong className="text-[#111111]">The Phoenix 2022</strong> music festival brought together high-energy live band performances, electronic music sets, and interactive student engagement zones. To build anticipation and convey the vibrant energy of the festival, the visual identity focused on bold fiery typography, high-contrast promotional graphics, and tactile festival wristband passes.
              </p>
              <p>
                Every asset — from the large-format 1x2m campus standees placed across high-traffic student hallways to the security wristbands worn by VIP guests — was engineered for maximum visual impact and brand consistency across both physical print and digital channels.
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
