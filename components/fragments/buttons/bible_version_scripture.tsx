/*******************************************************************************************************************************
-  responsible for getting a new chapter of scripture and setting it on the router for the chapter modal to render it 
-  responsible for updating the Bible version name
-  responsible for updating Bible version Id 
-  responsible for updating Bible for updating scripture reference 
-  rather than sending any data to the parent, all the settings are saved in Local Storage
********************************************************************************************************************************/

import { useState, useReducer, useEffect } from "react";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { BibleBooksWrapper } from "../../layouts/scrollers/bible_books_wrapper";
import Portal from "../../hoc/potal";

// styles
import styles from "./bible_version_scripture.module.css";

// data
import { TVersion } from "../../../data/supported_bible_versions/version_type";

// helpers
import { parseChapterId } from "../../../helpers/data/parse_bible_id";
import { version } from "os";

export type TBiblePreferences = {
   whiteBorder?: boolean;
   className?: string;
   versionName: string;
   versionId: string;
   scriptureRef: string;
};

export const BibleVersionScripture = ({
   versionName,
   versionId,
   scriptureRef,
   className,
   whiteBorder
}: TBiblePreferences) => {
   // states
   const [showModal, setshowModal] = useState<number>(0);

   const readingPrefs: TBiblePreferences = {
      versionName,
      versionId,
      scriptureRef
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
               JSON.stringify({
                  ...state,
                  ...prefs,
                  scriptureRef: action.payload.scripture,
                  chapterId: action.payload.chapterId
               })
            );
            return { ...state, scriptureRef: action.payload };
         case "localStorage":
            return { ...action.payload };
         default:
            return state;
      }
   }

   const [state, dispatch] = useReducer(reducer, readingPrefs);

   //  handle the bible version selection by updating the state and closing the modal
   const handleVersionSelection = (item: TVersion) => {
      dispatch({ type: "versionName", payload: item.abbreviation });
      dispatch({ type: "versionId", payload: item.id });
      setshowModal(0);
   };

   // handle the chapter selection: close the modal, update the state, and push to the router
   const handleChapterSelection = (content: any) => {
      location.href = `/read?chapter-id=${content}`;

      setshowModal(0);

      // parse the scriptures
      const scripture = parseChapterId(content);
      dispatch({ type: "scriptureRef", payload: { scripture, chapterId: content } });
   };

   // update the state when the props change 👇
   useEffect(() => {
      dispatch({ type: "versionName", payload: versionName });
   }, [versionName]);

   useEffect(() => {
      dispatch({ type: "scriptureRef", payload: scriptureRef });
   }, [scriptureRef]);

   useEffect(() => {
      dispatch({ type: "versionId", payload: versionId });
   }, [versionId]);

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {/*  open the Bible versions menu */}
            {showModal === 1 && (
               <SelectBibleVersion
                  cta={{
                     handleSelection: handleVersionSelection,
                     handleCloseModal: () => setshowModal(0)
                  }}
               />
            )}
            {/*  open the Bible Scripture picker  */}
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
         <div
            className={`${styles.optionsWrapper} ${className} ${
               whiteBorder ? styles.whiteBorder : ""
            }`}>
            <div
               className={`${styles.version} ${styles.option} ${
                  whiteBorder ? styles.whiteBorder : ""
               }`}
               onClick={() => setshowModal(showModal !== 0 ? 0 : 1)}>
               <Parragraph text={state.versionName} size='small' align='left' quiet={true} />
            </div>
            <div
               className={`${styles.scriptureRef}  ${styles.option}`}
               onClick={() => setshowModal(showModal !== 0 ? 0 : 2)}>
               <Parragraph text={state.scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
