// maps through a number passed in the props as chapterCount and makes a
// chapter selector out of each that when clicked calls the bible_verse_picker
// compnent. Id does not make any calls to the API

import { Parragraph } from "../Typography/parragraph";

// tyles
import styles from "./bible_chapter_picker.module.css";

// helpers
import { fetchBibleChapter } from "../../helpers/APIs/fetch_bible_chapter";

type TBibleChapterpickerprops = {
   versionId?: string;
   bookId: string;
   chapterCount: number;
   stopAtChapter: boolean;
   cta: {
      handleOpenVerseSelectionModal: (chapterId: number) => void;
      handleChapterSelection: (content: any) => void;
      handleInitLoader: (init: boolean) => void;
      handleError: () => void;
   };
};

export const BibleChapterpicker = ({
   versionId,
   bookId,
   chapterCount,
   cta,
   stopAtChapter
}: TBibleChapterpickerprops) => {
   // ---------- determine whether to call the API or pass the prop to render the bible_verse_picker.tsx -----------
   const handleChpaterSelection = async (verseId: number, versionId?: string) => {
      // ------------- make the call to the Bible APi
      if (stopAtChapter) {
         // initialize the loader
         cta.handleInitLoader(true);

         const verseData = await fetchBibleChapter(`${bookId}.${verseId}`);

         if (verseData) {
            cta.handleChapterSelection(verseData);

            // stop the loader
            cta.handleInitLoader(false);
         } else {
            cta.handleInitLoader(false);
            cta.handleError();
         }
      } else {
         cta.handleOpenVerseSelectionModal(verseId);
      }
   };

   return (
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
   );
};
