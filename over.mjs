import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 320, height: 860 });
await p.goto('http://127.0.0.1:4230/kozyr-vent/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));
console.log(await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 && r.width > 0) out.push({ sel: el.className && typeof el.className === 'string' ? el.tagName + '.' + el.className.split(' ')[0] : el.tagName, right: Math.round(r.right), w: Math.round(r.width) });
  });
  return out.slice(0, 8);
}));
await b.close();
