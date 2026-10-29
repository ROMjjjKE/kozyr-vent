export default function Band() {
  return (
    <section className="band" aria-label="Объект с системой вентиляции">
      <img
        className="band__img"
        src="/kozyr-vent/img/cex-ventilyaciya-640.jpg"
        srcSet="/kozyr-vent/img/cex-ventilyaciya-640.jpg 640w, /kozyr-vent/img/cex-ventilyaciya.jpg 1400w"
        sizes="100vw"
        width={1400}
        height={945}
        loading="lazy"
        alt="Цех: круглые воздуховоды на подвесах под потолком, вертикальные спуски к оборудованию, рама с ёмкостями"
      />
      <div className="band__veil" aria-hidden="true" />
      <div className="band__txt">
        <b>Цех: приточный и вытяжной ствол на подвесах, спуски к оборудованию</b>
        <span>Объект с действующим производством · воздуховоды на хомутах</span>
      </div>
    </section>
  );
}
