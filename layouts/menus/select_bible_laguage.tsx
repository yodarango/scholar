// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TavailableLanuages = {
   id: string;
   icon: string;
   text: string;
};

export type TSelectBibleLanguageprops = {
   cta: {
      handleSelection: ({ id, icon, text }: TavailableLanuages) => void;
      handleCloseModal: () => void;
   };
};

export const SelectBibleLanguage = ({ cta }: TSelectBibleLanguageprops) => {
   const availableLanuages: TavailableLanuages[] = [
      { id: "english", icon: "🇺🇸", text: "English" },
      { id: "greek", icon: "🇬🇷", text: "Greek" },
      { id: "spanish", icon: "🇲🇽", text: "Spanish" },
      { id: "italian", icon: "🇮🇹", text: "Italian" }
   ];

   return (
      <>
         <PrimaryMenuBkg
            title='Select language'
            color='3'
            cta={{ handleClose: cta.handleCloseModal }}>
            {availableLanuages.map((item: TavailableLanuages) => (
               <div className={styles.menuOption} key={item.id}>
                  <MenuPrimaryOption
                     iconType='text'
                     textType='text'
                     cta={{ handleOptionClick: () => cta.handleSelection(item) }}
                     optionProperties={{ icon: item.icon, text: item.text, iconShadow: "2" }}
                  />
               </div>
            ))}
         </PrimaryMenuBkg>
      </>
   );
};
