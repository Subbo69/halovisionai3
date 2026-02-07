import { ArrowRight } from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { useEffect } from 'react';

interface WorkWithUsProps {
  onBookingClick: () => void;
  language: Language;
}

export default function WorkWithUs({ onBookingClick, language }: WorkWithUsProps) {
  const t = translations[language];

  // Inject keyframes once
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes lightSpin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="relative py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          {t.workWithUs}
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          {t.workWithUsDesc}
        </p>

        {/* 🔥 Light-string border button */}
        <div className="relative inline-block">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-full p-[2px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, #ef4444 20%, #f97316 35%, #ef4444 50%, transparent 70%)',
                animation: 'lightSpin 2.5s linear infinite',
              }}
            />
          </div>

          {/* Inner mask */}
          <button
            onClick={onBookingClick}
            className="
              relative
              rounded-full
              bg-black
              px-8
              py-4
              text-lg
              font-semibold
              flex
              items-center
              gap-3
              text-white
              hover:scale-105
              active:scale-95
              transition-transform
              duration-200
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
