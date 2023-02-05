import { IconButton } from "../fragments/buttons/icon_button";
import { CommentaryFilter } from "../fragments/commentary_filter";
import styles from "./verse_by_verse.module.css";
import { DailyVerseModal } from "../layouts/daily_verse_modal";
import { CommentariesGrid } from "../layouts/scrollers/user_content/commentaries_grid";
import { useEffect, useRef, useState, useMemo } from "react";

export const VerseByVerse = () => {
   const scrollTarget = useRef<any>(null);

   //state
   const [triggerEffect, setsTriggerEffect] = useState<boolean>(false);
   let scrollYDis = 0;
   const handleHeader = () => {
      const distance = scrollTarget.current.getBoundingClientRect().y;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;

      scrollYDis = distance;
      setsTriggerEffect(isScrollingDown);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleHeader);
      return () => {
         window.removeEventListener("scroll", handleHeader);
      };
   }, []);

   return (
      <div className={styles.mainWrapper} ref={scrollTarget}>
         <div className={styles.addBtn}>
            <IconButton
               backgroundColor='2'
               icon='add'
               link='/posts/commentary/new?close=verse-by-verse'
            />
         </div>
         <div className={`${styles.top} ${triggerEffect ? styles.topScrolling : ""}`}>
            <div className={styles.verseFilter}>
               <div className={styles.verse}>
                  <DailyVerseModal versecardOnly={triggerEffect} />
               </div>
               {!triggerEffect && (
                  <div className={styles.filter}>
                     <CommentaryFilter />
                  </div>
               )}
            </div>
            <div className={styles.shadow}></div>
         </div>

         <div
            className={`${styles.commentaries} ${
               triggerEffect ? styles.commentariesTopScrolling : ""
            }`}>
            <CommentariesGrid />
         </div>
      </div>
   );
};
