// this component is in charged of selecting a specific scripture by going through the bible_chapter_picker and the bible_verse_picker components without making an API call except for the bible_verse_picker compnent which is the final spe and therefore the only one that makes a call to the Bible API. The Data for the Books, Chaoters and Verses is pulled from the data/bible.ts file
import Image from "next/image";
import { useState } from "react";

// comps
import { BibleChapterpicker } from "../../fragments/cards/bible_chapter_picker";
import { CloseContent } from "../../fragments/buttons/close_content";

// styles
import stlyes from "./scripture_selector.module.css";
import { BilbleBookPicker } from "../../fragments/cards/bible_book_picker";

type TBilbleBookPickerProps = {
   imgSource: string;
   bookTitle: string;
   bookId: string;
   chapterCount: number;
   cta: (bookId: string) => void;
};

export const ScripturePicker = ({
   imgSource,
   bookTitle,
   cta,
   bookId,
   chapterCount
}: TBilbleBookPickerProps) => {
   // ------------------------ states ------------------------------
   const [showChapterSelectorMenu, setshowChapterSelectorMenu] = useState(false);

   // ------------------- open the chapter menu modal and set the state to close the chapter menu
   const handleOpenChaptermenu = () => {
      setshowChapterSelectorMenu(true);
   };

   // ------------------- handle the selection of the book chapter by closing the modal and calling the chapter verses modal
   const handleChapterSelection = (chapterId: string) => {
      setshowChapterSelectorMenu(false);
   };

   return (
      <div className={stlyes.mainWrapper}>
         <BilbleBookPicker />
         {showChapterSelectorMenu && (
            <BibleChapterpicker
               bookId={bookId}
               cta={handleChapterSelection}
               chapterCount={chapterCount}
            />
         )}
      </div>
   );
};
