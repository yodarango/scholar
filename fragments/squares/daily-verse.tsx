// **************************  PURPOSE ******************************* //
// *** This component loads a specific verse either by calling ******* //
// *** it using the link query or by choosing a new verse manually *** //
// *** calling the "get-new-book" componennt which in effect calls *** //
// *** the proper additional components ****************************** //

// core
import React, { useState } from "react";
import Link from "next/link";

// components
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import GetNewVerse from "../get-new-scriptures/get-new-verse";
import PopupWrapper from "../../layouts/popup-wrapper";
import Commentary from "../../layouts/popup-new-comment";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import homeStyles from "../../styles/pages/Home.module.css";
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";

// helpers: types
import { TnewChapter } from "../get-new-scriptures/get-new-chapter";

// helpers: Types
import { TverseContent } from "../../pages";

type dailyVerseProps = {
   verseContent: TverseContent;
   versionId: string;
};

const DailyVerse = ({ verseContent, versionId }: dailyVerseProps) => {
   const [getNewBookState, setGetNewBookState] = useState<JSX.Element | boolean>(false);
   const [getNewChapterState, setGetNewChapterState] = useState<JSX.Element | boolean>(false);
   const [getNewVerseState, setGetNewVerseState] = useState<JSX.Element | boolean>(false);
   // ****************************   FUNCTIONS FOR CLOSING THE POPUPS  ************************* //
   // close all modals and hide the body overflow so users cant scroll
   // while the popup is open as it will cause some funiky effects
   const closeGetNewBook = () => {
      setGetNewBookState(false);
      setGetNewChapterState(false);
      setGetNewVerseState(false);
      document.body.style.overflow = "scroll";
   };

   // *********************** FUNCTIONS TO SELECT A NEW VERSE  **************************** //
   /// 1. open the list of books modal
   const openGetNewBook = () => {
      setGetNewBookState(
         <GetNewBook
            versionId={versionId}
            closeModal={closeGetNewBook}
            openGetNewChapterFunc={openGetNewChapter}
         />
      );
      document.body.style.overflow = "hidden";
   };

   /// 2. open the list of chapter per book modal
   const openGetNewChapter = (bookId: string) => {
      const selectedBookId = bookId;
      setGetNewChapterState(
         <GetNewChapter
            versionId={versionId}
            closeModal={closeGetNewBook}
            bookId={selectedBookId}
            goBackModal={() => setGetNewChapterState(false)}
            openGetNewVerse={openGetNewVerse}
         />
      );
   };

   /// 3. Open the list of verses per chapter modal
   const openGetNewVerse = (chapter: TnewChapter) => {
      setGetNewVerseState(
         <GetNewVerse
            versionId={versionId}
            closeModal={closeGetNewBook}
            chapterId={chapter.id}
            goBackModal={() => setGetNewVerseState(false)}
            renderSelectedVerse={renderSelectedVerseFunc}
         />
      );
   };

   /// 4. Open the new verse and close the Book and Chapter popups
   const renderSelectedVerseFunc = () => {
      closeGetNewBook();
   };

   // =============== FUNCTION 2: Opben the comment component on opup =============== //
   const [openCommentModalState, setOpenCommentModalState] = useState<JSX.Element | boolean>(false);
   const handleOpenCommentPopup = () => {
      setOpenCommentModalState(
         <PopupWrapper
            closeModal={() => setOpenCommentModalState(false)}
            content={<Commentary verseData={verseContent} />}
         />
      );
   };

   return (
      <>
         {openCommentModalState}
         <div data-book='books' className={selectNewScriptureStyles.selectScriptureWrapper}>
            {getNewBookState}
            {getNewChapterState}
            {getNewVerseState}
            <div
               className={`std-button ${homeStyles.stdButtonDefaultVerse}`}
               onClick={openGetNewBook}>
               <div className='std-button_gradient-text'>Select Verse</div>
            </div>
            <div className={cardStyles.squaredCardWrapper}>
               <p className='std-text-block--info'>{verseContent.reference}</p>
               <p className='std-text-block'>{verseContent.content}</p>

               <div className={`${cardStyles.squaredCardWrapperFooter}`}>
                  <Link href={`/?verse=${verseContent.previous.id}`}>
                     <a
                        className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseBackward}`}></a>
                  </Link>
                  <div
                     className={`std-vector-icon ${cardStyles.dailyVerseIcon}`}
                     onClick={handleOpenCommentPopup}></div>
                  <Link href={`/?verse=${verseContent.next.id}`}>
                     <a
                        className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseForward}`}></a>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default DailyVerse;
