import { useState, useEffect } from "react";

// comps
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { CategoryTag } from "../../fragments/chunks/category_tag";

// styles
import styles from "./select_menu_global.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../data/category_meta";

type menuOptions = {
   id: string;
   description: string;
   color: string;
};

type TSelectCategoryTagProps = {
   cta: {
      handleCloseModal: () => void;
      handleSelection: (id: string) => void;
   };
};

export const SelectCategoryTag = ({ cta }: TSelectCategoryTagProps) => {
   const [menuOptions, setmenuOptions] = useState<menuOptions[] | null>(null);

   // set the menu options by mapping through the data options
   useEffect(() => {
      const options = categoryMeta.map((item: TcategoryMeta) => {
         const id = item.tag.replace("#", "");
         return {
            id: item.tag.replace("#", ""),
            description: item.subjects.toString().replaceAll(",", ", "),
            color: item.color
         };
      });

      setmenuOptions(options);
   }, []);

   return (
      <>
         <PrimaryMenuBkg
            title='Select a category'
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions?.map((option, index) => (
               <div className={`${styles.menuOption} ${styles.menuOptionScroll}`} key={index}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='filled'
                     optionProperties={{
                        icon: option.color,
                        iconShadow: option.color,
                        text: option.description
                     }}
                     cta={() => cta.handleSelection(option.id)}
                  />
               </div>
            ))}
         />
      </>
   );
};
