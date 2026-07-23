import type { ReactNode } from 'react';

export interface HeroMetricCard {
  label: string;
  value: string;
  note?: string;
  icon?: string;
  darkBg?: boolean;
}

export interface JobHeroSectionProps {
  japaneseBackgroundText?: string;
  categoryText: string;
  timeframe: string;
  title: string;
  description: ReactNode;
  tags?: string[];
  metrics: HeroMetricCard[];
}
