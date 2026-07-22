import { useMemo, memo } from 'react';
import './InfiniteMarquee.css';

export interface MarqueeItem {
  id: string;
  img: string;
  title?: string;
  subtitle?: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  onItemClick?: (item: MarqueeItem) => void;
  className?: string;
}

function InfiniteMarquee({
  items,
  speed = 35,
  onItemClick,
  className = ''
}: InfiniteMarqueeProps) {
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className={`infinite-marquee-container ${className}`}>
      <div
        className="infinite-marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="infinite-marquee-item cursor-pointer group"
            onClick={() => onItemClick?.(item)}
          >
            <div className="relative overflow-hidden rounded-xl bg-[#111111] border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-white/30">
              <img
                src={item.img}
                alt={item.title || 'Campaign Visual'}
                className="h-56 md:h-64 object-cover w-auto max-w-[380px]"
                loading="lazy"
                decoding="async"
              />
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <span className="font-narrow text-xs font-black uppercase text-white tracking-widest">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="font-mono text-[10px] text-white/70 tracking-wider">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(InfiniteMarquee);
