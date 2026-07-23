import { memo } from 'react';
import ScrollReveal from './ScrollReveal';
import type { JobHeroSectionProps } from '../../models/jobHeroSection';

export const JobHeroSection = memo(function JobHeroSection({
  japaneseBackgroundText,
  categoryText,
  timeframe,
  title,
  description,
  tags,
  metrics,
}: JobHeroSectionProps) {
  return (
    <section className="relative pt-16 pb-20 border-b border-[#CCCCCC]/40 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#F4F3EF] to-[#FAF9F6]">
      {japaneseBackgroundText && (
        <div className="absolute right-8 top-12 select-none pointer-events-none opacity-5 font-display text-8xl md:text-9xl text-[#111111] writing-vertical hidden lg:block tracking-widest">
          {japaneseBackgroundText}
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6">
        <ScrollReveal direction="up" distance={30}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.25em] uppercase block">
                  {categoryText}
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-narrow text-xs font-bold text-[#111111] tracking-widest uppercase">
                  {timeframe}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-[#111111] leading-[1.05]">
                {title}
              </h1>

              <div className="font-sans text-lg sm:text-xl text-[#5E5E5E] max-w-3xl leading-relaxed">
                {description}
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs bg-white border border-[#CCCCCC]/60 px-3 py-1.5 rounded text-[#111111] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-5 rounded shadow-sm transition-all ${
                    metric.darkBg
                      ? 'bg-[#111111] text-white'
                      : 'bg-white border border-[#CCCCCC]/50 hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-narrow text-xs font-bold uppercase tracking-wider ${
                        metric.darkBg ? 'text-white/70' : 'text-[#5E5E5E]'
                      }`}
                    >
                      {metric.label}
                    </span>
                    {metric.icon && (
                      <i
                        className={`${metric.icon} text-xs ${
                          metric.darkBg ? 'text-white' : 'text-[#111111]'
                        }`}
                      ></i>
                    )}
                  </div>
                  <span
                    className={`font-display text-2xl sm:text-3xl ${
                      metric.darkBg ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    {metric.value}
                  </span>
                  {metric.note && (
                    <p
                      className={`font-sans text-xs mt-1 ${
                        metric.darkBg ? 'text-white/60' : 'text-[#5E5E5E]'
                      }`}
                    >
                      {metric.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default JobHeroSection;
