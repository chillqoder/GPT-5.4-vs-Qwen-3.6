import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Aesop',
    category: 'BRAND IDENTITY',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '02',
    title: 'Muji',
    category: 'DIGITAL EXPERIENCE',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
    span: 'col-span-5',
  },
  {
    id: '03',
    title: 'Acne Studios',
    category: 'ART DIRECTION',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c86cd6f?w=800&q=80',
    span: 'col-span-5',
  },
  {
    id: '04',
    title: 'COS',
    category: 'SPATIAL DESIGN',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '05',
    title: 'Leica',
    category: 'PRODUCT DESIGN',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '06',
    title: 'Bang & Olufsen',
    category: 'CAMPAIGN',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f0001?w=800&q=80',
    span: 'col-span-5',
  },
];

const WorkGrid = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            delay: i * 0.1,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} className="bg-paper px-6 py-24" id="work">
      <div className="mb-16">
        <span className="system-label text-ink">[ SELECTED WORK ]</span>
      </div>

      <div className="grid grid-cols-12 gap-6 max-w-[1400px] mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`${project.span} group relative overflow-hidden cursor-pointer`}
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-ink">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              
              {/* Project Index */}
              <span className="absolute top-4 left-4 font-mono text-xs text-paper mix-blend-difference">
                {project.id}
              </span>

              {/* Year */}
              <span className="absolute top-4 right-4 font-mono text-xs text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-difference">
                {project.year}
              </span>

              {/* Title Overlay */}
              <div className="absolute inset-0 bg-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-6">
                <div>
                  <h3 className="font-display text-paper text-4xl mb-2 relative">
                    {project.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-vermillion transition-all duration-600 group-hover:w-full" />
                  </h3>
                  <p className="font-mono text-[10px] tracking-system text-ash">
                    {project.category} — {project.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkGrid;
