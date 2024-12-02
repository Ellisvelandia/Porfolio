import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const LoadingAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          onComplete
        });
      }
    });

    gsap.set(".letter-path", { 
      strokeDasharray: function(index, element) {
        return element.getTotalLength() + " " + element.getTotalLength();
      },
      strokeDashoffset: function(index, element) {
        return element.getTotalLength();
      },
      fill: "rgba(0,0,0,0)"
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
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
    >
      <div className="text-center">
        <div className="relative">
          <svg className="w-64 h-32" viewBox="0 0 500 140">
            <line className="accent-line" x1="40" y1="110" x2="460" y2="110" 
                  stroke="#0F0" strokeWidth="1" opacity="0.1"/>
            <line className="accent-line" x1="40" y1="10" x2="460" y2="10" 
                  stroke="#0F0" strokeWidth="1" opacity="0.1"/>
            
            <path className="letter-path" 
                  d="M 60,20 L 60,100 L 120,100 L 120,85 L 75,85 L 75,65 L 110,65 L 110,50 L 75,50 L 75,35 L 120,35 L 120,20 Z" 
                  fill="none" 
                  stroke="#0F0" 
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"/>
            
            <path className="letter-path" 
                  d="M 140,20 L 140,100 L 200,100 L 200,85 L 155,85 L 155,20 Z" 
                  fill="none" 
                  stroke="#0F0" 
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"/>
            
            <path className="letter-path" 
                  d="M 220,20 L 220,100 L 280,100 L 280,85 L 235,85 L 235,20 Z" 
                  fill="none" 
                  stroke="#0F0" 
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"/>
            
            <path className="letter-path" 
                  d="M 300,20 L 300,100 L 315,100 L 315,20 Z" 
                  fill="none" 
                  stroke="#0F0" 
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"/>
            
            <path className="letter-path" 
                  d="M 400,35 L 345,35 L 345,20 L 415,20 L 415,55 L 360,55 L 360,85 L 415,85 L 415,100 L 345,100 L 345,85 L 400,85 L 400,70 L 345,70 L 345,35" 
                  fill="none" 
                  stroke="#0F0" 
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"/>

            <circle className="letter-path" cx="440" cy="30" r="4" 
                    fill="none" stroke="#0F0" strokeWidth="2"/>
            <circle className="letter-path" cx="440" cy="90" r="4" 
                    fill="none" stroke="#0F0" strokeWidth="2"/>
          </svg>
        </div>
        <div className="mt-6 relative overflow-hidden">
          <div 
            className="role-text text-sm text-green-500 tracking-widest font-light uppercase transform translate-y-4 opacity-0"
            style={{ letterSpacing: '0.2em' }}
          >
            Software Developer
          </div>
          <div className="underline h-[1px] w-0 bg-green-500 mt-2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
