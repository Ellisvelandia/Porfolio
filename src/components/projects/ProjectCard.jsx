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
      className={`relative w-full aspect-[16/12] sm:aspect-video rounded-xl overflow-hidden group transition-all duration-300 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-black/90 border-green-400/60 focus:ring-green-400' : 'bg-emerald-900/95 border-emerald-400 focus:ring-emerald-400'} border-2`}
      style={{
        boxShadow: isActive ? (theme === 'dark' ? '0 8px 32px -4px rgba(74, 222, 128, 0.4)' : '0 8px 32px -4px rgba(16, 185, 129, 0.4)') : theme === 'dark' ? '0 4px 16px -4px rgba(74, 222, 128, 0.3)' : '0 4px 16px -4px rgba(16, 185, 129, 0.3)',
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
        className={`absolute inset-0 opacity-0 pointer-events-none ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100/10'}`}
        style={{
          boxShadow: theme === 'dark' ? "inset 0 0 30px rgba(59, 130, 246, 0.2)" : "inset 0 0 30px rgba(59, 130, 246, 0.15)",
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
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900/95' : 'bg-gradient-to-b from-white/10 via-emerald-900/60 to-emerald-900/90'}`} />

      {/* Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-end transform-gpu z-20 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'} transition-all duration-300`}
      >
        <div className="space-y-2 sm:space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2" aria-label="Project technologies">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-green-900/60 text-green-300' : 'bg-emerald-700 text-emerald-100'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]' : 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]'}`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={`text-sm sm:text-base font-light line-clamp-2 ${theme === 'dark' ? 'text-green-100' : 'text-emerald-100'}`}>
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
                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                : 'bg-emerald-600 hover:bg-emerald-500 text-emerald-100'
              }
              backdrop-blur-sm border z-30 relative
              ${theme === 'dark'
                ? 'border-green-400/50 hover:border-green-400/70'
                : 'border-emerald-400/70 hover:border-emerald-300'
              }
              relative overflow-hidden hover:shadow-lg cursor-pointer font-medium
              ${theme === 'dark'
                ? 'hover:shadow-green-400/30'
                : 'hover:shadow-emerald-400/40'
              }
            `}
            aria-label={`Visit ${project.title} project in a new tab`}
          >
            <span className="relative z-10 font-medium">Visit Project</span>
            <div className="relative z-10 flex items-center">
              <div className={`flex items-center transition-all duration-300 transform group-hover:translate-x-1`}>
                <span className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 transform group-hover:rotate-45 ${theme === 'dark' ? 'text-green-400' : 'text-green-500 hover:text-green-400'}`}>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M7 17L17 7M17 7H8M17 7V16" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`${theme === 'dark' ? 'drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]' : 'drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]'}`}
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/30' : 'bg-gradient-to-r from-emerald-600/0 via-emerald-600/20 to-emerald-600/30'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
