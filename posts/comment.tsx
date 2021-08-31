// core
import React, { useState } from "react";

// componenets
import CommentaryContent from "../fragments/popup-content/commentary-content";
import CommentsOfCcommentsContent from "../fragments/popup-content/comments-of-comments-content";
import PostReactions from "../fragments/buttons/post-reactions";
import ConfirmationPopup from "../fragments/confirmation-popup";

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
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

export default function Comments({
   commentaries,
   deleteOption,
   editOption,
   reportOption
}: commentsProps) {
   // ================= FUNCTION 1: See the whole post
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const openPost = (commentary: Tcommentary) => {
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <CommentaryContent commentary={commentary} />
               <CommentsOfCcommentsContent postId={"123"} />
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

   // =================    FUNCTION 4: handle the approve click  ================== //
   const handleApproveClick = () => {};

   // =================    FUNCTION 5: handle the disapprove click  ================== //
   const handleDisapproveClick = () => {};

   // ================= FUNCTION 6: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };

   // ================= FUNCTION 7: Handle the delete popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };
   return (
      <>
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
                  {deleteOption && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.delete)}
                        onClick={handleDeleteConfirmation}></span>
                  )}
                  {editOption && <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>}
                  {reportOption && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.report)}
                        onClick={handleReportConfirmation}></span>
                  )}
               </div>
               <i>{`${commentary.userSignature} commented on ${commentary.commentedOn.verseReferences}`}</i>
               <p>{commentary.content}</p>
               <PostReactions
                  handleComment={() => openComment(commentary.id)}
                  handleApprove={handleApproveClick}
                  handleDisapprove={handleDisapproveClick}
                  handleMore={() => openPost(commentary)}
                  postComments={commentary.comments}
                  postApproves={commentary.approves}
                  postDisapproves={commentary.disapproves}
               />
               {commentBoxState === commentary.id && (
                  <div
                     id={`comment-${commentary.id}`}
                     className={`${cardStyles.stdInputCommentWrapper}`}>
                     <textarea
                        maxLength={150}
                        placeholder='Comment...'
                        className={`std-input ${cardStyles.stdInputComment}`}></textarea>
                     <div className={`${cardStyles.postCancelWrapper}`}>
                        <span className={`std-button_gradient-text`}>Post</span>
                        <span onClick={closeComment}>Cancel</span>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </>
   );
}
