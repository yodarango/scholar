import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { ReadBibleModal } from "../../../components/templates/read_bible_modal";

// styles
import styles from "./read.module.css";

// helpers
import { getLSBibleSettings } from "../../../helpers/browser/ls_bible_settings";

// types
import { ReadingPreferences } from "../../../types/browser/local_storage";

const Read = () => {
   // router
   const router = useRouter();

   // get the theme settings
   const [readingPrefs, setreadingPrefs] = useState<ReadingPreferences | null>(null);
   const theme = readingPrefs?.theme;
   //const [themeClass, setthemeClass] = useState("0");
   let themeClass = "";

   useEffect(() => {
      if (router.isReady) {
         const settings = getLSBibleSettings(router);

         setreadingPrefs(settings);
      }
   }, [router.query, router.isReady]);

   const handleTheme = (theme: string) => {
      setreadingPrefs((prev) => prev && { ...prev, theme });
   };

   const handleFont = (font: string) => setreadingPrefs((prev) => prev && { ...prev, font });

   switch (theme) {
      case "1":
         themeClass = styles.firstTheme;
         break;
      case "2":
         themeClass = styles.secondTheme;
         break;
      case "3":
         themeClass = styles.thirdTheme;
         break;
      case "4":
         themeClass = styles.fourthTheme;
         break;
      case "5":
         themeClass = styles.fifthTheme;
         break;
      case "6":
         themeClass = styles.sixthTheme;
         break;
      case "7":
         themeClass = styles.seventhTheme;
         break;
      case "8":
         themeClass = styles.eighthTheme;
         break;
      case "9":
         themeClass = styles.ninthTheme;
         break;
   }

   return (
      <main className={`${styles.mainWrapper} ${themeClass}`}>
         <div className={styles.readBibleTemplate}>
            {readingPrefs && (
               <ReadBibleModal cta={{ handleTheme, handleFont }} readingPrefs={readingPrefs} />
            )}
         </div>
      </main>
   );
};
export default Read;
