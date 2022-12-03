/**************************************************************************************** 
-  responsible for updating the bible preferneces language 
****************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { IconGhost } from "./icon_ghost";
import { Parragraph } from "../Typography/parragraph";
import { SelectBibleLanguage, TavailableLanuages } from "../../layouts/menus/select_bible_language";
import Portal from "../../hoc/potal";

// styles
import styles from "./bible_language.module.css";

type TBibleLanguageProps = {
   langIcon: string;
};

export const BibleLanguage = ({ langIcon }: TBibleLanguageProps) => {
   // states
   const [showMenu, setshowMenu] = useState(false);
   const [currentLangIcon, setcurrentLangIcon] = useState(langIcon);

   // change the icon on the button and send the informatin to the parent to handle selection
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
