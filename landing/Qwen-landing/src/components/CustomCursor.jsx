import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('.cursor-expand')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Trail animation with lerp
    const animateTrail = () => {
      if (trailRef.current) {
        trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15;
        trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15;
        
        trailRef.current.style.transform = `translate(${trailPos.current.x - 12}px, ${trailPos.current.y - 12}px)`;
      }
      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full bg-acid pointer-events-none z-[10000] mix-blend-difference transition-all duration-300 ${
          isHovering ? 'w-16 h-16 -translate-x-5 -translate-y-5' : ''
        }`}
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      
      {/* Trail ghost */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-acid/30 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </>
  );
};

export default CustomCursor;
