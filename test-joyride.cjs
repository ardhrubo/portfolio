const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
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

  await page.waitForTimeout(1000);
  await page.evaluate(() => {
     document.getElementById('custom-tour-beacon').click();
  });
  
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(500);
    const primaryBtns = await page.$$('button[aria-label="Next"]');
    if (primaryBtns.length > 0) {
      await primaryBtns[0].click();
    } else {
      const lastBtns = await page.$$('button[aria-label="Finish"]');
      if (lastBtns.length > 0) {
         await lastBtns[0].click();
      } else {
         const btn = await page.$('button[title="Finish"]');
         if(btn) await btn.click();
         else {
             const closeBtns = await page.$$('button[aria-label="Close"]');
             if (closeBtns.length > 0) await closeBtns[0].click();
         }
      }
    }
  }
  
  await page.waitForTimeout(1000);
  const finishedModal = await page.$('.guide-modal');
  if (finishedModal) {
     const text = await page.evaluate(el => el.textContent, finishedModal);
     console.log("Modal is visible:", text);
  } else {
     console.log("No finished modal.");
  }
  await browser.close();
})();
