// slugify — turn text into a URL-safe slug. Pure, deterministic, no dependencies.

const ACCENTS = { à: 'a', á: 'a', â: 'a', ä: 'a', ç: 'c', è: 'e', é: 'e', ê: 'e', ë: 'e', í: 'i', ï: 'i', ñ: 'n', ó: 'o', ö: 'o', ú: 'u', ü: 'u' };

// Fold a single character to its ASCII base, or '' if it has none.
function fold(ch) {
  if (ACCENTS[ch]) return ACCENTS[ch];
  return /[a-z0-9]/.test(ch) ? ch : ' ';
}

/**
 * Convert text to a lowercase, hyphen-separated, ASCII slug.
 * Collapses runs of separators and trims leading/trailing hyphens.
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  if (typeof input !== 'string') throw new TypeError('slugify expects a string');
  return [...input.toLowerCase()]
    .map(fold)
    .join('')
    .trim()
    .replace(/\s+/g, '-');
}
