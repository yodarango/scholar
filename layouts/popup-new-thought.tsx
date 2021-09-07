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
import popupNewThought from "../styles/layouts/PopupNewThought.module.css";

const ThoughtTextEditor = () => {
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
      <div className={`${popupNewThought.mainWrapper}`}>
         <div className={`medium-spacer`}></div>
         <TextEditor
            title='What Are You Thinking'
            formattingRules={<FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />}
            referencedVerses={referencedVerseState}
            removeVerse={removeVerse}
         />
      </div>
   );
};

export default ThoughtTextEditor;
