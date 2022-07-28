/********************************************************************************************* 
-  This is the final step component when selecting a new passage of the Bible. When the verse
   is selected the "handleSelection" function will make the call to the API if stopAtVerse 
   == true or return the verseId if the stopAtVese == false
*********************************************************************************************/

import styles from "./bible_verse_picker.module.css";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Header } from "../Typography/header";
import { CloseContent } from "../buttons/close_content";

// helpers
import { fetchBibleVerse } from "../../helpers/APIs/fetch_bible_verse";

type TBibleVersePickerProps = {
   chapterId: string;
   stopAtVerse: boolean;
   verseCount: number;
   versionId: string;
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
      handleVerseSelection: (content: any) => void;
      handleInitLoader: (init: boolean) => void;
      handleError: () => void;
   };
};
export const BibleVersePicker = ({
   verseCount,
   chapterId,
   cta,
   versionId,
   stopAtVerse
}: TBibleVersePickerProps) => {
   // ------------- make the call to the Bible APi
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
            cta.handleError();
         }
      } else {
         cta.handleVerseSelection(verseId);
      }
   };

   return (
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
                  <Parragraph text={`${index + 1}`} size='main' align='center' lineHieght='.9em' />
               </div>
            ))}
         </div>
      </div>
   );
};
