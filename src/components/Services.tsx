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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

  return (
    <section className="relative py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCard === index;

            return (
              <div
                key={index}
                onClick={() =>
                  setExpandedCard(isExpanded ? null : index)
                }
                className="
                  backdrop-blur-md
                  bg-white/5
                  border border-white/20
                  rounded-2xl
                  p-6
                  hover:bg-white/10
                  transition-all
                  cursor-pointer
                "
              >
                {/* HEADER ROW — icon, title, open */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-8 h-8 text-white flex-shrink-0" />
                    <h3 className="text-xl font-bold leading-snug">
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
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
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
    </section>
  );
}
