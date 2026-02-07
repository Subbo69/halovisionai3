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
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.75}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-36 md:pt-40 pb-16 overflow-hidden">
      {/* Background Image */}
      <div ref={bgRef} className="hero-bg absolute inset-0 will-change-transform" />

      {/* VERY LIGHT overlay — optional, remove if you want zero dimming */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0))',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-black mt-10">
          {t.heroTitle}
        </h1>

        <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mb-14">
          {t.heroSubtitle}
        </p>

        {/* 🎥 VIDEO */}
        <div className="w-full max-w-4xl mb-12 mt-6">
          <div
            className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              src="https://www.kapwing.com/e/69626d81f38c02bfe76a52c0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin"
              title="Hero Video"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>

        <div className="flex justify-center mb-6 w-full">
          <button
            onClick={onBookingClick}
            className="bg-black text-white px-8 py-4 rounded-full text-lg flex items-center gap-3 shadow-lg hover:bg-gray-800 transition-transform hover:scale-[1.06]"
          >
            <span>{t.startJourney}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onAskAIClick}
          className="text-black flex items-center gap-2 hover:text-gray-600 transition-colors text-[130%]"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.askAI}</span>
        </button>
      </div>

      <style>{`
        .hero-bg {
          background-image: url('https://images.hdqwalls.com/wallpapers/neon-half-circle-q7.jpg');
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
