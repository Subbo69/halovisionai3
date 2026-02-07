import { useState } from 'react';
import { Users, Zap, ChevronDown } from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface WhyUsProps {
  language: Language;
}

export default function WhyUs({ language }: WhyUsProps) {
  const t = translations[language];
  const [expandedReason, setExpandedReason] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.postimg.cc/jS3wwWnS/unnamed.jpg')",
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/50"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Reasons */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">
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
                      bg-white
                      border border-white/60
                      rounded-2xl
                      p-4
                      shadow-xl shadow-black/20
                      hover:shadow-2xl hover:shadow-black/30
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
                        <p className="text-lg text-gray-800 font-bold">
                          {reason}
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-96 mt-3' : 'max-h-0'
                          }`}
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {t.reasonsDesc[index]}
                          </p>
                        </div>

                        <button
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mt-2"
                        >
                          <span>
                            {isExpanded ? t.close : 'Open'}
                          </span>
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

          {/* Right: Founder info (unchanged) */}
          <div className="backdrop-blur-md bg-white/80 border border-white/70 rounded-3xl p-8 shadow-xl">
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
                  <Users className="w-12 h-12 text-black mb-2" />
                  <h3 className="text-3xl font-bold">{t.customBuilt}</h3>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{t.customBuiltDesc}</p>
              <p className="text-gray-600 mb-6">{t.dashboardDesc}</p>

              <div className="flex items-center gap-2 text-gray-500">
                <Zap className="w-5 h-5" />
                <span>{t.rapidDeployment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
