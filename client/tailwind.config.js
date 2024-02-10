/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  mode: 'jit',
  important: true,
  corePlugins: {
    preflight: false,
  }, 
  content: ['./src/**/*.{html,js}'],
};
