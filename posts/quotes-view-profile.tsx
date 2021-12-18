// core
import React, { useState } from "react";

//graphql
import client from "../apollo-client";
import { OPEN_QUOTE_STORY_COMMENTS } from "../graphql/posts/quotes";

// components
import PostReactions from "../fragments/buttons/post-reactions";
import CommentsOfQuote from "../fragments/popup-content/comments-of-quote";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";

// styles
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";
import contentApprovalDDStyles from "../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

// helpers
import { TsingleStory } from "./quotes-profile";

export type quoteViewProfileProps = {
   story: TsingleStory;
   handleCloseStories: React.MouseEventHandler;
};

const QuoteViewProfile = ({ story, handleCloseStories }: quoteViewProfileProps) => {
   // ==============   FUNCTION 5: commennt on the story  =============== //
   const [commentPopUpState, setCommentPopUpState] = useState<boolean>(false);
   const handleComentClick = () => {
      setCommentPopUpState(true);
   };

   // =================    FUNCTION 6: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleRateContent = () => {
      setChooseAprovalRating(true);
   };

   // ==============   FUNCTION 7: see the stroy data when the user clicks "More" =============== //
   const [morePopUpState, setMorePopUpState] = useState<boolean>(false);
   const [commentsOfQuote, setCommentsOfQuote] = useState([]);
   const handleMoreClick = async (quote_id: string) => {
      setMorePopUpState(true);
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY_COMMENTS,
         variables: { ID: quote_id, showComment: true }
      });

      setCommentsOfQuote(data.quote[0].comments);
   };

   // ==============   FUNCTION 8: see the story data when the user clicks "More" =============== //
   const handleCloseComment = () => {
      setCommentPopUpState(false);
   };
   return (
      <div className={quoteStoriesStyles.mainWrapper}>
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
               additionalClassOne={contentApprovalDDStyles.mianWrapper_quotes}
               additionalClassTwo={contentApprovalDDStyles.listWrapper_quotes}
               additionalClassThree={contentApprovalDDStyles.listWrapper_list_quotes}
            />
         )}
         <section className={quoteStoriesStyles.storyPostWrapper}>
            <div
               className={`closeModal ${quoteStoriesStyles.closeModal}`}
               onClick={handleCloseStories}>
               X
            </div>
            <div
               className={`${quoteStoriesStyles.storyPost}`}
               style={{ backgroundImage: story.background }}>
               <p className={`${quoteStoriesStyles.storyContent}`}>
                  {story.body} <span className={quoteStoriesStyles.quotationMark}></span>
               </p>
               <span className={quoteStoriesStyles.storyBy}>{story.author}</span>
            </div>
            <div className={quoteStoriesStyles.postReactionWrapper}>
               <PostReactions
                  handleRateContent={handleRateContent}
                  handleComment={handleComentClick}
                  handleMore={() => handleMoreClick(story.ID)}
                  approvals={story.approvals}
                  comments={story.comments[0].total_count}
               />
            </div>
            {commentPopUpState && (
               <div className={quoteStoriesStyles.commentWrapper}>
                  <h3>Type your comment</h3>
                  <textarea placeholder={"comment..."}></textarea>
                  <div className={quoteStoriesStyles.postReactionWrapperComment}>
                     <span className={"std-button_gradient-text"}>Post</span>
                     <span className={quoteStoriesStyles.cancelButton} onClick={handleCloseComment}>
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
                  <CommentsOfQuote comments={commentsOfQuote} />
                  {story.comments[0].total_count <= 0 && (
                     <h3 className={quoteStoriesStyles.noCommentsYet}>
                        Be the first one to comment! 😊
                     </h3>
                  )}
               </section>
            )}
         </section>
         <div
            className={quoteStoriesStyles.selectedTagColor}
            style={{ backgroundImage: `${story.background}` }}></div>
      </div>
   );
};

export default QuoteViewProfile;
