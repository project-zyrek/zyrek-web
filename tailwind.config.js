/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundColor: {
        'area-00': '#000000',
        'area-01': '#0D0D0D',
      },
      borderColor: {
        'outline-00': '#333333',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#737373',
      },
      maxWidth: {
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        12: '3rem',
        20: '5rem',
        50: '12.5rem',
        60: '15rem',
        70: '17.5rem',
        80: '20rem',
        90: '22.5rem',
        100: '25rem',
        120: '30rem',
      },
      minWidth: {
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        12: '3rem',
        20: '5rem',
        50: '12.5rem',
        60: '15rem',
        70: '17.5rem',
        80: '20rem',
        90: '22.5rem',
        100: '25rem',
        120: '30rem',
      },
    },
  },
};
