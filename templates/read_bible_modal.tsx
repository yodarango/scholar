import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { BibleChapter } from "../layouts/bible_chapter";
import { ReadBibleHeader } from "../layouts/read_bible_header";

// styles
import styles from "./read_bible_modal.module.css";

type TReadBibleTemplateProps = {
   cta: {
      handleTheme: (theme: string) => void;
   };
};
export const ReadBibleTemplate = ({ cta }: TReadBibleTemplateProps) => {
   // router
   const router = useRouter();

   const [chapterData, setchapterData] = useState<any>(null);
   const [currChapter, setcurrChapter] = useState<string | string[]>("");
   const [fontSize, setfontSize] = useState<string | undefined>(undefined);
   const [theme, settheme] = useState<string | undefined>(undefined);

   const getChapterData = () => {
      // get the chapter data
      setchapterData({ isChapterBookmarked: false });
   };

   // set the chapterId
   useEffect(() => {
      if (router.isReady) {
         if (router.query["chapter-id"]) {
            const chaptId = router.query["chapter-id"];
            setcurrChapter(chaptId);
         }
      }
      getChapterData();
   }, [router.query, router.isReady]);

   const handleThemeSelection = (value: string) => {
      settheme(value);
      cta.handleTheme(value);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.header}>
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
