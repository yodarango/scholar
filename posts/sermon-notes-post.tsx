// core
import { useState, useEffect } from "react";
import Link from "next/link";

// graphQL
import client from "../apollo-client";
import { DELETE_ONE_SEMRON_POST } from "../graphql/posts/sermon_notes";

// child comps
import ConfirmationPopup from "../fragments/confirmation-popup";
import NotificationPopup from "../fragments/notification-popup";

// styles
import sermonNotesPostStyles from "../styles/posts/SermonNotesPost.module.css";
import getCookie from "../helpers/get-cookie";
import parseJwt from "../helpers/auth/decodeJWT";

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
      authority_level: string;
      approval_rating: string | number;
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
      const authCookie = getCookie("authorization");
      if (authCookie) {
         const user = parseJwt(authCookie);
         setRenderDeleteEditOptionsState(sermonPost.USER_ID == user.ID);
         setRenderReportOptionState(sermonPost.USER_ID != user.ID);
      }
   }, []);

   const [confirmationPopUpState, setconfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [notificationPupUpState, setNotificationPupUpState] = useState<JSX.Element | boolean>(
      false
   );

   const [deletedPostState, setDeletedPostState] = useState(false);
   const handleDeleteSermonNote = async (id: string) => {
      await client.mutate({
         mutation: DELETE_ONE_SEMRON_POST,
         variables: { ID: id }
      });
   };
   const handleDeleteConfirmation = async (id: string, DROPBOX_ID: string) => {
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
   };

   const promptConfirmationPopUp = (id: string, DROPBOX_ID: string) => {
      setconfirmationPopUpState(
         <ConfirmationPopup
            title='Are you sure you want to delete this commentary?'
            cancel={() => setconfirmationPopUpState(false)}
            confirm={() => handleDeleteConfirmation(id, DROPBOX_ID)}
         />
      );
   };

   const handleReportConfirmation = () => {};

   const handleEditOption = () => {};

   return (
      <>
         {notificationPupUpState}
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
                     <Link href={`/posts/edit-sermon-note/${sermonPost.ID}`}>
                        <a
                           className={(sermonNotesPostStyles.cardIcon, sermonNotesPostStyles.edit)}
                           onClick={handleEditOption}></a>
                     </Link>
                  )}
                  {renderReportOptionState && (
                     <span
                        className={(sermonNotesPostStyles.cardIcon, sermonNotesPostStyles.report)}
                        onClick={handleReportConfirmation}></span>
                  )}
               </div>
               <div className={sermonNotesPostStyles.reputationWrapper}>
                  <div
                     className={sermonNotesPostStyles.avatar}
                     style={{ backgroundImage: `url(${sermonPost.creator.avatar})` }}></div>
               </div>
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
