import { memo } from 'react';
import type { GallerySkeletonProps } from '../../models/gallerySkeleton';

export const GallerySkeleton = memo(function GallerySkeleton({
  height = '450px',
  title = 'Loading Visuals...',
}: GallerySkeletonProps) {
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
});

export default GallerySkeleton;
