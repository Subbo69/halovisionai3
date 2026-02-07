import { useState } from 'react';
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
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setExpandedCards(newSet);
  };

  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Background with Purple → Orange/Red + Black vertical gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            /* Horizontal black gradient (top -> bottom) */
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%),
            /* Diagonal purple → orange/red gradient */
            linear-gradient(135deg, rgba(128,0,128,0.8) 60%, rgba(255,69,0,0.7) 40%)
          `,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: -1,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {t.servicesTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto drop-shadow-sm">
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
                  bg-white/5        /* Slight transparency, no white halo */
                  rounded-2xl
                  p-6
                  hover:bg-white/10 /* Slight hover effect */
                  transition-colors
                  cursor-pointer
                "
              >
                {/* HEADER ROW */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-8 h-8 text-white flex-shrink-0" />
                    <h3 className="text-xl font-bold leading-snug drop-shadow">
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
                  <p className="text-white/80 mb-4 leading-relaxed drop-shadow-sm">
                    {service.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAIClick(service.context);
                    }}
                    className="text-sm flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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
