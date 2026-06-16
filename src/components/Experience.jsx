import React from 'react';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Fieldiva',
      period: 'March 2025 - Present',
      type: 'work',
      desc: [
        'Build backend APIs using Node.js, Express.js, and TypeScript, following Clean Architecture principles.',
        'Implement high-speed gRPC-based microservice communication and JWT service authentications.',
        'Develop dynamic Custom Form Builder features, CSV export modules, and multi-tenant SaaS capabilities.',
        'Work on map visualizations, field user tracking elements, and Redux-based admin portal panels.',
      ],
      tech: ['Node.js', 'Express.js', 'TypeScript', 'gRPC', 'Clean Architecture', 'React.js', 'Redux', 'JWT', 'SaaS'],
    },
    {
      role: 'Software Engineer',
      company: 'Starshot Development Pvt Ltd',
      period: 'April 2023 - August 2024',
      type: 'work',
      desc: [
        'Developed robust REST APIs and optimized MongoDB database index queries for enhanced performance.',
        'Collaborated closely with React frontend teams to integrate stateful endpoints.',
        'Implemented secure JWT user authentication and introduced Jest unit testing flows within an Agile environment.',
      ],
      tech: ['REST APIs', 'Node.js', 'React.js', 'MongoDB', 'JWT', 'Jest', 'Agile'],
    },
    {
      role: 'Intern – Full Stack Developer (MERN)',
      company: 'Luminar Technolab',
      period: 'November 2022 - April 2023',
      type: 'work',
      desc: [
        'Built scalable full-stack applications, working on responsive frontend layouts and backend routing tables.',
        'Participated actively in daily stand-ups, sprint planning, and sprint reviews.',
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Agile'],
    },
    {
      role: 'Certified Full Stack Developer (MERN)',
      company: 'Luminar Technolab (NACTET Certification)',
      period: '2022',
      type: 'edu',
      desc: [
        'Completed intensive hands-on certification path covering JavaScript, MongoDB database design, web application development, and RESTful service patterns.',
      ],
      tech: ['React.js', 'Express.js', 'MongoDB', 'Node.js', 'JavaScript'],
    },
    {
      role: 'Bachelor of Science (BSc) in Physics',
      company: 'Calicut University',
      period: '2019',
      type: 'edu',
      desc: [
        'Developed deep analytical, quantitative problem-solving, and mathematical modeling methodologies that eased the transition into logical software engineering.',
      ],
      tech: ['Analytical Thinking', 'Mathematical Modeling', 'Scientific Logic'],
    },
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="glow-blob glow-secondary" style={{ top: '20%', left: '-10%' }}></div>
      <div className="glow-blob glow-accent" style={{ bottom: '10%', right: '-10%' }}></div>

      <div className="container">
        <div className="section-header">
          <span className="section-tag">Career Journey</span>
          <h2 className="section-title text-gradient">Experience & Education</h2>
          <p className="section-desc">
            A timeline of my professional accomplishments, academic background, and technical milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-container">
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              {/* Timeline Icon Node */}
              <div className={`timeline-icon-node ${exp.type}`}>
                {exp.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>

              {/* Timeline Content */}
              <div className="timeline-content-wrapper">
                <div className="timeline-card glass">
                  {/* Period Badge */}
                  <div className="timeline-period-badge">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="timeline-role-title">{exp.role}</h3>
                  <h4 className="timeline-company-name">{exp.company}</h4>

                  <ul className="timeline-desc-list">
                    {exp.desc.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="timeline-card-tech">
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx} className="timeline-tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
