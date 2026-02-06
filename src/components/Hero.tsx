import { ArrowRight, Sparkles } from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { useEffect, useRef } from 'react';

interface HeroProps {
  onBookingClick: () => void;
  onAskAIClick: () => void;
  language: Language;
}

export default function Hero({ onBookingClick, onAskAIClick, language }: HeroProps) {
  const t = translations[language];
  const bgRef = useRef<HTMLDivElement>(null);

  /* 🔁 STRONGER PARALLAX EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 md:pt-32 pb-16 overflow-hidden">
      {/* Background with Parallax */}
      <div ref={bgRef} className="hero-bg absolute inset-0 will-change-transform" />
      <div className="absolute inset-0 bg-white/50" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full text-center flex flex-col items-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-black">
          {t.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mb-8">
          {t.heroSubtitle}
        </p>

        {/* 🎥 VIDEO — KAPWING */}
        <div className="w-full max-w-2xl mb-6">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.kapwing.com/e/69626d81f38c02bfe76a52c0"
              allow="autoplay; gyroscope;"
              allowFullScreen
              referrerPolicy="strict-origin"
              title="Embedded content made on Kapwing"
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        </div>

        {/* CTA — UNDER VIDEO */}
        <div className="flex justify-center mb-6 w-full">
          <button
            onClick={onBookingClick}
            className="
              bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full
              text-base md:text-lg flex items-center gap-3
              shadow-lg hover:bg-gray-800
              transition-transform duration-300 ease-out
              hover:scale-[1.04]
            "
          >
            <span>{t.startJourney}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Ask AI */}
        <button
          onClick={onAskAIClick}
          className="text-black flex items-center gap-2 hover:text-gray-600 transition-colors text-[130%]"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.askAI}</span>
        </button>
      </div>

      {/* STYLES */}
      <style>{`
        .hero-bg {
          background-image: url('https://cdn.wallpapersafari.com/1/45/dWgLom.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 110%;
        }

        @media (max-width: 768px) {
          .hero-bg {
            background-position: center 35%;
          }
        }
      `}</style>
    </section>
  );
}
