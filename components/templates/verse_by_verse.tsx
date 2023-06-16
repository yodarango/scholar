import { IconButton } from "../fragments/buttons/icon_button";
import { CommentaryFilter } from "../fragments/commentary_filter";
import styles from "./verse_by_verse.module.css";
import { DailyVerseModal } from "../layouts/daily_verse_modal";
import { CommentariesGrid } from "../layouts/scrollers/user_content/commentaries_grid";
import { useEffect, useRef, useState, useMemo, useContext } from "react";
import { UserContext } from "../../context";
import { useShouldRender } from "../../hooks/use_should_render";

export const VerseByVerse = () => {
   const userCtx = useContext(UserContext);
   const { user } = userCtx;
   const userId = parseInt(user?.ID) || 0;
   const { shouldRender } = useShouldRender(userId);

   const scrollTarget = useRef<any>(null);

   //state
   const [triggerEffect, setsTriggerEffect] = useState<boolean>(false);
   let scrollYDis = 0;
   let changeDir = false; // kep comp from rerendering each time

   const handleHeader = () => {
      const distance = scrollTarget?.current?.getBoundingClientRect().y;
      const isScrollingDown = scrollYDis - distance > 0 ? true : false;

      const innerHeight = window.innerHeight;
      const bottom = scrollTarget?.current?.getBoundingClientRect().bottom;

      if (innerHeight - bottom < 100 && innerHeight - bottom > -100) {
         setsTriggerEffect(true);
      } else if (triggerEffect !== changeDir) {
         setsTriggerEffect(isScrollingDown);
      }
      scrollYDis = distance;

      changeDir = isScrollingDown;
   };

   useEffect(() => {
      if (typeof window !== "undefined") {
         window.addEventListener("scroll", handleHeader);
         return () => {
            window.removeEventListener("scroll", handleHeader);
         };
      }
   }, []);

   return (
      <div className={styles.mainWrapper} ref={scrollTarget}>
         {shouldRender && (
            <div className={styles.addBtn}>
               <IconButton
                  backgroundColor='2'
                  icon='add'
                  link='/posts/commentary/new?close=explore'
               />
            </div>
         )}
         <div className={`${styles.top} ${triggerEffect ? styles.topScrolling : ""}`}>
            <div className={styles.verseFilter}>
               <div className={styles.verse}>
                  <DailyVerseModal versecardOnly={triggerEffect} canComment={shouldRender} />
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
            <CommentariesGrid getAll />
         </div>
      </div>
   );
};
