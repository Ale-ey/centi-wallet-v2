/**
 * Centi brand palette — single source of truth for Tailwind and TypeScript.
 * Tailwind loads this file from `tailwind.config.js` (Node cannot require `.ts` here).
 * App code should import `centiColors` from `@/theme`.
 */
module.exports = {
  centiColors: {
    primary: '#FDA312',
    surface: '#1F1F1F',
    black: '#000000',
  },
};
