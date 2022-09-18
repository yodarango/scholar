/**************************************************************************************** 
-  responsible for updating the bible preferneces language 
****************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { IconGhost } from "./icon_ghost";
import { Parragraph } from "../Typography/parragraph";
import { SelectBibleLanguage, TavailableLanuages } from "../../layouts/menus/select_bible_laguage";
import Portal from "../../hoc/potal";

// styles
import styles from "./bible_language.module.css";

export const BibleLanguage = () => {
   // -------------------- states -----------
   const [showMenu, setshowMenu] = useState(false);
   const [currentLangIcon, setcurrentLangIcon] = useState("");

   // chnage the icon on the button and send the informatin to the parent to handle selection
   const handleLangSeclection = (item: TavailableLanuages) => {
      const LSExists = localStorage.getItem("reading-preferences");
      const parseLS = LSExists && JSON.parse(LSExists);
      localStorage.setItem(
         "reading-preferences",
         JSON.stringify({ ...parseLS, langIcon: item.icon, language: item.id })
      );

      setcurrentLangIcon(item.icon);
      setshowMenu(false);
   };

   useEffect(() => {
      // set time out for so that the LS on the bible_scripture_version runs first and dont
      // run in conflict trying to pull both
      setTimeout(() => {
         const LSExists = localStorage.getItem("reading-preferences");

         if (LSExists) {
            // check fo the LS settings needed
            const parseLS = JSON.parse(LSExists);
            const isLangIconSet = Object.hasOwn(parseLS, "langIcon");
            const ifLanguageSet = Object.hasOwn(parseLS, "language");
            const isThemeSet = Object.hasOwn(parseLS, "language");

            // if language is already set in LS
            if (isLangIconSet) {
               setcurrentLangIcon(parseLS.langIcon);
            }

            if (!ifLanguageSet && !isLangIconSet) {
               setcurrentLangIcon("🇺🇸");
               localStorage.setItem(
                  "reading-preferences",
                  JSON.stringify({ ...parseLS, language: "english", langIcon: "🇺🇸" })
               );
            }
         } else {
            setcurrentLangIcon("🇺🇸");
            localStorage.setItem(
               "reading-preferences",
               JSON.stringify({ language: "english", langIcon: "🇺🇸" })
            );
         }
      }, 500);
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {showMenu && (
               <SelectBibleLanguage
                  cta={{
                     handleCloseModal: () => setshowMenu(false),
                     handleSelection: handleLangSeclection
                  }}
               />
            )}
         </Portal>

         <IconGhost
            cta={showMenu ? () => setshowMenu(false) : () => setshowMenu(true)}
            icon={
               <Parragraph align='center' size='large' text={currentLangIcon} lineHieght='.9em' />
            }
         />
      </div>
   );
};
