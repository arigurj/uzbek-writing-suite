// Uzbek Writing Suite — Spell Checker with Editor Highlighting
import { Plugin, Editor, MarkdownView, Notice } from 'obsidian';

export interface SpellCheckResult {
  word: string;
  line: number;
  col: number;
  suggestions: string[];
}

export class SpellChecker {
  private plugin: Plugin;
  private dictionary: Set<string> = new Set();
  private dictionaryPath: string;
  private enabled: boolean = true;

  constructor(plugin: Plugin, dictionaryPath: string = 'uzbek-dictionary.md') {
    this.plugin = plugin;
    this.dictionaryPath = dictionaryPath;
  }

  async loadDictionary(): Promise<void> {
    const adapter = this.plugin.app.vault.adapter;
    const fullPath = this.plugin.manifest.dir + '/' + this.dictionaryPath;
    
    try {
      if (await adapter.exists(fullPath)) {
        const content = await adapter.read(fullPath);
        this.parseDictionary(content);
      } else {
        await this.createDefaultDictionary();
      }
    } catch (e) {
      console.error('Uzbek Writing Suite: Failed to load dictionary', e);
    }
  }

  private parseDictionary(content: string): void {
    this.dictionary.clear();
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) continue;
      const word = trimmed.replace(/^[-*]\s*/, '').replace(/\s*\(.*\)$/, '').trim();
      if (word) {
        this.dictionary.add(word.toLowerCase());
        this.dictionary.add(word.toLowerCase().replace(/ʻ/g, '').replace(/'/g, ''));
      }
    }
  }

  private async createDefaultDictionary(): Promise<void> {
    const defaultWords = `# Uzbek Dictionary
va bu men sen u biz ular
qanday nima nega qachon qayerda kim narsa
hammasi hamma yaxshi yomon katta kichik
yangi eski uzun qisqa issiq sovuq
yorqin qorongʻi ochiq yopiq tez sekin
oson qiyin qimmat arzon
meni seni uni bizni ularni
menga senga unga bizga ularga
menda sendaunda bizda ularda
mendan sendan undan bizdan ulardan
borish kelish qolish olish berish qarash
oʻqish yozish ishlash yurish yugurish
sakrash uchish suzish qurish yigʻish
gapirish tushunish bilish xohlish kerak
mumkin majbur yaxshimoq yemoq ichmoq
koʻrmoq eshitmoq bilmoq oʻylamoq qilmoq
kitob maktab oʻquvchi oʻqituvchi uy xona
stol stul eshik deraza tom devor pol
yulduz quyosh oy yer osmon daryo koʻl
togʻ daraxt gul meva sabzavot goʻsht non
suv choy shakar tuz koʻz quloq burun
ogʻiz tish qoʻl oyoq bosh yuz soch
yurak miya asab sogʻlik kasallik dori
shifokor shifoxona yosh qari yigit qiz
bola oʻgʻil ota ona aka uka opa singil
bobo buvi togʻa amaki xola
qizil yashil koʻk sariq oq qora
chiroyli qoʻrqinchli shirin nordon achchiq
tuzli yumshoq qattiq ogʻil yengil
keng tor chuqur sayoz baland past
old orqa oʻng chap ichki tashqi
`;

    const adapter = this.plugin.app.vault.adapter;
    const fullPath = this.plugin.manifest.dir + '/' + this.dictionaryPath;
    try {
      await adapter.write(fullPath, defaultWords);
      this.parseDictionary(defaultWords);
    } catch (e) {
      console.error('Uzbek Writing Suite: Failed to create default dictionary', e);
    }
  }

  isCorrect(word: string): boolean {
    const lower = word.toLowerCase();
    return this.dictionary.has(lower) || 
           this.dictionary.has(lower.replace(/ʻ/g, '').replace(/'/g, ''));
  }

  getSuggestions(word: string): string[] {
    const suggestions: string[] = [];
    const lower = word.toLowerCase();
    for (const dictWord of this.dictionary) {
      if (this.levenshteinDistance(lower, dictWord) <= 2) {
        suggestions.push(dictWord);
      }
      if (suggestions.length >= 5) break;
    }
    return suggestions;
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  checkText(text: string): SpellCheckResult[] {
    const results: SpellCheckResult[] = [];
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const words = lines[i].match(/[a-zA-ZҒғЎўҲҳҚқШшЧчНнʻ']+/g) || [];
      let col = 0;
      for (const word of words) {
        col = lines[i].indexOf(word, col);
        if (!this.isCorrect(word)) {
          results.push({
            word,
            line: i + 1,
            col: col + 1,
            suggestions: this.getSuggestions(word),
          });
        }
        col += word.length;
      }
    }
    return results;
  }

  checkWordAtPosition(text: string, pos: number): { word: string; from: number; to: number; isCorrect: boolean; suggestions: string[] } | null {
    // Find word boundaries
    let start = pos;
    while (start > 0 && /[a-zA-ZҒғЎўҲҳҚқШшЧчНнʻ'\-]/.test(text[start - 1])) {
      start--;
    }
    let end = pos;
    while (end < text.length && /[a-zA-ZҒғЎўҲҳҚқШшЧчНнʻ'\-]/.test(text[end])) {
      end++;
    }
    
    if (start === end) return null;
    
    const word = text.substring(start, end);
    const correct = this.isCorrect(word);
    const suggestions = correct ? [] : this.getSuggestions(word);
    
    return { word, from: start, to: end, isCorrect: correct, suggestions };
  }

  addWord(word: string): void {
    this.dictionary.add(word.toLowerCase());
  }

  removeWord(word: string): void {
    this.dictionary.delete(word.toLowerCase());
  }

  get size(): number {
    return this.dictionary.size;
  }

  getWords(): string[] {
    return Array.from(this.dictionary).sort();
  }

  getDictionary(): Set<string> {
    return this.dictionary;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  get isEnabled(): boolean {
    return this.enabled;
  }
}
