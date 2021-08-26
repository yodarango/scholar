// core
import React from "react";

// styles
import postReactionStyles from "../../styles/buttons/PostReactions.module.css";

type postReactionsProps = {
   handleComment?: any;
   handleApprove?: any;
   handleDisapprove?: any;
   handleMore?: any;
   postComments: any[];
   postApproves: any[];
   postDisapproves: any[];
};

const PostReactions = ({
   handleComment,
   handleApprove,
   handleDisapprove,
   handleMore,
   postComments,
   postApproves,
   postDisapproves
}: postReactionsProps) => {
   return (
      <div className={postReactionStyles.mainWrapper}>
         {handleComment && (
            <div className={postReactionStyles.commentWrapper}>
               <span className={postReactionStyles.commentAmount}>{postComments.length}</span>
               <span className={postReactionStyles.commentIcon} onClick={handleComment}></span>
            </div>
         )}
         {handleApprove && (
            <div className={postReactionStyles.approveWrapper}>
               <span className={postReactionStyles.approveAmount}>{postApproves.length}</span>
               <span className={postReactionStyles.approveIcon} onClick={handleApprove}></span>
            </div>
         )}
         {handleDisapprove && (
            <div className={postReactionStyles.disapproveWrapper}>
               <span className={postReactionStyles.disapproveAmount}>{postDisapproves.length}</span>
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
