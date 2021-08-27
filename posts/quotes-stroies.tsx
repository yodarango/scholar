import React, { useState } from "react";

// components
import PostReactions from "../fragments/buttons/post-reactions";

// stoires
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";

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
      }
   ];
};

export type quoteStoriesProps = {
   stories: Tstory;
};

const QuoteStories = ({ stories }: quoteStoriesProps) => {
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
   const handleMoreClick = () => {};

   // ==============   FUNCTION 9: see the stroy data when the user clicks "More" =============== //
   const handleCloseComment = () => {
      setCommentPopUpState(false);
   };
   return (
      <div className={quoteStoriesStyles.mainWrapper}>
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
                  </span>
               </div>
               <div className={quoteStoriesStyles.postReactionWrapper}>
                  <PostReactions
                     handleApprove={hanndleApproveClick}
                     handleDisapprove={handleDisapproveClick}
                     handleComment={handleComentClick}
                     handleMore={handleMoreClick}
                     postApproves={["sd", "sd"]}
                     postDisapproves={["dsgds", "sdgds", "sdgds"]}
                     postComments={["gs", "fgfdg"]}
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
            </section>
         )}
      </div>
   );
};

export default QuoteStories;
