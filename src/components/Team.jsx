import { useState, useRef, useEffect } from 'react';

function useImgLoad() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current?.complete) setLoaded(true); }, []);
  return [ref, loaded, () => setLoaded(true)];
}
import { Linkedin, X } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';

const founders = [
  {
    name: 'Malik Sajawal',
    role: 'Chief Executive Officer',
    photo: '/Malik Sajawal- CEO.jpeg',
    bio: 'Sajawal oversees the strategic direction and business operations of SyncSol. Focused on growth, client relationships, and long-term vision, he ensures the company delivers impactful digital solutions while maintaining strong communication and client satisfaction across every project. His leadership style bridges technical innovation with real business outcomes, making him the driving force behind SyncSol\'s growth trajectory.',
    linkedin: 'https://www.linkedin.com/in/sajawal-gull-541877330/',
  },
  {
    name: 'Muhammad Alyaan Amir',
    role: 'Chief Technology Officer',
    photo: '/Alyaan-CTO.jpeg',
    bio: 'Alyaan leads the technical vision at SyncSol with expertise in full-stack development, AI systems, backend architecture, automation, and scalable software solutions. With strong experience in modern web technologies, machine learning, and intelligent systems, he focuses on building high-performance digital products that solve real business challenges through innovation and reliability.',
    linkedin: 'https://www.linkedin.com/in/muhammad-alyaan-amir-2607ba31a/',
  },
  {
    name: 'Kashan Hashmi',
    role: 'Chief Marketing Officer',
    photo: '/Kashan-CMO.jpeg',
    bio: 'Kashan leads marketing and outreach strategies at SyncSol, focusing on brand growth, client acquisition, and digital presence. With a strong understanding of communication, business outreach, and market positioning, he connects businesses with innovative technology solutions tailored to their goals and growth — building the bridge between great tech and the people who need it.',
    linkedin: 'https://www.linkedin.com/in/m-kashan-hashmi-878386279/',
  },
];

function FounderModal({ founder, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${founder.name} profile`}
    >
      <div className="founder-modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="founder-modal-split">
          <div className="founder-modal-photo-wrap">
            <img src={founder.photo} alt={founder.name} className="founder-modal-photo" />
          </div>
          <div className="founder-modal-info">
            <div>
              <p className="founder-modal-role">{founder.role}</p>
              <h3 className="founder-modal-name">{founder.name}</h3>
            </div>
            <div className="founder-modal-divider" />
            <p className="founder-modal-bio">{founder.bio}</p>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-yellow"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ f, index, onOpen }) {
  const [imgRef, imgLoaded, onImgLoad] = useImgLoad();
  return (
    <div
      className="team-card fade-in-up"
      style={{ '--delay': `${index * 0.12}s` }}
      onClick={() => onOpen(f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(f); }}
      aria-label={`View ${f.name} profile`}
    >
      <div className="img-wrap team-photo-wrap">
        {!imgLoaded && <div className="skeleton-placeholder skeleton" />}
        <img
          ref={imgRef}
          src={f.photo}
          alt={f.name}
          className={`team-photo${imgLoaded ? ' img-loaded' : ''}`}
          loading="lazy"
          onLoad={onImgLoad}
        />
      </div>
      <div className="team-gradient" />
      <div className="team-view-overlay">
        <span className="team-view-badge">View Profile</span>
      </div>
      <div className="team-body">
        <p className="team-role">{f.role}</p>
        <h3 className="team-name">{f.name}</h3>
        <p className="team-bio">{f.bio}</p>
        <a
          href={f.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="team-linkedin"
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin size={14} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function Team() {
  const [ref, isVisible] = useIntersection();
  const [activeFounder, setActiveFounder] = useState(null);

  return (
    <section id="team" className="section team-section" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">The Team</span>
          <h2 className="section-title">The people behind <span className="text-yellow">SyncSol.</span></h2>
          <p className="section-subtitle">A focused team of builders, thinkers, and problem solvers.</p>
        </div>
        <div className={`team-grid${isVisible ? ' visible' : ''}`}>
          {founders.map((f, i) => (
            <TeamCard key={f.name} f={f} index={i} onOpen={setActiveFounder} />
          ))}
        </div>
      </div>

      {activeFounder && (
        <FounderModal founder={activeFounder} onClose={() => setActiveFounder(null)} />
      )}
    </section>
  );
}
