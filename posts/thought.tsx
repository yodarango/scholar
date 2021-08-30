// core
import React, { useState } from "react";

// components
import ThoughtComment from "../fragments/popup-content/thought-content";
import CommentsOfThoughtsContent from "../fragments/popup-content/comments-of-thoughts";
// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";
import PostReactions from "../fragments/buttons/post-reactions";
import ConfirmationPopup from "../fragments/confirmation-popup";

export type Tthought = {
   id: string;
   userId: string;
   userSignature: string;
   title: string;
   userAvatar: string;
   content: string;
   referencedScriptures: [{ verseId: string; verseReferences: string }];
   tags: string[];
   colors: string[];
   approves: string[];
   disapproves: string[];
   comments: string[];
};

type thoughtProps = {
   thoughts: Tthought[];
};
const Thought = ({ thoughts }: thoughtProps) => {
   // ================= FUNCTION 1: See the whole post  ================= //
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const openPost = (thought: any) => {
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <ThoughtComment thought={thought} />
               <CommentsOfThoughtsContent postId={"123"} />
            </div>
         </div>
      );
   };

   // ================= FUNCTION 2: Drop down the comment imput   =============== //
   const [commentBoxState, setCommentBoxState] = useState<string>("");
   const openComment = (id: string) => {
      setCommentBoxState(id);
   };
   // ================= FUNCTION 3: Hide the Drop down the comment imput  ===================//
   const closeComment = () => {
      setCommentBoxState("");
   };

   const handleApproveClick = () => {};
   const handleDisapproveClick = () => {};

   // ================= FUNCTION 4: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };
   return (
      <>
         {seeWholePost}
         {deletePopupState && (
            <ConfirmationPopup
               cancel={() => setDeletePopupState(false)}
               title={"Are you sure you want to delete this Thought?"}
            />
         )}
         {thoughts.map((thought) => (
            <div className={`${cardStyles.commentCard}`} key={thought.id} id={`${thought.id}`}>
               <div
                  className={cardStyles.commentCardHeader}
                  style={{ backgroundColor: thought.colors[0] }}>
                  <div className={cardStyles.commentCardHeaderAvatarImgBkg}>
                     <img
                        src={thought.userAvatar}
                        alt='Avatar'
                        className={cardStyles.commentCardHeaderAvatarImg}
                     />
                  </div>
                  <h1 className={cardStyles.userSignature}>{thought.userSignature}</h1>
                  <span
                     className={(cardStyles.cardIcon, cardStyles.delete)}
                     onClick={handleDeleteConfirmation}></span>
                  <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                  <span className={(cardStyles.cardIcon, cardStyles.report)}></span>
               </div>
               <i>{`${thought.userSignature} expressed a new Tought`}</i>
               <p>{thought.content}</p>
               <PostReactions
                  handleComment={() => openComment(thought.id)}
                  handleApprove={handleApproveClick}
                  handleDisapprove={handleDisapproveClick}
                  handleMore={() => openPost(thought)}
                  postComments={thought.comments}
                  postApproves={thought.approves}
                  postDisapproves={thought.disapproves}
               />
               {commentBoxState === thought.id && (
                  <div
                     id={`comment-${thought.id}`}
                     className={`${cardStyles.stdInputCommentWrapper}`}>
                     <textarea
                        maxLength={150}
                        placeholder='Comment...'
                        className={`std-input ${cardStyles.stdInputComment}`}></textarea>
                     <div className={`${cardStyles.postCancelWrapper}`}>
                        <span className={`std-button_gradient-text`}>Post</span>{" "}
                        <span onClick={closeComment}>Cancel</span>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </>
   );
};

export default Thought;
