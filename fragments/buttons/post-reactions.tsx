// core
import React from "react";

// styles
import postReactionStyles from "../../styles/buttons/PostReactions.module.css";

export type Tcomment = {
   ID: string;
   body: string;
   creator_avatar: string;
   creator_signature: string;
   creator_approval_rate: string;
   posted_on: string;
};
export type Tapprovals = {
   average_count: number;
   total_count: number;
};

type TpostReactionsProps = {
   handleComment?: any;
   handleRateContent?: any;
   handleMore?: any;
   comments: number;
   approvals: Tapprovals[];
};

const PostReactions = ({
   handleComment,
   handleRateContent,
   handleMore,
   comments,
   approvals
}: TpostReactionsProps) => {
   return (
      <div className={postReactionStyles.mainWrapper}>
         {handleComment && (
            <div className={postReactionStyles.commentWrapper}>
               <span className={postReactionStyles.commentAmount}>{comments}</span>
               <span className={postReactionStyles.commentIcon} onClick={handleComment}></span>
            </div>
         )}
         {handleRateContent && (
            <div className={postReactionStyles.approveWrapper}>
               <span className={postReactionStyles.approvals}>{approvals[0].total_count}</span>
               <span className={postReactionStyles.aprovalsIcon} onClick={handleRateContent}></span>
            </div>
         )}
         {handleMore && (
            <div className={postReactionStyles.moreWrapper}>
               <span className={postReactionStyles.moreIcon} onClick={handleMore}></span>
            </div>
         )}
      </div>
   );
};

export default PostReactions;
