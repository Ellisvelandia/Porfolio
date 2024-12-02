import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import MatrixRain from './components/MatrixRain';
import LoadingAnimation from './components/LoadingAnimation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skillset from './pages/Skillset';
import Contact from './pages/Contact';

const AppContent = ({ loading, setLoading }) => {
  const { theme } = useTheme();

  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-hidden">
        <MatrixRain />
        <div className={`relative z-10 min-h-screen ${
          theme === 'dark' 
            ? 'bg-transparent text-matrix-text-dark' 
            : 'bg-transparent text-matrix-text-light'
        } font-mono`}>
          {loading ? (
            <LoadingAnimation onComplete={() => setLoading(false)} />
          ) : (
            <>
              <Navbar />
              <div className="relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/skillset" element={<Skillset />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
            </>
          )}
        </div>
      </div>
    </Router>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <ThemeProvider>
      <AppContent loading={loading} setLoading={setLoading} />
    </ThemeProvider>
  );
};

export default App;