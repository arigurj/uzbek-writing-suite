// Uzbek Writing Suite — Quotes Modal (full viewer + editor)
import { App, Modal, Notice } from 'obsidian';
import { QuoteManager } from './quotes';

export class QuotesModal extends Modal {
  private quoteManager: QuoteManager;
  private quoteList: HTMLDivElement;
  private searchInput: HTMLInputElement;
  private manifestDir: string;

  constructor(app: App, quoteManager: QuoteManager, manifestDir: string) {
    super(app);
    this.quoteManager = quoteManager;
    this.manifestDir = manifestDir;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('uzbek-suite-modal');

    contentEl.createEl('h2', { text: '💬 Uzbek Quotes Collection' });

    const searchDiv = contentEl.createDiv({ cls: 'uzbek-suite-search' });
    this.searchInput = searchDiv.createEl('input', {
      type: 'text',
      placeholder: 'Search quotes...',
    });
    this.searchInput.addEventListener('input', () => this.renderQuotes());

    const addDiv = contentEl.createDiv({ cls: 'uzbek-suite-add-quote' });
    const quoteInput = addDiv.createEl('textarea', {
      placeholder: 'Enter quote text...',
    });
    const authorInput = addDiv.createEl('input', {
      type: 'text',
      placeholder: 'Author name',
    });
    const addBtn = addDiv.createEl('button', { text: 'Add Quote' });
    addBtn.addEventListener('click', async () => {
      const text = quoteInput.value.trim();
      const author = authorInput.value.trim();
      if (text && author) {
        this.quoteManager.addQuote({ text, author });
        await this.saveQuotes();
        this.renderQuotes();
        quoteInput.value = '';
        authorInput.value = '';
        new Notice(`Added quote by ${author}`);
      }
    });

    this.quoteList = contentEl.createDiv({ cls: 'uzbek-suite-quotelist' });
    this.renderQuotes();

    const exportBtn = contentEl.createEl('button', { text: '📋 Export to Clipboard' });
    exportBtn.addEventListener('click', () => this.exportToClipboard());
  }

  private renderQuotes(): void {
    this.quoteList.empty();
    const search = this.searchInput.value.toLowerCase();
    const quotes = this.quoteManager.getQuotes();
    const filtered = quotes
      .map((q, i) => ({ ...q, originalIndex: i }))
      .filter((q) => !search || q.text.toLowerCase().includes(search) || q.author.toLowerCase().includes(search));

    for (const q of filtered) {
      const card = this.quoteList.createDiv({ cls: 'uzbek-suite-quote-card' });
      card.createEl('blockquote', { text: q.text });
      card.createDiv({ cls: 'quote-author', text: `— ${q.author}` });
      const delBtn = card.createEl('button', { text: '×', cls: 'uzbek-suite-del' });
      delBtn.addEventListener('click', async () => {
        this.quoteManager.removeQuote(q.originalIndex);
        await this.saveQuotes();
        this.renderQuotes();
      });
    }
  }

  private async saveQuotes(): Promise<void> {
    const adapter = this.app.vault.adapter;
    const fullPath = this.manifestDir + '/uzbek-quotes.md';
    const quotes = this.quoteManager.getQuotes();
    const content = '# Uzbek Quotes Collection\n\n' + quotes.map((q) => `"${q.text}" — ${q.author}`).join('\n');
    await adapter.write(fullPath, content);
  }

  private async exportToClipboard(): Promise<void> {
    const quotes = this.quoteManager.getQuotes();
    const text = quotes.map((q) => `"${q.text}" — ${q.author}`).join('\n');
    await navigator.clipboard.writeText(text);
    new Notice(`Copied ${quotes.length} quotes to clipboard!`);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
