import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import WorkGrid from './components/WorkGrid';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Ticker */}
      <Ticker />
      
      {/* Work Grid */}
      <WorkGrid />
      
      {/* Philosophy */}
      <Philosophy />
      
      {/* Process */}
      <Process />
      
      {/* Clients */}
      <Clients />
      
      {/* Contact CTA */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
