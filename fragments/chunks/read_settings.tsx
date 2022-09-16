/***********************************************************************************************************
-   Controlls the size and theme of the reainga page. 
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
import styles from "./read_bookmark.module.css";

type TReadSettingsProps = {
   size?: string;
   cta: {
      handleFontSelection: (value: string) => void;
      handleThemeSelection: (value: string) => void;
   };
};

export const ReadSettings = ({ size = "2rem", cta }: TReadSettingsProps) => {
   // state
   const [showtMenuModal, setshowtMenuModal] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper} style={{ width: size, height: size }}>
         <Portal>
            {showtMenuModal && (
               <SelectReadingSettings
                  cta={{
                     handleThemeSelection: cta.handleThemeSelection,
                     handleFontSelection: cta.handleFontSelection,
                     handleCloseModal: () => setshowtMenuModal(false)
                  }}
               />
            )}
         </Portal>

         <div className={styles.icon}>
            <IconButton
               cta={{ handleClick: () => setshowtMenuModal(true) }}
               icon='settings'
               backgroundColor='2'
            />
         </div>
      </div>
   );
};
