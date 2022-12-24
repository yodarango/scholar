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
import { TComment } from "../../../types/posts_content";
import { EnumContentType } from "../../../types/enums";

type TPostCommentsProps = {
   postId: string | number;
   userId: string | number;
   contentType: EnumContentType;
   cta: {
      handleClose: () => void;
      handlePost: () => any;
   };
};

export const PostComments = ({ postId, userId, contentType, cta }: TPostCommentsProps) => {
   const [post, setpost] = useState<any>(null);
   return (
      <PrimaryStack title={"Comments"} cta={{ handleClose: cta.handleClose }}>
         <div className={styles.mainWrapper}>
            <div className={styles.postComments}>
               <PostCommentsWrapper postId={postId} contentType={contentType} newPost={post} />
            </div>
            <div className={styles.textArea}>
               <PostCommentTextArea
                  postId={postId}
                  userId={userId}
                  contentType={contentType}
                  cta={{ handleValue: (post) => setpost(post), handlePost: cta.handlePost }}
               />
            </div>
         </div>
      </PrimaryStack>
   );
};
