/*******************************************************************************************************************************
-  responsible for getting a new chapter of scripture and setting it on the rotuer for the pchapter modal to render it 
-  responsible for updating the Bible version name
-  responsible for updating Bible version Id 
-  responsible for updating Bible for updating scripture reference 
-  rather than sending any data to the parent, all the settings are saved in Local Storage
********************************************************************************************************************************/

import { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { BibleBooksWrapper } from "../../layouts/scrollers/bible_books_wrapper";
import Portal from "../../hoc/potal";

// styles
import styles from "./bible_version_scripture.module.css";

// data
import { TVersion } from "../../data/supported_bible_versions/version_type";
import { english } from "../../data/supported_bible_versions/english";

// helpers
import { parseChapterId } from "../../helpers/data/parse_bible_id";

type TBiblePreferences = {
   versionName: string;
   versionId: string;
   scriptureRef: string;
};

export const BibleVersionScripture = () => {
   // router
   const router = useRouter();

   // states
   const [showModal, setshowModal] = useState<number>(0);

   const readingPrefs: TBiblePreferences = {
      versionName: english[0].abbreviation,
      versionId: english[0].id,
      scriptureRef: "Genesis 1"
   };

   function reducer(state: any, action: any) {
      const localSExists = localStorage.getItem("reading-preferences");
      const prefs = localSExists && JSON.parse(localSExists);

      switch (action.type) {
         case "versionName":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, ...prefs, versionName: action.payload })
            );
            return { ...state, versionName: action.payload };
         case "versionId":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, ...prefs, versionId: action.payload })
            );
            return { ...state, versionId: action.payload };
         case "scriptureRef":
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ ...state, ...prefs, scriptureRef: action.payload })
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
      // if local storage exists
      if (localSExists) {
         const prefs = JSON.parse(localSExists);
         dispatch({
            type: "localStorage",
            payload: {
               ...prefs
            }
         });
      } else {
         // if not, updated
         localStorage.setItem(
            "reading-preferences",
            JSON.stringify({
               versionName: english[0].abbreviation,
               versionId: english[0].id,
               scriptureRef: "Genesis 1"
            })
         );
      }
   }, []);

   //! this will not be needed once the LS is moved to the parent. RIgh now this is just running after the
   //! inital load to get the language from the LS
   useEffect(() => {
      setTimeout(() => {
         const localSExists = localStorage.getItem("reading-preferences");
         const prefs = localSExists && JSON.parse(localSExists);
         console.log(prefs);
         dispatch({
            type: "localStorage",
            payload: {
               ...prefs
            }
         });
      }, 800);
   }, []);

   //  handle the bible version selection by updating the state and closing the modal
   const handleVersionSelection = (item: TVersion) => {
      dispatch({ type: "versionName", payload: item.abbreviation });
      dispatch({ type: "versionId", payload: item.id });
      setshowModal(0);
   };

   // handle the chapter selection: close the modal, update the state, and push to the router
   const handleChapterSelection = (content: any) => {
      location.href = `/test?chapter-id=${content}`;
      setshowModal(0);

      // parse the scriptures
      const scripture = parseChapterId(content);
      dispatch({ type: "scriptureRef", payload: scripture });
   };
   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {/* -------- opent the Bible versions mennu ------- */}
            {showModal === 1 && (
               <SelectBibleVersion
                  currLanguage={state.language}
                  cta={{
                     handleSelection: handleVersionSelection,
                     handleCloseModal: () => setshowModal(0)
                  }}
               />
            )}
            {/* -------- opent the Bible Scripture picker ------- */}
            {showModal === 2 && (
               <PrimaryStack title='Select a passage' cta={{ handleClose: () => setshowModal(0) }}>
                  <BibleBooksWrapper
                     stopAtVerse={true}
                     stopAtChapter={false}
                     stopAtChapterId={true}
                     cta={{
                        handleChoice: handleChapterSelection
                     }}
                  />
               </PrimaryStack>
            )}
         </Portal>
         <div className={styles.optionsWrapper}>
            <div className={`${styles.version} ${styles.option}`} onClick={() => setshowModal(1)}>
               <Parragraph text={state.versionName} size='small' align='left' quiet={true} />
            </div>
            <div
               className={`${styles.scriptureRef}  ${styles.option}`}
               onClick={() => setshowModal(2)}>
               <Parragraph text={state.scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
