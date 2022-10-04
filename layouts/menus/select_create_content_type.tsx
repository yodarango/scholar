import Link from "next/link";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectCreateContentTypeProps = {
   cta: {
      handleCloseModal: () => void;
   };
};

export const SelectCreateContentType = ({ cta }: TSelectCreateContentTypeProps) => {
   const menuOptions = [
      {
         url: "commentary",
         icon: "comment",
         description: "Comment",
         color: "#F1EAFF"
      },
      {
         url: "quote",
         icon: "quote",
         description: "Quote",
         color: "#F1EAFF"
      },
      {
         url: "thought",
         icon: "think",
         description: "Thought",
         color: "#F1EAFF"
      },
      {
         url: "sermon-note",
         icon: "folder",
         description: "Sermon notes",
         color: "#F1EAFF"
      }
   ];

   return (
      <>
         <PrimaryMenuBkg
            title='Create content'
            color='2'
            cta={{ handleClose: cta.handleCloseModal }}>
            {menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  <Link href={`/posts/${option.url}/new`}>
                     <a>
                        <MenuPrimaryOption
                           textType='text'
                           iconType='icon'
                           optionProperties={{
                              icon: <Icon name={option.icon} size='2rem' color={option.color} />,
                              iconShadow: option.color,
                              text: option.description
                           }}
                        />
                     </a>
                  </Link>
               </div>
            ))}
         </PrimaryMenuBkg>
      </>
   );
};
