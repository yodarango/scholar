// core
import React, { useEffect, useState } from "react";

// components
import CommentaryContent from "../fragments/popup-content/commentary-content";
import CommentsOfCcommentsContent from "../fragments/popup-content/comments-of-comments-content";
// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";

const Thought = () => {
   // ====================  FUNCTION 1: fetch the thoughts   ============== //

   // ========== fetch all comments for the selected comment
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
      console.log(res);
   };

   useEffect(() => {
      getComments();
   }, []);

   // ================= FUNCTION: See the whole post
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

   // ================= FUNCTION: Drop down the comment imput

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
                  <h1>{comm.title}</h1>
                  <div className={(cardStyles.cardIcon, cardStyles.cardIconType)}></div>
               </div>
               <i>{"#JBDGT commented on John 3:16"}</i>
               <p>{comm.body}</p>
               <div className={`wrap-flex-row ${cardStyles.cardIconWrapper}`}>
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
               </div>
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
};

export default Thought;
