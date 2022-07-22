// this component is in charged of selecting a specific scripture by going through the bible_chapter_picker and the bible_verse_picker components without making an API call except for the bible_verse_picker compnent which is the final spe and therefore the only one that makes a call to the Bible API. The Data for the Books, Chaoters and Verses is pulled from the data/bible.ts file
import Image from "next/image";
import { useState } from "react";
import { CloseContent } from "../buttons/close_content";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import stlyes from "./bible_book_picker.module.css";
import { BibleChapterpicker } from "./bible_chapter_picker";

type TBilbleBookPickerProps = {
   imgSource: string;
   bookTitle: string;
   bookId: string;
   chapterCount: number;
   cta: (bookId: string) => void;
};

export const BilbleBookPicker = ({
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
         {/* ----------------- book sector ----------------- */}

         <div
            className={stlyes.cardPicker}
            onClick={!showChapterSelectorMenu ? handleOpenChaptermenu : () => {}}>
            <div className={stlyes.imageWrapper}>
               <Image src={imgSource} layout='fill' alt={bookTitle} />
            </div>
            <div className={stlyes.title}>
               <Parragraph size='main' bold={true} text={bookTitle} />
            </div>

            <div className={stlyes.chapterCount}>
               {!showChapterSelectorMenu && (
                  <Parragraph text={chapterCount} size='main' align='center' />
               )}
               {showChapterSelectorMenu && (
                  <CloseContent cta={() => setshowChapterSelectorMenu(false)} />
               )}
            </div>
         </div>

         {/* ----------------- chapter sector ----------------- */}

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
