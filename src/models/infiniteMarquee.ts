export interface MarqueeItem {
  id: string;
  img: string;
  title?: string;
  subtitle?: string;
}

export interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  onItemClick?: (item: MarqueeItem) => void;
  className?: string;
}
