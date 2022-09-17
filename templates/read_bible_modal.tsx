import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { BibleChapter } from "../layouts/bible_chapter";
import { ReadBibleHeader } from "../layouts/read_bible_header";

// styles
import styles from "./read_bible_modal.module.css";

export const ReadBibleTemplate = () => {
   // router
   const router = useRouter();

   const [chapterData, setchapterData] = useState<any>(null);
   const [currChapter, setcurrChapter] = useState<string | string[]>("");

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
            console.log(currChapter);
         }
      }
      getChapterData();
   }, [router.query, router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.header}>
            {chapterData && (
               <ReadBibleHeader isChapeterBookmarked={chapterData.isChapterBookmarked} />
            )}
         </div>
         <div className={styles.chapter}>
            {currChapter && <BibleChapter chapterId={currChapter} />}
         </div>
      </div>
   );
};
