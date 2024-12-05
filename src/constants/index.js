import { 
  faHome,
  faUser,
  faLaptopCode,
  faDiagramProject,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub,
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

// Navigation
export const NAV_ITEMS = Object.freeze([
  { name: 'Home', path: '/', icon: faHome },
  { name: 'About', path: '/about', icon: faUser },
  { name: 'Skillset', path: '/skillset', icon: faLaptopCode },
  { name: 'Projects', path: '/projects', icon: faDiagramProject },
]);

// Social Links
export const SOCIAL_LINKS = Object.freeze([
  { icon: faGithub, url: 'https://github.com/Ellisvelandia', label: 'GitHub', external: true },
  { icon: faLinkedin, url: 'https://linkedin.com/in/ellisvelandia', label: 'LinkedIn', external: true },
  { icon: faEnvelope, url: '/contact', label: 'Contact', external: false },
]);

// Theme Colors
export const THEME_COLORS = Object.freeze({
  dark: Object.freeze({
    primary: '#00FF00',
    secondary: '#00DD00',
    tertiary: '#00AA00',
    background: 'black',
    text: 'rgba(255, 255, 255, 0.9)',
    accent: 'rgba(0, 255, 140, 0.5)',
  }),
  light: Object.freeze({
    primary: '#006400',
    secondary: '#008000',
    tertiary: '#009900',
    background: 'white',
    text: 'rgba(0, 0, 0, 0.9)',
    accent: 'rgba(0, 179, 127, 0.5)',
  })
});

// Skills Categories
export const SKILL_CATEGORIES = Object.freeze([
  { id: "all", label: "All Skills" },
  { id: "programming", label: "Programming" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & Services" },
]);

// Skills List
export const SKILLS = Object.freeze([
  { name: "React", category: "frontend", icon: "⚛️" },
  { name: "Node.js", category: "backend", icon: "🟢" },
  { name: "JavaScript", category: "programming", icon: "📜" },
  { name: "TypeScript", category: "programming", icon: "📘" },
  { name: "HTML", category: "frontend", icon: "🌐" },
  { name: "CSS", category: "frontend", icon: "🎨" },
  { name: "TailwindCSS", category: "frontend", icon: "💨" },
  { name: "Git", category: "tools", icon: "📚" },
  { name: "MongoDB", category: "backend", icon: "🍃" },
  { name: "Express", category: "backend", icon: "🚂" },
  { name: "Python", category: "programming", icon: "🐍" },
  { name: "VS Code", category: "tools", icon: "👨‍💻" },
]);

// Matrix Characters
export const MATRIX_CHARACTERS = Object.freeze("アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789");

// Animation Settings
export const ANIMATION_CONFIG = Object.freeze({
  fps: 30,
  fontSize: 16,
  matrixOpacity: Object.freeze({
    dark: 0.8,
    light: 0.6
  })
});
