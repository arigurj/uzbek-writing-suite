// Uzbek Writing Suite — Dictionary Modal
import { App, Modal, Notice } from 'obsidian';
import { SpellChecker } from './spellChecker';

export class DictionaryModal extends Modal {
  private spellChecker: SpellChecker;
  private wordList: HTMLDivElement;
  private searchInput: HTMLInputElement;
  private manifestDir: string;

  constructor(app: App, spellChecker: SpellChecker, manifestDir: string) {
    super(app);
    this.spellChecker = spellChecker;
    this.manifestDir = manifestDir;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('uzbek-suite-modal');

    contentEl.createEl('h2', { text: '📖 Uzbek Dictionary' });

    const searchDiv = contentEl.createDiv({ cls: 'uzbek-suite-search' });
    this.searchInput = searchDiv.createEl('input', {
      type: 'text',
      placeholder: 'Search words...',
    });
    this.searchInput.addEventListener('input', () => this.renderWords());

    const addDiv = contentEl.createDiv({ cls: 'uzbek-suite-add' });
    const addInput = addDiv.createEl('input', {
      type: 'text',
      placeholder: 'Add new word...',
    });
    const addBtn = addDiv.createEl('button', { text: 'Add' });
    addBtn.addEventListener('click', async () => {
      const word = addInput.value.trim();
      if (word) {
        this.spellChecker.addWord(word);
        await this.saveDictionary();
        this.renderWords();
        addInput.value = '';
        new Notice(`Added "${word}"`);
      }
    });

    this.wordList = contentEl.createDiv({ cls: 'uzbek-suite-wordlist' });
    this.renderWords();

    const exportBtn = contentEl.createEl('button', { text: '📋 Export to Clipboard' });
    exportBtn.addEventListener('click', () => this.exportToClipboard());
  }

  private renderWords(): void {
    this.wordList.empty();
    const search = this.searchInput.value.toLowerCase();
    const words = this.spellChecker.getWords()
      .filter((w) => !search || w.includes(search));

    const grid = this.wordList.createDiv({ cls: 'uzbek-suite-grid' });
    for (const word of words) {
      const item = grid.createDiv({ cls: 'uzbek-suite-word-item' });
      item.createSpan({ text: word });
      const delBtn = item.createEl('button', { text: '×', cls: 'uzbek-suite-del' });
      delBtn.addEventListener('click', async () => {
        this.spellChecker.removeWord(word);
        await this.saveDictionary();
        this.renderWords();
      });
    }
  }

  private async saveDictionary(): Promise<void> {
    const adapter = this.app.vault.adapter;
    const fullPath = this.manifestDir + '/uzbek-dictionary.md';
    const words = this.spellChecker.getWords();
    await adapter.write(fullPath, '# Uzbek Dictionary\n\n' + words.join('\n'));
  }

  private async exportToClipboard(): Promise<void> {
    const words = this.spellChecker.getWords();
    await navigator.clipboard.writeText(words.join('\n'));
    new Notice(`Copied ${words.length} words to clipboard!`);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
