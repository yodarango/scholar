// core
import React from "react";

// styles
import postReactionStyles from "../../styles/buttons/PostReactions.module.css";

type postReactionsProps = {
   handleComment?: any;
   handleRateContent?: any;
   handleMore?: any;
   postComments: any[];
   postApprovals: any[];
};

const PostReactions = ({
   handleComment,
   handleRateContent,
   handleMore,
   postComments,
   postApprovals
}: postReactionsProps) => {
   return (
      <div className={postReactionStyles.mainWrapper}>
         {handleComment && (
            <div className={postReactionStyles.commentWrapper}>
               <span className={postReactionStyles.commentAmount}>{postComments.length}</span>
               <span className={postReactionStyles.commentIcon} onClick={handleComment}></span>
            </div>
         )}
         {handleRateContent && (
            <div className={postReactionStyles.approveWrapper}>
               <span className={postReactionStyles.approvals}>{postApprovals.length}</span>
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
