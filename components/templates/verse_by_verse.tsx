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
import { ImagesFromVerseGrid } from "../layouts/scrollers/user_content/images_from_verse_grid";
import { Icon } from "../fragments/chunks/icons";
import { AddContent } from "../fragments/buttons/add_content";

export const VerseByVerse = () => {
   const router = useRouter();
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [currentView, setCurrentView] = useState<TContentCreationType>("comment");
   const [createImage, setCreateImage] = useState<any>(false);
   const [verseID, setVerseID] = useState<string>("");
   const scrollTarget = useRef<any>(null);
   const [triggerNewFetch, setTriggerNewFetch] = useState<number>(0);
   const [hiddenView, setHiddenView] = useState<boolean>(false);

   // TODO: Ditching this for a button, might come back
   //state
   // const [triggerEffect, setsTriggerEffect] = useState<boolean>(false);
   // let scrollYDis = 0;
   // let changeDir = false; // kep comp from rerendering each time

   // const handleHeader = () => {
   //    const distance = scrollTarget?.current?.getBoundingClientRect().y;
   //    const isScrollingDown = scrollYDis - distance > 0 ? true : false;
   //    const innerHeight = window.innerHeight;
   //    const bottom = scrollTarget?.current?.getBoundingClientRect().bottom;

   //    if (innerHeight - bottom < 100 && innerHeight - bottom > -100) {
   //       setsTriggerEffect(true);
   //    } else if (triggerEffect !== changeDir) {
   //       setsTriggerEffect(isScrollingDown);
   //    }
   //    scrollYDis = distance;

   //    changeDir = isScrollingDown;
   // };

   const handleClick = () => {
      const isLoggedIn = loggedInUser();
      if (!isLoggedIn) setOpenModal(true);
      else router.push("/posts/commentary/new?close=explore");
   };

   const handleNavigation = (view: number) => {
      // Get the current search parameters
      const searchParams = new URLSearchParams(window.location.search);

      // Set the value for the 'tab' parameter
      searchParams.set("tab", String(view));

      // Update the URL with the modified search parameters
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

      if (Number(currentView) !== view) window.location.href = newUrl;

      // if (view === 1) setCurrentView("comment");
      // else if (view === 2) setCurrentView("verse");
   };

   const handleCloseEditor = () => {
      setCreateImage(false);
      setTriggerNewFetch(triggerNewFetch + 1);
   };

   useEffect(() => {
      if (router.isReady) {
         if (router.query?.tab) {
            const view = Number(router.query.tab);
            if (view === 1) setCurrentView("comment");
            else if (view === 2) setCurrentView("verse");
         }

         if (router.query?.VERSE_ID) {
            setVerseID(router.query.VERSE_ID as string);
         } else {
            const verseData = localStorage.getItem("todays-verse");

            if (verseData) {
               const verse = JSON.parse(verseData);
               setVerseID(verse?.data?.id);
            }
         }
      }
   }, [router.isReady, router.query]);

   return (
      <div className={styles.mainWrapper} ref={scrollTarget}>
         <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
         <div className={styles.addBtn}>
            <IconButton
               iconSize='4rem'
               backgroundColor='2'
               icon='add'
               cta={{ handleClick: handleClick }}
            />
         </div>
         {createImage && (
            <ImageFromVerseEditor verseData={createImage} onClose={handleCloseEditor} />
         )}

         <div className={`${styles.top} ${styles.topScrolling}`}>
            {!hiddenView && (
               <div className={styles.content}>
                  <div className={styles.verseFilter}>
                     <div className={styles.verse}>
                        <DailyVerseModal
                           contentCreationType={currentView}
                           onCreateImage={(content) => setCreateImage(content)}
                        />
                     </div>
                     <div className={styles.navigation}>
                        <ExploreNavigation
                           activateState={currentView === "comment" ? 1 : 2}
                           cta={{ handleClick: handleNavigation }}
                        />
                     </div>
                     {currentView === "comment" && (
                        <div className={styles.filter}>
                           <CommentaryFilter />
                        </div>
                     )}
                  </div>
                  <div className={`${styles.shadow} ${styles.hiddenShadow}`}></div>
               </div>
            )}
            <div
               className={`${styles.hideVerseView} ${hiddenView ? styles.isHidden : ""} `}
               onClick={() => setHiddenView(!hiddenView)}>
               <div>
                  <Icon name='arrowTop' />
               </div>
            </div>
         </div>

         <div className={`${styles.commentaries} ${hiddenView ? styles.isHidden : ""}`}>
            {currentView === "comment" && <CommentariesGrid getAll />}
            {currentView === "verse" && (
               <ImagesFromVerseGrid VERSE_ID={verseID} trigger={triggerNewFetch} />
            )}
         </div>
      </div>
   );
};
