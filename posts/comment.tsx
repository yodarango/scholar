// core
import React, { useState } from "react";

//graphQL
import client from "../apollo-client";
import { SHOW_COMMENTS_OF_COMMENTARY } from "../graphql/posts/commentaries";

// componenets
import CommentaryContent from "../fragments/popup-content/commentary-content";
import CommentsOfCcommentsContent from "../fragments/popup-content/comments-of-comments-content";
import PostReactions from "../fragments/buttons/post-reactions";
import ConfirmationPopup from "../fragments/confirmation-popup";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";

// types and helpres
import { Tapprovals } from "../fragments/buttons/post-reactions";

export type Tcommentary = {
   ID: string;
   USER_ID: string;
   VERSE_ID: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   created_date: string;
   commented_on: string;
   verse_citation: string;
   total_count: number;
   creator: {
      ID: string;
      signature: string;
      authority_level: string;
      approval_rating: string | number;
      avatar: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: Tapprovals[];
};

type commentsProps = {
   commentary: Tcommentary;
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

export default function Comments({
   commentary,
   deleteOption,
   editOption,
   reportOption
}: commentsProps) {
   // ================= FUNCTION 1: See the whole post
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const openPost = async (commentary_id: string) => {
      const { data } = await client.query({
         query: SHOW_COMMENTS_OF_COMMENTARY,
         variables: { ID: commentary_id, showComment: true }
      });
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <CommentaryContent
                  commentary={commentary}
                  postReactionContent={data.commentary[0]}
               />
               <CommentsOfCcommentsContent comments={data.commentary[0].comments} />
            </div>
         </div>
      );
   };

   // ================= FUNCTION 2: Drop down the comment input   =============== //
   const [commentBoxState, setCommentBoxState] = useState<string>("");
   const openComment = (id: string) => {
      setCommentBoxState(id);
   };
   // ================= FUNCTION 3: Hide the Drop down the comment input  ===================//
   const closeComment = () => {
      setCommentBoxState("");
   };

   // =================    FUNCTION 4: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };

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
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
            />
         )}
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
         <div className={`${cardStyles.commentCard}`} key={commentary.ID} id={`${commentary.ID}`}>
            <div
               className={cardStyles.commentCardHeader}
               id={`category-${commentary.category_tags.split(" ")[0].replace("#", "")}`}>
               <div className={cardStyles.commentCardHeaderAvatarImgBkg}>
                  <img
                     src={commentary.creator.avatar}
                     alt='Avatar'
                     className={cardStyles.commentCardHeaderAvatarImg}
                  />
               </div>
               <h1>{commentary.creator.signature}</h1>
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
            <i>{`comment on ${commentary.verse_citation}`}</i>
            <p>{commentary.body}</p>
            {
               <PostReactions
                  handleComment={() => openComment(commentary.ID)}
                  handleRateContent={handleApproveContent}
                  handleMore={() => openPost(commentary.ID)}
                  comments={commentary.comments[0].total_count}
                  approvals={commentary.approvals}
               />
            }
            {commentBoxState === commentary.ID && (
               <div
                  id={`comment-${commentary.ID}`}
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
      </>
   );
}
