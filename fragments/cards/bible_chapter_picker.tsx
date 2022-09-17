/**************************************************************************************** 
-  maps through a number passed in the props as chapterCount and makes a chapter selector 
   out of each.
-  if stopAtChapter = true calls the API and returns data in the cta.handleChapterSelection
-  if stopAtChapterId = true retruns chapterId only (no API call) and returns it in the 
   cta.handleChapterSelection
-  if !stopAtChapterId and !stopAtChapter it calls handleOpenVerseSelectionModal 
****************************************************************************************/

import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Notification } from "../popups/notification";

// tyles
import styles from "./bible_chapter_picker.module.css";

// helpers
import { fetchBibleChapter } from "../../helpers/APIs/fetch_bible_chapter";
import Portal from "../../hoc/potal";

// data
import { notificationMessages } from "../../data/notification_messages";

type TBibleChapterpickerprops = {
   versionId?: string;
   bookId: string;
   chapterCount: number;
   stopAtChapter: boolean;
   stopAtChapterId: boolean;
   cta: {
      handleOpenVerseSelectionModal: (chapterId: number) => void;
      handleChapterSelection: (content: any) => void;
      handleInitLoader: (init: boolean) => void;
   };
};

export const BibleChapterpicker = ({
   versionId,
   bookId,
   chapterCount,
   cta,
   stopAtChapter,
   stopAtChapterId
}: TBibleChapterpickerprops) => {
   // states
   const [showNotificationPopup, setshowNotificationPopup] =
      useState(false); /* controls notification popup */

   //  determine whether to call the API or pass the prop to render the bible_verse_picker.tsx -----------
   const handleChpaterSelection = async (verseId: number, versionId?: string) => {
      //  make the call to the Bible APi
      if (stopAtChapter) {
         // initialize the loader
         cta.handleInitLoader(true);

         const verseData = await fetchBibleChapter(`${bookId}.${verseId}`, versionId);

         if (verseData) {
            cta.handleChapterSelection(verseData);

            // stop the loader
            cta.handleInitLoader(false);
         } else {
            cta.handleInitLoader(false);
            setshowNotificationPopup(true);
         }
      } else if (stopAtChapterId) {
         // send chapterId only
         cta.handleChapterSelection(`${bookId}.${verseId}`);
      } else {
         cta.handleOpenVerseSelectionModal(verseId);
      }
   };

   return (
      <>
         <Portal>
            {showNotificationPopup && (
               <Notification
                  type='4'
                  title={notificationMessages.selectNewScriptureError.title}
                  body={notificationMessages.selectNewScriptureError.body}
                  cta={{ handleClose: () => setshowNotificationPopup(false) }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            {[...Array(chapterCount)].map((chapter, index) => (
               <div
                  key={index}
                  className={styles.chapter}
                  onClick={() => handleChpaterSelection(index + 1)}>
                  <Parragraph text={`${index + 1}`} size='main' align='center' lineHieght='.9em' />
               </div>
            ))}
         </div>
      </>
   );
};
