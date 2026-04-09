import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: '01',
    title: 'DISCOVERY',
    year: '2019—PRESENT',
    description: 'We begin by listening. Not to what you say you need, but to what you actually need. Every project starts with a deep dive into your brand, your audience, and the space between.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    id: '02',
    title: 'STRATEGY',
    year: '2019—PRESENT',
    description: 'Insight without execution is hallucination. We build the strategic framework that ensures every design decision serves a business objective.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80',
  },
  {
    id: '03',
    title: 'CRAFT',
    year: '2019—PRESENT',
    description: 'This is where obsession pays off. Every pixel, every kerning pair, every interaction is refined until it feels inevitable.',
    image: 'https://images.unsplash.com/photo-1561070798-84e3795eb281?w=600&q=80',
  },
  {
    id: '04',
    title: 'LAUNCH',
    year: '2019—PRESENT',
    description: 'We don\'t hand off and disappear. Launch is the beginning of iteration. We stay close until the work is living in the world exactly as intended.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
];

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleStep = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="bg-ink px-6 py-24" id="process">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16">
          <span className="system-label text-ash">[ PROCESS ]</span>
        </div>

        <div className="border-t border-ash/30">
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => (rowsRef.current[i] = el)}
              className={`border-b border-ash/30 transition-all duration-500 ${
                activeIndex === i ? 'border-l-[4px] border-l-acid pl-6' : 'border-l-[1px] border-l-ash/30 pl-6'
              }`}
            >
              <button
                onClick={() => toggleStep(i)}
                className="w-full py-8 flex items-start gap-8 cursor-pointer group"
              >
                <span className="font-display text-ash/50 text-6xl group-hover:text-acid transition-colors duration-300">
                  {step.id}
                </span>
                
                <div className="flex-1 text-left">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-mono text-sm tracking-system text-paper">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[10px] text-ash">
                      {step.year}
                    </span>
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  activeIndex === i ? 'max-h-[400px] pb-8' : 'max-h-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-8 ml-16">
                  <p className="font-accent italic text-paper/80 text-lg leading-relaxed">
                    {step.description}
                  </p>
                  <div className="overflow-hidden border border-ash/30">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
