/*************************************************************************************************
-  displays total coments for each post 
-  makes call to DB for post comments by passign the content type and and the post Id in props
 *************************************************************************************************/
import { useState } from "react";

//comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";
import Portal from "../../hoc/potal";
import { PostComments } from "../../layouts/stacks/post_coments";

// styles
import styles from "./post_comment.module.css";

//types
import { EnumContentType } from "../../../types/enums";

type TPostCommentProps = {
   postId: string;
   contentType: EnumContentType;
   comments: number | null;
   iconColor?: string;
};

export const PostComment = ({ comments, iconColor, postId, contentType }: TPostCommentProps) => {
   // state
   const [showCommentariesOfPost, setshowCommentariesOfPost] = useState<boolean>(false);

   // total comments
   const totalComments = comments && comments > 0 ? comments : 0;
   return (
      <>
         <Portal>
            {showCommentariesOfPost && (
               <PostComments
                  contentType={contentType}
                  postId={postId}
                  cta={{
                     handleClose: () => setshowCommentariesOfPost(false),
                     handleValue: (value: string) => console.log(value)
                  }}
               />
            )}
         </Portal>
         <div className={`${styles.mainWrapper}`} onClick={() => setshowCommentariesOfPost(true)}>
            {/* -------------- comment count ------------ */}
            {!iconColor && <Parragraph text={totalComments} size='small' inline={true} />}
            {iconColor && (
               <Parragraph text={totalComments} size='small' inline={true} color={iconColor} />
            )}
            <div className={styles.commentIconWrapper} onClick={() => {}}>
               <Icon name='comment' color={iconColor ? iconColor : "#F1EAFF"} size={"2rem"} />
            </div>
         </div>
      </>
   );
};
