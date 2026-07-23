export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  title?: string;
  subtitle?: string;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}
