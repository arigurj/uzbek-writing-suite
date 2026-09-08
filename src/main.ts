// Uzbek Writing Suite — Main Plugin Entry Point
import { App, Editor, Plugin, MarkdownView, Menu, Notice, PluginSettingTab, Setting, TFile } from 'obsidian';
import { SpellChecker } from './spellChecker';
import { QuoteManager } from './quotes';
import { registerCommands, setupContextMenu } from './commands';
import { DictionaryModal } from './dictionaryModal';
import { QuotesModal } from './quotesModal';
import { DEFAULT_SETTINGS, UzbekSuiteSettings } from './settings';

export default class UzbekWritingSuitePlugin extends Plugin {
  settings: UzbekSuiteSettings;
  spellChecker: SpellChecker;
  quoteManager: QuoteManager;

  async onload() {
    await this.loadSettings();

    this.spellChecker = new SpellChecker(this, this.settings.dictionaryPath);
    this.spellChecker.setEnabled(this.settings.enableSpellCheck);
    await this.spellChecker.loadDictionary();

    this.quoteManager = new QuoteManager();
    await this.loadQuotes();

    registerCommands(this, this.spellChecker, this.quoteManager);

    // Show quote popup on startup
    if (this.settings.enableQuotePopup) {
      setTimeout(() => {
        const quote = this.quoteManager.getRandomQuote();
        if (quote) {
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
      }, this.settings.popupDelay);
    }

    // Setup context menu for spell checker
    this.registerEvent(this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor, view: MarkdownView | any) => {
      setupContextMenu(menu, this.spellChecker, editor, view);
    }));

    // Add settings tab
    this.addSettingTab(new UzbekSuiteSettingTab(this.app, this));

    console.log('Uzbek Writing Suite loaded');
  }

  onunload() {
    console.log('Uzbek Writing Suite unloaded');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async loadQuotes() {
    const adapter = this.app.vault.adapter;
    const fullPath = (this.manifest.dir || '') + '/' + this.settings.quotePath;
    try {
      if (await adapter.exists(fullPath)) {
        const content = await adapter.read(fullPath);
        this.quoteManager.loadFromText(content);
      } else {
        const defaultContent = `# O'zbek Klassiklaridan Sitatalar
# Format: "Matn" — Muallif
# # bilan boshlangan satrlar izohdir

"Yoshning hayoti — hayotning eng go'zal davridir." — Abdulhamid Cholpon
"Kitob — odammga eng yahsi do'stdir." — Abdulhamid Cholpon
"Ilm — nurki, oqillik — yog'duki." — Alisher Navoiy
"Ko'p o'qigan ko'p bilur." — Alisher Navoiy
"Hayot — maktab, unga har kangi yanggi dars." — Abdulla Qodiriy
"Til — millatning yuragidir." — Abdulla Qodiriy
"O'zbek xalqi tarixi — buyuk tarixdir." — Asqad Muxtor
"Yozuvchining vazifasi — xalq uchun yozish." — Asqad Muxtor
"Go'zallik — haqiqatdadir." — Abdulhamid Cholpon
"Mehnat — hayotning asosidir." — Hamza Hakimzoda Niyoziy
"Sog'liq — eng katta boyliqdir." — Hamza Hakimzoda Niyoziy
"Bolalar — kelajakning himoyachilari." — Zulfiya
"O'zbek tili — buyuk tildir." — Abdulla Aripov
"Shaning haqiqati — mehnatdadir." — G'afur G'ulom
"Hayotda eng muhimi — inson bo'lishdir." — G'afur G'ulom
"Kitob o'qish — ruhni tovushdir." — Utkir Hoshimov
"Adabiyot — xalqning ruhidir." — Utkir Hoshimov
"O'zbek xalqi — mehnatsevar xalq." — Shuhrat
"Ilmli odam — yorug'likda." — Shuhrat
"Tarbiya — hayotning asosidir." — Zulfiya
"Ona — hayotning birinchi o'qituvchisi." — O'zbek xalq maqollari
"Do'stlik — qimmatli narsa." — O'zbek xalq maqollari
`;
        await adapter.write(fullPath, defaultContent);
        this.quoteManager.loadFromText(defaultContent);
      }
    } catch (e) {
      console.error('Uzbek Writing Suite: Failed to load quotes', e);
    }
  }
}

class UzbekSuiteSettingTab extends PluginSettingTab {
  plugin: UzbekWritingSuitePlugin;

  constructor(app: App, plugin: UzbekWritingSuitePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Uzbek Writing Suite' });

    new Setting(containerEl)
      .setName('Enable spell checker')
      .setDesc('Check spelling and allow spell check commands')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableSpellCheck)
        .onChange(async (value) => {
          this.plugin.settings.enableSpellCheck = value;
          this.plugin.spellChecker.setEnabled(value);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Show quote on startup')
      .setDesc('Display popup with Uzbek quote when Obsidian starts')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableQuotePopup)
        .onChange(async (value) => {
          this.plugin.settings.enableQuotePopup = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Popup delay (ms)')
      .setDesc('Delay before showing quote popup')
      .addText(text => text
        .setPlaceholder('2000')
        .setValue(String(this.plugin.settings.popupDelay))
        .onChange(async (value) => {
          const num = parseInt(value);
          if (!isNaN(num)) {
            this.plugin.settings.popupDelay = num;
            await this.plugin.saveSettings();
          }
        }));

    new Setting(containerEl)
      .setName('Dictionary path')
      .setDesc('Path to dictionary file (relative to plugin folder)')
      .addText(text => text
        .setPlaceholder('uzbek-dictionary.md')
        .setValue(this.plugin.settings.dictionaryPath)
        .onChange(async (value) => {
          this.plugin.settings.dictionaryPath = value;
          await this.plugin.saveSettings();
          await this.plugin.spellChecker.loadDictionary();
        }));

    new Setting(containerEl)
      .setName('Quote collection path')
      .setDesc('Path to quote file (relative to plugin folder)')
      .addText(text => text
        .setPlaceholder('uzbek-quotes.md')
        .setValue(this.plugin.settings.quotePath)
        .onChange(async (value) => {
          this.plugin.settings.quotePath = value;
          await this.plugin.saveSettings();
          await this.plugin.loadQuotes();
        }));
  }
}
