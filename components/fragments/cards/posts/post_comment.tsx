// comps
import { useState } from "react";
import { PostCardHeader } from "../../chunks/post_card_header";
import { TimeStampProps } from "../../chunks/time_stamp";
import { InputPrimary } from "../../inputs/input_primary";
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./post_comment.module.css";

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
   postSettingsOptions?: {
      showShareopton?: boolean;
      showEditOption?: boolean;
      showDeleteOption?: boolean;
      showReportOption?: boolean;
   };
   comment: string;
   cta: {
      handleEdit: (id: string) => void;
      handleDelete: (id: string) => void;
   };
};

export const PostComment = ({
   postHeader,
   comment,
   cta,
   postSettingsOptions
}: TPostCommentProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.postHeader}>
            <PostCardHeader
               username={postHeader.username}
               avatar={postHeader.avatar}
               userId={postHeader.userId}
               postId={postHeader.postId}
               userAuthority={postHeader.userAuthority}
               postType='post_comment'
               widthTimeStamp={
                  postHeader.widthTimeStamp && {
                     time: postHeader.widthTimeStamp.time,
                     niceTime: postHeader.widthTimeStamp.niceTime,
                     quiet: postHeader.widthTimeStamp.quiet
                  }
               }
               postSettingsOptions={postSettingsOptions}
               cta={{ handleDelete: cta.handleDelete, handleEdit: cta.handleEdit }}
            />
         </div>
         <div className={styles.comment}>
            <Parragraph text={comment} size='small' />
         </div>
      </div>
   );
};
