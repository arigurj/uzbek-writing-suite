// Uzbek Writing Suite — Quotes Module (Latin script)
export interface Quote {
  text: string;
  author: string;
  source?: string;
}

export const defaultQuotes: Quote[] = [
  { text: "Yoshning hayoti — hayotning eng go'zal davridir.", author: "Abdulhamid Cholpon" },
  { text: "Kitob — odammga eng yahsi do'stdir.", author: "Abdulhamid Cholpon" },
  { text: "Ilm — nurki, oqillik — yog'duki.", author: "Alisher Navoiy" },
  { text: "Ko'p o'qigan ko'p bilur.", author: "Alisher Navoiy" },
  { text: "Hayot — maktab, unga har kangi yanggi dars.", author: "Abdulla Qodiriy" },
  { text: "Til — millatning yuragidir.", author: "Abdulla Qodiriy" },
  { text: "O'zbek xalqi tarixi — buyuk tarixdir.", author: "Asqad Muxtor" },
  { text: "Yozuvchining vazifasi — xalq uchun yozish.", author: "Asqad Muxtor" },
  { text: "Go'zallik — haqiqatdadir.", author: "Abdulhamid Cholpon" },
  { text: "Mehnat — hayotning asosidir.", author: "Hamza Hakimzoda Niyoziy" },
  { text: "Sog'liq — eng katta boyliqdir.", author: "Hamza Hakimzoda Niyoziy" },
  { text: "Bolalar — kelajakning himoyachilari.", author: "Zulfiya" },
  { text: "O'zbek tili — buyuk tildir.", author: "Abdulla Aripov" },
  { text: "Shaning haqiqati — mehnatdadir.", author: "G'afur G'ulom" },
  { text: "Hayotda eng muhimi — inson bo'lishdir.", author: "G'afur G'ulom" },
  { text: "Kitob o'qish — ruhni tovushdir.", author: "Utkir Hoshimov" },
  { text: "Adabiyot — xalqning ruhidir.", author: "Utkir Hoshimov" },
  { text: "O'zbek xalqi — mehnatsevar xalq.", author: "Shuhrat" },
  { text: "Ilmli odam — yorug'likda.", author: "Shuhrat" },
  { text: "Tarbiya — hayotning asosidir.", author: "Zulfiya" },
  { text: "Ona — hayotning birinchi o'qituvchisi.", author: "O'zbek xalq maqollari" },
  { text: "Do'stlik — qimmatli narsa.", author: "O'zbek xalq maqollari" },
  { text: "O'zbek tili o'zining boyligi bilan faxrlanadi.", author: "Abdulla Aripov" },
  { text: "Adabiyot tilning makonadi.", author: "Alisher Navoiy" },
  { text: "Insonning haqiqiy baxti — mehnatda.", author: "Hamza Hakimzoda Niyoziy" },
];

export class QuoteManager {
  private quotes: Quote[] = [...defaultQuotes];
  private lastQuoteIndex: number = -1;

  getRandomQuote(): Quote {
    let index: number;
    do {
      index = Math.floor(Math.random() * this.quotes.length);
    } while (index === this.lastQuoteIndex && this.quotes.length > 1);
    this.lastQuoteIndex = index;
    return this.quotes[index];
  }

  addQuote(quote: Quote): void {
    this.quotes.push(quote);
  }

  removeQuote(index: number): void {
    if (index >= 0 && index < this.quotes.length) {
      this.quotes.splice(index, 1);
    }
  }

  getQuotes(): Quote[] {
    return [...this.quotes];
  }

  loadFromText(text: string): void {
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      // Format: "text" — Author
      const match = trimmed.match(/^["«](.+?)["»]\s*[—–-]\s*(.+)$/);
      if (match) {
        this.addQuote({ text: match[1], author: match[2] });
      }
    }
  }

  get count(): number {
    return this.quotes.length;
  }
}
