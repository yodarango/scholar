// core
import React, { useState } from "react";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers / types
import { Tcomment } from "../buttons/post-reactions";

type commentsOfCcommentsContentProps = {
   comments: Tcomment[];
};

const CommentsOfCcommentsContent = ({ comments }: commentsOfCcommentsContentProps) => {
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

   return (
      <>
         <div className={popupStyles.halfWidth}>
            <div
               className={`${popupStyles.halfWidthLeft} ${popupStyles.halfWidthLeftCommentaryContent}`}>
               <h1 className={`std-text-block--small-title ${cardStyles.smallTitleNoMargin}`}>
                  Comments
               </h1>
               {comments.length === 0 && (
                  <h1 className={`std-text-block--small-title ${cardStyles.noComments}`}>
                     Be the first to comment on this post!
                  </h1>
               )}
               {comments.map((comm) => (
                  <div
                     className={`${cardStyles.commentCard} ${cardStyles.commentOfCommentCard}`}
                     key={comm.ID}>
                     <div className={`${cardStyles.commentsOfCommentsImgTitleWrapper}`}>
                        <div className={`${cardStyles.commentsOfCommentsImgWrapper}`}>
                           <img
                              src={comm.creator_avatar}
                              alt='Avatar Image used as a user profile'
                              className={cardStyles.commentsOfCommentsImg}
                           />
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
                              <div className={(cardStyles.cardIcon, cardStyles.cardIconMore)}></div>
                           </div>
                        )}
                        {openCommentFuncState === true && (
                           <div onClick={closeComment}>
                              <div className={(cardStyles.cardIcon, cardStyles.cardIconMore)}></div>
                           </div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};

export default CommentsOfCcommentsContent;
