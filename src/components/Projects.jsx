import { useState, useRef, useEffect } from 'react';

function useImgLoad() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current?.complete) setLoaded(true); }, []);
  return [ref, loaded, () => setLoaded(true)];
}
import { Github, X, ExternalLink, Eye, Play } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { projects } from '../data/projects';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Web', value: 'web' },
  { label: 'Python', value: 'python' },
];

/* ── Video / Demo Modal ─────────────────────────────── */
function VideoModal({ project, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} demo`}
    >
      <div className="modal-box modal-box-split">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="modal-split">
          <div className="modal-info">
            <div>
              <h3 className="modal-title">{project.name}</h3>
              <p className="modal-tagline">{project.tagline}</p>
            </div>
            <p className="modal-desc">{project.description}</p>
            <div className="modal-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="stack-tag">{tech}</span>
              ))}
            </div>
            <div className="modal-actions">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
                  <Github size={16} /> GitHub <ExternalLink size={13} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
          <div className="modal-video-side">
            {project.video ? (
              <video src={project.video} controls autoPlay preload="none" poster={project.thumbnail} />
            ) : (
              <img src={project.thumbnail} alt={project.name} className="modal-preview-img" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Showcase Card ──────────────────────────────────── */
function ShowcaseCard({ project, index, onClick, delay }) {
  const [imgRef, imgLoaded, onImgLoad] = useImgLoad();
  return (
    <div
      className="sc-card fade-in-up"
      style={{ '--delay': `${delay}s` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(project); }}
      aria-label={`View ${project.name}`}
    >
      {/* image */}
      <div className="sc-thumb-wrap">
        <div className="img-wrap">
          {!imgLoaded && <div className="skeleton-placeholder skeleton" />}
          <img
            ref={imgRef}
            src={project.thumbnail}
            alt={project.name}
            className={`sc-thumb${imgLoaded ? ' img-loaded' : ''}`}
            loading="lazy"
            onLoad={onImgLoad}
          />
        </div>
        <div className="sc-img-overlay" />
        <span className="sc-num">0{index + 1}</span>
        <div className="sc-play-hint">
          {project.video ? <Play size={22} fill="currentColor" /> : <Eye size={22} />}
        </div>
      </div>

      {/* info — full description, no clipping */}
      <div className="sc-info">
        <div className="sc-badges">
          <span className="sc-badge">Featured</span>
          {project.liveUrl && <span className="sc-live-badge">Live</span>}
        </div>

        <div>
          <h3 className="sc-name">{project.name}</h3>
          <p className="sc-tagline">{project.tagline}</p>
        </div>

        <p className="sc-desc">{project.description}</p>

        <div className="sc-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-tag">{tech}</span>
          ))}
        </div>

        <div className="sc-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-yellow btn-sm" onClick={(e) => e.stopPropagation()}>
              <Github size={14} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline-white btn-sm" onClick={(e) => e.stopPropagation()}>
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          <button className="btn btn-outline-white btn-sm sc-demo-btn">
            {project.video ? <Play size={13} fill="currentColor" /> : <Eye size={13} />}
            {project.video ? 'Watch Demo' : 'Preview'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Regular Project Card ───────────────────────────── */
function ProjectCard({ project, onClick, delay }) {
  const [imgRef, imgLoaded, onImgLoad] = useImgLoad();
  return (
    <div
      className="project-card fade-in-up"
      style={{ '--delay': `${delay}s` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(project); }}
      aria-label={`View ${project.name} demo`}
    >
      <div className="project-thumb-wrap">
        <div className="img-wrap">
          {!imgLoaded && <div className="skeleton-placeholder skeleton" />}
          <img
            ref={imgRef}
            src={project.thumbnail}
            alt={project.name}
            className={`project-thumb${imgLoaded ? ' img-loaded' : ''}`}
            loading="lazy"
            onLoad={onImgLoad}
          />
        </div>
        <div className="project-eye-overlay">
          <div className="project-eye-icon"><Eye size={26} /></div>
        </div>
      </div>
      <div className="project-body">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <div className="project-stack">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="stack-tag">{tech}</span>
          ))}
          {project.stack.length > 3 && (
            <span className="stack-tag stack-tag-more">+{project.stack.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ───────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [ref, isVisible] = useIntersection();

  const allFiltered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  const featuredList = allFiltered.filter((p) => p.featured);
  const regularList  = allFiltered.filter((p) => !p.featured);

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">

        {/* Section header */}
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Projects that <span className="text-yellow">ship and scale.</span>
          </h2>
          <p className="section-subtitle">
            Real-world AI, web, and automation solutions built end-to-end —
            from architecture to deployment.
          </p>
        </div>

        {/* Filters */}
        <div
          className={`projects-filters fade-in-up${isVisible ? ' visible' : ''}`}
          style={{ '--delay': '0.08s' }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Featured showcase */}
        {featuredList.length > 0 && (
          <>
            <div
              className={`sc-section-label fade-in-up${isVisible ? ' visible' : ''}`}
              style={{ '--delay': '0.12s' }}
            >
              <div className="sc-rule" />
              <span className="sc-rule-text">Featured Work</span>
              <div className="sc-rule" />
            </div>

            <div className={`sc-list${isVisible ? ' visible' : ''}`}>
              {featuredList.map((project, i) => (
                <ShowcaseCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setActiveProject}
                  delay={0.16 + i * 0.1}
                />
              ))}
            </div>
          </>
        )}

        {/* Separator */}
        {featuredList.length > 0 && regularList.length > 0 && (
          <div
            className={`projects-divider fade-in-up${isVisible ? ' visible' : ''}`}
            style={{ '--delay': '0.22s' }}
          >
            <div className="projects-divider-line" />
            <span className="projects-divider-label">More Projects</span>
            <div className="projects-divider-line" />
          </div>
        )}

        {/* Regular grid */}
        {regularList.length > 0 && (
          <div className={`projects-grid${isVisible ? ' visible' : ''}`}>
            {regularList.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setActiveProject}
                delay={0.26 + i * 0.05}
              />
            ))}
          </div>
        )}

        {allFiltered.length === 0 && (
          <p className="projects-empty">No projects in this category yet.</p>
        )}

      </div>

      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
