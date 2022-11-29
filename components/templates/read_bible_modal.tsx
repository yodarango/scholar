/**************************************************************************************** 
-  this component is in charge of passing down the chapter ID to be rendered children and 
   the theme ID to its child therefore the subcomponents should not be worried about handling
   router or local storage state
****************************************************************************************/
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { BibleChapter } from "../layouts/bible_chapter";
import { ReadBibleHeader } from "../layouts/read_bible_header";

// styles
import styles from "./read_bible_modal.module.css";

// constants
import { DEFAULT_BIBLE_SETTINGS, DEFAULT_THEME } from "../../constants/defaults";

// types
import { ReadingPreferences } from "../../types/browser/local_storage";

type TReadBibleTemplateProps = {
   cta: {
      handleTheme: (theme: string) => void;
   };
};
export const ReadBibleModal = ({ cta }: TReadBibleTemplateProps) => {
   // router
   const router = useRouter();

   //state
   // const [currChapter, setcurrChapter] = useState<string | string[]>("");
   // const [fontSize, setfontSize] = useState<string | undefined>(undefined);
   // const [theme, settheme] = useState<string | undefined>(undefined);
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");
   const [readingPrefs, setreadingPrefs] = useState<ReadingPreferences | null>(null);

   // set the chapterId on initial load
   // 1. If there is a chapter-id in the router that is used else :
   // 2. If there is a chapter-id in Local Storage that is used: else :
   // 3. fallback to DEFAULTS
   // follow this procedure for all settings that require multiple checks
   useEffect(() => {
      if (router.isReady) {
         let preferences;
         const LSExists = localStorage.getItem("reading-preferences");
         const LSParsed = LSExists && JSON.parse(LSExists);
         const chapterId = LSParsed.chapterId;
         const versionId = LSParsed.versionId;
         const theme = LSParsed.theme;

         // set preferences in the global state
         setreadingPrefs({ ...readingPrefs, ...LSParsed });

         if (router.query["chapter-id"]) {
            const chaptId = router.query["chapter-id"];
            preferences = { chaptId };
         } else if (chapterId) {
            preferences = { chapterId };
         } else {
            preferences = { chapterId: DEFAULT_BIBLE_SETTINGS.CHAPTER_ID };
         }

         // version
         if (versionId) {
            preferences = { versionId };
         } else {
            preferences = { versionId: DEFAULT_BIBLE_SETTINGS.VERSION_ID };
         }

         // theme
         if (theme) {
            preferences = { theme };
         } else {
            preferences = { theme: DEFAULT_THEME };
         }

         setreadingPrefs({ ...LSParsed, ...preferences });
      }
   }, [router.query, router.isReady]);

   const handleThemeSelection = (value: string) => {
      setreadingPrefs((prev) => prev && { ...prev, theme: value });
      cta.handleTheme(value);
   };

   const handleHeader = (e: any) => {
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   return (
      <div className={styles.mainWrapper} onScroll={handleHeader}>
         {readingPrefs && (
            <div
               className={`${styles.header} ${scrollingDir === "up" && styles.scrollingUp} ${
                  scrollingDir === "down" && styles.scrollingDown
               } ${
                  readingPrefs.theme === "1"
                     ? styles.firstTheme
                     : readingPrefs.theme === "2"
                     ? styles.secondTheme
                     : readingPrefs.theme === "4"
                     ? styles.fourthTheme
                     : styles.thirdTheme // default one
               }
            `}>
               <ReadBibleHeader
                  chapterId={readingPrefs.chapterId}
                  cta={{
                     handleFontSelection: (value: string) =>
                        setreadingPrefs({ ...readingPrefs, font: value }),
                     handleThemeSelection
                  }}
               />
            </div>
         )}
         <div className={styles.chapter}>
            {readingPrefs && (
               <BibleChapter
                  versionId={readingPrefs.versionId}
                  chapterId={readingPrefs.chapterId}
                  fontSize={readingPrefs.font}
                  theme={readingPrefs.theme}
               />
            )}
         </div>
      </div>
   );
};
