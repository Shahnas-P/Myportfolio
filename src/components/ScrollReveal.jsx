import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  variant = 'fade-up', // fade-up, fade-down, fade-left, fade-right, scale-up
  delay = 0, // delay in milliseconds
  duration = 800, // duration in milliseconds
  threshold = 0.08, // trigger when 5% of element is in viewport
  className = '',
  style = {},
}) => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just show content immediately
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // trigger slightly before it reaches the viewport bounds
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const combinedStyles = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  return (
    <div
      ref={elementRef}
      className={`reveal-container reveal-${variant} ${hasRevealed ? 'revealed' : ''} ${className}`}
      style={combinedStyles}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
