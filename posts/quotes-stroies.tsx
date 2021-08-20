import React from "react";

// components

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
   // ============== FUNCTION 1: Open the stories of Each user

   return (
      <div className={quoteStoriesStyles.mainWrapper}>
         <section className={quoteStoriesStyles.mainStoryWrapper}>
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
         <section className={quoteStoriesStyles.storyPostWrapper}>
            {stories.stories.map((post) => (
               <div
                  className={`${quoteStoriesStyles.storyPost}`}
                  style={{ backgroundImage: post.background }}>
                  {post.content}
               </div>
            ))}
         </section>
      </div>
   );
};

export default QuoteStories;
