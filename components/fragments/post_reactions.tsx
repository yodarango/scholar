// comps
import { PostComment } from "./chunks/post_comment";
import { PostRating } from "./chunks/post_rating";

// styles
import styles from "./post_reactions.module.css";

// types
import { EnumContentType } from "../../types/enums";

type TPostReactionsProps = {
   userId: string | number;
   postId: string | number;
   contentType: EnumContentType;
   postRating: {
      totalCount: number;
      averageCount: number;
   };
   totalComments: number;
   iconColor?: string;
};

export const PostReactions = ({
   postRating,
   totalComments,
   iconColor,
   contentType,
   postId,
   userId
}: TPostReactionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <PostRating
               userId={userId}
               postId={postId}
               iconColor={iconColor}
               rating={{
                  totalCount: postRating.totalCount,
                  averageCount: postRating.averageCount
               }}
            />
         </div>
         <div>
            <PostComment
               comments={totalComments}
               iconColor={iconColor}
               contentType={contentType}
               postId={postId}
            />
         </div>
      </div>
   );
};
