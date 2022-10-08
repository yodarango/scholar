import Link from "next/link";
import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import Portal from "../../hoc/potal";
import { UserNotificationsWrapper } from "../scrollers/user_content/user_notifications_wrapper";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectProfileOptionsProps = {
   userHasNotifications: boolean;
   cta: {
      handleCloseModal: () => void;
      handleShowModal: (option: string) => void;
   };
};

export const SelectProfileOptions = ({ cta, userHasNotifications }: TSelectProfileOptionsProps) => {
   const menuOptions = [
      {
         action: "notifications",
         icon: userHasNotifications ? "bellWithNot" : "bell",
         description: "Notifications",
         color: "#F1EAFF"
      },
      {
         url: "settings",
         icon: "settings",
         description: "Settings",
         color: "#F1EAFF"
      },
      {
         url: "privacy-settings",
         icon: "privacy",
         description: "Privacy",
         color: "#F1EAFF"
      },
      {
         url: "user-verification",
         icon: "star",
         description: "Apply for user verification",
         color: "#F1EAFF"
      },
      {
         url: "bug-report",
         icon: "bug",
         description: "Report a bug",
         color: "#F1EAFF"
      },
      {
         action: "logout",
         icon: "logout",
         description: "Logout",
         color: "#F1EAFF"
      }
   ];

   return (
      <>
         <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
            {menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  {option.action && (
                     <MenuPrimaryOption
                        textType='text'
                        iconType='icon'
                        optionProperties={{
                           icon: <Icon name={option.icon} size='2rem' color={option.color} />,
                           iconShadow: option.color,
                           text: option.description
                        }}
                        cta={{
                           handleOptionClick: () => cta.handleShowModal(option.action)
                        }}
                     />
                  )}
                  {option.url && (
                     <Link href={`/users/${option.url}`}>
                        <a>
                           <MenuPrimaryOption
                              textType='text'
                              iconType='icon'
                              optionProperties={{
                                 icon: <Icon name={option.icon} size='2rem' color={option.color} />,
                                 iconShadow: option.color,
                                 text: option.description
                              }}
                              cta={{ handleOptionClick: () => {} }}
                           />
                        </a>
                     </Link>
                  )}
               </div>
            ))}
         </PrimaryMenuBkg>
      </>
   );
};
