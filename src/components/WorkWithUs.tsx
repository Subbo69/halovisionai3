import { ArrowRight } from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { useEffect, useRef, useState } from 'react';

interface WorkWithUsProps {
  onBookingClick: () => void;
  language: Language;
}

export default function WorkWithUs({ onBookingClick, language }: WorkWithUsProps) {
  const t = translations[language];
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  /* ---------- Inject lightning animation ---------- */
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes lightningOrbit {
        0% {
          transform: rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        60% {
          transform: rotate(320deg);
        }
        100% {
          transform: rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /* ---------- Trigger once on scroll ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.6 }
    );

    if (buttonWrapperRef.current) observer.observe(buttonWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          {t.workWithUs}
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          {t.workWithUsDesc}
        </p>

        {/* BUTTON WRAPPER */}
        <div ref={buttonWrapperRef} className="relative inline-block">
          {/* LIGHTNING ORBIT */}
          {animate && (
            <div
              className="absolute inset-[-6px] rounded-full pointer-events-none"
              style={{
                background: `
                  conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    rgba(168,85,247,0.0) 40deg,
                    rgba(168,85,247,0.9) 60deg,
                    rgba(249,115,22,1) 90deg,
                    rgba(249,115,22,0.0) 120deg,
                    transparent 360deg
                  )
                `,
                animation: 'lightningOrbit 0.9s cubic-bezier(0.2, 0.8, 0.3, 1) forwards',
                filter: 'blur(1px)',
              }}
            />
          )}

          {/* BUTTON */}
          <button
            onClick={onBookingClick}
            className="
              relative
              bg-white text-black
              px-8 py-4
              rounded-full
              text-lg font-semibold
              flex items-center gap-3
              transition-all duration-200 ease-out
              hover:scale-105
              active:scale-95
              shadow-xl
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
