"use strict";

const DEFAULT_LEARNING_TRACK = "kn-en";

const LEARNING_TRACKS = {
  "kn-en": {
    id: "kn-en",
    source: "kn",
    target: "en",
    support: "kn",
    practiceLocale: "en-US",
    supportLocale: "kn-IN",
  },
  "mr-kn": {
    id: "mr-kn",
    source: "mr",
    target: "kn",
    support: "mr",
    practiceLocale: "kn-IN",
    supportLocale: "mr-IN",
  },
};

const LANGUAGE_DISPLAY_NAMES = {
  en: { en: "English", kn: "ಇಂಗ್ಲಿಷ್" },
  kn: { en: "Kannada", kn: "ಕನ್ನಡ" },
  mr: { en: "Marathi", kn: "ಮರಾಠಿ" },
};

const DEFAULT_LESSONS_BY_TRACK = {
  "kn-en": [
    {
      id: "intro",
      topic: "introduction",
      titleKn: "ಪರಿಚಯ",
      titleEn: "Introduction",
      phrases: [
        {
          en: "Hello, my name is Lakshmi.",
          kn: "ನಮಸ್ಕಾರ, ನನ್ನ ಹೆಸರು ಲಕ್ಷ್ಮಿ.",
        },
        {
          en: "I am from Mysuru.",
          kn: "ನಾನು ಮೈಸೂರುದಿಂದ ಬಂದಿದ್ದೇನೆ.",
        },
        {
          en: "I am learning English every day.",
          kn: "ನಾನು ಪ್ರತಿದಿನ ಇಂಗ್ಲಿಷ್ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.",
        },
      ],
    },
    {
      id: "shopping",
      topic: "shopping",
      titleKn: "ಶಾಪಿಂಗ್",
      titleEn: "Shopping",
      phrases: [
        {
          en: "How much does this cost?",
          kn: "ಇದಕ್ಕೆ ಎಷ್ಟು ಬೆಲೆ?",
        },
        {
          en: "Please give me one kilogram of rice.",
          kn: "ದಯವಿಟ್ಟು ಒಂದು ಕಿಲೋ ಅಕ್ಕಿ ನೀಡಿ.",
        },
        {
          en: "Do you have a smaller size?",
          kn: "ಚಿಕ್ಕ ಸೈಸ್ ಇದೆಯಾ?",
        },
      ],
    },
    {
      id: "doctor",
      topic: "doctor",
      titleKn: "ಡಾಕ್ಟರ್ ಬಳಿ",
      titleEn: "Doctor Visit",
      phrases: [
        {
          en: "I have a headache since morning.",
          kn: "ಬೆಳಗ್ಗೆಯಿಂದ ನನಗೆ ತಲೆನೋವು ಇದೆ.",
        },
        {
          en: "I need to see the doctor today.",
          kn: "ಇಂದು ನನಗೆ ಡಾಕ್ಟರ್‌ರನ್ನು ನೋಡಬೇಕು.",
        },
        {
          en: "Should I take this medicine after food?",
          kn: "ಈ ಔಷಧವನ್ನು ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾ?",
        },
      ],
    },
    {
      id: "phone",
      topic: "phone",
      titleKn: "ಫೋನ್ ಮಾತು",
      titleEn: "Phone Call",
      phrases: [
        {
          en: "Can I call you back in ten minutes?",
          kn: "ನಾನು ನಿಮಗೆ ಹತ್ತು ನಿಮಿಷಗಳಲ್ಲಿ ಹಿಂದಿರುಗಿ ಕರೆ ಮಾಡಬಹುದಾ?",
        },
        {
          en: "Please speak slowly.",
          kn: "ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತಾಡಿ.",
        },
        {
          en: "I did not understand. Can you repeat that?",
          kn: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಅದನ್ನು ಮತ್ತೆ ಹೇಳುತ್ತೀರಾ?",
        },
      ],
    },
  ],
  "mr-kn": [
    {
      id: "intro",
      topic: "introduction",
      titleKn: "ಪರಿಚಯ",
      titleEn: "Introduction",
      phrases: [
        {
          en: "ನಮಸ್ಕಾರ, ನನ್ನ ಹೆಸರು ಅನಿತಾ.",
          kn: "नमस्कार, माझं नाव अनीता आहे.",
        },
        {
          en: "ನಾನು ಪುಣೆಯಿಂದ ಬಂದಿದ್ದೇನೆ.",
          kn: "मी पुण्याहून आले आहे.",
        },
        {
          en: "ನಾನು ಪ್ರತಿದಿನ ಕನ್ನಡ ಅಭ್ಯಾಸ ಮಾಡುತ್ತೇನೆ.",
          kn: "मी रोज कन्नडचा सराव करते.",
        },
      ],
    },
    {
      id: "shopping",
      topic: "shopping",
      titleKn: "ಶಾಪಿಂಗ್",
      titleEn: "Shopping",
      phrases: [
        {
          en: "ಇದಕ್ಕೆ ಎಷ್ಟು ಬೆಲೆ?",
          kn: "याची किंमत किती आहे?",
        },
        {
          en: "ದಯವಿಟ್ಟು ಒಂದು ಕಿಲೋ ಅಕ್ಕಿ ಕೊಡಿ.",
          kn: "कृपया एक किलो तांदूळ द्या.",
        },
        {
          en: "ಚಿಕ್ಕ ಸೈಸ್ ಇದೆಯೆ?",
          kn: "लहान साईज आहे का?",
        },
      ],
    },
    {
      id: "doctor",
      topic: "doctor",
      titleKn: "ಡಾಕ್ಟರ್ ಭೇಟಿ",
      titleEn: "Doctor Visit",
      phrases: [
        {
          en: "ನನಗೆ ನಿನ್ನೆಯಿಂದ ಜ್ವರ ಇದೆ.",
          kn: "मला कालपासून ताप आहे.",
        },
        {
          en: "ಊಟದ ನಂತರ ಈ ಔಷಧ ತೆಗೆದುಕೊಳ್ಳಬೇಕೆ?",
          kn: "हे औषध जेवणानंतर घ्यायचं का?",
        },
        {
          en: "ದಯವಿಟ್ಟು ಡೋಸ್ ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.",
          kn: "कृपया डोस पुन्हा सांगा.",
        },
      ],
    },
    {
      id: "phone",
      topic: "phone",
      titleKn: "ಫೋನ್ ಮಾತು",
      titleEn: "Phone Call",
      phrases: [
        {
          en: "ನೀವು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ, ದಯವಿಟ್ಟು.",
          kn: "कृपया हळू बोला.",
        },
        {
          en: "ಹತ್ತು ನಿಮಿಷದಲ್ಲಿ ನಾನು ಮತ್ತೆ ಕರೆ ಮಾಡುತ್ತೇನೆ.",
          kn: "मी दहा मिनिटांनी परत फोन करेन.",
        },
        {
          en: "ನನಗೆ ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ, ಮತ್ತೆ ಹೇಳಿ.",
          kn: "मला नीट समजलं नाही, पुन्हा सांगा.",
        },
      ],
    },
  ],
};

const LESSON_LIMIT = 12;

const TOPIC_LABELS = {
  introduction: { en: "Introduction", kn: "ಪರಿಚಯ" },
  shopping: { en: "Shopping", kn: "ಶಾಪಿಂಗ್" },
  doctor: { en: "Doctor Visit", kn: "ಡಾಕ್ಟರ್ ಭೇಟಿ" },
  phone: { en: "Phone Call", kn: "ಫೋನ್ ಮಾತು" },
  travel: { en: "Travel", kn: "ಪ್ರಯಾಣ" },
  family: { en: "Family", kn: "ಕುಟುಂಬ" },
  routine: { en: "Daily Routine", kn: "ದೈನಂದಿನ ಕ್ರಮ" },
};

const UI_TEXT = {
  kn: {
    langToggle: "EN",
    learningTrackLabel: "ಕಲಿಕೆಯ ದಿಕ್ಕು",
    heroTag: "ಕನ್ನಡ -> ಇಂಗ್ಲಿಷ್",
    heroSub: "ದಿನಕ್ಕೆ 15 ನಿಮಿಷ. ಕೇಳಿ, ಅರ್ಥಮಾಡಿ, ಮಾತನಾಡಿ.",
    progressTitle: "ಇವತ್ತಿನ ಪ್ರಗತಿ",
    progressHelp: "ಪ್ರತಿ ಅಭ್ಯಾಸದ ನಂತರ ಈ ಅಂಕೆಗಳು ಸ್ವಯಂ ನವೀಕರಿಸುತ್ತವೆ.",
    streakLabel: "ಸ್ಟ್ರೀಕ್",
    correctLabel: "ಸರಿಯಾದ ಉತ್ತರಗಳು",
    masteryLabel: "ಮಾಸ್ಟರಿ",
    learnerTitle: "ಕಲಿಯುವವರ ಪ್ರೊಫೈಲ್",
    learnerHelp: "ಪ್ಲೇಸ್ಮೆಂಟ್ ಒಂದು ಬಾರಿ ಮಾಡಿ. ಇಲ್ಲಿ ಮಟ್ಟ, ಕೌಶಲ್ಯ ಮತ್ತು ರಿವ್ಯೂ ಲೋಡ್ ಕಾಣಿಸುತ್ತದೆ.",
    placementBtn: "ಪ್ಲೇಸ್ಮೆಂಟ್ ಪರೀಕ್ಷೆ",
    placementSaveBtn: "ಪ್ಲೇಸ್ಮೆಂಟ್ ಸೇವ್",
    learnerLevelPrefix: "ಮಟ್ಟ",
    learnerNotAssessed: "ಇನ್ನೂ ಅಳತೆ ಮಾಡಿಲ್ಲ",
    d3Label: "3 ದಿನದ ನೆನಪು",
    d7Label: "7 ದಿನದ ನೆನಪು",
    dueLabel: "ಮತ್ತೆ ಹೇಳಬೇಕು",
    lessonSelectTitle: "ಪಾಠ ಆಯ್ಕೆ",
    lessonSelectSubtitle: "ಇಲ್ಲಿಂದ ಹೊಸ ಪಾಠ ರಚಿಸಲಾಗುತ್ತದೆ",
    lessonSelectHelp: "ಈ ಭಾಗದಲ್ಲಿ ಮೊದಲು ವಿಷಯ, ನಂತರ ಹಂತ ಮತ್ತು ವಾಕ್ಯಗಳ ಸಂಖ್ಯೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    lessonStep1: "ಹಂತ 1: ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ (ಶಾಪಿಂಗ್/ಡಾಕ್ಟರ್/ಫೋನ್).",
    lessonStep2: "ಹಂತ 2: ಹಂತ ಆಯ್ಕೆ ಮಾಡಿ: A1 = ತುಂಬಾ ಸುಲಭ, A2 = ಮಧ್ಯಮ, B1 = ಕಷ್ಟ.",
    lessonStep3: "ಹಂತ 3: 'ಪಾಠ ರಚಿಸಿ' ಬಟನ್ ಒತ್ತಿ.",
    lessonStep4: "ಹಂತ 4: ಕೆಳಗಿನ ಪಾಠ ಚಿಪ್ ಆಯ್ಕೆ ಮಾಡಿ ಮಾತನಾಡುವ ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ.",
    genTopicLabel: "ವಿಷಯ",
    genLevelLabel: "ಹಂತ (ಕಷ್ಟದ ಮಟ್ಟ)",
    genLevelHelp: "A1 ಸುಲಭ. A2 ಮಧ್ಯಮ. B1 ಸ್ವಲ್ಪ ಕಷ್ಟ ಮತ್ತು ಉದ್ದವಾದ ವಾಕ್ಯಗಳು.",
    genLevelOptA1: "A1 - ಸುಲಭ ಪ್ರಾರಂಭ",
    genLevelOptA2: "A2 - ಮಧ್ಯಮ ಪ್ರಾರಂಭ",
    genLevelOptB1: "B1 - ಮುಂದಿನ ಹಂತ",
    genCountLabel: "ಎಷ್ಟು ವಾಕ್ಯಗಳು?",
    genCountHelp: "ಒಂದು ಪಾಠದಲ್ಲಿ ಎಷ್ಟು ವಾಕ್ಯಗಳು ಬೇಕು. 5-8 ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸಕ್ಕೆ ಉತ್ತಮ.",
    genCountOpt4: "4 - ಬಹಳ ಚಿಕ್ಕ ಪಾಠ",
    genCountOpt5: "5 - ಶಿಫಾರಸು",
    genCountOpt6: "6 - ಸಾಮಾನ್ಯ",
    genCountOpt7: "7 - ಸ್ವಲ್ಪ ಉದ್ದ",
    genCountOpt8: "8 - ಹೆಚ್ಚು ಉದ್ದ",
    genButton: "ಪಾಠ ರಚಿಸಿ",
    genReady: "ಹೊಸ ಪಾಠ ರಚಿಸಲು ಆಯ್ಕೆಗಳು ಆರಿಸಿ.",
    genWorking: "ಹೊಸ ಪಾಠ ರಚಿಸಲಾಗುತ್ತಿದೆ...",
    genLoadedPrefix: "ಪಾಠ ಸಿದ್ಧ",
    genCachedTag: "cache",
    genFailedPrefix: "ರಚನೆ ವಿಫಲ",
    reviewTitle: "ಮತ್ತೆ ಅಭ್ಯಾಸ",
    reviewHelp: "ಮರೆತುಹೋಗದಂತೆ ಹಳೆಯ ವಾಕ್ಯಗಳು ಇಲ್ಲಿ ಬರುತ್ತವೆ.",
    reviewStartBtn: "ಹಳೆಯ ವಾಕ್ಯ ಅಭ್ಯಾಸ ಶುರು",
    reviewMarkEasy: "ಇದು ಬಂತು",
    reviewDueSuffix: "ಮತ್ತೆ ಹೇಳಬೇಕು",
    reviewReady: "ಹಳೆಯ ವಾಕ್ಯ ಬಂದಾಗ ಇಲ್ಲಿ ಮತ್ತೆ ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ.",
    reviewStarted: "ಮತ್ತೆ ಅಭ್ಯಾಸ ಶುರುವಾಗಿದೆ.",
    reviewNoDue: "ಈಗ ಮತ್ತೆ ಹೇಳಬೇಕಾದ ವಾಕ್ಯಗಳಿಲ್ಲ. ಹೊಸ ಪಾಠ ಮುಂದುವರಿಸಿ.",
    reviewMarkedEasy: "ಚೆನ್ನಾಗಿದೆ. ಈ ವಾಕ್ಯ ಈಗ ಸುಲಭ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ.",
    nextPhrase: "ಮುಂದಿನ ವಾಕ್ಯ",
    lessonPracticeHelp: "ಮೊದಲು ಕೇಳಿ, ನಂತರ ವಾಕ್ಯ ಹೇಳಿ. ಬೇಕಾದರೆ ಮಾತ್ರ ಕನ್ನಡ ಅರ್ಥ ನೋಡಿ.",
    phraseLabel: "ಇಂಗ್ಲಿಷ್ ವಾಕ್ಯ",
    playAudio: "ಆಡಿಯೋ ಕೇಳಿ",
    playSlow: "ನಿಧಾನವಾಗಿ ಕೇಳಿ",
    showMeaning: "ಕನ್ನಡ ಅರ್ಥ",
    hideMeaning: "ಅರ್ಥ ಮರೆಮಾಡಿ",
    practiceTitle: "ಮಾತನಾಡಿ ಅಭ್ಯಾಸ ಮಾಡಿ",
    practiceHelp: "ಮೈಕ್ ಬಳಸಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ. ಪರದೆಯಲ್ಲಿನ ವಾಕ್ಯಕ್ಕೆ ಹತ್ತಿರವಾಗಿ ಹೇಳಿ.",
    typedLabel: "ಟೈಪ್ ಮಾಡಿ ಪರೀಕ್ಷಿಸಿ",
    typedPlaceholder: "ನೀವು ಹೇಳಿದ ಇಂಗ್ಲಿಷ್ ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ",
    checkAnswer: "ಉತ್ತರ ಪರಿಶೀಲಿಸಿ",
    tutorTitle: "ಟ್ಯೂಟರ್ ಜೊತೆ ಮಾತುಕತೆ",
    tutorHelp:
      "Type ಮಾಡಬಹುದು ಅಥವಾ 'ಟ್ಯೂಟರ್ ಜೊತೆ ಮಾತನಾಡಿ' ಒತ್ತಿ ನೇರವಾಗಿ ಮಾತನಾಡಬಹುದು. ಟ್ಯೂಟರ್ ಉತ್ತರಿಸಿ ಸರಿಪಡಿಸುತ್ತದೆ.",
    tutorInputLabel: "ನಿಮ್ಮ ಸಂದೇಶ",
    tutorPlaceholder: "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಒಂದು ವಾಕ್ಯ ಬರೆಯಿರಿ",
    tutorSendBtn: "ಕಳುಹಿಸಿ",
    tutorMicStartBtn: "ಟ್ಯೂಟರ್ ಜೊತೆ ಮಾತನಾಡಿ",
    tutorMicStopBtn: "ನಿಲ್ಲಿಸಿ",
    tutorMicUnsupported: "ಟ್ಯೂಟರ್ ಮೈಕ್ ಲಭ್ಯವಿಲ್ಲ",
    tutorUsePhraseBtn: "ಪಾಠದ ವಾಕ್ಯ ಬಳಸಿ",
    tutorClearBtn: "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    tutorAudioOn: "ಟ್ಯೂಟರ್ ಧ್ವನಿ: ON",
    tutorAudioOff: "ಟ್ಯೂಟರ್ ಧ್ವನಿ: OFF",
    tutorAudioUnavailable: "ಟ್ಯೂಟರ್ ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ",
    tutorStatusReady: "ಚಾಟ್‌ಗೆ ಸಿದ್ಧ",
    tutorStatusListening: "ಕೇಳುತ್ತಿದೆ... ಮಾತನಾಡಿ",
    tutorStatusThinking: "ಟ್ಯೂಟರ್ ಉತ್ತರಿಸುತ್ತಿದೆ...",
    tutorStatusError: "ಟ್ಯೂಟರ್ ದೋಷ",
    tutorStatusProviderPrefix: "ಟ್ಯೂಟರ್",
    tutorUserLabel: "ನೀವು",
    tutorAssistantLabel: "ಟ್ಯೂಟರ್",
    tutorWelcome:
      "ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮ English tutor.\nಇಂದು ಯಾವ ಪರಿಸ್ಥಿತಿಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡೋಣ? (ಶಾಪಿಂಗ್/ಫೋನ್/ಡಾಕ್ಟರ್)",
    micIdle: "ಮೈಕ್ ಸಿದ್ಧ",
    micListening: "ಕೇಳುತ್ತಿದೆ...",
    micStart: "ಮೈಕ್ ಆರಂಭಿಸಿ",
    micStop: "ಮೈಕ್ ನಿಲ್ಲಿಸಿ",
    micUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ ಸಪೋರ್ಟ್ ಇಲ್ಲ",
    translateTitle: "ಅನುವಾದ ಸಹಾಯ (API)",
    translateHelp: "ಅರ್ಥವನ್ನು ಬೇಗ ದೃಢಪಡಿಸಲು ಮಾತ್ರ ಬಳಸಿ. ಮುಖ್ಯ ಅಭ್ಯಾಸ ಪಾಠ ಮತ್ತು ಮಾತನಾಡುವುದರಲ್ಲಿ ಇರಲಿ.",
    directionLabel: "ದಿಕ್ಕು",
    directionKnEn: "ಕನ್ನಡ -> ಇಂಗ್ಲಿಷ್",
    directionEnKn: "ಇಂಗ್ಲಿಷ್ -> ಕನ್ನಡ",
    translateTextLabel: "ಪಠ್ಯ",
    translatePlaceholder: "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಪಠ್ಯ ಬರೆಯಿರಿ",
    translateNow: "ಈಗ ಅನುವಾದಿಸಿ",
    useLessonPhrase: "ಪಾಠದ ವಾಕ್ಯ ಬಳಸಿ",
    providerChecking: "ಪ್ರೊವೈಡರ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    providerAvailable: "ಲಭ್ಯ",
    providerOrder: "ಕ್ರಮ",
    providerNone: "ಯಾವುದೂ ಇಲ್ಲ",
    providerOffline: "Translation API offline. Start with: node server.js",
    translateMissingTitle: "ಪಠ್ಯ ಇಲ್ಲ",
    translateMissingBody: "ಮೊದಲು ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿ.",
    translatingTitle: "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
    translatingBody: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ",
    providerPrefix: "ಪ್ರೊವೈಡರ್",
    fallbackUsed: "fallback used",
    translateFailedTitle: "ಅನುವಾದ ವಿಫಲವಾಗಿದೆ",
    placementPromptIntro:
      "ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ 1 ರಿಂದ 5 ಅಂಕ ನೀಡಿ (1 = ಕಷ್ಟ, 5 = ಸುಲಭ).",
    placementQ1: "ನಿಧಾನ ಇಂಗ್ಲಿಷ್ ಕೇಳಿದಾಗ ಅರ್ಥವಾಗುತ್ತದೆಯೇ?",
    placementQ2: "ಸ್ವತಃ 1-2 ವಾಕ್ಯ ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡಬಲ್ಲಿರಾ?",
    placementQ3: "ಫೋನ್‌ನಲ್ಲಿ ಸರಳ ವಿಚಾರ ಕೇಳಬಲ್ಲಿರಾ?",
    placementQ4: "ಶಾಪಿಂಗ್‌ನಲ್ಲಿ ಬೆಲೆ/ಸೈಸ್ ಕೇಳಬಲ್ಲಿರಾ?",
    placementQ5: "ಆರೋಗ್ಯ ಸಮಸ್ಯೆಯನ್ನು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಹೇಳಬಲ್ಲಿರಾ?",
    placementSavedPrefix: "ಪ್ಲೇಸ್ಮೆಂಟ್ ಸೇವ್",
    scenarioTitle: "ಸನ್ನಿವೇಶ ಅಭ್ಯಾಸ",
    scenarioHelp: "ಒಂದು ಸನ್ನಿವೇಶ ಆಯ್ಕೆ ಮಾಡಿ. ಪ್ರತಿಯೊಂದು ಟರ್ನ್‌ಗೆ ಉತ್ತರಿಸಿ, ನಂತರ Next turn ಒತ್ತಿ.",
    scenarioUnsupported:
      "ಸನ್ನಿವೇಶ ಅಭ್ಯಾಸ ಈಗ ಕನ್ನಡ -> ಇಂಗ್ಲಿಷ್ ಟ್ರ್ಯಾಕ್‌ಗೆ ಮಾತ್ರ ಲಭ್ಯ.",
    scenarioPromptLabel: "ಸ್ಥಿತಿ",
    scenarioStartBtn: "ಸನ್ನಿವೇಶ ಆರಂಭಿಸಿ",
    scenarioNextBtn: "ಮುಂದಿನ ಟರ್ನ್",
    scenarioCheckBtn: "ಟರ್ನ್ ಪರಿಶೀಲಿಸಿ",
    scenarioAnswerPlaceholder: "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಹೇಳಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ",
    scenarioContextIdle: "ನಿಮ್ಮ ದಿನನಿತ್ಯದ ಜೀವನಕ್ಕೆ ಹೊಂದುವ ಸನ್ನಿವೇಶ ಆಯ್ಕೆ ಮಾಡಿ.",
    scenarioTargetPrefix: "ಲಕ್ಷ್ಯ",
    scenarioGood: "ಚೆನ್ನಾಗಿದೆ",
    scenarioRetry: "ಸ್ವಲ್ಪ ಬದಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    scenarioComplete: "ಸನ್ನಿವೇಶ ಪೂರ್ಣವಾಗಿದೆ",
    skillSpeaking: "ಮಾತನಾಡುವುದು",
    skillListening: "ಕೇಳುವುದು",
    skillVocabulary: "ಪದಕೋಶ",
    skillGrammar: "ವ್ಯಾಕರಣ",
    skillFluency: "ಸರಾಗತೆ",
    skillConfidence: "ಆತ್ಮವಿಶ್ವಾಸ",
    noInputTitle: "ಇನ್‌ಪುಟ್ ಇಲ್ಲ",
    noInputBody: "ಮಾತನಾಡಿದ ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    audioUnavailableTitle: "ಆಡಿಯೋ ಸಪೋರ್ಟ್ ಇಲ್ಲ",
    audioUnavailableBody: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಆಡಿಯೋ ಸಪೋರ್ಟ್ ಇಲ್ಲ.",
    micErrorTitle: "ಮೈಕ್ ದೋಷ",
    micErrorBody: "ವಾಯ್ಸ್ ಸಿಗಲಿಲ್ಲ. ಕೆಳಗೆ ಟೈಪ್ ಇನ್‌ಪುಟ್ ಬಳಸಿ.",
    feedbackExcellentTitle: "ಅದ್ಭುತ",
    feedbackExcellentBody: 'You said: "{answer}". Perfect. Try the next phrase.',
    feedbackAlmostTitle: "ಹತ್ತಿರ ಬಂದಿದ್ದೀರಿ",
    feedbackAlmostBody: 'You said: "{answer}". Close. Listen once and repeat.',
    feedbackRetryTitle: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    feedbackRetryBody: 'You said: "{answer}". Target: "{target}". Start with smaller chunks.',
    topicIntroduction: "ಪರಿಚಯ",
    topicShopping: "ಶಾಪಿಂಗ್",
    topicDoctor: "ಡಾಕ್ಟರ್ ಭೇಟಿ",
    topicPhone: "ಫೋನ್ ಮಾತು",
    topicTravel: "ಪ್ರಯಾಣ",
    topicFamily: "ಕುಟುಂಬ",
    topicRoutine: "ದೈನಂದಿನ ಕ್ರಮ",
  },
  en: {
    langToggle: "EN / ಕನ್ನಡ",
    learningTrackLabel: "Learning track",
    heroTag: "Kannada -> English",
    heroSub: "15 minutes daily. Listen, understand, and speak.",
    progressTitle: "Today Progress",
    progressHelp: "These numbers update automatically after each practice attempt.",
    streakLabel: "Streak",
    correctLabel: "Correct Answers",
    masteryLabel: "Mastery",
    learnerTitle: "Learner Profile",
    learnerHelp: "Run placement once. This block tracks level, skills, and revision load.",
    placementBtn: "Run placement",
    placementSaveBtn: "Save placement",
    learnerLevelPrefix: "Level",
    learnerNotAssessed: "Not assessed",
    d3Label: "3-day memory",
    d7Label: "7-day memory",
    dueLabel: "Need repeat",
    lessonSelectTitle: "Choose Lesson",
    lessonSelectSubtitle: "This section creates a new practice lesson",
    lessonSelectHelp: "Pick topic, level, and sentence count here before generating.",
    lessonStep1: "Step 1: Pick topic (shopping/doctor/phone).",
    lessonStep2: "Step 2: Pick level: A1 easiest, A2 medium, B1 harder.",
    lessonStep3: "Step 3: Click Generate lesson.",
    lessonStep4: "Step 4: Choose the lesson chip below and start speaking practice.",
    genTopicLabel: "Topic",
    genLevelLabel: "Level (difficulty)",
    genLevelHelp: "A1 is easiest. A2 is medium. B1 is harder with longer sentences.",
    genLevelOptA1: "A1 - Easy beginner",
    genLevelOptA2: "A2 - Medium beginner",
    genLevelOptB1: "B1 - Higher beginner",
    genCountLabel: "How many sentences?",
    genCountHelp: "How many practice sentences in one lesson. Use 5-8 for normal practice.",
    genCountOpt4: "4 - very short lesson",
    genCountOpt5: "5 - recommended",
    genCountOpt6: "6 - normal",
    genCountOpt7: "7 - longer",
    genCountOpt8: "8 - longest",
    genButton: "Generate lesson",
    genReady: "Choose options and generate a fresh lesson.",
    genWorking: "Generating lesson...",
    genLoadedPrefix: "Lesson ready",
    genCachedTag: "cache",
    genFailedPrefix: "Generation failed",
    reviewTitle: "Practice Again",
    reviewHelp: "Old sentences come here so you do not forget them.",
    reviewStartBtn: "Start repeat practice",
    reviewMarkEasy: "I know this now",
    reviewDueSuffix: "to repeat",
    reviewReady: "When old sentences appear, start repeat practice here.",
    reviewStarted: "Repeat practice started.",
    reviewNoDue: "No old sentences to repeat right now. Continue normal practice.",
    reviewMarkedEasy: "Great. Marked as already comfortable.",
    nextPhrase: "Next phrase",
    lessonPracticeHelp: "Listen first, repeat the sentence, then reveal Kannada if needed.",
    phraseLabel: "English phrase",
    playAudio: "Play audio",
    playSlow: "Play slow",
    showMeaning: "Show Kannada meaning",
    hideMeaning: "Hide meaning",
    practiceTitle: "Speaking Practice",
    practiceHelp: "Use mic or type the sentence. Try to match the phrase exactly.",
    typedLabel: "Fallback text input",
    typedPlaceholder: "Type what you said in English",
    checkAnswer: "Check answer",
    tutorTitle: "Tutor Conversation",
    tutorHelp:
      "Type if needed, or press Talk to tutor and speak directly. Tutor replies, corrects, and asks the next question.",
    tutorInputLabel: "Your message",
    tutorPlaceholder: "Type a sentence in Kannada or English",
    tutorSendBtn: "Send",
    tutorMicStartBtn: "Talk to tutor",
    tutorMicStopBtn: "Stop",
    tutorMicUnsupported: "Tutor mic unavailable",
    tutorUsePhraseBtn: "Use lesson phrase",
    tutorClearBtn: "Clear chat",
    tutorAudioOn: "Tutor voice: ON",
    tutorAudioOff: "Tutor voice: OFF",
    tutorAudioUnavailable: "Tutor voice unavailable",
    tutorStatusReady: "Ready to chat",
    tutorStatusListening: "Listening... speak now",
    tutorStatusThinking: "Tutor is replying...",
    tutorStatusError: "Tutor error",
    tutorStatusProviderPrefix: "Tutor",
    tutorUserLabel: "You",
    tutorAssistantLabel: "Tutor",
    tutorWelcome:
      "Hi, I am your English tutor.\nWhat real-life situation do you want to practice today?",
    micIdle: "Mic idle",
    micListening: "Listening...",
    micStart: "Start mic",
    micStop: "Stop mic",
    micUnsupported: "Mic not supported in this browser",
    translateTitle: "Translation Helper (API)",
    translateHelp: "Use this only to quickly confirm meaning. Main learning should stay in lesson practice.",
    directionLabel: "Direction",
    directionKnEn: "Kannada -> English",
    directionEnKn: "English -> Kannada",
    translateTextLabel: "Text",
    translatePlaceholder: "Type Kannada or English text",
    translateNow: "Translate now",
    useLessonPhrase: "Use lesson phrase",
    providerChecking: "Checking providers...",
    providerAvailable: "Available",
    providerOrder: "Order",
    providerNone: "none",
    providerOffline: "Translation API offline. Start with: node server.js",
    translateMissingTitle: "Missing text",
    translateMissingBody: "Enter Kannada or English text first.",
    translatingTitle: "Translating...",
    translatingBody: "Please wait",
    providerPrefix: "Provider",
    fallbackUsed: "fallback used",
    translateFailedTitle: "Translation failed",
    placementPromptIntro:
      "Rate each question from 1 to 5 (1 = hard, 5 = easy).",
    placementQ1: "Can you understand slow spoken English?",
    placementQ2: "Can you speak 1-2 sentences about yourself?",
    placementQ3: "Can you ask basic things on a phone call?",
    placementQ4: "Can you ask price/size while shopping?",
    placementQ5: "Can you explain a health problem in English?",
    placementSavedPrefix: "Placement saved",
    scenarioTitle: "Scenario Practice",
    scenarioHelp: "Choose a situation, answer each turn, then click Next turn.",
    scenarioUnsupported: "Scenario practice is currently available only for Kannada -> English.",
    scenarioPromptLabel: "Prompt",
    scenarioStartBtn: "Start scenario",
    scenarioNextBtn: "Next turn",
    scenarioCheckBtn: "Check turn",
    scenarioAnswerPlaceholder: "Say or type your response in English",
    scenarioContextIdle: "Pick a daily-life scenario and start practicing.",
    scenarioTargetPrefix: "Target",
    scenarioGood: "Good turn",
    scenarioRetry: "Try again with clearer sentence structure",
    scenarioComplete: "Scenario complete",
    skillSpeaking: "Speaking",
    skillListening: "Listening",
    skillVocabulary: "Vocabulary",
    skillGrammar: "Grammar",
    skillFluency: "Fluency",
    skillConfidence: "Confidence",
    noInputTitle: "No input",
    noInputBody: "Type your spoken sentence and check again.",
    audioUnavailableTitle: "Audio unavailable",
    audioUnavailableBody: "Your browser does not support speech output.",
    micErrorTitle: "Mic error",
    micErrorBody: "Could not capture voice. You can use text input below.",
    feedbackExcellentTitle: "Excellent",
    feedbackExcellentBody: 'You said: "{answer}". Perfect. Try the next phrase.',
    feedbackAlmostTitle: "Almost there",
    feedbackAlmostBody: 'You said: "{answer}". Close. Listen once and repeat.',
    feedbackRetryTitle: "Try again",
    feedbackRetryBody: 'You said: "{answer}". Target: "{target}". Start with smaller chunks.',
    topicIntroduction: "Introduction",
    topicShopping: "Shopping",
    topicDoctor: "Doctor Visit",
    topicPhone: "Phone Call",
    topicTravel: "Travel",
    topicFamily: "Family",
    topicRoutine: "Daily Routine",
  },
};

const els = {
  langToggle: document.querySelector("#lang-toggle"),
  learningTrackLabel: document.querySelector("#learning-track-label"),
  learningTrackSelect: document.querySelector("#learning-track"),
  learningTrackOptKnEn: document.querySelector("#learning-track-opt-kn-en"),
  learningTrackOptMrKn: document.querySelector("#learning-track-opt-mr-kn"),
  heroTag: document.querySelector("#hero-tag"),
  heroSub: document.querySelector("#hero-sub"),
  progressTitle: document.querySelector("#progress-title"),
  progressHelp: document.querySelector("#progress-help"),
  learnerTitle: document.querySelector("#learner-title"),
  learnerHelp: document.querySelector("#learner-help"),
  placementBtn: document.querySelector("#placement-btn"),
  placementForm: document.querySelector("#placement-form"),
  placementIntro: document.querySelector("#placement-intro"),
  placementQ1Label: document.querySelector("#placement-q1-label"),
  placementQ2Label: document.querySelector("#placement-q2-label"),
  placementQ3Label: document.querySelector("#placement-q3-label"),
  placementQ4Label: document.querySelector("#placement-q4-label"),
  placementQ5Label: document.querySelector("#placement-q5-label"),
  placementQ1: document.querySelector("#placement-q1"),
  placementQ2: document.querySelector("#placement-q2"),
  placementQ3: document.querySelector("#placement-q3"),
  placementQ4: document.querySelector("#placement-q4"),
  placementQ5: document.querySelector("#placement-q5"),
  placementSaveBtn: document.querySelector("#placement-save-btn"),
  learnerLevel: document.querySelector("#learner-level"),
  skillGrid: document.querySelector("#skill-grid"),
  d3Label: document.querySelector("#d3-label"),
  d7Label: document.querySelector("#d7-label"),
  dueLabel: document.querySelector("#due-label"),
  d3Value: document.querySelector("#d3-value"),
  d7Value: document.querySelector("#d7-value"),
  dueCount: document.querySelector("#due-count"),
  metricStreakLabel: document.querySelector("#metric-streak-label"),
  metricCorrectLabel: document.querySelector("#metric-correct-label"),
  metricMasteryLabel: document.querySelector("#metric-mastery-label"),
  lessonSelectTitle: document.querySelector("#lesson-select-title"),
  lessonSelectSubtitle: document.querySelector("#lesson-select-subtitle"),
  lessonSelectHelp: document.querySelector("#lesson-select-help"),
  lessonStep1: document.querySelector("#lesson-step-1"),
  lessonStep2: document.querySelector("#lesson-step-2"),
  lessonStep3: document.querySelector("#lesson-step-3"),
  lessonStep4: document.querySelector("#lesson-step-4"),
  genTopicLabel: document.querySelector("#gen-topic-label"),
  genLevelLabel: document.querySelector("#gen-level-label"),
  genLevelHelp: document.querySelector("#gen-level-help"),
  genLevelOptA1: document.querySelector("#gen-level-opt-a1"),
  genLevelOptA2: document.querySelector("#gen-level-opt-a2"),
  genLevelOptB1: document.querySelector("#gen-level-opt-b1"),
  genCountLabel: document.querySelector("#gen-count-label"),
  genCountHelp: document.querySelector("#gen-count-help"),
  genCountOpt4: document.querySelector("#gen-count-opt-4"),
  genCountOpt5: document.querySelector("#gen-count-opt-5"),
  genCountOpt6: document.querySelector("#gen-count-opt-6"),
  genCountOpt7: document.querySelector("#gen-count-opt-7"),
  genCountOpt8: document.querySelector("#gen-count-opt-8"),
  genTopic: document.querySelector("#gen-topic"),
  genLevel: document.querySelector("#gen-level"),
  genCount: document.querySelector("#gen-count"),
  generateLessonBtn: document.querySelector("#generate-lesson-btn"),
  generateStatus: document.querySelector("#generate-status"),
  date: document.querySelector("#session-date"),
  streak: document.querySelector("#streak"),
  correct: document.querySelector("#correct"),
  mastery: document.querySelector("#mastery"),
  lessonList: document.querySelector("#lesson-list"),
  lessonTitle: document.querySelector("#lesson-title"),
  lessonPracticeHelp: document.querySelector("#lesson-practice-help"),
  phraseLabel: document.querySelector("#phrase-label"),
  phraseEn: document.querySelector("#phrase-en"),
  phraseKn: document.querySelector("#phrase-kn"),
  nextBtn: document.querySelector("#next-btn"),
  showMeaning: document.querySelector("#show-meaning"),
  playNormal: document.querySelector("#play-normal"),
  playSlow: document.querySelector("#play-slow"),
  practiceTitle: document.querySelector("#practice-title"),
  practiceHelp: document.querySelector("#practice-help"),
  micBtn: document.querySelector("#mic-btn"),
  micStatus: document.querySelector("#mic-status"),
  typedLabel: document.querySelector("#typed-label"),
  typedAnswer: document.querySelector("#typed-answer"),
  checkTyped: document.querySelector("#check-typed"),
  feedbackCard: document.querySelector("#feedback-card"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackBody: document.querySelector("#feedback-body"),
  tutorTitle: document.querySelector("#tutor-title"),
  tutorStatus: document.querySelector("#tutor-status"),
  tutorHelp: document.querySelector("#tutor-help"),
  tutorLog: document.querySelector("#tutor-log"),
  tutorInputLabel: document.querySelector("#tutor-input-label"),
  tutorInput: document.querySelector("#tutor-input"),
  tutorSendBtn: document.querySelector("#tutor-send-btn"),
  tutorMicBtn: document.querySelector("#tutor-mic-btn"),
  tutorUsePhraseBtn: document.querySelector("#tutor-use-phrase"),
  tutorAudioToggleBtn: document.querySelector("#tutor-audio-toggle"),
  tutorClearBtn: document.querySelector("#tutor-clear-btn"),
  reviewTitle: document.querySelector("#review-title"),
  reviewHelp: document.querySelector("#review-help"),
  reviewDuePill: document.querySelector("#review-due-pill"),
  startReviewBtn: document.querySelector("#start-review-btn"),
  markEasyBtn: document.querySelector("#mark-easy-btn"),
  reviewStatus: document.querySelector("#review-status"),
  scenarioTitle: document.querySelector("#scenario-title"),
  scenarioHelp: document.querySelector("#scenario-help"),
  scenarioTopic: document.querySelector("#scenario-topic"),
  scenarioContext: document.querySelector("#scenario-context"),
  scenarioStartBtn: document.querySelector("#scenario-start-btn"),
  scenarioNextBtn: document.querySelector("#scenario-next-btn"),
  scenarioPromptLabel: document.querySelector("#scenario-prompt-label"),
  scenarioPrompt: document.querySelector("#scenario-prompt"),
  scenarioTarget: document.querySelector("#scenario-target"),
  scenarioAnswer: document.querySelector("#scenario-answer"),
  scenarioCheckBtn: document.querySelector("#scenario-check-btn"),
  scenarioFeedbackCard: document.querySelector("#scenario-feedback-card"),
  scenarioFeedbackTitle: document.querySelector("#scenario-feedback-title"),
  scenarioFeedbackBody: document.querySelector("#scenario-feedback-body"),
  translateTitle: document.querySelector("#translate-title"),
  translateHelp: document.querySelector("#translate-help"),
  providerStatus: document.querySelector("#provider-status"),
  directionLabel: document.querySelector("#direction-label"),
  translateDirection: document.querySelector("#translate-direction"),
  directionOptKnEn: document.querySelector("#direction-opt-kn-en"),
  directionOptEnKn: document.querySelector("#direction-opt-en-kn"),
  translateTextLabel: document.querySelector("#translate-text-label"),
  translateInput: document.querySelector("#translate-input"),
  translateBtn: document.querySelector("#translate-btn"),
  usePhrase: document.querySelector("#use-phrase"),
  translateResult: document.querySelector("#translate-result"),
  translateMeta: document.querySelector("#translate-meta"),
  translateOutput: document.querySelector("#translate-output"),
};

const STORAGE_KEY = "amma_english_progress_v1";
const UI_LANGUAGE_KEY = "amma_ui_language_v1";
const LEARNER_STORAGE_KEY = "amma_learner_profile_v1";
const REVIEW_STORAGE_KEY = "amma_review_state_v1";
const LEARNING_TRACK_KEY = "amma_learning_track_v1";

const SKILL_KEYS = [
  "speaking",
  "listening",
  "vocabulary",
  "grammar",
  "fluency",
  "confidence",
];

const SCENARIO_BANK = {
  shopping: {
    contextEn: "You are in a grocery store buying ingredients for dinner.",
    contextKn: "ನೀವು ರಾತ್ರಿ ಊಟಕ್ಕೆ ಸಾಮಾನು ಕೊಳ್ಳಲು ಅಂಗಡಿಯಲ್ಲಿ ಇದ್ದೀರಿ.",
    turns: [
      {
        promptEn: "Store staff: How can I help you today?",
        promptKn: "ಅಂಗಡಿ ಸಿಬ್ಬಂದಿ: ಇಂದು ನಿಮಗೆ ಏನು ಬೇಕು?",
        targetEn: "Ask for one key item politely.",
        exemplar: "Please give me one kilo of rice.",
        keywords: ["please", "give", "kilo", "rice"],
      },
      {
        promptEn: "Store staff: Anything else?",
        promptKn: "ಅಂಗಡಿ ಸಿಬ್ಬಂದಿ: ಇನ್ನೇನಾದರೂ ಬೇಕೇ?",
        targetEn: "Ask the price and confirm quantity.",
        exemplar: "How much is this, and can I take two packets?",
        keywords: ["how much", "two", "packets", "price"],
      },
      {
        promptEn: "Store staff: Your total is ready.",
        promptKn: "ಅಂಗಡಿ ಸಿಬ್ಬಂದಿ: ನಿಮ್ಮ ಒಟ್ಟು ಮೊತ್ತ ಸಿದ್ಧವಾಗಿದೆ.",
        targetEn: "Ask for bill and payment option.",
        exemplar: "Please give me the bill. Can I pay by UPI?",
        keywords: ["bill", "pay", "upi", "please"],
      },
    ],
  },
  doctor: {
    contextEn: "You are explaining symptoms during a doctor visit.",
    contextKn: "ನೀವು ವೈದ್ಯರ ಬಳಿ ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸುತ್ತಿದ್ದೀರಿ.",
    turns: [
      {
        promptEn: "Doctor: What problem are you facing?",
        promptKn: "ವೈದ್ಯರು: ನಿಮಗೆ ಏನು ತೊಂದರೆ ಇದೆ?",
        targetEn: "Describe one symptom and duration.",
        exemplar: "I have a fever since yesterday night.",
        keywords: ["fever", "since", "yesterday", "pain"],
      },
      {
        promptEn: "Doctor: Any other symptoms?",
        promptKn: "ವೈದ್ಯರು: ಇನ್ನೇನಾದರೂ ಲಕ್ಷಣಗಳಿವೆಯೇ?",
        targetEn: "Add one more symptom clearly.",
        exemplar: "I also have a sore throat when I swallow.",
        keywords: ["throat", "cough", "pain", "also"],
      },
      {
        promptEn: "Doctor: I will prescribe medicine.",
        promptKn: "ವೈದ್ಯರು: ನಾನು ಔಷಧ ಬರೆಯುತ್ತೇನೆ.",
        targetEn: "Ask dosage and timing.",
        exemplar: "How many tablets should I take, and after food?",
        keywords: ["how many", "tablets", "after", "food"],
      },
    ],
  },
  phone: {
    contextEn: "You are on a phone call confirming details.",
    contextKn: "ನೀವು ಫೋನ್‌ನಲ್ಲಿ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತಿದ್ದೀರಿ.",
    turns: [
      {
        promptEn: "Caller: Are you free to talk now?",
        promptKn: "ಕಾಲರ್: ಈಗ ಮಾತಾಡಲು ಸಮಯ ಇದೆಯೆ?",
        targetEn: "Respond politely and set call timing.",
        exemplar: "I can talk for two minutes, then I will call back.",
        keywords: ["talk", "minutes", "call back", "can"],
      },
      {
        promptEn: "Caller: I will share the address.",
        promptKn: "ಕಾಲರ್: ವಿಳಾಸವನ್ನು ಹೇಳುತ್ತೇನೆ.",
        targetEn: "Ask them to repeat slowly.",
        exemplar: "Please repeat slowly. I want to write it correctly.",
        keywords: ["repeat", "slowly", "write", "please"],
      },
      {
        promptEn: "Caller: Done, anything else?",
        promptKn: "ಕಾಲರ್: ಹೇಳಿದೆ, ಇನ್ನೇನಾದರೂ ಬೇಕೇ?",
        targetEn: "Confirm and close the call politely.",
        exemplar: "Thank you. I understood. I will see you at six.",
        keywords: ["thank", "understood", "see", "six"],
      },
    ],
  },
  travel: {
    contextEn: "You are traveling and asking for directions/tickets.",
    contextKn: "ನೀವು ಪ್ರಯಾಣದಲ್ಲಿ ಮಾರ್ಗ/ಟಿಕೆಟ್ ಕೇಳುತ್ತಿದ್ದೀರಿ.",
    turns: [
      {
        promptEn: "Agent: Where do you want to go?",
        promptKn: "ಏಜೆಂಟ್: ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?",
        targetEn: "State destination and ticket need.",
        exemplar: "I need one ticket to Bengaluru, please.",
        keywords: ["ticket", "bengaluru", "one", "please"],
      },
      {
        promptEn: "Agent: The train leaves soon.",
        promptKn: "ಏಜೆಂಟ್: ರೈಲು ಬೇಗನೆ ಹೊರಡುತ್ತದೆ.",
        targetEn: "Ask platform and time clearly.",
        exemplar: "Which platform should I go to, and what time exactly?",
        keywords: ["platform", "time", "go", "which"],
      },
      {
        promptEn: "Agent: Platform 3, departure in 20 minutes.",
        promptKn: "ಏಜೆಂಟ್: ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ 3, 20 ನಿಮಿಷದಲ್ಲಿ ಹೊರಡುತ್ತದೆ.",
        targetEn: "Confirm and thank politely.",
        exemplar: "Thank you. I will go to platform three now.",
        keywords: ["thank", "platform", "three", "now"],
      },
    ],
  },
};

let lessonIdx = 0;
let phraseIdx = 0;
let micActive = false;
let translationInFlight = false;
let lessonGenerationInFlight = false;
let inReviewMode = false;
let learningTrack = loadLearningTrack();
let lessonsByTrack = {
  "kn-en": cloneLessons(DEFAULT_LESSONS_BY_TRACK["kn-en"]),
  "mr-kn": cloneLessons(DEFAULT_LESSONS_BY_TRACK["mr-kn"]),
};
let lessons = lessonsByTrack[learningTrack] || cloneLessons(DEFAULT_LESSONS_BY_TRACK[DEFAULT_LEARNING_TRACK]);

let uiLanguage = loadUiLanguage();
let progress = loadProgress();
let learner = loadLearnerProfile();
let reviewState = loadReviewState();
let scenarioState = {
  active: false,
  topic: "shopping",
  turnIndex: 0,
  passedTurns: 0,
};
let tutorState = {
  history: [],
  inFlight: false,
};
let tutorAudioEnabled = "speechSynthesis" in window;
let tutorMicActive = false;

function cloneLessons(list) {
  return (Array.isArray(list) ? list : []).map((lesson) => ({
    ...lesson,
    phrases: Array.isArray(lesson?.phrases)
      ? lesson.phrases.map((phrase) => ({ ...phrase }))
      : [],
  }));
}

function loadLearningTrack() {
  const saved = String(window.localStorage.getItem(LEARNING_TRACK_KEY) || "").trim();
  if (saved && LEARNING_TRACKS[saved]) return saved;
  return DEFAULT_LEARNING_TRACK;
}

function saveLearningTrack() {
  window.localStorage.setItem(LEARNING_TRACK_KEY, learningTrack);
}

function activeTrack() {
  return LEARNING_TRACKS[learningTrack] || LEARNING_TRACKS[DEFAULT_LEARNING_TRACK];
}

function languageName(code) {
  const pack = LANGUAGE_DISPLAY_NAMES[code];
  if (!pack) return code;
  return pack[uiLanguage] || pack.en || code;
}

function trackLabel(trackId) {
  const track = LEARNING_TRACKS[trackId] || LEARNING_TRACKS[DEFAULT_LEARNING_TRACK];
  return `${languageName(track.source)} -> ${languageName(track.target)}`;
}

function phraseTargetText(phrase) {
  return String(phrase?.target || phrase?.en || "").trim();
}

function phraseSupportText(phrase) {
  return String(phrase?.support || phrase?.kn || "").trim();
}

function applyScriptClass(el, langCode) {
  if (!el) return;
  el.classList.remove("kn", "mr");
  if (langCode === "kn") el.classList.add("kn");
  if (langCode === "mr") el.classList.add("mr");
}

function loadUiLanguage() {
  const saved = window.localStorage.getItem(UI_LANGUAGE_KEY);
  return saved === "en" || saved === "kn" ? saved : "kn";
}

function saveUiLanguage() {
  window.localStorage.setItem(UI_LANGUAGE_KEY, uiLanguage);
}

function t(key) {
  return UI_TEXT[uiLanguage]?.[key] || key;
}

function formatMessage(template, vars = {}) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    template
  );
}

function loadProgress() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      attempts: 0,
      correct: 0,
      streak: 0,
      lastPracticeDate: null,
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      attempts: 0,
      correct: 0,
      streak: 0,
      lastPracticeDate: null,
    };
  }
}

function saveProgress() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function defaultLearnerProfile() {
  return {
    level: null,
    levelScore: 0,
    skills: {
      speaking: 35,
      listening: 35,
      vocabulary: 35,
      grammar: 30,
      fluency: 28,
      confidence: 32,
    },
    recallStats: {
      d3Attempts: 0,
      d3Success: 0,
      d7Attempts: 0,
      d7Success: 0,
    },
  };
}

function loadLearnerProfile() {
  const raw = window.localStorage.getItem(LEARNER_STORAGE_KEY);
  if (!raw) return defaultLearnerProfile();
  try {
    const parsed = JSON.parse(raw);
    const base = defaultLearnerProfile();
    return {
      ...base,
      ...parsed,
      skills: { ...base.skills, ...(parsed.skills || {}) },
      recallStats: { ...base.recallStats, ...(parsed.recallStats || {}) },
    };
  } catch {
    return defaultLearnerProfile();
  }
}

function saveLearnerProfile() {
  window.localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify(learner));
}

function defaultReviewState() {
  return {
    items: {},
  };
}

function loadReviewState() {
  const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);
  if (!raw) return defaultReviewState();
  try {
    const parsed = JSON.parse(raw);
    return {
      ...defaultReviewState(),
      ...parsed,
      items: parsed.items || {},
    };
  } catch {
    return defaultReviewState();
  }
}

function saveReviewState() {
  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviewState));
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStamp() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function updateStreakIfNeeded() {
  const today = todayStamp();
  if (progress.lastPracticeDate === today) {
    return;
  }
  if (progress.lastPracticeDate === yesterdayStamp()) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastPracticeDate = today;
}

function getCurrentPhrase() {
  return lessons[lessonIdx].phrases[phraseIdx];
}

function renderDate() {
  const d = new Date();
  els.date.textContent = d.toLocaleDateString(
    uiLanguage === "kn" ? "kn-IN" : "en-US",
    {
    month: "short",
    day: "numeric",
    }
  );
}

function renderProgress() {
  const mastery = progress.attempts
    ? Math.round((progress.correct / progress.attempts) * 100)
    : 0;
  els.streak.textContent = String(progress.streak);
  els.correct.textContent = String(progress.correct);
  els.mastery.textContent = `${mastery}%`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function skillLabel(skillKey) {
  const keyMap = {
    speaking: "skillSpeaking",
    listening: "skillListening",
    vocabulary: "skillVocabulary",
    grammar: "skillGrammar",
    fluency: "skillFluency",
    confidence: "skillConfidence",
  };
  return t(keyMap[skillKey] || skillKey);
}

function renderSkillGraph() {
  els.skillGrid.innerHTML = "";
  SKILL_KEYS.forEach((skillKey) => {
    const value = Math.round(learner.skills[skillKey] || 0);
    const card = document.createElement("article");
    card.className = "skill-item";
    card.innerHTML = `
      <div class="skill-head">
        <span class="skill-name">${skillLabel(skillKey)}</span>
        <span class="skill-score">${value}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" style="width:${value}%"></div>
      </div>
    `;
    els.skillGrid.appendChild(card);
  });
}

function recallPercent(success, attempts) {
  if (!attempts) return 0;
  return Math.round((success / attempts) * 100);
}

function renderLearnerPanel() {
  const levelText = learner.level || t("learnerNotAssessed");
  els.learnerLevel.textContent = `${t("learnerLevelPrefix")}: ${levelText}`;
  els.d3Value.textContent = `${recallPercent(
    learner.recallStats.d3Success,
    learner.recallStats.d3Attempts
  )}%`;
  els.d7Value.textContent = `${recallPercent(
    learner.recallStats.d7Success,
    learner.recallStats.d7Attempts
  )}%`;
  const dueNow = getDueReviewItems().length;
  els.dueCount.textContent = String(dueNow);
  els.reviewDuePill.textContent = `${dueNow} ${t("reviewDueSuffix")}`;
  renderSkillGraph();
}

function topicLabel(topic) {
  const keyMap = {
    introduction: "topicIntroduction",
    shopping: "topicShopping",
    doctor: "topicDoctor",
    phone: "topicPhone",
    travel: "topicTravel",
    family: "topicFamily",
    routine: "topicRoutine",
  };
  const key = keyMap[topic];
  if (key) return t(key);
  const fallback = TOPIC_LABELS[topic];
  if (!fallback) return topic;
  return uiLanguage === "kn" ? fallback.kn : fallback.en;
}

function renderTopicOptions() {
  const options = Array.from(els.genTopic.options);
  for (const option of options) {
    option.textContent = topicLabel(option.value);
  }
}

function renderScenarioTopicOptions() {
  const options = Array.from(els.scenarioTopic.options);
  for (const option of options) {
    option.textContent = topicLabel(option.value);
  }
}

function ensurePlacementSelectOptions() {
  const selects = [els.placementQ1, els.placementQ2, els.placementQ3, els.placementQ4, els.placementQ5];
  selects.forEach((select) => {
    if (!select) return;
    if (select.options.length) return;
    for (let i = 1; i <= 5; i += 1) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = String(i);
      if (i === 3) option.selected = true;
      select.appendChild(option);
    }
  });
}

function preferSourcePrompt() {
  return learningTrack === "mr-kn";
}

function lessonPhraseLabelText() {
  const track = activeTrack();
  const phraseLang = preferSourcePrompt() ? languageName(track.support) : languageName(track.target);
  return uiLanguage === "kn" ? `${phraseLang} ವಾಕ್ಯ` : `${phraseLang} phrase`;
}

function meaningButtonText(isShown) {
  if (isShown) return t("hideMeaning");
  const track = activeTrack();
  const meaningLang = preferSourcePrompt() ? languageName(track.target) : languageName(track.support);
  return uiLanguage === "kn" ? `${meaningLang} ಅರ್ಥ` : `Show ${meaningLang} meaning`;
}

function typedPlaceholderText() {
  const target = languageName(activeTrack().target);
  return uiLanguage === "kn"
    ? `ನೀವು ಹೇಳಿದ ${target} ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ`
    : `Type what you said in ${target}`;
}

function lessonPracticeHelpText() {
  const target = languageName(activeTrack().target);
  const support = languageName(activeTrack().support);
  if (preferSourcePrompt()) {
    return uiLanguage === "kn"
      ? `ಮೊದಲು ${support} ವಾಕ್ಯ ನೋಡಿ, ನಂತರ ${target} ನಲ್ಲಿ ಉತ್ತರಿಸಿ. ಬೇಕಾದರೆ ${target} ಅರ್ಥ ನೋಡಿ.`
      : `Read the ${support} phrase first, then answer in ${target}. Reveal ${target} meaning if needed.`;
  }
  return uiLanguage === "kn"
    ? `ಮೊದಲು ಕೇಳಿ, ನಂತರ ${target} ವಾಕ್ಯ ಹೇಳಿ. ಬೇಕಾದರೆ ${support} ಅರ್ಥ ನೋಡಿ.`
    : `Listen first, repeat in ${target}, then reveal ${support} meaning if needed.`;
}

function practiceHelpText() {
  const target = languageName(activeTrack().target);
  const support = languageName(activeTrack().support);
  if (preferSourcePrompt()) {
    return uiLanguage === "kn"
      ? `ಮೈಕ್ ಬಳಸಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ. ಮೇಲಿನ ${support} ಸೂಚನೆಯನ್ನು ನೋಡಿ ${target} ನಲ್ಲಿ ಹೇಳಿ.`
      : `Use mic or type in ${target}. Read the ${support} prompt and respond in ${target}.`;
  }
  return uiLanguage === "kn"
    ? `ಮೈಕ್ ಬಳಸಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ. ಪರದೆಯಲ್ಲಿನ ${target} ವಾಕ್ಯಕ್ಕೆ ಹತ್ತಿರವಾಗಿ ಹೇಳಿ.`
    : `Use mic or type the sentence. Try to match the ${target} phrase exactly.`;
}

function tutorHelpText() {
  const target = languageName(activeTrack().target);
  const support = languageName(activeTrack().support);
  return uiLanguage === "kn"
    ? `ಟೈಪ್ ಮಾಡಬಹುದು ಅಥವಾ 'ಟ್ಯೂಟರ್ ಜೊತೆ ಮಾತನಾಡಿ' ಒತ್ತಿ. ಟ್ಯೂಟರ್ ${target}ನಲ್ಲಿ ಉತ್ತರಿಸಿ, ಸರಿಪಡಿಸಿ, ${support} ಹಿಂಟ್ ಕೊಡುತ್ತದೆ.`
    : `Type if needed, or press Talk to tutor. Tutor replies in ${target}, corrects your line, and gives a short ${support} hint.`;
}

function tutorInputPlaceholderText() {
  const target = languageName(activeTrack().target);
  const support = languageName(activeTrack().support);
  return uiLanguage === "kn"
    ? `${support} ಅಥವಾ ${target} ನಲ್ಲಿ ಒಂದು ವಾಕ್ಯ ಬರೆಯಿರಿ`
    : `Type a sentence in ${support} or ${target}`;
}

function languageToggleText() {
  const support = languageName(activeTrack().support);
  return `EN / ${support}`;
}

function tutorWelcomeText() {
  if (learningTrack === "mr-kn") {
    return uiLanguage === "kn"
      ? "ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮ ಕನ್ನಡ ಟ್ಯೂಟರ್.\nಇವತ್ತು ಯಾವ ವಿಷಯದಲ್ಲಿ ಕನ್ನಡ ಅಭ್ಯಾಸ ಮಾಡೋಣ?"
      : "Hi, I am your Kannada tutor.\nWhich real-life topic do you want to practice in Kannada today?";
  }
  return t("tutorWelcome");
}

function directionLabel(source, target) {
  return `${languageName(source)} -> ${languageName(target)}`;
}

function updateLearningTrackOptions() {
  els.learningTrackLabel.textContent = t("learningTrackLabel");
  els.learningTrackOptKnEn.textContent = trackLabel("kn-en");
  els.learningTrackOptMrKn.textContent = trackLabel("mr-kn");
  els.learningTrackSelect.value = learningTrack;
  els.heroTag.textContent = trackLabel(learningTrack);
}

function updateTranslateDirectionOptions() {
  const track = activeTrack();
  const forward = `${track.source}-${track.target}`;
  const reverse = `${track.target}-${track.source}`;

  els.directionOptKnEn.value = forward;
  els.directionOptKnEn.textContent = directionLabel(track.source, track.target);
  els.directionOptEnKn.value = reverse;
  els.directionOptEnKn.textContent = directionLabel(track.target, track.source);

  if (els.translateDirection.value !== forward && els.translateDirection.value !== reverse) {
    els.translateDirection.value = forward;
  }
}

function scenarioSupportedForTrack() {
  return activeTrack().target === "en";
}

function updateScenarioAvailability() {
  const supported = scenarioSupportedForTrack();
  els.scenarioTopic.disabled = !supported;
  els.scenarioAnswer.disabled = !supported;
  els.scenarioStartBtn.disabled = !supported;
  els.scenarioCheckBtn.disabled = !supported;
  if (!supported) {
    scenarioState.active = false;
    els.scenarioNextBtn.disabled = true;
    els.scenarioContext.textContent = t("scenarioUnsupported");
  }
}

function applyUiLanguage() {
  els.langToggle.textContent = languageToggleText();
  updateLearningTrackOptions();
  els.heroSub.textContent = t("heroSub");
  els.progressTitle.textContent = t("progressTitle");
  els.progressHelp.textContent = t("progressHelp");
  els.learnerTitle.textContent = t("learnerTitle");
  els.learnerHelp.textContent = t("learnerHelp");
  els.placementBtn.textContent = t("placementBtn");
  els.placementSaveBtn.textContent = t("placementSaveBtn");
  els.placementIntro.textContent = t("placementPromptIntro");
  els.placementQ1Label.textContent = t("placementQ1");
  els.placementQ2Label.textContent = t("placementQ2");
  els.placementQ3Label.textContent = t("placementQ3");
  els.placementQ4Label.textContent = t("placementQ4");
  els.placementQ5Label.textContent = t("placementQ5");
  els.d3Label.textContent = t("d3Label");
  els.d7Label.textContent = t("d7Label");
  els.dueLabel.textContent = t("dueLabel");
  els.metricStreakLabel.textContent = t("streakLabel");
  els.metricCorrectLabel.textContent = t("correctLabel");
  els.metricMasteryLabel.textContent = t("masteryLabel");
  els.lessonSelectTitle.textContent = t("lessonSelectTitle");
  els.lessonSelectSubtitle.textContent = t("lessonSelectSubtitle");
  els.lessonSelectHelp.textContent = t("lessonSelectHelp");
  els.lessonStep1.textContent = t("lessonStep1");
  els.lessonStep2.textContent = t("lessonStep2");
  els.lessonStep3.textContent = t("lessonStep3");
  els.lessonStep4.textContent = t("lessonStep4");
  els.genTopicLabel.textContent = t("genTopicLabel");
  els.genLevelLabel.textContent = t("genLevelLabel");
  els.genLevelHelp.textContent = t("genLevelHelp");
  els.genLevelOptA1.textContent = t("genLevelOptA1");
  els.genLevelOptA2.textContent = t("genLevelOptA2");
  els.genLevelOptB1.textContent = t("genLevelOptB1");
  els.genCountLabel.textContent = t("genCountLabel");
  els.genCountHelp.textContent = t("genCountHelp");
  els.genCountOpt4.textContent = t("genCountOpt4");
  els.genCountOpt5.textContent = t("genCountOpt5");
  els.genCountOpt6.textContent = t("genCountOpt6");
  els.genCountOpt7.textContent = t("genCountOpt7");
  els.genCountOpt8.textContent = t("genCountOpt8");
  els.generateLessonBtn.textContent = t("genButton");
  els.reviewTitle.textContent = t("reviewTitle");
  els.reviewHelp.textContent = t("reviewHelp");
  els.startReviewBtn.textContent = t("reviewStartBtn");
  els.markEasyBtn.textContent = t("reviewMarkEasy");
  els.nextBtn.textContent = t("nextPhrase");
  els.lessonPracticeHelp.textContent = lessonPracticeHelpText();
  els.phraseLabel.textContent = lessonPhraseLabelText();
  els.playNormal.textContent = t("playAudio");
  els.playSlow.textContent = t("playSlow");
  els.practiceTitle.textContent = t("practiceTitle");
  els.practiceHelp.textContent = practiceHelpText();
  els.typedLabel.textContent = t("typedLabel");
  els.typedAnswer.placeholder = typedPlaceholderText();
  els.checkTyped.textContent = t("checkAnswer");
  els.tutorTitle.textContent = t("tutorTitle");
  els.tutorHelp.textContent = tutorHelpText();
  els.tutorInputLabel.textContent = t("tutorInputLabel");
  els.tutorInput.placeholder = tutorInputPlaceholderText();
  els.tutorSendBtn.textContent = t("tutorSendBtn");
  updateTutorMicButton();
  els.tutorUsePhraseBtn.textContent = t("tutorUsePhraseBtn");
  els.tutorClearBtn.textContent = t("tutorClearBtn");
  updateTutorAudioButton();
  els.translateTitle.textContent = t("translateTitle");
  els.translateHelp.textContent = t("translateHelp");
  els.directionLabel.textContent = t("directionLabel");
  updateTranslateDirectionOptions();
  els.translateTextLabel.textContent = t("translateTextLabel");
  els.translateInput.placeholder = t("translatePlaceholder");
  els.translateBtn.textContent = t("translateNow");
  els.usePhrase.textContent = t("useLessonPhrase");
  els.scenarioTitle.textContent = t("scenarioTitle");
  els.scenarioHelp.textContent = t("scenarioHelp");
  els.scenarioPromptLabel.textContent = t("scenarioPromptLabel");
  els.scenarioStartBtn.textContent = t("scenarioStartBtn");
  els.scenarioNextBtn.textContent = t("scenarioNextBtn");
  els.scenarioCheckBtn.textContent = t("scenarioCheckBtn");
  els.scenarioAnswer.placeholder = t("scenarioAnswerPlaceholder");
  if (!els.scenarioContext.textContent) {
    els.scenarioContext.textContent = t("scenarioContextIdle");
  }
  if (!els.generateStatus.textContent) {
    els.generateStatus.textContent = t("genReady");
  }
  if (!els.reviewStatus.textContent) {
    els.reviewStatus.textContent = t("reviewReady");
  }
  if (!els.providerStatus.textContent) {
    els.providerStatus.textContent = t("providerChecking");
  }
  if (!els.tutorStatus.textContent) {
    setTutorStatus(t("tutorStatusReady"));
  }
  if (tutorMicActive) {
    setTutorStatus(t("tutorStatusListening"));
  }
  renderTopicOptions();
  renderScenarioTopicOptions();
  ensurePlacementSelectOptions();
  updateScenarioAvailability();
  if (!recognition) {
    els.micStatus.textContent = t("micUnsupported");
  } else if (micActive) {
    els.micStatus.textContent = t("micListening");
  } else {
    els.micStatus.textContent = t("micIdle");
  }
  els.micBtn.textContent = micActive ? t("micStop") : t("micStart");
  renderLearnerPanel();
}
function renderLessons() {
  els.lessonList.innerHTML = "";
  lessons.forEach((lesson, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lesson-chip${uiLanguage === "kn" ? " kn" : ""}${
      idx === lessonIdx ? " active" : ""
    }`;
    btn.textContent = uiLanguage === "kn" ? lesson.titleKn : lesson.titleEn;
    btn.addEventListener("click", () => {
      lessonIdx = idx;
      phraseIdx = 0;
      renderLessons();
      renderPhrase();
      hideFeedback();
    });
    els.lessonList.appendChild(btn);
  });
}

function renderPhrase() {
  const lesson = lessons[lessonIdx];
  const phrase = getCurrentPhrase();
  const target = phraseTargetText(phrase);
  const support = phraseSupportText(phrase);
  const track = activeTrack();
  const sourceFirst = preferSourcePrompt();
  const primaryText = sourceFirst ? support : target;
  const secondaryText = sourceFirst ? target : support;
  const primaryLanguage = sourceFirst ? track.support : track.target;
  const secondaryLanguage = sourceFirst ? track.target : track.support;
  els.lessonTitle.textContent =
    uiLanguage === "kn" ? `${lesson.titleKn} - ${lesson.titleEn}` : lesson.titleEn;
  els.phraseEn.textContent = primaryText;
  els.phraseKn.textContent = secondaryText;
  applyScriptClass(els.phraseEn, primaryLanguage);
  applyScriptClass(els.phraseKn, secondaryLanguage);
  els.phraseKn.classList.add("hidden");
  els.showMeaning.textContent = meaningButtonText(false);
  els.typedAnswer.value = "";
  ensureReviewItem(phrase);
}

function phraseKey(phrase) {
  return `${learningTrack}:${normalize(phraseTargetText(phrase), activeTrack().target)}`;
}

function ensureReviewItem(phrase) {
  const key = phraseKey(phrase);
  if (reviewState.items[key]) return;
  const target = phraseTargetText(phrase);
  const support = phraseSupportText(phrase);
  reviewState.items[key] = {
    key,
    track: learningTrack,
    target,
    support,
    en: target,
    kn: support,
    ease: 2.3,
    intervalDays: 0,
    reps: 0,
    introducedAt: Date.now(),
    dueAt: Date.now(),
    lastReviewedAt: null,
  };
  saveReviewState();
}

function qualityFromScore(score) {
  if (score >= 0.9) return 5;
  if (score >= 0.78) return 4;
  if (score >= 0.62) return 3;
  if (score >= 0.5) return 2;
  return 1;
}

function updateRecallStats(item, quality) {
  const daysSinceIntro = Math.floor((Date.now() - item.introducedAt) / (1000 * 60 * 60 * 24));
  const success = quality >= 3 ? 1 : 0;
  if (daysSinceIntro >= 3) {
    learner.recallStats.d3Attempts += 1;
    learner.recallStats.d3Success += success;
  }
  if (daysSinceIntro >= 7) {
    learner.recallStats.d7Attempts += 1;
    learner.recallStats.d7Success += success;
  }
}

function scheduleReview(phrase, quality) {
  const key = phraseKey(phrase);
  const item = reviewState.items[key];
  if (!item) return;

  if (quality < 3) {
    item.reps = 0;
    item.intervalDays = 1;
  } else {
    item.reps += 1;
    if (item.reps === 1) {
      item.intervalDays = 1;
    } else if (item.reps === 2) {
      item.intervalDays = 3;
    } else {
      item.intervalDays = Math.max(1, Math.round(item.intervalDays * item.ease));
    }
  }

  item.ease = clamp(
    item.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    1.3,
    2.7
  );
  item.lastReviewedAt = Date.now();
  item.dueAt = Date.now() + item.intervalDays * 24 * 60 * 60 * 1000;

  updateRecallStats(item, quality);
  saveReviewState();
  saveLearnerProfile();
}

function getDueReviewItems() {
  const now = Date.now();
  return Object.values(reviewState.items)
    .filter((item) => item.dueAt <= now && (item.track || DEFAULT_LEARNING_TRACK) === learningTrack)
    .sort((a, b) => a.dueAt - b.dueAt);
}

function focusPhraseForReview(item) {
  const targetText = String(item?.target || item?.en || "").trim();
  for (let li = 0; li < lessons.length; li += 1) {
    for (let pi = 0; pi < lessons[li].phrases.length; pi += 1) {
      const phrase = lessons[li].phrases[pi];
      if (normalize(phraseTargetText(phrase), activeTrack().target) === normalize(targetText, activeTrack().target)) {
        lessonIdx = li;
        phraseIdx = pi;
        renderLessons();
        renderPhrase();
        return;
      }
    }
  }

  const reviewLesson = {
    id: `review-${Date.now().toString(36)}`,
    titleEn: "Review",
    titleKn: "ರಿವ್ಯೂ",
    phrases: [
      {
        en: targetText,
        kn: String(item?.support || item?.kn || "").trim(),
      },
    ],
  };
  lessons = [reviewLesson, ...lessons].slice(0, LESSON_LIMIT);
  lessonsByTrack[learningTrack] = lessons;
  lessonIdx = 0;
  phraseIdx = 0;
  renderLessons();
  renderPhrase();
}

function adjustSkill(skillKey, delta) {
  learner.skills[skillKey] = clamp((learner.skills[skillKey] || 0) + delta, 0, 100);
}

function applyLearningUpdate(score, quality) {
  adjustSkill("speaking", (score - 0.6) * 8);
  adjustSkill("fluency", (score - 0.55) * 6);
  adjustSkill("confidence", quality >= 3 ? 2 : -1.2);
  adjustSkill("vocabulary", quality >= 4 ? 1.4 : 0.3);
  adjustSkill("grammar", quality >= 3 ? 1.1 : -0.7);
  saveLearnerProfile();
}

function analyzeAnswer(input, target, score, languageCode) {
  const inputTokens = normalize(input, languageCode).split(" ").filter(Boolean);
  const targetTokens = normalize(target, languageCode).split(" ").filter(Boolean);
  const inputSet = new Set(inputTokens);
  const missing = targetTokens.filter((token) => !inputSet.has(token)).slice(0, 4);
  const extra = inputTokens.filter((token) => !targetTokens.includes(token)).slice(0, 3);

  if (score >= 0.86) {
    return {
      title: t("feedbackExcellentTitle"),
      body: formatMessage(t("feedbackExcellentBody"), { answer: input }),
    };
  }

  if (missing.length <= 2 && extra.length <= 1 && score >= 0.62) {
    return {
      title: t("feedbackAlmostTitle"),
      body: `${formatMessage(t("feedbackAlmostBody"), { answer: input })} Missing words: ${missing.join(", ") || "none"}.`,
    };
  }

  return {
    title: t("feedbackRetryTitle"),
    body: `${formatMessage(t("feedbackRetryBody"), { answer: input, target })} Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`,
  };
}

function speakPhrase(rate = 1) {
  if (!("speechSynthesis" in window)) {
    showFeedback(t("audioUnavailableTitle"), t("audioUnavailableBody"));
    return;
  }
  const phrase = getCurrentPhrase();
  const utterance = new SpeechSynthesisUtterance(phraseTargetText(phrase));
  utterance.lang = activeTrack().practiceLocale;
  utterance.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function normalize(text, languageCode = activeTrack().target) {
  const value = String(text || "").toLocaleLowerCase();
  if (languageCode === "en") {
    return value
      .replace(/[^a-z0-9\s']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return value
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[rows - 1][cols - 1];
}

function similarityScore(input, target, languageCode) {
  const a = normalize(input, languageCode);
  const b = normalize(target, languageCode);
  if (!a || !b) return 0;
  const maxLen = Math.max(a.length, b.length);
  if (!maxLen) return 0;
  const distance = levenshtein(a, b);
  return 1 - distance / maxLen;
}

function showFeedback(title, body) {
  els.feedbackTitle.textContent = title;
  els.feedbackBody.textContent = body;
  els.feedbackCard.classList.remove("hidden");
}

function hideFeedback() {
  els.feedbackCard.classList.add("hidden");
}

function evaluateAnswer(answerText) {
  const phrase = getCurrentPhrase();
  const targetLanguage = activeTrack().target;
  const target = phraseTargetText(phrase);
  const score = similarityScore(answerText, target, targetLanguage);
  const quality = qualityFromScore(score);
  const analysis = analyzeAnswer(answerText, target, score, targetLanguage);

  progress.attempts += 1;
  if (quality >= 4) {
    progress.correct += 1;
  }

  if (quality >= 3) updateStreakIfNeeded();

  showFeedback(analysis.title, analysis.body);
  scheduleReview(phrase, quality);
  applyLearningUpdate(score, quality);

  saveProgress();
  renderProgress();
  renderLearnerPanel();

  if (inReviewMode) {
    const dueNow = getDueReviewItems().length;
    els.reviewStatus.textContent =
      dueNow > 0 ? `${t("reviewStarted")} ${dueNow} ${t("reviewDueSuffix")}` : t("reviewNoDue");
  }
}

function nextPhrase() {
  phraseIdx = (phraseIdx + 1) % lessons[lessonIdx].phrases.length;
  renderPhrase();
  hideFeedback();
}

function setGenerateStatus(text, isError = false) {
  els.generateStatus.textContent = text;
  els.generateStatus.style.color = isError ? "#a93b21" : "var(--ink-soft)";
}

function validateLessonPayload(rawLesson) {
  if (!rawLesson || typeof rawLesson !== "object") {
    throw new Error("Invalid lesson payload");
  }

  const rawPhrases = Array.isArray(rawLesson.phrases) ? rawLesson.phrases : [];
  const phrases = rawPhrases
    .map((item) => {
      const target = String(item?.target || item?.en || "").trim();
      const support = String(item?.support || item?.kn || "").trim();
      return {
        en: target,
        kn: support,
        target,
        support,
      };
    })
    .filter((item) => item.target && item.support)
    .slice(0, 8);

  if (phrases.length < 3) {
    throw new Error("Generated lesson has too few valid phrases");
  }

  return {
    id: String(rawLesson.id || `gen-${Date.now().toString(36)}`),
    topic: String(rawLesson.topic || "generated"),
    level: String(rawLesson.level || "A1"),
    learningTrack: String(rawLesson.learningTrack || learningTrack),
    titleEn: String(rawLesson.titleEn || "Generated Lesson").trim(),
    titleKn: String(rawLesson.titleKn || "ರಚಿಸಿದ ಪಾಠ").trim(),
    phrases,
  };
}

function inferLessonTopic(lesson) {
  if (lesson?.topic && TOPIC_LABELS[lesson.topic]) {
    return lesson.topic;
  }

  const byId = {
    intro: "introduction",
    introduction: "introduction",
    shopping: "shopping",
    doctor: "doctor",
    phone: "phone",
    travel: "travel",
    family: "family",
    routine: "routine",
  };

  if (byId[String(lesson?.id || "").toLowerCase()]) {
    return byId[String(lesson.id).toLowerCase()];
  }

  const enTitle = String(lesson?.titleEn || "").toLowerCase();
  if (enTitle.includes("intro")) return "introduction";
  if (enTitle.includes("shop")) return "shopping";
  if (enTitle.includes("doctor")) return "doctor";
  if (enTitle.includes("phone")) return "phone";
  if (enTitle.includes("travel")) return "travel";
  if (enTitle.includes("family")) return "family";
  if (enTitle.includes("routine")) return "routine";
  return "";
}

function addGeneratedLesson(lesson) {
  const normalizedLesson = {
    ...lesson,
    learningTrack,
    phrases: lesson.phrases.map((phrase) => ({
      ...phrase,
      target: phraseTargetText(phrase),
      support: phraseSupportText(phrase),
    })),
  };
  const topic = inferLessonTopic(normalizedLesson);

  if (topic) {
    const firstMatchIndex = lessons.findIndex((item) => inferLessonTopic(item) === topic);
    const filtered = lessons.filter((item) => inferLessonTopic(item) !== topic);

    const merged = {
      ...normalizedLesson,
      topic,
      id: firstMatchIndex >= 0 ? lessons[firstMatchIndex].id : normalizedLesson.id,
    };

    if (firstMatchIndex >= 0) {
      const insertAt = Math.min(firstMatchIndex, filtered.length);
      filtered.splice(insertAt, 0, merged);
      lessons = filtered.slice(0, LESSON_LIMIT);
      lessonIdx = Math.min(insertAt, lessons.length - 1);
    } else {
      lessons = [merged, ...filtered].slice(0, LESSON_LIMIT);
      lessonIdx = 0;
    }
  } else {
    lessons = [normalizedLesson, ...lessons.filter((item) => item.id !== normalizedLesson.id)].slice(0, LESSON_LIMIT);
    lessonIdx = 0;
  }

  phraseIdx = 0;
  lessonsByTrack[learningTrack] = lessons;
  normalizedLesson.phrases.forEach((phrase) => ensureReviewItem(phrase));
  saveReviewState();
}

async function generateLessonNow() {
  if (lessonGenerationInFlight) return;

  const topic = els.genTopic.value;
  const level = els.genLevel.value;
  const count = Number(els.genCount.value || "5");
  lessonGenerationInFlight = true;
  els.generateLessonBtn.disabled = true;
  setGenerateStatus(t("genWorking"));

  try {
    const response = await fetch("/api/generate-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        level,
        count,
        uiLanguage,
        learningTrack,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    const lesson = validateLessonPayload(data.lesson);
    addGeneratedLesson(lesson);
    inReviewMode = false;
    renderLessons();
    renderPhrase();
    hideFeedback();
    renderLearnerPanel();

    const cacheLabel = data.cached ? ` (${t("genCachedTag")})` : "";
    const title = uiLanguage === "kn" ? lesson.titleKn : lesson.titleEn;
    const providerLabel = data.provider ? ` [${data.provider}]` : "";
    setGenerateStatus(
      `${t("genLoadedPrefix")}: ${title}${cacheLabel}${providerLabel}`
    );
  } catch (err) {
    setGenerateStatus(
      `${t("genFailedPrefix")}: ${err instanceof Error ? err.message : String(err)}`,
      true
    );
  } finally {
    lessonGenerationInFlight = false;
    els.generateLessonBtn.disabled = false;
  }
}

function levelFromPlacementScore(score) {
  if (score < 2.3) return "A1";
  if (score < 3.8) return "A2";
  return "B1";
}

function runPlacementAssessment() {
  const isHidden = els.placementForm.classList.contains("hidden");
  els.placementForm.classList.toggle("hidden", !isHidden);
}

function savePlacementAssessment() {
  const answers = [
    Number(els.placementQ1.value || "3"),
    Number(els.placementQ2.value || "3"),
    Number(els.placementQ3.value || "3"),
    Number(els.placementQ4.value || "3"),
    Number(els.placementQ5.value || "3"),
  ].map((n) => clamp(n, 1, 5));

  const avg = answers.reduce((sum, n) => sum + n, 0) / answers.length;
  const level = levelFromPlacementScore(avg);
  learner.level = level;
  learner.levelScore = Number(avg.toFixed(2));
  els.genLevel.value = level;

  const base = Math.round((avg / 5) * 100);
  learner.skills.speaking = clamp(base - 12, 10, 95);
  learner.skills.listening = clamp(base - 8, 10, 95);
  learner.skills.vocabulary = clamp(base - 10, 10, 95);
  learner.skills.grammar = clamp(base - 15, 8, 90);
  learner.skills.fluency = clamp(base - 18, 8, 90);
  learner.skills.confidence = clamp(base - 10, 10, 95);

  saveLearnerProfile();
  renderLearnerPanel();
  els.reviewStatus.textContent = `${t("placementSavedPrefix")}: ${level}`;
  els.placementForm.classList.add("hidden");
}

function startDueReview() {
  const dueItems = getDueReviewItems();
  if (!dueItems.length) {
    els.reviewStatus.textContent = t("reviewNoDue");
    inReviewMode = false;
    return;
  }
  inReviewMode = true;
  focusPhraseForReview(dueItems[0]);
  els.reviewStatus.textContent = t("reviewStarted");
  renderLearnerPanel();
}

function markCurrentPhraseEasy() {
  const phrase = getCurrentPhrase();
  scheduleReview(phrase, 5);
  adjustSkill("confidence", 1.6);
  adjustSkill("fluency", 1.2);
  saveLearnerProfile();
  renderLearnerPanel();
  els.reviewStatus.textContent = t("reviewMarkedEasy");
}

function scenarioPromptText(turn) {
  return uiLanguage === "kn" ? turn.promptKn : turn.promptEn;
}

function scenarioContextText(topic) {
  const data = SCENARIO_BANK[topic] || SCENARIO_BANK.shopping;
  return uiLanguage === "kn" ? data.contextKn : data.contextEn;
}

function setScenarioFeedback(title, body, isError = false) {
  els.scenarioFeedbackTitle.textContent = title;
  els.scenarioFeedbackBody.textContent = body;
  els.scenarioFeedbackBody.style.color = isError ? "#a93b21" : "var(--ink)";
  els.scenarioFeedbackCard.classList.remove("hidden");
}

function renderScenarioTurn() {
  const scenario = SCENARIO_BANK[scenarioState.topic] || SCENARIO_BANK.shopping;
  const turn = scenario.turns[scenarioState.turnIndex];
  if (!turn) return;
  els.scenarioContext.textContent = scenarioContextText(scenarioState.topic);
  els.scenarioPrompt.textContent = scenarioPromptText(turn);
  els.scenarioTarget.textContent = `${t("scenarioTargetPrefix")}: ${turn.targetEn}`;
  els.scenarioAnswer.value = "";
  els.scenarioNextBtn.disabled = true;
}

function startScenario() {
  if (!scenarioSupportedForTrack()) {
    scenarioState.active = false;
    els.scenarioContext.textContent = t("scenarioUnsupported");
    return;
  }
  scenarioState = {
    active: true,
    topic: els.scenarioTopic.value,
    turnIndex: 0,
    passedTurns: 0,
  };
  renderScenarioTurn();
  els.scenarioFeedbackCard.classList.add("hidden");
}

function checkScenarioTurn() {
  if (!scenarioState.active) return;
  if (!scenarioSupportedForTrack()) return;
  const scenario = SCENARIO_BANK[scenarioState.topic] || SCENARIO_BANK.shopping;
  const turn = scenario.turns[scenarioState.turnIndex];
  if (!turn) return;

  const answer = els.scenarioAnswer.value.trim();
  if (!answer) {
    setScenarioFeedback(t("scenarioRetry"), t("noInputBody"), true);
    return;
  }

  const score = similarityScore(answer, turn.exemplar, "en");
  const normalized = normalize(answer, "en");
  const keywordHits = turn.keywords.filter((kw) => normalized.includes(normalize(kw, "en"))).length;
  const pass = score >= 0.55 || keywordHits >= 2;

  if (pass) {
    scenarioState.passedTurns += 1;
    adjustSkill("speaking", 1.8);
    adjustSkill("confidence", 1.3);
    saveLearnerProfile();
    renderLearnerPanel();
    setScenarioFeedback(t("scenarioGood"), `Score: ${Math.round(score * 100)}%`);
    els.scenarioNextBtn.disabled = false;
  } else {
    adjustSkill("confidence", -0.6);
    saveLearnerProfile();
    renderLearnerPanel();
    setScenarioFeedback(t("scenarioRetry"), `Target example: ${turn.exemplar}`, true);
    els.scenarioNextBtn.disabled = true;
  }
}

function nextScenarioTurn() {
  if (!scenarioState.active) return;
  if (!scenarioSupportedForTrack()) return;
  const scenario = SCENARIO_BANK[scenarioState.topic] || SCENARIO_BANK.shopping;
  scenarioState.turnIndex += 1;
  if (scenarioState.turnIndex >= scenario.turns.length) {
    scenarioState.active = false;
    els.scenarioPrompt.textContent = "";
    els.scenarioTarget.textContent = "";
    els.scenarioContext.textContent = t("scenarioComplete");
    setScenarioFeedback(
      t("scenarioComplete"),
      `${scenarioState.passedTurns}/${scenario.turns.length}`
    );
    els.scenarioNextBtn.disabled = true;
    return;
  }
  renderScenarioTurn();
}

function activeTranslateDirection() {
  const value = String(els.translateDirection.value || "").trim().toLowerCase();
  const [source, target] = value.split("-");
  const allowed = new Set(["en", "kn", "mr"]);
  if (allowed.has(source) && allowed.has(target) && source !== target) {
    return { source, target };
  }
  const track = activeTrack();
  return { source: track.source, target: track.target };
}

function setTranslateResult(meta, output, isError = false, langCode = null) {
  els.translateMeta.textContent = meta;
  els.translateOutput.textContent = output;
  els.translateOutput.style.color = isError ? "#a93b21" : "var(--ink)";
  applyScriptClass(els.translateOutput, langCode);
  els.translateResult.classList.remove("hidden");
}

function setProviderStatus(text) {
  els.providerStatus.textContent = text;
}

function setTutorStatus(text, isError = false) {
  els.tutorStatus.textContent = text;
  els.tutorStatus.style.color = isError ? "#a93b21" : "var(--ink-soft)";
}

function tutorRoleLabel(role) {
  return role === "user" ? t("tutorUserLabel") : t("tutorAssistantLabel");
}

function tutorMicButtonText() {
  if (!SpeechRecognitionAPI) return t("tutorMicUnsupported");
  return tutorMicActive ? t("tutorMicStopBtn") : t("tutorMicStartBtn");
}

function updateTutorMicButton() {
  els.tutorMicBtn.textContent = tutorMicButtonText();
  els.tutorMicBtn.disabled = !SpeechRecognitionAPI || tutorState.inFlight;
}

function tutorAudioButtonText() {
  if (!("speechSynthesis" in window)) return t("tutorAudioUnavailable");
  return tutorAudioEnabled ? t("tutorAudioOn") : t("tutorAudioOff");
}

function updateTutorAudioButton() {
  els.tutorAudioToggleBtn.textContent = tutorAudioButtonText();
  if (!("speechSynthesis" in window)) {
    els.tutorAudioToggleBtn.disabled = true;
  }
}

function speakTutorReply(text) {
  if (!tutorAudioEnabled || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = activeTrack().practiceLocale;
  utterance.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function appendTutorMessage(role, content, options = {}) {
  const { speak = true } = options;
  const card = document.createElement("article");
  card.className = `tutor-msg ${role === "user" ? "user" : "assistant"}`;
  const label = document.createElement("p");
  label.className = "tutor-msg-label";
  label.textContent = tutorRoleLabel(role);
  const body = document.createElement("p");
  body.className = "tutor-msg-body";
  body.textContent = content;
  card.appendChild(label);
  card.appendChild(body);
  els.tutorLog.appendChild(card);
  els.tutorLog.scrollTop = els.tutorLog.scrollHeight;
  if (role === "assistant" && speak) {
    speakTutorReply(content);
  }
}

function resetTutorChat() {
  const welcome = tutorWelcomeText();
  tutorState.history = [];
  els.tutorLog.innerHTML = "";
  appendTutorMessage("assistant", welcome, { speak: false });
  tutorState.history.push({
    role: "assistant",
    content: welcome,
  });
  setTutorStatus(t("tutorStatusReady"));
  updateTutorMicButton();
  updateTutorAudioButton();
}

function useLessonPhraseForTutor() {
  const phrase = getCurrentPhrase();
  els.tutorInput.value = phraseTargetText(phrase);
  els.tutorInput.focus();
}

function localTutorFallback(userMessage) {
  const safe = userMessage.trim() || "I want to improve.";
  if (learningTrack === "mr-kn") {
    return [
      `ಚೆನ್ನಾಗಿದೆ. ಹೀಗೆ ಹೇಳಿ: "${safe}"`,
      "Better Kannada: ಚಿಕ್ಕ ಮತ್ತು ಸ್ಪಷ್ಟ ವಾಕ್ಯ ಬಳಸಿ.",
      "Marathi hint: छोटे आणि स्पष्ट वाक्य बोला.",
      "Follow-up: ಇದೇ ವಿಷಯದ ಇನ್ನೊಂದು ಕನ್ನಡ ವಾಕ್ಯ ಹೇಳುತ್ತೀರಾ?",
    ].join("\n");
  }
  if (uiLanguage === "kn") {
    return [
      `Good attempt. Try: "${safe}"`,
      "Kannada hint: ಚಿಕ್ಕ ಮತ್ತು ಸ್ಪಷ್ಟ ವಾಕ್ಯಗಳಲ್ಲಿ ಮಾತನಾಡಿ.",
      "Follow-up: ಈಗ ಇದೇ ವಿಷಯದ ಇನ್ನೊಂದು ವಾಕ್ಯ ಹೇಳುತ್ತೀರಾ?",
    ].join("\n");
  }
  return [
    `Good attempt. Try: "${safe}"`,
    "Hint: Keep your sentence short and clear.",
    "Follow-up: Can you say one more sentence about the same topic?",
  ].join("\n");
}

async function sendTutorMessage() {
  if (tutorState.inFlight) return;
  const message = els.tutorInput.value.trim();
  if (!message) return;

  appendTutorMessage("user", message);
  tutorState.history.push({ role: "user", content: message });
  els.tutorInput.value = "";
  tutorState.inFlight = true;
  els.tutorSendBtn.disabled = true;
  updateTutorMicButton();
  setTutorStatus(t("tutorStatusThinking"));

  try {
    const activeLesson = lessons[lessonIdx];
    const activePhrase = getCurrentPhrase();
    const response = await fetch("/api/tutor-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        uiLanguage,
        level: learner.level || "A1",
        topic: inferLessonTopic(activeLesson) || "introduction",
        currentPhrase: phraseTargetText(activePhrase),
        learningTrack,
        history: tutorState.history.slice(-8),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    const reply = String(data.reply || "").trim() || localTutorFallback(message);
    appendTutorMessage("assistant", reply);
    tutorState.history.push({ role: "assistant", content: reply });
    const fallbackTag = data.fallbackUsed ? ` (${t("fallbackUsed")})` : "";
    setTutorStatus(
      `${t("tutorStatusProviderPrefix")}: ${data.provider || "local"}${fallbackTag}`
    );
  } catch {
    const reply = localTutorFallback(message);
    appendTutorMessage("assistant", reply);
    tutorState.history.push({ role: "assistant", content: reply });
    setTutorStatus(t("tutorStatusError"), true);
  } finally {
    tutorState.inFlight = false;
    els.tutorSendBtn.disabled = false;
    updateTutorMicButton();
  }
}

function useCurrentLessonPhrase() {
  const phrase = getCurrentPhrase();
  const { source } = activeTranslateDirection();
  const track = activeTrack();
  const target = phraseTargetText(phrase);
  const support = phraseSupportText(phrase);
  els.translateInput.value = source === track.target ? target : support;
  els.translateInput.focus();
}

async function loadProviderStatus() {
  setProviderStatus(t("providerChecking"));
  try {
    const response = await fetch("/api/providers");
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }
    const data = await response.json();
    const available = Object.entries(data.available)
      .filter(([, ok]) => ok)
      .map(([name]) => name);
    const summary = available.length ? available.join(", ") : t("providerNone");
    setProviderStatus(
      `${t("providerAvailable")}: ${summary} | ${t("providerOrder")}: ${data.order.join(" -> ")}`
    );
  } catch {
    setProviderStatus(t("providerOffline"));
  }
}

async function translateNow() {
  if (translationInFlight) return;

  const text = els.translateInput.value.trim();
  if (!text) {
    setTranslateResult(t("translateMissingTitle"), t("translateMissingBody"), true, null);
    return;
  }

  const { source, target } = activeTranslateDirection();
  translationInFlight = true;
  els.translateBtn.disabled = true;
  setTranslateResult(t("translatingTitle"), t("translatingBody"), false, target);

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source,
        target,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    const fallbackTag = data.fallbackUsed ? ` (${t("fallbackUsed")})` : "";
    setTranslateResult(
      `${t("providerPrefix")}: ${data.provider}${fallbackTag}`,
      data.translatedText,
      false,
      target
    );
  } catch (err) {
    setTranslateResult(
      t("translateFailedTitle"),
      err instanceof Error ? err.message : String(err),
      true,
      null
    );
  } finally {
    translationInFlight = false;
    els.translateBtn.disabled = false;
  }
}

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let tutorRecognition = null;

function tutorRecognitionLang() {
  return activeTrack().supportLocale;
}

function practiceRecognitionLang() {
  return activeTrack().practiceLocale;
}

if (SpeechRecognitionAPI) {
  recognition = new SpeechRecognitionAPI();
  recognition.lang = practiceRecognitionLang();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    micActive = true;
    els.micStatus.textContent = t("micListening");
    els.micBtn.textContent = t("micStop");
  };

  recognition.onend = () => {
    micActive = false;
    els.micStatus.textContent = t("micIdle");
    els.micBtn.textContent = t("micStart");
  };

  recognition.onerror = () => {
    showFeedback(t("micErrorTitle"), t("micErrorBody"));
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    evaluateAnswer(transcript);
  };

  tutorRecognition = new SpeechRecognitionAPI();
  tutorRecognition.lang = tutorRecognitionLang();
  tutorRecognition.interimResults = false;
  tutorRecognition.maxAlternatives = 1;

  tutorRecognition.onstart = () => {
    tutorMicActive = true;
    updateTutorMicButton();
    setTutorStatus(t("tutorStatusListening"));
  };

  tutorRecognition.onend = () => {
    tutorMicActive = false;
    updateTutorMicButton();
    if (!tutorState.inFlight) {
      setTutorStatus(t("tutorStatusReady"));
    }
  };

  tutorRecognition.onerror = () => {
    tutorMicActive = false;
    updateTutorMicButton();
    setTutorStatus(t("tutorStatusError"), true);
  };

  tutorRecognition.onresult = (event) => {
    const transcript = String(event?.results?.[0]?.[0]?.transcript || "").trim();
    if (!transcript) return;
    els.tutorInput.value = transcript;
    sendTutorMessage();
  };
} else {
  els.micBtn.disabled = true;
  els.micStatus.textContent = t("micUnsupported");
  els.tutorMicBtn.disabled = true;
  els.tutorMicBtn.textContent = t("tutorMicUnsupported");
}

function syncRecognitionLanguage() {
  if (recognition && !micActive) {
    recognition.lang = practiceRecognitionLang();
  }
  if (tutorRecognition && !tutorMicActive) {
    tutorRecognition.lang = tutorRecognitionLang();
  }
}

function switchLearningTrack(nextTrack) {
  if (!LEARNING_TRACKS[nextTrack] || nextTrack === learningTrack) return;

  if (micActive && recognition) recognition.stop();
  if (tutorMicActive && tutorRecognition) tutorRecognition.stop();

  learningTrack = nextTrack;
  saveLearningTrack();

  if (!lessonsByTrack[learningTrack]) {
    lessonsByTrack[learningTrack] = cloneLessons(
      DEFAULT_LESSONS_BY_TRACK[learningTrack] || DEFAULT_LESSONS_BY_TRACK[DEFAULT_LEARNING_TRACK]
    );
  }
  lessons = lessonsByTrack[learningTrack];
  lessonIdx = 0;
  phraseIdx = 0;
  inReviewMode = false;
  syncRecognitionLanguage();

  applyUiLanguage();
  renderLessons();
  renderPhrase();
  hideFeedback();
  els.generateStatus.textContent = t("genReady");
  els.reviewStatus.textContent = t("reviewReady");
  els.scenarioFeedbackCard.classList.add("hidden");
  if (scenarioSupportedForTrack()) {
    scenarioState.active = false;
    els.scenarioContext.textContent = scenarioContextText(els.scenarioTopic.value);
  } else {
    els.scenarioContext.textContent = t("scenarioUnsupported");
  }
  resetTutorChat();
  loadProviderStatus();
}

els.nextBtn.addEventListener("click", nextPhrase);

els.showMeaning.addEventListener("click", () => {
  const isHidden = els.phraseKn.classList.contains("hidden");
  els.phraseKn.classList.toggle("hidden", !isHidden);
  els.showMeaning.textContent = meaningButtonText(isHidden);
});

els.playNormal.addEventListener("click", () => speakPhrase(1));
els.playSlow.addEventListener("click", () => speakPhrase(0.75));

els.checkTyped.addEventListener("click", () => {
  const answer = els.typedAnswer.value.trim();
  if (!answer) {
    showFeedback(t("noInputTitle"), t("noInputBody"));
    return;
  }
  evaluateAnswer(answer);
});

els.typedAnswer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const answer = els.typedAnswer.value.trim();
    if (answer) evaluateAnswer(answer);
  }
});

els.tutorSendBtn.addEventListener("click", sendTutorMessage);
els.tutorMicBtn.addEventListener("click", () => {
  if (!tutorRecognition || tutorState.inFlight) return;
  if (tutorMicActive) {
    tutorRecognition.stop();
    return;
  }
  if (micActive && recognition) {
    recognition.stop();
  }
  tutorRecognition.lang = tutorRecognitionLang();
  tutorRecognition.start();
});
els.tutorUsePhraseBtn.addEventListener("click", useLessonPhraseForTutor);
els.tutorAudioToggleBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  tutorAudioEnabled = !tutorAudioEnabled;
  updateTutorAudioButton();
});
els.tutorClearBtn.addEventListener("click", resetTutorChat);
els.tutorInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendTutorMessage();
  }
});

els.micBtn.addEventListener("click", () => {
  if (!recognition) return;

  if (micActive) {
    recognition.stop();
    return;
  }

  if (tutorMicActive && tutorRecognition) {
    tutorRecognition.stop();
  }
  hideFeedback();
  recognition.start();
});

els.generateLessonBtn.addEventListener("click", generateLessonNow);
els.placementBtn.addEventListener("click", runPlacementAssessment);
els.placementSaveBtn.addEventListener("click", savePlacementAssessment);
els.startReviewBtn.addEventListener("click", startDueReview);
els.markEasyBtn.addEventListener("click", markCurrentPhraseEasy);
els.scenarioStartBtn.addEventListener("click", startScenario);
els.scenarioCheckBtn.addEventListener("click", checkScenarioTurn);
els.scenarioNextBtn.addEventListener("click", nextScenarioTurn);
els.scenarioTopic.addEventListener("change", () => {
  if (!scenarioSupportedForTrack()) return;
  if (!scenarioState.active) {
    els.scenarioContext.textContent = scenarioContextText(els.scenarioTopic.value);
  }
});
els.scenarioAnswer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkScenarioTurn();
  }
});

els.langToggle.addEventListener("click", () => {
  uiLanguage = uiLanguage === "kn" ? "en" : "kn";
  saveUiLanguage();
  applyUiLanguage();
  renderDate();
  renderLessons();
  renderPhrase();
  if (!scenarioSupportedForTrack()) {
    els.scenarioContext.textContent = t("scenarioUnsupported");
  } else if (scenarioState.active) {
    renderScenarioTurn();
  } else {
    els.scenarioContext.textContent = scenarioContextText(els.scenarioTopic.value);
  }
  if (!tutorState.inFlight) {
    setTutorStatus(t("tutorStatusReady"));
  }
  loadProviderStatus();
});

els.learningTrackSelect.addEventListener("change", () => {
  switchLearningTrack(els.learningTrackSelect.value);
});

els.translateBtn.addEventListener("click", translateNow);
els.usePhrase.addEventListener("click", useCurrentLessonPhrase);
els.translateInput.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    translateNow();
  }
});

applyUiLanguage();
renderDate();
renderProgress();
renderLessons();
renderPhrase();
lessons.forEach((lesson) => lesson.phrases.forEach((phrase) => ensureReviewItem(phrase)));
saveReviewState();
renderLearnerPanel();
els.reviewStatus.textContent = t("reviewReady");
if (scenarioSupportedForTrack()) {
  els.scenarioContext.textContent = scenarioContextText(els.scenarioTopic.value);
} else {
  els.scenarioContext.textContent = t("scenarioUnsupported");
}
resetTutorChat();
loadProviderStatus();
