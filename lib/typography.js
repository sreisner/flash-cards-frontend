import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';

sutroTheme.baseFontSize = '10px';
sutroTheme.googleFonts = [
  {
    name: 'Kanit',
    styles: ['700'],
  },
  {
    name: 'Lato',
    styles: ['400', '400i', '700', '700i'],
  },
];
sutroTheme.headerFontFamily = ['Kanit', 'sans-serif'];
sutroTheme.bodyFontFamily = ['Lato', 'sans-serif'];

export default new Typography(sutroTheme);
