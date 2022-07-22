import { useState } from "react";

// comps
import { SelectBibleVersion } from "../../layouts/menus/select_bible_version";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./bible_version_scrpture.module.css";

// data
import { TVersion } from "../../data/supported_bible_versions/version_type";

type TBibleVersionScriptureProps = {
   version: string;
   scriptureRef: string;
   bibleLanguage: string;
};

export const BibleVersionScripture = ({
   version,
   scriptureRef,
   bibleLanguage
}: TBibleVersionScriptureProps) => {
   // -------------------- states --------------------------
   // ------ opens the menu to select bible versions
   const [showVersionSelectionMenu, setshowVersionSelectionMenu] = useState(false);
   const [currBibleVersion, setcurrBibleVersion] = useState(version);

   // ----------------- handle the bible version selection by updating the state and closign the modal
   const handleVersionSelection = (item: TVersion) => {
      setcurrBibleVersion(item.abbreviation);
      setshowVersionSelectionMenu(false);
   };

   return (
      <div className={styles.mainWrapper}>
         {showVersionSelectionMenu && (
            <SelectBibleVersion
               currLanguage={bibleLanguage}
               cta={{
                  handleSelection: handleVersionSelection,
                  handleCloseModal: () => setshowVersionSelectionMenu(false)
               }}
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
               onClick={() => console.log("...")}>
               <Parragraph text={scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
