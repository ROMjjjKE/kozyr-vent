import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/kozyr-vent/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
let p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1100));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });

const stage = await p.evaluate(() => document.querySelector('.line__stage').getBoundingClientRect().top + window.scrollY);
await p.evaluate(y => window.scrollTo(0, y), stage + 1000);
await new Promise(r => setTimeout(r, 1100));
await p.screenshot({ path: 'screenshots/desktop-etapy.png' });

await p.evaluate(() => document.querySelector('#sklad').scrollIntoView());
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'screenshots/desktop-sklad.png' });

await p.evaluate(() => { const el = document.querySelector('.band'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 200); });
await new Promise(r => setTimeout(r, 1200));
console.log('band img width', await p.evaluate(() => document.querySelector('.band__img').naturalWidth));
await p.screenshot({ path: 'screenshots/desktop-obekt.png' });

await p.evaluate(() => document.querySelector('#zayavka').scrollIntoView());
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'screenshots/desktop-zayavka.png' });
await p.close();

p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1100));
await p.screenshot({ path: 'screenshots/mobile-390.png' });
await p.evaluate(() => document.querySelector('#etapy').scrollIntoView());
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'screenshots/mobile-390-etapy.png' });
await p.evaluate(() => document.querySelector('#zayavka').scrollIntoView());
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'screenshots/mobile-390-zayavka.png' });
await p.close();
await b.close();
console.log('shots ok');
