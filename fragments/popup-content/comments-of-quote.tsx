//core
import React from "react";

// styles
import commentsOfStoryStyles from "../../styles/fragments/popup-content/CommentsOfQuote.module.css";

export type TcommentType = {
   id: string;
   userId: string;
   userAvatar: string;
   userSignature: string;
   content: string;
};

export type commentsOfQuoteProps = {
   comment: TcommentType;
};

const CommentsOfQuote = ({ comment }: commentsOfQuoteProps) => {
   return (
      <div className={commentsOfStoryStyles.mainWrapper}>
         <div className={commentsOfStoryStyles.avatarUserSignatureWrapper}>
            <div style={{ backgroundImage: comment.userAvatar }}></div>
            <h4>{comment.userSignature}</h4>
         </div>
         <p className={commentsOfStoryStyles.content}>{comment.content}</p>
      </div>
   );
};

export default CommentsOfQuote;
