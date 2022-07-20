// core
import { useState, useEffect } from "react";
import Link from "next/link";

// graphQL
import client from "../apollo-client";
import { DELETE_ONE_SEMRON_POST, REPORT_SERMON_NOTE } from "../graphql/posts/sermon_notes";

// child comps
import ConfirmationPopup from "../fragments/confirmation-popup";
import NotificationPopup from "../fragments/popups/notification";
import QuickUserInfoPopup from "../fragments/squares/quick-user-info-popup";

// styles
import sermonNotesPostStyles from "../styles/posts/SermonNotesPost.module.css";

// helpers
import { loggedInUser } from "../helpers/auth/get-loggedin-user";

// types
import { Tuser } from "../pages/users/[userId]";

export type TsermonPost = {
   ID: string;
   content: string;
   USER_ID: string;
   DROPBOX_ID: string;
   title: string;
   category_tags: string;
   posted_on: string;
   total_count: number;
   file_url: string;
   creator: {
      ID: string;
      signature: string;
      avatar: string;
      authority_level: number;
      approval_rating: string | number;
      first_name?: string;
      last_name?: string;
      my_church: string;
   };
};

type sermonNotesPostProps = {
   sermonPost: TsermonPost;
};

const SermonNotesPost = ({ sermonPost }: sermonNotesPostProps) => {
   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [renderDeleteEditOptionsState, setRenderDeleteEditOptionsState] = useState<boolean>(false);
   const [renderReportOptionState, setRenderReportOptionState] = useState<boolean>(false);

   useEffect(() => {
      const authJWT = loggedInUser();
      const creatorID = sermonPost.creator.ID ? parseInt(sermonPost.creator.ID) : null;
      if (authJWT) {
         setRenderDeleteEditOptionsState(creatorID === authJWT.ID);
         setRenderReportOptionState(creatorID !== authJWT.ID);
         console.log(creatorID === authJWT.ID);
      }
   }, []);

   const [confirmationPopUpState, setconfirmationPopUpState] =
      useState<boolean | JSX.Element>(false);
   const [notificationPupUpState, setNotificationPupUpState] =
      useState<JSX.Element | boolean>(false);

   const [deletedPostState, setDeletedPostState] = useState(false);
   const handleDeleteSermonNote = async (id: string) => {
      try {
         await client.mutate({
            mutation: DELETE_ONE_SEMRON_POST,
            variables: { ID: id }
         });
      } catch (error) {
         console.log(error);
      }
   };
   const handleDeleteConfirmation = async (id: string, DROPBOX_ID: string) => {
      try {
         const request = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
            method: "POST",
            body: `{"path": "${DROPBOX_ID}"}`,
            headers: {
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN}`,
               "Content-Type": "application/json"
            }
         });
         if (request.status === 200) {
            setconfirmationPopUpState(false);
            handleDeleteSermonNote(id);
            setDeletedPostState(true);
         } else {
            setconfirmationPopUpState(false);
            setNotificationPupUpState(
               <NotificationPopup
                  title='Oh no!'
                  contentString='Something has gone south ⬇️. Please try again later! '
                  closeModal={() => setNotificationPupUpState(false)}
                  newClass='notification-wrapper--Red'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setconfirmationPopUpState(false);
         setNotificationPupUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️. Please try again later! '
               closeModal={() => setNotificationPupUpState(false)}
               newClass='notification-wrapper--Red'
            />
         );
      }
   };

   const promptConfirmationPopUp = (id: string, DROPBOX_ID: string) => {
      setconfirmationPopUpState(
         <ConfirmationPopup
            title='Are you sure you want to delete this post?'
            cancel={() => setconfirmationPopUpState(false)}
            confirm={() => handleDeleteConfirmation(id, DROPBOX_ID)}
         />
      );
   };

   // ================= FUNCTION 7: Handle Reporting the Post  ===================//
   const handleReportPost = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: REPORT_SERMON_NOTE,
            variables: {
               SERMON_NOTE_ID: id
            }
         });

         if (data.data.report_sermon_note) {
            setconfirmationPopUpState(false);
            setNotificationPupUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPupUpState(false)}
                  title='Report Has Been Submitted'
                  contentString='We are reviewing your report and will follow the proper procedures 👮‍♂️'
                  newClass='notification-wrapper--Sucess'
               />
            );
         } else {
            setconfirmationPopUpState(false);
            setNotificationPupUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPupUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setconfirmationPopUpState(false);
         setNotificationPupUpState(
            <NotificationPopup
               closeModal={() => setNotificationPupUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   const handleReportConfirmation = (id: string) => {
      setconfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setNotificationPupUpState(false)}
            title={"Are you sure you want to report this post?"}
            confirm={() => handleReportPost(id)}
         />
      );
   };

   // open the user info popup
   const [userQuickAccessInfoPopup, setUserQuickAccessInfoPopup] =
      useState<boolean | JSX.Element>(false);

   const handleQuickInfoAccessPopup = (user: any) => {
      setUserQuickAccessInfoPopup(
         <QuickUserInfoPopup user={user} closeModal={() => setUserQuickAccessInfoPopup(false)} />
      );
   };

   return (
      <>
         {notificationPupUpState}
         {userQuickAccessInfoPopup}
         {!deletedPostState && (
            <div className={sermonNotesPostStyles.mainWrapper}>
               {confirmationPopUpState}
               <div
                  className={sermonNotesPostStyles.commentCardHeader}
                  id={`category-${sermonPost.category_tags.split(" ")[0].replace("#", "")}`}>
                  {renderDeleteEditOptionsState && (
                     <span
                        className={(sermonNotesPostStyles.cardIcon, sermonNotesPostStyles.delete)}
                        onClick={() =>
                           promptConfirmationPopUp(sermonPost.ID, sermonPost.DROPBOX_ID)
                        }></span>
                  )}
                  {renderDeleteEditOptionsState && (
                     <Link href={`/posts/sermon-note/edit/${sermonPost.ID}`}>
                        <a
                           className={
                              (sermonNotesPostStyles.cardIcon, sermonNotesPostStyles.edit)
                           }></a>
                     </Link>
                  )}
                  {renderReportOptionState && (
                     <span
                        className={(sermonNotesPostStyles.cardIcon, sermonNotesPostStyles.report)}
                        onClick={() => handleReportConfirmation(sermonPost.ID)}></span>
                  )}
               </div>
               {sermonPost.creator && sermonPost.creator.authority_level && (
                  <div
                     className={sermonNotesPostStyles.creatorMainWrapper}
                     onClick={() => handleQuickInfoAccessPopup(sermonPost.creator)}>
                     <div
                        className={`${sermonNotesPostStyles.reputationWrapper} ${
                           sermonPost.creator.authority_level == 2
                              ? sermonNotesPostStyles.commentCardHeaderAvatarImgBkgTrusted
                              : ""
                        }`}>
                        <img
                           src={sermonPost.creator.avatar}
                           alt='Avatar'
                           className={`${sermonNotesPostStyles.avatar}`}
                        />
                     </div>
                     {sermonPost.creator.authority_level == 2 && (
                        <span className={sermonNotesPostStyles.trustedPointer}></span>
                     )}
                  </div>
               )}
               <h3 className={sermonNotesPostStyles.title}>{sermonPost.title}</h3>
               <h4 className={sermonNotesPostStyles.signature}>{sermonPost.creator.signature}</h4>
               <p className={sermonNotesPostStyles.postedOn}>{sermonPost.posted_on}</p>
               <a
                  href={`${sermonPost.file_url}`}
                  className={sermonNotesPostStyles.sermonLink}
                  target='_blank'
                  rel='noopener noreferrer'>
                  See sermon notes
               </a>
            </div>
         )}
      </>
   );
};

export default SermonNotesPost;
