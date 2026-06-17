import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Download, Terminal } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Hero.css';

const RoleTyping = () => {
  const roles = ['Full Stack Engineer', 'React Specialist', 'Backend Developer', 'MERN Stack Developer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="role-typing-wrapper">
      a  &nbsp; <span className="role-text">{currentText}</span>
      <span className="typing-cursor">|</span>
    </span>
  );
};

const Hero = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const userName = import.meta.env.VITE_USER_NAME;
  const userEmail = import.meta.env.VITE_USER_EMAIL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

  return (
    <section id="home" className="hero-section">
      <div className="glow-blob glow-primary"></div>
      <div className="glow-blob glow-secondary"></div>

      <div className="container hero-container grid-2">
        <div className="hero-content">
          <ScrollReveal variant="fade-right" delay={0}>
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              <span>Available for New Opportunities</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={150}>
            <h1 className="hero-title">
              Hi, I'm <span className="highlight-text">{userName}</span>
              <br />
              <RoleTyping />
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={300}>
            <p className="hero-subtitle">
              I craft visually stunning, highly interactive web applications that balance clean styling with powerful frontend performance. Specializing in modern React architecture.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={450}>
            <div className="hero-actions-group">
              <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleScrollTo('projects'); }}>
                Explore Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}>
                Let's Talk <Mail size={16} />
              </a>
              <a href="/resume.pdf" download="Shahnas_Resume.pdf" className="btn btn-secondary cv-btn">
                Download CV <Download size={16} />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={600}>
            <div className="hero-socials">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Premium Terminal Mockup */}
        <ScrollReveal variant="scale-up" delay={300} className="hero-visual-reveal-wrapper">
          <div className="hero-visual animate-float">
            <div className="terminal-window glass">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="terminal-title">
                  <Terminal size={12} /> developer.js
                </div>
                <div className="terminal-action"></div>
              </div>

              <div className="terminal-body">
                <pre>
                  <code>
                    <span className="code-keyword">const</span> developer = &#123;
                    name: <span className="code-string">'{userName}'</span>,
                    title: <span className="code-string">'Full Stack Developer'</span>,
                    skills: [
                    <span className="code-string">'JavaScript'</span>, <span className="code-string">'TypeScript'</span>,
                    <span className="code-string">'React.js'</span>, <span className="code-string">'Node.js'</span>,
                    <span className="code-string">'Express.js'</span>, <span className="code-string">'MongoDB'</span>,
                    <span className="code-string">'gRPC'</span>, <span className="code-string">'Microservices'</span>
                    ],
                    passion: <span className="code-string">'Building scalable systems & SaaS'</span>,
                    hardWorker: <span className="code-boolean">true</span>,
                    problemSolver: <span className="code-boolean">true</span>,
                    yearsOfExperience: <span className="code-number">3</span>
                    &#125;;

                    <span className="code-comment">// Ready to build something epic?</span>
                    developer.collaborate();
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
