// comps
import { PostComment } from "./chunks/post_comment";
import { PostRating } from "./chunks/post_rating";

// styles
import styles from "./post_reactions.module.css";

type TPostReactionsProps = {
   postRating: {
      totalCount: number;
      averageCount: number;
   };
   totalComments: number;
   cta: {
      handleShowRatePost: React.MouseEventHandler<HTMLDivElement>;
      handleShowPostComments: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const PostReactions = ({ cta, postRating, totalComments }: TPostReactionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <PostRating
               rating={{
                  totalCount: postRating.totalCount,
                  averageCount: postRating.averageCount
               }}
               cta={cta.handleShowRatePost}
            />
         </div>
         <div>
            <PostComment comments={totalComments} cta={cta.handleShowRatePost} />
         </div>
      </div>
   );
};
