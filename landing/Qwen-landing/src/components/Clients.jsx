import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'AESOP',
  'MUJI',
  'ACNE STUDIOS',
  'COS',
  'LEICA',
  'BANG & OLUFSEN',
  'MAISON MARGIELA',
  'ARCHITECTURAL DIGEST',
];

const Clients = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((logo, i) => {
        gsap.fromTo(logo,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: logo,
              start: 'top 90%',
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper px-6 py-24 relative" id="clients">
      {/* Thick divider */}
      <div className="absolute top-0 left-0 w-full thick-divider" />

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <span className="system-label text-ink">[ TRUSTED BY ]</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {clients.map((client, i) => (
            <div
              key={client}
              ref={(el) => (logosRef.current[i] = el)}
              className="flex items-center justify-center py-8 group cursor-pointer"
            >
              <span className="font-mono text-ash text-lg tracking-wider group-hover:text-ink group-hover:scale-[1.05] transition-all duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
