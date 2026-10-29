import { useEffect, useRef } from 'react';

const PHONE = '+375 29 128-24-17';
const TEL = 'tel:+375291282417';

export default function Header() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__brand" href="#top" aria-label="Козырь, вентиляция, к началу страницы">
          <span className="hdr__name">Козырь<span className="hdr__dot">.</span></span>
          <span className="hdr__city">вентиляция · Минск</span>
        </a>
        <nav className="hdr__nav" aria-label="Разделы">
          <a href="#delaem">Что делаем</a>
          <a href="#etapy">Этапы</a>
          <a href="#sklad">Наличие</a>
          <a href="#zayavka">Расчёт</a>
        </nav>
        <a className="hdr__tel" href={TEL}>{PHONE}</a>
      </div>
      <span className="hdr__bar" ref={bar} aria-hidden="true" />
    </header>
  );
}
