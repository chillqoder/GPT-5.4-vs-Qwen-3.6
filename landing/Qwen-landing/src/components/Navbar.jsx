import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['WORK', 'PHILOSOPHY', 'PROCESS', 'CONTACT'];

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-14 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-ink border-acid'
          : 'bg-paper border-ink'
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <a
          href="#"
          className={`font-mono text-lg tracking-wider transition-colors duration-500 ${
            scrolled ? 'text-paper' : 'text-ink'
          }`}
        >
          VOID®
        </a>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`relative font-mono text-[10px] tracking-system overflow-hidden transition-colors duration-500 group ${
                scrolled ? 'text-paper' : 'text-ink'
              }`}
            >
              <span className="relative z-10">{link}</span>
              <span className="absolute inset-0 bg-acid transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
            </a>
          ))}

          <span
            className={`system-label px-3 py-1 border animate-blink ${
              scrolled
                ? 'border-acid text-acid'
                : 'border-ink text-ink'
            }`}
          >
            [ OPEN FOR WORK ]
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
