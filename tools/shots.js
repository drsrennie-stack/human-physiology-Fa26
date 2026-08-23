/* Screenshots of the Recall view, with onboarding pre-completed so the
   card is what is actually in frame. */
const { chromium } = require('playwright');
const path = require('path');
const URL = 'file://' + path.resolve(__dirname, '../repo/os/mastery-physio-os.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 860 } });
  page.setDefaultTimeout(8000);

  await page.goto(URL, { waitUntil: 'load' });
  /* Mark the profile as set up and reload, so the onboarding carousel is
     not sitting in front of everything. */
  await page.evaluate(() => {
    var K = 'mastery-os-redesign';
    var S = JSON.parse(localStorage.getItem(K) || '{}');
    S.profile = Object.assign({}, S.profile, {
      onboarded: true, name: 'Sample', grade: 'A', days: 4, minutes: 45,
      activities: ['retrieval', 'draw'], confidence: 'building'
    });
    localStorage.setItem(K, JSON.stringify(S));
  });
  await page.goto(URL + '#s-recall', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    var ob = document.getElementById('onboard'); if (ob) ob.hidden = true;
    location.hash = 's-recall';
    var m = document.getElementById('recallMount');
    if (m && m.scrollIntoView) m.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/1-deck.png') });

  await page.click('#rv-start');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/2-card-confidence.png') });

  await page.click('[data-conf="sure"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/3-card-options.png') });

  const keyAt = await page.evaluate(() => {
    const opts = [...document.querySelectorAll('.rv-opt')];
    const q = document.querySelector('.rv-q').textContent.trim();
    let card = null;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (String(c.q).replace(/<[^>]*>/g, '').trim() === q) card = c;
    })));
    if (!card) return 0;
    const i = opts.findIndex(o => o.textContent.trim() === String(card.options[card.correctIndex]).trim());
    return i === 0 ? 1 : 0;   // deliberately wrong, to show the red flag
  });
  await page.locator('.rv-opt').nth(keyAt).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/4-card-picked-not-submitted.png') });
  await page.click('#rv-submit');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/5-card-sure-and-wrong.png') });

  /* Build up a few more entries so the note sheet has something on it. */
  await page.evaluate(() => {
    document.getElementById('rv-flagbtn') && document.getElementById('rv-flagbtn').click();
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.click('#rv-notes');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/6-note-sheet.png') });

  await browser.close();
  console.log('shots written');
})();
