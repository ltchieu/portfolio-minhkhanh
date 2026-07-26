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

export interface KolContent {
  id: number;
  kol: string;
  url?: string;
  videoId?: string;
  author?: string;
  embedUrl?: string;
  platform?: 'TikTok' | 'Facebook' | 'YouTube' | 'Instagram';
}

export interface SocialPostContent {
  id: number;
  title: string;
  url: string;
  platform?: 'Facebook' | 'TikTok' | 'Instagram';
}

export interface MarketingExecutiveCampaignData {
  canvaUrl: string;
  iwdCampaign: {
    title: string;
    kols: KolContent[];
    proteaPosts: SocialPostContent[];
  };
}

