// maps through a number passed in the props as chapterCount and makes a chapter selector out of each that when clicked calls the bible_verse_picker compnent. Id does not make any calls to the API

import { Parragraph } from "../Typography/parragraph";
import styles from "./bible_chapter_picker.module.css";

type TBibleChapterpickerprops = {
   bookId: string;
   chapterCount: number;
   cta: (chapterId: string) => void;
};

export const BibleChapterpicker = ({ bookId, chapterCount, cta }: TBibleChapterpickerprops) => {
   return (
      <div className={styles.mainWrapper}>
         {[...Array(chapterCount)].map((chapter, index) => (
            <div
               key={index}
               className={styles.chapter}
               onClick={() => cta(`${bookId}.${index + 1}`)}>
               <Parragraph text={`${index + 1}`} size='main' align='center' lineHieght='.9em' />
            </div>
         ))}
      </div>
   );
};
