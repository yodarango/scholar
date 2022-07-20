//core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// graphQl
import client from "../../apollo-client";
import { DELETE_QUOTE_COMMENT } from "../../graphql/posts/comments";

// components
import ConfirmationPopup from "../confirmation-popup";
import NotificationPopup from "./notification";

// styles
import commentsOfStoryStyles from "../../styles/fragments/popup-content/CommentsOfQuote.module.css";
import cardStyles from "../../styles/components/Cards.module.css";

// helpes
import { loggedInUser } from "../../helpers/auth/get-loggedin-user";

// types
import { Tcomment } from "../buttons/post-reactions";

export type TcommentType = {
   ID: string;
   QUOTE_ID: string;
   USER_ID: string;
   posted_on: string;
   body: string;
   creator_signature: string;
   creator_avatar: string;
   creator_approval_rate: number;
   creator_authority_level: number;
   creator_id: string;
   total_count: number;
};

export type commentsOfQuoteProps = {
   comments: Tcomment[];
};

const CommentsOfQuote = ({ comments }: commentsOfQuoteProps) => {
   // router
   const router = useRouter();
   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [user, setUser] = useState<string | null>(null);
   const [commentsState, setCommentsState] = useState<Tcomment[]>(comments);
   const [notificationPopUpState, setNotificationPopUpState] =
      useState<boolean | JSX.Element>(false);

   useEffect(() => {
      if (router.isReady) {
      }
      const authJWT = loggedInUser();

      if (authJWT) {
         setUser(authJWT.ID);
      } else {
         setUser(null);
      }
   }, []);

   // ================= FUNCTION 1: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean | JSX.Element>(false);
   const handleDeleteConfirmation = (id: string) => {
      setDeletePopupState(
         <ConfirmationPopup
            title={`Are you sure you want to delete this comment?`}
            cancel={() => setDeletePopupState(false)}
            confirm={() => confirmDeletion(id)}
         />
      );
   };

   const confirmDeletion = async (id: string) => {
      const { data } = await client.mutate({
         mutation: DELETE_QUOTE_COMMENT,
         variables: { ID: id }
      });
      data.delete_quote_comment === true
         ? (setDeletePopupState(false), removeCommentFromArray(id))
         : (setNotificationPopUpState(
              <NotificationPopup
                 closeModal={() => setNotificationPopUpState(false)}
                 title={`Something went wrong!`}
                 contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                 newClass='notification-wrapper--Error'
              />
           ),
           setDeletePopupState(false));
   };

   const removeCommentFromArray = (id: string) => {
      const deletedCommentArray = commentsState.filter((comm) => comm.ID != id);
      setCommentsState(deletedCommentArray);
   };

   return (
      <>
         {deletePopupState}
         {notificationPopUpState}
         {commentsState.map((comment, index) => (
            <div className={commentsOfStoryStyles.mainWrapper} key={index}>
               <div className={commentsOfStoryStyles.avatarUserSignatureWrapper}>
                  <div className={`${commentsOfStoryStyles.wholeAvatarWrapper}`}>
                     <a href={`/users/${comment.creator_id}`}>
                        <div
                           className={`${commentsOfStoryStyles.commentAvatarWrapper}  ${
                              comment.creator_authority_level == 2
                                 ? commentsOfStoryStyles.commentCardHeaderAvatarImgBkgTrusted
                                 : ""
                           }`}>
                           <div
                              style={{ backgroundImage: `url(${comment.creator_avatar})` }}
                              className={`${commentsOfStoryStyles.avatar}`}></div>
                        </div>
                        {comment.creator_authority_level == 2 && (
                           <span
                              className={`${commentsOfStoryStyles.trustedPointer} ${cardStyles.trustedPointerCommentsOfCommentaries}`}></span>
                        )}
                     </a>
                  </div>
                  <h4>{comment.creator_signature}</h4>
               </div>
               <p className={commentsOfStoryStyles.content}>{comment.body}</p>
               <div
                  className={`${cardStyles.commentsOfContentActionWrapper} ${cardStyles.commentsOfQuotesActionWrapper} `}>
                  {user == comment.creator_id && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.delete)}
                        onClick={() => handleDeleteConfirmation(comment.ID)}></span>
                  )}
                  {/* not allowing editing or reporting on comments at the moment */}
                  {/* <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                  <span
                     className={(cardStyles.cardIcon, cardStyles.report)}
                     onClick={handleReportConfirmation}></span> */}
               </div>
            </div>
         ))}
      </>
   );
};

export default CommentsOfQuote;
