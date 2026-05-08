import {
  Code2,
  Smartphone,
  Layers,
  Cpu,
  Zap,
  LayoutDashboard,
  Link2,
  Monitor,
  Server,
  Users,
  Cloud,
  Wrench,
} from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { services } from '../data/services';

const iconMap = {
  Code2,
  Smartphone,
  Layers,
  Cpu,
  Zap,
  LayoutDashboard,
  Link2,
  Monitor,
  Server,
  Users,
  Cloud,
  Wrench,
};

export default function Services() {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">What We Build</span>
          <h2 className="section-title">
            Full-stack solutions across <span className="text-yellow">every layer.</span>
          </h2>
          <p className="section-subtitle">
            From frontend interfaces to backend infrastructure — we build what your
            business needs to move faster.
          </p>
        </div>

        <div className={`services-grid${isVisible ? ' visible' : ''}`}>
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="service-card fade-in-up"
                style={{ '--delay': `${i * 0.06}s` }}
              >
                <div className="service-icon-wrap">
                  {Icon && <Icon size={24} strokeWidth={1.75} />}
                </div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
