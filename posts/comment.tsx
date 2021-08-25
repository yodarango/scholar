// core
import React, { useState } from "react";

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
   commentedOn: { verseId: string; verseReferences: string };
   userAvatar: string;
};

type commentsProps = {
   commentaries: Tcommentary[];
};

export default function Comments({ commentaries }: commentsProps) {
   // ================= FUNCTION 1: See the whole post
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const categories = { first: { color: "blue", tag: "DBL" }, second: { color: "red", tag: "RD" } };
   const openPost = (commentary: Tcommentary) => {
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <CommentaryContent commentary={commentary} />
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
         {commentaries.map((commentary) => (
            <div
               className={`${cardStyles.commentCard}`}
               key={commentary.id}
               id={`${commentary.id}`}>
               <div
                  className={cardStyles.commentCardHeader}
                  style={{ backgroundColor: commentary.colors[0] }}>
                  <div className={cardStyles.commentCardHeaderAvatarImgBkg}>
                     <img
                        src={commentary.userAvatar}
                        alt='Avatar'
                        className={cardStyles.commentCardHeaderAvatarImg}
                     />
                  </div>
                  <h1>{commentary.userSignature}</h1>
                  <div className={(cardStyles.cardIcon, cardStyles.cardIconType)}></div>
               </div>
               <i>{`${commentary.userSignature} commented on ${commentary.commentedOn.verseReferences}`}</i>
               <p>{commentary.content}</p>
               <PostReactions
                  handleComment={() => openComment(commentary.id)}
                  handleApprove={handleApproveClick}
                  handleDisapprove={handleDisapproveClick}
                  handleMore={() => openPost(commentary)}
               />
               <div
                  id={`comment-${commentary.id}`}
                  className={`${cardStyles.stdInputCommentWrapper}`}>
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
