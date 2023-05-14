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
import { Parragraph } from "../fragments/Typography/parragraph";
import { console_log } from "../../utilities/console_log";

type TReadBibleTemplateProps = {
   readingPrefs: ReadingPreferences | null;
   cta: {
      handleFont: (font: string) => void;
      handleTheme: (theme: string) => void;
   };
};
export const ReadBibleModal = ({ cta, readingPrefs }: TReadBibleTemplateProps) => {
   // state;
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");
   let themeClass = "";
   const [search, setsearch] = useState<string>("");

   // the number of results found when searching
   const [totalSearchResults, settotalSearchResults] = useState<number>(0);

   const handleHeader = (e: any) => {
      if (!search) {
         const distance = e.target.scrollTop;
         const isScrollingDown = scrollYDis - distance > 0 ? true : false;
         setscrollYDis(distance);
         setscrollingDir(isScrollingDown ? "down" : "up");
      }
   };

   switch (readingPrefs?.theme) {
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

   const handleSearch = (val: string) => {
      setscrollingDir("none");
      setsearch(val);
   };

   return (
      <div className={styles.mainWrapper} onScroll={handleHeader}>
         {readingPrefs && (
            <div
               className={`${styles.header} ${themeClass} ${
                  scrollingDir === "up" && styles.scrollingUp
               } ${scrollingDir === "down" && styles.scrollingDown}`}>
               <ReadBibleHeader
                  whiteBorder={readingPrefs?.theme > "4"}
                  theme={readingPrefs?.theme}
                  versionId={readingPrefs.versionId}
                  versionName={readingPrefs.versionName}
                  scriptureRef={readingPrefs.scriptureRef}
                  langIcon={readingPrefs.langIcon}
                  chapterId={readingPrefs.chapterId}
                  searchRightIcon={<Parragraph size='small' text={totalSearchResults} />}
                  cta={{
                     handleFontSelection: cta.handleFont,
                     handleThemeSelection: cta.handleTheme,
                     handleSearch,
                     handleSearchClose: () => setsearch("")
                  }}
               />
            </div>
         )}
         <div className={styles.chapter}>
            {readingPrefs && (
               <BibleChapter
                  searchText={search}
                  versionId={readingPrefs.versionId}
                  chapterId={readingPrefs.chapterId}
                  fontSize={readingPrefs.font}
                  theme={readingPrefs.theme}
                  cta={{ handleUpdateTextSearchCount: (val: number) => settotalSearchResults(val) }}
               />
            )}
         </div>
      </div>
   );
};
