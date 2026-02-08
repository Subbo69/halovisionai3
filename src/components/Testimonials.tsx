import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Mail, MessageSquare, Star, X } from 'lucide-react';

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const animationRef = useRef<number>();

  const reviews = [
    {
      name: "[Placeholder] Sarah Johnson",
      role: "CEO, TechStart Inc",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "HaloVision transformed our customer service with their AI agents. Response times dropped by 80% and customer satisfaction is at an all-time high...",
    },
    {
      name: "[Placeholder] Michael Chen",
      role: "Founder, GrowthLab",
      link: "mailto:example@email.com",
      icon: "mail",
      review: "The automation solutions they built for us freed up our team to focus on strategic work. ROI was evident within the first month...",
    },
    {
      name: "[Placeholder] Emma Rodriguez",
      role: "Director, SalesForce Pro",
      link: "https://teams.microsoft.com",
      icon: "teams",
      review: "Their lead generation AI is incredible. We're now capturing and qualifying leads 24/7 without any manual effort...",
    },
    {
      name: "[Placeholder] David Park",
      role: "Manager, CloudSync",
      link: "https://twitter.com",
      icon: "twitter",
      review: "Working with HaloVision was seamless. They understood our needs and delivered a custom solution that exceeded expectations...",
    },
    {
      name: "[Placeholder] Lisa Anderson",
      role: "COO, FinTech Solutions",
      link: "https://facebook.com",
      icon: "facebook",
      review: "The AI agents handle our appointment scheduling flawlessly. No more back-and-forth emails or missed bookings...",
    },
    {
      name: "[Placeholder] James Wilson",
      role: "Founder, MarketEdge",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Their marketing automation saved us countless hours. Campaigns run smoothly and conversions have increased by 45%...",
    },
    {
      name: "[Placeholder] Sophia Martinez",
      role: "CEO, HealthPlus",
      link: "https://twitter.com",
      icon: "twitter",
      review: "Patient follow-ups are now automated and personalized. Our retention rate improved significantly since implementing their solution...",
    },
    {
      name: "[Placeholder] Robert Kim",
      role: "Director, RetailPro",
      link: "https://teams.microsoft.com",
      icon: "teams",
      review: "The review management system they built helps us respond to all customer feedback promptly. Our online reputation has never been better...",
    },
    {
      name: "[Placeholder] Amanda Thompson",
      role: "Manager, Creative Studio",
      link: "https://facebook.com",
      icon: "facebook",
      review: "HaloVision's content creation AI assists our team beautifully. We're producing twice as much quality content in half the time...",
    },
    {
      name: "[Placeholder] Chris Patel",
      role: "Founder, DataDrive",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Their data analysis agents provide insights we never knew we needed. Decision-making is now backed by real-time intelligence...",
    },
  ];

  // Duplicate reviews for infinite loop effect
  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (!isPaused && container) {
        // Scroll by 1 pixel for smooth continuous movement
        container.scrollLeft += 1;

        // Reset scroll position for infinite loop
        const maxScroll = container.scrollWidth / 3; // Since we tripled the reviews
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'teams':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.625 8.127v7.746a1.127 1.127 0 01-1.127 1.127h-2.535V9.254h2.535c.622 0 1.127.505 1.127 1.127zM8.746 3.375h3.38v4.507H8.746zm0 5.634h3.38v11.615H8.746zM3.375 9.01h4.245v8.238a.752.752 0 01-.752.752H3.375zm10.758 8.615h2.113v-3.38h1.69V12.75h-1.69v-1.127h1.69v-1.69h-3.803zm-7.605-6.61a1.69 1.69 0 100-3.38 1.69 1.69 0 000 3.38z" />
          </svg>
        );
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setSelectedReview(index);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <section className="relative py-12 md:py-16">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black backdrop-blur-sm pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Client Reviews
        </h3>

        <div className="relative flex items-center justify-center">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-24 pointer-events-none bg-gradient-to-r from-black/80 to-transparent z-20" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-24 pointer-events-none bg-gradient-to-l from-black/80 to-transparent z-20" />

          {/* Scroll Left */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 z-30 transition-colors hover:text-gray-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Scroll Right */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 z-30 transition-colors hover:text-gray-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Reviews */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-12 justify-start relative z-10"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              cursor: 'grab'
            }}
          >
            {infiniteReviews.map((review, index) => (
              <div
                key={index}
                onClick={(e) => handleCardClick(e, index % reviews.length)}
                className="flex-shrink-0 w-[280px] md:w-[300px] backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3.5 hover:bg-white/15 transition-all text-left cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-xs truncate">{review.name}</h4>
                    <p className="text-gray-400 text-[10px] truncate">{review.role}</p>
                  </div>
                  <div className="text-blue-400 hover:text-blue-300 flex-shrink-0 ml-2">
                    {getIcon(review.icon)}
                  </div>
                </div>

                {/* Review text - 2 lines on mobile, 3 lines on desktop, no fade */}
                <p className="text-gray-200 text-xs md:text-[13px] leading-[1.4] line-clamp-2 md:line-clamp-3 mb-2.5">
                  {review.review}
                </p>

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-2.5 h-2.5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for full review */}
      {selectedReview !== null && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="text-white font-bold text-2xl mb-1">
                  {reviews[selectedReview].name}
                </h4>
                <p className="text-gray-300 text-sm">{reviews[selectedReview].role}</p>
              </div>
              <a
                href={reviews[selectedReview].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex-shrink-0"
              >
                {getIcon(reviews[selectedReview].icon)}
              </a>
            </div>

            <p className="text-gray-200 text-base leading-relaxed mb-6">
              {reviews[selectedReview].review}
            </p>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}