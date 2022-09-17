import { useState } from "react";

// comps
import { IconGhost } from "./icon_ghost";
import { Parragraph } from "../Typography/parragraph";
import { SelectBibleLanguage, TavailableLanuages } from "../../layouts/menus/select_bible_laguage";
import Portal from "../../hoc/potal";

// styles
import styles from "./bible_language.module.css";

type TBibleVersionLanguageProps = {
   language: string;
   cta: { handleSelection: (item: string) => void };
};

export const BibleLanguage = ({ cta, language }: TBibleVersionLanguageProps) => {
   // -------------------- states -----------
   const [showMenu, setshowMenu] = useState(false);
   const [currentlangIcon, setcurrentLangIcon] = useState(language);

   // chnage the icon on the button and send the informatin to the parent to handle selection
   const handleLangSeclection = (item: TavailableLanuages) => {
      setcurrentLangIcon(item.icon);
      setshowMenu(false);
      cta.handleSelection(item.id);
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
               <Parragraph align='center' size='large' text={currentlangIcon} lineHieght='.9em' />
            }
         />
      </div>
   );
};
