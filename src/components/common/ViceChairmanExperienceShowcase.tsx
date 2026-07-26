import { useState, useMemo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ImageLightboxModal from './ImageLightboxModal';
import { viceChairmanData } from '../../data/viceChairmanData';
import type { LightboxImageData } from '../../models/imageLightboxModal';

// Vite eager glob for all activity images
const activityRawImages = import.meta.glob<string>(
  '/assets/image/Activities/**/*.{webp,jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

// Helper function to extract images matching subfolder paths
const getImagesForPath = (pathSubstr: string): string[] => {
  const normalizedSearch = pathSubstr.replace(/\\/g, '/').toLowerCase();
  return Object.keys(activityRawImages)
    .filter((key) => key.replace(/\\/g, '/').toLowerCase().includes(normalizedSearch))
    .map((key) => activityRawImages[key]);
};

interface CustomGalleryModalState {
  isOpen: boolean;
  title: string;
  images: string[];
  currentIndex: number;
}

export default function ViceChairmanExperienceShowcase() {
  // Single Lightbox image state
  const [selectedImage, setSelectedImage] = useState<LightboxImageData | null>(null);

  // Full gallery popup modal state
  const [galleryModal, setGalleryModal] = useState<CustomGalleryModalState>({
    isOpen: false,
    title: '',
    images: [],
    currentIndex: 0,
  });

  // Extract images for the 4 image-based activity sections
  const spring2022Images = useMemo(() => getImagesForPath('Xuân tình nguyện 2022'), []);
  const midAutumn2022Images = useMemo(() => getImagesForPath('Trung thu tình nguyện 2022'), []);
  const ousGotTalentImages = useMemo(() => getImagesForPath("2022.08.01_OU's Got Talent"), []);
  const spring2021Images = useMemo(() => getImagesForPath('Xuân tình nguyện 2021'), []);

  const openGalleryModal = useCallback((title: string, images: string[], startIndex = 0) => {
    setGalleryModal({
      isOpen: true,
      title,
      images,
      currentIndex: startIndex,
    });
  }, []);

  const closeGalleryModal = useCallback(() => {
    setGalleryModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextGalleryImage = useCallback(() => {
    setGalleryModal((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevGalleryImage = useCallback(() => {
    setGalleryModal((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  // Keyboard navigation for full gallery modal
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
      {/* SECTION 1: WELCOME DAY 2022 */}
      <div className="bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#333333] space-y-5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="space-y-1">
            <span className="font-narrow text-xs font-black text-[#00f2fe] tracking-widest uppercase block">
              FLAGSHIP ORIENTATION EVENT
            </span>
            <h4 className="font-display text-2xl sm:text-3xl uppercase text-white tracking-tight leading-tight">
              1. {viceChairmanData.welcomeDay2022.title}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#CCCCCC] max-w-2xl">
              {viceChairmanData.welcomeDay2022.subtitle} — {viceChairmanData.welcomeDay2022.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {viceChairmanData.welcomeDay2022.driveLink && (
              <a
                href={viceChairmanData.welcomeDay2022.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#00f2fe] text-[#111111] hover:bg-white transition-colors rounded-lg text-xs font-narrow font-black tracking-wider uppercase inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <i className="fa-brands fa-google-drive text-sm pointer-events-none"></i>
                <span className="pointer-events-none">Google Drive Media</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] pointer-events-none"></i>
              </a>
            )}
            {viceChairmanData.welcomeDay2022.newsLink && (
              <a
                href={viceChairmanData.welcomeDay2022.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/15 text-white hover:bg-white hover:text-[#111111] transition-all rounded-lg text-xs font-narrow font-black tracking-wider uppercase inline-flex items-center gap-2 border border-white/20 cursor-pointer"
              >
                <i className="fa-solid fa-newspaper text-sm pointer-events-none"></i>
                <span className="pointer-events-none">Official News Article</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] pointer-events-none"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: SPRING VOLUNTEERING CAMPAIGN 2022 */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-7 space-y-5">
        <div className="border-b border-[#CCCCCC]/40 pb-4">
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-widest uppercase block">
            ANNUAL VOLUNTEER CAMPAIGN
          </span>
          <h4 className="font-display text-xl sm:text-2xl uppercase text-[#111111] tracking-tight">
            2. {viceChairmanData.springVolunteering2022.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#5E5E5E] mt-1">
            {viceChairmanData.springVolunteering2022.subtitle} — {viceChairmanData.springVolunteering2022.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {spring2022Images.slice(0, 11).map((src, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal("Spring Volunteering Campaign 2022", spring2022Images, idx)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer group relative shadow-2xs"
            >
              <img
                src={src}
                alt={`Spring Volunteering 2022 ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                <i className="fa-solid fa-magnifying-glass-plus text-sm pointer-events-none"></i>
              </div>
            </div>
          ))}

          {spring2022Images.length > 11 && (
            <div
              onClick={() => openGalleryModal("Spring Volunteering Campaign 2022", spring2022Images, 11)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#111111] text-white border border-[#111111] cursor-pointer group relative flex flex-col items-center justify-center p-2 text-center shadow-2xs hover:bg-[#222222] transition-colors"
            >
              <i className="fa-solid fa-images text-xl text-[#00f2fe] mb-1 group-hover:scale-110 transition-transform pointer-events-none"></i>
              <span className="font-narrow text-xs font-black uppercase tracking-wider pointer-events-none">
                All ({spring2022Images.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: MID-AUTUMN VOLUNTEER PROGRAM 2022 */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-7 space-y-5">
        <div className="border-b border-[#CCCCCC]/40 pb-4">
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-widest uppercase block">
            COMMUNITY OUTREACH
          </span>
          <h4 className="font-display text-xl sm:text-2xl uppercase text-[#111111] tracking-tight">
            3. {viceChairmanData.midAutumnVolunteering2022.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#5E5E5E] mt-1">
            {viceChairmanData.midAutumnVolunteering2022.subtitle} — {viceChairmanData.midAutumnVolunteering2022.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {midAutumn2022Images.slice(0, 11).map((src, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal("Mid-Autumn Volunteer Program 2022", midAutumn2022Images, idx)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer group relative shadow-2xs"
            >
              <img
                src={src}
                alt={`Mid-Autumn Volunteer ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                <i className="fa-solid fa-magnifying-glass-plus text-sm pointer-events-none"></i>
              </div>
            </div>
          ))}

          {midAutumn2022Images.length > 11 && (
            <div
              onClick={() => openGalleryModal("Mid-Autumn Volunteer Program 2022", midAutumn2022Images, 11)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#111111] text-white border border-[#111111] cursor-pointer group relative flex flex-col items-center justify-center p-2 text-center shadow-2xs hover:bg-[#222222] transition-colors"
            >
              <i className="fa-solid fa-moon text-xl text-yellow-300 mb-1 group-hover:scale-110 transition-transform pointer-events-none"></i>
              <span className="font-narrow text-xs font-black uppercase tracking-wider pointer-events-none">
                All ({midAutumn2022Images.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: OU'S GOT TALENTS 2022 */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-7 space-y-5">
        <div className="border-b border-[#CCCCCC]/40 pb-4">
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-widest uppercase block">
            TALENT & PERFORMANCE CONTEST
          </span>
          <h4 className="font-display text-xl sm:text-2xl uppercase text-[#111111] tracking-tight">
            4. {viceChairmanData.ousGotTalent2022.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#5E5E5E] mt-1">
            {viceChairmanData.ousGotTalent2022.subtitle} — {viceChairmanData.ousGotTalent2022.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ousGotTalentImages.slice(0, 11).map((src, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal("OU's Got Talents 2022", ousGotTalentImages, idx)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer group relative shadow-2xs"
            >
              <img
                src={src}
                alt={`OU's Got Talent ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                <i className="fa-solid fa-magnifying-glass-plus text-sm pointer-events-none"></i>
              </div>
            </div>
          ))}

          {ousGotTalentImages.length > 11 && (
            <div
              onClick={() => openGalleryModal("OU's Got Talents 2022", ousGotTalentImages, 11)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#111111] text-white border border-[#111111] cursor-pointer group relative flex flex-col items-center justify-center p-2 text-center shadow-2xs hover:bg-[#222222] transition-colors"
            >
              <i className="fa-solid fa-star text-xl text-amber-400 mb-1 group-hover:scale-110 transition-transform pointer-events-none"></i>
              <span className="font-narrow text-xs font-black uppercase tracking-wider pointer-events-none">
                All ({ousGotTalentImages.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: SPRING VOLUNTEERING CAMPAIGN 2021 */}
      <div className="bg-[#FAF9F6] border border-[#CCCCCC]/60 rounded-xl p-5 sm:p-7 space-y-5">
        <div className="border-b border-[#CCCCCC]/40 pb-4">
          <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-widest uppercase block">
            COMMUNITY & WALL MURAL PROJECT
          </span>
          <h4 className="font-display text-xl sm:text-2xl uppercase text-[#111111] tracking-tight">
            5. {viceChairmanData.springVolunteering2021.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#5E5E5E] mt-1">
            {viceChairmanData.springVolunteering2021.subtitle} — {viceChairmanData.springVolunteering2021.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {spring2021Images.slice(0, 11).map((src, idx) => (
            <div
              key={idx}
              onClick={() => openGalleryModal("Spring Volunteering Campaign 2021", spring2021Images, idx)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-white border border-[#CCCCCC]/60 cursor-pointer group relative shadow-2xs"
            >
              <img
                src={src}
                alt={`Spring Volunteering 2021 ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                <i className="fa-solid fa-magnifying-glass-plus text-sm pointer-events-none"></i>
              </div>
            </div>
          ))}

          {spring2021Images.length > 11 && (
            <div
              onClick={() => openGalleryModal("Spring Volunteering Campaign 2021", spring2021Images, 11)}
              className="aspect-4/3 w-full rounded-lg overflow-hidden bg-[#111111] text-white border border-[#111111] cursor-pointer group relative flex flex-col items-center justify-center p-2 text-center shadow-2xs hover:bg-[#222222] transition-colors"
            >
              <i className="fa-solid fa-paint-roller text-xl text-[#00f2fe] mb-1 group-hover:scale-110 transition-transform pointer-events-none"></i>
              <span className="font-narrow text-xs font-black uppercase tracking-wider pointer-events-none">
                All ({spring2021Images.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* FULL GALLERY POPUP MODAL */}
      {galleryModal.isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={closeGalleryModal}>
            <div className="relative w-full max-w-4xl bg-[#111111] text-white border border-[#333333] rounded-2xl p-6 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-[#333333] pb-3">
                <div>
                  <h3 className="font-display text-lg sm:text-xl uppercase text-[#FFFFFF] tracking-tight">
                    {galleryModal.title}
                  </h3>
                  <span className="font-narrow text-xs text-[#AAAAAA] uppercase tracking-wider">
                    Photo {galleryModal.currentIndex + 1} of {galleryModal.images.length}
                  </span>
                </div>
                <button
                  onClick={closeGalleryModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center text-white cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-sm pointer-events-none"></i>
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={galleryModal.images[galleryModal.currentIndex]}
                  alt={`Gallery ${galleryModal.currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />

                {galleryModal.images.length > 1 && (
                  <>
                    <button
                      onClick={prevGalleryImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center text-white border border-white/20 cursor-pointer z-10"
                    >
                      <i className="fa-solid fa-chevron-left text-sm pointer-events-none"></i>
                    </button>
                    <button
                      onClick={nextGalleryImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center text-white border border-white/20 cursor-pointer z-10"
                    >
                      <i className="fa-solid fa-chevron-right text-sm pointer-events-none"></i>
                    </button>
                  </>
                )}
              </div>

              {/* Bottom thumbnail strip */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
                {galleryModal.images.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setGalleryModal((prev) => ({ ...prev, currentIndex: idx }))}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${galleryModal.currentIndex === idx ? 'border-[#00f2fe] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* SINGLE IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
