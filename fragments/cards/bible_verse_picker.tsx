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
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

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
   const handleSelection = async (verseId: string, versionId: string) => {
      // initialize the loader
      cta.handleInitLoader(true);

      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${verseId}`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const res = await req.json();

         if (res) {
            cta.handleVerseSelection(res);

            // stop the loader
            cta.handleInitLoader(false);
         } else {
            cta.handleError();
         }
      } catch (error) {
         console.log(error);
         cta.handleInitLoader(false);
         cta.handleError();
      }
   };

   // ? bring on the fetch verse helper to get rif of the fetch call and also make sure the the new added prop "stopAtVerse"
   //? did not break anything. if the stopAtVerse == true the component will make the API call, otherwise it will only return
   //? the verseid

   const handleSelection = () => {
      if (stopAtVerse) {
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
                  onClick={() => handleSelection(`${chapterId}.${index + 1}`, versionId)}>
                  <Parragraph text={`${index + 1}`} size='main' align='center' lineHieght='.9em' />
               </div>
            ))}
         </div>
      </div>
   );
};
