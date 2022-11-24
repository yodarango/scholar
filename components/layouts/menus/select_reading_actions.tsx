import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import { CommentaryTextEditor } from "../../templates/content/commentary_text_editor";
import { CommentariesGrid } from "../scrollers/user_content/commentaries_grid";
import { PrimaryStack } from "../stacks/templates/primary_stack";
import { SelectHighlightColor } from "./select_highlight_color";

// styles
import styles from "./select_menu_global.module.css";
import stylesLocal from "./select_reading_actions.module.css";

export type TSelectPostRatingMenuProps = {
   data: any;
   cta: {
      handleCloseModal: () => void;
      handleHighlightVerse: (
         color: string | { light: string; dark: string },
         verseId: string,
         color_ID: string
      ) => void;
   };
};

export const SelectReadingActions = ({ cta, data }: TSelectPostRatingMenuProps) => {
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
      }
      // TODO: Add make image abilitty
      // {
      //    action: "image",
      //    icon: "image",
      //    description: "Make image",
      //    color: "#F1EAFF"
      // }
   ];

   // reouter
   const router = useRouter();

   // handle actions
   const handleAction = (action: string) => {
      if (action === "commentaries") {
         router.push({
            pathname: router.pathname,
            query: { ...router.query, VERSE_ID: `${data.id}.${data.verseNumber}`, modal: 1 }
         });
         setshowStackModal(1);
      }
      if (action === "comment") {
         router.query["VERSE_ID"] = data.verseId;
         setshowStackModal(2);
      }
      if (action === "highlight") setshowStackModal(3);
   };

   // figure out if a modal is open to set it open on load
   useEffect(() => {
      if (router.isReady && router?.query?.modal && router.query?.VERSE_ID) {
         if (typeof router.query.modal === "string") {
            const modal: number = parseInt(router.query.modal);
            setshowStackModal(modal);
         }
      }
   }, [router.isReady, router.query]);
   return (
      <>
         {showStackModal === 1 && (
            // render the commentaries modal
            <PrimaryStack
               title='Commentaries'
               icon='chat'
               cta={{ handleClose: cta.handleCloseModal }}>
               <CommentariesGrid
                  verse={data.verseContent}
                  verseCitation={`${data.reference}:${data.verseNumber}`}
               />
            </PrimaryStack>
         )}
         {showStackModal === 2 && (
            // render the commentary Text Editor
            <div className={stylesLocal.newCommentStack}>
               <div className={stylesLocal.commenaryEditor}>
                  <CommentaryTextEditor
                     userAuthority={1}
                     userId='123'
                     username='Username'
                     avatar='/images/user_avatar'
                     verseCitation={`${data.reference}:${data.verseNumber}`}
                     verseContent={data.verseContent}
                     verseId={`${data.id}.${data.verseNumber}`}
                     cta={{ handleCloseModal: cta.handleCloseModal }}
                  />
               </div>
            </div>
         )}
         {showStackModal === 3 && (
            // render the color picker to highlight a verse
            <SelectHighlightColor
               cta={{
                  handleColorSelection: (
                     color: string | { light: string; dark: string },
                     ID: string
                  ) => cta.handleHighlightVerse(color, `${data.id}.${data.verseNumber}`, ID),
                  handleClose: cta.handleCloseModal
               }}
            />
         )}

         {/* render the primary menu */}
         {showStackModal === 0 && (
            <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
               {menuOptions.map((option, index) => (
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
            </PrimaryMenuBkg>
         )}
      </>
   );
};
