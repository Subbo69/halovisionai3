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

  /* 🔁 PARALLAX EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.75}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[150vh] flex flex-col items-center pt-28 md:pt-32 pb-32 overflow-hidden bg-black">
      {/* Shared Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform z-0"
        style={{
          backgroundImage: "url('https://images.hdqwalls.com/wallpapers/neon-half-circle-q7.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '120%',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Mobile-specific background zoom adjustment */}
      <style>{`
        @media (max-width: 768px) {
          .hero-bg {
            background-size: 140% !important;
          }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full text-center flex flex-col items-center z-10">
        {/* Sticky Text Container */}
        <div className="sticky top-28 md:top-32 mb-[45vh] md:mb-[40vh]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-md mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        {/* 🎥 VIDEO — 7% smaller */}
        <div className="w-full mb-12" style={{ maxWidth: '93%' }}>
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
              muted
            />
          </div>
        </div>

        {/* Buttons below video */}
        <div className="flex justify-center mb-6 w-full">
          <button
            onClick={onBookingClick}
            className="bg-black/70 text-white px-8 py-4 rounded-full text-lg flex items-center gap-3 shadow-lg hover:bg-black/80 transition-transform hover:scale-[1.06]"
          >
            <span>{t.startJourney}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={onAskAIClick}
          className="text-white flex items-center gap-2 hover:text-white/70 transition-colors text-[130%] drop-shadow mx-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.askAI}</span>
        </button>
      </div>
    </section>
  );
}