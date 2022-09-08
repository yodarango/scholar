import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import PortalSecondary from "../../hoc/portal_secondary";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";
import { PrimaryStack } from "../stacks/templates/primary_stack";
import { SecondaryStack } from "../stacks/templates/secondary_stack";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectPostRatingMenuProps = {
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const SelectReadingActions = ({ cta }: TSelectPostRatingMenuProps) => {
   // states
   const [showCommentaries, setshowCommentaries] = useState<boolean>(false);
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

   // handle pull comentaries
   const handleAction = (action: string) => {
      if (action === "commentaries") setshowCommentaries(true);
   };

   return (
      <>
         <PortalSecondary>
            {showCommentaries && (
               <PrimaryStack
                  title='Commentaries'
                  icon='comment'
                  cta={{ handleClose: () => setshowCommentaries(false) }}>
                  <CommentariesGrid />
               </PrimaryStack>
            )}
         </PortalSecondary>
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
                     cta={{ handleOptionClick: () => handleAction(option.action) }}
                  />
               </div>
            ))}
         />
      </>
   );
};
