/*******************************************************************************************
 * Cool little function that returns the best contrast color for a given background color.
 * It returns 0 for dark text on bright background and 1 for bright text on dark
 * background. 🖌️
 * *************
 */

const DARK_FOREGROUND = 1;
const LIGHT_FOREGROUND = 0;

export const getColorContrast = (
   backgroundColor: string
): typeof DARK_FOREGROUND | typeof LIGHT_FOREGROUND => {
   if (!backgroundColor || backgroundColor === "") return 0;

   var red = parseInt(backgroundColor.substring(1, 3), 16);
   var green = parseInt(backgroundColor.substring(3, 5), 16);
   var blue = parseInt(backgroundColor.substring(5, 7), 16);

   var brightness = (red * 299 + green * 587 + blue * 114) / 1000;

   if (brightness > 125) {
      return 0; // Dark text for bright background
   } else {
      return 1; // Bright text for dark background
   }
};
