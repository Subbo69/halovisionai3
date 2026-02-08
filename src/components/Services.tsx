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
  const [sectionScroll, setSectionScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      
      // Calculate zoom based on scroll position
      setSectionScroll(scrollTop);
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
  const normalizedProgress = ((scrollProgress % 150) / 150);
  let linePosition;
  
  if (normalizedProgress < 0.5) {
    // First half: left to right (-10% to 110% to ensure full coverage)
    const progress = normalizedProgress * 2; // normalize to 0-1
    linePosition = -10 + (easeInOutCubic(progress) * 120);
  } else {
    // Second half: right to left (110% to -10%)
    const progress = (normalizedProgress - 0.5) * 2; // normalize to 0-1
    linePosition = 110 - (easeInOutCubic(progress) * 120);
  }

  // Parallax zoom effect: zoom out as you scroll down
  const zoomScale = 1 + (sectionScroll * 0.0003); // Subtle zoom effect

  return (
    <section className="relative py-12 md:py-20 text-white overflow-hidden -mb-1">
      {/* Animated top border line - scroll controlled */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden z-10">
        <div
          className="absolute h-full w-40 md:w-48 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-100 ease-out"
          style={{
            left: `${linePosition}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Shared Background for seamless effect */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <div
          className="services-bg absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
          style={{
            backgroundImage: "url('https://images.hdqwalls.com/wallpapers/neon-half-circle-q7.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scaleX(-1) scale(${zoomScale})`,
            transformOrigin: 'center',
          }}
        />
        
        {/* Shorter fade - reaches 100% black faster */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.32) 8%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)',
          }}
        />
      </div>

      {/* Mobile background size adjustment - more zoom for full coverage */}
      <style>{`
        @media (max-width: 768px) {
          .services-bg {
            background-size: 300% !important;
          }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg">
            {t.servicesTitle}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-sm px-4">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-start pb-4 md:pb-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCards.has(index);

            return (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                className="
                  bg-white/10
                  backdrop-blur-sm
                  rounded-2xl
                  p-5 md:p-6
                  hover:bg-white/15
                  transition-colors
                  cursor-pointer
                "
              >
                {/* HEADER ROW */}
                <div className="flex items-start justify-between gap-3 md:gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white flex-shrink-0" />
                    <h3 className="text-lg md:text-xl font-bold leading-snug drop-shadow">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs md:text-sm text-white/70 flex-shrink-0">
                    <span>{isExpanded ? 'Close' : 'Open'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* EXPANDABLE CONTENT */}
                <div
                  className={`
                    overflow-hidden
                    transition-[max-height] duration-300
                    ${isExpanded ? 'max-h-[600px] mt-4' : 'max-h-0'}
                  `}
                >
                  {service.description && (
                    <p className="text-white/90 mb-3 leading-relaxed drop-shadow-sm text-sm md:text-base">
                      {service.description}
                    </p>
                  )}

                  {service.examples && (
                    <ul className="text-white/90 mb-4 leading-relaxed drop-shadow-sm text-sm md:text-base space-y-1.5">
                      {service.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white/70 mt-1">•</span>
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
                    className="text-xs md:text-sm flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ask Our AI Agent</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}