const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Joyride Callback Data')) console.log(text);
  });
  await page.goto('http://localhost:5173/');
  
  await page.waitForSelector('.tour-btn');
  const buttons = await page.$$('.tour-btn');
  for (let btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text === 'Take a Tour') {
      await btn.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
     document.getElementById('custom-tour-beacon').click();
  });
  
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
       const btn = document.querySelector('button[aria-label="Skip"]');
       if(btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
