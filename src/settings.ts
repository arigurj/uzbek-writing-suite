// Uzbek Writing Suite — Settings
export interface UzbekSuiteSettings {
  enableSpellCheck: boolean;
  enableQuotePopup: boolean;
  dictionaryPath: string;
  quotePath: string;
  popupDelay: number;
}

export const DEFAULT_SETTINGS: UzbekSuiteSettings = {
  enableSpellCheck: true,
  enableQuotePopup: true,
  dictionaryPath: 'uzbek-dictionary.md',
  quotePath: 'uzbek-quotes.md',
  popupDelay: 2000,
};
