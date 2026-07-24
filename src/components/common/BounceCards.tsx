import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';
import type { BounceCardsProps } from '../../models/bounceCards';

interface ParsedTransform {
  rotate: number;
  x: number;
  y: number;
}

function parseTransformStr(str: string): ParsedTransform {
  let rotate = 0;
  let x = 0;
  let y = 0;

  const rotateMatch = str.match(/rotate\(([-0-9.]+)deg\)/);
  if (rotateMatch) {
    rotate = parseFloat(rotateMatch[1]);
  }

  const translateMatch = str.match(/translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/);
  if (translateMatch) {
    x = parseFloat(translateMatch[1]);
    if (translateMatch[2]) {
      y = parseFloat(translateMatch[2]);
    }
  }

  return { rotate, x, y };
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true,
  onCardClick
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeHoverRef = useRef<number | null>(null);

  // Pre-parse base transform numerical values for fast GSAP hardware interpolation
  const parsedBaseTransforms = useMemo(() => {
    return images.map((_, i) => {
      const styleStr = transformStyles[i] || 'none';
      return parseTransformStr(styleStr);
    });
  }, [images, transformStyles]);

  // Initial entry animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const base = parsedBaseTransforms[i] || { rotate: 0, x: 0, y: 0 };
        gsap.fromTo(
          `.card-${i}`,
          { scale: 0, opacity: 0, x: base.x, y: base.y, rotate: base.rotate },
          {
            scale: 1,
            opacity: 1,
            x: base.x,
            y: base.y,
            rotate: base.rotate,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
            duration: 0.8
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images, parsedBaseTransforms, animationStagger, easeType, animationDelay]);

  const pushSiblings = useCallback(
    (hoveredIdx: number) => {
      if (!enableHover || !containerRef.current) return;
      if (activeHoverRef.current === hoveredIdx) return;
      activeHoverRef.current = hoveredIdx;

      const q = gsap.utils.selector(containerRef);

      images.forEach((_, i) => {
        const target = q(`.card-${i}`);
        const base = parsedBaseTransforms[i] || { rotate: 0, x: 0, y: 0 };

        if (i === hoveredIdx) {
          gsap.to(target, {
            x: base.x,
            y: base.y - 12,
            rotate: 0,
            scale: 1.1,
            zIndex: 40,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          const offsetX = i < hoveredIdx ? -140 : 140;
          gsap.to(target, {
            x: base.x + offsetX,
            y: base.y,
            rotate: base.rotate,
            scale: 0.95,
            zIndex: 10 - Math.abs(hoveredIdx - i),
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    },
    [enableHover, images, parsedBaseTransforms]
  );

  const resetSiblings = useCallback(() => {
    if (!enableHover || !containerRef.current) return;
    if (activeHoverRef.current === null) return;
    activeHoverRef.current = null;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      const base = parsedBaseTransforms[i] || { rotate: 0, x: 0, y: 0 };

      gsap.to(target, {
        x: base.x,
        y: base.y,
        rotate: base.rotate,
        scale: 1,
        zIndex: i + 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }, [enableHover, images, parsedBaseTransforms]);

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      onMouseLeave={resetSiblings}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => {
        const base = parsedBaseTransforms[idx] || { rotate: 0, x: 0, y: 0 };
        return (
          <div
            key={idx}
            className={`card card-${idx}`}
            style={{
              transform: `translate(${base.x}px, ${base.y}px) rotate(${base.rotate}deg)`,
              zIndex: idx + 1
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onClick={() => onCardClick?.(idx)}
          >
            <img className="image" src={src} alt={`card-${idx}`} decoding="async" />
          </div>
        );
      })}
    </div>
  );
}
