// core
import { useState, useEffect } from "react";

// comps
import ConfirmationPopup from "../confirmation-popup";
import NotificationPopup from "../notification-popup";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import getCookie from "../../helpers/get-cookie";
import parseJwt from "../../helpers/auth/decodeJWT";

// types
import { Tcomment } from "../buttons/post-reactions";
import client from "../../apollo-client";
import { DELETE_COMMENTARY_COMMENT, DELETE_THOUGHT_COMMENT } from "../../graphql/posts/comments";

type commentsOfThoughtContentProps = {
   comments: Tcomment[];
   fetchNewComment?: number;
   updateCommentaryCount: any;
   loadedFrom: string;
};

const CommentsOfThoughtContent = ({
   comments,
   fetchNewComment,
   updateCommentaryCount,
   loadedFrom
}: commentsOfThoughtContentProps) => {
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>();
   const [commentsState, setCommentsState] = useState<Tcomment[]>(comments);

   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [user, setUser] = useState<string>();

   useEffect(() => {
      const authCookie = getCookie("authorization");
      if (authCookie) {
         setUser(parseJwt(authCookie).ID);
      }
   }, []);

   // =============  FUNCTION: see the whole Comment  =================
   /// === state
   const [openCommentState, setOpenCommentState] = useState<string>("");
   const [openCommentFuncState, setOpenCommentFuncState] = useState<boolean>(false);

   /// === open
   const openComment = (id: string) => {
      setOpenCommentState(id);
      setOpenCommentFuncState(true);
   };

   /// === close
   const closeComment = () => {
      setOpenCommentState("");
      setOpenCommentFuncState(false);
   };

   // ========= FUNCTION: Delete comment ==================== //
   const [confirmationPopUpState, setConfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const handleDeleteConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to delete this post?"}
            confirm={() => confirmDeletion(id)}
         />
      );
   };

   const confirmDeletion = async (id: string) => {

      try {
         const { data } = await client.mutate({
            mutation: loadedFrom === "comment" ? DELETE_COMMENTARY_COMMENT : DELETE_THOUGHT_COMMENT,
            variables: { ID: id }
         });
         
         data.delete_commentary_comment === true || data.delete_thought_comment
            ? (setConfirmationPopUpState(false), removeCommentFromArray(id))
            : (setNotificationPopUpState(
                 <NotificationPopup
                    closeModal={() => setNotificationPopUpState(false)}
                    title={`Something went wrong!`}
                    contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                    newClass='notification-wrapper--Error'
                 />
              ),
              setConfirmationPopUpState(false));
      } catch (error) {
         console.log(error)
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title={`Something went wrong!`}
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         )
         setConfirmationPopUpState(false);
      }
     
   };

   const removeCommentFromArray = (id: string) => {
      const deletedCommentArray = commentsState.filter((comm) => comm.ID != id);
      setCommentsState(deletedCommentArray);
      updateCommentaryCount();
   };

   useEffect(() => {
      setCommentsState(comments);
   }, [fetchNewComment]);

   return (
      <>
         {confirmationPopUpState}
         {notificationPopUpState}
         <div className={popupStyles.halfWidth}>
            <div
               className={`${popupStyles.halfWidthLeft} ${popupStyles.halfWidthLeftCommentaryContent}`}>
               <h1 className={`std-text-block--small-title ${cardStyles.smallTitleNoMargin}`}>
                  Comments
               </h1>
               {commentsState.length === 0 && (
                  <h1 className={`std-text-block--small-title ${cardStyles.noCommentsTitle}`}>
                     Be the first to comment on this post!
                  </h1>
               )}
               {commentsState && commentsState.map((comm) => {
                  return (
                     <div
                        className={`${cardStyles.commentCard} ${cardStyles.commentOfCommentCard}`}
                        key={comm.ID}>
                        <div className={`${cardStyles.commentsOfCommentsImgTitleWrapper}`}>
                           <div className={cardStyles.wholeAvatarWrapperCommOfComm}>
                              <a href={`/users/${comm.creator_id}`}>
                                 <div
                                    className={`${cardStyles.commentsOfCommentsImgWrapper} ${
                                       comm.creator_authority_level == "trusted"
                                          ? cardStyles.commentCardHeaderAvatarImgBkgTrusted
                                          : ""
                                    }`}>
                                    <img
                                       src={comm.creator_avatar}
                                       alt='Avatar Image used as a user profile'
                                       className={cardStyles.commentsOfCommentsImg}
                                    />
                                 </div>
                                 {comm.creator_authority_level == "trusted" && (
                                    <span
                                       className={`${cardStyles.trustedPointer} ${cardStyles.trustedPointerCommentsOfCommentaries}`}></span>
                                 )}
                              </a>
                           </div>
                           <div className={cardStyles.commentsOfCommentsName}>
                              {comm.creator_signature}
                           </div>
                        </div>
                        {openCommentState === comm.ID && (
                           <p className={cardStyles.commentsOfCommentsBodyVisible}>{comm.body}</p>
                        )}
                        {openCommentState !== comm.ID && (
                           <p className={cardStyles.commentsOfCommentsBodyHidden}>{comm.body}</p>
                        )}
                        <div className={`wrap-flex-row ${cardStyles.cardIconWrapper}`}>
                           {openCommentFuncState === false && (
                              <div onClick={() => openComment(comm.ID)}>
                                 <div
                                    className={
                                       (cardStyles.cardIcon, cardStyles.cardIconMore)
                                    }></div>
                              </div>
                           )}
                           {openCommentFuncState === true && (
                              <div onClick={closeComment}>
                                 <div
                                    className={
                                       (cardStyles.cardIcon, cardStyles.cardIconMore)
                                    }></div>
                              </div>
                           )}
                           {user == comm.creator_id && (
                              <div
                                 className={`${cardStyles.cardIcon} ${cardStyles.delete} ${cardStyles.deleteComOfCom}`}
                                 onClick={() => handleDeleteConfirmation(comm.ID)}></div>
                           )}
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default CommentsOfThoughtContent;
