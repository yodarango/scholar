// core
import React, { useEffect, useState } from "react";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// components
import ConfirmationPopup from "../confirmation-popup";

// helpers / types
import { Tcomment } from "../../fragments/buttons/post-reactions";

type commentsOfCcommentsContentProps = {
   comments: Tcomment[];
};
const CommentsOfCcommentsContent = ({ comments }: commentsOfCcommentsContentProps) => {
   // =============  FUNCTION 1: see the whole Comment  =================
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

   // ================= FUNCTION 2: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };

   // ================= FUNCTION 3: Handle the report popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };

   return (
      <>
         {deletePopupState}
         {deletePopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to delete this commentary?`}
               cancel={() => setDeletePopupState(false)}
            />
         )}
         {reportPopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to report this commentary?`}
               cancel={() => setReportPopupState(false)}
            />
         )}
         <div className={popupStyles.halfWidth}>
            <div
               className={`${popupStyles.halfWidthLeft} ${popupStyles.halfWidthLeftCommentaryContent}`}>
               <h1 className={`std-text-block--small-title ${cardStyles.smallTitleNoMargin}`}>
                  Comments
               </h1>
               {comments.length === 0 && (
                  <h1 className={`std-text-block--small-title ${cardStyles.noCommentsTitle}`}>
                     Be the first to comment on this post!
                  </h1>
               )}
               {comments.map((comm) => {
                  return (
                     <div
                        className={`${cardStyles.commentCard} ${cardStyles.commentOfCommentCard}`}
                        key={comm.ID}>
                        <div className={`${cardStyles.commentsOfCommentsImgTitleWrapper}`}>
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
                              {comm.creator_authority_level == "trusted" && (
                                 <span className={cardStyles.trustedPointer}></span>
                              )}
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
                        </div>
                        <div className={cardStyles.commentsOfContentActionWrapper}>
                           <span
                              className={(cardStyles.cardIcon, cardStyles.delete)}
                              onClick={handleDeleteConfirmation}></span>
                           <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                           <span
                              className={(cardStyles.cardIcon, cardStyles.report)}
                              onClick={handleReportConfirmation}></span>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default CommentsOfCcommentsContent;
