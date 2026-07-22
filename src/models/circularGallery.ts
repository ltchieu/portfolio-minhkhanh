export interface CircularGalleryItem {
  image: string;
  text: string;
  url?: string;
  platform?: 'TikTok' | 'Facebook' | 'Google Drive';
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onSelectItem?: (item: CircularGalleryItem) => void;
}
