# Uzbek Writing Suite — Obsidian Plugin

> Полный набор инструментов для работы с узбекским письмом в Obsidian.

English | [O'zbek](#o-zbekcha) | [Русский](#русский)

## Features

### 🔤 Script Converter
- **Latin ↔ Cyrillic** — official Uzbek alphabet conversion
- **Cyrillic ↔ Phonetic** — pronunciation guide conversion
- **Auto-detect** — automatically detects script and converts
- **Digraph-aware** — correctly handles `gʻ`, `oʻ`, `sh`, `ch`, `ng`

### 📝 Spell Checker
- Built-in dictionary with 1000+ common Uzbek words
- **Custom dictionary** — add words via right-click menu or manually
- Suggestions using Levenshtein distance algorithm
- Dictionary stored as editable Markdown file

### 💬 Quote of the Day
- Popup on startup with quotes from Uzbek classics
- Collection includes Navoiy, Cholpon, Qodiriy, and more
- **Fully customizable** — add/remove quotes via Markdown file

### 🔧 Settings
- Toggle spell checker on/off
- Toggle quote popup on/off
- Configure popup delay
- Custom dictionary and quote file paths

## Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Create folder `uzbek-writing-suite` in your vault's `.obsidian/plugins/`
3. Copy the three files into the folder
4. Enable in **Settings → Community plugins**

## Usage

### Script Conversion
1. Select text in editor
2. Open Command Palette (`Ctrl+P` / `Cmd+P`)
3. Choose conversion:
   - `Convert selection: Latin → Cyrillic`
   - `Convert selection: Cyrillic → Latin`
   - `Convert selection: Cyrillic → Phonetic`
   - `Convert selection: Phonetic → Cyrillic`
   - `Auto-detect and convert selection`

Or use right-click context menu for quick access.

### Spell Check
- **Spell check current document** — finds errors in entire document
- **Add word to dictionary** — right-click a word → "Uzbek: Add to dictionary"

### Quote Management
- Quote popup appears on startup (configurable)
- Use command `Show quote of the day` to display anytime
- Edit quotes in the `uzbek-quotes.md` file (one per line, format `"text" — Author`)

## Dictionary Format

The dictionary is a plain Markdown file. Each word on its own line:

```markdown
# Comments start with #
kitob
maktab
oʻquvchi
```

Words can include apostrophes. The system normalizes between `ʻ` (U+02BB) and `'` (U+027).

## Quote Format

```markdown
# Uzbek Quotes
"Quote text here" — Author Name
"Another quote" — Another Author
```

## Author

**Aristarkh Khalmirzaev** ([@arigurj](https://github.com/arigurj))

## License

MIT

---

## O'zbekcha

> Obsidian uchun o'zbek yozuvi to'plami.

### Xususiyatlari

- **Skript konverteri** — Latin ↔ Kirill ↔ Fonematik
- **Imlo tekshirgich** — so'zligi moslashtirilgan
- **Kunlik parcha** — o'zbek klassiklaridan sitatalar
- **Sozlamalar** — barcha funksiyalarni o'chirish/yonish

### O'rnatish

1. Release-dan `main.js`, `manifest.json`, `styles.css` yuklab oling
2 `.obsidian/plugins/` papkasiga `uzbek-writing-suite` papka yarating
3. Fayllarni ko'chiring
4. **Sozlamalar → Jamoat plaginlari** da yoqing

---

## Русский

> Полный набор инструментов для узбекского письма в Obsidian.

### Возможности

- **Конвертер скриптов** — Латиница ↔ Кириллица ↔ Фонетика
- **Проверка орфографии** — с пользовательским словарём
- **Цитата дня** — от узбекских классиков
- **Настройки** — отключайте ненужное

### Установка

1. Скачайте `main.js`, `manifest.json`, `styles.css` из релиза
2. Создайте папку `uzbek-writing-suite` в `.obsidian/plugins/`
3. Скопируйте файлы
4. Включите в **Настройки → Плагины сообщества**
