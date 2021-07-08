import React, { useState, ReactElement } from "react";

// Components
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import GetNewVerse from "../get-new-scriptures/get-new-verse";
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";

type FormattingRulesProps = {
   renderSelectedVerseFunc: React.MouseEventHandler;
};

const FormattingRules = ({ renderSelectedVerseFunc }: FormattingRulesProps) => {
   const popupInfo = [
      {
         title: "Title",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  Type: '# Title' and get <h1 className='notification-wrapper_title'>Title</h1>
               </p>
               <p>
                  Continue to add '#' to make a smaller title, for example '###### Title' will give
                  you:<h6> Title</h6>
               </p>
            </div>
         )
      },
      {
         title: "Bold Text",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  Type: '**Text**' and get <h4 style={{ display: "inline-block" }}>Text</h4>
               </p>
            </div>
         )
      },
      {
         title: "Italic Text",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  Type: '*Text*' and get <i>Text</i>
               </p>
            </div>
         )
      },
      {
         title: "Numbered List",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  Type:
                  <br />
                  '1. One'
                  <br />
                  '2. Two'
                  <br />
                  '3. Three'
                  <br />
                  and get:
                  <ol>
                     <li>One</li>
                     <li>Two</li>
                     <li>Three</li>
                  </ol>
               </p>
            </div>
         )
      },
      {
         title: "Bulleted List",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  Type:
                  <br />
                  '* One'
                  <br />
                  '* Two'
                  <br />
                  '* Three'
                  <br />
                  and get:
                  <ul>
                     <li>Grapefruits</li>
                     <li>Kiwwis</li>
                     <li>Watermelons</li>
                  </ul>
               </p>
            </div>
         )
      },
      {
         title: "Insert A Link",
         div: (
            <div className='notification-wrapper_content'>
               <p>
                  type: '[Link Title](http://www.yourdesiredaddress.com)'' and get{" "}
                  <a
                     style={{ color: "#ff9214", textDecoration: "underline" }}
                     href='http://www.yourdesiredaddress.com'>
                     Link Title
                  </a>
               </p>
            </div>
         )
      },
      {
         title: "Blank Space",
         div: (
            <div className='notification-wrapper_content'>
               <p>type: {"&nbsp;"} and get:</p>
               <p>
                  Top text <br /> Bottom text
               </p>
            </div>
         )
      }
   ];

   //==============  FUNCTION: open popup instructions for each link
   const [openFormattingRulePopUp, setOpenFormattingRulePopUp] = useState<JSX.Element | boolean>(
      false
   );
   const openTextFormattingRule = (popupInfo: any) => {
      console.log(popupInfo.div);
      setOpenFormattingRulePopUp(
         <NotificationPopup
            title={popupInfo.title}
            closeModal={() => setOpenFormattingRulePopUp(false)}
            contentString={popupInfo.div}
         />
      );
   };

   // ===============  FUNCTION: Reference a Scripture  ======================
   type IChapter = {
      newBook?: ReactElement | boolean;
      newChapter?: ReactElement | boolean;
      newVerse?: ReactElement | boolean;
   };
   const [getNewVerseState, setgetNewVerseState] = useState<IChapter>({
      newBook: false,
      newChapter: false,
      newVerse: false
   });

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

   return (
      <>
         {getNewVerseState.newBook}
         {getNewVerseState.newChapter}
         {getNewVerseState.newVerse}
         {openFormattingRulePopUp}
         <div className={textEditorStyles.textAreasTextFromattingWrapper}>
            <div onClick={openGetNewBook}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[0])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[1])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[2])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[5])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[4])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[3])}></div>
            <div onClick={() => openTextFormattingRule(popupInfo[6])}></div>
         </div>
      </>
   );
};

export default FormattingRules;
