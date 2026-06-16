import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Contact.css';
import { submitContactForm } from '../api/web3forms';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const userEmail = import.meta.env.VITE_USER_EMAIL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

  return (
    <section id="contact" className="section contact-section">
      <div className="glow-blob glow-primary" style={{ top: '30%', right: '10%' }}></div>

      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className="section-header">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title text-gradient">Let's Build Something Epic</h2>
            <p className="section-desc">
              Have a project in mind, looking to hire, or just want to chat? Fill out the form and I'll get back to you soon.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid-2 contact-grid">
          {/* Contact Details Card Column */}
          <ScrollReveal variant="fade-right" delay={150}>
            <div className="contact-info-panel">
              <h3 className="contact-panel-title">Contact Information</h3>
              <p className="contact-panel-text">
                Feel free to reach out via email or connect with me on professional social platforms.
              </p>

              <div className="contact-cards-list">
                <div className="contact-detail-card glass">
                  <div className="contact-detail-icon-wrapper">
                    <Mail size={20} />
                  </div>
                  <div className="contact-detail-content">
                    <h5>Email Me</h5>
                    <a href={`mailto:${userEmail}`} className="contact-detail-link">
                      {userEmail}
                    </a>
                  </div>
                </div>

                <div className="contact-detail-card glass">
                  <div className="contact-detail-icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-detail-content">
                    <h5>Location</h5>
                    <span className="contact-detail-value">Kochi, Kerala, India </span>
                  </div>
                </div>
              </div>

              <div className="contact-social-section">
                <h4>Follow My Work</h4>
                <div className="contact-socials-grid">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link glass">
                    <Github size={20} /> <span>GitHub</span>
                  </a>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link glass">
                    <Linkedin size={20} /> <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form Column */}
          <ScrollReveal variant="fade-left" delay={150}>
            <div className="contact-form-panel">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="contact-form glass">
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && (
                        <span className="error-message">
                          <AlertCircle size={12} /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={errors.email ? 'input-error' : ''}
                      />
                      {errors.email && (
                        <span className="error-message">
                          <AlertCircle size={12} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Job Opportunity"
                      className={errors.subject ? 'input-error' : ''}
                    />
                    {errors.subject && (
                      <span className="error-message">
                        <AlertCircle size={12} /> {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hello! I would love to talk about building..."
                      className={errors.message ? 'input-error' : ''}
                    ></textarea>
                    {errors.message && (
                      <span className="error-message">
                        <AlertCircle size={12} /> {errors.message}
                      </span>
                    )}
                  </div>

                  {submitError && (
                    <div className="error-message submit-error" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.9rem', fontWeight: '500' }}>
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="contact-success-card glass">
                  <div className="success-icon-wrapper">
                    <CheckCircle size={48} />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for reaching out. Your message has been received, and I will get back to you as soon as possible.
                  </p>
                  <button onClick={handleReset} className="btn btn-secondary reset-btn">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
