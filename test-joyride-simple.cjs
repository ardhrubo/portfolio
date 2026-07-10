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

  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
     document.getElementById('custom-tour-beacon').click();
  });
  
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
       const primaryBtns = document.querySelectorAll('button[aria-label="Next"]');
       if (primaryBtns.length > 0) {
          console.log("Clicking Next");
          primaryBtns[0].click();
       } else {
          const lastBtns = document.querySelectorAll('button[aria-label="Finish"]');
          if (lastBtns.length > 0) {
             console.log("Clicking Finish (aria-label)");
             lastBtns[0].click();
          } else {
             const btn = document.querySelector('button[title="Finish"]');
             if(btn) {
                 console.log("Clicking Finish (title)");
                 btn.click();
             } else {
                 console.log("No Next or Finish button found on this step.");
             }
          }
       }
    });
  }
  
  await new Promise(r => setTimeout(r, 1000));
  const isModalVisible = await page.evaluate(() => {
     const modal = document.querySelector('.guide-modal');
     return modal ? modal.textContent : null;
  });
  
  if (isModalVisible) {
     console.log("Modal is visible:", isModalVisible);
  } else {
     console.log("No finished modal.");
  }
  await browser.close();
})();
