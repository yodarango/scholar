// comps
import { useState } from "react";
import { PostCardHeader } from "../../chunks/post_card_header";
import { TimeStampProps } from "../../chunks/time_stamp";
import { InputPrimary } from "../../inputs/input_primary";
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./post_comment.module.css";
import { CONTENT_TYPE_CONTENT_COMMENT } from "../../../../constants/defaults";

type TPostCommentProps = {
   postHeader: {
      username: string;
      avatar: string;
      userId: string;
      postId: string;
      userAuthority: number;
      withCategoryTag?: string;
      postType: string;
      fontColor?: string;
      widthTimeStamp?: TimeStampProps;
   };
   comment: string;
   cta: {
      // handleEdit: (id: string) => void;
      handleDelete: (id: string) => void;
   };
};

export const PostComment = ({ postHeader, comment, cta }: TPostCommentProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.postHeader}>
            <PostCardHeader
               username={postHeader.username}
               avatar={postHeader.avatar}
               userId={postHeader.userId}
               postId={postHeader.postId}
               userAuthority={postHeader.userAuthority}
               postType='post_comment' // this is not used for anything for now
               contentType={CONTENT_TYPE_CONTENT_COMMENT} // this is not used for anything for now
               postSettingsOptions={{
                  showShareopton: false,
                  showEditOption: false,
                  showDeleteOption: true,
                  showReportOption: false,
                  showSavetoFolderOption: false
               }}
               widthTimeStamp={
                  postHeader.widthTimeStamp && {
                     niceTime: postHeader.widthTimeStamp.niceTime,
                     quiet: postHeader.widthTimeStamp.quiet,
                     time: postHeader.widthTimeStamp.time
                  }
               }
               cta={{ handleDelete: cta.handleDelete }}
            />
         </div>
         <div className={styles.comment}>
            <Parragraph text={comment} size='small' />
         </div>
      </div>
   );
};
