import { useState } from "react";

// comps
import { PostComment } from "../../fragments/cards/posts/post_comment";

// styles
import styles from "./post_comments_wrapper.module.css";

//types
import { TComment } from "../../types/posts_contnet";
import { TimeStampProps } from "../../fragments/chunks/time_stamp";
import { Primary } from "../../fragments/buttons/primary";

type TPostCommentsWrapperProps = {
   postComments: TComment[];
};

export const PostCommentsWrapper = ({ postComments }: TPostCommentsWrapperProps) => {
   // state
   const [postCommentsArr, setpostCommentsArr] = useState<TComment[]>(postComments);

   // will only run if the post was deleted successfully
   const handleDelete = (id: string) => {
      const updatedArr = postCommentsArr.filter((sermonNotes) => sermonNotes.ID !== id);
      setpostCommentsArr(updatedArr);
   };

   const gloadMore = async () => {
      // get more comments
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {postCommentsArr.map((comment: TComment, index: number) => (
               <div className={styles.comment} key={index}>
                  <PostComment
                     comment={comment.body}
                     postHeader={{
                        username: comment.creator_signature,
                        avatar: comment.creator_avatar,
                        userId: comment.creator_id,
                        postId: comment.ID,
                        userAuthority: comment.creator_authority_level,
                        postType: "",
                        widthTimeStamp: {
                           time: comment.posted_on,
                           niceTime: comment.date,
                           quiet: true
                        }
                     }}
                     postSettingsOptions={{
                        showEditOption: false,
                        showDeleteOption: true, // check if is login first
                        showReportOption: false,
                        showShareopton: false
                     }}
                     cta={{ handleDelete }}
                  />
               </div>
            ))}
         </div>
         <div className={styles.loadMoreButton}>
            <Primary type='1' title='Load more' cta={{ handleClick: gloadMore }} />
         </div>
      </div>
   );
};
