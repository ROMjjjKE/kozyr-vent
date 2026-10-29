import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4230/kozyr-vent/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
const top = await p.evaluate(() => document.querySelector('.line__stage').getBoundingClientRect().top + window.scrollY);
console.log('stage top', Math.round(top), 'track', await p.evaluate(() => Math.round(document.querySelector('.line__track').scrollWidth)));
for (let i = 0; i <= 6; i++) {
  await p.evaluate(y => window.scrollTo(0, y), top + i * 300);
  await new Promise(r => setTimeout(r, 500));
  console.log(i * 300, await p.evaluate(() => ({
    y: Math.round(document.querySelector('.line__stage').getBoundingClientRect().top),
    x: Math.round(-parseFloat((getComputedStyle(document.querySelector('.line__track')).transform.split(',')[4] || '0'))),
    step: document.querySelector('.line__count').innerText,
    on: document.querySelectorAll('.line__rail li.on').length,
  })));
}
// проверка смены панели
await b.close();
