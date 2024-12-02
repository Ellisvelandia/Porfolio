import React, { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MatrixRain from './MatrixRain';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LoadingAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const ctx = useRef();

  // Create GSAP context on component mount
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, containerRef);
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // Ensure context and container exist
    if (!ctx.current || !containerRef.current) return;

    const paths = svgRef.current.querySelectorAll(".letter-path");
    if (!paths.length) return;

    ctx.current.add(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.5,
              delay: 0.3,
              onComplete
            });
          }
        }
      });

      // Initialize paths with safe length calculations
      paths.forEach((path) => {
        try {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: `${length} ${length}`,
            strokeDashoffset: length,
            fill: "rgba(0,0,0,0)"
          });
        } catch (error) {
          console.warn("Error calculating path length:", error);
          gsap.set(path, {
            strokeDasharray: "100 100",
            strokeDashoffset: 100,
            fill: "rgba(0,0,0,0)"
          });
        }
      });

      gsap.set(".accent-line", {
        scaleX: 0,
        opacity: 0
      });

      tl.to(".letter-path", {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.inOut"
      })
      .to(".letter-path", {
        fill: "currentColor",
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.inOut"
      }, "-=0.8")
      .to(".accent-line", {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5")
      .to(".role-text", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
    >
      <MatrixRain />
      <div className="text-center relative z-10">
        <div className="relative">
          <svg ref={svgRef} className="w-64 h-32" viewBox="0 0 500 140">
            <g className="text-[#00ff00]">
              <line className="accent-line" x1="40" y1="110" x2="460" y2="110" 
                    stroke="currentColor" strokeWidth="1" opacity="0.1"/>
              <line className="accent-line" x1="40" y1="10" x2="460" y2="10" 
                    stroke="currentColor" strokeWidth="1" opacity="0.1"/>
              
              {/* E */}
              <path className="letter-path" 
                    d="M 60,20 L 60,100 L 120,100 L 120,85 L 75,85 L 75,65 L 110,65 L 110,50 L 75,50 L 75,35 L 120,35 L 120,20 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"/>
              
              {/* L */}
              <path className="letter-path" 
                    d="M 140,20 L 140,100 L 200,100 L 200,85 L 155,85 L 155,20 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"/>
              
              {/* L */}
              <path className="letter-path" 
                    d="M 220,20 L 220,100 L 280,100 L 280,85 L 235,85 L 235,20 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"/>
              
              {/* I */}
              <path className="letter-path" 
                    d="M 300,20 L 300,100 L 315,100 L 315,20 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"/>
              
              {/* S */}
              <path className="letter-path" 
                    d="M 335,20 L 395,20 L 395,50 L 350,50 L 350,70 L 395,70 L 395,100 L 335,100 L 335,85 L 380,85 L 380,85 L 380,70 L 335,70 L 335,35 L 380,35 L 380,20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"/>
            </g>
          </svg>
          <div className="role-text opacity-0 translate-y-4 text-[#00ff00] text-sm mt-4">
            Full Stack Developer
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
