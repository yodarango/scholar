// maps through a number passed in the props as chapterCount and makes a
// chapter selector out of each that when clicked calls the bible_verse_picker
// compnent. Id does not make any calls to the API

import { Parragraph } from "../Typography/parragraph";

// tyles
import styles from "./bible_chapter_picker.module.css";

// helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";
import React from "react";

type TBibleChapterpickerprops = {
   versionId?: string;
   bookId: string;
   chapterCount: number;
   stopAtChapter: boolean;
   cta: {
      openVerseSelectionModal: (chapterId: number) => void;
      handleChapterSelection: (content: any) => void;
   };
};

export const BibleChapterpicker = ({
   versionId,
   bookId,
   chapterCount,
   cta,
   stopAtChapter
}: TBibleChapterpickerprops) => {
   // ------------- make the call to the Bible APi
   async function handleSelection(chapterId: string, versionId: string | undefined) {
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const res = await req.json();
         cta.handleChapterSelection(res);
         //res.data ? (setGetNewVerse(res.data), setLoadingState("done")) : setLoadingState("error");
      } catch (error) {
         //  setLoadingState("error");
         //  setGetNewVerse(null);
         console.log(error);
      }
   }

   // ---------- determine whether to call the API or pass the prop to render the bible_verse_picker.tsx -----------
   const handleChpaterSelection = (verseId: number, versionId: string | undefined) => {
      if (!stopAtChapter) {
         cta.openVerseSelectionModal(verseId);
         return;
      }

      handleSelection(`${bookId}.${verseId + 1}`, versionId);
   };

   return (
      <div className={styles.mainWrapper}>
         {[...Array(chapterCount)].map((chapter, index) => (
            <div
               key={index}
               className={styles.chapter}
               onClick={() => handleChpaterSelection(index + 1, versionId)}>
               <Parragraph text={`${index + 1}`} size='main' align='center' lineHieght='.9em' />
            </div>
         ))}
      </div>
   );
};
