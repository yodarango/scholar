import Link from "next/link";
import { BUG_REPORT, PRIVACY, USER_SETTINGS, USER_VERIFICATION } from "../../../constants/routes";
import { FONT_COLOR } from "../../../constants/tokens";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

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
         icon: userHasNotifications ? "bellWithDot" : "bell",
         description: "Notifications",
         color: FONT_COLOR
      },
      {
         url: USER_SETTINGS,
         icon: "settings",
         description: "Settings",
         color: FONT_COLOR
      },
      {
         url: PRIVACY,
         icon: "privacy",
         description: "Privacy",
         color: FONT_COLOR
      },
      {
         url: USER_VERIFICATION,
         icon: "star",
         description: "Apply for user verification",
         color: FONT_COLOR
      },
      {
         url: BUG_REPORT,
         icon: "bug",
         description: "Report a bug",
         color: FONT_COLOR
      },
      {
         action: "logout",
         icon: "logout",
         description: "Logout",
         color: FONT_COLOR
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
                           icon: <Icon name={option.icon} size='3rem' color={option.color} />,
                           iconShadow: option.color,
                           text: option.description
                        }}
                        cta={{
                           handleOptionClick: () => cta.handleShowModal(option.action)
                        }}
                     />
                  )}
                  {option.url && (
                     <Link href={`${option.url}`}>
                        <a>
                           <MenuPrimaryOption
                              textType='text'
                              iconType='icon'
                              optionProperties={{
                                 icon: <Icon name={option.icon} size='3rem' color={option.color} />,
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
