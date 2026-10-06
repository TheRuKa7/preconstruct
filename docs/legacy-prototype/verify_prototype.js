const puppeteer = require('C:\\\\Users\\\\rushil.kaul\\\\.gemini\\\\antigravity-ide\\\\brain\\\\b61984cd-51f4-4fc8-a923-affeb1f47b1e\\\\scratch\\\\node_modules\\\\puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = 'C:\\rushilProcess\\vanik-precon\\prototype\\index.html';
const outDir = 'C:\\rushilProcess\\vanik-precon\\assets\\prototype_screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  page.on('pageerror', err => consoleLogs.push('PAGE_ERROR: ' + err.message));

  const url = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('Navigating to Vanik Precon prototype:', url);
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Screenshot 2D View
  await page.screenshot({ path: path.join(outDir, 'vanik_2d_workspace.png') });
  console.log('Saved 2D workspace screenshot');

  // 2. Click 3D Toggle
  await page.click('#btn-3d');
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, 'vanik_3d_bim_view.png') });
  console.log('Saved 3D BIM view screenshot');

  // 3. Switch back to 2D and open Batch Tender Modal
  await page.click('#btn-2d');
  await page.evaluate(() => window.openBatchModal());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'vanik_batch_tender_modal.png') });
  console.log('Saved Batch Tender modal screenshot');

  // 4. Test Mobile Viewport
  await page.evaluate(() => window.closeBatchModal());
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'vanik_mobile_responsive.png') });
  console.log('Saved Mobile Responsive screenshot');

  console.log('Console Logs during run:', consoleLogs);
  await browser.close();
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
