// Uzbek Writing Suite — Main Plugin Entry Point
import { App, Editor, Plugin, MarkdownView, Menu, PluginSettingTab, Setting } from 'obsidian';
import { SpellChecker } from './spellChecker';
import { QuoteManager } from './quotes';
import { registerCommands, setupContextMenu } from './commands';
import { DictionaryModal } from './dictionaryModal';
import { QuotesModal } from './quotesModal';
import { DEFAULT_SETTINGS, UzbekSuiteSettings } from './settings';

export default class UzbekWritingSuitePlugin extends Plugin {
  settings: UzbekSuiteSettings = DEFAULT_SETTINGS;
  spellChecker!: SpellChecker;
  quoteManager!: QuoteManager;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.spellChecker = new SpellChecker(this, this.settings.dictionaryPath);
    this.spellChecker.setEnabled(this.settings.enableSpellCheck);
    await this.spellChecker.loadDictionary();

    this.quoteManager = new QuoteManager();
    await this.loadQuotes();

    registerCommands(this, this.spellChecker, this.quoteManager);

    if (this.settings.enableQuotePopup) {
      window.setTimeout((): void => {
        const quote = this.quoteManager.getRandomQuote();
        if (quote) {
          const popup = activeDocument.createElement('div');
          popup.className = 'uzbek-suite-popup';
          
          const closeBtn = activeDocument.createElement('button');
          closeBtn.className = 'close-btn';
          closeBtn.textContent = '×';
          popup.appendChild(closeBtn);
          
          const textEl = activeDocument.createElement('div');
          textEl.className = 'quote-text';
          textEl.textContent = quote.text;
          popup.appendChild(textEl);
          
          const authorEl = activeDocument.createElement('div');
          authorEl.className = 'quote-author';
          authorEl.textContent = `— ${quote.author}`;
          popup.appendChild(authorEl);
          
          if (quote.source) {
            const sourceEl = activeDocument.createElement('div');
            sourceEl.className = 'quote-source';
            sourceEl.textContent = quote.source;
            popup.appendChild(sourceEl);
          }
          
          document.body.appendChild(popup);
          closeBtn.addEventListener('click', (): void => popup.remove());
          window.setTimeout((): void => popup.remove(), 30000);
        }
      }, this.settings.popupDelay);
    }

    this.registerEvent(this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor, view: MarkdownView | undefined): void => {
      setupContextMenu(menu, this.spellChecker, editor, view);
    }));

    this.addSettingTab(new UzbekSuiteSettingTab(this.app, this));
  }

  onunload(): void {
    // Cleanup
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  async loadQuotes(): Promise<void> {
    const adapter = this.app.vault.adapter;
    const fullPath = (this.manifest.dir ?? '') + '/' + this.settings.quotePath;
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
    } catch (e: unknown) {
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

    new Setting(containerEl).setHeading().setName('Uzbek Writing Suite');

    new Setting(containerEl)
      .setName('Enable spell checker')
      .setDesc('Check spelling and allow spell check commands')
      .addToggle((toggle): void => {
        toggle.setValue(this.plugin.settings.enableSpellCheck);
        toggle.onChange(async (value: boolean): Promise<void> => {
          this.plugin.settings.enableSpellCheck = value;
          this.plugin.spellChecker.setEnabled(value);
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Show quote on startup')
      .setDesc('Display popup with Uzbek quote when Obsidian starts')
      .addToggle((toggle): void => {
        toggle.setValue(this.plugin.settings.enableQuotePopup);
        toggle.onChange(async (value: boolean): Promise<void> => {
          this.plugin.settings.enableQuotePopup = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Popup delay (ms)')
      .setDesc('Delay before showing quote popup')
      .addText((text): void => {
        text.setPlaceholder('2000');
        text.setValue(String(this.plugin.settings.popupDelay));
        text.onChange(async (value: string): Promise<void> => {
          const num = parseInt(value);
          if (!isNaN(num)) {
            this.plugin.settings.popupDelay = num;
            await this.plugin.saveSettings();
          }
        });
      });

    new Setting(containerEl)
      .setName('Dictionary path')
      .setDesc('Path to dictionary file (relative to plugin folder)')
      .addText((text): void => {
        text.setPlaceholder('uzbek-dictionary.md');
        text.setValue(this.plugin.settings.dictionaryPath);
        text.onChange(async (value: string): Promise<void> => {
          this.plugin.settings.dictionaryPath = value;
          await this.plugin.saveSettings();
          await this.plugin.spellChecker.loadDictionary();
        });
      });

    new Setting(containerEl)
      .setName('Quote collection path')
      .setDesc('Path to quote file (relative to plugin folder)')
      .addText((text): void => {
        text.setPlaceholder('uzbek-quotes.md');
        text.setValue(this.plugin.settings.quotePath);
        text.onChange(async (value: string): Promise<void> => {
          this.plugin.settings.quotePath = value;
          await this.plugin.saveSettings();
          await this.plugin.loadQuotes();
        });
      });
  }
}
