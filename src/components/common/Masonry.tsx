import { useEffect, useLayoutEffect, useMemo, useRef, useState, RefObject, memo, CSSProperties } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';
import type { MasonryItem, MasonryProps } from '../../models/masonry';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = (): [RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    let rafId: number | null = null;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const roundedW = Math.round(width);
      const roundedH = Math.round(height);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setSize(prev => {
          if (Math.abs(prev.width - roundedW) < 2 && Math.abs(prev.height - roundedH) < 2) return prev;
          return { width: roundedW, height: roundedH };
        });
      });
    });

    ro.observe(ref.current);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return [ref, size];
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.04,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  colorShiftOnHover = false,
  onItemClick
}: MasonryProps) => {
  const queries = useMemo(
    () => ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    []
  );
  const values = useMemo(() => [5, 4, 3, 2], []);
  const columns = useMedia(queries, values, 1);

  const [containerRef, { width }] = useMeasure();

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const maxContainerHeight = useMemo(() => {
    if (!grid.length) return 600;
    return Math.max(...grid.map(item => item.y + item.h)) + 20;
  }, [grid]);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y + 40 };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -100 };
      case 'bottom':
        return { x: item.x, y: item.y + 100 };
      case 'left':
        return { x: -100, y: item.y };
      case 'right':
        return { x: window.innerWidth + 100, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 60 };
    }
  };

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          duration: duration,
          ease: ease,
          delay: Math.min(index * stagger, 0.4)
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, stagger, animateFrom, duration, ease]);

  const handleItemClick = (item: (typeof grid)[0]) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener');
    }
  };

  return (
    <div ref={containerRef} className="list" style={{ minHeight: `${maxContainerHeight}px` }}>
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => handleItemClick(item)}
            style={
              {
                '--hover-scale': scaleOnHover ? hoverScale : 1
              } as CSSProperties
            }
          >
            <div className="item-img">
              <img
                src={item.img}
                alt={item.title || item.subtitle || 'Masonry item'}
                className="w-full h-full object-cover rounded-[10px]"
                loading="lazy"
                decoding="async"
              />
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '10px',
                    transition: 'opacity 0.3s ease'
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Masonry);
