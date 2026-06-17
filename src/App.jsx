import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

// Lazy load below-the-fold components to reduce initial bundle size and speed up mobile load
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ClickFireworks = lazy(() => import('./components/ClickFireworks'));

// Shared section fallback to prevent visual layout shifts (CLS)
const SectionFallback = () => (
  <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', opacity: 0.5 }}>
    Loading...
  </div>
);

function App() {
  const [enableFireworks, setEnableFireworks] = useState(false);

  useEffect(() => {
    // Only run expensive canvas fireworks on desktop screens and non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktopWidth = window.matchMedia('(min-width: 769px)').matches;
    if (!isTouchDevice && isDesktopWidth) {
      setEnableFireworks(true);
    }
  }, []);

  return (
    <>
      {enableFireworks && (
        <Suspense fallback={null}>
          <ClickFireworks />
        </Suspense>
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
