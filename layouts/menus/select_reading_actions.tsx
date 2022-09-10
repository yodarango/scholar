import { useRouter } from "next/router";
import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import PortalSecondary from "../../hoc/portal_secondary";
import { CommentaryTextEditor } from "../../templates/content/commentary_text_editor";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";
import { PrimaryStack } from "../stacks/templates/primary_stack";

// styles
import styles from "./select_menu_global.module.css";
import stylesLocal from "./select_reading_actions.module.css";

export type TSelectPostRatingMenuProps = {
   verseId: string;
   verse: string;
   verseCitation: string;
   cta: {
      handleCloseModal: () => void;
      handleHighlightVerse: (verseId: string) => void;
   };
};

export const SelectReadingActions = ({
   cta,
   verseId,
   verse,
   verseCitation
}: TSelectPostRatingMenuProps) => {
   // states
   const [showStackModal, setshowStackModal] = useState<number>(0);
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

   // reouter
   const router = useRouter();
   // handle actions
   const handleAction = (action: string) => {
      console.log(action);
      if (action === "commentaries") setshowStackModal(1);
      if (action === "comment") {
         router.query["verse-id"] = verseId;
         setshowStackModal(2);
      }
      if (action === "highlight") setshowStackModal(3);
   };

   return (
      <>
         <PortalSecondary>
            {showStackModal === 1 && (
               <PrimaryStack
                  title='Commentaries'
                  icon='chat'
                  cta={{ handleClose: () => cta.handleCloseModal() }}>
                  <CommentariesGrid verse={verse} verseCitation={verseCitation} verseId={verseId} />
               </PrimaryStack>
            )}
            {showStackModal === 2 && (
               <div className={stylesLocal.newCommentStack}>
                  <div className={stylesLocal.commenaryEditor}>
                     <CommentaryTextEditor
                        userAuthority={1}
                        userId='123'
                        username='Username'
                        avatar='/images/user_avatar'
                        cta={{ handleCloseModal: () => cta.handleCloseModal() }}
                     />
                  </div>
               </div>
            )}
            {
               showStackModal === 3 && verseId // delete this
               // missing component create custom color: Figma
            }
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
