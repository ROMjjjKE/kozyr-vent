import { useEffect, useRef, useState } from 'react';

const STAGES = [
  {
    n: '01',
    title: 'Замер на объекте',
    text: 'Смотрим помещение, считаем воздухообмен, находим места под оборудование и трассу. На выходе — эскиз, точки крепления и понятный объём работ.',
    spec: [['Объект', 'цех, склад, офис'], ['Итог', 'эскиз и объём']],
  },
  {
    n: '02',
    title: 'Смета и подбор',
    text: 'Подбираем установку, вентилятор и фильтры из наличия, считаем металл, фасонину и монтаж. Цифры вы получаете до начала работ.',
    spec: [['Состав', 'оборудование, металл, монтаж'], ['Срок', 'после замера']],
  },
  {
    n: '03',
    title: 'Изготовление',
    text: 'Воздуховоды режем и собираем в цеху под конкретный объект: прямые участки, отводы, переходы. Не «примерно по метражу со склада».',
    spec: [['Материал', 'оцинкованная сталь'], ['Элементы', 'прямые, отводы, переходы']],
  },
  {
    n: '04',
    title: 'Монтаж',
    text: 'Подвесы, крепление, стыки, подключение к установке. В действующем цеху работаем по участкам, чтобы не останавливать производство целиком.',
    spec: [['Крепление', 'подвесы, хомуты'], ['Порядок', 'по участкам']],
  },
  {
    n: '05',
    title: 'Пуск и проверка',
    text: 'Запускаем, проверяем расходы воздуха, балансируем приток с вытяжкой и показываем, как менять фильтры и что смотреть дальше.',
    spec: [['Проверка', 'расходы, баланс'], ['Итог', 'работающая система']],
  },
];

export default function Production() {
  const [pin, setPin] = useState(false);
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) return;

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current || !trackRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const stage = stageRef.current;
            const track = trackRef.current;
            if (killed || !stage || !track) return;

            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
            const trigger = ScrollTrigger.create({
              trigger: stage,
              start: 'top top',
              end: () => '+=' + distance(),
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(track, { x: -self.progress * distance() });
                const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
                setStep((prev) => (prev === i ? prev : i));
              },
            });
            ScrollTrigger.refresh();
            cleanup = () => trigger.kill();
          });
        });
      });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          timer = window.setTimeout(begin, 80);
        }
      },
      { rootMargin: '300px 0px' }
    );
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  const isOn = (i: number) => (pin ? step === i : true);

  return (
    <section className={`line ${pin ? 'line--pin' : 'line--manual'}`} id="etapy">
      <div className="wrap line__head">
        <div className="cols shead">
          <div className="shead__num micro">03 / этапы</div>
          <h2 className="shead__title reveal">От замера до пуска</h2>
          <p className="shead__note reveal">
            Пять этапов, которые проходит каждый объект. Прокрутите вниз — линия едет вбок.
          </p>
        </div>
      </div>

      <div className="line__stage" ref={stageRef}>
        <div className="line__track" ref={trackRef}>
          {STAGES.map((s) => (
            <article className="stage-card" key={s.n}>
              <span className="stage-card__n" aria-hidden="true">{s.n}</span>
              <h3>
                <span className="micro" style={{ marginRight: 10 }}>{s.n}</span>
                {s.title}
              </h3>
              <p>{s.text}</p>
              <div className="stage-card__spec">
                {s.spec.map(([k, v]) => (
                  <div key={k}><span>{k}</span><b>{v}</b></div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="line__rail">
          <ol aria-hidden="true">
            {STAGES.map((s, i) => (
              <li key={s.n} className={isOn(i) ? 'on' : ''}>{s.n} {s.title.split(' ')[0]}</li>
            ))}
          </ol>
          <span className="line__count">{pin ? `${String(Math.max(step + 1, 1)).padStart(2, '0')} / 05` : '05 / 05'}</span>
        </div>
      </div>
    </section>
  );
}
