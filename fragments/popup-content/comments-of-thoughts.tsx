import React, { useEffect, useState } from "react";
import cardStyles from "../../styles/components/Cards.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

type commentsOfCcommentsContentProps = {
   postId: string;
};
const CommentsOfCcommentsContent = ({ postId }: commentsOfCcommentsContentProps) => {
   type TcommentOfThought = {
      id: string;
      userAvatar: string;
      userSignature: string;
      userId: string;
      content: string;
   };

   const [comments, setcomments] = useState<TcommentOfThought[]>([]);

   const getComments: () => void = async () => {
      const requ = await fetch(`https://scholar-be.herokuapp.com/thoughts/${postId}`);
      const res = await requ.json();
      setcomments(res);
      console.log(res);
   };

   useEffect(() => {
      getComments();
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

   return (
      <>
         <div className={popupStyles.halfWidth}>
            <div
               className={`${popupStyles.halfWidthLeft} ${popupStyles.halfWidthLeftCommentaryContent}`}>
               <h1 className={`std-text-block--small-title ${cardStyles.smallTitleNoMargin}`}>
                  Comments
               </h1>
               {comments.map((comm) => (
                  <div
                     className={`${cardStyles.commentCard} ${cardStyles.commentOfCommentCard}`}
                     key={comm.id}>
                     <div className={`${cardStyles.commentsOfCommentsImgTitleWrapper}`}>
                        <div className={`${cardStyles.commentsOfCommentsImgWrapper}`}>
                           <img
                              src={comm.userAvatar}
                              alt='Avatar Image used as a user profile'
                              className={cardStyles.commentsOfCommentsImg}
                           />
                        </div>
                        <div className={cardStyles.commentsOfCommentsName}>
                           {comm.userSignature}
                        </div>
                     </div>
                     {openCommentState === comm.id && (
                        <p className={cardStyles.commentsOfCommentsBodyVisible}>{comm.content}</p>
                     )}
                     {openCommentState !== comm.id && (
                        <p className={cardStyles.commentsOfCommentsBodyHidden}>{comm.content}</p>
                     )}
                     <div className={`wrap-flex-row ${cardStyles.cardIconWrapper}`}>
                        {openCommentFuncState === false && (
                           <div onClick={() => openComment(comm.id)}>
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
