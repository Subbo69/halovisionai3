import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface HeaderProps {
  onBookingClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ onBookingClick, language, onLanguageChange }: HeaderProps) {
  const t = translations[language];
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/anurati" rel="stylesheet" />

      {/* ✅ Fully transparent header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
          
          {/* HALOVISION Branding */}
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
            onClick={onBookingClick}
            style={{ marginLeft: '-5px' }}
          >
            <span
              className="
                text-transparent bg-clip-text
                bg-gradient-to-r from-black to-black
                drop-shadow-[0_0_6px_rgba(255,255,255,0.55)]
                font-bold select-none
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              "
              style={{
                fontFamily: 'Anurati, sans-serif',
                letterSpacing: '0.02em',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              HALOVISION AI
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1 text-black hover:opacity-70 transition-opacity text-sm md:text-base"
              >
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showLanguageMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[100px] z-50">
                    <button
                      onClick={() => {
                        onLanguageChange('en');
                        setShowLanguageMenu(false);
                      }}
                      className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-xs"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        onLanguageChange('de');
                        setShowLanguageMenu(false);
                      }}
                      className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-xs"
                    >
                      DE
                    </button>
                    <button
                      onClick={() => {
                        onLanguageChange('fr');
                        setShowLanguageMenu(false);
                      }}
                      className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-xs"
                    >
                      FR
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Booking Button */}
            <button
              onClick={onBookingClick}
              className="
                bg-black text-white
                px-3 md:px-6 py-2 md:py-3
                rounded-full flex items-center gap-2
                hover:bg-gray-800 transition-colors
                text-xs md:text-base whitespace-nowrap
                shadow-lg
              "
            >
              <span>{t.letsTalk}</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
