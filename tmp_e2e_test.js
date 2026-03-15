const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const options = new firefox.Options()
    .setBinary('/snap/firefox/current/usr/lib/firefox/firefox')
    .addArguments('-headless');

  const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
  const results = [];

  async function step(name, fn) {
    try {
      await fn();
      results.push({ name, status: 'ok' });
    } catch (error) {
      results.push({ name, status: 'fail', error: String(error && error.message ? error.message : error) });
    }
  }

  async function clickId(id) {
    const el = await driver.findElement(By.id(id));
    await driver.executeScript('arguments[0].scrollIntoView({block:"center"});', el);
    await el.click();
  }

  try {
    await step('load_page', async () => {
      await driver.get('http://localhost:4173');
      await driver.wait(until.elementLocated(By.id('lang-toggle')), 15000);
    });

    await step('install_error_capture', async () => {
      await driver.executeScript(`
        window.__errs = [];
        window.addEventListener('error', (e) => window.__errs.push(String(e.message || e.error || 'error')));
        window.addEventListener('unhandledrejection', (e) => window.__errs.push(String(e.reason || 'rejection')));
      `);
    });

    await step('lang_toggle', async () => {
      await clickId('lang-toggle');
      await sleep(250);
      await clickId('lang-toggle');
    });

    await step('placement_form', async () => {
      await clickId('placement-btn');
      await driver.wait(until.elementLocated(By.id('placement-q1')), 2000);
      await driver.executeScript(`
        document.getElementById('placement-q1').value='3';
        document.getElementById('placement-q2').value='3';
        document.getElementById('placement-q3').value='3';
        document.getElementById('placement-q4').value='3';
        document.getElementById('placement-q5').value='3';
      `);
      await clickId('placement-save-btn');
      const text = await driver.findElement(By.id('learner-level')).getText();
      if (!/A1|A2|B1/.test(text)) throw new Error('Placement did not set level');
    });

    await step('lesson_generation', async () => {
      await driver.executeScript(`
        const t = document.getElementById('gen-topic');
        const l = document.getElementById('gen-level');
        const c = document.getElementById('gen-count');
        t.value = 'travel'; t.dispatchEvent(new Event('change', {bubbles:true}));
        l.value = 'A2'; l.dispatchEvent(new Event('change', {bubbles:true}));
        c.value = '4'; c.dispatchEvent(new Event('change', {bubbles:true}));
      `);
      await clickId('generate-lesson-btn');
      await driver.wait(async () => {
        const status = await driver.findElement(By.id('generate-status')).getText();
        return status && !/Generating lesson|ರಚಿಸಲಾಗುತ್ತಿದೆ/.test(status);
      }, 45000);
    });

    await step('lesson_navigation', async () => {
      const chip = await driver.findElement(By.css('.lesson-chip'));
      await chip.click();
      await clickId('next-btn');
      await clickId('show-meaning');
      const cls = await driver.findElement(By.id('phrase-kn')).getAttribute('class');
      if (String(cls).includes('hidden')) throw new Error('Meaning not shown');
      await clickId('show-meaning');
      await clickId('play-normal');
      await clickId('play-slow');
    });

    await step('typed_practice', async () => {
      const phrase = await driver.findElement(By.id('phrase-en')).getText();
      const input = await driver.findElement(By.id('typed-answer'));
      await input.clear();
      await input.sendKeys(phrase);
      await clickId('check-typed');
      const cls = await driver.findElement(By.id('feedback-card')).getAttribute('class');
      if (String(cls).includes('hidden')) throw new Error('Feedback hidden');
    });

    await step('review_controls', async () => {
      await clickId('start-review-btn');
      await sleep(250);
      await clickId('mark-easy-btn');
    });

    await step('scenario_flow', async () => {
      await driver.executeScript(`
        const s = document.getElementById('scenario-topic');
        s.value = 'doctor'; s.dispatchEvent(new Event('change', {bubbles:true}));
      `);
      await clickId('scenario-start-btn');
      const answers = [
        'I have a fever since yesterday night.',
        'I also have a sore throat when I swallow.',
        'How many tablets should I take, and after food?'
      ];
      for (const a of answers) {
        const input = await driver.findElement(By.id('scenario-answer'));
        await input.clear();
        await input.sendKeys(a);
        await clickId('scenario-check-btn');
        const nextBtn = await driver.findElement(By.id('scenario-next-btn'));
        await driver.wait(async()=> (await nextBtn.getAttribute('disabled'))===null, 3000);
        await nextBtn.click();
      }
      const ctx = await driver.findElement(By.id('scenario-context')).getText();
      if (!/complete|ಪೂರ್ಣ/.test(ctx)) throw new Error('Scenario not complete');
    });

    await step('translator_controls', async () => {
      await clickId('use-phrase');
      await clickId('translate-btn');
      await driver.wait(async () => {
        const out = await driver.findElement(By.id('translate-output')).getText();
        return out && out.length > 0 && out !== 'Please wait';
      }, 35000);

      await driver.executeScript(`
        const d = document.getElementById('translate-direction');
        d.value = 'en-kn'; d.dispatchEvent(new Event('change', {bubbles:true}));
      `);

      const tinput = await driver.findElement(By.id('translate-input'));
      await tinput.clear();
      await tinput.sendKeys('Please speak slowly.');
      await clickId('translate-btn');
      await driver.wait(async () => {
        const out = await driver.findElement(By.id('translate-output')).getText();
        return out && out.length > 0;
      }, 35000);
    });

    await step('mic_button_state', async () => {
      const mic = await driver.findElement(By.id('mic-btn'));
      const disabled = await mic.getAttribute('disabled');
      if (disabled === null) {
        await mic.click();
        await sleep(300);
      }
    });

    await step('browser_js_errors', async () => {
      const errs = await driver.executeScript('return window.__errs || [];');
      if (Array.isArray(errs) && errs.length > 0) {
        throw new Error('JS errors: ' + errs.join(' | '));
      }
    });

    const failed = results.filter((r) => r.status === 'fail');
    console.log(JSON.stringify({ results, failedCount: failed.length }, null, 2));
    if (failed.length > 0) process.exitCode = 1;
  } finally {
    await driver.quit();
  }
})();
