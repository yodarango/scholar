/*******************************************************************************************************************************
-  responsible for getting a new chapter or a new verse of scripture and passing the data to the parent in the cta prop
-  responsible for gupdating the Bible version 
-  Passes the data from the Bible API and the new selected version in the cta object to the parent
-  the default values in BiblePreferences are passed from the parent which it pull from local storage
********************************************************************************************************************************/

import { useState, useReducer, useEffect } from "react";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { BibleBooksWrapper } from "../../layouts/scrollers/bible_books_wrapper";

// styles
import styles from "./bible_version_scripture.module.css";

// data
import { TVersion } from "../../data/supported_bible_versions/version_type";
import { english } from "../../data/supported_bible_versions/english";
import { useRouter } from "next/router";

type TBiblePreferences = {
   versionName: string;
   versionId: string;
   scriptureRef: string;
   bibleLanguage: string;
};

export const BibleVersionScripture = () => {
   // router
   const router = useRouter();

   // states
   const [showVersionSelectionMenu, setshowVersionSelectionMenu] = useState<boolean>(false);
   const [showScriptureSelector, setshowScriptureSelector] = useState<boolean>(false);

   const readingPrefs: TBiblePreferences = {
      versionName: english[0].abbreviation,
      versionId: english[0].id,
      scriptureRef: "Gen 1",
      bibleLanguage: "english"
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
               JSON.stringify({ ...state, scriptureRef: action.payload })
            );
            return { ...state, scriptureRef: action.payload };
         case "localStorage":
            return { ...action.payload };
         default:
            return state;
      }
   }

   const [state, dispatch] = useReducer(reducer, readingPrefs);

   // update the state from local storage
   useEffect(() => {
      const localSExists = localStorage.getItem("reading-preferences");
      if (localSExists) {
         const prefs = JSON.parse(localSExists);
         dispatch({
            type: "localStorage",
            payload: {
               versionName: prefs.versionName,
               versionId: prefs.versionId,
               scriptureRef: prefs.scriptureRef,
               bibleLanguage: prefs.bibleLanguage
            }
         });
      } else {
         localStorage.setItem(
            "reading-preferences",
            JSON.stringify({
               versionName: english[0].abbreviation,
               versionId: english[0].id,
               scriptureRef: "Gen 1",
               bibleLanguage: "english"
            })
         );
      }
   }, []);

   //  handle the bible version selection by updating the state and closign the modal
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
               cta={{ handleClose: () => setshowScriptureSelector(false) }}>
               <BibleBooksWrapper
                  versionId={state.versionId}
                  stopAtVerse={true}
                  stopAtChapter={true}
                  cta={{ handleChoice: (content) => router.push(`/test?${content}`) }}
               />
            </PrimaryStack>
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
