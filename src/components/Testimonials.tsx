import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Mail, MessageSquare, Star } from 'lucide-react';

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "HaloVision transformed our customer service with their AI agents. Response times dropped by 80% and customer satisfaction is at an all-time high!",
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLab",
      link: "mailto:example@email.com",
      icon: "mail",
      review: "The automation solutions they built for us freed up our team to focus on strategic work. ROI was evident within the first month.",
    },
    {
      name: "Emma Rodriguez",
      role: "Director, SalesForce Pro",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Their lead generation AI is incredible. We're now capturing and qualifying leads 24/7 without any manual effort.",
    },
    {
      name: "David Park",
      role: "Manager, CloudSync",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Working with HaloVision was seamless. They understood our needs and delivered a custom solution that exceeded expectations.",
    },
    {
      name: "Lisa Anderson",
      role: "COO, FinTech Solutions",
      link: "mailto:example@email.com",
      icon: "mail",
      review: "The AI agents handle our appointment scheduling flawlessly. No more back-and-forth emails or missed bookings.",
    },
    {
      name: "James Wilson",
      role: "Founder, MarketEdge",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Their marketing automation saved us countless hours. Campaigns run smoothly and conversions have increased by 45%.",
    },
    {
      name: "Sophia Martinez",
      role: "CEO, HealthPlus",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Patient follow-ups are now automated and personalized. Our retention rate improved significantly since implementing their solution.",
    },
    {
      name: "Robert Kim",
      role: "Director, RetailPro",
      link: "mailto:example@email.com",
      icon: "mail",
      review: "The review management system they built helps us respond to all customer feedback promptly. Our online reputation has never been better.",
    },
    {
      name: "Amanda Thompson",
      role: "Manager, Creative Studio",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "HaloVision's content creation AI assists our team beautifully. We're producing twice as much quality content in half the time.",
    },
    {
      name: "Chris Patel",
      role: "Founder, DataDrive",
      link: "https://linkedin.com",
      icon: "linkedin",
      review: "Their data analysis agents provide insights we never knew we needed. Decision-making is now backed by real-time intelligence.",
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
        return <Linkedin className="w-5 h-5" />;
      case 'mail':
        return <Mail className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
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
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-12 justify-start relative z-10"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              cursor: 'grab'
            }}
          >
            {infiniteReviews.map((review, index) => (
              
                key={index}
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] md:w-[350px] backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all text-left cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <p className="text-gray-300 text-sm">{review.role}</p>
                  </div>
                  <div className="text-blue-400 hover:text-blue-300 flex-shrink-0">
                    {getIcon(review.icon)}
                  </div>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed">
                  {review.review}
                </p>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}