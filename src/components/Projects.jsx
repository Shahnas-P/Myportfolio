import React, { useState } from 'react';
import { Github, ExternalLink, Folder, Layers, Shield, Sparkles, CreditCard, Users, Contact } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const [transformStyle, setTransformStyle] = useState('');
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const wrapper = e.currentTarget;
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the wrapper (remains stable)
    const y = e.clientY - rect.top;  // y coordinate within the wrapper (remains stable)

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const dx = x - xc;
    const dy = y - yc;

    // Maximum rotation angle in degrees (15 is the premium sweet spot)
    const maxRotate = 15;
    const tiltX = -(dy / yc) * maxRotate;
    const tiltY = (dx / xc) * maxRotate;

    // Calculate percentage coordinates for gradient background spot light reflection
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    setTransformStyle(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);
    setShineStyle({
      opacity: 0.1,
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShineStyle({ opacity: 0 });
  };

  return (
    <div
      className="project-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'block', height: '100%' }}
    >
      <article
        className="project-card glass"
        style={{
          transform: transformStyle,
          transition: transformStyle ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          height: '100%'
        }}
      >
        {/* Reflective gloss overlay */}
        <div className="project-card-shine" style={shineStyle} />

        {/* Graphic Header */}
        <div className="project-card-header" style={{ background: project.gradient }}>
          <div className="project-card-header-overlay"></div>
          <div className="project-card-icon-wrapper">
            {project.icon}
          </div>
        </div>

        {/* Body */}
        <div className="project-card-body">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>

          <div className="project-card-tech">
            {project.tech.map((t, idx) => (
              <span key={idx} className="project-tech-chip">
                {t}
              </span>
            ))}
          </div>

          {/* <div className="project-card-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Repository">
              <Github size={18} />
              <span>Repository</span>
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link live" aria-label="Live Demo">
              <ExternalLink size={18} />
              <span>Demo</span>
            </a>
          </div> */}
        </div>
      </article>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'backend', name: 'Backend & APIs' },
    { id: 'frontend', name: 'Frontend / Other' },
  ];

  const projectsData = [
    {
      title: 'Fieldiva Platform',
      desc: 'A multi-tenant SaaS field workforce management platform. Built gRPC-based microservices, dynamic Custom Form Builders, map visualizations, and admin portal integrations.',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'gRPC', 'React.js', 'Redux', 'Clean Architecture'],
      category: 'fullstack',
      icon: <Layers className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Reliance Jio Project',
      desc: 'Enterprise back-end system. Engineered high-throughput REST APIs, optimized complex MongoDB databases index queries, and configured automated unit testing routines.',
      tech: ['MongoDB', 'Node.js', 'Express.js', 'Jest', 'REST APIs'],
      category: 'backend',
      icon: <Shield className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Starshot Payment Module',
      desc: 'Secure payment orchestration service. Integrated Stripe for checkouts, simplified subscriber portals, and guaranteed microservice reliability.',
      tech: ['Express.js', 'MongoDB', 'Stripe', 'REST APIs', 'Jest'],
      category: 'backend',
      icon: <CreditCard className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Sourcer App',
      desc: 'A full-featured recruitment job board containing custom candidate dashboards, applicant profiles parsing, and customized AdminJS dashboards.',
      tech: ['React.js', 'Express.js', 'MongoDB', 'AdminJS', 'REST APIs'],
      category: 'fullstack',
      icon: <Sparkles className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Woosla App',
      desc: 'Collaborative platform enabling shared calendars, task boards, and directory operations across users and external organizations.',
      tech: ['React.js', 'Express.js', 'MongoDB', 'REST APIs'],
      category: 'fullstack',
      icon: <Users className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Contact Management App',
      desc: 'A clean CRUD directory portal that manages digital contact records, supporting filters, pagination, and details view cards.',
      tech: ['Angular', 'Express.js', 'MongoDB', 'REST APIs'],
      category: 'frontend',
      icon: <Contact className="proj-icon" size={24} />,
      gradient: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
      github: 'https://github.com',
      live: 'https://example.com',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section projects-section">
      <div className="glow-blob glow-primary" style={{ bottom: '10%', right: '10%' }}></div>

      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title text-gradient">Featured Projects</h2>
            <p className="section-desc">
              Explore a selected showcase of applications, detailing design, tech choices, and project contributions.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters Navbar */}
        <ScrollReveal variant="fade-up" delay={150}>
          <div className="projects-filter-bar">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid-3 projects-grid">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              variant="fade-up"
              delay={(index % 3) * 120}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
