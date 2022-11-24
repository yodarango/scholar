/**************************************************************************************** 
-  this component is in charge of passing down the chapter ID to be rendered and the 
   theme ID to its child 
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

type TReadBibleTemplateProps = {
   cta: {
      handleTheme: (theme: string) => void;
   };
};
export const ReadBibleModal = ({ cta }: TReadBibleTemplateProps) => {
   // router
   const router = useRouter();

   //state
   const [chapterData, setchapterData] = useState<any>(null);
   const [currChapter, setcurrChapter] = useState<string | string[]>("");
   const [fontSize, setfontSize] = useState<string | undefined>(undefined);
   const [theme, settheme] = useState<string | undefined>(undefined);
   const [scrollYDis, setscrollYDis] = useState<number>(0);
   const [scrollingDir, setscrollingDir] = useState<string>("none");

   const getChapterData = () => {
      // get the chapter data
      setchapterData({ isChapterBookmarked: false });
   };

   // set the chapterId on initial load
   // 1. If there is a chapter-id in the router that is used else :
   // 2. If there is a chapter-id in Local Storage that is used: else :
   // 3. fallback to DEFAULTS
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      const LSParsed = LSExists && JSON.parse(LSExists);
      const LSChapterId = LSParsed && LSParsed.chapterId;

      if (router.isReady) {
         if (router.query["chapter-id"]) {
            const chaptId = router.query["chapter-id"];
            setcurrChapter(chaptId);
         } else if (LSChapterId) {
            setcurrChapter(LSChapterId);
         } else {
            setcurrChapter(DEFAULT_BIBLE_SETTINGS.CHAPTER_ID);
         }
      }
      getChapterData();
   }, [router.query, router.isReady]);

   const handleThemeSelection = (value: string) => {
      settheme(value);
      cta.handleTheme(value);
   };

   const handleHeader = (e: any) => {
      const distance = e.target.scrollTop;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;
      setscrollYDis(distance);
      setscrollingDir(isScrollingDown ? "down" : "up");
   };

   // get the theme settings
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         settheme(LSParsed.theme);
      } else {
         settheme(DEFAULT_THEME);
      }
   }, []);

   return (
      <div className={styles.mainWrapper} onScroll={handleHeader}>
         <div
            className={`${styles.header} ${scrollingDir === "up" && styles.scrollingUp} ${
               scrollingDir === "down" && styles.scrollingDown
            } ${
               theme === "1"
                  ? styles.firstTheme
                  : theme === "2"
                  ? styles.secondTheme
                  : theme === "4"
                  ? styles.fourthTheme
                  : styles.thirdTheme // default one
            }
            `}>
            {chapterData && (
               <ReadBibleHeader
                  cta={{
                     handleFontSelection: (value: string) => setfontSize(value),
                     handleThemeSelection
                  }}
                  isChapeterBookmarked={chapterData.isChapterBookmarked}
               />
            )}
         </div>
         <div className={styles.chapter}>
            {currChapter && (
               <BibleChapter chapterId={currChapter} fontSize={fontSize} theme={theme} />
            )}
         </div>
      </div>
   );
};
