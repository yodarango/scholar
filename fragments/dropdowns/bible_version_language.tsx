import { useState } from "react";

// comps
import { IconGhost } from "../buttons/icon_ghost";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./bible_version_language.module.css";

export const BibleVersionLanguage = () => {
   return (
      <div className={styles.mainWrapper}>
         <IconGhost
            cta={}
            icon={<Parragraph align='center' size='large' text={"🇺🇸"} lineHieght='.9em' />}
         />
      </div>
   );
};
