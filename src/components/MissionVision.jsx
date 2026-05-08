import { useIntersection } from '../hooks/useIntersection';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
  const [ref, isVisible] = useIntersection();
  return (
    <section className="section mv-section" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">Driven by purpose. <span className="text-yellow">Built on results.</span></h2>
        </div>
        <div className={`mv-grid fade-in-up${isVisible ? ' visible' : ''}`} style={{'--delay':'0.15s'}}>
          <div className="mv-card">
            <div className="mv-icon"><Target size={28} /></div>
            <h3 className="mv-title">Our Mission</h3>
            <p className="mv-text">
              To help startups and businesses across the US and Canada streamline operations,
              improve their digital presence, and accelerate growth through innovative, reliable
              technology. We build software that solves real problems — not just impressive demos.
            </p>
          </div>
          <div className="mv-card mv-card-accent">
            <div className="mv-icon"><Eye size={28} /></div>
            <h3 className="mv-title">Our Vision</h3>
            <p className="mv-text">
              To become the most trusted software development partner for growing businesses
              in North America — known for speed, quality, and long-term value. We envision a
              future where every business, regardless of size, has access to enterprise-grade
              technology built to scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
