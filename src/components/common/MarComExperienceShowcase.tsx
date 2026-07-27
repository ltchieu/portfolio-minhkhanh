import { useState, useMemo, useCallback, useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import ImageLightboxModal from './ImageLightboxModal';
import GallerySkeleton from './GallerySkeleton';
import type { LightboxImageData } from '../../models/imageLightboxModal';
import { pressArticles } from '../../data/pressArticlesData';

// Lazy import interactive GSAP / Motion sub-components
const BounceCards = lazy(() => import('./BounceCards'));
const Stack = lazy(() => import('./Stack'));

// Vite eager glob for all drive download asset images
const rawImages = import.meta.glob<string>(
  '/assets/image/drive-download-20260722T121611Z-1-001/**/*.{webp,jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

interface CustomGalleryModalState {
  isOpen: boolean;
  title: string;
  category: string;
  images: string[];
  currentIndex: number;
}

export default function MarComExperienceShowcase() {
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Pop-up Gallery state for Section Image Sets
  const [galleryModal, setGalleryModal] = useState<CustomGalleryModalState>({
    isOpen: false,
    title: '',
    category: '',
    images: [],
    currentIndex: 0,
  });

  // 1. Collage 1 & 2: The Open Run 2025 (Design & Photography)
  const openRunDesignImages = useMemo(() => {
    const keys = Object.keys(rawImages).filter(path => path.includes('The Open Run 2025/Design'));

    // Prioritize near-square images (1:1 and near-square ratios) for Bounce Cards over wide banner images
    const nearSquareKeywords = [
      'Qua tang',
      'FB Avt',
      'Huy chuong Ao',
      'Luu y tham gia',
      'Bang tai tro_Agribank',
      'Bang tai tro_LOF',
      'Boc tham',
      'Thu cam on',
    ];

    const getPriority = (path: string) => {
      const idx = nearSquareKeywords.findIndex(kw => path.includes(kw));
      return idx !== -1 ? idx : 999;
    };

    const sortedKeys = [...keys].sort((a, b) => getPriority(a) - getPriority(b));
    return sortedKeys.map(path => rawImages[path]);
  }, []);

  const openRunDesignCards = useMemo(() => {
    const keys = Object.keys(rawImages).filter(path => path.includes('The Open Run 2025/Design'));

    const nearSquareKeywords = [
      'Qua tang',
      'FB Avt',
      'Huy chuong Ao',
      'Luu y tham gia',
      'Bang tai tro_Agribank',
      'Bang tai tro_LOF',
      'Boc tham',
      'Thu cam on',
    ];

    const getPriority = (path: string) => {
      const idx = nearSquareKeywords.findIndex(kw => path.includes(kw));
      return idx !== -1 ? idx : 999;
    };

    const sortedKeys = [...keys].sort((a, b) => getPriority(a) - getPriority(b));
    const top5Keys = sortedKeys.slice(0, 5);
    // Place the top item at the end of the stack array so it renders at the TOP of the mobile Stack
    const stackKeys = [...top5Keys.slice(1), top5Keys[0]];

    return stackKeys.map((path, idx) => (
      <img
        key={idx}
        src={rawImages[path]}
        alt={`The Open Run 2025 Design ${idx + 1}`}
        className="w-full h-full object-cover rounded-xl border border-[#CCCCCC]/60 shadow-md select-none"
      />
    ));
  }, []);

  const openRunPhotoImages = useMemo(() => {
    const keys = Object.keys(rawImages).filter(path => path.includes('The Open Run 2025/Photography'));
    const img9812Key = keys.find(path => path.includes('IMG_9812'));

    let sortedKeys = keys;
    if (img9812Key) {
      sortedKeys = [img9812Key, ...keys.filter(k => k !== img9812Key)];
    }
    return sortedKeys.map(path => rawImages[path]);
  }, []);

  const openRunPhotoCards = useMemo(() => {
    const keys = Object.keys(rawImages).filter(path => path.includes('The Open Run 2025/Photography'));
    const img9812Key = keys.find(path => path.includes('IMG_9812'));

    let stackKeys: string[];
    if (img9812Key) {
      const others = keys.filter(k => k !== img9812Key).slice(0, 4);
      // Place img9812Key as the LAST item so it renders at the TOP of the Stack
      stackKeys = [...others, img9812Key];
    } else {
      stackKeys = keys.slice(0, 5);
    }

    return stackKeys.map((path, idx) => (
      <img
        key={idx}
        src={rawImages[path]}
        alt={`The Open Run 2025 Photography ${idx + 1}`}
        className="w-full h-full object-cover rounded-xl border border-[#CCCCCC]/60 shadow-md select-none"
      />
    ));
  }, []);

  const openRunDesignImagesTop5 = useMemo(() => openRunDesignImages.slice(0, 5), [openRunDesignImages]);
  const openRunPhotoImagesTop5 = useMemo(() => openRunPhotoImages.slice(0, 5), [openRunPhotoImages]);

  // 2. Collage 2: Miss & Mister OU 2025
  const missMisterImages = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('Miss & Mister OU'))
      .map(path => rawImages[path]);
  }, []);

  const missMisterImagesTop5 = useMemo(() => missMisterImages.slice(0, 5), [missMisterImages]);

  const missMisterStackCards = useMemo(
    () =>
      missMisterImagesTop5.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Miss & Mister OU ${idx + 1}`}
          className="w-full h-full object-cover rounded-xl border border-[#CCCCCC]/60 shadow-md select-none"
        />
      )),
    [missMisterImagesTop5]
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

  // 3. Collage 3: Short Film Poster, Leaflet & Brochure
  const admissionCampaignImages = useMemo(() => {
    const posters = Object.keys(rawImages)
      .filter(path => path.includes('International Admission Campaign 2026') && !path.includes('.txt'))
      .map(path => ({ src: rawImages[path], title: 'Design Short Film Poster', category: 'Poster & Media' }));

    const leaflets = Object.keys(rawImages)
      .filter(path => path.includes('Leaflet Credit-tranfer Program Admission 2026'))
      .map(path => ({ src: rawImages[path], title: 'Design Leaflet', category: 'Credit-Transfer Program' }));

    const brochures = Object.keys(rawImages)
      .filter(path => path.includes('Brochure of International Admission'))
      .map(path => ({ src: rawImages[path], title: 'Design Brochure', category: 'International Admission' }));

    return [...posters, ...leaflets, ...brochures];
  }, []);

  const admissionCampaignImageUrls = useMemo(
    () => admissionCampaignImages.map(item => item.src),
    [admissionCampaignImages]
  );

  // 4. Social Post Images
  const socialPostImages = useMemo(() => {
    return Object.keys(rawImages)
      .filter(path => path.includes('SocialPost') && !path.includes('.txt'))
      .map(path => rawImages[path]);
  }, []);

  // 5. Event Photographer Images
  const eventPhotoImages = useMemo(() => {
    const talkshow1 = Object.keys(rawImages)
      .filter(path => path.includes('ToaDamKhoiNghiep/'))
      .map(path => ({ src: rawImages[path], title: 'Tọa Đàm Khởi Nghiệp' }));

    const talkshow2 = Object.keys(rawImages)
      .filter(path => path.includes('ToaDamKhoiNghiepThanhCong/'))
      .map(path => ({ src: rawImages[path], title: 'Tọa Đàm Khởi Nghiệp Thành Công' }));

    return [...talkshow1, ...talkshow2];
  }, []);

  const eventPhotoImageUrls = useMemo(
    () => eventPhotoImages.map(item => item.src),
    [eventPhotoImages]
  );

  const openGalleryModal = useCallback((title: string, category: string, images: string[], startIndex = 0) => {
    setGalleryModal({
      isOpen: true,
      title,
      category,
      images,
      currentIndex: startIndex,
    });
  }, []);

  const closeGalleryModal = useCallback(() => {
    setGalleryModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextGalleryImage = useCallback(() => {
    setGalleryModal(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevGalleryImage = useCallback(() => {
    setGalleryModal(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  // Keyboard navigation for gallery modal
  useEffect(() => {
    if (!galleryModal.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGalleryModal();
      } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
      } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryModal.isOpen, closeGalleryModal, prevGalleryImage, nextGalleryImage]);

  return (
    <div className="pt-6 space-y-10 border-t border-[#CCCCCC]/40 mt-6" onClick={(e) => e.stopPropagation()}>

      {/* ========================================================================= */}
      {/* COLLAGE: ORGANIZER, DESIGNER & PHOTOGRAPHER OF THE OPEN RUN 2025 */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-6">
        {/* Main Section Header */}
        <div className="border-b border-[#CCCCCC]/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111] flex items-center gap-2.5">
              <i className="fa-solid fa-person-running text-base text-[#111111]"></i>
              Organizer, Main Designer & Photographer of The Open Run 2025
            </h3>
            <span className="px-3 py-1 bg-[#111111] text-white font-narrow text-[11px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-award text-xs"></i>
              Event Operations, Design & Photography
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
            Main event organizer, graphic identity designer, and official photographer for Ho Chi Minh City Open University’s annual marathon. Coordinated 600+ on-site runners while producing the complete visual collateral suite and capturing live event moments.
          </p>
        </div>

        {/* 2 Collages Stacked Vertically: Design ABOVE, Photography BELOW */}
        <div className="space-y-6">

          {/* COLLAGE 1: DESIGN (ABOVE) */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CCCCCC]/60 flex flex-col justify-between space-y-4">
            <div className="space-y-1 border-b border-[#CCCCCC]/30 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-narrow text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fa-solid fa-palette text-[#111111]"></i>
                    Visual Collateral & Graphic Design ({openRunDesignImages.length} Assets)
                  </h4>
                  <p className="font-sans text-[10px] text-[#5E5E5E]">
                    Hover over cards to trigger bounce animation; click photo to expand.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#5E5E5E] hidden sm:inline-block">HOVER / CLICK</span>
              </div>
              <p className="font-sans text-[11px] text-[#666666] line-clamp-2">
                Elevator LEDs, contestant badges, background banners, standees, social posts & thank-you certificates.
              </p>
            </div>

            {/* Bounce Cards Display (Desktop: BounceCards, Mobile: Stack) */}
            <div className="w-full flex justify-center items-center py-4 overflow-hidden min-h-[250px]">
              <Suspense fallback={<GallerySkeleton height="240px" />}>
                {/* Desktop & Tablet view: BounceCards */}
                <div className="hidden sm:flex justify-center items-center">
                  <BounceCards
                    images={openRunDesignImagesTop5}
                    containerWidth={280}
                    containerHeight={240}
                    animationDelay={0.15}
                    animationStagger={0.06}
                    transformStyles={bounceTransformStyles}
                    onCardClick={(idx) => openGalleryModal("The Open Run 2025 – Graphic & Brand Design", "Visual Branding & Graphic Design", openRunDesignImages, idx)}
                  />
                </div>

                {/* Mobile view: Stack component */}
                <div className="flex sm:hidden justify-center items-center h-[230px] w-[200px] relative my-2">
                  <Stack
                    cards={openRunDesignCards}
                    randomRotation={true}
                    sendToBackOnClick={true}
                    sensitivity={120}
                  />
                </div>
              </Suspense>
            </div>

            {/* Expand / View All button & Thumbnail row */}
            <div className="space-y-3 pt-3 border-t border-[#CCCCCC]/30">
              <button
                onClick={() => openGalleryModal("The Open Run 2025 – Graphic & Brand Design", "Visual Branding & Graphic Design", openRunDesignImages, 0)}
                className="w-full py-2 bg-[#FAF9F6] border border-[#CCCCCC] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#111111] cursor-pointer"
              >
                <i className="fa-solid fa-expand text-xs"></i>
                <span>View Full Design Suite ({openRunDesignImages.length})</span>
              </button>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                {openRunDesignImages.slice(0, 6).map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => openGalleryModal("The Open Run 2025 – Graphic & Brand Design", "Visual Branding & Graphic Design", openRunDesignImages, idx)}
                    className="aspect-square rounded overflow-hidden border border-[#CCCCCC]/60 hover:border-[#111111] hover:scale-105 transition-all group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={`Open Run Design Thumb ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLLAGE 2: PHOTOGRAPHY (BELOW) */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CCCCCC]/60 flex flex-col justify-between space-y-4">
            <div className="space-y-1 border-b border-[#CCCCCC]/30 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-narrow text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fa-solid fa-camera text-[#111111]"></i>
                    Event Photography & Race Coverage ({openRunPhotoImages.length} Shots)
                  </h4>
                  <p className="font-sans text-[10px] text-[#5E5E5E]">
                    Hover over cards to trigger bounce animation; click photo to expand.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#5E5E5E] hidden sm:inline-block">HOVER / CLICK</span>
              </div>
              <p className="font-sans text-[11px] text-[#666666] line-clamp-2">
                Live track action, finish-line celebrations, award presentations & backstage operations.
              </p>
            </div>

            {/* Bounce Cards Display (Desktop: BounceCards, Mobile: Stack) */}
            <div className="w-full flex justify-center items-center py-4 overflow-hidden min-h-[250px]">
              <Suspense fallback={<GallerySkeleton height="240px" />}>
                {/* Desktop & Tablet view: BounceCards */}
                <div className="hidden sm:flex justify-center items-center">
                  <BounceCards
                    images={openRunPhotoImagesTop5}
                    containerWidth={280}
                    containerHeight={240}
                    animationDelay={0.15}
                    animationStagger={0.06}
                    transformStyles={bounceTransformStyles}
                    onCardClick={(idx) => openGalleryModal("The Open Run 2025 – Event Photography", "Event Operations & Photography", openRunPhotoImages, idx)}
                  />
                </div>

                {/* Mobile view: Stack component */}
                <div className="flex sm:hidden justify-center items-center h-[230px] w-[200px] relative my-2">
                  <Stack
                    cards={openRunPhotoCards}
                    randomRotation={true}
                    sendToBackOnClick={true}
                    sensitivity={120}
                  />
                </div>
              </Suspense>
            </div>

            {/* Expand / View All button & Thumbnail row */}
            <div className="space-y-3 pt-3 border-t border-[#CCCCCC]/30">
              <button
                onClick={() => openGalleryModal("The Open Run 2025 – Event Photography", "Event Operations & Photography", openRunPhotoImages, 0)}
                className="w-full py-2 bg-[#FAF9F6] border border-[#CCCCCC] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#111111] cursor-pointer"
              >
                <i className="fa-solid fa-expand text-xs"></i>
                <span>View Full Photo Gallery ({openRunPhotoImages.length})</span>
              </button>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                {openRunPhotoImages.slice(0, 6).map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => openGalleryModal("The Open Run 2025 – Event Photography", "Event Operations & Photography", openRunPhotoImages, idx)}
                    className="aspect-square rounded overflow-hidden border border-[#CCCCCC]/60 hover:border-[#111111] hover:scale-105 transition-all group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={`Open Run Photo Thumb ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLLAGE 2: ORGANIZER OF MISS & MISTER OU 2025 */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="border-b border-[#CCCCCC]/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111] flex items-center gap-2.5">
              <i className="fa-solid fa-crown text-base text-[#111111]"></i>
              Organizer of Miss & Mister OU 2025
            </h3>
            <span className="px-3 py-1 bg-white border border-[#111111]/20 font-narrow text-[11px] font-bold uppercase tracking-wider rounded text-[#111111] flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-users text-[#111111] text-xs"></i>
              Event Operations & Backstage Team
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
            Organizing team assistant leading backstage logistics, media team setup, and contestant photo shooting for Miss & Mister OU 2025. Generated over 1,000+ online & offline audience interactions.
          </p>
        </div>

        {/* Bounce Card above & Gallery below (Cốm Gừng Style) */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#CCCCCC]/60 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="font-narrow text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-layer-group text-[#111111]"></i>
                  Backstage Operations & Organizing Team Gallery ({missMisterImages.length} Shots)
                </h4>
                <p className="font-sans text-[10px] text-[#5E5E5E]">
                  Hover over cards to trigger bounce animation; click photo to expand.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#5E5E5E] hidden sm:inline-block">HOVER / CLICK</span>
            </div>

            {/* Bounce Cards Display (Desktop: BounceCards, Mobile: Stack) */}
            <div className="flex justify-center items-center py-4 overflow-hidden min-h-[250px]">
              <Suspense fallback={<GallerySkeleton height="240px" />}>
                {/* Desktop & Tablet view: BounceCards */}
                <div className="hidden sm:flex justify-center items-center">
                  <BounceCards
                    images={missMisterImagesTop5}
                    containerWidth={280}
                    containerHeight={240}
                    animationDelay={0.15}
                    animationStagger={0.06}
                    transformStyles={bounceTransformStyles}
                    onCardClick={(idx) => openGalleryModal("Miss & Mister OU 2025", "Event Operations & Backstage Team", missMisterImages, idx)}
                  />
                </div>

                {/* Mobile view: Stack component */}
                <div className="flex sm:hidden justify-center items-center h-[230px] w-[200px] relative my-2">
                  <Stack
                    cards={missMisterStackCards}
                    randomRotation={true}
                    sendToBackOnClick={true}
                    sensitivity={120}
                  />
                </div>
              </Suspense>
            </div>
          </div>

          {/* Expand / View All button & Thumbnail row below */}
          <div className="space-y-3 pt-3 border-t border-[#CCCCCC]/30">
            <button
              onClick={() => openGalleryModal("Miss & Mister OU 2025", "Event Operations & Backstage Team", missMisterImages, 0)}
              className="w-full py-2 bg-[#FAF9F6] border border-[#CCCCCC] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#111111] cursor-pointer"
            >
              <i className="fa-solid fa-expand text-xs"></i>
              <span>View Full Miss & Mister OU Gallery ({missMisterImages.length})</span>
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {missMisterImages.slice(5).map((src, idx) => {
                const actualIndex = idx + 5;
                const photoNum = actualIndex + 1;
                return (
                  <div
                    key={actualIndex}
                    onClick={() => openGalleryModal("Miss & Mister OU 2025", "Event Operations & Backstage Team", missMisterImages, actualIndex)}
                    className="group relative rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-md hover:border-[#111111] transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#EBEBEB]">
                      <img
                        src={src}
                        alt={`Miss Mister OU ${photoNum}`}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 pointer-events-none"
                      />
                    </div>
                    <div className="p-2.5 bg-white flex items-center justify-between border-t border-[#CCCCCC]/30 pointer-events-none">
                      <span className="font-narrow text-[11px] font-bold text-[#111111] uppercase tracking-wider truncate">
                        Photo {photoNum < 10 ? `0${photoNum}` : photoNum}
                      </span>
                      <i className="fa-solid fa-expand text-[10px] text-[#5E5E5E] group-hover:text-[#111111]"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLLAGE 3: DESIGN SHORT FILM POSTER, LEAFLET & BROCHURE */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="border-b border-[#CCCCCC]/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111] flex items-center gap-2.5">
              <i className="fa-solid fa-scroll text-base text-[#111111]"></i>
              Design Short Film Poster, Leaflet & Brochure
            </h3>
            <span className="px-3 py-1 bg-white border border-[#111111]/20 font-narrow text-[11px] font-bold uppercase tracking-wider rounded text-[#111111] flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-file-pdf text-xs"></i>
              International Admission Campaign 2026
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
            Designed comprehensive student recruitment media collateral, including short film teaser posters, credit-transfer program leaflets, and international admission brochures.
          </p>

          {/* Social Links for Short Film Posters */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/share/p/1D2Sjsapz5/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#111111]"
            >
              <i className="fa-brands fa-facebook text-blue-600"></i>
              <span>Teasing Poster</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>

            <a
              href="https://www.facebook.com/share/v/14errw88FvY/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#111111]"
            >
              <i className="fa-solid fa-play text-red-600 text-xs"></i>
              <span>Ep1 Short Film</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>
        </div>

        {/* Collage Display: Grid of Posters, Leaflets & Brochures */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {admissionCampaignImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal(item.title, item.category, admissionCampaignImageUrls, idx)}
              className="group relative rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F4F3EF]">
                <img
                  src={item.src}
                  alt={`${item.title} ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
              <div className="p-2.5 bg-white border-t border-[#CCCCCC]/30 space-y-0.5 pointer-events-none">
                <span className="font-narrow text-[10px] font-bold text-[#5E5E5E] uppercase tracking-wider block">
                  {item.category}
                </span>
                <p className="font-narrow text-xs font-bold text-[#111111] uppercase truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REMAINING SECTION 1: DESIGN SOCIAL POST (BASIC DISPLAY) */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CCCCCC]/30 pb-3">
          <div>
            <h4 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#111111] flex items-center gap-2">
              <i className="fa-brands fa-facebook text-base text-[#111111]"></i>
              Design Social Post
            </h4>
            <p className="font-sans text-xs text-[#5E5E5E]">
              Key visual social media graphics created for student engagement campaigns.
            </p>
          </div>

          <a
            href="https://www.facebook.com/share/p/1BhJr3XouG/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-[#111111] text-white hover:bg-[#333333] transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            <span>View FB Social Post</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {socialPostImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal(`Design Social Post 0${idx + 1}`, "Key Visual Media Graphic", socialPostImages, idx)}
              className="group relative aspect-square rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={src}
                alt={`Social post ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <i className="fa-solid fa-expand text-white text-sm"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REMAINING SECTION 2: EVENT PHOTOGRAPHER (BASIC DISPLAY) */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="border-b border-[#CCCCCC]/30 pb-3">
          <h4 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#111111] flex items-center gap-2">
            <i className="fa-solid fa-camera-retro text-base text-[#111111]"></i>
            Event Photographer
          </h4>
          <p className="font-sans text-xs text-[#5E5E5E]">
            Official seminar & talk show photography coverage for Tọa Đàm Khởi Nghiệp and Tọa Đàm Khởi Nghiệp Thành Công.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {eventPhotoImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal(item.title, "Official Event Photography", eventPhotoImageUrls, idx)}
              className="group relative aspect-video rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={item.src}
                alt={`${item.title} ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 pointer-events-none"
              />
              <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent text-white text-[9px] font-narrow uppercase tracking-wider truncate opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REMAINING SECTION 3: SELECTED WEBSITE CONTENTS & SOCIAL MEDIA POSTS */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="border-b border-[#CCCCCC]/30 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#111111] flex items-center gap-2">
              <i className="fa-solid fa-newspaper text-base text-[#111111]"></i>
              Some Selected Website Contents & Social Media Posts
            </h4>
            <p className="font-sans text-xs text-[#5E5E5E]">
              Published news articles, press releases, and editorial photography for Ho Chi Minh City Open University (OU NEWS).
            </p>
          </div>

          {/* Links to Google Sheets Databases */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://docs.google.com/spreadsheets/d/1TPeM_Xa9rWOBqELEY6hteWd515KmewoIfGflx01q2D8/edit?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#111111]"
            >
              <i className="fa-solid fa-table text-emerald-600"></i>
              <span>Article Log 01</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>

            <a
              href="https://docs.google.com/spreadsheets/d/1o9lYNlDCFvIEOIC3fsdKbm2OAz1I1-uFOl9VoCVvs58/edit?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#111111]"
            >
              <i className="fa-solid fa-table text-emerald-600"></i>
              <span>Article Log 02 (Details)</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>
        </div>

        {/* Clean Article List */}
        <div className="space-y-3">
          {pressArticles.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-white rounded-lg border border-[#CCCCCC]/60 hover:border-[#111111] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#FAF9F6] border border-[#CCCCCC]/60 text-[#111111] rounded">
                    {article.date}
                  </span>
                  <span className="font-narrow text-[10px] font-bold uppercase tracking-wider text-[#5E5E5E]">
                    {article.type}
                  </span>
                  <span className="text-[#CCCCCC]">•</span>
                  <span className="font-narrow text-[10px] font-medium text-[#5E5E5E]">
                    By {article.author}
                  </span>
                </div>
                <h5 className="font-sans text-xs sm:text-sm font-semibold text-[#111111] leading-snug group-hover:text-black">
                  {article.title}
                </h5>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FAF9F6] border border-[#CCCCCC] hover:bg-[#111111] hover:text-white transition-all rounded font-narrow text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#111111] flex-shrink-0"
              >
                <span>Read Article</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FULL GALLERY POPUP MODAL (LARGE CENTERED VIEW) */}
      {galleryModal.isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md" onClick={closeGalleryModal}>
            <div className="relative w-full max-w-6xl bg-[#111111]/95 text-white border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 flex flex-col justify-between max-h-[92vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div>
                  <span className="font-narrow text-[11px] font-black text-[#00f2fe] tracking-[0.2em] uppercase block">
                    {galleryModal.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase text-white tracking-wide">
                    {galleryModal.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/70 bg-white/10 px-3 py-1 rounded border border-white/15">
                    {galleryModal.currentIndex + 1} / {galleryModal.images.length}
                  </span>
                  <button
                    onClick={closeGalleryModal}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center text-white cursor-pointer border border-white/20"
                    aria-label="Close modal"
                  >
                    <i className="fa-solid fa-xmark text-sm pointer-events-none"></i>
                  </button>
                </div>
              </div>

              {/* Large Centered Image Container */}
              <div className="relative flex-1 flex items-center justify-between my-2 min-h-[300px] max-h-[76vh] overflow-hidden">
                {galleryModal.images.length > 1 && (
                  <button
                    onClick={prevGalleryImage}
                    className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-20 shadow-lg border border-white/20 cursor-pointer flex items-center justify-center shrink-0"
                    aria-label="Previous photo"
                  >
                    <i className="fa-solid fa-chevron-left text-base sm:text-lg pointer-events-none"></i>
                  </button>
                )}

                <div className="flex-1 flex items-center justify-center h-full px-2 overflow-hidden">
                  <img
                    src={galleryModal.images[galleryModal.currentIndex]}
                    alt={`Gallery ${galleryModal.currentIndex + 1}`}
                    className="max-h-[74vh] max-w-full w-auto object-contain rounded-lg shadow-xl border border-white/10 pointer-events-none"
                  />
                </div>

                {galleryModal.images.length > 1 && (
                  <button
                    onClick={nextGalleryImage}
                    className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] transition-all z-20 shadow-lg border border-white/20 cursor-pointer flex items-center justify-center shrink-0"
                    aria-label="Next photo"
                  >
                    <i className="fa-solid fa-chevron-right text-base sm:text-lg pointer-events-none"></i>
                  </button>
                )}
              </div>

              {/* Bottom Thumbnail Strip */}
              {galleryModal.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-white/15">
                  {galleryModal.images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryModal((prev) => ({ ...prev, currentIndex: idx }))}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${galleryModal.currentIndex === idx
                        ? 'border-[#00f2fe] scale-105 shadow-lg opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white'
                        }`}
                    >
                      <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* SINGLE IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
