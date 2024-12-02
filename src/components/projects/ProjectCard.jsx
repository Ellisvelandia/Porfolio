import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const ProjectCard = ({ project, isActive, theme }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const [useVideoFallback, setUseVideoFallback] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const video = videoRef.current;

      if (isActive && video && !useVideoFallback) {
        // Reset video to start and ensure it's loaded
        const loadVideo = async () => {
          try {
            video.currentTime = 0;

            // Create a promise to handle video loading
            await new Promise((resolve, reject) => {
              video.addEventListener("loadeddata", resolve, { once: true });
              video.addEventListener("error", reject, { once: true });
              video.load();
            });

            // Try to play the video
            await video.play();

            gsap.to(video, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          } catch (err) {
            console.warn("Video playback failed, falling back to image:", err);
            setUseVideoFallback(true);
          }
        };

        loadVideo();

        // Animate content and glow
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
          }
        );

        gsap.to(glowRef.current, {
          opacity: theme === 'dark' ? 0.6 : 0.3,
          duration: 1,
          ease: "power2.inOut",
        });
      } else if (video && !useVideoFallback) {
        video.pause();
        gsap.to(video, {
          opacity: 0.3,
          duration: 0.4,
          ease: "power2.in",
        });

        gsap.to([contentRef.current, glowRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [isActive, useVideoFallback, theme]);

  // Handle video errors
  const handleVideoError = (e) => {
    console.warn("Video error occurred:", e);
    setUseVideoFallback(true);
  };

  // Handle video loading
  const handleVideoLoadStart = () => {
    console.log("Video loading started");
  };

  const handleVideoLoadedData = () => {
    console.log("Video data loaded successfully");
  };

  return (
    <div
      ref={cardRef}
      role="article"
      tabIndex={0}
      aria-label={`Project: ${project.title}`}
      className={`relative w-full aspect-[16/12] sm:aspect-video rounded-xl overflow-hidden group transition-all duration-300 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-black/40 border-matrix-accent-dark/20 focus:ring-matrix-accent-dark' : 'bg-white/90 border-emerald-200/60 focus:ring-emerald-500'} border-2`}
      style={{
        boxShadow: isActive ? (theme === 'dark' ? '0 8px 32px -4px rgba(0, 255, 140, 0.25)' : '0 8px 32px -4px rgba(16, 185, 129, 0.25)') : theme === 'dark' ? '0 4px 16px -4px rgba(0, 255, 140, 0.15)' : '0 4px 16px -4px rgba(16, 185, 129, 0.15)',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(project.link, '_blank', 'noopener noreferrer');
        }
      }}
    >
      {/* Ambient Glow Effect */}
      <div
        ref={glowRef}
        className={`absolute inset-0 opacity-0 pointer-events-none ${theme === 'dark' ? 'bg-matrix-accent-dark/20' : 'bg-emerald-500/10'}`}
        style={{
          boxShadow: theme === 'dark' ? "inset 0 0 30px rgba(0, 255, 140, 0.2)" : "inset 0 0 30px rgba(16, 185, 129, 0.15)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Media Layer - Conditional Video/Image */}
      {useVideoFallback ? (
        <div
          role="img"
          aria-label={`${project.title} preview image`}
          className={`absolute inset-0 w-full h-full ${isActive ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300`}
          style={{
            backgroundImage: `url(${project.fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: theme === 'dark' ? "brightness(0.9) contrast(1.2) hue-rotate(120deg)" : "brightness(1.1) contrast(1.1) saturate(1.2)",
            transform: isActive ? "scale(1.1)" : "scale(1.05)",
            transition: "all 0.7s ease-out",
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={project.videoSrc}
            aria-label={`${project.title} preview video`}
            className={`absolute w-full h-full object-cover ${isActive ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300`}
            style={{
              filter: theme === 'dark' ? "brightness(0.9) contrast(1.2) hue-rotate(120deg)" : "brightness(1.1) contrast(1.1) saturate(1.2)",
              transform: isActive ? "scale(1.1)" : "scale(1.05)",
              transition: "all 0.7s ease-out",
              willChange: "transform, opacity",
              objectFit: "cover",
              objectPosition: "center",
            }}
            loop
            muted
            playsInline
            preload="auto"
            autoPlay={isActive}
            onError={handleVideoError}
            onLoadStart={handleVideoLoadStart}
            onLoadedData={handleVideoLoadedData}
          />
        </div>
      )}

      {/* Glass Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black/40 via-black/80 to-black/95' : 'bg-gradient-to-b from-white/10 via-emerald-900/60 to-emerald-900/90'}`} />

      {/* Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-end transform-gpu ${isActive ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'} transition-all duration-300`}
      >
        <div className="space-y-2 sm:space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2" aria-label="Project technologies">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-matrix-accent-dark/20 text-matrix-accent-dark' : 'bg-emerald-100 text-emerald-800'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-matrix-accent-dark drop-shadow-[0_0_8px_rgba(0,255,140,0.3)]' : 'text-emerald-50 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]'}`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={`text-sm sm:text-base font-light line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-emerald-50'}`}>
            {project.description}
          </p>

          {/* Link */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newWindow = window.open(project.link, '_blank');
              if (newWindow) newWindow.opener = null;
            }}
            className={`
              group inline-flex items-center gap-2 px-4 py-2 rounded-lg 
              transition-all duration-300 transform hover:-translate-y-0.5
              ${theme === 'dark' 
                ? 'bg-matrix-accent-dark/10 hover:bg-matrix-accent-dark/20 text-matrix-accent-dark'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-100'
              }
              backdrop-blur-sm border
              ${theme === 'dark'
                ? 'border-matrix-accent-dark/30 hover:border-matrix-accent-dark/50'
                : 'border-emerald-400/30 hover:border-emerald-400/50'
              }
              relative overflow-hidden hover:shadow-lg cursor-pointer
              ${theme === 'dark'
                ? 'hover:shadow-matrix-accent-dark/20'
                : 'hover:shadow-emerald-500/20'
              }
            `}
            aria-label={`Visit ${project.title} project in a new tab`}
          >
            <span className="relative z-10 font-medium">Visit Project</span>
            <div className="relative z-10 flex items-center">
              <div className={`
                flex items-center transition-all duration-300 transform
                group-hover:translate-x-1
              `}>
                <span className={`
                  w-5 h-5 flex items-center justify-center
                  transition-transform duration-300 transform
                  group-hover:rotate-45
                  ${theme === 'dark'
                    ? 'text-matrix-accent-dark'
                    : 'text-emerald-100'
                  }
                `}>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M7 17L17 7M17 7H8M17 7V16" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className={`
              absolute inset-0 -z-10 opacity-0 group-hover:opacity-100
              transition-all duration-300
              ${theme === 'dark' 
                ? 'bg-gradient-to-r from-matrix-accent-dark/0 via-matrix-accent-dark/5 to-matrix-accent-dark/10'
                : 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/10'
              }
            `} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
