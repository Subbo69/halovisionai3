import { ArrowRight } from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { useEffect, useRef, useState } from 'react';

interface WorkWithUsProps {
  onBookingClick: () => void;
  language: Language;
}

export default function WorkWithUs({ onBookingClick, language }: WorkWithUsProps) {
  const t = translations[language];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(-90); // Start from top

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start animation
            let startTime: number | null = null;
            const duration = 2800; // 40% slower (2000 * 1.4 = 2800ms)

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Smoother ease in-out cubic for better acceleration/deceleration
              const eased = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              
              // Start from -90deg (top) and go to 270deg (full rotation back to top)
              setAnimationProgress(-90 + (eased * 360));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // After animation completes, hide the light
                setTimeout(() => {
                  setAnimationProgress(-90);
                }, 100);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          {t.workWithUs}
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          {t.workWithUsDesc}
        </p>

        {/* White light-string border button */}
        <div className="relative inline-block">
          {/* Animated white gradient border - OUTSIDE the button */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              padding: '3px',
              transform: 'scale(1.15)',
            }}
          >
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(from ${animationProgress}deg, transparent 0%, transparent 65%, rgba(255,255,255,0.4) 78%, #ffffff 85%, rgba(255,255,255,0.4) 92%, transparent 100%)`,
                filter: 'blur(3px)',
                opacity: hasAnimated && animationProgress > -90 ? 1 : 0,
                transition: 'opacity 0.2s ease-out',
              }}
            />
          </div>

          {/* White button */}
          <button
            onClick={onBookingClick}
            className="
              relative
              rounded-full
              bg-white
              px-8
              py-4
              text-lg
              font-semibold
              flex
              items-center
              gap-3
              text-black
              hover:scale-105
              active:scale-95
              transition-transform
              duration-200
              shadow-lg
            "
          >
            <span>{t.bookCall}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}