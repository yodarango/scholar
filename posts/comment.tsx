// core
import React, { useEffect, useState } from "react";

// componenets
import CommentaryContent from "../fragments/popup-content/commentary-content";
import CommentsOfCcommentsContent from "../fragments/popup-content/comments-of-comments-content";
import PostReactions from "../fragments/buttons/post-reactions";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";

export type Tcommentary = {
   id: string;
   userId: string;
   userSignature: string;
   content: string;
   referencedScriptures: [{ verseId: string; verseReferences: string }];
   tags: string[];
   colors: string[];
   approves: string[];
   disapproves: string[];
   comments: string[];
};
export default function Comments() {
   // ========== fetch all comments for the selected comment
   const [comments, setcomments] = useState<Tcommentary[]>([]);

   const getComments: () => void = async () => {
      const requ = await fetch("https://scholar-be.herokuapp.com/commentaries");
      const res = await requ.json();
      setcomments(res);
      console.log(res);
   };

   useEffect(() => {
      getComments();
   }, []);

   // ================= FUNCTION 1: See the whole post
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const categories = { first: { color: "blue", tag: "DBL" }, second: { color: "red", tag: "RD" } };
   const openPost = (comment: any) => {
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <CommentaryContent
                  title={comment.title}
                  content={comment.body}
                  categories={categories}
                  referencedVerses={[{ id: "JHN.3.17", name: "John 3:17" }]}
               />
               <CommentsOfCcommentsContent />
            </div>
         </div>
      );
   };

   // ================= FUNCTION 2: Drop down the comment imput

   let openCommentState: boolean = false;
   const openComment = (id: string | number) => {
      const currInput: HTMLDivElement | null = document.querySelector(`#comment-${id}`);
      if (openCommentState === false) {
         openCommentState = true;
         currInput ? (currInput.style.display = "block") : null;
      } else if (openCommentState === true) {
         openCommentState = false;
         currInput ? (currInput.style.display = "none") : null;
      }
      console.log(currInput);
   };

   // =================    FUNCTION 2: handle the approve click  ================== //
   const handleApproveClick = () => {};

   const handleDisapproveClick = () => {};

   return (
      <>
         {seeWholePost}
         {comments.map((comm) => (
            <div className={`${cardStyles.commentCard}`} key={comm.id} id={`${comm.id}`}>
               <div className={cardStyles.commentCardHeader}>
                  <div className={cardStyles.commentCardHeaderAvatarImgBkg}>
                     <img
                        src='Parks10.png'
                        alt='Avatar'
                        className={cardStyles.commentCardHeaderAvatarImg}
                     />
                  </div>
                  <h1>{comm.userSignature}</h1>
                  <div className={(cardStyles.cardIcon, cardStyles.cardIconType)}></div>
               </div>
               <i>{"#JBDGT commented on John 3:16"}</i>
               <p>{comm.content}</p>
               <PostReactions
                  handleComment={() => openPost(comm)}
                  handleApprove={handleApproveClick}
                  handleDisapprove={handleDisapproveClick}
                  handleMore={() => openPost(comm)}
               />
               {/* <div className={`wrap-flex-row ${cardStyles.cardIconWrapper}`}>
                  <div>
                     <span>232</span>
                     <div
                        className={(cardStyles.cardIcon, cardStyles.cardIconComment)}
                        onClick={() => {
                           openComment(comm.id);
                        }}></div>
                  </div>
                  <div>
                     <span>3,232</span>
                     <div className={(cardStyles.cardIcon, cardStyles.cardIconLike)}></div>
                  </div>
                  <div
                     onClick={() => {
                        openPost(comm);
                     }}>
                     <div className={(cardStyles.cardIcon, cardStyles.cardIconMore)}></div>
                  </div>
               </div> */}
               <div id={`comment-${comm.id}`} className={`${cardStyles.stdInputCommentWrapper}`}>
                  <textarea
                     maxLength={150}
                     placeholder='Comment...'
                     className={`std-input ${cardStyles.stdInputComment}`}></textarea>
                  <div className={`std-button_gradient-text`}>Post</div>
               </div>
            </div>
         ))}
      </>
   );
}
