import React from 'react';
import { Code, Database, Cpu, Award, Briefcase, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <Briefcase size={20} className="stat-icon-blue" />, value: '3+', label: 'Years Experience' },
    { icon: <Award size={20} className="stat-icon-teal" />, value: '6', label: 'Projects Completed' },
    { icon: <Zap size={20} className="stat-icon-purple" />, value: '100%', label: 'Commitment' },
  ];

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code size={20} />,
      skills: ['React.js', 'React Native (Basics)', 'Redux', 'Redux Toolkit', 'JavaScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      title: 'Backend & Architecture',
      icon: <Database size={20} />,
      skills: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Microservices', 'Clean Architecture', 'gRPC Communication', 'RESTful APIs', 'JWT Auth', 'Stripe Integration'],
    },
    {
      title: 'Tools & Methodologies',
      icon: <Cpu size={20} />,
      skills: ['Jest (Unit Testing)', 'Git & GitHub', 'Postman', 'Webpack', 'Parcel', 'C Language', 'Agile Methodology'],
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="glow-blob glow-accent" style={{ top: '30%', left: '10%' }}></div>
      
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title text-gradient">My Journey & Background</h2>
          <p className="section-desc">
            From exploring the laws of physics to engineering enterprise SaaS applications, here is a look at my background and core competencies.
          </p>
        </div>

        <div className="grid-2 about-grid">
          {/* Biography and Stats */}
          <div className="about-bio-panel">
            <h3 className="about-subtitle">Physics Graduate Turned Full-Stack Software Engineer</h3>
            
            <p className="about-text">
              My journey is defined by a transition from **Physics to Software Engineering**. After completing my BSc in Physics at Calicut University in 2019, I channeled my analytical skills into programming, completing a Certified Full Stack Developer track in MERN stack.
            </p>
            
            <p className="about-text">
              Since then, I have advanced from a MERN Intern to a **Full Stack Developer** at Fieldiva, contributing to robust multi-tenant SaaS platforms, custom form-builder logic, gRPC-based microservice communications, and Stripe payment processors. I thrive on clean architecture and high-performance development.
            </p>

            <div className="stats-container">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card glass">
                  <div className="stat-icon-wrapper">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Skills */}
          <div className="about-skills-panel">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="skills-category-card glass">
                <div className="skills-category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h4>{category.title}</h4>
                </div>
                
                <div className="skills-chips-wrapper">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
