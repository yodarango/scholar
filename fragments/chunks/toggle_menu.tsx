import { useState } from "react";

// components
import Portal from "../../hoc/potal";
import { SelectLibraryContent } from "../../layouts/menus/select_libarary_content";
import { SelectProfileOptions } from "../../layouts/menus/select_profile_options";
import { Icon } from "./icons";

// styles
import styles from "./toggle_menu.module.css";

enum menuTypes {
   LIBRARY = 1,
   PROFILE = 2
}

type TToggleMenuProps = {
   profileMenuOptions?: {
      userHasNotifications: boolean;
   };
   iconSize?: string;
   type: menuTypes; // library menu
};

export const ToggleMenu = ({ iconSize = "3rem", type, profileMenuOptions }: TToggleMenuProps) => {
   // state
   const [showMenu, setshowMenu] = useState(false);

   return (
      <>
         <Portal>
            {showMenu && type === 1 && (
               <SelectLibraryContent cta={{ handleCloseModal: () => setshowMenu(false) }} />
            )}
            {showMenu && type === 2 && (
               <SelectProfileOptions
                  userHasNotifications={
                     profileMenuOptions ? profileMenuOptions.userHasNotifications : false
                  }
                  cta={{ handleCloseModal: () => setshowMenu(false) }}
               />
            )}
         </Portal>
         <div
            className={styles.mainWrapper}
            onClick={showMenu ? () => setshowMenu(false) : () => setshowMenu(true)}>
            <Icon name='menu' size={iconSize} color='#F1EAFF' />
         </div>
      </>
   );
};
