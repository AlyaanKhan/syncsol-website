import { useIntersection } from '../hooks/useIntersection';

const stats = [
  { value: '4+', label: 'Years of Experience' },
  { value: '11+', label: 'Projects Shipped' },
  { value: '3', label: 'Client Reviews' },
  { value: 'US & CA', label: 'Markets Served' },
];

export default function About() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className={`container about-inner${isVisible ? ' visible' : ''}`}>
        <div className="about-left fade-in-up">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Software that <span className="text-yellow">works</span> for your business.
          </h2>
          <p className="about-desc">
            SyncSol is a modern software solutions company building scalable web apps,
            mobile apps, AI-powered systems, and business automation for startups and
            businesses across the US and Canada.
          </p>
          <p className="about-desc">
            We help companies streamline operations, improve digital presence, and
            accelerate growth through innovative technology. From idea to production —
            we own the full lifecycle.
          </p>
          <div className="about-tags">
            <span className="tag">Web Applications</span>
            <span className="tag">Mobile Apps</span>
            <span className="tag">AI Systems</span>
            <span className="tag">Automation</span>
            <span className="tag">SaaS Products</span>
            <span className="tag">API Development</span>
          </div>
        </div>

        <div className="about-right fade-in-up" style={{ '--delay': '0.15s' }}>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-card-value">{stat.value}</span>
                <span className="stat-card-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
