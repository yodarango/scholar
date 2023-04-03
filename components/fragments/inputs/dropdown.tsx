import React, { useEffect, useState } from "react";
import {
   GRADIENT_1__DARK,
   GRADIENT_1__LIGHT,
   GRADIENT_2__DARK,
   GRADIENT_2__LIGHT
} from "../../../constants/tokens";
import Portal from "../../hoc/potal";
import { SelectCommentaryGroups } from "../../layouts/menus/select_commentary_groups";
import { Icon } from "../chunks/icons";

import styles from "./dropdown.module.css";

type TDropdownProps = {
   initialValue?: string;
   children: any;
   type?: number;
   showOptions: boolean;
   setshowOptions: (value: boolean) => void;
   customColors?: {
      dark: string;
      light: string;
   };
};
export const Dropdown = ({
   initialValue = "Select",
   children,
   type = 1,
   customColors,
   showOptions,
   setshowOptions
}: TDropdownProps) => {
   const [colors, setcolors] = useState<{ dark: string; light: string }>({
      dark: GRADIENT_1__DARK,
      light: GRADIENT_1__LIGHT
   });

   const [open, setopen] = useState(showOptions);

   useEffect(() => {
      if (type === 1) setcolors({ dark: GRADIENT_1__DARK, light: GRADIENT_1__LIGHT });
      else if (type === 2) setcolors({ dark: GRADIENT_2__DARK, light: GRADIENT_2__LIGHT });
      else if (type !== 1 && type !== 2 && customColors) setcolors(customColors);
   }, []);

   useEffect(() => {
      setopen(showOptions);
   });
   return (
      <div className={styles.mainWrapper}>
         {/* initial value text */}
         <div className={styles.dropdownInitialValue} onClick={() => setshowOptions(!showOptions)}>
            <div className={styles.dropDownArrow}>
               <p
                  className={styles.textGradient}
                  style={{
                     backgroundImage: `linear-gradient(45deg, ${colors.dark}, ${colors.light})`
                  }}>
                  {initialValue}
               </p>
               <div className={`${showOptions ? styles.optionsOpen : ""}`}>
                  <Icon name='arrowForth' color={colors.light} strokeWidth='70' />
               </div>
            </div>

            <div
               className={styles.border}
               style={{
                  backgroundImage: `linear-gradient(45deg, ${colors.dark}, ${colors.light})`
               }}></div>
         </div>

         {/*  options */}
         {open && <Portal>{children}</Portal>}
      </div>
   );
};
