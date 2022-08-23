// comps
import { PostCommentsWrapper } from "../scrollers/post_comments_wrapper";
import { PrimaryStack } from "./templates/primary_stack";

// styles
import styles from "./post_coments.module.css";

// types
import { TComment } from "../../types/posts_contnet";
import { PostCommentTextArea } from "../../fragments/inputs/post_comment_text_area";

type TPostCommentsProps = {
   postComments: TComment[];
   cta: {
      handleValue: (value: string) => void;
      handleClose: () => void;
   };
};

export const PostComments = ({ cta, postComments }: TPostCommentsProps) => {
   return (
      <PrimaryStack
         content={
            <div className={styles.mainWrapper}>
               <div className={styles.postComments}>
                  <PostCommentsWrapper postComments={postComments} />
               </div>
               <div className={styles.textArea}>
                  <PostCommentTextArea cta={{ handleValue: cta.handleValue }} />
               </div>
            </div>
         }
         title={"Comments"}
         cta={{ handleClose: cta.handleClose }}
      />
   );
};
