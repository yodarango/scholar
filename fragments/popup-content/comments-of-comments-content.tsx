import React, { useState } from "react";
import cardStyles from "../../styles/components/Cards.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

const CommentsOfCcommentsContent = () => {
   interface CommentInt {
      userId: number;
      title: string;
      body: string;
      id: number;
   }
   const [comments, setcomments] = useState<CommentInt[]>([]);

   const getComments: () => void = async () => {
      const requ = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = await requ.json();
      setcomments(res);
   };
   getComments();

   // =============  FUNCTION: see the whole Comment  =================
   /// === state
   const [openCommentState, setOpenCommentState] = useState<string>(``);
   const [openCommentFuncState, setOpenCommentFuncState] = useState<boolean>(false);

   /// === open
   const openComment = (id: any) => {
      setOpenCommentState(`${cardStyles.commentCardOpen} `);
      setOpenCommentFuncState(true);
      const currComentCard = document.querySelector(`#id-${id}`);
      currComentCard ? (currComentCard.className = openCommentState) : null;
   };

   /// === close
   const closeComment = (id: any) => {
      setOpenCommentState(`${cardStyles.commentCard}`);
      setOpenCommentFuncState(false);
      const currComentCard = document.querySelector(`#id-${id}`);
      currComentCard ? (currComentCard.className = openCommentState) : null;
   };

   return (
      <>
         <div className={popupStyles.halfWidth}>
            <div className={`${popupStyles.halfWidthLeft}`}>
               <h1 className={`std-text-block--small-title ${cardStyles.smallTitleNoMargin}`}>
                  Comments
               </h1>
               {comments.map((comm) => (
                  <div className={`${cardStyles.commentCard}`} id={`id-${comm.id}`} key={comm.id}>
                     <div className={`${cardStyles.commentsOfCommentsImgTitleWrapper} `}>
                        <div className={`${cardStyles.commentsOfCommentsImgWrapper}`}>
                           <img
                              src='images/Avatar4.png'
                              alt='Avatar'
                              className={cardStyles.commentsOfCommentsImg}
                           />
                        </div>
                        <div className={cardStyles.commentsOfCommentsName}>{comm.title}</div>
                     </div>
                     <p className={cardStyles.commentsOfCommentsBody}>{comm.body}</p>
                     <div className={`wrap-flex-row ${cardStyles.cardIconWrapper}`}>
                        <div>
                           <span>3,232</span>
                           <div className={(cardStyles.cardIcon, cardStyles.cardIconLike)}></div>
                        </div>
                        {openCommentFuncState === false && (
                           <div onClick={() => openComment(comm.id)}>
                              <div className={(cardStyles.cardIcon, cardStyles.cardIconMore)}></div>
                           </div>
                        )}
                        {openCommentFuncState === true && (
                           <div onClick={() => closeComment(comm.id)}>
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
