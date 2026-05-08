import { Mail, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} aria-label="SyncSol Home">
            <img src="/Logo.jpeg" alt="SyncSol" height="36" className="footer-logo" />
          </a>
          <p className="footer-tagline">Build. Sync. Launch.</p>
          <p className="footer-desc">
            Modern software solutions for startups and businesses across the US and Canada.
          </p>
          <div className="footer-socials">
            <a
              href="mailto:syncsoltechnologies@gmail.com"
              className="footer-social-link"
              aria-label="Email SyncSol"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/syncsol-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="SyncSol on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/syncsolpk?igsh=MW03OXIyc2VkYnJrbA=="
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="SyncSol on Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="footer-nav-title">Navigation</p>
          <ul className="footer-nav-list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="footer-nav-link"
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <p className="footer-nav-title">Contact</p>
          <a href="mailto:syncsoltechnologies@gmail.com" className="footer-contact-email">
            syncsoltechnologies@gmail.com
          </a>
          <p className="footer-markets">Serving US &amp; Canadian markets</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} SyncSol. All rights reserved.
          </p>
          <button className="footer-scroll-top" onClick={scrollTop} aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
