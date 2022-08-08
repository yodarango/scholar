/*******************************************************************************************************************************
-  responsible for getting a new chapter or a new verse of scripture and passing the data to the parent in the cta prop
-  responsible for gupdating the Bible version 
-  Passes the data from the Bible API and the new selected version in the cta object to the parent
-  the default values in BiblePreferences are passed from the parent which it pull from local storage
********************************************************************************************************************************/

import { useState, useReducer } from "react";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { BibleBooksWrapper } from "../../layouts/scrollers/bible_books_wrapper";

// styles
import styles from "./bible_version_scripture.module.css";

// data
import { TVersion } from "../../data/supported_bible_versions/version_type";

export type TBiblePreferences = {
   versionName: string;
   versionId: string;
   scriptureRef: string;
   bibleLanguage: string;
};

type TBibleVersionScriptureProps = {
   BiblePreferences: TBiblePreferences;
   cta: (content: any) => void;
};

export const BibleVersionScripture = ({ BiblePreferences, cta }: TBibleVersionScriptureProps) => {
   // -------------------- states --------------------------
   // ------ opens the menu to select bible versions
   const [showVersionSelectionMenu, setshowVersionSelectionMenu] = useState<boolean>(false);
   //------- opens the ScripturePicker Compoenent to select new passage
   const [showScriptureSelector, setshowScriptureSelector] = useState<boolean>(false);

   const readingPrefs = {
      versionName: BiblePreferences.versionName,
      versionId: BiblePreferences.versionId,
      scriptureRef: BiblePreferences.scriptureRef,
      bibleLanguage: BiblePreferences.bibleLanguage
   };

   function reducer(state: any, action: any) {
      switch (action.type) {
         case "versionName":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, versionName: action.payload })
            );
            return { ...state, versionName: action.payload };
         case "versionId":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, versionId: action.payload })
            );
            return { ...state, versionId: action.payload };
         case "scriptureRef":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, bibleLanguage: action.payload })
            );
            return { ...state, bibleLanguage: action.payload };
         case "bibleLanguage":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, bibleLanguage: action.payload })
            );
            return { ...state, bibleLanguage: action.payload };
         default:
            return state;
      }
   }

   const [state, dispatch] = useReducer(reducer, readingPrefs);

   // ----------------- handle the bible version selection by updating the state and closign the modal
   const handleVersionSelection = (item: TVersion) => {
      dispatch({ type: "versionName", payload: item.abbreviation });
      setshowVersionSelectionMenu(false);
   };

   return (
      <div className={styles.mainWrapper}>
         {/* -------- opent the Bible versions mennu ------- */}
         {showVersionSelectionMenu && (
            <SelectBibleVersion
               currLanguage={state.bibleLanguage}
               cta={{
                  handleSelection: handleVersionSelection,
                  handleCloseModal: () => setshowVersionSelectionMenu(false)
               }}
            />
         )}
         {/* -------- opent the Bible Scripture picker ------- */}
         {showScriptureSelector && (
            <PrimaryStack
               title='Select a passage'
               cta={() => setshowScriptureSelector(false)}
               content={
                  <BibleBooksWrapper
                     versionId={state.versionId}
                     stopAtVerse={true}
                     stopAtChapter={true}
                     cta={{ handleChoice: (content) => cta(content) }}
                  />
               }
            />
         )}
         <div className={styles.optionsWrapper}>
            <div
               className={`${styles.version} ${styles.option}`}
               onClick={() => setshowVersionSelectionMenu(true)}>
               <Parragraph text={state.versionName} size='small' align='left' quiet={true} />
            </div>
            <div
               className={`${styles.scriptureRef}  ${styles.option}`}
               onClick={() => setshowScriptureSelector(true)}>
               <Parragraph text={state.scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
