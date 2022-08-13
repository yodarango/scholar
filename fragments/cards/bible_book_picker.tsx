// this component is in charged of selecting a specific scripture by going through the bible_chapter_picker and the bible_verse_picker components without making an API call except for the bible_verse_picker compnent which is the final spe and therefore the only one that makes a call to the Bible API. The Data for the Books, Chaoters and Verses is pulled from the data/bible.ts file
import Image from "next/image";
import { CloseContent } from "../buttons/close_content";
import { SmallLoader } from "../chunks/small_loader";

// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import stlyes from "./bible_book_picker.module.css";

type TBilbleBookPickerProps = {
   imgSource: string;
   bookTitle: string;
   chapterCount: number;
   showChapterSelectorMenu: boolean;
   initLoader: boolean;
   cta: {
      handleCloseChapterMenu: React.MouseEventHandler<HTMLDivElement>;
      handleOpenChaptermenu: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const BilbleBookPicker = ({
   imgSource,
   bookTitle,
   cta,
   chapterCount,
   initLoader,
   showChapterSelectorMenu
}: TBilbleBookPickerProps) => {
   return (
      <div className={stlyes.mainWrapper}>
         {/* ----------------- book sector ----------------- */}

         <div
            className={stlyes.cardPicker}
            onClick={!showChapterSelectorMenu ? cta.handleOpenChaptermenu : () => {}}>
            <div className={stlyes.imageWrapper}>
               <Image src={imgSource} layout='fill' alt={bookTitle} />
            </div>
            <div className={stlyes.title}>
               <Parragraph size='main' bold={true} text={bookTitle} />
            </div>

            {!initLoader && (
               <div className={stlyes.chapterCount}>
                  {!showChapterSelectorMenu && (
                     <Parragraph text={chapterCount} size='main' align='center' />
                  )}
                  {showChapterSelectorMenu && (
                     <CloseContent cta={{ handleClick: cta.handleCloseChapterMenu }} />
                  )}
               </div>
            )}
            {initLoader && <SmallLoader inline={true} />}
         </div>
      </div>
   );
};
