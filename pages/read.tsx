import Head from "next/head";
import HeadContent from "../SEO/head_content";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { ReadBibleModal } from "../components/templates/read_bible_modal";

// styles
import styles from "./read.module.css";

// helpers
import { getLSBibleSettings } from "../helpers/browser/ls_bible_settings";

// types
import { ReadingPreferences } from "../types/browser/local_storage";

const Read = () => {
   // router
   const router = useRouter();

   // get the theme settings
   const [readingPrefs, setreadingPrefs] = useState<ReadingPreferences | null>(null);
   const theme = readingPrefs?.theme;

   useEffect(() => {
      if (router.isReady) {
         setreadingPrefs(getLSBibleSettings(router));
      }
   }, [router.query, router.isReady]);

   const handleTheme = (theme: string) => {
      setreadingPrefs((prev) => prev && { ...prev, theme });
   };

   const handleFont = (font: string) => setreadingPrefs((prev) => prev && { ...prev, font });

   return (
      <main
         className={`${styles.mainWrapper} ${
            theme === "1"
               ? styles.firstTheme
               : theme === "2"
               ? styles.secondTheme
               : theme === "4"
               ? styles.fourthTheme
               : styles.thirdTheme // default one
         }`}>
         <div className={styles.readBibleTemplate}>
            <ReadBibleModal cta={{ handleTheme, handleFont }} readingPrefs={readingPrefs} />
         </div>
      </main>
   );
};
export default Read;
