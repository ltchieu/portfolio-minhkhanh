export interface VideoItem {
  stt: number;
  title: string;
  url: string;
  platform: 'TikTok' | 'Facebook' | 'Google Drive';
  embedUrl?: string;
  thumbnail?: string;
}

export interface MarketingExecutiveBrand {
  id: string;
  brand: string;
  category: string;
  description: string;
  displayType: 'circular' | 'grid' | 'film';
  videos: VideoItem[];
}
