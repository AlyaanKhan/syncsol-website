import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, isVisible] = useIntersection();
  const autoRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    autoRef.current = setInterval(next, 6000);
    return () => clearInterval(autoRef.current);
  }, []);

  const handleDotClick = (i) => {
    setCurrent(i);
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 6000);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section testimonials-section" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">Client Reviews</span>
          <h2 className="section-title">
            What clients <span className="text-yellow">say about us.</span>
          </h2>
        </div>

        <div className={`testimonials-carousel fade-in-up${isVisible ? ' visible' : ''}`} style={{ '--delay': '0.15s' }}>
          <div className="testimonial-card">
            <div className="testimonial-stars" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="star-icon" fill="currentColor" />
              ))}
            </div>
            <blockquote className="testimonial-text">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {t.initial}
              </div>
              <div>
                <p className="testimonial-name">{t.author}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
            </div>
          </div>

          <div className="testimonials-controls">
            <button
              className="carousel-btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="carousel-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' active' : ''}`}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
