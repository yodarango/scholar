// Maps through the ScripturePicker component to create a scrollable modal for each using
// the bible.ts data file

// stlyes
import styles from "./bible_books_wrapper.module.css";

// data
import { Bible, TBible } from "../../data/bible";
import { ScripturePicker } from "../menus/scripture_picker";

type TBibleBooksWrapperProps = {
   versionId: string;
   cta: (content: any) => void;
};

export const BibleBooksWrapper = ({ versionId, cta }: TBibleBooksWrapperProps) => {
   return (
      <div className={styles.mainWrapper}>
         {Bible.map((book: TBible, index) => (
            <div className={styles.book} key={index}>
               <ScripturePicker bible={book} stopAtChapter={true} versionId={versionId} cta={cta} />
            </div>
         ))}
      </div>
   );
};
