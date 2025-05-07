// "use client"

// import { useEffect, useState, useMemo } from 'react';
// import { darkColors, IColors, lightColors, systemColors } from '../variables/colors';

// type ThemeType = 'light' | 'dark' | 'system';

// export const useTheme = () => {
//   const [theme, setTheme] = useState<ThemeType>('system');

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as ThemeType;
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   const colors = useMemo(() => {
//     if (theme === 'light') return lightColors;
//     if (theme === 'dark') return darkColors;
//     return systemColors;
//   }, [theme]);

//   function onChangeTheme(theme: ThemeType) {
//     localStorage.setItem('theme', theme);
//     setTheme(theme);
//   }

//   useEffect(() => {
//     const root = window.document.documentElement;
  
//     root.classList.remove('light', 'dark', 'system');
//     root.classList.add(theme);
//   }, [theme]);
  

//   return {
//     theme,
//     onChangeTheme,
//     colors,
//   };
// };
