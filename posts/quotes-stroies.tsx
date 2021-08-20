import React from "react";

// components

// stoires
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";

type story = {
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

type quoteStoriesProps = {
   stories: story;
};

const QuoteStories = ({ stories }: quoteStoriesProps) => {
   return (
      <div className={quoteStoriesStyles.mainWrapper}>
         <div
            className={quoteStoriesStyles.userReputation}
            style={{
               backgroundColor: "linear-gradient(130deg, #ff9214ed, #ff0045)"
            }}>
            <div
               className={quoteStoriesStyles.avatarImage}
               style={{ backgroundImage: `${stories.userAvatar}` }}></div>
         </div>
      </div>
   );
};

export default QuoteStories;
