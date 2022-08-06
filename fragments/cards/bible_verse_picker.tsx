/********************************************************************************************* 
-  This is the final step component when selecting a new passage of the Bible. When the verse
   is selected the "handleSelection" function will make the call to the API if stopAtVerse 
   == true or return the verseId if the stopAtVese == false
*********************************************************************************************/
import { useState } from "react";

// styles
import styles from "./bible_verse_picker.module.css";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Header } from "../Typography/header";
import { CloseContent } from "../buttons/close_content";
import { Notification } from "../popups/notification";

// helpers
import { fetchBibleVerse } from "../../helpers/APIs/fetch_bible_verse";
import Portal from "../../hoc/potal";

// data
import { notificationMessages } from "../../data/notification_messages";

type TBibleVersePickerProps = {
   chapterId: string;
   stopAtVerse: boolean;
   verseCount: number;
   versionId: string;
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
      handleVerseSelection: (content: any) => void;
      handleInitLoader: (init: boolean) => void;
   };
};
export const BibleVersePicker = ({
   verseCount,
   chapterId,
   cta,
   versionId,
   stopAtVerse
}: TBibleVersePickerProps) => {
   // states
   const [showNotificationPopup, setshowNotificationPopup] =
      useState(false); /* controls notification popup */

   // make the call to the Bible APi
   const handleSelection = async (verseId: string, versionId?: string) => {
      if (stopAtVerse) {
         // initialize the loader
         cta.handleInitLoader(true);

         const verseData = await fetchBibleVerse(verseId);

         if (verseData) {
            cta.handleVerseSelection(verseData);

            // stop the loader
            cta.handleInitLoader(false);
         } else {
            cta.handleInitLoader(false);
            setshowNotificationPopup(true);
         }
      } else {
         // if !stopAtVerse simply return the verseId
         cta.handleVerseSelection(verseId);
      }
   };

   return (
      <>
         <Portal>
            {showNotificationPopup && (
               <Notification
                  type='4'
                  title={notificationMessages.selectNewScripture.title}
                  body={notificationMessages.selectNewScripture.body}
                  cta={() => setshowNotificationPopup(false)}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.close}>
               <CloseContent cta={cta.handleCloseModal} />
            </div>

            <div className={styles.title}>
               <Header type={2} text={"Verse"} size='large' align='center' />
            </div>

            <div className={styles.verseWrapper}>
               {[...Array(verseCount)].map((verse, index) => (
                  <div
                     key={index}
                     className={styles.verse}
                     onClick={() => handleSelection(`${chapterId}.${index + 1}`)}>
                     <Parragraph
                        text={`${index + 1}`}
                        size='main'
                        align='center'
                        lineHieght='.9em'
                     />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
