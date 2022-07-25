// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_primary_option";
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
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const SelectBibleLanguage = ({ cta }: TSelectBibleLanguageprops) => {
   const availableLanuages: TavailableLanuages[] = [
      { id: "engish", icon: "🇺🇸", text: "English" },
      { id: "greek", icon: "🇬🇷", text: "Greek" },
      { id: "spanish", icon: "🇲🇽", text: "Spanish" },
      { id: "italian", icon: "🇮🇹", text: "Italian" }
   ];

   return (
      <>
         <PrimaryMenuBkg
            title='Select language'
            content={availableLanuages.map((item: TavailableLanuages) => (
               <div className={styles.menuOption} key={item.id}>
                  <MenuPrimaryOption
                     iconType='text'
                     textType='text'
                     cta={() => cta.handleSelection(item)}
                     optionProperties={{ icon: item.icon, text: item.text, iconShadow: "2" }}
                  />
               </div>
            ))}
            color='3'
            cta={cta.handleCloseModal}
         />
      </>
   );
};
