import React, { useState } from "react";

// components
import PostReactions from "../fragments/buttons/post-reactions";
import CommentsOfQuote from "../fragments/popup-content/comments-of-quote";

// stoires
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";
import cardStyles from "../styles/components/Cards.module.css";

// helpers
import { TcommentType } from "../fragments/popup-content/comments-of-quote";
import ConfirmationPopup from "../fragments/confirmation-popup";

export type Tstory = {
   id: string;
   userId: string;
   userAvatar: string;
   stories: [
      {
         content: string;
         by: string;
         background: string;
         tags: string[];
         approves: string[];
         disapproves: string[];
         comments: TcommentType[];
      }
   ];
};

export type quoteStoriesProps = {
   stories: Tstory;
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

const QuoteStories = ({ stories, deleteOption, editOption, reportOption }: quoteStoriesProps) => {
   // ==============   FUNCTION 1: Open the stories of Each user   =============== //
   const [handleStoriePopupState, setHandleStoriePopupState] = useState<boolean>(false);
   const [countState, setCountState] = useState<number>(0);
   const handleOpenStroies = (stories: Tstory) => {
      document.body.style.overflow = "hidden";
      setHandleStoriePopupState(true);
   };

   // ==============   FUNCTION 2: Go backwards in the story   =============== //
   const handleMoveBack = () => {
      if (countState > 0) setCountState(countState - 1);
   };

   // ==============   FUNCTION 3: Go forthward in the story   =============== //
   const handleMoveForth = () => {
      if (countState < stories.stories.length - 1) setCountState(countState + 1);
   };

   // ==============   FUNCTION 4: close all the stories   =============== //
   const handleCloseStories = () => {
      document.body.style.overflow = "scroll";
      setHandleStoriePopupState(false);
      setCountState(0);
   };

   // ==============   FUNCTION 5: commennt on the story  =============== //
   const [commentPopUpState, setCommentPopUpState] = useState<boolean>(false);
   const handleComentClick = () => {
      setCommentPopUpState(true);
   };
   // ==============   FUNCTION 6: approve the story   =============== //
   const hanndleApproveClick = () => {};

   // ==============   FUNCTION 7: dissaprove the stroy   =============== //
   const handleDisapproveClick = () => {};

   // ==============   FUNCTION 8: see the stroy data when the user clicks "More" =============== //
   const [morePopUpState, setMorePopUpState] = useState<boolean>(false);
   const handleMoreClick = () => {
      setMorePopUpState(true);
   };

   // ==============   FUNCTION 9: see the story data when the user clicks "More" =============== //
   const handleCloseComment = () => {
      setCommentPopUpState(false);
   };

   // ================= FUNCTION 6: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };

   // ================= FUNCTION 6: Handle the delete popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };
   return (
      <div className={quoteStoriesStyles.mainWrapper}>
         {deletePopupState}
         {reportPopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to report this story`}
               cancel={() => setReportPopupState(false)}
            />
         )}
         <section
            className={quoteStoriesStyles.mainStoryWrapper}
            onClick={() => handleOpenStroies(stories)}>
            <div
               className={quoteStoriesStyles.userReputationWrapper}
               style={{
                  backgroundImage: "linear-gradient(130deg, #ff9214ed, #ff0045)"
               }}>
               <div
                  className={quoteStoriesStyles.avatarImage}
                  style={{ backgroundImage: `url(${stories.userAvatar})` }}></div>
            </div>
            <p className={quoteStoriesStyles.userSignature}>{stories.userId}</p>
         </section>
         {handleStoriePopupState && (
            <section className={quoteStoriesStyles.storyPostWrapper}>
               <div
                  className={quoteStoriesStyles.avatarImageStory}
                  style={{ backgroundImage: `url(${stories.userAvatar})` }}></div>
               <div className={quoteStoriesStyles.count}>
                  {countState + 1} of {stories.stories.length}
               </div>
               <div
                  className={`closeModal ${quoteStoriesStyles.closeModal}`}
                  onClick={handleCloseStories}>
                  X
               </div>
               <div className={quoteStoriesStyles.storyPostsControllerWrapper}>
                  <span
                     className={quoteStoriesStyles.postStoryLeft}
                     onClick={handleMoveBack}></span>
                  <span
                     className={quoteStoriesStyles.postStoryRight}
                     onClick={handleMoveForth}></span>
               </div>
               <div
                  className={`${quoteStoriesStyles.storyPost}`}
                  style={{ backgroundImage: stories.stories[countState].background }}>
                  <p className={`${quoteStoriesStyles.storyContent}`}>
                     {stories.stories[countState].content}{" "}
                     <span className={quoteStoriesStyles.quotationMark}></span>
                  </p>
                  <span className={quoteStoriesStyles.storyBy}>
                     -By: {stories.stories[countState].by}
                     {deleteOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.delete)}
                           onClick={handleDeleteConfirmation}></span>
                     )}
                     {editOption && (
                        <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                     )}
                     {reportOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.report)}
                           onClick={handleReportConfirmation}></span>
                     )}
                  </span>
               </div>
               <div className={quoteStoriesStyles.postReactionWrapper}>
                  <PostReactions
                     handleApprove={hanndleApproveClick}
                     handleDisapprove={handleDisapproveClick}
                     handleComment={handleComentClick}
                     handleMore={handleMoreClick}
                     postApproves={stories.stories.map((storie) => storie.approves)}
                     postDisapproves={stories.stories.map((storie) => storie.disapproves)}
                     postComments={stories.stories.map((storie) => storie.comments)}
                  />
               </div>
               {commentPopUpState && (
                  <div className={quoteStoriesStyles.commentWrapper}>
                     <h3>Type your comment</h3>
                     <textarea placeholder={"comment..."}></textarea>
                     <div className={quoteStoriesStyles.postReactionWrapperComment}>
                        <span className={"std-button_gradient-text"}>Post</span>
                        <span
                           className={quoteStoriesStyles.cancelButton}
                           onClick={handleCloseComment}>
                           Cancel
                        </span>
                     </div>
                  </div>
               )}
               {morePopUpState && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setMorePopUpState(false)}>
                        X
                     </span>
                     {stories.stories[countState].comments.map((comment) => (
                        <CommentsOfQuote comment={comment} />
                     ))}
                     {stories.stories[countState].comments.length === 0 && (
                        <h3 className={quoteStoriesStyles.noCommentsYet}>
                           Be the first one to comment! 😊
                        </h3>
                     )}
                  </section>
               )}
            </section>
         )}
      </div>
   );
};

export default QuoteStories;
