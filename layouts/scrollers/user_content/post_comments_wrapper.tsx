import { useState } from "react";

// comps
import { PostComment } from "../../../fragments/chunks/post_comment";

// styles
import styles from "./post_comments_wrapper.module.css";

//types
import { TComment } from "../../../types/posts_contnet";
import { TimeStampProps } from "../../../fragments/chunks/time_stamp";
import { Primary } from "../../../fragments/buttons/primary";

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
                  <PostComment comments={3} postId={"23"} contentType={1} />
               </div>
            ))}
         </div>
         <div className={styles.loadMoreButton}>
            <Primary type='1' title='Load more' cta={{ handleClick: gloadMore }} />
         </div>
      </div>
   );
};
