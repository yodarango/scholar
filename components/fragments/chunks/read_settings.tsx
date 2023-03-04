/***********************************************************************************************************
-   Controlls the font size and theme of the reaing page. 
-   It saves the settings to the local storage of the user for now. Perhaps eventually 
    I can se it on the DB
    // TODO: Set it preferences on the local storage. Add the reading preferences type to athe types folder
************************************************************************************************************/

import { useState } from "react";

// components
import Portal from "../../hoc/potal";
import { SelectReadingSettings } from "../../layouts/menus/select_reading_settings";
import { IconButton } from "../buttons/icon_button";

// styles
import styles from "./read_settings.module.css";

type TReadSettingsProps = {
   cta: {
      handleFontSelection: (value: string) => void;
      handleThemeSelection: (value: string) => void;
   };
};

export const ReadSettings = ({ cta }: TReadSettingsProps) => {
   // state
   const [showtMenuModal, setshowtMenuModal] = useState<boolean>(false);

   // update local storage with theme slection and send value to parent
   const handleThemeSelection = (theme: string) => {
      cta.handleThemeSelection(theme);
      setshowtMenuModal(false);

      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSPArsed = JSON.parse(LSExists);
         const updateLS = {
            ...LSPArsed,
            theme
         };
         localStorage.setItem("reading-preferences", JSON.stringify(updateLS));
      } else {
         localStorage.setItem("reading-preferences", JSON.stringify({ theme }));
      }
   };

   // update local storage with font slection and send value to parent
   const handleFontSelection = (font: string) => {
      cta.handleFontSelection(font);
      setshowtMenuModal(false);
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSPArsed = JSON.parse(LSExists);
         const updateLS = {
            ...LSPArsed,
            font
         };
         localStorage.setItem("reading-preferences", JSON.stringify(updateLS));
      } else {
         localStorage.setItem("reading-preferences", JSON.stringify({ font }));
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {showtMenuModal && (
               <SelectReadingSettings
                  cta={{
                     handleThemeSelection: handleThemeSelection,
                     handleFontSelection: handleFontSelection,
                     handleCloseModal: () => setshowtMenuModal(!showtMenuModal)
                  }}
               />
            )}
         </Portal>

         <div className={styles.icon}>
            <IconButton
               custombuttonSize={true}
               cta={{ handleClick: () => setshowtMenuModal(!showtMenuModal) }}
               icon='settings'
               backgroundColor='2'
            />
         </div>
      </div>
   );
};
