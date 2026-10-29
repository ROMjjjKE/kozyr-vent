import { useState } from 'react';

const WHAT = ['Приток', 'Вытяжка', 'Приток и вытяжка', 'Местный отсос', 'Нужна консультация'];
const WHERE = ['Цех / производство', 'Склад', 'Офис / торговля', 'Другое'];
const PHONE = '+375 29 128-24-17';
const TEL = 'tel:+375291282417';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', what: WHAT[0], where: WHERE[0], note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта: вентиляция (ИП Козырь)',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Нужно: ${f.what}`,
      `Объект: ${f.where}`,
      `Детали: ${f.note || '—'}`,
    ].join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375291282417?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="shead__num micro">07 / заявка</div>
          <h2 className="shead__title reveal">Расчёт по вашему объекту</h2>
          <p className="shead__note reveal" style={{ color: 'var(--ink-3)' }}>
            Позвоните или опишите задачу: скажу, что нужно для расчёта и какие варианты реальны.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <p className="ask__hint">
              Если не отвечаю — значит в цеху или на монтаже. Оставьте заявку или напишите в WhatsApp,
              перезвоню.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''}>
                <label htmlFor="k-name">Имя</label>
                <input id="k-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''}>
                <label htmlFor="k-tel">Телефон</label>
                <input id="k-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="k-what">Что нужно</label>
                <select id="k-what" value={f.what} onChange={(e) => set('what', e.target.value)}>
                  {WHAT.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="k-where">Объект</label>
                <select id="k-where" value={f.where} onChange={(e) => set('where', e.target.value)}>
                  {WHERE.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="k-note">Детали</label>
              <textarea id="k-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder="Например: цех 300 м², три сварочных поста, нужна вытяжка" />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось нажать «Отправить». Если окно не
                открылось, позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Стоимость и сроки называю после замера: без осмотра помещения любая цифра будет
              выдуманной. Выезд по Минску обсуждаем по телефону.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
