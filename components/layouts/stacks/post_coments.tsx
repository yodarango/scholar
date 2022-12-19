import { useEffect, useState } from "react";

// comps
import { PostCommentsWrapper } from "../scrollers/user_content/post_comments_wrapper";
import { PrimaryStack } from "./templates/primary_stack";
import { PostCommentTextArea } from "../../fragments/inputs/post_comment_text_area";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./post_coments.module.css";

// types
import { TComment } from "../../../types/posts_contnet";
import { EnumContentType } from "../../../types/enums";

type TPostCommentsProps = {
   postId: string;
   contentType: EnumContentType;
   cta: {
      handleValue: (value: string) => void;
      handleClose: () => void;
   };
};

export const PostComments = ({ postId, contentType, cta }: TPostCommentsProps) => {
   return (
      <PrimaryStack title={"Comments"} cta={{ handleClose: cta.handleClose }}>
         <div className={styles.mainWrapper}>
            <div className={styles.postComments}>
               <PostCommentsWrapper postId={postId} contentType={contentType} />
            </div>
            <div className={styles.textArea}>
               <PostCommentTextArea cta={{ handleValue: cta.handleValue }} />
            </div>
         </div>
      </PrimaryStack>
   );
};
