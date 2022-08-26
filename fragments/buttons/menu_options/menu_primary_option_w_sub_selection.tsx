// borrows the primaryMenuOption components and adds a sub selection that in turn returns a velue to the
// parent containing the selection

import { useState } from "react";

//comps
import { MenuPrimaryOption } from "./menu_primary_option";
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./menu_primary_option_w_sub_selection.module.css";
import { Icon } from "../../chunks/icons";

type TMenuPrimaryOptionWithSubSelectionProps = {
   iconType: string;
   textType: string;
   type: string;
   customSubSelections?: {
      title: string;
      value: string;
   }[];
   optionProperties: {
      icon: string | JSX.Element;
      text: string | JSX.Element;
      iconShadow?: string;
      descColor?: string;
   };
   cta: { handleSelection: (selection: string) => void };
};

export const MenuPrimaryOptionWithSubSelection = ({
   type,
   customSubSelections,
   iconType,
   textType,
   optionProperties,
   cta
}: TMenuPrimaryOptionWithSubSelectionProps) => {
   const [showSubSelectionOptions, setshowSubSelectionOptions] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper}>
         <MenuPrimaryOption
            iconType={iconType}
            textType={textType}
            optionProperties={optionProperties}
            cta={
               showSubSelectionOptions
                  ? () => setshowSubSelectionOptions(false)
                  : () => setshowSubSelectionOptions(true)
            }
         />

         {/* --------------- Renders the basic "YES" or "NO" ---------------- */}
         {showSubSelectionOptions && type === "1" && (
            <div className={styles.subOptionsWrapper}>
               <div>
                  <Parragraph text={"Are you sure?"} size='main' />
               </div>

               <div onClick={() => setshowSubSelectionOptions(false)}>
                  <Parragraph text={"NO"} size='main' bold={true} />
               </div>

               <div onClick={() => cta.handleSelection("delete")}>
                  <Parragraph text={"YES"} size='main' bold={true} color='#ff4d62' />
               </div>
            </div>
         )}

         {/* --------------- pass custom selections: text type---------------- */}
         {showSubSelectionOptions && type === "2" && (
            <div className={styles.subOptionsWrapperCustom}>
               {customSubSelections?.map((selection, index) => (
                  <div onClick={() => cta.handleSelection(selection.value)} key={index}>
                     <Parragraph text={selection.title} size='main' bold={true} />
                  </div>
               ))}
            </div>
         )}

         {/* --------------- pass custom selections: fill type ---------------- */}
         {showSubSelectionOptions && type === "3" && (
            <div className={styles.subOptionsWrapperCustom}>
               {customSubSelections?.map((selection, index) => (
                  <div onClick={() => cta.handleSelection(selection.value)} key={index}>
                     <div
                        className={styles.customOptionFilled}
                        style={{ backgroundColor: selection.title }}></div>
                  </div>
               ))}
            </div>
         )}

         {/* --------------- pass custom selections: icon type ---------------- */}
         {showSubSelectionOptions && type === "4" && (
            <div className={styles.subOptionsWrapperCustom}>
               {customSubSelections?.map((selection, index) => (
                  <div onClick={() => cta.handleSelection(selection.value)} key={index}>
                     <Icon name={selection.title} size='2.5rem' color='#F1EAFF' />
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};
