/*****************************************************************************************
 - options for a post include:
   -  Report: handles posting to DB from this component
   -  Share: copies link to the client's clipboard
   -  Edit: redirects to the edit/ID page
   -  Delte: handles deleting the post from this comp and if succeeds it sends the ID to 
      parent so it can remove post from array
 /****************************************************************************************/

import Link from "next/link";
import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { MenuPrimaryOptionWithSubSelection } from "../../fragments/buttons/menu_options/menu_primary_option_w_sub_selection";
import { Icon } from "../../fragments/chunks/icons";
import { Notification } from "../../fragments/popups/notification";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

import { EnumContentType } from "../../../types/enums";
import { DANGER_COLOR_SECONDARY, FONT_COLOR } from "../../../constants/tokens";

export type TSelectpostOptionsProps = {
   folderId: string | number;
   cta: {
      handleCloseModal: () => void;
      handleDelete: (id: string | number) => void;
      handleEdit?: (id: string | number) => void;
   };
};

export const SelectFolderOptions = ({ cta, folderId }: TSelectpostOptionsProps) => {
   const [showNotification, setshowNotification] = useState<string>("none");

   // handle delete the post and send ID to the parent
   const handleSelection = () => {
      // handle deletion
      cta.handleDelete(folderId);
   };

   return (
      <>
         <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
            <>
               {/*  Redirect to the edit page  */}
               <div className={styles.menuOption} key={3}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='icon'
                     optionProperties={{
                        icon: <Icon name='edit' color={FONT_COLOR} size='2rem' />,
                        iconShadow: FONT_COLOR,
                        text: "Edit"
                     }}
                     cta={{
                        handleOptionClick: () => {
                           if (cta.handleEdit) cta.handleEdit(folderId);
                        }
                     }}
                  />
               </div>

               {/*  delete the post  */}

               <div className={styles.menuOption} key={4}>
                  <MenuPrimaryOptionWithSubSelection
                     type='1'
                     textType='text'
                     iconType='icon'
                     cta={{ handleSelection }}
                     optionProperties={{
                        icon: <Icon name='delete' color={DANGER_COLOR_SECONDARY} size='2rem' />,
                        iconShadow: DANGER_COLOR_SECONDARY,
                        text: "Delete",
                        descColor: DANGER_COLOR_SECONDARY
                     }}
                  />
               </div>
            </>
         </PrimaryMenuBkg>
      </>
   );
};
