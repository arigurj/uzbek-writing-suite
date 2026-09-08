// Uzbek Writing Suite — Quotes Modal (full viewer + editor)
import { App, Modal, Notice } from 'obsidian';
import { QuoteManager } from './quotes';

export class QuotesModal extends Modal {
  private quoteManager: QuoteManager;
  private quoteList: HTMLDivElement;
  private searchInput: HTMLInputElement;

  constructor(app: App, quoteManager: QuoteManager) {
    super(app);
    this.quoteManager = quoteManager;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('uzbek-suite-modal');

    contentEl.createEl('h2', { text: '💬 Uzbek Quotes Collection' });

    // Search
    const searchDiv = contentEl.createDiv({ cls: 'uzbek-suite-search' });
    this.searchInput = searchDiv.createEl('input', {
      type: 'text',
      placeholder: 'Search quotes...',
    });
    this.searchInput.addEventListener('input', () => this.renderQuotes());

    // Add quote section
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

    // Quote list
    this.quoteList = contentEl.createDiv({ cls: 'uzbek-suite-quotelist' });
    this.renderQuotes();

    // Export button
    const exportBtn = contentEl.createEl('button', { text: '📋 Export to Clipboard' });
    exportBtn.addEventListener('click', () => this.exportToClipboard());
  }

  private renderQuotes() {
    this.quoteList.empty();
    const search = this.searchInput.value.toLowerCase();
    const quotes = this.quoteManager.getQuotes();
    const filtered = quotes
      .map((q, i) => ({ ...q, originalIndex: i }))
      .filter(q => !search || q.text.toLowerCase().includes(search) || q.author.toLowerCase().includes(search));

    for (const q of filtered) {
      const card = this.quoteList.createDiv({ cls: 'uzbek-suite-quote-card' });
      const textEl = card.createEl('blockquote', { text: q.text });
      const authorEl = card.createDiv({ cls: 'quote-author', text: `— ${q.author}` });
      const delBtn = card.createEl('button', { text: '×', cls: 'uzbek-suite-del' });
      delBtn.addEventListener('click', async () => {
        this.quoteManager.removeQuote(q.originalIndex);
        await this.saveQuotes();
        this.renderQuotes();
      });
    }
  }

  private async saveQuotes() {
    const adapter = this.app.vault.adapter;
    const manifestDir = (this.app as any).plugins?.plugins?.['uzbek-writing-suite']?.manifest?.dir;
    if (!manifestDir) return;
    const fullPath = manifestDir + '/uzbek-quotes.md';
    const quotes = this.quoteManager.getQuotes();
    const content = '# Uzbek Quotes Collection\n\n' + quotes.map(q => `"${q.text}" — ${q.author}`).join('\n');
    await adapter.write(fullPath, content);
  }

  private async exportToClipboard() {
    const quotes = this.quoteManager.getQuotes();
    const text = quotes.map(q => `"${q.text}" — ${q.author}`).join('\n');
    await navigator.clipboard.writeText(text);
    new Notice(`Copied ${quotes.length} quotes to clipboard!`);
  }

  onClose() {
    this.contentEl.empty();
  }
}
