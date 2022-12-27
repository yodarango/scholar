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

export type TSelectpostOptionsProps = {
   showShareopton?: boolean;
   showEditOption?: boolean;
   editOptionUrl?: string;
   showDeleteOption?: boolean;
   showReportOption?: boolean;
   postid: string;
   postType: string;
   userId: string;
   contentType: EnumContentType;
   cta: {
      handleCloseModal: () => void;
      handleDelete: (id: string) => void;
      handleEdit?: (id: string) => void;
   };
};

export const SelectpostOptions = ({
   cta,
   postid,
   postType,
   editOptionUrl,
   contentType,
   userId,
   showShareopton = true,
   showEditOption = true,
   showDeleteOption = true,
   showReportOption = true
}: TSelectpostOptionsProps) => {
   const [showNotification, setshowNotification] = useState<string>("none");

   // handle reporting the post
   const handleReport = async () => {
      try {
         const data = await reportCommentary({ POST_ID: postid, USER_ID: userId }, contentType);
         if (data) setshowNotification("report");
      } catch (error) {
         console.error(error);
      }
   };

   // handle the copy to the clipboard
   const handleSharePost = () => {
      copyToClipboard(`/posts/${postType}/edit/${postid}`, () => setshowNotification("share"));
   };

   // handle delete the post and send ID to the parent
   const handleSelection = () => {
      // handle deletion
      cta.handleDelete(postid);
   };

   return (
      <>
         {showNotification === "share" && (
            <Notification
               title={notificationMessages.urlCopied.title}
               body={notificationMessages.urlCopied.body}
               type='2'
               cta={{ handleClose: () => setshowNotification("none") }}
            />
         )}
         {showNotification === "report" && (
            <Notification
               title={notificationMessages.postReported.title}
               body={notificationMessages.postReported.body}
               type='2'
               cta={{ handleClose: () => setshowNotification("none") }}
            />
         )}
         <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
            <>
               {/* ------------- Report the post ------------ */}
               {showReportOption && (
                  <div className={styles.menuOption} key={1}>
                     <MenuPrimaryOptionWithSubSelection
                        type='1'
                        textType='text'
                        iconType='icon'
                        cta={{ handleSelection: handleReport }}
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
                           icon: <Icon name='share' color='#F1EAFF' size='2rem' />,
                           iconShadow: "#F1EAFF",
                           text: "Share"
                        }}
                        cta={{ handleOptionClick: handleSharePost }}
                     />
                  </div>
               )}
               {/* ------------- Redirect to the edit page ------------ */}
               {showEditOption && (
                  <div className={styles.menuOption} key={3}>
                     {postType && !cta.handleEdit && (
                        <Link href={`/posts/${postType}/edit/${postid}`}>
                           <a>
                              <MenuPrimaryOption
                                 textType='text'
                                 iconType='icon'
                                 optionProperties={{
                                    icon: <Icon name='edit' color='#F1EAFF' size='2rem' />,
                                    iconShadow: "#F1EAFF",
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
                              icon: <Icon name='edit' color='#F1EAFF' size='2rem' />,
                              iconShadow: "#F1EAFF",
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
               {/* ------------- delete the post ------------ */}
               {showDeleteOption && (
                  <div className={styles.menuOption} key={4}>
                     <MenuPrimaryOptionWithSubSelection
                        type='1'
                        textType='text'
                        iconType='icon'
                        cta={{ handleSelection }}
                        optionProperties={{
                           icon: <Icon name='delete' color='#ff4d62' size='2rem' />,
                           iconShadow: "#ff4d62",
                           text: "Delete",
                           descColor: "#ff4d62"
                        }}
                     />
                  </div>
               )}
            </>
         </PrimaryMenuBkg>
      </>
   );
};
