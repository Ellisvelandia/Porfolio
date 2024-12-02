import React, { useRef, useEffect, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import PageLayout from '../components/layout/PageLayout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const projectsRef = useRef([]);
  const containerRef = useRef(null);

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
      // Initial setup animation
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Create perspective effect for non-active cards
      projectsRef.current.forEach((card, i) => {
        if (i !== currentIndex) {
          gsap.set(card, {
            opacity: 0.3,
            scale: 0.85,
            rotationY: i < currentIndex ? -15 : 15,
            x: i < currentIndex ? -100 : 100,
            transformOrigin: i < currentIndex ? "right center" : "left center",
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
  }, []);

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
        rotationY: direction === 'next' ? -15 : 15,
        x: direction === 'next' ? -100 : 100,
      });

      // Animate in new card
      timeline.to(projectsRef.current[newIndex], {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        x: 0,
      }, "<");

      // Update perspective for other cards
      projectsRef.current.forEach((card, i) => {
        if (i !== newIndex) {
          timeline.to(card, {
            opacity: 0.3,
            scale: 0.85,
            rotationY: i < newIndex ? -15 : 15,
            x: i < newIndex ? -100 : 100,
          }, "<");
        }
      });

      setCurrentIndex(newIndex);
    }
  };

  return (
    <PageLayout>
      <div 
        ref={containerRef} 
        className="relative min-h-screen overflow-hidden perspective-1000"
      >
        {/* Ambient Background */}
        <div 
          className="ambient-bg absolute inset-0 opacity-15"
          style={{
            background: "linear-gradient(45deg, #0f172a, #1e293b, #0f172a)",
            backgroundSize: "400% 400%",
            filter: "blur(120px)"
          }}
        />

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-10 px-8">
          <button
            onClick={() => navigateCarousel('prev')}
            className={`nav-button ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            disabled={currentIndex === 0}
          >
            <FontAwesomeIcon 
              icon={faChevronLeft} 
              className="text-3xl text-white/70 hover:text-white transition-colors"
            />
          </button>
          <button
            onClick={() => navigateCarousel('next')}
            className={`nav-button ${currentIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            disabled={currentIndex === projects.length - 1}
          >
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="text-3xl text-white/70 hover:text-white transition-colors"
            />
          </button>
        </div>

        {/* Projects Carousel */}
        <div 
          ref={carouselRef}
          className="relative flex items-center justify-center h-screen"
          style={{ 
            perspective: "1500px",
            transformStyle: "preserve-3d"
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="absolute w-full max-w-5xl px-8 transition-transform duration-700"
              style={{
                opacity: index === currentIndex ? 1 : 0.3,
                transform: `translateX(${(index - currentIndex) * 120}%) 
                           scale(${index === currentIndex ? 1 : 0.85})
                           rotateY(${index === currentIndex ? 0 : (index < currentIndex ? -15 : 15)}deg)`,
                transformOrigin: index < currentIndex ? "right center" : "left center",
              }}
            >
              <ProjectCard 
                project={project} 
                isActive={index === currentIndex} 
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
