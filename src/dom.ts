// Uzbek Writing Suite — DOM Helpers
// Type-safe wrappers for DOM element creation

export function createDiv(cls?: string): HTMLDivElement {
  const el = document.createElement('div');
  if (cls) el.className = cls;
  return el;
}

export function createButton(cls?: string, text?: string): HTMLButtonElement {
  const el = document.createElement('button');
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}

export function createSpan(cls?: string, text?: string): HTMLSpanElement {
  const el = document.createElement('span');
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}

export function createBlockquote(cls?: string, text?: string): HTMLElement {
  const el = document.createElement('blockquote');
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}

export function createTextarea(placeholder?: string): HTMLTextAreaElement {
  const el = document.createElement('textarea');
  if (placeholder) el.placeholder = placeholder;
  return el;
}

export function createInput(type?: string, placeholder?: string): HTMLInputElement {
  const el = document.createElement('input');
  if (type) el.type = type;
  if (placeholder) el.placeholder = placeholder;
  return el;
}
