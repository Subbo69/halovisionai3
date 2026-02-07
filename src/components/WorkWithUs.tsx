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
      {/* Fully transparent background */}
      <div className="absolute inset-0 -z-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
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
                  bg-black/40
                  rounded-2xl
                  p-6
                  hover:bg-black/50
                  transition-colors
                  cursor-pointer
                "
              >
                {/* HEADER */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-bold">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <span>{isExpanded ? 'Close' : 'Open'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* EXPAND */}
                <div
                  className={`
                    overflow-hidden
                    transition-[max-height] duration-300
                    ${isExpanded ? 'max-h-96 mt-4' : 'max-h-0'}
                  `}
                >
                  <p className="text-white/75 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* 🔥 LIGHT STRING BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAIClick(service.context);
                    }}
                    className="relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white bg-black overflow-hidden"
                  >
                    {/* Animated border */}
                    <span className="absolute inset-0 rounded-xl p-[1px] pointer-events-none">
                      <span
                        className="absolute inset-0 rounded-xl animate-spin"
                        style={{
                          background:
                            'conic-gradient(from 0deg, transparent 0%, #a855f7 20%, #f97316 40%, transparent 60%)',
                          animationDuration: '3s',
                        }}
                      />
                    </span>

                    {/* Inner content mask */}
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Ask Our AI Agent
                    </span>
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
