// **************************  PURPOSE ******************************* //
// *** this component allows users to comment on a specific verse *** //
// *** of the bible upon user selectino ***************************** //

// core
import React, { useEffect, useState } from "react";

// components
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import GetNewVersePostCommentary from "../get-new-scriptures/get-new-verse-post-commentary";
import Commentary from "../../layouts/popup-new-comment";

// styles
import homeStyles from "../../styles/pages/Home.module.css";
import commentEditorStyles from "../../styles/fragments/post-editors/CommentEditor.module.css";
import selectNewScriptureStyles from "../../styles/layouts/selectNewScriptureError.module.css";

// helpers: types
import { TnewChapter } from "../get-new-scriptures/get-new-chapter";
import { TverseContent } from "../../pages/verse-by-verse";
import { TnewVerse } from "../get-new-scriptures/get-new-verse-text-editor";
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

type commentEditorProps = {
   verseContent?: TverseContent;
   versionId: string;
};

type TverseActualContent = {
   bibleId: string;
   bookId: string;
   chapterId: string;
   content: string;
   copyright: string;
   id: string;
   next: { id: string; number: string };
   orgId: string;
   previous: { id: string; number: string };
   reference: string;
   verseCount: number;
};
const CommentEditor = ({ versionId }: commentEditorProps) => {
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
         <GetNewVersePostCommentary
            versionId={versionId}
            closeModal={closeGetNewBook}
            chapterId={chapter.id}
            goBackModal={() => setGetNewVerseState(false)}
            renderSelectedVerse={renderSelectedVerseFunc}
         />
      );
   };

   /// 4. Open the new verse and close the Book and Chapter popups and show the selected verse
   const [openCommentaryEditorState, setopenCommentaryEditorState] =
      useState<boolean | JSX.Element>(false);
   const [verseError, setVerseError] = useState<boolean>(false);
   const [verseContentState, setVerseContentState] = useState<TverseActualContent>({
      bibleId: "",
      bookId: "",
      chapterId: "",
      content: "",
      copyright: "",
      id: "",
      next: { id: "", number: "" },
      orgId: "",
      previous: { id: "", number: "" },
      reference: "",
      verseCount: 0
   });

   const renderSelectedVerseFunc = async (e: TnewVerse) => {
      try {
         const resp = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${e.id}?content-type=text&include-notes=false&include-chapter-numbers=false&include-verse-spans=false&include-titles=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const verseData = await resp.json();
         setVerseContentState(verseData.data);
         closeGetNewBook();
      } catch (error) {
         setVerseError(true);
         console.log(error);
      }
   };

   useEffect(() => {
      setopenCommentaryEditorState(<Commentary verseData={verseContentState} err={verseError} />);
   }, [verseContentState]);
   return (
      <>
         <div className={"medium-spacer"}></div>
         <div data-book='books' className={selectNewScriptureStyles.selectScriptureWrapper}>
            {getNewBookState}
            {getNewChapterState}
            {getNewVerseState}
            <div
               className={`std-button ${homeStyles.stdButtonDefaultVerse} ${commentEditorStyles.selectScriptButton}`}
               onClick={openGetNewBook}>
               <div className={`std-button_gradient-text`}>Select Verse</div>
            </div>
            {openCommentaryEditorState}
         </div>
      </>
   );
};

export default CommentEditor;
