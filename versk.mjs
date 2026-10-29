import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4230/kozyr-vent/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));
  console.log(String(w).padStart(4), await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, inner: window.innerWidth })), 'h1', await p.evaluate(() => getComputedStyle(document.querySelector('h1')).fontSize), errs[0] || '');
  await p.close();
}
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4230/kozyr-vent/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'shots/k-hero.png' });
const top = await p.evaluate(() => document.querySelector('.line__stage').getBoundingClientRect().top + window.scrollY);
await p.evaluate(y => window.scrollTo(0, y), top + 900);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'shots/k-line.png' });
await b.close();
