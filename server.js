"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const DEFAULT_PORT = 4173;
const BODY_LIMIT_BYTES = 40 * 1024;

loadDotEnv(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || DEFAULT_PORT);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const LANGUAGE_NAMES = {
  en: "English",
  kn: "Kannada",
};

const SARVAM_LANG_CODE = {
  en: "en-IN",
  kn: "kn-IN",
};

const LESSON_GENERATION_TOPICS = {
  introduction: { en: "Introduction", kn: "ಪರಿಚಯ" },
  shopping: { en: "Shopping", kn: "ಶಾಪಿಂಗ್" },
  doctor: { en: "Doctor Visit", kn: "ಡಾಕ್ಟರ್ ಭೇಟಿ" },
  phone: { en: "Phone Call", kn: "ಫೋನ್ ಮಾತು" },
  travel: { en: "Travel", kn: "ಪ್ರಯಾಣ" },
  family: { en: "Family", kn: "ಕುಟುಂಬ" },
  routine: { en: "Daily Routine", kn: "ದೈನಂದಿನ ಕ್ರಮ" },
};

const LESSON_CACHE_TTL_MS = 30 * 60 * 1000;
const lessonCache = new Map();
const LESSON_GENERATOR_VERSION = "v2";
const TUTOR_CHAT_VERSION = "v1";
const TUTOR_HISTORY_LIMIT = 8;

const LEVEL_RULES = {
  A1: {
    minWords: 4,
    maxWords: 9,
    guidance:
      "Use very common words, present tense, and short complete sentences that are easy to say aloud.",
  },
  A2: {
    minWords: 6,
    maxWords: 12,
    guidance:
      "Use practical everyday conversation with polite requests, short connectors, and slightly richer vocabulary.",
  },
  B1: {
    minWords: 8,
    maxWords: 15,
    guidance:
      "Use natural conversational detail with reasons, time references, and polite but realistic spoken English.",
  },
};

const TOPIC_INTENTS = {
  introduction: [
    "self introduction",
    "where I am from",
    "what I do daily",
    "asking someone to repeat",
    "ending a short conversation politely",
  ],
  shopping: [
    "ask price",
    "ask where item is",
    "ask for another size or brand",
    "payment and bill",
    "ask for discount or replacement",
  ],
  doctor: [
    "describe symptom",
    "ask when to take medicine",
    "ask dosage clearly",
    "book follow-up",
    "ask if emergency signs appear",
  ],
  phone: [
    "ask if this is a good time",
    "request callback",
    "ask to speak slowly",
    "confirm details on call",
    "end call politely",
  ],
  travel: [
    "ask direction",
    "buy ticket",
    "confirm platform or stop",
    "ask fare",
    "ask for help with delay",
  ],
  family: [
    "talk about family members",
    "describe routine at home",
    "invite a relative",
    "ask about health at home",
    "share a family plan",
  ],
  routine: [
    "morning routine",
    "meal planning",
    "household task",
    "schedule for next day",
    "ask for help politely",
  ],
};

const TOPIC_KEYWORDS = {
  introduction: ["name", "from", "work", "live", "please", "repeat"],
  shopping: ["price", "cost", "size", "bill", "discount", "store", "cash"],
  doctor: ["pain", "doctor", "medicine", "tablet", "fever", "after food"],
  phone: ["call", "speak", "minutes", "line", "repeat", "message"],
  travel: ["bus", "train", "ticket", "platform", "stop", "fare"],
  family: ["mother", "father", "brother", "sister", "home", "family"],
  routine: ["morning", "today", "tomorrow", "kitchen", "clean", "time"],
};

const TOO_BASIC_PHRASES = new Set([
  "hello",
  "how are you",
  "what is your name",
  "my name is",
  "i am fine",
  "thank you",
  "please",
  "i am learning english every day",
]);

const LEVEL_ORDER = {
  A1: 1,
  A2: 2,
  B1: 3,
};

const CURATED_TOPIC_PHRASES = {
  introduction: [
    { level: "A1", en: "Hello, I am Lakshmi from Mysuru." },
    { level: "A1", en: "Please tell me your name again." },
    { level: "A1", en: "I speak Kannada at home." },
    { level: "A2", en: "I started practicing English with my son every night." },
    { level: "A2", en: "Could you correct me if my sentence sounds wrong?" },
    { level: "A2", en: "I understand simple English, but I speak slowly." },
    {
      level: "B1",
      en: "I can follow the conversation, but I need more time to respond.",
    },
    { level: "B1", en: "I want to sound polite when I speak to new people." },
    {
      level: "B1",
      en: "I am trying to build confidence for real conversations.",
    },
  ],
  shopping: [
    { level: "A1", en: "How much does this packet cost?" },
    { level: "A1", en: "Please give me one kilo of rice." },
    { level: "A1", en: "Do you have a smaller size?" },
    { level: "A2", en: "Could you show me a cheaper option in this brand?" },
    { level: "A2", en: "Please add this item to my bill." },
    {
      level: "A2",
      en: "I want to exchange this, because the size is wrong.",
    },
    {
      level: "B1",
      en: "Could you confirm if this product has a return policy?",
    },
    {
      level: "B1",
      en: "I compared prices online, but I prefer buying here today.",
    },
    { level: "B1", en: "Can I pay by UPI and get a digital receipt?" },
  ],
  doctor: [
    { level: "A1", en: "I have a fever since yesterday evening." },
    { level: "A1", en: "Should I take this medicine after food?" },
    { level: "A1", en: "My throat hurts when I swallow." },
    { level: "A2", en: "The pain becomes worse at night." },
    { level: "A2", en: "Could you explain the dosage one more time?" },
    { level: "A2", en: "I need a follow-up appointment for next week." },
    {
      level: "B1",
      en: "I have been feeling dizzy whenever I stand up quickly.",
    },
    {
      level: "B1",
      en: "Please let me know which symptoms need urgent attention.",
    },
    {
      level: "B1",
      en: "I finished the tablets, but the cough has not improved.",
    },
  ],
  phone: [
    { level: "A1", en: "Can I call you back in ten minutes?" },
    { level: "A1", en: "Please speak slowly, I did not understand." },
    { level: "A1", en: "Who is speaking, please?" },
    { level: "A2", en: "I am on the way, and I will reach by six." },
    { level: "A2", en: "Could you repeat the address once more?" },
    { level: "A2", en: "I missed your call while I was cooking." },
    { level: "B1", en: "The network is unstable, so I may lose your voice." },
    {
      level: "B1",
      en: "Let me confirm the details, so there is no confusion.",
    },
    {
      level: "B1",
      en: "Could we move this discussion to tomorrow morning?",
    },
  ],
  travel: [
    { level: "A1", en: "Which bus goes to the city hospital?" },
    { level: "A1", en: "Please tell me when this train arrives." },
    { level: "A1", en: "I need one ticket to Bengaluru." },
    {
      level: "A2",
      en: "Is this the correct platform for the Mysuru train?",
    },
    { level: "A2", en: "How long does this journey usually take?" },
    { level: "A2", en: "Could you tell me where I should get down?" },
    {
      level: "B1",
      en: "I would like to reserve a window seat if available.",
    },
    {
      level: "B1",
      en: "The announcement was unclear, so could you guide me?",
    },
    {
      level: "B1",
      en: "Please let me know if this bus stops near the market.",
    },
  ],
  family: [
    { level: "A1", en: "My mother wakes up early every day." },
    { level: "A1", en: "My brother works in Bengaluru." },
    { level: "A1", en: "We eat dinner together at home." },
    {
      level: "A2",
      en: "My daughter helps me practice English every evening.",
    },
    { level: "A2", en: "We are planning a family trip next month." },
    { level: "A2", en: "I call my parents every Sunday morning." },
    {
      level: "B1",
      en: "We divide housework so everyone has less stress.",
    },
    {
      level: "B1",
      en: "I am proud that my family supports my learning goals.",
    },
    {
      level: "B1",
      en: "We discuss important decisions together before acting.",
    },
  ],
  routine: [
    { level: "A1", en: "I make tea at six in the morning." },
    { level: "A1", en: "I clean the kitchen after breakfast." },
    { level: "A1", en: "I go for a short walk every evening." },
    {
      level: "A2",
      en: "I set reminders so I do not miss my medicine.",
    },
    {
      level: "A2",
      en: "I prepare vegetables at night for the next day.",
    },
    { level: "A2", en: "I practice five new words before I sleep." },
    {
      level: "B1",
      en: "I plan tomorrow's tasks tonight to avoid morning confusion.",
    },
    {
      level: "B1",
      en: "When my schedule is busy, I still practice for ten minutes.",
    },
    {
      level: "B1",
      en: "I track my progress weekly to stay motivated.",
    },
  ],
};

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 1) continue;
    const key = trimmed.slice(0, idx).trim();
    const rawValue = trimmed.slice(idx + 1).trim();
    const value = rawValue.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function json(res, status, payload) {
  const data = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data),
  });
  res.end(data);
}

function badRequest(res, message) {
  return json(res, 400, { error: message });
}

function notFound(res) {
  return json(res, 404, { error: "Not found" });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > BODY_LIMIT_BYTES) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function normalizeDirection(value, fallback) {
  const v = String(value || fallback || "").trim().toLowerCase();
  return v === "en" || v === "kn" ? v : null;
}

function configuredProviderOrder() {
  const raw = process.env.TRANSLATION_PROVIDER_ORDER;
  if (!raw) return ["sarvam", "gemini", "openrouter", "mymemory"];
  const items = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const allowed = new Set(["sarvam", "gemini", "openrouter", "mymemory"]);
  return items.filter((name) => allowed.has(name));
}

function providerAvailability() {
  return {
    sarvam: Boolean(process.env.SARVAM_API_KEY),
    gemini: Boolean(process.env.GEMINI_API_KEY),
    openrouter: Boolean(process.env.OPENROUTER_API_KEY),
    mymemory: true,
  };
}

function parseOpenRouterContent(content) {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("")
      .trim();
  }
  return "";
}

function parseChatContent(content) {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (typeof part?.text === "string") return part.text;
        return "";
      })
      .join("")
      .trim();
  }
  return "";
}

function extractSarvamMessageText(message) {
  return (
    parseChatContent(message?.content) ||
    parseChatContent(message?.reasoning_content) ||
    ""
  );
}

function stripCodeFence(value) {
  if (!value) return "";
  return value
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}

function normalizeSpace(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function normalizeEnglish(text) {
  return normalizeSpace(text).replace(/[^\w\s'?!.,-]/g, "");
}

function normalizeKannada(text) {
  return normalizeSpace(text);
}

function englishWordCount(text) {
  const words = normalizeSpace(text).split(" ").filter(Boolean);
  return words.length;
}

function parseTopic(value) {
  const topic = String(value || "").trim().toLowerCase();
  return topic in LESSON_GENERATION_TOPICS ? topic : null;
}

function parseLevel(value) {
  const level = String(value || "").trim().toUpperCase();
  return level === "A1" || level === "A2" || level === "B1" ? level : null;
}

function parseCount(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const clamped = Math.max(3, Math.min(8, Math.floor(n)));
  return clamped;
}

function parseUiLanguage(value) {
  return String(value || "").trim().toLowerCase() === "en" ? "en" : "kn";
}

function normalizeTutorMessage(value, maxLen = 420) {
  return normalizeSpace(String(value || "")).slice(0, maxLen);
}

function parseTutorRole(value) {
  return String(value || "").trim().toLowerCase() === "assistant" ? "assistant" : "user";
}

function sanitizeTutorHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  const cleaned = [];
  for (const item of rawHistory) {
    const content = normalizeTutorMessage(item?.content, 420);
    if (!content) continue;
    cleaned.push({
      role: parseTutorRole(item?.role),
      content,
    });
  }
  return cleaned.slice(-TUTOR_HISTORY_LIMIT);
}

function parseGeneratedPhrasePayload(rawContent) {
  const cleaned = stripCodeFence(rawContent);
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const bracketStart = cleaned.indexOf("[");
    const bracketEnd = cleaned.lastIndexOf("]");
    const braceStart = cleaned.indexOf("{");
    const braceEnd = cleaned.lastIndexOf("}");

    let candidate = "";
    if (bracketStart >= 0 && bracketEnd > bracketStart) {
      candidate = cleaned.slice(bracketStart, bracketEnd + 1);
    } else if (braceStart >= 0 && braceEnd > braceStart) {
      candidate = cleaned.slice(braceStart, braceEnd + 1);
    }
    if (!candidate) {
      throw new Error("Sarvam response is not valid JSON");
    }
    parsed = JSON.parse(candidate);
  }
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.phrases)) return parsed.phrases;
  if (Array.isArray(parsed?.items)) return parsed.items;
  throw new Error("Sarvam response JSON does not contain a phrase list");
}

function canonicalEnglish(text) {
  return normalizeEnglish(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceStartKey(text) {
  const words = canonicalEnglish(text).split(" ").filter(Boolean);
  return words.slice(0, 2).join(" ");
}

function extractEnglishFromItem(item) {
  if (typeof item === "string") return item;
  if (!item || typeof item !== "object") return "";
  return item.en || item.english || item.phrase || item.text || "";
}

function levelRule(level) {
  return LEVEL_RULES[level] || LEVEL_RULES.A1;
}

function levelWindow(level) {
  const rule = levelRule(level);
  return {
    min: Math.max(3, rule.minWords - 1),
    max: rule.maxWords + 2,
  };
}

function isTooBasic(phrase) {
  const clean = canonicalEnglish(phrase);
  if (TOO_BASIC_PHRASES.has(clean)) return true;
  if (clean.startsWith("my name is")) return true;
  if (clean.startsWith("how are you")) return true;
  return false;
}

function phraseScore({ en, topic, level }) {
  const window = levelWindow(level);
  const words = englishWordCount(en);
  const canonical = canonicalEnglish(en);
  let score = 0;

  if (words >= window.min && words <= window.max) {
    score += 50;
  } else {
    score -= Math.abs(words - (window.min + window.max) / 2) * 4;
  }

  if (/[?]$/.test(en)) score += 7;
  if (/please|could|would|can you|may i/i.test(en)) score += 8;
  if (/[.]$/.test(en)) score += 2;

  const topicKeywords = TOPIC_KEYWORDS[topic] || [];
  if (topicKeywords.some((kw) => canonical.includes(kw))) {
    score += 12;
  }

  if (isTooBasic(en)) score -= 40;
  if (/learning english/i.test(en)) score -= 30;
  if (/^i am /i.test(en) && words <= 5) score -= 14;

  return score;
}

function selectEnglishPhrases(items, { topic, level, count }) {
  if (!Array.isArray(items)) {
    throw new Error("Generated phrases is not an array");
  }

  const window = levelWindow(level);
  const seen = new Set();
  const scored = [];

  for (const item of items) {
    const raw = extractEnglishFromItem(item);
    const en = normalizeEnglish(raw);
    if (!en) continue;
    if (!/[a-z]/i.test(en)) continue;

    const canonical = canonicalEnglish(en);
    if (!canonical || seen.has(canonical)) continue;
    seen.add(canonical);

    const words = englishWordCount(en);
    if (words < 3 || words > 16) continue;
    if (words < window.min || words > window.max) continue;
    if (isTooBasic(en)) continue;

    scored.push({
      en,
      score: phraseScore({ en, topic, level }),
      startKey: sentenceStartKey(en),
      isQuestion: en.trim().endsWith("?"),
    });
  }

  scored.sort((a, b) => b.score - a.score);

  const selected = [];
  const usedStart = new Set();

  for (const item of scored) {
    if (selected.length >= count) break;
    if (usedStart.has(item.startKey)) continue;
    selected.push(item);
    usedStart.add(item.startKey);
  }

  for (const item of scored) {
    if (selected.length >= count) break;
    if (selected.includes(item)) continue;
    selected.push(item);
  }

  if (selected.length >= 4) {
    const hasQuestion = selected.some((p) => p.isQuestion);
    const hasStatement = selected.some((p) => !p.isQuestion);
    if (!hasQuestion) {
      const questionCandidate = scored.find((p) => p.isQuestion && !selected.includes(p));
      if (questionCandidate) selected[selected.length - 1] = questionCandidate;
    } else if (!hasStatement) {
      const statementCandidate = scored.find((p) => !p.isQuestion && !selected.includes(p));
      if (statementCandidate) selected[selected.length - 1] = statementCandidate;
    }
  }

  const finalPhrases = selected.slice(0, count).map((item) => item.en);
  if (finalPhrases.length < Math.min(3, count)) {
    throw new Error("Generated phrases did not pass quality validation");
  }

  return finalPhrases;
}

function selectCuratedEnglishPhrases(topic, level, count) {
  const pool = CURATED_TOPIC_PHRASES[topic] || CURATED_TOPIC_PHRASES.introduction;
  const targetRank = LEVEL_ORDER[level] || LEVEL_ORDER.A1;

  const sameLevel = pool.filter((item) => item.level === level);
  const easier = pool.filter(
    (item) => item.level !== level && (LEVEL_ORDER[item.level] || 1) <= targetRank
  );
  const harder = pool.filter((item) => (LEVEL_ORDER[item.level] || 1) > targetRank);
  const ordered = [...sameLevel, ...easier, ...harder];

  const selected = [];
  const seen = new Set();
  const window = levelWindow(level);

  for (const item of ordered) {
    if (selected.length >= count) break;
    const en = normalizeEnglish(item.en);
    if (!en || isTooBasic(en)) continue;
    const key = canonicalEnglish(en);
    if (!key || seen.has(key)) continue;
    const words = englishWordCount(en);
    if (words < Math.max(3, window.min - 1) || words > window.max + 2) continue;
    selected.push(en);
    seen.add(key);
  }

  if (selected.length < count) {
    for (const item of ordered) {
      if (selected.length >= count) break;
      const en = normalizeEnglish(item.en);
      const key = canonicalEnglish(en);
      if (!en || !key || seen.has(key)) continue;
      selected.push(en);
      seen.add(key);
    }
  }

  return selected.slice(0, count);
}

async function translateEnglishPhrasesToKannada(phrases) {
  const results = await Promise.all(
    phrases.map(async (en) => {
      const translation = await attemptTranslation({
        text: en,
        source: "en",
        target: "kn",
      });
      return {
        en,
        kn: normalizeKannada(translation.translatedText),
      };
    })
  );

  return results.filter((item) => item.en && item.kn && item.kn.length >= 4);
}

async function generateLessonFromCurated({ topic, level, count, uiLanguage }) {
  const selectedEnglish = selectCuratedEnglishPhrases(topic, level, count);
  if (selectedEnglish.length < Math.min(3, count)) {
    throw new Error("Curated fallback has insufficient phrases");
  }

  let phrases = await translateEnglishPhrasesToKannada(selectedEnglish);
  phrases = await topUpPhrasesFromCurated({ topic, level, count, phrases });
  if (phrases.length < Math.min(3, count)) {
    throw new Error("Curated fallback translation failed");
  }

  const title = lessonTopicTitle(topic);
  return {
    id: makeLessonId(topic),
    topic,
    level,
    titleEn: title.en,
    titleKn: title.kn,
    phrases: phrases.slice(0, count),
    language: uiLanguage,
    generator: "curated-fallback",
  };
}

async function topUpPhrasesFromCurated({ topic, level, count, phrases }) {
  if (phrases.length >= count) return phrases.slice(0, count);

  const existing = new Set(phrases.map((item) => canonicalEnglish(item.en)));
  const curatedEnglish = selectCuratedEnglishPhrases(topic, level, count * 2);
  const needed = count - phrases.length;
  const extraEnglish = [];

  for (const en of curatedEnglish) {
    if (extraEnglish.length >= needed) break;
    const key = canonicalEnglish(en);
    if (!key || existing.has(key)) continue;
    existing.add(key);
    extraEnglish.push(en);
  }

  if (!extraEnglish.length) return phrases.slice(0, count);

  const translatedExtra = await translateEnglishPhrasesToKannada(extraEnglish);
  return [...phrases, ...translatedExtra].slice(0, count);
}

function cachedLessonKey({ topic, level, count, uiLanguage }) {
  return [LESSON_GENERATOR_VERSION, topic, level, count, uiLanguage].join("|");
}

function makeLessonId(topic) {
  return `gen-${topic}-${Date.now().toString(36)}`;
}

function lessonTopicTitle(topic) {
  return LESSON_GENERATION_TOPICS[topic] || LESSON_GENERATION_TOPICS.introduction;
}

async function fetchSarvamChatCompletion(body, apiKey) {
  const url = "https://api.sarvam.ai/v1/chat/completions";

  let response = await fetchWithTimeout(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify(body),
    },
    25000
  );

  if (!response.ok && (response.status === 401 || response.status === 403)) {
    response = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      },
      25000
    );
  }

  return response;
}

async function generateLessonWithSarvam({ topic, level, count, uiLanguage }) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    const fallbackLesson = await generateLessonFromCurated({
      topic,
      level,
      count,
      uiLanguage,
    });
    fallbackLesson.generationErrors = ["Sarvam key missing"];
    return fallbackLesson;
  }

  const model = process.env.SARVAM_CHAT_MODEL || "sarvam-30b";
  const topicTitle = lessonTopicTitle(topic);
  const rule = levelRule(level);
  const intents = TOPIC_INTENTS[topic] || TOPIC_INTENTS.introduction;
  const errors = [];

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const candidateCount = Math.min(14, Math.max(count * 2 + 2 - attempt, count + 2));

    const systemPrompt = [
      "You design realistic spoken-English drills for adult Kannada speakers.",
      "Output strict JSON only.",
      'Schema: {"phrases":[{"en":"string","intent":"string"}]}',
      "Return only English in 'en' field. Do not include Kannada translation.",
      "No markdown, no explanations, no chain-of-thought.",
    ].join(" ");

    const userPrompt = [
      `Generate ${candidateCount} unique English phrases for topic: ${topicTitle.en}.`,
      `Target CEFR level: ${level}.`,
      `Word limit per phrase: ${rule.minWords}-${rule.maxWords}.`,
      `Level style: ${rule.guidance}`,
      "Audience context: Indian adult learner using English in real daily life.",
      "Avoid textbook-only lines and overused greetings.",
      "Include a mix of requests, questions, and statements.",
      `Intents to cover: ${intents.join(", ")}.`,
      "Return JSON only.",
    ].join(" ");

    const body = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2 + attempt * 0.05,
      max_tokens: 1200,
    };

    try {
      const response = await fetchSarvamChatCompletion(body, apiKey);
      if (!response.ok) {
        const details = await response.text();
        throw new Error(
          `Sarvam lesson generation failed (${response.status}): ${details.slice(0, 320)}`
        );
      }

      const data = await response.json();
      const rawContent = extractSarvamMessageText(data?.choices?.[0]?.message);
      if (!rawContent) {
        throw new Error("Sarvam returned empty lesson content");
      }

      const parsedItems = parseGeneratedPhrasePayload(rawContent);
      const selectedEnglish = selectEnglishPhrases(parsedItems, { topic, level, count });
      let phrases = await translateEnglishPhrasesToKannada(selectedEnglish);
      phrases = await topUpPhrasesFromCurated({ topic, level, count, phrases });
      if (phrases.length < Math.min(3, count)) {
        throw new Error("Could not translate enough generated phrases");
      }

      const title = lessonTopicTitle(topic);
      return {
        id: makeLessonId(topic),
        topic,
        level,
        titleEn: title.en,
        titleKn: title.kn,
        phrases: phrases.slice(0, count),
        language: uiLanguage,
        generator: "sarvam-chat",
      };
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  try {
    const fallbackLesson = await generateLessonFromCurated({
      topic,
      level,
      count,
      uiLanguage,
    });
    fallbackLesson.generationErrors = errors;
    return fallbackLesson;
  } catch (fallbackErr) {
    const fallbackMessage =
      fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
    throw new Error(
      `Lesson generation failed after retries: ${errors.join(
        " | "
      )} | Curated fallback failed: ${fallbackMessage}`
    );
  }
}

function normalizeTutorReply(text) {
  const cleaned = stripCodeFence(String(text || "")).replace(/\r/g, "").trim();
  if (!cleaned) return "";
  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.join("\n").slice(0, 900);
}

function fallbackTutorReply({ message, uiLanguage }) {
  const safe = normalizeTutorMessage(message, 160) || "I want to improve my English.";
  if (uiLanguage === "kn") {
    return [
      `Good attempt. Try: "${safe}"`,
      "Kannada hint: ಚಿಕ್ಕ ಮತ್ತು ಸ್ಪಷ್ಟ ವಾಕ್ಯಗಳಲ್ಲಿ ಮಾತನಾಡಿ.",
      "Follow-up: ಇದೇ ವಿಷಯದಲ್ಲಿ ಇನ್ನೊಂದು ವಾಕ್ಯ ಹೇಳುತ್ತೀರಾ?",
    ].join("\n");
  }
  return [
    `Good attempt. Try: "${safe}"`,
    "Hint: Keep the sentence short and clear.",
    "Follow-up: Can you say one more sentence on the same topic?",
  ].join("\n");
}

async function generateTutorReplyWithSarvam({
  message,
  history,
  level,
  topic,
  currentPhrase,
  uiLanguage,
}) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    throw new Error("Sarvam key missing");
  }

  const model = process.env.SARVAM_TUTOR_MODEL || process.env.SARVAM_CHAT_MODEL || "sarvam-30b";
  const topicTitle = lessonTopicTitle(topic);
  const languageHint =
    uiLanguage === "kn"
      ? "Include exactly one Kannada hint line prefixed with 'Kannada hint:'."
      : "Do not include Kannada text.";
  const currentPhraseHint = normalizeEnglish(currentPhrase)
    ? `Current lesson phrase: ${normalizeEnglish(currentPhrase)}`
    : "Current lesson phrase: none";

  const systemPrompt = [
    "You are Amma English Coach, a patient spoken-English tutor for adult Kannada speakers.",
    "Keep the response short and practical for CEFR level",
    level + ".",
    "Response format rules:",
    "1) First line: direct tutor response in simple English.",
    "2) Second line: Better English: <corrected sentence>.",
    "3) Third line: Follow-up: <a clear next question>.",
    languageHint,
    "Do not use markdown bullets, tables, or JSON.",
    "Maximum 85 words total.",
  ].join(" ");

  const sanitizedHistory = sanitizeTutorHistory(history);
  const messages = [{ role: "system", content: systemPrompt }, ...sanitizedHistory];

  const latestFromHistory = sanitizedHistory[sanitizedHistory.length - 1];
  const normalizedMessage = normalizeTutorMessage(message);
  if (
    !latestFromHistory ||
    latestFromHistory.role !== "user" ||
    latestFromHistory.content !== normalizedMessage
  ) {
    messages.push({ role: "user", content: normalizedMessage });
  }

  messages.push({
    role: "user",
    content: [
      `Topic: ${topicTitle.en}.`,
      currentPhraseHint,
      `Learner message: ${normalizedMessage}`,
    ].join("\n"),
  });

  const response = await fetchSarvamChatCompletion(
    {
      model,
      messages,
      temperature: 0.35,
      max_tokens: 500,
    },
    apiKey
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sarvam tutor chat failed (${response.status}): ${details.slice(0, 320)}`);
  }

  const data = await response.json();
  const reply = normalizeTutorReply(extractSarvamMessageText(data?.choices?.[0]?.message));
  if (!reply) {
    throw new Error("Sarvam tutor chat returned empty response");
  }
  return reply;
}

async function translateWithSarvam({ text, source, target }) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    throw new Error("Sarvam key missing");
  }

  const body = {
    input: text,
    source_language_code: SARVAM_LANG_CODE[source],
    target_language_code: SARVAM_LANG_CODE[target],
    model: process.env.SARVAM_MODEL || "sarvam-translate:v1",
    mode: "formal",
  };

  const response = await fetchWithTimeout("https://api.sarvam.ai/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sarvam failed (${response.status}): ${details.slice(0, 240)}`);
  }

  const data = await response.json();
  const translatedText = (data.translated_text || "").trim();
  if (!translatedText) {
    throw new Error("Sarvam returned empty translation");
  }
  return translatedText;
}

async function translateWithGemini({ text, source, target }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini key missing");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const prompt = [
    `Translate from ${LANGUAGE_NAMES[source]} to ${LANGUAGE_NAMES[target]}.`,
    "Return only the translation with no explanation, quotes, or notes.",
    "",
    text,
  ].join("\n");

  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 512 },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini failed (${response.status}): ${details.slice(0, 240)}`);
  }

  const data = await response.json();
  const translatedText = (
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || ""
  ).trim();
  if (!translatedText) {
    throw new Error("Gemini returned empty translation");
  }
  return translatedText;
}

async function translateWithOpenRouter({ text, source, target }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter key missing");
  }

  const model = process.env.OPENROUTER_MODEL || "openrouter/free";
  const response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            "You are a translation engine. Return only translated text, no explanations or extra lines.",
        },
        {
          role: "user",
          content: `Translate from ${LANGUAGE_NAMES[source]} to ${LANGUAGE_NAMES[target]}:\n${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenRouter failed (${response.status}): ${details.slice(0, 240)}`);
  }

  const data = await response.json();
  const translatedText = parseOpenRouterContent(data?.choices?.[0]?.message?.content);
  if (!translatedText) {
    throw new Error("OpenRouter returned empty translation");
  }
  return translatedText;
}

async function translateWithMyMemory({ text, source, target }) {
  const query = new URL("https://api.mymemory.translated.net/get");
  query.searchParams.set("q", text);
  query.searchParams.set("langpair", `${source}|${target}`);
  if (process.env.MYMEMORY_CONTACT_EMAIL) {
    query.searchParams.set("de", process.env.MYMEMORY_CONTACT_EMAIL);
  }

  const response = await fetchWithTimeout(query.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`MyMemory failed (${response.status}): ${details.slice(0, 240)}`);
  }

  const data = await response.json();
  const translatedText = (data?.responseData?.translatedText || "").trim();
  if (!translatedText) {
    throw new Error("MyMemory returned empty translation");
  }
  return translatedText;
}

async function attemptTranslation(input) {
  const order = configuredProviderOrder();
  const available = providerAvailability();
  const errors = [];

  for (const provider of order) {
    if (!available[provider]) continue;
    try {
      let translatedText = "";
      if (provider === "sarvam") translatedText = await translateWithSarvam(input);
      if (provider === "gemini") translatedText = await translateWithGemini(input);
      if (provider === "openrouter") translatedText = await translateWithOpenRouter(input);
      if (provider === "mymemory") translatedText = await translateWithMyMemory(input);
      if (!translatedText) throw new Error("Empty translation");
      return {
        translatedText,
        provider,
        attempted: errors.map((e) => e.provider),
      };
    } catch (err) {
      errors.push({
        provider,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  throw new Error(
    `All providers failed. ${errors
      .map((e) => `${e.provider}: ${e.error}`)
      .join(" | ")
      .slice(0, 1500)}`
  );
}

async function handleTranslate(req, res) {
  let payload;
  try {
    const raw = await readBody(req);
    payload = JSON.parse(raw);
  } catch {
    return badRequest(res, "Invalid JSON body");
  }

  const text = String(payload?.text || "").trim();
  const source = normalizeDirection(payload?.source, null);
  const target = normalizeDirection(payload?.target, null);

  if (!text) return badRequest(res, "text is required");
  if (text.length > 1800) return badRequest(res, "text must be 1800 chars or fewer");
  if (!source || !target || source === target) {
    return badRequest(res, "source/target must be en or kn and must differ");
  }

  try {
    const result = await attemptTranslation({ text, source, target });
    return json(res, 200, {
      translatedText: result.translatedText,
      provider: result.provider,
      source,
      target,
      fallbackUsed: result.attempted.length > 0,
    });
  } catch (err) {
    return json(res, 502, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

async function handleTutorChat(req, res) {
  let payload;
  try {
    const raw = await readBody(req);
    payload = JSON.parse(raw);
  } catch {
    return badRequest(res, "Invalid JSON body");
  }

  const message = normalizeTutorMessage(payload?.message);
  const uiLanguage = parseUiLanguage(payload?.uiLanguage);
  const level = parseLevel(payload?.level) || "A1";
  const topic = parseTopic(payload?.topic) || "introduction";
  const currentPhrase = normalizeEnglish(String(payload?.currentPhrase || "")).slice(0, 180);
  const history = sanitizeTutorHistory(payload?.history);

  if (!message) return badRequest(res, "message is required");

  try {
    const reply = await generateTutorReplyWithSarvam({
      message,
      history,
      level,
      topic,
      currentPhrase,
      uiLanguage,
    });
    return json(res, 200, {
      reply,
      provider: "sarvam-chat",
      fallbackUsed: false,
      version: TUTOR_CHAT_VERSION,
    });
  } catch (err) {
    return json(res, 200, {
      reply: fallbackTutorReply({ message, uiLanguage }),
      provider: "local-fallback",
      fallbackUsed: true,
      version: TUTOR_CHAT_VERSION,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

async function handleGenerateLesson(req, res) {
  let payload;
  try {
    const raw = await readBody(req);
    payload = JSON.parse(raw);
  } catch {
    return badRequest(res, "Invalid JSON body");
  }

  const topic = parseTopic(payload?.topic) || "introduction";
  const level = parseLevel(payload?.level) || "A1";
  const count = parseCount(payload?.count) || 5;
  const uiLanguage = parseUiLanguage(payload?.uiLanguage);

  const cacheKey = cachedLessonKey({ topic, level, count, uiLanguage });
  const now = Date.now();
  const cached = lessonCache.get(cacheKey);
  if (cached && now - cached.createdAt <= LESSON_CACHE_TTL_MS) {
    return json(res, 200, {
      lesson: cached.lesson,
      provider: cached.lesson.generator || "sarvam-chat",
      cached: true,
      fallbackUsed: (cached.lesson.generator || "sarvam-chat") !== "sarvam-chat",
    });
  }

  try {
    const lesson = await generateLessonWithSarvam({
      topic,
      level,
      count,
      uiLanguage,
    });

    lessonCache.set(cacheKey, { lesson, createdAt: now });

    return json(res, 200, {
      lesson,
      provider: lesson.generator || "sarvam-chat",
      cached: false,
      fallbackUsed: (lesson.generator || "sarvam-chat") !== "sarvam-chat",
    });
  } catch (err) {
    return json(res, 502, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function handleProviders(res) {
  const available = providerAvailability();
  const order = configuredProviderOrder();
  return json(res, 200, {
    available,
    order,
    lessonGeneration: {
      sarvamChat: Boolean(process.env.SARVAM_API_KEY),
      curatedFallback: true,
      model: process.env.SARVAM_CHAT_MODEL || "sarvam-30b",
      version: LESSON_GENERATOR_VERSION,
      topics: Object.keys(LESSON_GENERATION_TOPICS),
    },
    tutorChat: {
      sarvamChat: Boolean(process.env.SARVAM_API_KEY),
      localFallback: true,
      model: process.env.SARVAM_TUTOR_MODEL || process.env.SARVAM_CHAT_MODEL || "sarvam-30b",
      version: TUTOR_CHAT_VERSION,
    },
  });
}

async function serveStatic(reqPath, res) {
  const clean = reqPath === "/" ? "/index.html" : reqPath;
  const safePath = path.normalize(clean).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    return notFound(res);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
}

function createServer() {
  return http.createServer(async (req, res) => {
    const method = req.method || "GET";
    const url = new URL(req.url || "/", `http://${req.headers.host}`);

    if (method === "GET" && url.pathname === "/api/providers") {
      return handleProviders(res);
    }

    if (method === "POST" && url.pathname === "/api/translate") {
      return handleTranslate(req, res);
    }

    if (method === "POST" && url.pathname === "/api/tutor-chat") {
      return handleTutorChat(req, res);
    }

    if (method === "POST" && url.pathname === "/api/generate-lesson") {
      return handleGenerateLesson(req, res);
    }

    if (method === "GET") {
      return serveStatic(url.pathname, res);
    }

    res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, "0.0.0.0", () => {
    const order = configuredProviderOrder().join(" -> ");
    const lessonModel = process.env.SARVAM_CHAT_MODEL || "sarvam-30b";
    const tutorModel = process.env.SARVAM_TUTOR_MODEL || lessonModel;
    console.log(`[server] running at http://localhost:${PORT}`);
    console.log(`[server] translation order: ${order}`);
    console.log(`[server] lesson generation model: ${lessonModel}`);
    console.log(`[server] tutor chat model: ${tutorModel}`);
  });
}

module.exports = {
  createServer,
  handleProviders,
  handleTranslate,
  handleTutorChat,
  handleGenerateLesson,
};
