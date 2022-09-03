import { useState } from "react";
import Portal from "../../hoc/potal";
import { SelectLibraryContent } from "../../layouts/menus/select_libarary_content";
import { Icon } from "./icons";
import styles from "./toggle_menu.module.css";

type TToggleMenuProps = {
   iconSize?: string;
   type: 1;
};

export const ToggleMenu = ({ iconSize = "4rem", type }: TToggleMenuProps) => {
   // state
   const [showSelectLibraryMenu, setshowSelectLibraryMenu] = useState(false);
   return (
      <>
         <Portal>
            {showSelectLibraryMenu && type === 1 && (
               <SelectLibraryContent
                  cta={{ handleCloseModal: () => setshowSelectLibraryMenu(false) }}
               />
            )}
         </Portal>
         <div
            className={styles.mainWrapper}
            onClick={
               showSelectLibraryMenu
                  ? () => setshowSelectLibraryMenu(false)
                  : () => setshowSelectLibraryMenu(true)
            }>
            <Icon name='menu' size={iconSize} color='#F1EAFF' />
         </div>
      </>
   );
};
