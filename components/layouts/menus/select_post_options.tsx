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

// data
import { notificationMessages } from "../../../data/notification_messages";

// helpers
import { copyToClipboard } from "../../../helpers/copy_text_to_clipboard";
import { reportCommentary } from "../../../helpers/functions/posts/content_report";
import { EnumContentType } from "../../../types/enums";
import { DANGER_COLOR_SECONDARY, FONT_COLOR } from "../../../constants/tokens";
import { UserContext } from "../../../context";
import { useShouldRender } from "../../../hooks/use_should_render";
import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { PopupModal } from "../../common/popup_modal";

export type TSelectpostOptionsProps = {
   showShareopton?: boolean;
   showEditOption?: boolean;
   editOptionUrl?: string;
   showDeleteOption?: boolean;
   showReportOption?: boolean;
   showSavetoFolderOption?: boolean;
   folderId?: string;
   folderName?: string;
   postid: string;
   postType: string;
   userId: string;
   contentType: EnumContentType;
   cta: {
      handleCloseModal: () => void;
      handleDelete: (id: string) => void;
      handleEdit?: (id: string) => void;
      handleSaveToFolder?: () => void;
      handleReport: () => void;
   };
};

export const SelectpostOptions = ({
   cta,
   postid,
   postType,
   editOptionUrl,
   contentType,
   userId,
   folderId,
   folderName,
   showShareopton = true,
   showEditOption = true,
   showDeleteOption = true,
   showReportOption = true,
   showSavetoFolderOption = true
}: TSelectpostOptionsProps) => {
   const [openModal, setOpenModal] = useState(false);
   const { shouldRender } = useShouldRender(parseInt(userId));
   const [showNotification, setshowNotification] = useState<{
      title: string;
      body: string;
      type: string;
   } | null>();

   // handle reporting the post
   const reportPost = async () => {
      try {
         const data = await reportCommentary({ POST_ID: postid, USER_ID: userId }, contentType);
         if (data === true) {
            setshowNotification({
               title: notificationMessages.postReported.title,
               body: notificationMessages.postReported.body,
               type: "2"
            });
         } else if (data?.error) {
            setshowNotification(data["error"]);
         }
      } catch (error) {
         console.error(error);
      }
   };

   // handle the copy to the clipboard
   const handleSharePost = () => {
      copyToClipboard(`/posts/${postType}/edit/${postid}`, () =>
         setshowNotification({
            title: notificationMessages.urlCopied.title,
            body: notificationMessages.urlCopied.body,
            type: "2"
         })
      );
   };

   // handle delete the post and send ID to the parent
   const handleSelection = () => {
      // handle deletion
      cta.handleDelete(postid);
   };

   const handleSaveToFolder = () => {
      const user = loggedInUser();
      if (!user) setOpenModal(true);
      else if (user && cta.handleSaveToFolder) cta.handleSaveToFolder();
   };

   const handleReport = () => {
      const user = loggedInUser();
      if (!user) setOpenModal(true);
      else if (user && cta.handleSaveToFolder) reportPost();
   };

   return (
      <>
         <PopupModal title='You are not login' open={openModal} onClose={() => setOpenModal(false)}>
            <img
               src='/images/bible_books/1.png'
               alt='Shroody, the mascot of the app is letting the user know that is not authenticated.'
               className={styles.modalImage}
            />
            <Parragraph
               size='main'
               text='Please login before you can bookmark a chapter.'
               align='center'
            />
         </PopupModal>
         {showNotification && (
            <Notification
               title={showNotification.title}
               body={showNotification.body}
               type={showNotification.type}
               cta={{
                  handleClose: () => {
                     cta.handleReport();
                     setshowNotification(null);
                  }
               }}
            />
         )}

         <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
            <>
               {/* ------------- Report the post ------------ */}
               {showReportOption && !shouldRender && (
                  <div className={styles.menuOption} key={1}>
                     <MenuPrimaryOptionWithSubSelection
                        type='1'
                        textType='text'
                        iconType='icon'
                        cta={{
                           handleSelection: () => {
                              handleReport();
                           }
                        }}
                        optionProperties={{
                           icon: <Icon name='warning' color='#F1EAFF' size='2rem' />,
                           iconShadow: "#F1EAFF",
                           text: "Report"
                        }}
                     />
                  </div>
               )}

               {/* ------------- Copy post link to clipboard to share ------------ */}
               {showShareopton && (
                  <div className={styles.menuOption} key={2}>
                     <MenuPrimaryOption
                        textType='text'
                        iconType='icon'
                        optionProperties={{
                           icon: <Icon name='share' color={FONT_COLOR} size='2rem' />,
                           iconShadow: FONT_COLOR,
                           text: "Share"
                        }}
                        cta={{
                           handleOptionClick: () => {
                              handleSharePost();
                           }
                        }}
                     />
                  </div>
               )}
               {/* ------------- Redirect to the edit page ------------ */}
               {showEditOption && shouldRender && (
                  <div className={styles.menuOption} key={3}>
                     {postType && !cta.handleEdit && (
                        <Link href={`/posts/${postType}/edit/${postid}`}>
                           <a>
                              <MenuPrimaryOption
                                 textType='text'
                                 iconType='icon'
                                 optionProperties={{
                                    icon: <Icon name='edit' color={FONT_COLOR} size='2rem' />,
                                    iconShadow: FONT_COLOR,
                                    text: "Edit"
                                 }}
                              />
                           </a>
                        </Link>
                     )}
                     {!postType && cta.handleEdit && (
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
                                 if (cta.handleEdit) cta.handleEdit(postid);
                              }
                           }}
                        />
                     )}
                  </div>
               )}
               {/* save to folder */}
               {showSavetoFolderOption && cta.handleSaveToFolder && (
                  <div className={styles.menuOption} key={4}>
                     <MenuPrimaryOption
                        textType='text'
                        iconType='icon'
                        optionProperties={{
                           icon: <Icon name='folder' color={FONT_COLOR} size='2rem' />,
                           iconShadow: FONT_COLOR,
                           text: folderName ? `Saved in ${folderName}` : "Save to folder"
                        }}
                        cta={{
                           handleOptionClick: handleSaveToFolder
                        }}
                     />
                  </div>
               )}

               {/* ------------- delete the post ------------ */}
               {showDeleteOption && shouldRender && (
                  <div className={styles.menuOption} key={5}>
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
               )}
            </>
         </PrimaryMenuBkg>
      </>
   );
};
