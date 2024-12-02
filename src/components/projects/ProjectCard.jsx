import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const ProjectCard = ({ project, isActive }) => {
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
              video.addEventListener('loadeddata', resolve, { once: true });
              video.addEventListener('error', reject, { once: true });
              video.load();
            });
            
            // Try to play the video
            await video.play();
            
            gsap.to(video, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out"
            });
          } catch (err) {
            console.warn("Video playback failed, falling back to image:", err);
            setUseVideoFallback(true);
          }
        };

        loadVideo();

        // Animate content and glow
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );

        gsap.to(glowRef.current, {
          opacity: 0.6,
          duration: 1,
          ease: "power2.inOut"
        });

      } else if (video && !useVideoFallback) {
        video.pause();
        gsap.to(video, {
          opacity: 0.3,
          duration: 0.4,
          ease: "power2.in"
        });

        gsap.to([contentRef.current, glowRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });
      }
    });

    return () => ctx.revert();
  }, [isActive, useVideoFallback]);

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
      className="relative w-full aspect-video rounded-2xl overflow-hidden group"
      style={{
        transform: "translateZ(0)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}
    >
      {/* Ambient Glow Effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)`,
          filter: "blur(40px)",
          transform: "translateZ(0)"
        }}
      />

      {/* Media Layer - Conditional Video/Image */}
      {useVideoFallback ? (
        <div
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `url(${project.fallbackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: "brightness(0.85) contrast(1.1)",
            transform: "scale(1.1)",
            transition: "transform 0.7s ease-out",
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={project.videoSrc}
            className="absolute w-[100%] h-[100%] object-cover opacity-30"
            style={{ 
              filter: "brightness(0.85) contrast(1.1)",
              transform: "scale(1.1)",
              transition: "transform 0.7s ease-out",
              willChange: "transform, opacity",
              objectFit: "cover",
              objectPosition: "center"
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
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom, 
            transparent 0%, 
            ${project.bgColor} 40%, 
            ${project.bgColor} 100%
          )`,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 p-10 flex flex-col justify-end transform-gpu"
      >
        {/* Title */}
        <h3 className="text-4xl font-bold text-white/95 mb-4 tracking-tight">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-xl text-white/85 mb-6 line-clamp-2 font-light">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg text-sm font-medium
                       bg-white/[0.08] text-white/90
                       border border-white/[0.05] shadow-xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex gap-4">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 rounded-xl overflow-hidden
                       bg-white/[0.98] text-slate-900 font-medium text-lg
                       hover:bg-white transition-colors duration-300
                       transform hover:scale-105 active:scale-95"
              style={{ 
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                transformStyle: "preserve-3d"
              }}
            >
              <span className="relative z-10">View Demo</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 
                            transition-transform duration-300 origin-left" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;