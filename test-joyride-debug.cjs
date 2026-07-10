const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  page.on('console', msg => {
      console.log('PAGE LOG:', msg.text());
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

  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
     document.getElementById('custom-tour-beacon').click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const floater = await page.$('.__floater__body');
  if (floater) {
     const html = await page.evaluate(el => el.innerHTML, floater);
     console.log("Floater HTML:", html);
  } else {
     console.log("No floater found.");
  }

  await browser.close();
})();
