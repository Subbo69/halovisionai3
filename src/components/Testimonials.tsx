import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const reviews = [
    {
      name: "Client Name",
      role: "CEO, Company Name",
      linkedIn: "#",
      review: "Review text goes here",
    },
    {
      name: "Client Name",
      role: "Founder, Company Name",
      linkedIn: "#",
      review: "Review text goes here",
    },
    {
      name: "Client Name",
      role: "Director, Company Name",
      linkedIn: "#",
      review: "Review text goes here",
    },
    {
      name: "Client Name",
      role: "Manager, Company Name",
      linkedIn: "#",
      review: "Review text goes here",
    },
  ];

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
          <div className="absolute left-0 top-0 h-full w-12 pointer-events-none bg-gradient-to-r from-black/40 to-transparent z-20" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-12 pointer-events-none bg-gradient-to-l from-black/40 to-transparent z-20" />

          {/* Scroll Left */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Scroll Right */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Reviews */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-12 justify-center relative z-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[350px] backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <p className="text-gray-300 text-sm">{review.role}</p>
                  </div>
                  <a
                    href={review.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
