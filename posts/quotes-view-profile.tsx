import React, { useState } from "react";

// components
import PostReactions from "../fragments/buttons/post-reactions";
import CommentsOfQuote from "../fragments/popup-content/comments-of-quote";

// stoires
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";

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
   return (
      <div className={quoteStoriesStyles.mainWrapper}>
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
                  {story.content} <span className={quoteStoriesStyles.quotationMark}></span>
               </p>
               <span className={quoteStoriesStyles.storyBy}>{story.by}</span>
            </div>
            <div className={quoteStoriesStyles.postReactionWrapper}>
               <PostReactions
                  handleApprove={hanndleApproveClick}
                  handleDisapprove={handleDisapproveClick}
                  handleComment={handleComentClick}
                  handleMore={handleMoreClick}
                  postApproves={story.approves}
                  postDisapproves={story.disapproves}
                  postComments={story.comments}
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
                  {story.comments.map((comment: any) => (
                     <CommentsOfQuote comment={comment} />
                  ))}
                  {story.comments.length <= 0 && (
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
