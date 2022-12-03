import { useEffect, useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

// data
import { TVersion } from "../../../data/supported_bible_versions/version_type";
import { english } from "../../../data/supported_bible_versions/english";
import { spanish } from "../../../data/supported_bible_versions/spanish";
import { italian } from "../../../data/supported_bible_versions/italian";
import { greek } from "../../../data/supported_bible_versions/greek";

export type TSelectBibleVersionprops = {
   cta: {
      handleSelection: ({ id, name, abbreviation }: TVersion) => void;
      handleCloseModal: () => void;
   };
};

export const SelectBibleVersion = ({ cta }: TSelectBibleVersionprops) => {
   const [versions, setVersions] = useState<TVersion[] | null>(null);

   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         if (LSParsed.language) {
            switch (LSParsed.language) {
               case "english":
                  setVersions(english);
                  break;

               case "spanish":
                  setVersions(spanish);
                  break;

               case "italian":
                  setVersions(italian);
                  break;

               case "greek":
                  setVersions(greek);
                  break;
            }
         } else {
            setVersions(english);
         }
      }
   }, []);

   return (
      <>
         <PrimaryMenuBkg
            color='3'
            cta={{ handleClose: cta.handleCloseModal }}
            title='Select version'>
            {versions &&
               versions.map((item: TVersion, index) => (
                  <div className={styles.menuOption} key={item.id}>
                     <MenuPrimaryOption
                        iconType='text'
                        textType='text'
                        cta={{ handleOptionClick: () => cta.handleSelection(item) }}
                        optionProperties={{
                           icon: `${index + 1}`,
                           text: item.name,
                           iconShadow: "2"
                        }}
                     />
                  </div>
               ))}
         </PrimaryMenuBkg>
      </>
   );
};
