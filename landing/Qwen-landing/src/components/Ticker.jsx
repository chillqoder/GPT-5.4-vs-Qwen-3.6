const Ticker = () => {
  const tickerContent = Array(20).fill('VOID STUDIO  ✦  ').join('');

  return (
    <section className="bg-ink overflow-hidden py-4">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        <span className="font-mono text-acid text-lg tracking-wider">
          {tickerContent}
        </span>
        <span className="font-mono text-acid text-lg tracking-wider" aria-hidden="true">
          {tickerContent}
        </span>
      </div>
    </section>
  );
};

export default Ticker;
