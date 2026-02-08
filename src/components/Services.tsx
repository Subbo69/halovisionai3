import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Rocket,
  Sparkles,
  ChevronDown,
  Wrench,
  Lightbulb,
} from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface ServicesProps {
  onAskAIClick: (context: string) => void;
  language: Language;
}

export default function Services({ onAskAIClick, language }: ServicesProps) {
  const t = translations[language];
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Rocket,
      title: t.saveTime,
      description: t.saveTimeDesc,
      context: 'save-time',
    },
    {
      icon: Wrench,
      title: t.customSolutions,
      description: t.customSolutionsDesc,
      context: 'custom-solutions',
    },
    {
      icon: TrendingUp,
      title: t.leadGeneration,
      description: t.leadGenerationDesc,
      context: 'lead-generation',
    },
    {
      icon: Lightbulb,
      title: t.exampleAgents,
      description: t.exampleAgentsDesc,
      examples: t.exampleAgentsList,
      context: 'examples',
    },
  ];

  const toggleCard = (index: number) => {
    const newSet = new Set(expandedCards);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setExpandedCards(newSet);
  };

  // Calculate position with easing (smooth acceleration/deceleration)
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Slower animation: complete cycle every 150% of scroll instead of 100%
  const normalizedProgress = (scrollProgress % 150) / 150;
  let linePosition;
  if (normalizedProgress < 0.5) {
    // First half: left to right (-10% to 110% to ensure full coverage)
    const progress = normalizedProgress * 2; // normalize to 0-1
    linePosition = -10 + easeInOutCubic(progress) * 120;
  } else {
    // Second half: right to left (110% to -10%)
    const progress = (normalizedProgress - 0.5) * 2; // normalize to 0-1
    linePosition = 110 - easeInOutCubic(progress) * 120;
  }

  return (
    <div
      id="services"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated top border line - scroll controlled */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
        style={{
          left: `${linePosition}%`,
          width: '30%',
          transition: 'none',
        }}
      />

      {/* Shared Background for seamless effect */}
      <div className="absolute inset-0 bg-black" />

      {/* Smooth Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
          {t.servicesTitle}
        </h2>
        <p className="text-sm md:text-lg text-white/60 text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          {t.servicesSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCards.has(index);

            return (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                className="
                  bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6
                  hover:bg-white/15 transition-colors cursor-pointer
                "
              >
                {/* HEADER ROW */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <h3 className="text-base md:text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <p className="text-[10px] md:text-xs text-white/40 mb-2">
                  {isExpanded ? 'Close' : 'Open'}
                </p>

                {/* EXPANDABLE CONTENT */}
                <div
                  className={`
                    grid overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    {service.description && (
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {service.examples && (
                      <ul className="mt-3 space-y-1.5 text-[10px] md:text-xs text-white/60 leading-snug">
                        {service.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-white/40 mt-0.5">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAIClick(service.context);
                      }}
                      className="text-xs md:text-sm flex items-center gap-2 text-white/70 hover:text-white transition-colors mt-4"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t.askAI}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}