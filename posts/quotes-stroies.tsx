// core
import React, { useState } from "react";

// graphQL
import { OPEN_QUOTE_STORY, OPEN_QUOTE_STORY_COMMENTS } from "../graphql/posts/quotes";
import client from "../apollo-client";

// components
import PostReactions from "../fragments/buttons/post-reactions";
import CommentsOfQuote from "../fragments/popup-content/comments-of-quote";
import ConfirmationPopup from "../fragments/confirmation-popup";

// stoires
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";
import cardStyles from "../styles/components/Cards.module.css";

// helpers
import { Tapprovals, Tcomment } from "../fragments/buttons/post-reactions";

export type Tstory = {
   ID: string;
   USER_ID: string;
   body: string;
   category_tags: string;
   author: string;
   background: string;
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

export type quoteStoriesProps = {
   stories: Tstory[];
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

export type last24SingleQuote = {
   ID: string;
   creator: {
      ID: string;
      avatar: string;
      signature: string;
      approval_rating: string;
   };
   deleteOption?: boolean;
   reportOption?: boolean;
   editOption?: boolean;
};

const QuoteStories = ({
   ID,
   creator,
   deleteOption,
   editOption,
   reportOption
}: last24SingleQuote) => {
   // ==============   FUNCTION 1: Open the stories of Each user   =============== //
   const [handleStoriePopupState, setHandleStoriePopupState] = useState<boolean>(false);
   const [quoteState, setQuoteState] = useState<Tstory[]>([]);

   const [countState, setCountState] = useState<number>(0);
   const handleOpenStroies = async (user_id: string) => {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY,
         variables: { USER_ID: user_id, last_id: null }
      });

      setQuoteState(data.quote);
      document.body.style.overflow = "hidden";
      setHandleStoriePopupState(true);
   };

   // ==============   FUNCTION 2: Go backwards in the story   =============== //
   const handleMoveBack = () => {
      if (countState > 0) setCountState(countState - 1);
   };

   // ==============   FUNCTION 3: Go forthward in the story   =============== //
   const handleMoveForth = () => {
      if (countState < quoteState.length - 1) setCountState(countState + 1);
   };

   // ==============   FUNCTION 4: close all the stories   =============== //
   const handleCloseStories = () => {
      document.body.style.overflow = "scroll";
      setHandleStoriePopupState(false);
      setCountState(0);
      setCommentsOfQuote({ content: [], popUp: false });
   };

   // ==============   FUNCTION 5: commennt on the story  =============== //
   const [commentPopUpState, setCommentPopUpState] = useState<boolean>(false);
   const handleComentClick = () => {
      setCommentPopUpState(true);
   };
   // ==============   FUNCTION 6: handle the reaction to a particular story  =============== //
   const handleRateContent = () => {};

   // ==============   FUNCTION 8: see the stroy data when the user clicks "More" =============== //
   const [commentsOfQuote, setCommentsOfQuote] = useState<{ content: Tcomment[]; popUp: boolean }>({
      popUp: false,
      content: []
   });
   const handleMoreClick = async (quote_id: string) => {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY_COMMENTS,
         variables: { ID: quote_id, showComment: true }
      });
      setCommentsOfQuote({ popUp: true, content: data.quote[0].comments });
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

         {/* avatars for all the current users with stories within the last 24 hours  */}
         <section
            className={quoteStoriesStyles.mainStoryWrapper}
            onClick={() => handleOpenStroies(ID)}>
            <div
               className={quoteStoriesStyles.userReputationWrapper}
               style={{
                  backgroundImage: "linear-gradient(130deg, #ff9214ed, #ff0045)"
               }}>
               <div
                  className={quoteStoriesStyles.avatarImage}
                  style={{ backgroundImage: `url(${creator.avatar})` }}></div>
            </div>
            <p className={quoteStoriesStyles.userSignature}>{creator.signature}</p>
         </section>

         {/* Wrapper of the open stories */}
         {handleStoriePopupState && (
            <section className={quoteStoriesStyles.storyPostWrapper}>
               <div
                  className={quoteStoriesStyles.avatarImageStory}
                  style={{ backgroundImage: `url(${creator.avatar})` }}></div>
               <div className={quoteStoriesStyles.count}>
                  {countState + 1} of {quoteState.length}
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
                  style={{ backgroundImage: quoteState[countState].background }}>
                  <p className={`${quoteStoriesStyles.storyContent}`}>
                     {quoteState[countState].body}{" "}
                     <span className={quoteStoriesStyles.quotationMark}></span>
                  </p>
                  <span className={quoteStoriesStyles.storyBy}>
                     -By: {quoteState[countState].author}
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
                     handleRateContent={handleRateContent}
                     handleComment={handleComentClick}
                     handleMore={() => handleMoreClick(quoteState[countState].ID)}
                     approvals={quoteState[countState].approvals}
                     comments={quoteState[countState].comments[0].total_count}
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
               {commentsOfQuote.popUp && commentsOfQuote.content.length > 0 && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setCommentsOfQuote({ popUp: false, content: [] })}>
                        X
                     </span>
                     <CommentsOfQuote comments={commentsOfQuote.content} />
                  </section>
               )}
               {commentsOfQuote.popUp && commentsOfQuote.content.length === 0 && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setCommentsOfQuote({ popUp: false, content: [] })}>
                        X
                     </span>
                     <h3 className={quoteStoriesStyles.noCommentsYet}>
                        Be the first one to comment! 😊
                     </h3>
                  </section>
               )}
               <div
                  className={quoteStoriesStyles.selectedTagColor}
                  id={`category-${quoteState[countState].category_tags
                     .split(" ")[0]
                     .replace("#", "")}`}></div>
            </section>
         )}
      </div>
   );
};

export default QuoteStories;
