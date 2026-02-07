import { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  MessageSquare,
  BarChart3,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface ServicesProps {
  onAskAIClick: (context: string) => void;
  language: Language;
}

export default function Services({ onAskAIClick, language }: ServicesProps) {
  const t = translations[language];
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      // Opposite direction to hero (move up instead of down)
      bgRef.current.style.transform = `translateY(${-window.scrollY * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: TrendingUp,
      title: t.leadGeneration,
      description: t.leadGenerationDesc,
      context: 'lead-generation',
    },
    {
      icon: MessageSquare,
      title: t.customerEngagement,
      description: t.customerEngagementDesc,
      context: 'customer-engagement',
    },
    {
      icon: BarChart3,
      title: t.marketingAutomation,
      description: t.marketingAutomationDesc,
      context: 'marketing-automation',
    },
    {
      icon: Clock,
      title: t.saveTime,
      description: t.saveTimeDesc,
      context: 'save-time',
    },
  ];

  const toggleCard = (index: number) => {
    const newSet = new Set(expandedCards);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedCards(newSet);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 hero-bg will-change-transform"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.servicesTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCards.has(index);

            return (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                className="
                  backdrop-blur-md
                  bg-white/10
                  border border-white/20
                  rounded-2xl
                  p-6
                  hover:bg-white/20
                  transition-colors
                  cursor-pointer
                  relative
                  z-10
                "
              >
                {/* HEADER ROW */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-8 h-8 text-white flex-shrink-0" />
                    <h3 className="text-xl font-bold leading-snug text-white">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-white/70">
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
                    ${isExpanded ? 'max-h-96 mt-4' : 'max-h-0'}
                  `}
                >
                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAIClick(service.context);
                    }}
                    className="text-sm flex items-center gap-2 text-white/80 hover:text-white transition-colors"
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

      {/* Background CSS */}
      <style>{`
        .hero-bg {
          background-image: url('https://images.hdqwalls.com/wallpapers/neon-half-circle-q7.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center top; /* show top instead of center */
          width: 100%;
          height: 120%;
        }

        @media (max-width: 768px) {
          .hero-bg {
            background-position: center 20%;
          }
        }
      `}</style>
    </section>
  );
}
