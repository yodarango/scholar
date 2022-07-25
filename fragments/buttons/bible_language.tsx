import { useState } from "react";

// comps
import { IconGhost } from "./icon_ghost";
import { Parragraph } from "../Typography/parragraph";
import { SelectBibleLanguage, TavailableLanuages } from "../../layouts/menus/select_bible_laguage";

// styles
import styles from "./bible_language.module.css";

type TBibleVersionLanguageProps = {
   language: string;
   cta: (item: string) => void;
};

export const BibleLanguage = ({ cta, language }: TBibleVersionLanguageProps) => {
   // -------------------- states -----------
   const [showMenu, setshowMenu] = useState(false);
   const [currentlangIcon, setcurrentLangIcon] = useState(language);

   // chnage the icon on the button and send the informatin to the parent to handle selection
   const handleLangSeclection = (item: TavailableLanuages) => {
      setcurrentLangIcon(item.icon);
      setshowMenu(false);
      cta(item.id);
   };

   return (
      <div className={styles.mainWrapper}>
         {showMenu && (
            <SelectBibleLanguage
               cta={{
                  handleCloseModal: () => setshowMenu(false),
                  handleSelection: handleLangSeclection
               }}
            />
         )}
         <IconGhost
            cta={showMenu ? () => setshowMenu(false) : () => setshowMenu(true)}
            icon={
               <Parragraph align='center' size='large' text={currentlangIcon} lineHieght='.9em' />
            }
         />
      </div>
   );
};
