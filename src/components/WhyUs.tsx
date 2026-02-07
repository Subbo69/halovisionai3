import { useState } from 'react';
import { Users, Zap, ChevronDown } from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface WhyUsProps {
  language: Language;
}

export default function WhyUs({ language }: WhyUsProps) {
  const t = translations[language];
  const [expandedReason, setExpandedReason] = useState<number | null>(null);
  const [isFounderExpanded, setIsFounderExpanded] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.hdqwalls.com/wallpapers/neon-half-circle-q7.jpg')",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Reasons */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
              {t.whyUsTitle}
            </h2>

            <div className="space-y-4">
              {t.reasons.slice(0, 4).map((reason, index) => {
                const isExpanded = expandedReason === index;

                return (
                  <div
                    key={index}
                    className="
                      backdrop-blur-md
                      bg-gray-200/20
                      border border-white/30
                      rounded-2xl
                      p-4
                      shadow-xl shadow-black/30
                      hover:shadow-2xl hover:shadow-black/40
                      transition-all
                      cursor-pointer
                    "
                    onClick={() =>
                      setExpandedReason(isExpanded ? null : index)
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="text-lg text-white font-bold drop-shadow">
                          {reason}
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-96 mt-3' : 'max-h-0'
                          }`}
                        >
                          <p className="text-white/90 leading-relaxed drop-shadow">
                            {t.reasonsDesc[index]}
                          </p>
                        </div>

                        <button
                          className="flex items-center gap-2 text-sm text-white/80 hover:text-white drop-shadow transition-colors mt-2"
                        >
                          <span>{isExpanded ? t.close : 'Open'}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Founder info */}
          <div className="backdrop-blur-md bg-gray-200/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/30">
            <div className="mb-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://i.postimg.cc/sDfZC0mH/Screenshot-20260102-094201-(1)-(1)-(1)-(1).png"
                    alt="Founder"
                    className="w-full h-full object-cover"
                    style={{
                      transform: 'scale(1.2)',
                      objectPosition: 'center 41%',
                    }}
                  />
                </div>
                <div>
                  <Users className="w-12 h-12 text-white drop-shadow mb-2" />
                  <h3 className="text-3xl font-bold text-white drop-shadow">
                    {t.customBuilt}
                  </h3>
                </div>
              </div>

              {/* Collapsible content with fade preview on mobile */}
              <div className="relative">
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isFounderExpanded ? 'max-h-96' : 'max-h-16'
                  } lg:max-h-none`}
                >
                  <p className="text-white/90 mb-6 drop-shadow">{t.customBuiltDesc}</p>
                  <p className="text-white/90 mb-6 drop-shadow">{t.dashboardDesc}</p>

                  <div className="flex items-center gap-2 text-white/80 drop-shadow">
                    <Zap className="w-5 h-5" />
                    <span>{t.rapidDeployment}</span>
                  </div>
                </div>

                {/* Gradient fade overlay - only visible on mobile when collapsed */}
                {!isFounderExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200/20 to-transparent pointer-events-none lg:hidden" />
                )}
              </div>

              {/* Open/Close button - only visible on mobile */}
              <button
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white drop-shadow transition-colors mt-2 lg:hidden"
                onClick={() => setIsFounderExpanded(!isFounderExpanded)}
              >
                <span>{isFounderExpanded ? t.close : 'Open'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isFounderExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}