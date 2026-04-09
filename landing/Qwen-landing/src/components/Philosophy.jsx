import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const disciplines = ['BRANDING', 'DIGITAL', 'SPATIAL', 'MOTION'];
  const disciplineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SplitText word-by-word reveal
      const words = quoteRef.current.querySelectorAll('.word');
      
      gsap.fromTo(words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
          },
        }
      );

      // Discipline list reveal
      disciplineRefs.current.forEach((ref, i) => {
        gsap.fromTo(ref,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quote = "Design is not decoration. It is the architecture of attention.";
  const words = quote.split(' ');

  return (
    <section ref={sectionRef} className="bg-ink text-paper py-32 px-6 relative" id="philosophy">
      {/* Thick divider */}
      <div className="absolute top-0 left-0 w-full thick-divider bg-paper" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12">
        {/* Quote Column */}
        <div className="col-span-8">
          <div className="mb-8">
            <div className="w-16 h-[6px] bg-acid mb-8" />
          </div>
          
          <blockquote ref={quoteRef} className="font-accent italic text-white leading-tight">
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </blockquote>
        </div>

        {/* Discipline List */}
        <div className="col-span-4 flex flex-col justify-end">
          <div className="text-right">
            {disciplines.map((discipline, i) => (
              <div
                key={discipline}
                ref={(el) => (disciplineRefs.current[i] = el)}
                className="font-mono text-[10px] tracking-system text-ash py-3 border-b border-ash/30"
              >
                {discipline}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
