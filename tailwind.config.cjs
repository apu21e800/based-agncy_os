/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#f97316'
      },
      boxShadow: {
        subtle: '0 4px 14px rgba(0,0,0,0.08)',
        medium: '0 8px 24px rgba(0,0,0,0.12)',
        strong: '0 12px 32px rgba(0,0,0,0.18)'
      }
    }
  },
  plugins: []
};
