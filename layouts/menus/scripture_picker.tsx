/************************************************************************************
-  this component is in charged of selecting a specific scripture by going through
   he bible_chapter_picker and the bible_verse_picker components without
   making an API call except for the bible_verse_picker component which is the
   final step and therefore the only one that makes a call to the Bible API.
   However, if the prop "stopAtChapter" is passed, the call to the API will be called 
   at the chapter level.
-  The Data for the Books, Chapters and Verses is pulled from the data/bible.ts file
-  The data received from the API is passed to the parent in the cta 
- if the stopATVerse prop is false then the modal will onl return the bookId
*************************************************************************************/

import { useState } from "react";

// comps
import { BilbleBookPicker } from "../../fragments/cards/bible_book_picker";
import { BibleChapterpicker } from "../../fragments/cards/bible_chapter_picker";
import { BibleVersePicker } from "../../fragments/cards/bible_verse_picker";

// styles
import styles from "./scripture_picker.module.css";

// data
import { TBible } from "../../data/bible";

type TBilbleBookPickerProps = {
   bible: TBible;
   versionId: string;
   stopAtChapter: boolean;
   stopAtVerse: boolean;
   cta: (content: any) => void;
};

export const ScripturePicker = ({
   bible,
   stopAtChapter,
   stopAtVerse,
   cta,
   versionId
}: TBilbleBookPickerProps) => {
   // ------------------------ states ------------------------------
   const [showChapterSelectorMenu, setshowChapterSelectorMenu] = useState(false);
   const [showVerseSelectionMenu, setshowVerseSelectionMenu] = useState(false);
   const [chapterId, setchapterId] = useState<string>("");
   const [currentSelectedChapter, setcurrentSelectedChapter] = useState<number>(0);
   const [initializeLoader, setinitializeLoader] = useState<boolean>(false);

   // ------------ handle the selection of the book chapter by closing the modal and calling the chapter verses modal
   const handleOpenVerseSelectionModal = (chapterId: number) => {
      // update chapterId before rendering the BibleVersePicker
      setchapterId(`${bible.bookId}.${chapterId}`);

      // update the current selected chatpter to pass it down to the BibleVersePicker
      // -1 since it is going to be passed to call an arrray item
      setcurrentSelectedChapter(chapterId - 1);

      setshowChapterSelectorMenu(false);
      setshowVerseSelectionMenu(true);
   };

   // --------- initilaize the loader once the API function is called but bufore the API data returrns
   const handleSetInitLoader = (init: boolean) => {
      // close all the modals and initialize the loader
      setshowVerseSelectionMenu(false);
      setshowChapterSelectorMenu(false);
      setinitializeLoader(init);
   };

   //  --------- if stopAtChapter === false close the bible verse modal and open the chapter modal -------
   const handlecloseShowVerseMenuModal = () => {
      setshowVerseSelectionMenu(false);
      setshowChapterSelectorMenu(true);
   };

   return (
      <div className={styles.mainWrapper}>
         {/* ---------------- Book ------------------ */}
         {!showVerseSelectionMenu && (
            <BilbleBookPicker
               showChapterSelectorMenu={showChapterSelectorMenu}
               chapterCount={bible.chapters}
               bookTitle={bible.bookTitle}
               imgSource={bible.image}
               initLoader={initializeLoader}
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
               bookId={bible.bookId}
               cta={{
                  handleOpenVerseSelectionModal,
                  handleChapterSelection: cta,
                  handleInitLoader: (init: boolean) => handleSetInitLoader(init)
               }}
               chapterCount={bible.chapters}
            />
         )}

         {/* ---------------- verse ------------------ */}
         {showVerseSelectionMenu && (
            <BibleVersePicker
               stopAtVerse={stopAtVerse}
               chapterId={chapterId}
               verseCount={bible.verses[currentSelectedChapter]}
               versionId={versionId}
               cta={{
                  handleCloseModal: handlecloseShowVerseMenuModal,
                  handleVerseSelection: cta,
                  handleInitLoader: (init: boolean) => (
                     console.log(init), handleSetInitLoader(init)
                  )
               }}
            />
         )}
      </div>
   );
};
