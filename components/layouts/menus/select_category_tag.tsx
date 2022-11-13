import { useState, useEffect } from "react";

// comps
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";

// styles
import styles from "./select_menu_global.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../../data/category_meta";

type menuOptions = {
   id: string;
   description: string;
   color: string;
};

type TSelectCategoryTagProps = {
   title?: string;
   cta: {
      handleCloseModal: () => void;
      handleSelection: (id: string) => void;
   };
};

export const SelectCategoryTag = ({
   cta,
   title = "Select a category"
}: TSelectCategoryTagProps) => {
   const [menuOptions, setmenuOptions] = useState<menuOptions[] | null>(null);

   // set the menu options by mapping through the data options
   useEffect(() => {
      const options = categoryMeta.map((item: TcategoryMeta) => {
         const id = item.tag.replace("#", "");
         return {
            id,
            description: item.subjects.toString().replaceAll(",", ", "),
            color: item.color
         };
      });

      setmenuOptions(options);
   }, []);

   return (
      <>
         <PrimaryMenuBkg title={title} color='1' cta={{ handleClose: cta.handleCloseModal }}>
            {menuOptions?.map((option, index) => (
               <div className={`${styles.menuOption} ${styles.menuOptionScroll}`} key={index}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='filled'
                     optionProperties={{
                        icon: option.color,
                        iconShadow: option.color,
                        text: option.description
                     }}
                     cta={{ handleOptionClick: () => cta.handleSelection(option.id) }}
                  />
               </div>
            ))}
         </PrimaryMenuBkg>
      </>
   );
};
