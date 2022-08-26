import Link from "next/link";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectProfileOptionsProps = {
   userHasNotifications: boolean;
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
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
         icon: "image",
         description: "Make image",
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
         description: "Highlight",
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
         <PrimaryMenuBkg
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
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
                        cta={() => console.log(option.action)}
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
                              cta={() => {}}
                           />
                        </a>
                     </Link>
                  )}
               </div>
            ))}
         />
      </>
   );
};
