/************************************************************************************
this component is in charged of selecting a specific scripture by going through
he bible_chapter_picker and the bible_verse_picker components without
making an API call except for the bible_verse_picker component which is the
final step and therefore the only one that makes a call to the Bible API.
However, if the prop "stopAtChapter" is passed, the call to the API will be called 
at the chapter level.
The Data for the Books, Chaoters and Verses is pulled from the data/bible.ts file
*************************************************************************************/

import { useState } from "react";

// comps
import { BilbleBookPicker } from "../../fragments/cards/bible_book_picker";
import { BibleChapterpicker } from "../../fragments/cards/bible_chapter_picker";
import { BibleVersePicker } from "../../fragments/cards/bible_verse_picker";

// styles
import styles from "./scripture_picker.module.css";

type TBilbleBookPickerProps = {
   versionId: string;
   imgSource: string;
   bookTitle: string;
   bookId: string;
   chapterCount: number;
   verseCount: [number];
   stopAtChapter: boolean;
   cta: (verseId: string) => void;
};

export const ScripturePicker = ({
   versionId,
   imgSource,
   bookTitle,
   cta,
   bookId,
   chapterCount,
   stopAtChapter,
   verseCount
}: TBilbleBookPickerProps) => {
   // ------------------------ states ------------------------------
   const [showChapterSelectorMenu, setshowChapterSelectorMenu] = useState(false);
   const [showVerseSelectionMenu, setshowVerseSelectionMenu] = useState(false);
   const [chapterId, setchapterId] = useState<string>("");
   const [currentSelectedChapter, setcurrentSelectedChapter] = useState<number>(0);

   // ------------ handle the selection of the book chapter by closing the modal and calling the chapter verses modal
   const openVerseSelectionModal = (chapterId: number) => {
      // update chapterId before rendering the BibleVersePicker
      setchapterId(`${bookId}.${chapterId}`);

      // update the current selected chatpter to pass it down to the BibleVersePicker
      // -1 since it is going to be passed to call an arrray item
      setcurrentSelectedChapter(chapterId - 1);

      setshowChapterSelectorMenu(false);
      setshowVerseSelectionMenu(true);
   };

   //  --------- if stopAtChapter === false close the bible verse modal and open the chapter modal -------
   const closeShowVerseMenuModal = () => {
      setshowVerseSelectionMenu(false);
      setshowChapterSelectorMenu(true);
   };

   // ---------- on Successful API call pass the content to the parent to be rendered once the final selection is made
   const handleRenderContent = (content: any) => {
      setshowVerseSelectionMenu(false);
      setshowChapterSelectorMenu(false);
      cta(content);
   };

   return (
      <div className={styles.mainWrapper}>
         {/* ---------------- Book ------------------ */}
         {!showVerseSelectionMenu && (
            <BilbleBookPicker
               showChapterSelectorMenu={showChapterSelectorMenu}
               chapterCount={chapterCount}
               bookTitle={bookTitle}
               imgSource={imgSource}
               cta={{
                  handleCloseChapterMenu: () => setshowChapterSelectorMenu(false),
                  handleOpenChaptermenu: () => setshowChapterSelectorMenu(true)
               }}
            />
         )}

         {/* ---------------- chapter ------------------ */}
         {showChapterSelectorMenu && !showVerseSelectionMenu && (
            <BibleChapterpicker
               versionId={versionId}
               stopAtChapter={stopAtChapter}
               bookId={bookId}
               cta={{ openVerseSelectionModal, handleChapterSelection: handleRenderContent }}
               chapterCount={chapterCount}
            />
         )}

         {/* ---------------- verse ------------------ */}
         {showVerseSelectionMenu && (
            <BibleVersePicker
               chapterId={chapterId}
               verseCount={verseCount[currentSelectedChapter]}
               versionId={versionId}
               cta={{
                  handleCloseModal: closeShowVerseMenuModal,
                  handleVerseSelection: handleRenderContent
               }}
            />
         )}
      </div>
   );
};
