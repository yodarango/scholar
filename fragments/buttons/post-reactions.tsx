// core
import React from "react";

// styles
import postReactionStyles from "../../styles/buttons/PostReactions.module.css";

type postReactionsProps = {
   handleComment?: any;
   handleApprove?: any;
   handleDisapprove?: any;
   handleMore?: any;
};

const PostReactions = ({
   handleComment,
   handleApprove,
   handleDisapprove,
   handleMore
}: postReactionsProps) => {
   return (
      <div className={postReactionStyles.mainWrapper}>
         {handleComment && (
            <div className={postReactionStyles.commentWrapper}>
               <span className={postReactionStyles.commentAmount}>3243</span>
               <span className={postReactionStyles.commentIcon} onClick={handleComment}></span>
            </div>
         )}
         {handleApprove && (
            <div className={postReactionStyles.approveWrapper}>
               <span className={postReactionStyles.approveAmount}>343</span>
               <span className={postReactionStyles.approveIcon} onClick={handleApprove}></span>
            </div>
         )}
         {handleDisapprove && (
            <div className={postReactionStyles.disapproveWrapper}>
               <span className={postReactionStyles.disapproveAmount}>232</span>
               <span
                  className={postReactionStyles.disapproveIcon}
                  onClick={handleDisapprove}></span>
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
