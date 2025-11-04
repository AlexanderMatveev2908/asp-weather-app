/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white_smoke: '#f5f5f5',
        blue__prm: '#004C7E',
        blue__sec: '#93C5FD',
        green__prm: '#22C55E',
        orange__prm: '#FB923C',
        orange__light: '#FDBA74',
        yellow__prm: '#FDE047',
        yellow__light: '#FEF08A',
        gray__prm: '#DBDAD1',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
