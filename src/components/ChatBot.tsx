import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface ChatBotProps {
  context: string;
  onContextUsed: () => void;
  language: Language;
}

export default function ChatBot({ context, onContextUsed, language }: ChatBotProps) {
  const t = translations[language];

  const [isOpen, setIsOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([{ role: 'assistant', content: t.chatGreeting }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [longMessagesSent, setLongMessagesSent] = useState(0);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);

  /* ---------- WAVE ANIMATION STATE ---------- */
  const [wavePosition, setWavePosition] = useState(-1);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.chatGreeting }]);
  }, [language, t.chatGreeting]);

  useEffect(() => {
    if (context) {
      openChat();
      const recs =
        t.chatRecommendations?.[context as keyof typeof t.chatRecommendations] ||
        t.chatRecommendations?.general ||
        [];
      setRecommendations(recs);
      onContextUsed();
    }
  }, [context, onContextUsed, t]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        chatRef.current &&
        !chatRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        closeChat();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  /* ---------- WAVE SWEEP ---------- */
  const runWaveAnimation = () => {
    let startTime: number | null = null;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setWavePosition(-0.3 + eased * 1.6);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setWavePosition(-1);
      }
    };

    requestAnimationFrame(animate);
  };

  /* ---------- TIMING LOGIC ---------- */
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!isOpen) {
      // 1️⃣ First animation — 24s
      timersRef.current.push(
        setTimeout(runWaveAnimation, 24000)
      );

      // 2️⃣ Second animation — 3.5 min
      timersRef.current.push(
        setTimeout(runWaveAnimation, 210000)
      );

      // 3️⃣ Every 5 min after that
      timersRef.current.push(
        setTimeout(() => {
          runWaveAnimation();
          const interval = setInterval(runWaveAnimation, 300000);
          timersRef.current.push(interval as unknown as NodeJS.Timeout);
        }, 210000)
      );
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isOpen]);

  /* ---------- OPEN / CLOSE ---------- */
  const openChat = () => {
    setIsOpen(true);
    setTimeout(() => setAnimateOpen(true), 10);
  };

  const closeChat = () => {
    setAnimateOpen(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const toggleChat = () => {
    isOpen ? closeChat() : openChat();
  };

  /* ---------- INPUT ---------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const limit = longMessagesSent < 2 ? 2000 : 500;
    setLimitWarning(value.length > limit ? t.chatCharLimit : null);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 40) + 'px';
    }
  };

  /* ---------- WAVE GRADIENT ---------- */
  const createWaveGradient = () => {
    if (wavePosition < 0) return 'transparent';

    const pos = wavePosition * 100;
    const w = 30;

    return `linear-gradient(to right,
      transparent ${pos - w}%,
      rgba(255,255,255,0.15) ${pos - w * 0.7}%,
      rgba(255,255,255,0.5) ${pos - w * 0.4}%,
      rgba(255,255,255,0.9) ${pos}%,
      rgba(255,255,255,0.5) ${pos + w * 0.4}%,
      rgba(255,255,255,0.15) ${pos + w * 0.7}%,
      transparent ${pos + w}%
    )`;
  };

  const isAnimating = wavePosition >= 0;

  /* ---------- RENDER ---------- */
  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/anurati" rel="stylesheet" />

      {/* OPEN BUTTON */}
      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full
                   px-4 py-3 border border-white backdrop-blur-sm
                   transition-transform hover:scale-110 font-semibold"
        style={{
          background: createWaveGradient(),
          color: '#ffffff',
          textShadow: isAnimating
            ? '0 0 6px rgba(255,255,255,0.6)'
            : '0 0 2px rgba(255,255,255,0.3)',
        }}
        aria-label={t.askHaloAI}
      >
        <MessageSquare className="w-6 h-6" />
        <span>{t.askHaloAI || 'Ask Halo AI'}</span>
      </button>

      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          ref={chatRef}
          className={`fixed bottom-24 left-6 z-50 w-11/12 max-w-[24rem]
          h-[400px] md:h-[600px]
          flex flex-col backdrop-blur-xl bg-transparent border border-white rounded-3xl
          shadow-md overflow-hidden transition-all duration-300
          ${animateOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {/* HEADER */}
          <div className="bg-black/80 text-white p-4 flex justify-between rounded-t-3xl">
            <div>
              <div
                className="font-bold tracking-[0.12em]"
                style={{ fontFamily: 'Anurati, sans-serif' }}
              >
                HALOVISION AI
              </div>
              <div className="text-xs text-gray-300">{t.chatSub}</div>
            </div>
            <button onClick={closeChat}>
              <X />
            </button>
          </div>

          {/* CONTENT OMITTED — unchanged */}
        </div>
      )}
    </>
  );
}
