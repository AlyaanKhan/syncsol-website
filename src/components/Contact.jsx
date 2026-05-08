import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useIntersection } from '../hooks/useIntersection';
import { Mail, MessageSquare, Send, CheckCircle, Linkedin, Instagram } from 'lucide-react';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { name: '', email: '', company: '', project_title: '', message: '' };

export default function Contact() {
  const [form, setForm]         = useState(INITIAL);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [ref, isVisible]        = useIntersection();

  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name          = 'Name is required.';
    if (!form.email.trim())         e.email         = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                    e.email         = 'Enter a valid email.';
    if (!form.project_title.trim()) e.project_title = 'Project title is required.';
    if (!form.message.trim())       e.message       = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     form.name,
          from_email:    form.email,
          company:       form.company || 'Not provided',
          project_title: form.project_title,
          message:       form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setForm(INITIAL);
      })
      .catch(() => {
        setLoading(false);
        setErrors({ message: 'Failed to send. Please email us at syncsoltechnologies@gmail.com' });
      });
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in-up${isVisible ? ' visible' : ''}`}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Ready to <span className="text-yellow">build something great?</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your project and we will get back to you within 24 hours.
          </p>
        </div>

        <div className={`contact-inner${isVisible ? ' visible' : ''}`}>

          {/* ── Left: Info cards ── */}
          <div className="contact-info fade-in-up">
            <div className="contact-info-card">
              <div className="contact-info-icon"><Mail size={22} /></div>
              <div>
                <p className="contact-info-label">Email us at</p>
                <a href="mailto:syncsoltechnologies@gmail.com" className="contact-info-value">
                  syncsoltechnologies@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><MessageSquare size={22} /></div>
              <div>
                <p className="contact-info-label">Response time</p>
                <p className="contact-info-value">Within 24 hours</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><Linkedin size={22} /></div>
              <div>
                <p className="contact-info-label">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/company/syncsol-technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                >
                  SyncSol Technologies
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><Instagram size={22} /></div>
              <div>
                <p className="contact-info-label">Instagram</p>
                <a
                  href="https://www.instagram.com/syncsolpk?igsh=MW03OXIyc2VkYnJrbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                >
                  @syncsolpk
                </a>
              </div>
            </div>

            <div className="contact-guarantee">
              <p className="contact-guarantee-title">What happens next?</p>
              <ol className="contact-steps">
                <li>We review your project details</li>
                <li>Schedule a discovery call</li>
                <li>Deliver a proposal within 48 hours</li>
              </ol>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-wrap fade-in-up" style={{ '--delay': '0.1s' }}>
            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={52} className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We will be in touch within 24 hours.</p>
                <button className="btn btn-yellow" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>

                {/* Row 1: Name + Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      className={`form-input${errors.name ? ' input-error' : ''}`}
                      placeholder="John Smith"
                      value={form.name} onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      className={`form-input${errors.email ? ' input-error' : ''}`}
                      placeholder="john@company.com"
                      value={form.email} onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Project Title + Company */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="project_title" className="form-label">Project Title *</label>
                    <input
                      id="project_title" name="project_title" type="text"
                      className={`form-input${errors.project_title ? ' input-error' : ''}`}
                      placeholder="e.g. E-commerce Platform"
                      value={form.project_title} onChange={handleChange}
                    />
                    {errors.project_title && <span className="form-error">{errors.project_title}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">Company Name</label>
                    <input
                      id="company" name="company" type="text"
                      className="form-input"
                      placeholder="Acme Corp (optional)"
                      value={form.company} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Tell us about your project *</label>
                  <textarea
                    id="message" name="message" rows={5}
                    className={`form-input form-textarea${errors.message ? ' input-error' : ''}`}
                    placeholder="Describe what you want to build, your timeline, and budget range..."
                    value={form.message} onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-yellow btn-lg btn-full" disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : <><Send size={16} /> Send Message</>}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
