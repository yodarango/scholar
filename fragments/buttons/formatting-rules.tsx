import React, { useState, ReactElement } from "react";

// Components
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import GetNewVerseTextEditor from "../get-new-scriptures/get-new-verse-text-editor";
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";

// helpers: types
import { TnewChapter } from "../get-new-scriptures/get-new-chapter";

// dynamic values
const versionId: string = "de4e12af7f28f599-01";

type FormattingRulesProps = {
   renderSelectedVerseFunc: any;
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
         <GetNewVerseTextEditor
            versionId={versionId}
            closeModal={closeGetNewBook}
            chapterId={chapter.id}
            goBackModal={() => setGetNewVerseState(false)}
            renderSelectedVerse={renderSelectedVerseFunc}
         />
      );
   };

   /// 4. Open the new verse and close the Book and Chapter popups
   // const renderSelectedVerseFunc = () => {
   //    closeGetNewBook();
   // };
   return (
      <>
         {getNewBookState}
         {getNewChapterState}
         {getNewVerseState}
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
