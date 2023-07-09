import { IconButton } from "../fragments/buttons/icon_button";
import { CommentaryFilter } from "../fragments/commentary_filter";
import styles from "./verse_by_verse.module.css";
import { DailyVerseModal } from "../layouts/daily_verse_modal";
import { CommentariesGrid } from "../layouts/scrollers/user_content/commentaries_grid";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { loggedInUser } from "../../helpers/auth/get-loggedin-user";
import { YouNeedToLoginModal } from "../common/modals/you_need_to_login_modal";
import { TContentCreationType } from "../fragments/cards/daily_verse_card";
import { getImageFromBibleVerse } from "../../helpers/functions/reading/get_image_from_Bible_verse";
import { ExploreNavigation } from "../layouts/navs/explore_navigation";
import { ImageFromVerseEditor } from "./content/image_from_verse_editor";
import { Notification } from "../fragments/popups/notification";

export const VerseByVerse = () => {
   const router = useRouter();
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [currentView, setCurrentView] = useState<TContentCreationType>("comment");
   const [createImage, setCreateImage] = useState<any>(null);
   const [verseData, setVerseData] = useState<any>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [errorGettingImage, setErrorGettingImage] = useState<boolean>(false);

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

   const handleCreateImage = async (verseData: any) => {
      setVerseData(verseData);
      setLoading(true);
      setErrorGettingImage(false);
      setCreateImage({});
      try {
         const { data, error, status } = await getImageFromBibleVerse(verseData.orgId);
         if (data && status === "done") {
            console.log(data);
            setCreateImage(data);
            setLoading(false);
            setErrorGettingImage(false);
         } else if (error) {
            setErrorGettingImage(true);
            setLoading(false);
         }
      } catch (error) {
         setErrorGettingImage(true);
         console.error(error);
      }
   };

   const handleNavigation = (view: number) => {
      if (view === 1) setCurrentView("comment");
      else if (view === 2) setCurrentView("verse");
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
         {createImage && (
            <ImageFromVerseEditor
               verseContent={verseData?.content}
               VERSE_ID={createImage?.VERSE_ID}
               onTryAgain={handleCreateImage}
               loading={loading}
               error={errorGettingImage}
               img_url={createImage?.image_url}
               ID={createImage?.ID}
               prompt={createImage?.prompt}
               onClose={() => setCreateImage(null)}
               verseCitation={createImage?.verse_citation}
            />
         )}

         <div className={`${styles.top} ${triggerEffect ? styles.topScrolling : ""}`}>
            <div className={styles.verseFilter}>
               <div className={styles.verse}>
                  <DailyVerseModal
                     versecardOnly={triggerEffect}
                     contentCreationType={currentView}
                     onCreateImage={handleCreateImage}
                  />
               </div>
               <div className={styles.navigation}>
                  <ExploreNavigation cta={{ handleClick: handleNavigation }} />
               </div>
               {!triggerEffect && currentView === "comment" && (
                  <div className={styles.filter}>
                     <CommentaryFilter />
                  </div>
               )}
            </div>
            <div className={`${styles.shadow} ${triggerEffect ? "" : styles.hiddenShadow}`}></div>
         </div>

         <div
            className={`${styles.commentaries} ${
               triggerEffect ? styles.commentariesTopScrolling : ""
            }`}>
            {currentView === "comment" && <CommentariesGrid getAll />}
         </div>
      </div>
   );
};
