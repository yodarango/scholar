// core
import React, { useState } from "react";
import router from "next/router";

// graphql
import client from "../apollo-client";
import {
   REPORT_THOUGHT,
   SHOW_COMMENTS_OF_THOUGHTS,
   DELETE_ONE_THOUGHT
} from "../graphql/posts/thoughts";

// components
import ThoughtContent from "../fragments/popup-content/thought-content";
import CommentsOfThoughtsContent from "../fragments/popup-content/comments-of-thoughts";
import PostReactions from "../fragments/buttons/post-reactions";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";
import NotificationPopup from "../fragments/notification-popup";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";
import ConfirmationPopup from "../fragments/confirmation-popup";

// helpers / types
import { Tapprovals } from "../fragments/buttons/post-reactions";

export type Tthought = {
   ID: string;
   USER_ID: string;
   title: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   created_date: string;
   posted_on: string;
   total_count: number;
   creator: {
      ID: string;
      signature: string;
      authority_level: string;
      approval_rating: string;
      avatar: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: Tapprovals[];
};

type thoughtProps = {
   thoughts: Tthought[];
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};
const Thought = ({ thoughts, editOption, reportOption, deleteOption }: thoughtProps) => {
   // ================= FUNCTION 1: See the whole post  ================= //
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);

   const openPost = async (thought: Tthought) => {
      const { data } = await client.query({
         query: SHOW_COMMENTS_OF_THOUGHTS,
         variables: { ID: thought.ID, showComment: true }
      });
      setseeWholePost(
         <div className='dark-bkg'>
            <div className='closeModal' onClick={() => setseeWholePost(false)}>
               X
            </div>
            <div className={popupStyles.halvesWrapper}>
               <ThoughtContent thought={thought} postReactionContent={data.thought[0]} />
               <CommentsOfThoughtsContent comments={data.thought[0].comments} />
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
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };
   // ------------------------- REPORT, DELETE, EDIT OPTIONS ------------------ //
   const [confirmationPopUpState, setConfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   // ================= FUNCTION 5: Delete Post  ===================//
   const handleDeletePost = async (id: string) => {
      const data = await client.mutate({
         mutation: DELETE_ONE_THOUGHT,
         variables: { ID: id }
      });
      if (data.data.delete_one_thought) {
         router.reload();
      } else {
         setNotificationpopUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               closeModal={() => setNotificationpopUpState(false)}
               newClass='notification-wrapper--Red'
            />
         );
      }
   };
   const handleDeletePostConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to delete this Thought?"}
            confirm={() => handleDeletePost(id)}
         />
      );
   };
   // ================= FUNCTION 6: Handle the report post  ===================//
   const handleReportPost = async (id: string) => {
      const data = await client.mutate({
         mutation: REPORT_THOUGHT,
         variables: {
            THOUGHT_ID: id,
            USER_ID: 1
         }
      });

      if (data.data.report_thought) {
         setConfirmationPopUpState(false);
         setNotificationpopUpState(
            <NotificationPopup
               closeModal={() => setNotificationpopUpState(false)}
               title='Report Has Been Submitted'
               contentString='We are reviewing your report and will follow the proper procedures 👮‍♂️'
               newClass='notification-wrapper--Sucess'
            />
         );
      } else {
         setNotificationpopUpState(
            <NotificationPopup
               closeModal={() => setNotificationpopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   const handleReportPostCnofirmtation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to report this Thought?"}
            confirm={() => handleReportPost(id)}
         />
      );
   };

   return (
      <>
         {seeWholePost}
         {confirmationPopUpState}
         {notificationpopUpState}
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
            />
         )}
         {thoughts.map((thought) => (
            <section key={thought.ID}>
               <div className={`${cardStyles.commentCard}`} key={thought.ID} id={`${thought.ID}`}>
                  <div
                     className={cardStyles.commentCardHeader}
                     id={`category-${thought.category_tags.split(" ")[0].replace("#", "")}`}>
                     <div className={cardStyles.commentCardHeaderAvatarImgBkg}>
                        <img
                           src={thought.creator.avatar}
                           alt='Avatar'
                           className={cardStyles.commentCardHeaderAvatarImg}
                        />
                     </div>
                     <h1 className={cardStyles.userSignature}>{thought.creator.signature}</h1>
                     {deleteOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.delete)}
                           onClick={() => handleDeletePostConfirmation(thought.ID)}></span>
                     )}
                     {editOption && (
                        <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                     )}
                     {reportOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.report)}
                           onClick={() => handleReportPostCnofirmtation(thought.ID)}></span>
                     )}
                  </div>
                  <i>{`${thought.creator.signature} expressed a new Tought`}</i>
                  <p>{thought.body}</p>
                  <PostReactions
                     handleComment={() => openComment(thought.ID)}
                     handleRateContent={handleApproveContent}
                     handleMore={() => openPost(thought)}
                     comments={thought.comments[0].total_count}
                     approvals={thought.approvals}
                  />
                  {commentBoxState === thought.ID && (
                     <div
                        id={`comment-${thought.ID}`}
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
            </section>
         ))}
      </>
   );
};

export default Thought;
