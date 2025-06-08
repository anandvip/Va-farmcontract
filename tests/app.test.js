const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('initApp', () => {
  let dom;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost' });
    dom.window.initApp();
  });

  test('updates total plots from farmData', () => {
    const document = dom.window.document;
    const farmData = dom.window.eval('farmData');
    expect(document.getElementById('totalPlots').textContent)
      .toBe(String(farmData.plots.length));
  });

  test('updates total area from farmData', () => {
    const document = dom.window.document;
    const farmData = dom.window.eval('farmData');
    const totalArea = farmData.plots.reduce((sum, p) => sum + p.area, 0);
    expect(document.getElementById('totalArea').textContent)
      .toBe(String(totalArea));
  });

  test('updates active FPO count from farmData', () => {
    const document = dom.window.document;
    const farmData = dom.window.eval('farmData');
    expect(document.getElementById('activeFPOs').textContent)
      .toBe(String(farmData.fpos.length));
  });
});
