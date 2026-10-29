const PHONE = '+375 29 128-24-17';
const TEL = 'tel:+375291282417';

const SYS = [
  ['01', 'Приточные системы', 'приток'],
  ['02', 'Вытяжные системы', 'вытяжка'],
  ['03', 'Приточно-вытяжные', 'баланс'],
  ['04', 'Местные отсосы', 'точечно'],
  ['05', 'Воздуховоды', 'изготовление'],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__plate micro">ИП Козырь И. В. · вентиляция · Минск</div>
            <h1>Приток и вытяжка: изготовление и монтаж</h1>
            <p className="lead hero__lead">
              Приточные и вытяжные системы для цехов, складов и офисов. Воздуховоды делаем сами,
              оборудование есть в наличии — систему не ждём месяц из поставки.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>{PHONE}</a>
              <a className="link-blue" href="#zayavka">Запросить расчёт</a>
            </div>
          </div>

          <div>
            <div className="sys">
              {SYS.map(([n, t, s]) => (
                <div className="sys__row" key={n}>
                  <span className="sys__n">{n}</span>
                  <span className="sys__t">{t}</span>
                  <span className="sys__s">{s}</span>
                </div>
              ))}
            </div>
            <p className="sys__foot">
              Одна бригада ведёт объект от замера до пуска: металл, фасоника, оборудование, монтаж.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
