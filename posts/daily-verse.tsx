// core
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";

// components
import GetNewBook from "../fragments/get-new-scriptures/get-new-book";
import GetNewChapter from "../fragments/get-new-scriptures/get-new-chapter";
import GetNewVerse from "../fragments/get-new-scriptures/get-new-verse";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import homeStyles from "../styles/pages/Home.module.css";
import selectNewScriptureStyles from "../styles/layouts/SelectNewScripture.module.css";

// others
import { bibleApi } from "../env";

export default function DailyVerse(): JSX.Element {
   type IInitialVerse = {
      content: string;
      reference: string;
   };

   type IChapter = {
      newBook?: ReactElement | boolean;
      newChapter?: ReactElement | boolean;
      newVerse?: ReactElement | boolean;
   };
   const [verse, setverse] = useState<IInitialVerse>({ content: "", reference: "" });
   const [getNewVerseState, setgetNewVerseState] = useState<IChapter>({
      newBook: false,
      newChapter: false,
      newVerse: false
   });

   // On Load of Home Page and upon change of Verse:
   /// calls default verse upon component rendering
   type ISwitchVerse = {
      previousVerseId: string;
      nextVerseId: string;
   };
   const [initialVerse, setInitialVerse] = useState<string>("JHN.3.16");
   const [switchVerse, setSwitchVerse] = useState<ISwitchVerse>({
      previousVerseId: "JHN.3.15",
      nextVerseId: "JHN.3.17"
   });

   const callBibleApi: () => void = async () => {
      const requ = await fetch(
         `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${initialVerse}?content-type=text&include-verse-numbers=false`,
         {
            method: "GET",
            headers: {
               "api-key": bibleApi
            }
         }
      );

      const json = await requ.json();
      setverse(json.data);

      setSwitchVerse({
         previousVerseId: `${json.data.previous.id}`,
         nextVerseId: `${json.data.next.id}`
      });
      console.log(json.data);
   };

   useEffect(() => {
      callBibleApi();
   }, [initialVerse]);

   // close all modals
   const closeGetNewBook = () => {
      setgetNewVerseState({ newBook: false, newChapter: false, newVerse: false });
      document.body.style.overflow = "scroll";
   };

   // Go back from chapter modal:
   /// change the z-index on the current modal to mimic a "goback" move
   const goBackFunc = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: false
      });
   };

   // Go back from verse modal:
   /// change the z-index on the current modal to mimic a "goback" move
   const goBackVerseFunc = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
               closeModal={closeGetNewBook}
               goBackModal={goBackFunc}
               openGetNewVerse={openGetNewVerseFunc}
            />
         ),
         newVerse: false
      });
   };
   // steps to selecting a new verse:
   /// 1. open the list of books modal
   const openGetNewBook = () => {
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         )
      });
      document.body.style.overflow = "hidden";
   };

   /// 2. open the list of chapter per book modal
   const openGetNewChapterFunc = (e: any) => {
      const selectedBookId = e.currentTarget.dataset.book;
      setgetNewVerseState({
         newBook: (
            <GetNewBook
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
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
   const openGetNewVerseFunc = (e: any) => {
      const selectedChapterId = e.currentTarget.dataset.chapter;
      console.log(selectedChapterId);

      setgetNewVerseState({
         newBook: (
            <GetNewBook
               closeModal={closeGetNewBook}
               openGetNewChapterFunc={openGetNewChapterFunc}
            />
         ),
         newChapter: (
            <GetNewChapter
               closeModal={closeGetNewBook}
               goBackModal={goBackFunc}
               openGetNewVerse={openGetNewVerseFunc}
            />
         ),
         newVerse: (
            <GetNewVerse
               closeModal={closeGetNewBook}
               chapterId={selectedChapterId}
               goBackModal={goBackVerseFunc}
               renderSelectedVerse={renderSelectedVerseFunc}
            />
         )
      });
   };

   /// 4. Open the new verse
   const renderSelectedVerseFunc = (e: any) => {
      const selectedVerseId = e.currentTarget.dataset.verse;
      setInitialVerse(selectedVerseId);
      closeGetNewBook();
   };

   /// 5. go back a verse
   const goBackAVerse = () => {
      setInitialVerse(switchVerse.previousVerseId);
   };

   /// 6. go forward a verse
   const goFordAVerse = () => {
      setInitialVerse(switchVerse.nextVerseId);
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
            <p className='std-text-block--info'>{verse.reference}</p>
            <p className='std-text-block'>{verse.content}</p>

            <div className={`${cardStyles.squaredCardWrapperFooter}`}>
               <div
                  className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseBackward}`}
                  onClick={goBackAVerse}></div>
               <Link href={{ pathname: "new-post/commentary", query: { verse: initialVerse } }}>
                  <a className={`std-vector-icon ${cardStyles.dailyVerseIcon}`}></a>
               </Link>
               <div
                  className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseForward}`}
                  onClick={goFordAVerse}></div>
            </div>
         </div>
      </div>
   );
}
