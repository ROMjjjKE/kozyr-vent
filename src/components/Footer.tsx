export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <h3>Исполнитель</h3>
            <p>ИП Козырь Игорь Валериевич<br />Минск</p>
          </div>
          <div>
            <h3>Телефон</h3>
            <p><a href="tel:+375291282417">+375 29 128-24-17</a></p>
          </div>
          <div>
            <h3>Работы</h3>
            <p>Приточные и вытяжные системы<br />Воздуховоды под размер<br />Местные отсосы</p>
          </div>
          <div>
            <h3>Разделы</h3>
            <p>
              <a href="#delaem">Что делаем</a><br />
              <a href="#etapy">Этапы</a><br />
              <a href="#zayavka">Расчёт</a>
            </p>
          </div>
        </div>
        <p className="ftr__legal">
          Информация на сайте не является публичной офертой: состав работ, стоимость и сроки
          согласуются после осмотра объекта. Наличие оборудования на складе уточняйте по телефону —
          список меняется.
        </p>
      </div>
    </footer>
  );
}
