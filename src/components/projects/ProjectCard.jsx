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
          opacity: 0.6,
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
      className="relative w-full aspect-video rounded-lg overflow-hidden group bg-black/40 border border-matrix-accent-dark/20"
    >
      {/* Ambient Glow Effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none bg-matrix-accent-dark/20"
        style={{
          boxShadow: "inset 0 0 30px rgba(0, 255, 140, 0.2)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Media Layer - Conditional Video/Image */}
      {useVideoFallback ? (
        <div
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `url(${project.fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.9) contrast(1.2) hue-rotate(120deg)",
            transform: "scale(1.1)",
            transition: "transform 0.7s ease-out",
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={project.videoSrc}
            className="absolute w-[100%] h-[100%] object-cover opacity-20"
            style={{
              filter: "brightness(0.9) contrast(1.2) hue-rotate(120deg)",
              transform: "scale(1.1)",
              transition: "transform 0.7s ease-out",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/95" />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 p-6 flex flex-col justify-end transform-gpu"
      >
        {/* Title */}
        <h3 className="text-2xl font-bold text-matrix-accent-dark mb-2 tracking-tight drop-shadow-[0_0_8px_rgba(0,255,140,0.3)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-base text-matrix-text-dark/90 mb-4 line-clamp-2 font-light">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded text-sm font-medium
                       bg-matrix-darkest/40 text-matrix-accent-dark
                       border border-matrix-accent-dark/20 shadow-lg shadow-matrix-accent-dark/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-4 py-2 rounded-md overflow-hidden
                       bg-matrix-accent-dark/20 text-matrix-accent-dark font-medium text-sm
                       hover:bg-matrix-accent-dark/30 transition-colors duration-300
                       transform hover:scale-105 active:scale-95 border border-matrix-accent-dark/30"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 140, 0.15)",
                textShadow: "0 0 8px rgba(0, 255, 140, 0.3)",
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
