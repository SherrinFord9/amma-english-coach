"use strict";

const { Builder, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const TARGET_URL = process.env.APP_URL || "http://localhost:4173";

const IDS_TO_CHECK = [
  "progress-help",
  "learner-help",
  "lesson-select-help",
  "lesson-practice-help",
  "review-title",
  "review-help",
  "practice-help",
  "tutor-help",
  "scenario-help",
  "translate-help",
  "start-review-btn",
  "mark-easy-btn",
  "due-label",
  "review-due-pill",
];

const BANNED_EN = ["queue", "due items", "fallback", "provider order", "cefr"];
const BANNED_KN = ["queue", "due", "fallback", "provider"];

function normalize(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

async function ensureLanguage(driver, lang) {
  const toggle = await driver.findElement(By.id("lang-toggle"));
  const detectUiLanguage = async () => {
    const progressTitle = normalize(await driver.findElement(By.id("progress-title")).getText());
    if (progressTitle.toLowerCase().includes("today progress")) return "en";
    if (progressTitle.includes("ಇವತ್ತಿನ ಪ್ರಗತಿ")) return "kn";

    const lessonTitle = normalize(await driver.findElement(By.id("lesson-select-title")).getText());
    if (lessonTitle.toLowerCase().includes("choose lesson")) return "en";
    if (lessonTitle.includes("ಪಾಠ ಆಯ್ಕೆ")) return "kn";
    return "";
  };

  for (let i = 0; i < 3; i += 1) {
    const current = await detectUiLanguage();
    if (current === lang) {
      return;
    }
    await toggle.click();
    await driver.sleep(250);
  }
  throw new Error(`Could not switch to language: ${lang}`);
}

async function collectTexts(driver) {
  const out = {};
  for (const id of IDS_TO_CHECK) {
    const el = await driver.findElement(By.id(id));
    out[id] = normalize(await el.getText());
  }
  return out;
}

function languageIssues(lang, texts) {
  const issues = [];
  const joined = Object.values(texts).join(" ").toLowerCase();
  const banned = lang === "en" ? BANNED_EN : BANNED_KN;

  for (const word of banned) {
    if (joined.includes(word)) {
      issues.push({
        type: "jargon",
        lang,
        term: word,
        message: `Contains jargon term "${word}"`,
      });
    }
  }

  for (const [id, text] of Object.entries(texts)) {
    if (!text) {
      issues.push({
        type: "missing",
        lang,
        id,
        message: `Missing text for #${id}`,
      });
      continue;
    }
    if (text.length > 120) {
      issues.push({
        type: "too_long",
        lang,
        id,
        message: `Text is too long for #${id} (${text.length} chars)`,
      });
    }
  }

  return issues;
}

async function run() {
  const options = new firefox.Options()
    .setBinary("/snap/firefox/current/usr/lib/firefox/firefox")
    .addArguments("-headless");

  const driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
  try {
    await driver.get(TARGET_URL);
    await driver.wait(until.elementLocated(By.id("review-title")), 15000);

    await ensureLanguage(driver, "en");
    const englishTexts = await collectTexts(driver);
    const englishIssues = languageIssues("en", englishTexts);

    await ensureLanguage(driver, "kn");
    const kannadaTexts = await collectTexts(driver);
    const kannadaIssues = languageIssues("kn", kannadaTexts);

    const issues = [...englishIssues, ...kannadaIssues];
    const result = {
      url: TARGET_URL,
      pass: issues.length === 0,
      issueCount: issues.length,
      issues,
    };
    console.log(JSON.stringify(result, null, 2));
    if (issues.length > 0) process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

run().catch((err) => {
  console.error(String(err && err.stack ? err.stack : err));
  process.exitCode = 1;
});
