/*****************************************************************************************
 - menu for selecting the available groups for a commentary
    - All
    - By book
    - My folders
 /****************************************************************************************/

import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { Notification } from "../../fragments/popups/notification";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

// data
import { notificationMessages } from "../../../data/notification_messages";

// helpers
import { EnumContentType } from "../../../types/enums";
import { FONT_COLOR } from "../../../constants/tokens";

export type TSelectpostOptionsProps = {
   cta: {
      handleCloseModal: () => void;
      handleSelection: ({ label, value }: { label: string; value: string }) => void;
   };
};

export const SelectCommentaryGroups = ({ cta }: TSelectpostOptionsProps) => {
   return (
      <>
         <PrimaryMenuBkg title='Folders' color='1' cta={{ handleClose: cta.handleCloseModal }}>
            <>
               {/* See all  posts*/}
               <div className={styles.menuOption} key={1}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='icon'
                     optionProperties={{
                        icon: <Icon name='listUl' color={FONT_COLOR} size='2rem' />,
                        iconShadow: FONT_COLOR,
                        text: "All"
                     }}
                     cta={{
                        handleOptionClick: () => cta.handleSelection({ label: "All", value: "all" })
                     }}
                  />
               </div>
               <div className={styles.menuOption} key={2}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='icon'
                     optionProperties={{
                        icon: <Icon name='book' color={FONT_COLOR} size='2rem' />,
                        iconShadow: FONT_COLOR,
                        text: "By book "
                     }}
                     cta={{
                        handleOptionClick: () =>
                           cta.handleSelection({ label: "By book", value: "by-book" })
                     }}
                  />
               </div>
               <div className={styles.menuOption} key={3}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='icon'
                     optionProperties={{
                        icon: <Icon name='book' color={FONT_COLOR} size='2rem' />,
                        iconShadow: FONT_COLOR,
                        text: "My folders "
                     }}
                     cta={{
                        handleOptionClick: () =>
                           cta.handleSelection({ label: "My folders", value: "my-folders" })
                     }}
                  />
               </div>
            </>
         </PrimaryMenuBkg>
      </>
   );
};
