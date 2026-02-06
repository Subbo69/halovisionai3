import { ArrowRight } from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { useEffect } from 'react';

interface WorkWithUsProps {
  onBookingClick: () => void;
  language: Language;
}

export default function WorkWithUs({ onBookingClick, language }: WorkWithUsProps) {
  const t = translations[language];

  // Inject keyframes for glow animation once
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes borderSweep {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="relative py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">{t.workWithUs}</h2>
        <p className="text-xl text-gray-400 mb-12">{t.workWithUsDesc}</p>

        {/* Button with red lightning border */}
        <div className="relative inline-block group">
          {/* Animated red border */}
          <div
            className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-red-500 via-red-600 to-red-500
            bg-[length:200%_100%] animate-[borderSweep_2s_linear_infinite] blur-[1px] opacity-80 group-hover:opacity-100 transition-opacity"
          ></div>

          {/* Actual button */}
          <button
            onClick={onBookingClick}
            className="relative bg-white text-black px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3
            hover:bg-gray-100 transition-colors shadow-lg"
          >
            <span>{t.bookCall}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
