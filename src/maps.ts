// Uzbek Writing Suite — Complete Conversion Maps
// All IPA codepoints verified with explicit \u escapes

export function normalizeApostrophes(text: string): string {
  return text
    .replace(/[\u2019\u2018\u0027]/g, '\u02BB')
    .replace(/g\u02BB/gi, (m) => m === 'G\u02BB' ? 'G\u02BB' : 'g\u02BB')
    .replace(/o\u02BB/gi, (m) => m === 'O\u02BB' ? 'O\u02BB' : 'o\u02BB');
}

// =============================================================================
// LATIN → CYRILLIC
// =============================================================================
export const latinToCyrillic: [string, string][] = [
  ['g\u02BB', '\u0493'], ['G\u02BB', '\u0492'],
  ['o\u02BB', '\u045E'], ['O\u02BB', '\u040E'],
  ['sh', '\u0448'], ['Sh', '\u0428'], ['SH', '\u0428'],
  ['ch', '\u0447'], ['Ch', '\u0427'], ['CH', '\u0427'],
  ['ng', '\u043D\u0433'], ['Ng', '\u041D\u0433'], ['NG', '\u041D\u0433'],
  ['a', '\u0430'], ['A', '\u0410'], ['b', '\u0431'], ['B', '\u0411'],
  ['d', '\u0434'], ['D', '\u0414'], ['e', '\u0435'], ['E', '\u0415'],
  ['f', '\u0444'], ['F', '\u0424'], ['g', '\u0433'], ['G', '\u0413'],
  ['h', '\u04B3'], ['H', '\u04B2'], ['i', '\u0438'], ['I', '\u0418'],
  ['j', '\u0436'], ['J', '\u0416'], ['k', '\u043A'], ['K', '\u041A'],
  ['l', '\u043B'], ['L', '\u041B'], ['m', '\u043C'], ['M', '\u041C'],
  ['n', '\u043D'], ['N', '\u041D'], ['o', '\u043E'], ['O', '\u041E'],
  ['p', '\u043F'], ['P', '\u041F'], ['q', '\u049B'], ['Q', '\u049A'],
  ['r', '\u0440'], ['R', '\u0420'], ['s', '\u0441'], ['S', '\u0421'],
  ['t', '\u0442'], ['T', '\u0422'], ['u', '\u0443'], ['U', '\u0423'],
  ['v', '\u0432'], ['V', '\u0412'], ['x', '\u0445'], ['X', '\u0425'],
  ['y', '\u0439'], ['Y', '\u0419'], ['z', '\u0437'], ['Z', '\u0417'],
];

// =============================================================================
// CYRILLIC → LATIN
// =============================================================================
export const cyrillicToLatin: [string, string][] = [
  ['\u0493', 'g\u02BB'], ['\u0492', 'G\u02BB'], ['\u045E', 'o\u02BB'], ['\u040E', 'O\u02BB'],
  ['\u0448', 'sh'], ['\u0428', 'Sh'], ['\u0447', 'ch'], ['\u0427', 'Ch'],
  ['\u043D\u0433', 'ng'], ['\u041D\u0433', 'Ng'],
  ['\u0430', 'a'], ['\u0410', 'A'], ['\u0431', 'b'], ['\u0411', 'B'],
  ['\u0432', 'v'], ['\u0412', 'V'], ['\u0433', 'g'], ['\u0413', 'G'],
  ['\u0434', 'd'], ['\u0414', 'D'], ['\u0435', 'e'], ['\u0415', 'E'],
  ['\u0444', 'f'], ['\u0424', 'F'], ['\u04B3', 'h'], ['\u04B2', 'H'],
  ['\u0438', 'i'], ['\u0418', 'I'], ['\u0436', 'j'], ['\u0416', 'J'],
  ['\u043A', 'k'], ['\u041A', 'K'], ['\u043B', 'l'], ['\u041B', 'L'],
  ['\u043C', 'm'], ['\u041C', 'M'], ['\u043D', 'n'], ['\u041D', 'N'],
  ['\u043E', 'o'], ['\u041E', 'O'], ['\u043F', 'p'], ['\u041F', 'P'],
  ['\u049B', 'q'], ['\u049A', 'Q'], ['\u0440', 'r'], ['\u0420', 'R'],
  ['\u0441', 's'], ['\u0421', 'S'], ['\u0442', 't'], ['\u0422', 'T'],
  ['\u0443', 'u'], ['\u0423', 'U'], ['\u0445', 'x'], ['\u0425', 'X'],
  ['\u0439', 'y'], ['\u0419', 'Y'], ['\u0437', 'z'], ['\u0417', 'Z'],
];

// =============================================================================
// CYRILLIC → IPA (all Cyrillic Uzbek letters → IPA)
// =============================================================================
export const cyrillicToIPA: [string, string][] = [
  // Digraphs first
  ['\u043D\u0433', '\u014B'], ['\u041D\u0433', '\u014B'],  // нг → ŋ
  // Special Uzbek consonants
  ['\u0493', '\u0281'], ['\u0492', '\u0281'],            // ғ → ʁ
  ['\u049B', 'q'], ['\u049A', 'q'],                    // қ → q
  ['\u04B3', 'h'], ['\u04B2', 'h'],                    // ҳ → h
  // Other consonants
  ['\u0445', 'x'], ['\u0425', 'x'],                    // х → x
  ['\u0436', 'd\u0292'], ['\u0416', 'd\u0292'],        // ж → dʒ
  ['\u0447', 't\u0283'], ['\u0427', 't\u0283'],        // ч → tʃ
  ['\u0448', '\u0283'], ['\u0428', '\u0283'],          // ш → ʃ
  // Vowels
  ['\u0430', '\u00E6'], ['\u0410', '\u00E6'],          // а → æ
  ['\u0435', 'e'], ['\u0415', 'e'],                    // е → e
  ['\u0438', 'i'], ['\u0418', 'i'],                    // и → i
  ['\u043E', 'o'], ['\u041E', 'o'],                    // о → o
  ['\u045E', '\u0254'], ['\u040E', '\u0254'],          // ў → ɔ
  ['\u0443', 'u'], ['\u0423', 'u'],                    // у → u
  // Basic consonants
  ['\u0431', 'b'], ['\u0411', 'b'],                    // б/Б → b
  ['\u0432', 'v'], ['\u0412', 'v'],                    // в/В → v
  ['\u0433', '\u0261'], ['\u0413', '\u0261'],          // г/Г → ɡ
  ['\u0434', 'd'], ['\u0414', 'd'],                    // д/Д → d
  ['\u0437', 'z'], ['\u0417', 'z'],                    // з/З → z
  ['\u0439', 'j'], ['\u0419', 'j'],                    // й/Й → j
  ['\u043A', 'k'], ['\u041A', 'k'],                    // к/К → k
  ['\u043B', 'l'], ['\u041B', 'l'],                    // л/Л → l
  ['\u043C', 'm'], ['\u041C', 'm'],                    // м/М → m
  ['\u043D', 'n'], ['\u041D', 'n'],                    // н/Н → n
  ['\u043F', 'p'], ['\u041F', 'p'],                    // п/П → p
  ['\u0440', 'r'], ['\u0420', 'r'],                    // р/Р → r
  ['\u0441', 's'], ['\u0421', 's'],                    // с/С → s
  ['\u0442', 't'], ['\u0422', 't'],                    // т/Т → t
  ['\u0444', 'f'], ['\u0424', 'f'],                    // ф/Ф → f
];

// =============================================================================
// IPA → CYRILLIC (reverse, with variants)
// =============================================================================
export const ipaToCyrillic: [string, string][] = [
  // Digraphs first (longest first)
  ['\u014B', '\u043D\u0433'],                          // ŋ → нг
  ['d\u0361\u0292', '\u0436'], ['d\u0292', '\u0436'], // d͡ʒ/dʒ → ж
  ['t\u0361\u0283', '\u0447'], ['t\u0283', '\u0447'], // t͡ʃ/tʃ → ч
  // Special Uzbek consonants
  ['\u0281', '\u0493'],                                // ʁ → ғ
  ['q', '\u049B'],                                    // q → қ
  ['h', '\u04B3'],                                    // h → ҳ
  ['x', '\u0445'],                                    // x → х
  ['\u0283', '\u0448'],                                // ʃ → ш
  // Vowels
  ['\u00E6', '\u0430'], ['\u00C6', '\u0410'],          // æ/Æ → а/А
  ['e', '\u0435'],                                    // e → е
  ['i', '\u0438'],                                    // i → и
  ['o', '\u043E'],                                    // o → о
  ['\u0254', '\u045E'], ['\u0186', '\u040E'],          // ɔ/Ɔ → ў/Ў
  ['u', '\u0443'],                                    // u → у
  // Basic consonants
  ['b', '\u0431'], ['v', '\u0432'], ['\u0261', '\u0433'], ['g', '\u0433'],
  ['d', '\u0434'], ['z', '\u0437'], ['j', '\u0439'], ['k', '\u043A'],
  ['l', '\u043B'], ['m', '\u043C'], ['n', '\u043D'], ['p', '\u043F'],
  ['r', '\u0440'], ['s', '\u0441'], ['t', '\u0442'], ['f', '\u0444'],
  // Uppercase
  ['B', '\u0411'], ['V', '\u0412'], ['G', '\u0413'], ['D', '\u0414'],
  ['Z', '\u0417'], ['K', '\u041A'], ['L', '\u041B'], ['M', '\u041C'],
  ['N', '\u041D'], ['P', '\u041F'], ['R', '\u0420'], ['S', '\u0421'],
  ['T', '\u0422'], ['F', '\u0424'],
];

// =============================================================================
// LATIN → IPA
// =============================================================================
export const latinToIPA: [string, string][] = [
  ['g\u02BB', '\u0281'], ['G\u02BB', '\u0281'],
  ['o\u02BB', '\u0254'], ['O\u02BB', '\u0254'],
  ['sh', '\u0283'], ['Sh', '\u0283'], ['SH', '\u0283'],
  ['ch', 't\u0283'], ['Ch', 't\u0283'], ['CH', 't\u0283'],
  ['ng', '\u014B'], ['Ng', '\u014B'], ['NG', '\u014B'],
  ['a', '\u00E6'], ['A', '\u00E6'], ['e', 'e'], ['E', 'e'],
  ['i', 'i'], ['I', 'i'], ['o', 'o'], ['O', 'o'],
  ['u', 'u'], ['U', 'u'],
  ['b', 'b'], ['B', 'B'], ['d', 'd'], ['D', 'D'],
  ['f', 'f'], ['F', 'F'], ['g', '\u0261'], ['G', '\u0261'],
  ['h', 'h'], ['H', 'h'], ['j', 'd\u0292'], ['J', 'd\u0292'],
  ['k', 'k'], ['K', 'K'], ['l', 'l'], ['L', 'L'],
  ['m', 'm'], ['M', 'M'], ['n', 'n'], ['N', 'N'],
  ['p', 'p'], ['P', 'P'], ['q', 'q'], ['Q', 'q'],
  ['r', 'r'], ['R', 'R'], ['s', 's'], ['S', 'S'],
  ['t', 't'], ['T', 'T'], ['v', 'v'], ['V', 'V'],
  ['x', 'x'], ['X', 'X'], ['y', 'j'], ['Y', 'j'],
  ['z', 'z'], ['Z', 'z'],
];

// =============================================================================
// IPA → LATIN (reverse, with variants)
// =============================================================================
export const ipaToLatin: [string, string][] = [
  // Digraphs first (longest first)
  ['\u0281', 'g\u02BB'],                              // ʁ → gʻ
  ['\u0254', 'o\u02BB'], ['\u0186', 'O\u02BB'],        // ɔ/Ɔ → oʻ/Oʻ
  ['\u0283', 'sh'],                                    // ʃ → sh
  ['t\u0361\u0283', 'ch'], ['t\u0283', 'ch'],         // t͡ʃ/tʃ → ch
  ['d\u0361\u0292', 'j'], ['d\u0292', 'j'],           // d͡ʒ/dʒ → j
  ['\u014B', 'ng'],                                    // ŋ → ng
  // Vowels
  ['\u00E6', 'a'], ['\u00C6', 'A'],                    // æ/Æ → a/A
  ['e', 'e'], ['i', 'i'], ['o', 'o'], ['u', 'u'],
  // Consonants
  ['b', 'b'], ['d', 'd'], ['f', 'f'], ['\u0261', 'g'], ['g', 'g'],
  ['h', 'h'], ['k', 'k'], ['l', 'l'], ['m', 'm'],
  ['n', 'n'], ['p', 'p'], ['q', 'q'], ['r', 'r'],
  ['s', 's'], ['t', 't'], ['v', 'v'], ['x', 'x'],
  ['j', 'y'], ['z', 'z'],
  // Uppercase
  ['B', 'B'], ['D', 'D'], ['F', 'F'], ['G', 'G'],
  ['H', 'H'], ['K', 'K'], ['L', 'L'], ['M', 'M'],
  ['N', 'N'], ['P', 'P'], ['Q', 'Q'], ['R', 'R'],
  ['S', 'S'], ['T', 'T'], ['V', 'V'], ['X', 'X'],
  ['Y', 'Y'], ['Z', 'Z'],
];

// =============================================================================
// Conversion helper
// =============================================================================
export function convertWithMap(text: string, map: [string, string][]): string {
  // Sort by key length descending (longest first)
  const sorted = [...map].sort((a, b) => b[0].length - a[0].length);
  let result = text;
  for (const [from, to] of sorted) {
    if (!from) continue;
    result = result.split(from).join(to);
  }
  return result;
}

// =============================================================================
// Two-way conversion functions
// =============================================================================
export function latinToCyrillicConvert(text: string): string {
  return convertWithMap(normalizeApostrophes(text), latinToCyrillic);
}

export function cyrillicToLatinConvert(text: string): string {
  return convertWithMap(text, cyrillicToLatin);
}

export function cyrillicToIPAConvert(text: string): string {
  return convertWithMap(text, cyrillicToIPA);
}

export function ipaToCyrillicConvert(text: string): string {
  return convertWithMap(text, ipaToCyrillic);
}

export function latinToIPAConvert(text: string): string {
  return convertWithMap(normalizeApostrophes(text), latinToIPA);
}

export function ipaToLatinConvert(text: string): string {
  return convertWithMap(text, ipaToLatin);
}

// =============================================================================
// Auto-detect and convert to all three
// =============================================================================
export interface ConversionResult {
  detected: 'cyrillic' | 'latin' | 'ipa' | 'unknown';
  cyrillic: string;
  latin: string;
  ipa: string;
}

export function autoConvertAll(text: string): ConversionResult {
  const normalized = normalizeApostrophes(text);
  const hasCyrillic = /[\u0493\u045E\u04B3\u049B\u0428\u0427]/.test(normalized);
  const hasIPA = /[\u0281\u0254\u0283\u014B\u00E6]/.test(normalized) || /[d\u0292t\u0283\u0261]/.test(normalized);
  const hasLatin = /[A-Za-z\u02BB']/.test(normalized);

  let detected: ConversionResult['detected'];
  if (hasIPA) detected = 'ipa';
  else if (hasCyrillic) detected = 'cyrillic';
  else if (hasLatin) detected = 'latin';
  else detected = 'unknown';

  switch (detected) {
    case 'cyrillic':
      return { detected, cyrillic: normalized, latin: cyrillicToLatinConvert(normalized), ipa: cyrillicToIPAConvert(normalized) };
    case 'latin':
      return { detected, cyrillic: latinToCyrillicConvert(normalized), latin: normalized, ipa: latinToIPAConvert(normalized) };
    case 'ipa':
      return { detected, cyrillic: ipaToCyrillicConvert(normalized), latin: ipaToLatinConvert(normalized), ipa: normalized };
    default:
      return { detected, cyrillic: normalized, latin: normalized, ipa: normalized };
  }
}

// =============================================================================
// Detection helpers
// =============================================================================
export function isCyrillic(text: string): boolean { return /[\u0410-\u042F\u0430-\u044F]/.test(text); }
export function isLatin(text: string): boolean { return (text.match(/[A-Za-z]/g) || []).length > (text.match(/[\u0410-\u042F\u0430-\u044F]/g) || []).length; }
export function isIPA(text: string): boolean { return /[\u0281\u0254\u0283\u014B\u00E6\u00C6\u0186\u0261d\u0292t\u0283]/.test(text); }

// =============================================================================
// CYCLE CONVERSION
// =============================================================================
export type ScriptType = 'cyrillic' | 'latin' | 'ipa';

export function detectScript(text: string): ScriptType {
  // Count unique Uzbek Cyrillic letters + all Cyrillic
  const cyrillicUnique = (text.match(/[\u0493\u045E\u04B3\u049B\u0428\u0427\u0436\u043D\u0433]/g) || []).length;
  const cyrillicAll = (text.match(/[\u0410-\u042F\u0430-\u044F]/g) || []).length;
  const cyrillicCount = Math.max(cyrillicUnique, cyrillicAll);
  
  // Count IPA-specific symbols
  const ipaCount = (text.match(/[\u0281\u0254\u0283\u014B\u00E6\u00C6\u0186\u040E]/g) || []).length +
                   (text.match(/[\u0261]/g) || []).length +
                   (text.match(/d\u0292|t\u0283|d\u0361\u0292|t\u0361\u0283/g) || []).length;
  
  // Count Latin letters
  const latinCount = (text.match(/[A-Za-z\u02BB]/g) || []).length;
  
  if (ipaCount > 0 && ipaCount >= latinCount) return 'ipa';
  if (cyrillicCount > 0 && cyrillicCount >= latinCount) return 'cyrillic';
  if (latinCount > 0) return 'latin';
  return 'cyrillic';
}

export function cycleConvert(text: string, direction: 'forward' | 'backward' = 'forward'): { result: string; from: ScriptType; to: ScriptType } {
  const script = detectScript(text);
  const order: ScriptType[] = ['cyrillic', 'latin', 'ipa'];
  const currentIdx = order.indexOf(script);
  
  // Normalize ALL mixed text to the detected script first
  let normalized: string;
  switch (script) {
    case 'cyrillic':
      // Convert any Latin and IPA chars to Cyrillic
      normalized = convertWithMap(normalizeApostrophes(text), latinToCyrillic);
      normalized = convertWithMap(normalized, ipaToCyrillic);
      break;
    case 'latin':
      // Convert any Cyrillic and IPA chars to Latin
      normalized = convertWithMap(text, cyrillicToLatin);
      normalized = convertWithMap(normalized, ipaToLatin);
      break;
    case 'ipa':
      // Convert any Cyrillic and Latin chars to IPA
      normalized = convertWithMap(text, cyrillicToIPA);
      normalized = convertWithMap(normalizeApostrophes(text), latinToIPA);
      break;
    default:
      normalized = text;
  }
  
  let nextIdx: number;
  if (direction === 'forward') {
    nextIdx = (currentIdx + 1) % 3;
  } else {
    nextIdx = (currentIdx + 2) % 3;
  }
  
  const to = order[nextIdx];
  
  // Convert from normalized script to target
  let result: string;
  switch (script) {
    case 'cyrillic':
      if (to === 'latin') result = cyrillicToLatinConvert(normalized);
      else if (to === 'ipa') result = cyrillicToIPAConvert(normalized);
      else result = normalized;
      break;
    case 'latin':
      if (to === 'ipa') result = latinToIPAConvert(normalized);
      else if (to === 'cyrillic') result = latinToCyrillicConvert(normalized);
      else result = normalized;
      break;
    case 'ipa':
      if (to === 'cyrillic') result = ipaToCyrillicConvert(normalized);
      else if (to === 'latin') result = ipaToLatinConvert(normalized);
      else result = normalized;
      break;
    default:
      result = normalized;
  }
  
  return { result, from: script, to };
}
