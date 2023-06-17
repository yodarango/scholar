import { IconButton } from "../fragments/buttons/icon_button";
import { CommentaryFilter } from "../fragments/commentary_filter";
import styles from "./verse_by_verse.module.css";
import { DailyVerseModal } from "../layouts/daily_verse_modal";
import { CommentariesGrid } from "../layouts/scrollers/user_content/commentaries_grid";
import { useEffect, useRef, useState, useMemo, useContext } from "react";
import { useRouter } from "next/router";
import { loggedInUser } from "../../helpers/auth/get-loggedin-user";
import { YouNeedToLoginModal } from "../common/modals/you_need_to_login_modal";

export const VerseByVerse = () => {
   const router = useRouter();
   const [openModal, setOpenModal] = useState<boolean>(false);

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

   const handleClick = () => {
      const isLoggedIn = loggedInUser();
      if (!isLoggedIn) setOpenModal(true);
      else router.push("/posts/commentary/new?close=explore");
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
         <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
         <div className={styles.addBtn}>
            <IconButton backgroundColor='2' icon='add' cta={{ handleClick: handleClick }} />
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
            <CommentariesGrid getAll />
         </div>
      </div>
   );
};
