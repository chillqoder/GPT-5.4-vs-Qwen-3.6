import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(line1Ref.current, 
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(line2Ref.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(line3Ref.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(line4Ref.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out' },
        '-=0.75'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] overflow-hidden">
      {/* Right Image Panel */}
      <div className="absolute right-0 top-0 w-[40%] h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
          alt="Black and white architecture"
          className="w-full h-full object-cover grayscale mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-paper/30" />
      </div>

      {/* Left Typography Block */}
      <div className="relative h-full flex flex-col justify-end pb-24 px-6 w-[60%]">
        <div ref={line1Ref} className="system-label mb-4 text-ink">
          [ STUDIO — 2019 ]
        </div>
        
        <div ref={line2Ref} className="font-display text-ink leading-none tracking-tight" style={{ fontSize: 'clamp(80px, 10vw, 160px)' }}>
          We build
        </div>
        
        <div ref={line3Ref} className="font-display text-ink leading-none tracking-tight" style={{ fontSize: 'clamp(80px, 10vw, 160px)' }}>
          things that
        </div>
        
        <div ref={line4Ref} className="font-display italic text-vermillion leading-none tracking-tight mt-2" style={{ fontSize: 'clamp(80px, 10vw, 160px)' }}>
          cannot be ignored.
        </div>
      </div>

      {/* Thick Divider */}
      <div className="absolute bottom-0 left-0 w-full thick-divider" />
    </section>
  );
};

export default Hero;
