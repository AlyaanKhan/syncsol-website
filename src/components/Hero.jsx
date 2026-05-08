import { ArrowRight, ChevronDown } from 'lucide-react';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '11+', label: 'Projects Shipped' },
  { value: 'US & CA', label: 'Markets Served' },
  { value: 'Build — Sync — Launch', label: 'Our Approach' },
];

export default function Hero() {
  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-label hero-animate" style={{ '--delay': '0s' }}>
            <span className="hero-label-bar" />
            BUILD — SYNC — LAUNCH
          </div>

          <h1 className="hero-title hero-animate" style={{ '--delay': '0.15s' }}>
            We Build Digital
            <br />
            <span className="text-yellow">Solutions That Scale.</span>
          </h1>

          <p className="hero-sub hero-animate" style={{ '--delay': '0.3s' }}>
            SyncSol helps startups and businesses across the US and Canada streamline
            operations, improve digital presence, and accelerate growth through
            modern technology — web apps, mobile apps, AI systems, and automation.
          </p>

          <div className="hero-ctas hero-animate" style={{ '--delay': '0.45s' }}>
            <button
              className="btn btn-yellow btn-lg"
              onClick={() => handleScroll('#projects')}
            >
              View Our Work
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-outline-white btn-lg"
              onClick={() => handleScroll('#contact')}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="hero-visual hero-animate" style={{ '--delay': '0.3s' }} aria-hidden="true">
          <div className="hero-decoration">
            <div className="hero-deco-outer">
              <div className="hero-deco-triangle-top" />
              <div className="hero-deco-bar" />
              <div className="hero-deco-triangle-bottom" />
            </div>
            <div className="hero-deco-ring hero-deco-ring-1" />
            <div className="hero-deco-ring hero-deco-ring-2" />
            <div className="hero-deco-dot hero-deco-dot-1" />
            <div className="hero-deco-dot hero-deco-dot-2" />
            <div className="hero-deco-dot hero-deco-dot-3" />
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="container hero-stats-inner">
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="hero-scroll-hint"
        onClick={() => handleScroll('#about')}
        aria-label="Scroll to about section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
