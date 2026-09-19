import { useEffect, useRef } from 'react';

// Background blob yang bergerak mengikuti scroll (ala Portofolio_V5),
// diadaptasi ke warna brand ULBI + sadar dark mode & reduced motion.
const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -40, y: 0 },
    { x: 40, y: 0 },
    { x: -60, y: 0 },
    { x: 60, y: 0 },
  ];

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf;
    const update = () => {
      const scroll = window.scrollY || 0;
      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initial = initialPositions[index];
        const x = initial.x + Math.sin(scroll / 140 + index * 0.6) * 120;
        const y = Math.cos(scroll / 140 + index * 0.6) * 60;
        blob.style.transform = `translate(${x}px, ${y}px)`;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0">
        <div
          ref={(el) => { blobRefs.current[0] = el; }}
          className="absolute -top-10 -left-16 w-72 h-72 md:w-96 md:h-96 bg-ulbi-orange/25 rounded-full blur-[110px] transition-transform duration-1000 ease-out dark:bg-ulbi-orange/10"
        />
        <div
          ref={(el) => { blobRefs.current[1] = el; }}
          className="absolute top-1/4 -right-16 w-72 h-72 md:w-96 md:h-96 bg-ulbi-blue/20 rounded-full blur-[110px] transition-transform duration-1000 ease-out dark:bg-ulbi-blue/25 hidden sm:block"
        />
        <div
          ref={(el) => { blobRefs.current[2] = el; }}
          className="absolute bottom-[-10%] left-[10%] w-72 h-72 md:w-96 md:h-96 bg-ulbi-orange/15 rounded-full blur-[110px] transition-transform duration-1000 ease-out dark:bg-ulbi-blue/10"
        />
        <div
          ref={(el) => { blobRefs.current[3] = el; }}
          className="absolute bottom-[5%] right-[5%] w-72 h-72 md:w-96 md:h-96 bg-ulbi-blue/15 rounded-full blur-[110px] transition-transform duration-1000 ease-out dark:bg-ulbi-orange/[0.07] hidden sm:block"
        />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00277f12_1px,transparent_1px),linear-gradient(to_bottom,#00277f12_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
    </div>
  );
};

export default AnimatedBackground;
