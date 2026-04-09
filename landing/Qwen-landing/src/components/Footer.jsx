const Footer = () => {
  const navLinks = ['WORK', 'PHILOSOPHY', 'PROCESS', 'CONTACT'];

  return (
    <footer className="bg-ink text-paper px-6 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-12 gap-12 mb-16">
          {/* Column 1: Logo + Tagline */}
          <div className="col-span-4">
            <h3 className="font-mono text-2xl tracking-wider mb-4">VOID®</h3>
            <p className="font-mono text-[10px] text-ash leading-relaxed">
              Boutique design studio crafting
              <br />
              statements of intent since 2019.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-span-4">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-mono text-[10px] tracking-system text-ash hover:text-paper transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: System Status */}
          <div className="col-span-4 flex flex-col items-end justify-end">
            <div className="flex items-center gap-3 mb-2">
              <span className="system-label text-ash">[ SYSTEM ONLINE ]</span>
              <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-ash/30 pt-8">
          <p className="font-mono text-[10px] text-ash/60 tracking-wider flex justify-between">
            <span>© 2025 VOID STUDIO</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>MADE WITH OBSESSION</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
