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
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: t.chatGreeting },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [longMessagesSent, setLongMessagesSent] = useState(0);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);

  // Animation control
  const [wavePosition, setWavePosition] = useState(-1);
  const [animationDisabled, setAnimationDisabled] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);

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

  /* ---------- WAVE ANIMATION ---------- */
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
        setAnimationCount(prev => prev + 1);
      }
    };

    requestAnimationFrame(animate);
  };

  /* ---------- ANIMATION SCHEDULING ---------- */
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!animationDisabled && !isOpen) {
      // First animation at 27 seconds
      const firstTimer = setTimeout(() => {
        runWaveAnimation();

        // Second animation at 3.5 minutes (210 seconds) after first
        const secondTimer = setTimeout(() => {
          runWaveAnimation();

          // All subsequent animations at 5 minutes (300 seconds)
          const interval = setInterval(() => {
            runWaveAnimation();
          }, 300000); // 5 minutes

          timersRef.current.push(interval as unknown as NodeJS.Timeout);
        }, 210000); // 3.5 minutes

        timersRef.current.push(secondTimer);
      }, 27000); // 27 seconds

      timersRef.current.push(firstTimer);
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [animationDisabled, isOpen]);

  /* ---------- OPEN / CLOSE ---------- */
  const openChat = () => {
    setAnimationDisabled(true); // permanently disable animation
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

  /* ---------- SEND ---------- */
  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setRecommendations([]);
    setLimitWarning(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    if (userMessage.length > 500) setLongMessagesSent(prev => prev + 1);

    setIsLoading(true);

    try {
      const history = [...messages, { role: 'user', content: userMessage }].slice(-10);

      const response = await fetch('https://n8n.halo-vision.com/webhook/halovisionchatbot99', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json();

      const assistantMessage =
        data?.[0]?.json?.response ||
        data?.response ||
        data?.message ||
        t.chatError ||
        'No response received.';

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: assistantMessage.replace(/<[^>]*>/g, '').trim(),
        },
      ]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t.chatError }]);
    } finally {
      setIsLoading(false);
    }
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!limitWarning) handleSend();
    }
  };

  /* ---------- WAVE GRADIENT ---------- */
  const createWaveGradient = () => {
    if (wavePosition < 0) return 'rgba(0, 0, 0, 0.3)';

    const pos = wavePosition * 100;
    const w = 30;

    return `linear-gradient(to right,
      rgba(0, 0, 0, 0.3) ${pos - w}%,
      rgba(255, 255, 255, 0.2) ${pos - w * 0.7}%,
      rgba(255, 255, 255, 0.4) ${pos - w * 0.4}%,
      rgba(255, 255, 255, 0.6) ${pos}%,
      rgba(255, 255, 255, 0.4) ${pos + w * 0.4}%,
      rgba(255, 255, 255, 0.2) ${pos + w * 0.7}%,
      rgba(0, 0, 0, 0.3) ${pos + w}%
    )`;
  };

  /* ---------- RENDER ---------- */
  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full
                   px-4 py-3 border border-white backdrop-blur-sm
                   transition-transform hover:scale-110 font-semibold text-white"
        style={{
          background: createWaveGradient(),
        }}
      >
        <MessageSquare className="w-6 h-6" />
        <span>{t.askHaloAI || 'Ask Halo AI'}</span>
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className={`fixed bottom-24 left-6 z-50 w-11/12 max-w-[24rem]
          h-[400px] md:h-[600px]
          flex flex-col backdrop-blur-xl bg-transparent border border-white rounded-3xl
          shadow-md overflow-hidden transition-all duration-300
          ${animateOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {/* Header */}
          <div className="bg-black/80 text-white p-4 flex justify-between rounded-t-3xl">
            <div className="font-bold tracking-widest">HALOVISION AI</div>
            <button onClick={closeChat}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-black text-white'
                      : 'border border-white text-white'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
              className="flex-1 bg-transparent border border-white rounded-full px-4 py-2 text-white resize-none"
              placeholder={t.chatInputPlaceholder}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="border border-white p-2 rounded-full"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}