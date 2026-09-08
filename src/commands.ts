// Uzbek Writing Suite — Commands
import { Editor, MarkdownView, Plugin, Notice, Menu } from 'obsidian';
import {
  cycleConvert,
  detectScript,
  autoConvertAll,
  cyrillicToIPAConvert,
  latinToIPAConvert,
  cyrillicToLatinConvert,
  latinToCyrillicConvert,
  ipaToCyrillicConvert,
  ipaToLatinConvert,
} from './convert';
import { SpellChecker } from './spellChecker';
import { QuoteManager } from './quotes';
import { DictionaryModal } from './dictionaryModal';
import { QuotesModal } from './quotesModal';

export function registerCommands(plugin: Plugin, spellChecker: SpellChecker, quoteManager: QuoteManager) {
  // === CYCLE CONVERSION ===

  plugin.addCommand({
    id: 'cycle-convert-forward',
    name: 'Cycle convert: Cyrillic → Latin → IPA → Cyrillic',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const selected = editor.getSelection();
      if (!selected) {
        new Notice('Select text first');
        return;
      }
      const { result, from, to } = cycleConvert(selected, 'forward');
      editor.replaceSelection(result);
      new Notice(`${from} → ${to}`);
    },
  });

  plugin.addCommand({
    id: 'cycle-convert-backward',
    name: 'Cycle convert: Cyrillic ← Latin ← IPA ← Cyrillic',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const selected = editor.getSelection();
      if (!selected) {
        new Notice('Select text first');
        return;
      }
      const { result, from, to } = cycleConvert(selected, 'backward');
      editor.replaceSelection(result);
      new Notice(`${from} → ${to}`);
    },
  });

  plugin.addCommand({
    id: 'auto-convert-all',
    name: 'Auto-detect: show all three scripts',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const selected = editor.getSelection();
      if (!selected) {
        new Notice('Select text first');
        return;
      }
      const result = autoConvertAll(selected);
      const msg = `Detected: ${result.detected}\nCyrillic: ${result.cyrillic}\nLatin: ${result.latin}\nIPA: ${result.ipa}`;
      new Notice(msg, 8000);
    },
  });

  // === Spell Check Commands ===

  plugin.addCommand({
    id: 'spell-check-document',
    name: 'Spell check current document',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const text = editor.getValue();
      const results = spellChecker.checkText(text);
      if (results.length === 0) {
        new Notice('No spelling errors found! ✓');
      } else {
        const list = results.map(r => `Line ${r.line}:${r.col} "${r.word}" → ${r.suggestions.join(', ') || '—'}`).join('\n');
        new Notice(`Found ${results.length} errors:\n${list}`, 10000);
      }
    },
  });

  plugin.addCommand({
    id: 'add-word-to-dictionary',
    name: 'Add word to dictionary',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const selected = editor.getSelection();
      if (selected) {
        spellChecker.addWord(selected);
        new Notice(`Added "${selected}" to dictionary (total: ${spellChecker.size})`);
      } else {
        new Notice('Select a word first');
      }
    },
  });

  // === Dictionary Modal ===

  plugin.addCommand({
    id: 'open-dictionary',
    name: 'Open dictionary',
    callback: () => {
      const modal = new DictionaryModal(plugin.app, spellChecker);
      modal.open();
    },
  });

  // === Quotes Modal ===

  plugin.addCommand({
    id: 'open-quotes',
    name: 'Open quotes collection',
    callback: () => {
      const modal = new QuotesModal(plugin.app, quoteManager);
      modal.open();
    },
  });

  // === Show Quote Popup ===

  plugin.addCommand({
    id: 'show-quote',
    name: 'Show quote of the day',
    callback: () => {
      showQuotePopup(quoteManager);
    },
  });

  // === Add New Quote ===

  plugin.addCommand({
    id: 'add-new-quote',
    name: 'Add new quote',
    editorCallback: (editor: Editor, _ctx: MarkdownView | any) => {
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const match = line.match(/^["«](.+?)["»]\s*[—–-]\s*(.+)$/);
      if (match) {
        quoteManager.addQuote({ text: match[1], author: match[2] });
        new Notice(`Added quote (${quoteManager.count} total)`);
      } else {
        new Notice('Put cursor on a line in format: "Quote text" — Author');
      }
    },
  });
}

function showQuotePopup(quoteManager: QuoteManager): void {
  const quote = quoteManager.getRandomQuote();
  const popup = document.createElement('div');
  popup.className = 'uzbek-suite-popup';
  popup.innerHTML = `
    <button class="close-btn">×</button>
    <div class="quote-text">${quote.text}</div>
    <div class="quote-author">— ${quote.author}</div>
    ${quote.source ? `<div class="quote-source">${quote.source}</div>` : ''}
  `;
  document.body.appendChild(popup);
  popup.querySelector('.close-btn')?.addEventListener('click', () => popup.remove());
  setTimeout(() => popup.remove(), 30000);
}

export function setupContextMenu(menu: Menu, spellChecker: SpellChecker, editor: Editor, view: MarkdownView | any): void {
  const selected = editor.getSelection();
  
  // Add spell check suggestions for selected text
  if (selected) {
    const word = selected.trim();
    if (!spellChecker.isCorrect(word)) {
      const suggestions = spellChecker.getSuggestions(word);
      if (suggestions.length > 0) {
        menu.addItem((item) => {
          item.setTitle(`Uzbek: Replace "${word}" with "${suggestions[0]}"`)
            .setIcon('spell-check')
            .onClick(() => {
              editor.replaceSelection(suggestions[0]);
            });
        });
      }
    }
  }
  
  if (!selected) return;

  menu.addItem((item) => {
    item.setTitle('Uzbek: Add to dictionary')
      .setIcon('book-plus')
      .onClick(() => {
        spellChecker.addWord(selected);
        new Notice(`Added "${selected}" to dictionary`);
      });
  });

  menu.addItem((item) => {
    item.setTitle('Uzbek: Cycle convert →')
      .setIcon('arrow-right-left')
      .onClick(() => {
        const { result, from, to } = cycleConvert(selected, 'forward');
        editor.replaceSelection(result);
        new Notice(`${from} → ${to}`);
      });
  });

  menu.addItem((item) => {
    item.setTitle('Uzbek: Cycle convert ←')
      .setIcon('arrow-left-right')
      .onClick(() => {
        const { result, from, to } = cycleConvert(selected, 'backward');
        editor.replaceSelection(result);
        new Notice(`${from} → ${to}`);
      });
  });
}
