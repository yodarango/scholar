import styles from "./bible_verse_picker.module.css";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Header } from "../Typography/header";
import { CloseContent } from "../buttons/close_content";

// helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

type TBibleVersePickerProps = {
   chapterId: string;
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
   versionId
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
         cta.handleVerseSelection(res);

         // stop the loader
         cta.handleInitLoader(false);

         //res.data ? (setGetNewVerse(res.data), setLoadingState("done")) : setLoadingState("error");
      } catch (error) {
         //  setLoadingState("error");
         //  setGetNewVerse(null);
         console.log(error);
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
