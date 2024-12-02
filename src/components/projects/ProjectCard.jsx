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
      className={`
        relative w-full aspect-[16/12] sm:aspect-video rounded-xl overflow-hidden group 
        transition-all duration-300
        ${theme === 'dark'
          ? 'bg-black/40 border-matrix-accent-dark/20'
          : 'bg-white/90 border-emerald-200/60'
        } border-2
      `}
      style={{
        boxShadow: isActive 
          ? theme === 'dark'
            ? '0 8px 32px -4px rgba(0, 255, 140, 0.25)'
            : '0 8px 32px -4px rgba(16, 185, 129, 0.25)'
          : theme === 'dark'
            ? '0 4px 16px -4px rgba(0, 255, 140, 0.15)'
            : '0 4px 16px -4px rgba(16, 185, 129, 0.15)'
      }}
    >
      {/* Ambient Glow Effect */}
      <div
        ref={glowRef}
        className={`absolute inset-0 opacity-0 pointer-events-none ${
          theme === 'dark'
            ? 'bg-matrix-accent-dark/20'
            : 'bg-emerald-500/10'
        }`}
        style={{
          boxShadow: theme === 'dark'
            ? "inset 0 0 30px rgba(0, 255, 140, 0.2)"
            : "inset 0 0 30px rgba(16, 185, 129, 0.15)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Media Layer - Conditional Video/Image */}
      {useVideoFallback ? (
        <div
          className={`absolute inset-0 w-full h-full ${isActive ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300`}
          style={{
            backgroundImage: `url(${project.fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: theme === 'dark'
              ? "brightness(0.9) contrast(1.2) hue-rotate(120deg)"
              : "brightness(1.1) contrast(1.1) saturate(1.2)",
            transform: isActive ? "scale(1.1)" : "scale(1.05)",
            transition: "all 0.7s ease-out",
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={project.videoSrc}
            className={`absolute w-full h-full object-cover ${isActive ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300`}
            style={{
              filter: theme === 'dark'
                ? "brightness(0.9) contrast(1.2) hue-rotate(120deg)"
                : "brightness(1.1) contrast(1.1) saturate(1.2)",
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
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-black/40 via-black/80 to-black/95'
          : 'bg-gradient-to-b from-white/10 via-emerald-900/60 to-emerald-900/90'
      }`} />

      {/* Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-end transform-gpu ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
        } transition-all duration-300`}
      >
        {/* Title */}
        <h3 className={`text-xl sm:text-2xl font-bold mb-2 tracking-tight ${
          theme === 'dark'
            ? 'text-matrix-accent-dark drop-shadow-[0_0_8px_rgba(0,255,140,0.3)]'
            : 'text-emerald-50 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]'
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-sm sm:text-base mb-3 sm:mb-4 font-light line-clamp-2 ${
          isActive ? 'line-clamp-none' : ''
        } ${
          theme === 'dark'
            ? 'text-matrix-text-dark/90'
            : 'text-emerald-50/95'
        }`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium
                ${theme === 'dark'
                  ? 'bg-matrix-darkest/40 text-matrix-accent-dark border-matrix-accent-dark/20'
                  : 'bg-emerald-900/40 text-emerald-100 border-emerald-400/30'
                } border shadow-lg ${
                  theme === 'dark'
                    ? 'shadow-matrix-accent-dark/5'
                    : 'shadow-emerald-500/5'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex gap-4">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-md overflow-hidden
                backdrop-blur-sm border font-medium text-sm
                transition-all duration-300 transform hover:scale-105 active:scale-95
                ${theme === 'dark'
                  ? 'bg-matrix-accent-dark/20 text-matrix-accent-dark border-matrix-accent-dark/30 hover:bg-matrix-accent-dark/30'
                  : 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30 hover:bg-emerald-500/30'
                }`}
              style={{
                boxShadow: theme === 'dark'
                  ? "0 0 20px rgba(0, 255, 140, 0.15)"
                  : "0 0 20px rgba(16, 185, 129, 0.15)",
                textShadow: theme === 'dark'
                  ? "0 0 8px rgba(0, 255, 140, 0.3)"
                  : "0 0 8px rgba(16, 185, 129, 0.3)",
              }}
            >
              <span className="relative z-10">View Project</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
