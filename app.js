const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusBox = document.getElementById("status");
const rateInput = document.getElementById("rateInput");
const pitchInput = document.getElementById("pitchInput");

const libraryFileInput = document.getElementById("libraryFileInput");
const loadLibraryBtn = document.getElementById("loadLibraryBtn");
const loadIntegratedBtn = document.getElementById("loadIntegratedBtn");
const resetLibraryBtn = document.getElementById("resetLibraryBtn");
const libraryStatusBox = document.getElementById("libraryStatusBox");
const integratedSourceSelect = document.getElementById("integratedSourceSelect");

const collectionFilter = document.getElementById("collectionFilter");
const queryInput = document.getElementById("queryInput");
const bookFilter = document.getElementById("bookFilter");
const searchBtn = document.getElementById("searchBtn");
const meaningsBtn = document.getElementById("meaningsBtn");
const sinLookupBtn = document.getElementById("sinLookupBtn");
const askLlmBtn = document.getElementById("askLlmBtn");
const resultsBox = document.getElementById("resultsBox");
const chooseReadBtn = document.getElementById("chooseReadBtn");
const chapterReadSelect = document.getElementById("chapterReadSelect");
const openChapterBtn = document.getElementById("openChapterBtn");
const resultReferencesBox = document.getElementById("resultReferencesBox");
const aiReferencesBox = document.getElementById("aiReferencesBox");
const chapterViewBox = document.getElementById("chapterViewBox");

const chapterSelect = document.getElementById("chapterSelect");
const targetKbInput = document.getElementById("targetKbInput");
const deepReportBtn = document.getElementById("deepReportBtn");
const bookSummaryBtn = document.getElementById("bookSummaryBtn");
const deepReportBox = document.getElementById("deepReportBox");
const compareBookA = document.getElementById("compareBookA");
const compareBookB = document.getElementById("compareBookB");
const compareBtn = document.getElementById("compareBtn");
const compareBox = document.getElementById("compareBox");

const searchAnnotation = document.getElementById("searchAnnotation");
const playSearchBtn = document.getElementById("playSearchBtn");
const deepAnnotation = document.getElementById("deepAnnotation");
const playDeepBtn = document.getElementById("playDeepBtn");
const compareAnnotation = document.getElementById("compareAnnotation");
const playCompareBtn = document.getElementById("playCompareBtn");

const annotUserInput = document.getElementById("annotUserInput");
const annotTextInput = document.getElementById("annotTextInput");
const addAnnotationBtn = document.getElementById("addAnnotationBtn");
const playAnnotationFeedBtn = document.getElementById("playAnnotationFeedBtn");
const annotationFeedBox = document.getElementById("annotationFeedBox");
const relativeAnnotationsInput = document.getElementById("relativeAnnotationsInput");
const relativeAnnotationsValue = document.getElementById("relativeAnnotationsValue");
const renderSummaryBtn = document.getElementById("renderSummaryBtn");
const annotationSummaryBox = document.getElementById("annotationSummaryBox");
const annotationHistoryQuery = document.getElementById("annotationHistoryQuery");
const searchAnnotationHistoryBtn = document.getElementById("searchAnnotationHistoryBtn");
const annotationHistoryResultsBox = document.getElementById("annotationHistoryResultsBox");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const loadingBar = document.getElementById("loadingBar");
const hardwareBadge = document.getElementById("hardwareBadge");

const speech = window.speechSynthesis;

let isRunning = false;
let loopToken = 0;

const noFuturePolicyText =
  "This engine can search scripture and meanings, but it cannot suggest or predict the future. Future suggestion is hardcoded as disabled.";

const primaryAuthorityPolicyText =
  "Primary authority policy: book/library scripture text and cited passages are first precedence; LLM synthesis and annotations are secondary and cannot override cited text.";

const futureRequestTerms = ["future", "predict", "prophecy", "what will happen", "tomorrow", "next year", "destiny"];

const themeVectors = {
  justice: ["justice", "judgment", "righteous", "oppressed", "widow", "fatherless", "law"],
  mercy: ["mercy", "forgive", "forgiveness", "pardon", "grace", "compassion"],
  purity: ["white", "snow", "clean", "scarlet", "crimson", "holy"],
  meaning: ["vanity", "meaningless", "labor", "season", "wisdom", "eternity"],
  kingdom: ["lord", "god", "heaven", "throne", "glory", "kingdom"],
  defense: ["defend", "guard", "gate", "watch", "shield", "protect"],
  repentance: ["return", "seek", "obedient", "wicked", "turn", "reason"]
};

const glossary = {
  thy: "Second-person singular possessive in older English; equivalent to your.",
  thou: "Second-person singular subject form in older English; equivalent to you.",
  errs: "A form of err, meaning to go wrong or miss truth.",
  swearing: "Can refer to oath-taking, vow language, or profane speech depending on context.",
  incense: "Aromatic smoke used in worship symbolism, often associated with prayer.",
  cannabis: "A debated lexical topic in fringe interpretations; not explicit in mainstream readings of temple incense texts.",
  of: "A relational connector of belonging, origin, composition, or topic.",
  conjecture: "A tentative interpretation where evidence is incomplete.",
  probability: "A likelihood estimate across multiple plausible readings.",
  fruits: "Literal produce or figurative outcomes over time.",
  trinity: "Christian doctrine of one God in three persons: Father, Son, Holy Spirit.",
  heavens: "Can indicate sky, celestial realm, or divine dwelling in layered language.",
  meaningless: "Ecclesiastes uses vanity/hevel language: fleeting and vapor-like rather than pure nihilism.",
  snow: "Symbolic image of cleansing and purity in Isaiah 1:18."
};

const sinIndex = [
  {
    type: "Pride",
    keywords: ["pride", "boast", "arrogance", "haughty"],
    penaltyTheme: "Spiritual hardening and relational fracture; correction calls for humility and repentance.",
    references: ["Isaiah 2", "Proverbs 16:18", "James 4:6"]
  },
  {
    type: "Violence / Harm",
    keywords: ["violence", "murder", "harm", "blood"],
    penaltyTheme: "Judgment and accountability are emphasized; justice should be proportional and not revenge-driven.",
    references: ["Genesis 9:6", "Exodus 21", "Romans 12:19"]
  },
  {
    type: "False Witness / Deception",
    keywords: ["lie", "false witness", "deceive", "fraud"],
    penaltyTheme: "Truth-breaking damages trust; restoration requires confession and repaired integrity.",
    references: ["Exodus 20:16", "Proverbs 12:22", "Ephesians 4:25"]
  },
  {
    type: "Sexual Immorality",
    keywords: ["adultery", "fornication", "lust", "immorality"],
    penaltyTheme: "Scripture frames this as covenant violation with personal and communal consequences.",
    references: ["Leviticus 18", "Matthew 5:27-28", "1 Corinthians 6:18-20"]
  },
  {
    type: "Idolatry",
    keywords: ["idol", "idolatry", "false god", "image"],
    penaltyTheme: "Misplaced worship leads to moral distortion; the call is to return to God.",
    references: ["Exodus 20:3-5", "Isaiah 44", "1 John 5:21"]
  }
];

const outwardPrayerBefore =
  "I bear this cross to simply defend the righteous by any means necessary of defense, a gate is its final decision.";

const lordPrayer =
  "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. " +
  "Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. " +
  "And lead us not into temptation, but deliver us from evil. Amen. " +
  "Thy kingdom, the power and the glory is yours heavenly Father, for ever, and ever... Amen.";

const afterThyKingdomLine = "I say these things in the name of Jesus Christ Amen.";
const stopClosingLine = "I say these things in the name of Jesus Christ Amen.";

const starterLibrary = [
  {
    collection: "Bible",
    source: "starter",
    books: [
      {
        book: "Ecclesiastes",
        summary: "Ecclesiastes studies meaning under the sun and wisdom before God.",
        chapters: [
          {
            number: 1,
            text:
              "Vanity of vanities, says the Preacher; vanity of vanities, all is vanity. What does man gain from all his labor under the sun?"
          },
          {
            number: 3,
            text:
              "For everything there is a season, and a time for every purpose under heaven. He has made everything beautiful in its time."
          }
        ]
      },
      {
        book: "Isaiah",
        summary: "Isaiah joins justice and mercy, judgment and restoration.",
        chapters: [
          {
            number: 1,
            text:
              "Though your sins are as scarlet, they shall be as white as snow. Learn to do well; seek justice, relieve the oppressed."
          },
          {
            number: 55,
            text:
              "Seek the LORD while he may be found; call upon him while he is near; he will abundantly pardon."
          }
        ]
      }
    ]
  },
  {
    collection: "Psalms",
    source: "starter",
    books: [
      {
        book: "Psalms",
        summary: "Prayer, lament, praise, and trust in God across life conditions.",
        chapters: [
          { number: 23, text: "The LORD is my shepherd; I shall not want." },
          { number: 51, text: "Create in me a clean heart, O God; and renew a right spirit within me." }
        ]
      }
    ]
  },
  {
    collection: "Book of Mormon",
    source: "starter",
    books: [
      {
        book: "2 Nephi",
        summary: "Faith in Christ, covenant identity, prophecy, and repentance themes.",
        chapters: [
          { number: 2, text: "Men are, that they might have joy." },
          { number: 25, text: "We talk of Christ, we rejoice in Christ, we preach of Christ." }
        ]
      }
    ]
  },
  {
    collection: "Hymns of Jesus Christ",
    source: "starter",
    books: [
      {
        book: "Hymn Collection",
        summary: "Worship poetry and singing language centered on devotion and discipleship.",
        chapters: [
          { number: 1, text: "Praise to the Lord, for mercy, light, and covenant faithfulness." },
          { number: 2, text: "Guide us, Lord, in faith, obedience, and charity." }
        ]
      }
    ]
  },
  {
    collection: "Enoch Extensionism",
    source: "starter",
    books: [
      {
        book: "1 Enoch (Extension)",
        summary: "Apocalyptic imagery, heavenly watchers, and judgment symbolism for study extension.",
        chapters: [
          { number: 1, text: "The words of the blessing of Enoch and a vision of judgment and hope." },
          { number: 15, text: "Instruction concerning spirits, boundaries, and accountable conduct." }
        ]
      }
    ]
  }
];

const state = {
  collections: JSON.parse(JSON.stringify(starterLibrary)),
  docs: [],
  searchIndex: [],
  communityAnnotations: [],
  integratedManifestFiles: [],
  integratedCatalog: [],
  integratedLoaded: true,
  runtimeDirty: true,
  activeIntegratedSource: "",
  llmSummaryHistory: [],
  annotationSummaryHistory: [],
  llmAnnotationAnswerHistory: []
};

const reportedMemoryGb = Number(navigator.deviceMemory || 0);
const hardwareProfile = reportedMemoryGb > 0 && reportedMemoryGb < 4 ? "compact-web" : "standard-web";
const searchConfig = { maxCandidates: 540, chunkSize: 24, importBatchSize: 6 };
const memoryScale = reportedMemoryGb >= 16 ? 2.4 : reportedMemoryGb >= 8 ? 1.8 : reportedMemoryGb >= 4 ? 1.35 : 1;
const memoryLimits = {
  llmHistoryCap: Math.max(60, Math.floor(60 * memoryScale)),
  llmAnnotationCap: Math.max(80, Math.floor(80 * memoryScale)),
  annotationHistoryScanCap: Math.max(180, Math.floor(180 * memoryScale)),
  evidenceCharBudget: Math.max(16000, Math.floor(16000 * memoryScale))
};

if (hardwareBadge) {
  hardwareBadge.textContent = reportedMemoryGb > 0
    ? `Hardware profile: ${hardwareProfile} | browser-reported memory: ${reportedMemoryGb} GB`
    : `Hardware profile: ${hardwareProfile} | browser-reported memory unavailable`;
}

function setLoadingState(active, message, percent) {
  if (!loadingOverlay || !loadingText || !loadingBar) {
    return;
  }

  loadingOverlay.classList.toggle("hidden", !active);
  loadingOverlay.setAttribute("aria-busy", active ? "true" : "false");
  if (message) {
    loadingText.textContent = message;
  }
  if (typeof percent === "number") {
    loadingBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
}

function nextFrame() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function countOccurrences(text, word) {
  const hay = ` ${normalize(text)} `;
  const needle = ` ${normalize(word)} `;
  let count = 0;
  let pos = 0;
  while (true) {
    pos = hay.indexOf(needle, pos);
    if (pos === -1) {
      break;
    }
    count += 1;
    pos += needle.length;
  }
  return count;
}

function dot(a, b) {
  return a.reduce((sum, val, idx) => sum + val * b[idx], 0);
}

function magnitude(vec) {
  return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

function cosineSimilarity(a, b) {
  const denom = magnitude(a) * magnitude(b);
  if (!denom) {
    return 0;
  }
  return dot(a, b) / denom;
}

function textToThemeVector(text) {
  return Object.values(themeVectors).map((keywords) => {
    return keywords.reduce((sum, kw) => sum + countOccurrences(text, kw), 0);
  });
}

function say(text) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(String(text || ""));
    utterance.rate = Number(rateInput.value);
    utterance.pitch = Number(pitchInput.value);
    utterance.onend = resolve;
    utterance.onerror = resolve;
    speech.speak(utterance);
  });
}

function writeStatus(message) {
  statusBox.value = message;
}

async function prayLoop(token) {
  writeStatus("Starting outward prayer...");
  await say(outwardPrayerBefore);

  while (isRunning && token === loopToken) {
    writeStatus("Reciting Lord's Prayer (first pass)...");
    await say(lordPrayer);
    if (!isRunning || token !== loopToken) {
      break;
    }

    writeStatus("Reciting Lord's Prayer (second pass)...");
    await say(lordPrayer);
    if (!isRunning || token !== loopToken) {
      break;
    }

    writeStatus("Speaking line after Thy Kingdom part...");
    await say(afterThyKingdomLine);
  }
}

function startPrayer() {
  if (isRunning) {
    return;
  }
  isRunning = true;
  loopToken += 1;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  prayLoop(loopToken).finally(() => {
    if (!isRunning) {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      writeStatus("Stopped.");
    }
  });
}

async function stopPrayer() {
  if (!isRunning) {
    return;
  }
  isRunning = false;
  loopToken += 1;
  speech.cancel();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  writeStatus("Stop pressed. Speaking closing prayer...");
  await say(stopClosingLine);
  writeStatus("Stopped.");
}

function inferCollectionName(fileName, books) {
  const upper = fileName.toUpperCase();
  const hasPsalms = books.some((b) => normalize(b).startsWith("psalm"));

  if (upper.includes("OLD-TESTAMENT") || upper.includes("NEW-TESTAMENT")) {
    return "Bible";
  }
  if (upper.includes("MORMON")) {
    return "Book of Mormon";
  }
  if (upper.includes("DOCTRINE") || upper.includes("COVENANTS") || upper.includes("D&C")) {
    return "Doctrine and Covenants";
  }
  if (upper.includes("PEARL-OF-GREAT-PRICE") || upper.includes("PEARL")) {
    return "Pearl of Great Price";
  }
  if (upper.includes("HYMN")) {
    return "Hymns of Jesus Christ";
  }
  if (upper.includes("ENOCH")) {
    return "Enoch Extensionism";
  }
  if (hasPsalms) {
    return "Psalms";
  }
  return "Bible";
}

function parseVerseMapFile(jsonObj, fileName) {
  const books = Object.keys(jsonObj || {});
  if (!books.length) {
    return null;
  }

  // Guard against non-scripture mapping JSON files.
  const sampleBook = books.find((name) => jsonObj[name] && typeof jsonObj[name] === "object" && !Array.isArray(jsonObj[name]));
  if (!sampleBook) {
    return null;
  }
  const sampleChapters = Object.keys(jsonObj[sampleBook] || {});
  if (!sampleChapters.length) {
    return null;
  }
  const sampleChapter = sampleChapters.find((c) => jsonObj[sampleBook][c] && typeof jsonObj[sampleBook][c] === "object" && !Array.isArray(jsonObj[sampleBook][c]));
  if (!sampleChapter) {
    return null;
  }
  const sampleVerses = Object.keys(jsonObj[sampleBook][sampleChapter] || {});
  if (!sampleVerses.length) {
    return null;
  }
  const sampleVerseValue = jsonObj[sampleBook][sampleChapter][sampleVerses[0]];
  if (typeof sampleVerseValue !== "string") {
    return null;
  }

  const collection = inferCollectionName(fileName, books);
  const parsedBooks = books.map((bookName) => {
    const chapterMap = jsonObj[bookName] || {};
    const chapterNums = Object.keys(chapterMap).sort((a, b) => Number(a) - Number(b));

    const chapters = chapterNums.map((cNum) => {
      const verseMap = chapterMap[cNum] || {};
      const verseNums = Object.keys(verseMap).sort((a, b) => Number(a) - Number(b));
      const lines = verseNums.map((vNum) => `${vNum}. ${verseMap[vNum]}`);
      return {
        number: Number(cNum),
        verses: verseNums.map((vNum) => ({ number: Number(vNum), text: String(verseMap[vNum] || "") })),
        text: lines.join(" ")
      };
    });

    const summary = `${bookName}: ${chapters.length} chapters imported from ${fileName}.`;
    return {
      book: bookName,
      summary,
      chapters
    };
  });

  return {
    collection,
    source: fileName,
    books: parsedBooks
  };
}

function normalizeManifestPath(pathValue) {
  return String(pathValue || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function integratedLabelFromPath(relPath) {
  const clean = normalizeManifestPath(relPath);
  const parts = clean.split("/");
  return String(parts.pop() || "").replace(/\.json$/i, "");
}

function populateIntegratedSourceSelect() {
  if (!integratedSourceSelect) {
    return;
  }

  integratedSourceSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choose a specific integrated source...";
  integratedSourceSelect.appendChild(placeholder);

  const duplicateCounter = new Map();
  state.integratedCatalog.forEach((entry) => {
    const key = entry.label.toLowerCase();
    duplicateCounter.set(key, (duplicateCounter.get(key) || 0) + 1);
  });

  state.integratedCatalog.forEach((entry) => {
    const opt = document.createElement("option");
    opt.value = entry.path;
    const duplicateCount = duplicateCounter.get(entry.label.toLowerCase()) || 0;
    opt.textContent = duplicateCount > 1 ? `${entry.label} (${entry.path.split("/").slice(-2, -1)[0] || "source"})` : entry.label;
    integratedSourceSelect.appendChild(opt);
  });
}

async function ensureIntegratedCatalog() {
  if (state.integratedCatalog.length) {
    return;
  }

  const manifestPath = "library/manifest.json";
  const res = await fetch(manifestPath);
  if (!res.ok) {
    throw new Error(`Manifest load failed: ${res.status}`);
  }

  const manifest = await res.json();
  const files = Array.isArray(manifest.files) ? manifest.files.map(normalizeManifestPath) : [];
  const candidates = files
    .filter((relPath) => {
      const lower = relPath.toLowerCase();
      if (!lower.endsWith(".json") || lower.endsWith("manifest.json")) {
        return false;
      }
      return (
        lower.includes("/versions/") ||
        lower.includes("apocrypha-versions/") ||
        lower.includes("old-testament") ||
        lower.includes("new-testament") ||
        lower.includes("book-of-mormon") ||
        lower.includes("doctrine") ||
        lower.includes("covenants") ||
        lower.includes("pearl") ||
        lower.includes("hymn") ||
        lower.includes("enoch")
      );
    })
    .map((path) => ({ path, label: integratedLabelFromPath(path) }))
    .sort((a, b) => a.label.localeCompare(b.label));

  state.integratedCatalog = candidates;
  populateIntegratedSourceSelect();
}

async function loadIntegratedLibrary() {
  try {
    await ensureIntegratedCatalog();
  } catch (err) {
    updateLibraryStatus(
      "Could not load integrated manifest. " +
      `Open the app via local server if browser file-mode blocks fetch. Error: ${String(err.message || err)}`
    );
    return;
  }

  const selectedPath = String(integratedSourceSelect ? integratedSourceSelect.value : "").trim();
  if (!selectedPath) {
    updateLibraryStatus("Choose a file title in Integrated Bible / Source, then click Load Integrated Library to load only that one source.");
    if (integratedSourceSelect) {
      integratedSourceSelect.focus();
    }
    return;
  }

  state.integratedManifestFiles = [selectedPath];
  state.activeIntegratedSource = selectedPath;
  state.integratedLoaded = false;
  state.runtimeDirty = true;
  updateLibraryStatus(
    `Integrated source staged: ${integratedLabelFromPath(selectedPath)}. ` +
    `Loading selected source now...`
  );

  await runTaskWithLoading(
    `Loading selected integrated source: ${integratedLabelFromPath(selectedPath)}`,
    async () => ensureLibraryRuntime("Loading selected integrated source..."),
    false
  );
}

function parseBooksArrayFile(jsonObj, fileName) {
  if (!jsonObj || !Array.isArray(jsonObj.books) || !jsonObj.books.length) {
    return null;
  }

  const bookNames = jsonObj.books
    .map((bookObj) => String(bookObj.book || "").trim())
    .filter(Boolean);
  const collection = inferCollectionName(fileName, bookNames);

  const parsedBooks = jsonObj.books
    .map((bookObj) => {
      const bookName = String(bookObj.book || "").trim();
      if (!bookName) {
        return null;
      }

      const chapters = (bookObj.chapters || [])
        .map((chObj) => {
          const chapterNumber = Number(chObj.chapter);
          const rawVerses = Array.isArray(chObj.verses) ? chObj.verses : [];
          const verses = rawVerses
            .map((v) => ({
              number: Number(v.verse || 0),
              text: String(v.text || "")
            }))
            .filter((v) => v.text);

          const chapterText = verses.length
            ? verses.map((v) => `${v.number}. ${v.text}`).join(" ")
            : String(chObj.text || "");

          if (!chapterText) {
            return null;
          }

          return {
            number: Number.isFinite(chapterNumber) && chapterNumber > 0 ? chapterNumber : 0,
            verses,
            text: chapterText
          };
        })
        .filter(Boolean);

      return {
        book: bookName,
        summary: `${bookName}: ${chapters.length} chapters imported from ${fileName}.`,
        chapters
      };
    })
    .filter(Boolean);

  if (!parsedBooks.length) {
    return null;
  }

  return {
    collection,
    source: fileName,
    books: parsedBooks
  };
}

function parseFlatVersesFile(jsonObj, fileName) {
  if (!jsonObj || !Array.isArray(jsonObj.verses) || !jsonObj.verses.length) {
    return null;
  }

  const grouped = new Map();

  jsonObj.verses.forEach((entry) => {
    const ref = String(entry.reference || "").trim();
    const text = String(entry.text || "").trim();
    if (!ref || !text) {
      return;
    }

    const match = ref.match(/^(.*)\s(\d+):(\d+)$/);
    if (!match) {
      return;
    }

    const book = match[1].trim();
    const chapter = Number(match[2]);
    const verse = Number(match[3]);
    if (!book || !Number.isFinite(chapter) || !Number.isFinite(verse)) {
      return;
    }

    const key = `${book}::${chapter}`;
    if (!grouped.has(key)) {
      grouped.set(key, { book, chapter, verses: [] });
    }
    grouped.get(key).verses.push({ number: verse, text });
  });

  if (!grouped.size) {
    return null;
  }

  const byBook = new Map();
  grouped.forEach((item) => {
    if (!byBook.has(item.book)) {
      byBook.set(item.book, []);
    }
    item.verses.sort((a, b) => a.number - b.number);
    byBook.get(item.book).push({
      number: item.chapter,
      verses: item.verses,
      text: item.verses.map((v) => `${v.number}. ${v.text}`).join(" ")
    });
  });

  const bookNames = [...byBook.keys()];
  const collection = inferCollectionName(fileName, bookNames);

  const parsedBooks = bookNames.map((bookName) => {
    const chapters = byBook.get(bookName).sort((a, b) => a.number - b.number);
    return {
      book: bookName,
      summary: `${bookName}: ${chapters.length} chapters imported from ${fileName}.`,
      chapters
    };
  });

  return {
    collection,
    source: fileName,
    books: parsedBooks
  };
}

function parseImportedScriptureFile(jsonObj, fileName) {
  return (
    parseBooksArrayFile(jsonObj, fileName) ||
    parseVerseMapFile(jsonObj, fileName) ||
    parseFlatVersesFile(jsonObj, fileName)
  );
}

async function flattenCollections() {
  const docs = [];
  state.collections.forEach((collectionObj) => {
    collectionObj.books.forEach((bookObj) => {
      bookObj.chapters.forEach((chapterObj) => {
        const chapterText = String(chapterObj.text || "").trim();
        if (!chapterText) {
          return;
        }

        docs.push({
          collection: collectionObj.collection,
          source: collectionObj.source,
          book: bookObj.book,
          chapter: chapterObj.number,
          verse: 0,
          text: chapterText,
          searchText: normalize(chapterText),
          themeVector: textToThemeVector(chapterText),
          chapterText,
          verseCount: Array.isArray(chapterObj.verses) ? chapterObj.verses.length : 0,
          bookSummary: bookObj.summary
        });
      });
    });
  });

  const searchIndex = [];
  for (let index = 0; index < docs.length; index += 24) {
    const slice = docs.slice(index, index + 24);
    slice.forEach((doc) => {
      searchIndex.push({
        collection: doc.collection,
        source: doc.source,
        book: doc.book,
        chapter: doc.chapter,
        text: doc.text,
        searchText: doc.searchText,
        themeVector: doc.themeVector
      });
    });
    await nextFrame();
  }

  state.docs = docs;
  state.searchIndex = searchIndex;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
}

function fillSelect(select, values, includeAll) {
  select.innerHTML = "";
  if (includeAll) {
    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "All";
    select.appendChild(allOpt);
  }
  values.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}

async function rebuildLibraryRuntime(statusPrefix) {
  const docs = [];
  const searchIndex = [];
  let processed = 0;
  const totalUnits = state.collections.reduce((sum, collectionObj) => {
    return (
      sum +
      collectionObj.books.reduce((bookSum, bookObj) => {
        return bookSum + bookObj.chapters.filter((chapterObj) => String(chapterObj.text || "").trim()).length;
      }, 0)
    );
  }, 0);

  for (const collectionObj of state.collections) {
    for (const bookObj of collectionObj.books) {
      for (const chapterObj of bookObj.chapters) {
        const chapterText = String(chapterObj.text || "").trim();
        if (!chapterText) {
          continue;
        }

        const doc = {
          collection: collectionObj.collection,
          source: collectionObj.source,
          book: bookObj.book,
          chapter: chapterObj.number,
          verse: 0,
          text: chapterText,
          searchText: normalize(chapterText),
          themeVector: textToThemeVector(chapterText),
          chapterText,
          verseCount: Array.isArray(chapterObj.verses) ? chapterObj.verses.length : 0,
          bookSummary: bookObj.summary
        };

        docs.push(doc);
        searchIndex.push({
          collection: doc.collection,
          source: doc.source,
          book: doc.book,
          chapter: doc.chapter,
          text: doc.text,
          searchText: doc.searchText,
          themeVector: doc.themeVector
        });

        processed += 1;
        if (processed % 24 === 0) {
          updateLibraryStatus(`${statusPrefix} Building chapter previews... ${processed} loaded.`);
          setLoadingState(
            true,
            `${statusPrefix} Building chapter previews... ${processed} / ${Math.max(totalUnits, 1)}`,
            Math.round((processed / Math.max(totalUnits, 1)) * 100)
          );
          await nextFrame();
        }
      }
    }
  }

  state.docs = docs;
  state.searchIndex = searchIndex;
  state.runtimeDirty = false;
  updateLibraryStatus(`${statusPrefix} Building chapter previews... ${processed} loaded.`);
  setLoadingState(true, `${statusPrefix} Building chapter previews... ${processed} / ${Math.max(totalUnits, 1)}`, 100);
  await nextFrame();
  refreshSelectors();
}

async function ensureLibraryRuntime(statusPrefix) {
  if (state.integratedManifestFiles.length && !state.integratedLoaded) {
    await hydrateIntegratedLibrary(statusPrefix || "Preparing chapter previews...");
  }
  if (state.runtimeDirty || !state.docs.length || !state.searchIndex.length) {
    await rebuildLibraryRuntime(statusPrefix || "Preparing chapter previews...");
  }
}

async function hydrateIntegratedLibrary(statusPrefix) {
  const files = state.integratedManifestFiles.slice();
  if (!files.length) {
    state.integratedLoaded = true;
    return;
  }

  const imported = [];
  const failed = [];
  let processed = 0;

  setLoadingState(true, `${statusPrefix} Loading integrated library... 0 / ${files.length}`, 0);

  for (let index = 0; index < files.length; index += searchConfig.importBatchSize) {
    const slice = files.slice(index, index + searchConfig.importBatchSize);
    for (const relPath of slice) {
      if (!relPath.toLowerCase().endsWith(".json") || relPath.toLowerCase().endsWith("manifest.json")) {
        processed += 1;
        continue;
      }

      try {
        const fileRes = await fetch(`library/${relPath}`);
        if (!fileRes.ok) {
          failed.push(`${relPath}: HTTP ${fileRes.status}`);
        } else {
          const parsed = await fileRes.json();
          const converted = parseImportedScriptureFile(parsed, relPath);
          if (converted) {
            imported.push(converted);
          } else {
            failed.push(`${relPath}: unsupported JSON shape`);
          }
        }
      } catch (err) {
        failed.push(`${relPath}: ${String(err.message || err)}`);
      }

      processed += 1;
      updateLibraryStatus(
        `${statusPrefix} Loading integrated library... ${processed} / ${files.length} files processed. ` +
        `Imported: ${imported.length} | Failed: ${failed.length}`
      );
      setLoadingState(true, `${statusPrefix} Loading integrated library... ${processed} / ${files.length}`, Math.round((processed / files.length) * 100));
      await nextFrame();
    }
  }

  const integratedSourcePaths = new Set(state.integratedCatalog.map((entry) => entry.path));
  const beforeFilterCount = state.collections.length;
  state.collections = state.collections.filter((c) => !integratedSourcePaths.has(c.source));
  if (state.collections.length !== beforeFilterCount) {
    state.runtimeDirty = true;
  }

  const existingSources = new Set(state.collections.map((c) => `${c.collection}::${c.source}`));
  const uniqueImported = imported.filter((c) => !existingSources.has(`${c.collection}::${c.source}`));

  if (uniqueImported.length) {
    state.collections = state.collections.concat(uniqueImported);
    state.runtimeDirty = true;
  }

  state.integratedLoaded = true;

  updateLibraryStatus(
    `${statusPrefix} Integrated library load complete. Processed ${processed} / ${files.length} files. ` +
    `Imported ${uniqueImported.length} scripture files. Failed or skipped: ${failed.length}.`
  );
  setLoadingState(false);
}

function refreshSelectors() {
  const collections = uniqueSorted(state.docs.map((d) => d.collection));
  const books = uniqueSorted(state.docs.map((d) => d.book));
  const chapterKeys = uniqueSorted(state.docs.map((d) => `${d.book} ${d.chapter}`));

  fillSelect(collectionFilter, collections, true);
  fillSelect(bookFilter, books, true);
  fillSelect(chapterSelect, chapterKeys, false);
  fillSelect(chapterReadSelect, chapterKeys, false);
  fillSelect(compareBookA, books, false);
  fillSelect(compareBookB, books, false);

  if (compareBookA.options.length) {
    compareBookA.selectedIndex = 0;
  }
  if (compareBookB.options.length > 1) {
    compareBookB.selectedIndex = 1;
  } else if (compareBookB.options.length) {
    compareBookB.selectedIndex = 0;
  }
}

function parseReferenceToBookChapter(reference) {
  const match = String(reference || "").trim().match(/^(.*)\s(\d+)(?::\d+)?$/);
  if (!match) {
    return null;
  }
  return {
    book: match[1].trim(),
    chapter: Number(match[2])
  };
}

function openFullChapter(reference) {
  const parsed = parseReferenceToBookChapter(reference);
  if (!parsed) {
    chapterViewBox.value = `Could not parse reference: ${reference}`;
    return;
  }

  const docs = state.docs
    .filter((d) => d.book === parsed.book && d.chapter === parsed.chapter)
    .sort((a, b) => String(a.source).localeCompare(String(b.source)));

  if (!docs.length) {
    chapterViewBox.value = `No chapter data found for ${parsed.book} ${parsed.chapter}.`;
    return;
  }

  const byCollection = uniqueSorted(docs.map((d) => d.collection)).join(", ");
  const sourceHint = uniqueSorted(docs.map((d) => d.source)).slice(0, 3).join(", ");
  const previewBlocks = docs.map((d) => `${d.collection} / ${d.source}\n${d.text}`);

  chapterViewBox.value =
    `${parsed.book} ${parsed.chapter}\n` +
    `Collection(s): ${byCollection}\n` +
    `Source hint: ${sourceHint}\n` +
    `Preview units: ${docs.length}\n\n` +
    previewBlocks.join("\n\n---\n\n");
}

function renderReferenceButtons(container, refs) {
  container.innerHTML = "";
  if (!Array.isArray(refs) || !refs.length) {
    const span = document.createElement("span");
    span.textContent = "No references yet.";
    container.appendChild(span);
    return;
  }

  refs.forEach((ref) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reference-item";
    btn.textContent = ref;
    btn.addEventListener("click", () => openFullChapter(ref));
    container.appendChild(btn);
  });
}

function updateLibraryStatus(extraMessage) {
  const collectionCount = uniqueSorted(state.docs.map((d) => d.collection)).length;
  const bookCount = uniqueSorted(state.docs.map((d) => d.book)).length;
  const chapterCount = uniqueSorted(state.docs.map((d) => `${d.book} ${d.chapter}`)).length;
  const previewCount = state.docs.length;

  libraryStatusBox.value =
    `Collections: ${collectionCount}\n` +
    `Books: ${bookCount}\n` +
    `Chapters: ${chapterCount}\n` +
    `Chapter previews: ${previewCount}\n` +
    `${extraMessage || "Library ready."}`;
}

async function loadStarterLibrary() {
  state.collections = JSON.parse(JSON.stringify(starterLibrary));
  state.integratedManifestFiles = [];
  state.integratedLoaded = true;
  state.runtimeDirty = true;
  state.activeIntegratedSource = "";
  await rebuildLibraryRuntime("Starter library ready.");
  updateLibraryStatus("Starter library loaded.");
  setLoadingState(false);
}

async function loadLibraryFiles() {
  const files = [...(libraryFileInput.files || [])];
  if (!files.length) {
    updateLibraryStatus("No files selected. Keeping current library.");
    return;
  }

  const imported = [];
  const failed = [];

  for (let index = 0; index < files.length; index += searchConfig.chunkSize) {
    const slice = files.slice(index, index + searchConfig.chunkSize);
    for (const file of slice) {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const converted = parseImportedScriptureFile(parsed, file.name);
        if (converted) {
          imported.push(converted);
        } else {
          failed.push(`${file.name}: unsupported JSON shape`);
        }
      } catch (err) {
        failed.push(`${file.name}: ${String(err.message || err)}`);
      }
    }
    await nextFrame();
  }

  if (imported.length) {
    state.collections = state.collections.concat(imported);
    state.integratedLoaded = true;
    state.runtimeDirty = true;
    state.activeIntegratedSource = "";
  }

  const message =
    `Imported files: ${imported.length}\n` +
    `Failed files: ${failed.length}\n` +
    `${failed.length ? failed.slice(0, 8).join("\n") : "All selected files parsed successfully."}\n` +
    `Files staged. Click a search button to build chapter previews.`;

  updateLibraryStatus(message);
}

async function handleLoadLibraryButton() {
  const selectedIntegrated = String(integratedSourceSelect ? integratedSourceSelect.value : "").trim();
  if (selectedIntegrated) {
    await loadIntegratedLibrary();
    return;
  }

  await loadLibraryFiles();
}

function queryRequestsFuture(query) {
  const q = normalize(query);
  return futureRequestTerms.some((term) => q.includes(term));
}

function findClosestGlossaryTerms(tokens) {
  const keys = Object.keys(glossary);
  const out = [];
  tokens.forEach((token) => {
    keys.forEach((key) => {
      if (key.includes(token) || token.includes(key)) {
        out.push(key);
      }
    });
  });
  return [...new Set(out)];
}

function filteredDocs() {
  const collection = collectionFilter.value;
  const book = bookFilter.value;

  return state.docs.filter((d) => {
    if (state.activeIntegratedSource && d.source !== state.activeIntegratedSource) {
      return false;
    }
    if (collection && collection !== "ALL" && d.collection !== collection) {
      return false;
    }
    if (book && book !== "ALL" && d.book !== book) {
      return false;
    }
    return true;
  });
}

function extractEvidence(text, tokens) {
  const snippets = String(text || "").split(/(?<=[.!?])\s+/);
  return snippets.filter((s) => tokens.some((t) => normalize(s).includes(t))).slice(0, 2);
}

function scoreDoc(query, doc) {
  const qTokens = tokenize(query);
  const exact = qTokens.reduce((sum, t) => sum + countOccurrences(doc.searchText || doc.text, t), 0);
  const qVec = textToThemeVector(query);
  const dVec = doc.themeVector || textToThemeVector(doc.text);
  const semantic = cosineSimilarity(qVec, dVec);
  return {
    exact,
    semantic,
    score: exact * 3 + semantic * 8
  };
}

function chapterRefsFromResults(rows) {
  return uniqueSorted(rows.map((r) => `${r.book} ${r.chapter}`));
}

function chapterLevelSearch(query) {
  const qTokens = tokenize(query);
  const qVec = textToThemeVector(query);
  const docs = filteredDocs();
  const candidateDocs = docs.filter((doc) => qTokens.some((token) => (doc.searchText || doc.text).includes(token)));
  const semanticPool = candidateDocs.length ? candidateDocs.slice(0, searchConfig.maxCandidates) : docs.slice(0, searchConfig.maxCandidates);
  const grouped = new Map();

  semanticPool.forEach((doc) => {
    const chapterKey = `${doc.book} ${doc.chapter}`;
    const exact = qTokens.reduce((sum, t) => sum + countOccurrences(doc.searchText || doc.text, t), 0);
    const semantic = cosineSimilarity(qVec, doc.themeVector || textToThemeVector(doc.text));
    const score = exact * 3 + semantic * 8;
    const current = grouped.get(chapterKey) || {
      collection: doc.collection,
      source: doc.source,
      book: doc.book,
      chapter: doc.chapter,
      score: 0,
      exact: 0,
      semantic: 0,
      evidence: []
    };

    current.score += score;
    current.exact += exact;
    current.semantic += semantic;
    if (current.evidence.length < 2 && doc.text) {
      current.evidence.push(doc.text);
    }
    grouped.set(chapterKey, current);
  });

  return [...grouped.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

function buildMercySuggestions(query) {
  const qVec = textToThemeVector(query);
  const mercy = qVec[1] + qVec[6] * 0.5;
  const justice = qVec[0] + qVec[5] * 0.4;
  return (
    "Generative mercy guidance (non-predictive):\n" +
    `- mercySignal=${mercy.toFixed(2)}\n` +
    `- justiceSignal=${justice.toFixed(2)}\n` +
    "- Mercy suggestion 1: Begin with confession and truth before requesting pardon.\n" +
    "- Mercy suggestion 2: Seek repair for harm done, not only private regret.\n" +
    "- Mercy suggestion 3: Use proportional correction and leave room for restored relationship.\n" +
    "- listed goals: none such goals."
  );
}

async function runTaskWithLoading(label, workFn, ensureRuntime) {
  setLoadingState(true, label, 8);
  await nextFrame();
  try {
    if (ensureRuntime) {
      await ensureLibraryRuntime(label);
    }
    await workFn();
  } finally {
    setLoadingState(false);
  }
}

function annotationSimilarityPercent(aText, bText) {
  const aSet = new Set(tokenize(aText));
  const bSet = new Set(tokenize(bText));
  if (!aSet.size || !bSet.size) {
    return 0;
  }

  let overlap = 0;
  aSet.forEach((token) => {
    if (bSet.has(token)) {
      overlap += 1;
    }
  });

  return Math.round((overlap / Math.min(aSet.size, bSet.size)) * 100);
}

function collectAnnotationPool() {
  const pool = [];

  state.communityAnnotations.forEach((item) => {
    pool.push({
      source: `Community:${item.user}`,
      text: String(item.text || "").trim()
    });
  });

  [
    { source: "Manual:Search", text: searchAnnotation.value },
    { source: "Manual:Deep", text: deepAnnotation.value },
    { source: "Manual:Compare", text: compareAnnotation.value }
  ].forEach((entry) => {
    const text = String(entry.text || "").trim();
    if (text) {
      pool.push({ source: entry.source, text });
    }
  });

  return pool.filter((entry) => entry.text.length > 0);
}

function summarizeTopThemesFromVector(vec, topN) {
  return Object.keys(themeVectors)
    .map((name, idx) => ({ name, weight: Number(vec[idx] || 0) }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, topN)
    .map((x) => x.name);
}

function buildLlmAttemptAnswerSummarized(query, combinedEvidenceText, refs) {
  const queryVec = textToThemeVector(query);
  const evidenceVec = textToThemeVector(combinedEvidenceText);
  const queryThemes = summarizeTopThemesFromVector(queryVec, 3);
  const evidenceThemes = summarizeTopThemesFromVector(evidenceVec, 4);

  return (
    `Question focus themes: ${queryThemes.join(", ") || "none"}. ` +
    `Retrieved passage themes: ${evidenceThemes.join(", ") || "none"}. ` +
    "Primary authority remains the cited chapter text first. " +
    "Across the retrieved chapters, the synthesis trends toward repentance, truthful confession, " +
    "mercy with accountability, and restoration rather than retaliation. " +
    "A careful reading keeps justice proportional while preserving room for forgiveness and covenant repair. " +
    `This summary was produced from ${refs.length} cited chapter sources in the current filters.`
  );
}

function buildShortLlmSummary(query, topThemes, refs, selectedAnnotationCount) {
  return (
    `Short local summary: For "${query}", the cited chapters point most strongly to ${topThemes.join(", ") || "scriptural alignment"}. ` +
    `The answer was synthesized from ${refs.length} chapter citations with ${selectedAnnotationCount} top annotations used as secondary context.`
  );
}

function buildGeneratedAttemptAnswer(query, topChapters, topThemes, selectedAnnotations) {
  const qTokens = tokenize(query);
  const evidenceSentences = [];

  topChapters.forEach((chapter) => {
    const lines = (chapter.evidence || [])
      .join(" ")
      .split(/(?<=[.!?])\s+/)
      .map((line) => String(line || "").trim())
      .filter((line) => line.length > 20);

    lines.forEach((line) => {
      if (evidenceSentences.length >= 6) {
        return;
      }
      const norm = normalize(line);
      const hit = qTokens.some((token) => norm.includes(token));
      if (hit || evidenceSentences.length < 3) {
        evidenceSentences.push(line.slice(0, 210));
      }
    });
  });

  const evidenceLead = evidenceSentences.length
    ? evidenceSentences.slice(0, 2).join(" ")
    : "The selected chapter evidence points to a scripture-grounded response within the current filters.";

  const annotationLead = selectedAnnotations.length
    ? selectedAnnotations
      .slice(0, 2)
      .map((item) => item.text.slice(0, 130).replace(/\s+/g, " ").trim())
      .join(" | ")
    : "No annotation signals were available, so this attempt is based on scripture evidence alone.";

  const dominant = topThemes[0] || "scriptural guidance";
  const supporting = topThemes.slice(1).join(" and ") || "contextual discernment";

  return (
    `For the question "${query}", the local model reads the cited chapters with ${dominant} as the dominant lens and ${supporting} as supporting context. ` +
    `${evidenceLead} ` +
    `Annotation signals selected for comparison were: ${annotationLead}. ` +
    "Generated attempt: pursue truth, repentance, and restorative mercy while keeping justice accountable and proportional to what the cited text actually says."
  );
}

function getCappedCombinedEvidence(topChapters) {
  let budgetLeft = memoryLimits.evidenceCharBudget;
  const chunks = [];

  topChapters.forEach((chapter) => {
    const sourceText = String((chapter.evidence || []).join(" ") || "").trim();
    if (!sourceText || budgetLeft <= 0) {
      return;
    }
    const clipped = sourceText.slice(0, budgetLeft);
    chunks.push(clipped);
    budgetLeft -= clipped.length;
  });

  return chunks.join(" ");
}

function selectTopAnnotationsForQuestion(query, combinedEvidenceText) {
  const queryTokens = new Set(tokenize(query));
  const contextTokens = new Set(tokenize(combinedEvidenceText));
  const qVec = textToThemeVector(query);
  const cVec = textToThemeVector(combinedEvidenceText);

  const entries = collectAnnotationHistoryEntries()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, memoryLimits.annotationHistoryScanCap);

  const scored = entries.map((entry) => {
    const tokens = tokenize(entry.text);
    const tokenSet = new Set(tokens);

    let queryOverlap = 0;
    queryTokens.forEach((token) => {
      if (tokenSet.has(token)) {
        queryOverlap += 1;
      }
    });

    let contextOverlap = 0;
    contextTokens.forEach((token) => {
      if (tokenSet.has(token)) {
        contextOverlap += 1;
      }
    });

    const aVec = textToThemeVector(entry.text);
    const querySemantic = cosineSimilarity(aVec, qVec);
    const contextSemantic = cosineSimilarity(aVec, cVec);
    const score = queryOverlap * 2.5 + contextOverlap * 1.1 + querySemantic * 5 + contextSemantic * 7;

    return {
      source: entry.source,
      text: entry.text,
      queryOverlap,
      contextOverlap,
      querySemantic,
      contextSemantic,
      score
    };
  });

  return {
    scanned: entries.length,
    selected: scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  };
}

function buildAnnotationSummaryAnswer(query, combinedEvidenceText, precomputedSelection) {
  const selection = precomputedSelection || selectTopAnnotationsForQuestion(query, combinedEvidenceText);
  if (!selection.selected.length) {
    return "No annotations found. Add manual or community annotations to include annotation-aware synthesis.";
  }

  const topMentions = selection.selected
    .map((item, idx) =>
      `${idx + 1}. ${item.source} | score=${item.score.toFixed(2)} | qOverlap=${item.queryOverlap} | ctxOverlap=${item.contextOverlap}\n` +
      `   ${item.text.slice(0, 280)}`
    )
    .join("\n\n");

  const communityCount = selection.selected.filter((x) => x.source.startsWith("Community:")).length;
  const selectedCount = selection.selected.length;

  return (
    `Processed annotations within local memory threshold: scanned ${selection.scanned}, selected top ${selectedCount} of 8 (${communityCount} community).\n` +
    "Primary authority: cited scripture/library passages first; annotations are secondary support only.\n" +
    "Annotation-weighted reading: strongest notes reinforce repentance, truth, repair, and mercy under accountable justice.\n\n" +
    "Most relevant annotation signals:\n" +
    `${topMentions}`
  );
}

function collectAnnotationHistoryEntries() {
  const entries = [];

  state.communityAnnotations.forEach((item) => {
    entries.push({
      source: `Community:${item.user}`,
      text: String(item.text || "").trim(),
      createdAt: item.createdAt || 0
    });
  });

  [
    { source: "Manual:Search", text: searchAnnotation.value },
    { source: "Manual:Deep", text: deepAnnotation.value },
    { source: "Manual:Compare", text: compareAnnotation.value }
  ].forEach((item) => {
    const text = String(item.text || "").trim();
    if (text) {
      entries.push({ source: item.source, text, createdAt: 0 });
    }
  });

  state.annotationSummaryHistory.forEach((item, idx) => {
    const text = String(item.output || "").trim();
    if (text) {
      entries.push({
        source: `RenderedSummary:${idx + 1}`,
        text,
        createdAt: item.createdAt || 0
      });
    }
  });

  state.llmAnnotationAnswerHistory.forEach((item, idx) => {
    const text = String(item.text || "").trim();
    if (text) {
      entries.push({
        source: `LLMAnnotationAnswer:${idx + 1}`,
        text,
        createdAt: item.createdAt || 0
      });
    }
  });

  return entries.filter((item) => item.text.length > 0);
}

function searchAllAnnotationHistory() {
  if (!annotationHistoryResultsBox) {
    return;
  }

  const query = String(annotationHistoryQuery ? annotationHistoryQuery.value : "").trim();
  if (!query) {
    annotationHistoryResultsBox.value = "Enter a history query first.";
    return;
  }

  const qTokens = tokenize(query);
  const qVec = textToThemeVector(query);
  const entries = collectAnnotationHistoryEntries()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, memoryLimits.annotationHistoryScanCap);

  if (!entries.length) {
    annotationHistoryResultsBox.value = "No annotation history available yet.";
    return;
  }

  const ranked = entries
    .map((entry) => {
      const norm = normalize(entry.text);
      const tokenHits = qTokens.reduce((sum, token) => sum + countOccurrences(norm, token), 0);
      const semantic = cosineSimilarity(qVec, textToThemeVector(entry.text));
      return {
        source: entry.source,
        text: entry.text,
        createdAt: entry.createdAt,
        score: tokenHits * 3 + semantic * 8,
        tokenHits,
        semantic
      };
    })
    .filter((item) => item.tokenHits > 0 || item.semantic > 0.08)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    annotationHistoryResultsBox.value =
      `Annotation history entries scanned: ${entries.length}\n` +
      `No matches found for: ${query}`;
    return;
  }

  annotationHistoryResultsBox.value =
    `Annotation history query: ${query}\n` +
    `${primaryAuthorityPolicyText}\n` +
    `Entries scanned: ${entries.length}\n` +
    `Matches found: ${ranked.length}\n\n` +
    ranked
      .slice(0, 40)
      .map((item, idx) => {
        const when = item.createdAt ? new Date(item.createdAt).toLocaleString() : "current-session";
        return (
          `${idx + 1}. ${item.source} | score=${item.score.toFixed(3)} | tokenHits=${item.tokenHits} | semantic=${item.semantic.toFixed(3)} | ${when}\n` +
          `${item.text.slice(0, 420)}`
        );
      })
      .join("\n\n");
}

async function renderRelativeAnnotationSummary() {
  const threshold = Number(relativeAnnotationsInput ? relativeAnnotationsInput.value : 30);
  const annotationPool = collectAnnotationPool();
  const llmPool = state.llmSummaryHistory.slice(-30);

  if (!llmPool.length) {
    annotationSummaryBox.value = "No LLM summaries in memory yet. Run Ask Mini LLM first.";
    return;
  }
  if (!annotationPool.length) {
    annotationSummaryBox.value = "No annotations found to compare. Add manual or community annotations first.";
    return;
  }

  const matches = [];
  const totalWork = annotationPool.length * llmPool.length;
  let done = 0;

  for (const annotation of annotationPool) {
    let best = null;
    for (const summary of llmPool) {
      const score = annotationSimilarityPercent(annotation.text, summary.answer);
      done += 1;
      if (!best || score > best.score) {
        best = {
          score,
          query: summary.query,
          snippet: summary.answer.slice(0, 180)
        };
      }

      if (done % 8 === 0) {
        const percent = Math.max(1, Math.round((done / totalWork) * 100));
        setLoadingState(true, `Comparing annotations and LLM summaries... ${done} / ${totalWork}`, percent);
        await nextFrame();
      }
    }

    if (best && best.score >= threshold) {
      matches.push({
        annotationSource: annotation.source,
        annotationText: annotation.text,
        score: best.score,
        query: best.query,
        snippet: best.snippet
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  const output =
    `Relative annotation threshold: ${threshold}%\n` +
    `Annotations compared: ${annotationPool.length}\n` +
    `LLM summaries compared: ${llmPool.length}\n` +
    `Related annotations found: ${matches.length}\n\n` +
    (matches.length
      ? matches
        .slice(0, 30)
        .map((m, idx) =>
          `${idx + 1}. ${m.annotationSource} | ${m.score}%\n` +
          `Annotation: ${m.annotationText}\n` +
          `Best LLM query: ${m.query}\n` +
          `LLM snippet: ${m.snippet}...`
        )
        .join("\n\n")
      : "No annotations met the current relatedness threshold.");

  annotationSummaryBox.value = output;
  state.annotationSummaryHistory.push({ threshold, createdAt: Date.now(), relatedCount: matches.length, output });
}

function runSearch() {
  const query = queryInput.value.trim();
  if (!query) {
    resultsBox.value = "Enter a query first.";
    return;
  }

  if (queryRequestsFuture(query)) {
    resultsBox.value = `${noFuturePolicyText}\n\n${buildMercySuggestions(query)}`;
    return;
  }

  const rows = filteredDocs();
  if (!rows.length) {
    resultsBox.value = "No documents available in current filters.";
    return;
  }

  const tokens = tokenize(query);
  const ranked = chapterLevelSearch(query);

  const meanings = findClosestGlossaryTerms(tokens)
    .map((t) => `- ${t}: ${glossary[t]}`)
    .join("\n");

  const refs = chapterRefsFromResults(ranked);
  renderReferenceButtons(resultReferencesBox, refs);
  renderReferenceButtons(aiReferencesBox, []);

  resultsBox.value =
    `Query: ${query}\n` +
    `Chapter previews searched: ${rows.length}\n` +
    `${state.activeIntegratedSource ? `Active integrated source: ${integratedLabelFromPath(state.activeIntegratedSource)}\n` : ""}` +
    `Hardware profile: ${hardwareProfile} | search budget: ${searchConfig.maxCandidates} chapters\n\n` +
    ranked
      .map((r, idx) => {
        const ref = `${r.book} ${r.chapter}`;
        const ev = r.evidence.length ? r.evidence.join(" | ") : "Chapter matched by aggregate scoring.";
        return `${idx + 1}. [${r.collection}] ${ref}\nscore=${r.score.toFixed(3)}\n${ev}`;
      })
      .join("\n\n") +
    `\n\nMatched term meanings:\n${meanings || "- No glossary matches."}\n\n` +
    `${noFuturePolicyText}\n${buildMercySuggestions(query)}`;
}

function explainTermsOnly() {
  const query = queryInput.value.trim();
  const tokens = tokenize(query);
  const terms = findClosestGlossaryTerms(tokens.length ? tokens : Object.keys(glossary));
  if (!terms.length) {
    resultsBox.value = "No glossary term match.";
    return;
  }
  resultsBox.value = terms.map((t) => `${t}: ${glossary[t]}`).join("\n\n");
}

function runSinLookup() {
  const query = queryInput.value.trim();
  if (!query) {
    resultsBox.value = "Enter a sin-related question first.";
    return;
  }
  const q = normalize(query);
  const matches = sinIndex.filter((x) => x.keywords.some((k) => q.includes(normalize(k))));
  const items = (matches.length ? matches : sinIndex.slice(0, 3)).map((m) => {
    return `${m.type}\nPenalty/Consequence Theme: ${m.penaltyTheme}\nReferences: ${m.references.join(", ")}`;
  });

  resultsBox.value =
    `Sin Lookup Query: ${query}\n\n` +
    `${noFuturePolicyText}\n\n` +
    `${items.join("\n\n")}\n\n` +
    `${buildMercySuggestions(query)}`;
}

async function askMiniLlm() {
  const query = queryInput.value.trim();
  if (!query) {
    resultsBox.value = "Enter a question for the mini LLM.";
    return;
  }

  if (queryRequestsFuture(query)) {
    resultsBox.value = `${noFuturePolicyText}\n\nMini LLM answer withheld due to policy.`;
    return;
  }

  const rows = filteredDocs();
  if (!rows.length) {
    resultsBox.value = "No loaded corpus found for mini LLM retrieval.";
    return;
  }

  setLoadingState(true, "Mini LLM understanding pass 1/3: retrieving strongest scripture chapters...", 24);
  await nextFrame();

  const top = chapterLevelSearch(query).slice(0, 8);

  const refs = top.map((d) => `${d.book} ${d.chapter}`);
  const combined = getCappedCombinedEvidence(top);
  renderReferenceButtons(aiReferencesBox, refs);

  const topThemes = Object.keys(themeVectors)
    .map((name, idx) => ({ name, weight: textToThemeVector(combined)[idx] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((x) => x.name);

  setLoadingState(true, "Mini LLM understanding pass 2/3: comparing annotations to cited scripture evidence...", 58);
  await nextFrame();

  const annotationSelection = selectTopAnnotationsForQuestion(query, combined);
  const annotationAnswerText = buildAnnotationSummaryAnswer(query, combined, annotationSelection);

  setLoadingState(true, "Mini LLM understanding pass 3/3: synthesizing concise local answer...", 86);
  await nextFrame();

  const shortSummary = buildShortLlmSummary(query, topThemes, refs, annotationSelection.selected.length);
  const generatedAttemptAnswer = buildGeneratedAttemptAnswer(query, top, topThemes, annotationSelection.selected);

  const answer =
    `Mini LLM (local retrieval + synthesis)\n` +
    `Question: ${query}\n\n` +
    `${primaryAuthorityPolicyText}\n\n` +
    `${shortSummary}\n\n` +
    `Answer:\n` +
    `Based on the highest-matching passages, the dominant scriptural themes are ${topThemes.join(", ")}. ` +
    `A careful reading points toward repentance, truth, and mercy joined with accountable justice rather than revenge. ` +
    `Use the cited passages below as primary authority for interpretation.\n\n` +
    `Citations:\n- ${refs.join("\n- ")}\n\n` +
    `${noFuturePolicyText}\n\n` +
    `LLM Attempt Answer Summarized:\n` +
    `${buildLlmAttemptAnswerSummarized(query, combined, refs)}\n\n` +
    `Generated Attempt Answer (scripture-first):\n` +
    `${generatedAttemptAnswer}\n\n` +
    `Annotation Summary Answer:\n` +
    `${annotationAnswerText}`;

  resultsBox.value = answer;
  annotationSummaryBox.value = annotationAnswerText;
  state.llmAnnotationAnswerHistory.push({
    query,
    text: annotationAnswerText,
    createdAt: Date.now()
  });
  if (state.llmAnnotationAnswerHistory.length > memoryLimits.llmAnnotationCap) {
    state.llmAnnotationAnswerHistory = state.llmAnnotationAnswerHistory.slice(-memoryLimits.llmAnnotationCap);
  }
  state.llmSummaryHistory.push({ query, answer, refs, createdAt: Date.now() });
  if (state.llmSummaryHistory.length > memoryLimits.llmHistoryCap) {
    state.llmSummaryHistory = state.llmSummaryHistory.slice(-memoryLimits.llmHistoryCap);
  }
}

function getChapterTextByKey(key) {
  const parts = String(key || "").split(" ");
  const chapter = Number(parts.pop());
  const book = parts.join(" ");
  const docs = state.docs.filter((d) => d.book === book && d.chapter === chapter);
  if (!docs.length) {
    return null;
  }
  return {
    book,
    chapter,
    text: docs.map((d) => d.text).join("\n\n")
  };
}

function topKeywordsFromText(text, limit) {
  const counts = new Map();
  tokenize(text)
    .filter((token) => token.length >= 4)
    .forEach((token) => {
      counts.set(token, (counts.get(token) || 0) + 1);
    });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => `${word}(${count})`);
}

function buildDeepReport() {
  const key = chapterSelect.value || (chapterSelect.options.length ? chapterSelect.options[0].value : "");
  const targetKb = Number(targetKbInput.value || 120);
  if (!key) {
    deepReportBox.value = "No chapters loaded yet. Load a source and run a search to prepare chapter previews.";
    return;
  }

  const found = getChapterTextByKey(key);
  if (!found) {
    deepReportBox.value = "Choose a chapter first.";
    return;
  }

  const tokens = tokenize(found.text);
  const frames = Object.keys(themeVectors).map((name, idx) => {
    const value = textToThemeVector(found.text)[idx];
    return {
      theme: name,
      probability: Number(Math.min(0.95, 0.2 + value / 25).toFixed(3))
    };
  }).sort((a, b) => b.probability - a.probability);

  const report = {
    chapter: `${found.book} ${found.chapter}`,
    stats: {
      characters: found.text.length,
      words: tokens.length,
      uniqueWords: new Set(tokens).size
    },
    interpretiveFrames: frames,
    noFuturePolicy: "active",
    neuralMeaningNet: []
  };

  let asText = JSON.stringify(report, null, 2);
  let i = 0;
  while (asText.length < targetKb * 1024 && i < 2500) {
    const frame = frames[i % frames.length] || { theme: "meaning", probability: 0.5 };
    report.neuralMeaningNet.push({
      node: i + 1,
      anchorTheme: frame.theme,
      confidence: frame.probability,
      futureForecast: "disabled_by_policy",
      conjecture: "Layered ethical reading: immediate action, restoration path, and covenant scope."
    });
    i += 1;
    asText = JSON.stringify(report, null, 2);
  }

  deepReportBox.value = `${asText}\n\n${noFuturePolicyText}`;
}

function summarizeBook(bookName) {
  const docs = state.docs.filter((d) => d.book === bookName);
  const text = docs.map((d) => d.text).join(" ");
  const vec = textToThemeVector(text);
  const topThemes = Object.keys(themeVectors)
    .map((name, idx) => ({ name, weight: vec[idx] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((x) => `${x.name}(${x.weight})`)
    .join(", ");

  const chapterCount = uniqueSorted(docs.map((d) => d.chapter)).length;
  return `${bookName}\nChapters: ${chapterCount}\nTop themes: ${topThemes}`;
}

function buildBookSummaries() {
  const books = uniqueSorted(filteredDocs().map((d) => d.book));
  if (!books.length) {
    deepReportBox.value = "No books available under current filters.";
    return;
  }

  const summaries = books.slice(0, 40).map((b) => summarizeBook(b)).join("\n\n");
  deepReportBox.value =
    `${summaries}\n\n` +
    `Combined summary: the selected corpus highlights justice, mercy, repentance, and worship language across traditions.\n\n` +
    `${noFuturePolicyText}`;
}

function compareBooks() {
  const a = compareBookA.value;
  const b = compareBookB.value;
  if (!a || !b) {
    compareBox.value = "Select both books first.";
    return;
  }

  const textA = state.docs.filter((d) => d.book === a).map((d) => d.text).join(" ");
  const textB = state.docs.filter((d) => d.book === b).map((d) => d.text).join(" ");

  if (!textA || !textB) {
    compareBox.value = "Could not build comparison from current loaded corpus.";
    return;
  }

  const vecA = textToThemeVector(textA);
  const vecB = textToThemeVector(textB);

  const justiceA = vecA[0] + vecA[5] * 0.4;
  const justiceB = vecB[0] + vecB[5] * 0.4;
  const mercyA = vecA[1] + vecA[6] * 0.25;
  const mercyB = vecB[1] + vecB[6] * 0.25;

  const topA = topKeywordsFromText(textA, 10);
  const topB = topKeywordsFromText(textB, 10);
  const overlap = topA
    .map((x) => x.split("(")[0])
    .filter((word) => topB.some((y) => y.startsWith(`${word}(`)));

  const annotationContext = [
    { label: "Search Annotation", value: searchAnnotation.value },
    { label: "Deep Annotation", value: deepAnnotation.value },
    { label: "Compare Annotation", value: compareAnnotation.value },
    { label: "Rendered Annotation Summary", value: annotationSummaryBox.value }
  ]
    .map((item) => ({
      label: item.label,
      value: String(item.value || "").trim()
    }))
    .filter((item) => item.value)
    .slice(0, 4)
    .map((item) => `${item.label}: ${item.value.slice(0, 900)}`)
    .join("\n\n");

  compareBox.value =
    `Book A: ${a}\njustice=${justiceA.toFixed(2)} | forgiveness=${mercyA.toFixed(2)}\n\n` +
    `Book B: ${b}\njustice=${justiceB.toFixed(2)} | forgiveness=${mercyB.toFixed(2)}\n\n` +
    `Book A keyword profile: ${topA.join(", ") || "n/a"}\n` +
    `Book B keyword profile: ${topB.join(", ") || "n/a"}\n` +
    `Shared keyword profile: ${overlap.join(", ") || "none"}\n\n` +
    "Comparison interpretation:\n" +
    "- Track where both books agree on justice, mercy, repentance, and covenant obligations.\n" +
    "- Note where one book pushes warning/judgment language while the other emphasizes restoration language.\n" +
    "- Use annotations and summary context as a lens, but keep chapter text as primary authority.\n\n" +
    `${annotationContext ? `Annotation and summary context:\n${annotationContext}\n\n` : ""}` +
    "Reasoning path: preserve proportional justice, reject revenge, prioritize repair and mercy where repentance is present.\n\n" +
    `${noFuturePolicyText}`;
}

async function playTextBundle(parts) {
  const text = parts.map((p) => String(p || "").trim()).filter(Boolean).join("\n\n");
  if (!text) {
    writeStatus("Nothing to play.");
    return;
  }
  writeStatus("Speaking selected output...");
  await say(text);
  writeStatus("Playback complete.");
}

function refreshAnnotationFeed() {
  if (!state.communityAnnotations.length) {
    annotationFeedBox.value = "No community annotations yet.";
    return;
  }
  annotationFeedBox.value = state.communityAnnotations
    .slice()
    .reverse()
    .map((x, idx) => `${idx + 1}. ${x.user}\n${x.text}`)
    .join("\n\n");
}

function addCommunityAnnotation() {
  const user = (annotUserInput.value || "").trim();
  const text = (annotTextInput.value || "").trim();

  if (!user) {
    annotationFeedBox.value = "Username is required.";
    return;
  }
  if (user.length > 35) {
    annotationFeedBox.value = "Username too long (max 35 characters).";
    return;
  }
  if (!text) {
    annotationFeedBox.value = "Annotation text is required.";
    return;
  }
  if (text.length > 2400) {
    annotationFeedBox.value = "Annotation too long (max 2400 characters).";
    return;
  }

  state.communityAnnotations.push({ user, text, createdAt: Date.now() });
  annotTextInput.value = "";
  refreshAnnotationFeed();
}

function resetEphemeralAnnotationState() {
  searchAnnotation.value = "";
  deepAnnotation.value = "";
  compareAnnotation.value = "";
  annotUserInput.value = "";
  annotTextInput.value = "";
  annotationSummaryBox.value = "No rendered summary yet.";
  if (annotationHistoryQuery) {
    annotationHistoryQuery.value = "";
  }
  if (annotationHistoryResultsBox) {
    annotationHistoryResultsBox.value = "No annotation history search run yet.";
  }
}

startBtn.addEventListener("click", startPrayer);
stopBtn.addEventListener("click", stopPrayer);
loadLibraryBtn.addEventListener("click", () => runTaskWithLoading("Loading selected library source...", async () => handleLoadLibraryButton(), false));
loadIntegratedBtn.addEventListener("click", loadIntegratedLibrary);
resetLibraryBtn.addEventListener("click", () => runTaskWithLoading("Resetting to starter library...", async () => loadStarterLibrary(), false));
searchBtn.addEventListener("click", () => runTaskWithLoading("Searching scripture library...", async () => runSearch(), true));
meaningsBtn.addEventListener("click", () => runTaskWithLoading("Loading term meanings...", async () => explainTermsOnly(), true));
sinLookupBtn.addEventListener("click", () => runTaskWithLoading("Loading sin lookup...", async () => runSinLookup(), true));
askLlmBtn.addEventListener("click", () => runTaskWithLoading("Running mini LLM search...", async () => askMiniLlm(), true));
deepReportBtn.addEventListener("click", () => runTaskWithLoading("Building deep report...", async () => buildDeepReport(), true));
bookSummaryBtn.addEventListener("click", () => runTaskWithLoading("Building book summaries...", async () => buildBookSummaries(), true));
compareBtn.addEventListener("click", () => runTaskWithLoading("Comparing books with context...", async () => compareBooks(), true));
playSearchBtn.addEventListener("click", () => playTextBundle([resultsBox.value, searchAnnotation.value]));
playDeepBtn.addEventListener("click", () => playTextBundle([deepReportBox.value, deepAnnotation.value]));
playCompareBtn.addEventListener("click", () => playTextBundle([compareBox.value, compareAnnotation.value]));
addAnnotationBtn.addEventListener("click", addCommunityAnnotation);
playAnnotationFeedBtn.addEventListener("click", () => playTextBundle([annotationFeedBox.value]));
searchAnnotationHistoryBtn.addEventListener("click", searchAllAnnotationHistory);
renderSummaryBtn.addEventListener("click", () => runTaskWithLoading("Rendering relative annotation summary...", async () => renderRelativeAnnotationSummary(), false));
chooseReadBtn.addEventListener("click", () => {
  const selected = chapterReadSelect.value;
  if (selected) {
    openFullChapter(selected);
  }
});
openChapterBtn.addEventListener("click", () => {
  const selected = chapterReadSelect.value;
  if (selected) {
    openFullChapter(selected);
  }
});

window.addEventListener("beforeunload", () => {
  speech.cancel();
});

window.addEventListener("pageshow", (event) => {
  // Some browsers restore form text from page session history even with cache-busting.
  if (event.persisted) {
    resetEphemeralAnnotationState();
  }
});

resetEphemeralAnnotationState();
refreshAnnotationFeed();
renderReferenceButtons(resultReferencesBox, []);
renderReferenceButtons(aiReferencesBox, []);
libraryStatusBox.value = "Starter corpus is seeded. Click a search button to build chapter previews.";
writeStatus("Ready.");
if (relativeAnnotationsValue && relativeAnnotationsInput) {
  relativeAnnotationsValue.textContent = `${relativeAnnotationsInput.value}% relative annotations`;
  relativeAnnotationsInput.addEventListener("input", () => {
    relativeAnnotationsValue.textContent = `${relativeAnnotationsInput.value}% relative annotations`;
  });
}
if (integratedSourceSelect) {
  integratedSourceSelect.addEventListener("change", () => {
    const selectedPath = String(integratedSourceSelect.value || "").trim();
    if (!selectedPath) {
      state.activeIntegratedSource = "";
      return;
    }
    updateLibraryStatus(
      `Selected integrated source: ${integratedLabelFromPath(selectedPath)}. ` +
      "Click Load Integrated Library to load only this file."
    );
  });
}
ensureIntegratedCatalog().catch((err) => {
  updateLibraryStatus(`Integrated source manifest unavailable until server access is ready: ${String(err.message || err)}`);
});
setLoadingState(false);
