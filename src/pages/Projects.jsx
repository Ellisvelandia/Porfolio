import React, { useRef, useEffect, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import PageLayout from '../components/layout/PageLayout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faArrowDown, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);
  const projectsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: 1,
      title: "SoloSpeak",
      description: "A language learning platform for practicing conversations",
      videoSrc: "/projects/solospeak.webm",
      fallbackImage: "/projects/solospeak.jpg",
      tags: ["React", "Web Development", "Language Learning"],
      links: {
        demo: "https://solospeak.netlify.app/login",
      },
      bgColor: "rgba(15, 23, 42, 0.75)",
      accentColor: "rgba(56, 189, 248, 0.15)"
    },
    {
      id: 2,
      title: "POS Cantina",
      description: "Point of Sale system for cantina management",
      videoSrc: "/projects/poscantina.webm",
      fallbackImage: "/projects/poscantina.png",
      tags: ["Web App", "POS System", "Management"],
      links: {
        demo: "https://poscantina.netlify.app/",
      },
      bgColor: "rgba(15, 23, 42, 0.75)",
      accentColor: "rgba(244, 114, 182, 0.15)"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup animation with adjusted mobile positioning
      gsap.fromTo(containerRef.current,
        { 
          opacity: 0, 
          y: isMobile ? 20 : 50 // Reduced y offset for mobile
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: isMobile ? 0.8 : 1, 
          ease: "power3.out" 
        }
      );

      // Create perspective effect for non-active cards with adjusted mobile spacing
      projectsRef.current.forEach((card, i) => {
        if (i !== currentIndex) {
          gsap.set(card, {
            opacity: 0.3,
            scale: isMobile ? 0.9 : 0.85,
            ...(isMobile ? {
              y: i < currentIndex ? -50 : 50, // Reduced vertical offset for mobile
              transformOrigin: i < currentIndex ? "bottom center" : "top center",
            } : {
              x: i < currentIndex ? -100 : 100,
              rotationY: i < currentIndex ? -15 : 15,
              transformOrigin: i < currentIndex ? "right center" : "left center",
            })
          });
        }
      });

      // Ambient background animation
      gsap.to(".ambient-bg", {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        ease: "none",
        yoyo: true
      });
    });

    return () => ctx.revert();
  }, [currentIndex, isMobile]); // Added isMobile to dependencies

  const navigateCarousel = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, projects.length - 1)
      : Math.max(currentIndex - 1, 0);

    if (newIndex !== currentIndex) {
      const timeline = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.inOut" }
      });

      // Animate out current card
      timeline.to(projectsRef.current[currentIndex], {
        opacity: 0.3,
        scale: 0.85,
        ...(isMobile ? {
          y: direction === 'next' ? -100 : 100,
        } : {
          x: direction === 'next' ? -100 : 100,
          rotationY: direction === 'next' ? -15 : 15,
        })
      });

      // Animate in new card
      timeline.to(projectsRef.current[newIndex], {
        opacity: 1,
        scale: 1,
        ...(isMobile ? {
          y: 0,
        } : {
          x: 0,
          rotationY: 0,
        })
      }, "<");

      // Update perspective for other cards
      projectsRef.current.forEach((card, i) => {
        if (i !== newIndex) {
          timeline.to(card, {
            opacity: 0.3,
            scale: 0.85,
            ...(isMobile ? {
              y: i < newIndex ? -100 : 100,
            } : {
              x: i < newIndex ? -100 : 100,
              rotationY: i < newIndex ? -15 : 15,
            })
          }, "<");
        }
      });

      setCurrentIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    navigateCarousel('prev');
  };

  const handleNext = () => {
    navigateCarousel('next');
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantMove = Math.abs(distance) > 50;

    if (isSignificantMove) {
      if (distance > 0) {
        navigateCarousel('next');
      } else {
        navigateCarousel('prev');
      }
    }
  };

  return (
    <PageLayout>
      <div 
        ref={containerRef} 
        className={`relative ${isMobile ? 'min-h-[calc(100vh-4rem)]' : 'min-h-screen'} overflow-hidden perspective-1000 py-4 sm:py-8`}
      >

        {/* Desktop Navigation Controls - Hidden on Mobile */}
        {!isMobile && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-10 px-4 md:px-8">
            <button
              onClick={() => navigateCarousel('prev')}
              className={`nav-button ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'} group`}
              disabled={currentIndex === 0}
            >
              <FontAwesomeIcon 
                icon={faAngleDoubleLeft} 
                className="text-2xl md:text-3xl text-matrix-accent-dark/70 group-hover:text-matrix-accent-dark transition-all duration-300 transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,255,140,0.5)]"
              />
            </button>
            <button
              onClick={() => navigateCarousel('next')}
              className={`nav-button ${currentIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'} group`}
              disabled={currentIndex === projects.length - 1}
            >
              <FontAwesomeIcon 
                icon={faAngleDoubleRight}
                className="text-2xl md:text-3xl text-matrix-accent-dark/70 group-hover:text-matrix-accent-dark transition-all duration-300 transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,255,140,0.5)]"
              />
            </button>
          </div>
        )}

        {/* Projects Carousel */}
        <div 
          ref={carouselRef}
          className={`relative flex flex-col ${isMobile ? 'h-[calc(100vh-8rem)]' : 'h-screen items-center justify-center'} gap-4`}
          style={{ 
            perspective: "1500px",
            transformStyle: "preserve-3d"
          }}
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchMove={isMobile ? onTouchMove : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          <div className={`relative ${isMobile ? 'h-full' : 'h-full w-full'} flex items-center justify-center`}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => projectsRef.current[index] = el}
                className={`absolute w-full max-w-5xl px-3 sm:px-4 md:px-8 transition-transform duration-700`}
                style={{
                  opacity: index === currentIndex ? 1 : 0.3,
                  transform: isMobile
                    ? `translateY(${(index - currentIndex) * 30}%) 
                       scale(${index === currentIndex ? 1 : 0.95})`
                    : `translateX(${(index - currentIndex) * 100}%) 
                       scale(${index === currentIndex ? 1 : 0.85})
                       rotateY(${index === currentIndex ? 0 : (index < currentIndex ? -15 : 15)}deg)`,
                  transformOrigin: isMobile
                    ? (index < currentIndex ? "bottom center" : "top center")
                    : (index < currentIndex ? "right center" : "left center"),
                  zIndex: index === currentIndex ? 10 : 0,
                }}
              >
                <ProjectCard 
                  project={{
                    ...project,
                    link: project.links.demo
                  }} 
                  isActive={index === currentIndex} 
                />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Controls */}
          {isMobile && (
            <div className="flex flex-col gap-2 items-center mt-auto pb-4">
              <div className="text-xs flex items-center gap-2 bg-black/40 dark:bg-matrix-darkest/40 text-white/90 dark:text-matrix-accent-dark/80 px-3 py-1 rounded-full backdrop-blur-sm">
                <span>Swipe or tap buttons</span>
                <FontAwesomeIcon 
                  icon={faArrowDown} 
                  className="h-3 w-3 animate-bounce"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`p-3 rounded-full ${
                    currentIndex === 0 
                      ? 'bg-slate-800/40 text-white/40 cursor-not-allowed' 
                      : 'bg-black/60 dark:bg-matrix-darkest/60 text-white/90 dark:text-matrix-accent-dark active:scale-95'
                  } border-slate-600/50 dark:border-matrix-accent-dark/30 border backdrop-blur-sm transition-all duration-300`}
                >
                  <FontAwesomeIcon 
                    icon={faChevronUp} 
                    className="h-4 w-4"
                  />
                </button>
                <div className={`px-3 py-1 rounded-full bg-black/60 dark:bg-matrix-darkest/60 text-white/90 dark:text-matrix-accent-dark backdrop-blur-sm text-sm font-medium`}>
                  {currentIndex + 1} / {projects.length}
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === projects.length - 1}
                  className={`p-3 rounded-full ${
                    currentIndex === projects.length - 1
                      ? 'bg-slate-800/40 text-white/40 cursor-not-allowed'
                      : 'bg-black/60 dark:bg-matrix-darkest/60 text-white/90 dark:text-matrix-accent-dark active:scale-95'
                  } border-slate-600/50 dark:border-matrix-accent-dark/30 border backdrop-blur-sm transition-all duration-300`}
                >
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
