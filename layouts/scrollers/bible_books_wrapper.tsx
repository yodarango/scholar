// Maps through the ScripturePicker component to create a scrollable modal for each using
// the bible.ts data file

// stlyes
import styles from "./bible_books_wrapper.module.css";

// data
import { Bible, TBible } from "../../data/bible";
import { ScripturePicker } from "../menus/scripture_picker";

type TBibleBooksWrapperProps = {
   versionId?: string;
   stopAtVerse: boolean;
   stopAtChapter: boolean;
   cta: { handleChoice: (content: any) => void };
};

export const BibleBooksWrapper = ({
   versionId = "de4e12af7f28f599-02",
   cta,
   stopAtVerse,
   stopAtChapter
}: TBibleBooksWrapperProps) => {
   return (
      <div className={styles.mainWrapper}>
         {Bible.map((book: TBible, index) => (
            <div className={styles.book} key={index}>
               <ScripturePicker
                  bible={book}
                  stopAtChapter={stopAtChapter}
                  versionId={versionId}
                  cta={cta.handleChoice}
                  stopAtVerse={stopAtVerse}
               />
            </div>
         ))}
      </div>
   );
};
