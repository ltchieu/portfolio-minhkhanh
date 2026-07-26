import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import TikTokEmbed from './TikTokEmbed';
import GallerySkeleton from './GallerySkeleton';
import ImageLightboxModal from './ImageLightboxModal';
import { weddingPlannerImages, weddingLedImages, comGungImages } from '../../data/freelanceProjectsData';
import type { LightboxImageData } from '../../models/imageLightboxModal';

// Lazy import BounceCards & Stack
const BounceCards = lazy(() => import('./BounceCards'));
const Stack = lazy(() => import('./Stack'));

interface WeddingGalleryState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  subtitle: string;
  title: string;
}

export default function FreelanceExperienceShowcase() {
  // Single image lightbox state for BounceCards / thumbnails
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Pop-up Gallery state for Wedding Collages
  const [weddingGallery, setWeddingGallery] = useState<WeddingGalleryState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    subtitle: '',
    title: '',
  });

  // Memoized top 5 images and transform styles for BounceCards to avoid re-renders & blinking
  const comGungImagesTop5 = useMemo(() => comGungImages.slice(0, 5), []);
  const stackCards = useMemo(
    () =>
      comGungImagesTop5.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Cốm Gừng Ceramic Shot ${idx + 1}`}
          className="w-full h-full object-cover rounded-xl border border-[#CCCCCC]/60 shadow-md select-none"
        />
      )),
    [comGungImagesTop5]
  );

  const bounceTransformStyles = useMemo(
    () => [
      'rotate(-12deg) translate(-90px, 10px)',
      'rotate(-5deg) translate(-45px, -5px)',
      'rotate(0deg) translate(0px, 0px)',
      'rotate(6deg) translate(45px, -5px)',
      'rotate(12deg) translate(90px, 10px)',
    ],
    []
  );

  // Handle keyboard navigation for wedding gallery modal
  useEffect(() => {
    if (!weddingGallery.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeWeddingGallery();
      } else if (e.key === 'ArrowLeft') {
        prevWeddingImage();
      } else if (e.key === 'ArrowRight') {
        nextWeddingImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [weddingGallery.isOpen, weddingGallery.images.length]);

  const openWeddingGallery = useCallback(
    (images: string[], subtitle: string, title = 'The groom Minh Tam and the Bride Anh Thu') => {
      setWeddingGallery({
        isOpen: true,
        images,
        currentIndex: 0,
        subtitle,
        title,
      });
    },
    []
  );

  const closeWeddingGallery = useCallback(() => {
    setWeddingGallery((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextWeddingImage = useCallback(() => {
    setWeddingGallery((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevWeddingImage = useCallback(() => {
    setWeddingGallery((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const selectWeddingImage = useCallback((index: number) => {
    setWeddingGallery((prev) => ({ ...prev, currentIndex: index }));
  }, []);

  const handleSelectImage = useCallback((src: string, title = 'Cốm Gừng Ceramic Asset') => {
    setSelectedImage({
      src,
      title,
      category: 'HANDCRAFTED CERAMIC STUDIO',
      description: 'Product & editorial photography for Cốm Gừng Ceramic.',
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="pt-6 space-y-8 border-t border-[#CCCCCC]/40 mt-6" onClick={(e) => e.stopPropagation()}>
      {/* ========================================================================= */}
      {/* SECTION 1: INTIMATE PRIVATE WEDDING EXPERIENCE */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-4 sm:p-6 space-y-5">
        <div className="border-b border-[#CCCCCC]/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#111111]">
              Intimate Private Wedding Experience.
            </h3>
            <span className="px-2.5 py-1 bg-white border border-[#111111]/20 font-narrow text-[11px] font-bold uppercase tracking-wider rounded text-[#111111] flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-heart text-[#111111] text-xs"></i>
              Design - Plan
            </span>
          </div>

          <ul className="space-y-2 pt-1 font-sans text-xs sm:text-sm text-[#333333] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0"></span>
              <span>
                Planned and coordinated intimate private wedding experiences, managing timelines, vendors, and on-site execution to ensure seamless event delivery.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0"></span>
              <span>
                Designed typography-led LED visuals tailored to each wedding concept, enhancing visual storytelling and guest experience.
              </span>
            </li>
          </ul>
        </div>

        {/* Two Collages Side-by-Side */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-narrow text-[11px] font-black text-[#5E5E5E] tracking-wider uppercase flex items-center gap-1.5">
              <i className="fa-solid fa-images text-[#111111]"></i>
              WEDDING GALLERIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Collage: Typography Wedding LED (Profile Picture) */}
            <div
              onClick={() =>
                openWeddingGallery(
                  weddingLedImages,
                  'Typography-Led LED Motion Visuals',
                  'The groom Minh Tam and the Bride Anh Thu'
                )
              }
              className="group relative rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={weddingLedImages[0]}
                  alt="Typography Wedding LED Profile Cover"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#111111] font-narrow text-[9px] font-black uppercase tracking-wider rounded border border-white/40 shadow-sm flex items-center gap-1">
                    <i className="fa-solid fa-film"></i>
                    LED Motion Visuals
                  </span>
                </div>

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-3.5 py-1.5 bg-white text-[#111111] font-narrow text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <i className="fa-solid fa-expand text-xs"></i>
                    Open Gallery ({weddingLedImages.length})
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 text-white space-y-0.5">
                  <p className="font-narrow text-[9px] font-bold text-white/70 uppercase tracking-widest">
                    GALLERY 01 • TYPOGRAPHY WEDDING LED
                  </p>
                  <h4 className="font-display text-sm sm:text-base uppercase tracking-tight line-clamp-1">
                    Typography Stage Visuals
                  </h4>
                </div>
              </div>
            </div>

            {/* Right Collage: Private Wedding Planner (Profile Picture) */}
            <div
              onClick={() =>
                openWeddingGallery(
                  weddingPlannerImages,
                  'Private Wedding Planner & On-Site Execution',
                  'The groom Cao Cuong and the bride Ai Vi'
                )
              }
              className="group relative rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={weddingPlannerImages[0]}
                  alt="Private Wedding Planner Profile Cover"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#111111] font-narrow text-[9px] font-black uppercase tracking-wider rounded border border-white/40 shadow-sm flex items-center gap-1">
                    <i className="fa-solid fa-calendar-check"></i>
                    Planning & Execution
                  </span>
                </div>

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-3.5 py-1.5 bg-white text-[#111111] font-narrow text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <i className="fa-solid fa-expand text-xs"></i>
                    Open Gallery ({weddingPlannerImages.length})
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 text-white space-y-0.5">
                  <p className="font-narrow text-[9px] font-bold text-white/70 uppercase tracking-widest">
                    GALLERY 02 • PRIVATE WEDDING PLANNER
                  </p>
                  <h4 className="font-display text-sm sm:text-base uppercase tracking-tight line-clamp-1">
                    Intimate Wedding Planning
                  </h4>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: CỐM GỪNG CERAMIC */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-4 sm:p-6 space-y-5">
        <div className="border-b border-[#CCCCCC]/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#111111]">
              Cốm Gừng Ceramic
            </h3>
            <span className="px-2.5 py-1 bg-white border border-[#111111]/20 font-narrow text-[11px] font-bold uppercase tracking-wider rounded text-[#111111] flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-camera-retro text-[#111111] text-xs"></i>
              Content & Visual Production
            </span>
          </div>

          <ul className="space-y-2 pt-1 font-sans text-xs sm:text-sm text-[#333333] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0"></span>
              <span>
                Produced short-form TikTok videos to showcase handcrafted ceramic collections.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0"></span>
              <span>
                Planned and executed product photography for digital marketing and e-commerce channels.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0"></span>
              <span>
                Created visual content tailored to social media engagement and brand storytelling.
              </span>
            </li>
          </ul>
        </div>

        {/* Design 2 Collages: Left = BounceCards, Right = Clip TikTok */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Collage: Photography with BounceCards */}
          <div className="md:col-span-7 bg-white p-4 rounded-lg border border-[#CCCCCC]/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="font-narrow text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fa-solid fa-layer-group text-[#111111]"></i>
                    Ceramic Product Photography
                  </h4>
                  <p className="font-sans text-[10px] text-[#5E5E5E]">
                    Hover over cards to trigger bounce animation; click photo to expand.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center py-2 overflow-hidden">
                <Suspense fallback={<GallerySkeleton height="240px" />}>
                  {/* Desktop & Tablet view: BounceCards */}
                  <div className="hidden sm:flex justify-center items-center">
                    <BounceCards
                      images={comGungImagesTop5}
                      containerWidth={260}
                      containerHeight={240}
                      animationDelay={0.15}
                      animationStagger={0.06}
                      transformStyles={bounceTransformStyles}
                      onCardClick={(idx) => handleSelectImage(comGungImages[idx])}
                    />
                  </div>

                  {/* Mobile view: Stack component */}
                  <div className="flex sm:hidden justify-center items-center h-[230px] w-[200px] relative my-2">
                    <Stack
                      cards={stackCards}
                      randomRotation={true}
                      sendToBackOnClick={true}
                      sensitivity={120}
                    />
                  </div>
                </Suspense>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="pt-3 border-t border-[#CCCCCC]/30 space-y-1.5">
              <span className="font-narrow text-[10px] font-bold text-[#5E5E5E] uppercase tracking-wider block">
                Product Shot Collection ({comGungImages.length})
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {comGungImages.slice(0, 5).map((src, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    onClick={() => handleSelectImage(src, `Cốm Gừng Ceramic Shot ${thumbIdx + 1}`)}
                    className="aspect-square rounded overflow-hidden border border-[#CCCCCC]/60 hover:border-[#111111] hover:scale-105 transition-all group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={`Ceramic thumb ${thumbIdx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Collage: Embedded TikTok Video Clip */}
          <div className="md:col-span-5 bg-[#111111] text-white p-4 rounded-lg border border-[#111111] flex flex-col items-center justify-between space-y-3 shadow-md">
            <div className="w-full pb-2.5 border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-tiktok text-base text-[#00f2fe]"></i>
                <div>
                  <h4 className="font-narrow text-xs font-black uppercase tracking-wider text-white">
                    TikTok Video Clip
                  </h4>
                  <p className="font-sans text-[10px] text-white/60">
                    @comgung_ceramic
                  </p>
                </div>
              </div>
              <span className="font-mono text-[9px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 uppercase">
                REEL
              </span>
            </div>

            <div className="w-full flex-1 flex justify-center items-center py-1 overflow-auto">
              <TikTokEmbed
                url="https://www.tiktok.com/@comgung_ceramic/video/7546055391021419797"
                videoId="7546055391021419797"
                title="Cốm Gừng Ceramic Side project"
                author="@comgung_ceramic"
              />
            </div>

            <div className="w-full pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] font-narrow text-white/70">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-circle-play text-[#00f2fe] text-xs"></i>
                @comgung_ceramic
              </span>
              <a
                href="https://www.tiktok.com/@comgung_ceramic/video/7546055391021419797"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00f2fe] hover:underline flex items-center gap-1 font-bold transition-colors"
              >
                <span>Watch on TikTok</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HARMONIOUS POP-UP GALLERY MODAL: "The groom Cao Cuong and the bride Ai Vi" */}
      {/* ========================================================================= */}
      {createPortal(
        <AnimatePresence>
          {weddingGallery.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
              onClick={closeWeddingGallery}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#141414]/95 border border-white/20 text-white max-w-4xl w-full rounded-2xl p-5 sm:p-6 shadow-2xl relative flex flex-col justify-between max-h-[92vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-white/15 pb-3">
                  <div className="space-y-1">
                    <span className="font-narrow text-[11px] font-black text-[#00f2fe] tracking-[0.2em] uppercase block">
                      {weddingGallery.subtitle}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-white">
                      {weddingGallery.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/70 bg-white/10 px-3 py-1 rounded border border-white/15">
                      {weddingGallery.currentIndex + 1} / {weddingGallery.images.length}
                    </span>
                    <button
                      onClick={closeWeddingGallery}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all flex items-center justify-center cursor-pointer border border-white/20"
                      aria-label="Close gallery modal"
                    >
                      <i className="fa-solid fa-xmark text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Modal Image Viewport */}
                <div className="relative flex-1 flex items-center justify-between my-3 min-h-[280px] max-h-[60vh]">
                  <button
                    onClick={prevWeddingImage}
                    className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-20 shadow-lg border border-white/20 cursor-pointer flex items-center justify-center"
                    aria-label="Previous photo"
                  >
                    <i className="fa-solid fa-chevron-left text-base sm:text-lg"></i>
                  </button>

                  <div className="flex-1 flex items-center justify-center h-full px-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={weddingGallery.currentIndex}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        src={weddingGallery.images[weddingGallery.currentIndex]}
                        alt={`Wedding Photo ${weddingGallery.currentIndex + 1}`}
                        className="max-h-[58vh] max-w-full object-contain rounded-lg shadow-xl border border-white/10"
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={nextWeddingImage}
                    className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-20 shadow-lg border border-white/20 cursor-pointer flex items-center justify-center"
                    aria-label="Next photo"
                  >
                    <i className="fa-solid fa-chevron-right text-base sm:text-lg"></i>
                  </button>
                </div>

                {/* Modal Bottom Thumbnail Strip */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-center gap-2 overflow-x-auto">
                  {weddingGallery.images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectWeddingImage(idx)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${weddingGallery.currentIndex === idx
                        ? 'border-[#00f2fe] scale-105 shadow-lg opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white'
                        }`}
                    >
                      <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Single Image Lightbox Modal */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={handleCloseLightbox} />
    </div>
  );
}
