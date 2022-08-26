// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectPostRatingMenuProps = {
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const SelectReadingACtions = ({ cta }: TSelectPostRatingMenuProps) => {
   const menuOptions = [
      {
         action: "commentaries",
         icon: "chat",
         description: "Commentaries",
         color: "#F1EAFF"
      },
      {
         action: "comment",
         icon: "comment",
         description: "Comment",
         color: "#F1EAFF"
      },
      {
         action: "highlight",
         icon: "textBody",
         description: "Highlight",
         color: "#F1EAFF"
      },
      {
         action: "image",
         icon: "image",
         description: "Make image",
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
               </div>
            ))}
         />
      </>
   );
};
