// **************************  PURPOSE ******************************* //
// *** This component loads a specific bible verse which ************* //
// *** is passed through the props and attaches it to the "popup" **** //
// *** component. This component does not therefore make any calls *** //
// *** to the bible API ********************************************** //

// core
import React, { useState } from "react";
import dynamic from "next/dynamic";

// components
import TextEditor from "../fragments/text-editor";
import FormattingRules from "../fragments/buttons/formatting-rules";

// styles
import popNewCommentStyles from "../styles/layouts/PopupNewComment.module.css";

// helpers: types
import { TverseContent } from "../pages";

type commentaryProps = {
   verseData: TverseContent;
};
const Commentary = ({ verseData }: commentaryProps) => {
   // ===========  FUNCTION: add the selected Verse to editor
   type IreferencedVerseState = {
      id: string;
      name: string;
   };

   const [referencedVerseState, setreferencedVerseIdState] = useState<IreferencedVerseState[]>([]);
   const renderSelectedVerseFunc = (verse: any) => {
      document.body.style.overflow = "scroll";
      setreferencedVerseIdState((referencedVersesState) => [
         ...referencedVersesState,
         { id: verse.id, name: verse.reference }
      ]);
   };

   // ===========  FUNCTION: remove a specific tag from the editor
   const removeVerse = (verseId: string) => {
      const nodeletedValues = referencedVerseState.filter((el) => {
         return el.id != verseId;
      });
      setreferencedVerseIdState(nodeletedValues);
   };

   return (
      <>
         <div className={`${popNewCommentStyles.mainWrapper}`}>
            <div>
               <div className={popNewCommentStyles.commentaryVerseWrapper}>
                  <p className='std-text-block--info'>{verseData.reference}</p>
                  <p className='std-text-block'>{verseData.content}</p>
               </div>
            </div>
            <div>
               <TextEditor
                  verseBeingCommented={verseData}
                  title='Your Commentary'
                  commentary={`Commentary`}
                  formattingRules={
                     <FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />
                  }
                  referencedVerses={referencedVerseState}
                  removeVerse={removeVerse}
               />
            </div>
         </div>
      </>
   );
};

export default dynamic(() => Promise.resolve(Commentary), { ssr: false });
