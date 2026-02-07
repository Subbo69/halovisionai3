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
  }, [language]);

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

      const response = await fetch(
        'https://n8n.halo-vision.com/webhook/halovisionchatbot99',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        }
      );

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Webhook raw data:', data);

      let assistantMessage = '';

      if (Array.isArray(data) && data.length > 0) {
        assistantMessage =
          data[0]?.json?.response ||
          data[0]?.json?.message ||
          data[0]?.json?.output ||
          JSON.stringify(data[0]?.json || '');
      } else if (typeof data === 'object') {
        assistantMessage =
          data?.response ||
          data?.message ||
          data?.output ||
          data?.text ||
          JSON.stringify(data);
      } else if (typeof data === 'string') {
        assistantMessage = data;
      }

      if (!assistantMessage) {
        assistantMessage = t.chatError || 'No response received.';
      }

      const cleanMessage = assistantMessage
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*/g, '')
        .replace(/#+/g, '')
        .replace(/[`>]/g, '')
        .trim();

      setMessages(prev => [...prev, { role: 'assistant', content: cleanMessage }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: t.chatError || 'Oops! Something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- INPUT ---------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const limit = longMessagesSent < 2 ? 2000 : 500;
    setLimitWarning(value.length > limit ? t.chatCharLimit || 'Character limit reached.' : null);

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

  const placeholderText =
    t.chatInputPlaceholder ||
    (language === 'de'
      ? 'Frage unseren KI-Agenten'
      : language === 'fr'
      ? 'Posez votre question'
      : 'Any questions?');

  /* ---------- RENDER ---------- */
  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/anurati" rel="stylesheet" />

      {/* OPEN BUTTON */}
      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all hover:scale-110 px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(249,115,22,0.85))',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
        aria-label="Open chat"
      >
        <MessageSquare className="w-7 h-7 drop-shadow-md" />
        <span className="whitespace-nowrap font-semibold text-sm drop-shadow-sm">
          Ask Halo
        </span>
      </button>

      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          ref={chatRef}
          className={`fixed bottom-24 left-6 z-50 w-11/12 max-w-[24rem]
          h-[400px] md:h-[600px]
          flex flex-col backdrop-blur-xl bg-black/80 border border-white/30
          rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden
          transform transition-all duration-300 ease-out
          ${animateOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        >
          {/* HEADER */}
          <div className="bg-black/90 text-white p-4 flex items-center justify-between rounded-t-3xl">
            <div>
              <div
                className="font-bold select-none"
                style={{
                  fontFamily: 'Anurati, sans-serif',
                  fontSize: '1.1rem',
                  letterSpacing: '0.12em',
                }}
              >
                HALOVISION AI
              </div>
              <div className="text-xs text-gray-300">{t.chatSub}</div>
            </div>
            <button onClick={closeChat} className="hover:bg-white/20 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-800/70 text-white border border-white/20'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {recommendations.length > 0 && !isLoading && (
              <div className="flex flex-col gap-2">
                <div className="text-xs text-gray-300 text-center">{t.suggestions}</div>
                {recommendations
                  .slice(0, window.innerWidth < 768 ? 1 : 3)
                  .map((rec, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(rec)}
                      className="bg-gray-800/70 text-white border border-white/20 p-3 rounded-2xl hover:bg-gray-800/90 text-left text-sm"
                    >
                      {rec}
                    </button>
                  ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/70 text-white border border-white/20 p-3 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 bg-gray-900/70 border-t border-white/20 flex items-end gap-2 rounded-b-3xl">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
              style={{ lineHeight: '1.25rem' }}
              placeholder={placeholderText}
              className="flex-1 px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white bg-gray-800/60 resize-none overflow-y-auto max-h-10 text-white"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {limitWarning && (
            <div className="text-xs text-red-500 text-center pb-2">{limitWarning}</div>
          )}
        </div>
      )}
    </>
  );
}
