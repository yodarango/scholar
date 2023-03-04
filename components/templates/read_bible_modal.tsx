/**************************************************************************************** 
this component is in charge of passing down the chapter ID to be rendered children and 
the theme ID to its child therefore the sub-components should not be worried about 
handling outer or local storage state
********************************/

import { useState } from "react";

// comps
import { BibleChapter } from "../layouts/bible_chapter";
import { ReadBibleHeader } from "../layouts/read_bible_header";

// styles
import styles from "./read_bible_modal.module.css";

// types
import { ReadingPreferences } from "../../types/browser/local_storage";

type TReadBibleTemplateProps = {
   readingPrefs: ReadingPreferences | null;
   cta: {
      handleFont: (font: string) => void;
      handleTheme: (theme: string) => void;
   };
};
export const ReadBibleModal = ({ cta, readingPrefs }: TReadBibleTemplateProps) => {
   //state
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");

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
                  versionId={readingPrefs.versionId}
                  versionName={readingPrefs.versionName}
                  scriptureRef={readingPrefs.scriptureRef}
                  langIcon={readingPrefs.langIcon}
                  chapterId={readingPrefs.chapterId}
                  cta={{
                     handleFontSelection: cta.handleFont,
                     handleThemeSelection: cta.handleTheme
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
