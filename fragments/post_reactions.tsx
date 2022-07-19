import { PostComment } from "./chunks/post_comment";
import { PostRating } from "./chunks/post_rating";
import styles from "./post_reactions.module.css";

export const PostReactions = () => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <PostRating
               rating={{ total_count: 100, average_count: 10 }}
               cta={() => console.log("...")}
            />
         </div>
         <div>
            <PostComment comments={23} cta={() => console.log("...")} />
         </div>
      </div>
   );
};
