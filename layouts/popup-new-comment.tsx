// **************************  PURPOSE ******************************* //
// *** This component loads a specific bible verse which ************* //
// *** is passed through the props and attaches it to the "popup" **** //
// *** component. This component does not therefore make any calls *** //
// *** to the bible API ********************************************** //

// core
import React, { useState } from "react";
import Image from "next/image";

// components
import TextEditor from "../fragments/text-editor";
import FormattingRules from "../fragments/buttons/formatting-rules";
import ResourceNotFoundError from "./resource-not-found-error";

// styles
import popNewCommentStyles from "../styles/layouts/PopupNewComment.module.css";
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

// helpers: types
import { TverseContent } from "../pages";

type commentaryProps = {
   verseData: TverseContent | undefined;
   err: boolean;
};
const Commentary = ({ verseData, err }: commentaryProps) => {
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
            {verseData && !err && (
               <div>
                  <div className={popNewCommentStyles.commentaryVerseWrapper}>
                     <p className='std-text-block--info'>{verseData.reference}</p>
                     <p className='std-text-block'>{verseData.content}</p>
                  </div>
               </div>
            )}
            {!verseData && (
               <p className={`std-text-block ${cardsLazyLoadingStyles.stdLoadingText}`}>
                  Loading...
               </p>
            )}
            {err && <ResourceNotFoundError />}
            {verseData && !err && (
               <div>
                  <TextEditor
                     contentTypeToPost='COMMENTARY'
                     verseBeingCommented={verseData}
                     title='Your Commentary'
                     formattingRules={
                        <FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />
                     }
                     referencedVerses={referencedVerseState}
                     removeVerse={removeVerse}
                  />
               </div>
            )}
         </div>
      </>
   );
};

export default Commentary;
