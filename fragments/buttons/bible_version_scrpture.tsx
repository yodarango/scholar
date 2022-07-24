import { useState } from "react";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./bible_version_scrpture.module.css";

// data
import { TVersion } from "../../data/supported_bible_versions/version_type";
import { ScripturePicker } from "../../layouts/menus/scripture_picker";
import { PrimaryStack } from "../../layouts/stacks/primary_stack";
import { Bible } from "../../data/bible";
import { BibleBooksWrapper } from "../../layouts/scrollers/bible_books_wrapper";

type TBibleVersionScriptureProps = {
   versionName: string;
   versionId: string;
   scriptureRef: string;
   bibleLanguage: string;
};

export const BibleVersionScripture = ({
   versionName,
   versionId,
   scriptureRef,
   bibleLanguage
}: TBibleVersionScriptureProps) => {
   // -------------------- states --------------------------
   // ------ opens the menu to select bible versions
   const [showVersionSelectionMenu, setshowVersionSelectionMenu] = useState<boolean>(false);
   //------- opens the ScripturePicker Compoenent to select new passage
   const [showScriptureSelector, setshowScriptureSelector] = useState<boolean>(false);
   const [currBibleVersion, setcurrBibleVersion] = useState<string>(versionName);

   // ----------------- handle the bible version selection by updating the state and closign the modal
   const handleVersionSelection = (item: TVersion) => {
      setcurrBibleVersion(item.abbreviation);
      setshowVersionSelectionMenu(false);
   };

   return (
      <div className={styles.mainWrapper}>
         {/* -------- opent the Bible versions mennu ------- */}
         {showVersionSelectionMenu && (
            <SelectBibleVersion
               currLanguage={bibleLanguage}
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
                     versionId={versionId}
                     cta={() => setshowScriptureSelector(false)}
                  />
               }
            />
         )}
         <div className={styles.optionsWrapper}>
            <div
               className={`${styles.version} ${styles.option}`}
               onClick={() => setshowVersionSelectionMenu(true)}>
               <Parragraph text={currBibleVersion} size='small' align='left' quiet={true} />
            </div>
            <div
               className={`${styles.scriptureRef}  ${styles.option}`}
               onClick={() => setshowScriptureSelector(true)}>
               <Parragraph text={scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
