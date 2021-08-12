// **************************  PURPOSE ******************************* //
// *** This component loads a specific verse either by calling ******* //
// *** it using the link query or by choosing a new verse manually *** //
// *** calling the "get-new-book" componennt which in effect calls *** //
// *** the proper additional components ****************************** //

// core
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

//import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// components
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import GetNewVerse from "../get-new-scriptures/get-new-verse";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import homeStyles from "../../styles/pages/Home.module.css";
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";

// helpers: types
import { InewChapter } from "../get-new-scriptures/get-new-chapter";
import { InewVerse } from "../get-new-scriptures/get-new-verse";

// helpers: Types
import { TverseContent } from "../../pages/index";

// other (might pull form the DB using user preferences)
const versionId: string = "de4e12af7f28f599-01";

type dailyVerseProps = {
   verseContent: TverseContent;
};

const DailyVerse = ({ verseContent }: dailyVerseProps) => {
   type TChapter = {
      newBook?: ReactElement | boolean;
      newChapter?: ReactElement | boolean;
      newVerse?: ReactElement | boolean;
   };
   const [getNewVerseState, setgetNewVerseState] = useState<TChapter>({
      newBook: false,
      newChapter: false,
      newVerse: false
   });
   // ****************************   FUNCTIONS FOR CLOSING THE PUPUPS  ************************* //
   // close all modals
   const closeGetNewBook = () => {
      setgetNewVerseState({ newBook: false, newChapter: false, newVerse: false });
      document.body.style.overflow = "scroll";
   };

   // 1. Go back from chapter modal:
   /// change the z-index on the current modal to mimic a "goback" move
   const goBackFunc = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               versionId={versionId}
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: false
      });
   };

   // 2. Go back from verse modal:
   /// change the z-index on the current modal to mimic a "goback" move
   const goBackVerseFunc = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               versionId={versionId}
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
               versionId={versionId}
               closeModal={closeGetNewBook}
               goBackModal={goBackFunc}
               openGetNewVerse={openGetNewVerseFunc}
            />
         ),
         newVerse: false
      });
   };

   // *********************** FUNCTIONS TO SELECT A NEW VERSE  **************************** //
   /// 1. open the list of books modal
   const openGetNewBook = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               versionId={versionId}
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         )
      });
      document.body.style.overflow = "hidden";
   };

   /// 2. open the list of chapter per book modal
   const openGetNewChapterFunc = (bookId: string) => {
      const selectedBookId = bookId;
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               versionId={versionId}
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
               versionId={versionId}
               closeModal={closeGetNewBook}
               bookId={selectedBookId}
               goBackModal={goBackFunc}
               openGetNewVerse={openGetNewVerseFunc}
            />
         )
      });
      document.body.style.overflow = "hidden";
   };

   /// 3. Open the list of verses per chapter modal
   const openGetNewVerseFunc = (chapter: InewChapter) => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               versionId={versionId}
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
               versionId={versionId}
               closeModal={closeGetNewBook}
               goBackModal={goBackFunc}
               openGetNewVerse={openGetNewVerseFunc}
            />
         ),
         newVerse: (
            <GetNewVerse
               versionId={versionId}
               closeModal={closeGetNewBook}
               chapterId={chapter.id}
               goBackModal={goBackVerseFunc}
               renderSelectedVerse={renderSelectedVerseFunc}
            />
         )
      });
   };

   /// 4. Open the new verse and close the Book and Chapter popups
   const renderSelectedVerseFunc = () => {
      closeGetNewBook();
   };

   return (
      <div data-book='books' className={selectNewScriptureStyles.selectScriptureWrapper}>
         {getNewVerseState.newBook}
         {getNewVerseState.newChapter}
         {getNewVerseState.newVerse}
         <div className={`std-button ${homeStyles.stdButtonDefaultVerse}`} onClick={openGetNewBook}>
            <div className='std-button_gradient-text'>Select Verse</div>
         </div>
         <div className={cardStyles.squaredCardWrapper}>
            <p className='std-text-block--info'>{verseContent.reference}</p>
            <p className='std-text-block'>{verseContent.content}</p>

            <div className={`${cardStyles.squaredCardWrapperFooter}`}>
               <Link href={`/?verse=${verseContent.next.id}`}>
                  <a
                     className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseBackward}`}></a>
               </Link>
               <Link
                  href={{ pathname: "new-post/commentary", query: { verse: verseContent.orgId } }}>
                  <a className={`std-vector-icon ${cardStyles.dailyVerseIcon}`}></a>
               </Link>
               <Link href={`/?verse=${verseContent.previous.id}`}>
                  <a
                     className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseForward}`}></a>
               </Link>
            </div>
         </div>
      </div>
   );
};

//export default dynamic(() => Promise.resolve(DailyVerse), { ssr: false });

export default DailyVerse;
