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
   postId: string | number;
   userId: string | number;
   contentType: EnumContentType;
   comments: number | null;
   iconColor?: string;
};

export const PostComment = ({
   comments,
   iconColor = "#F1EAFF",
   postId,
   userId,
   contentType
}: TPostCommentProps) => {
   // state
   const [showCommentariesOfPost, setshowCommentariesOfPost] = useState<boolean>(false);
   const [totalComments, settotalComments] = useState(comments && comments > 0 ? comments : 0);

   const handleToggleModal = (val: boolean) => {
      setshowCommentariesOfPost(val);

      const body = document.getElementById("__next");
      if (val && body) body.style.display = "none";
      else if (body) body.style.display = "block";
   };

   return (
      <>
         <Portal>
            {showCommentariesOfPost && (
               <PostComments
                  postId={postId}
                  userId={userId}
                  contentType={contentType}
                  cta={{
                     handleClose: () => handleToggleModal(false),
                     handlePost: () => settotalComments((prev) => prev + 1),
                     handleDelete: () => settotalComments((prev) => prev - 1)
                  }}
               />
            )}
         </Portal>

         <div className={`${styles.mainWrapper}`} onClick={() => handleToggleModal(true)}>
            {/* -------------- comment count ------------ */}
            {!iconColor && <Parragraph text={totalComments} size='main' inline={true} />}
            {iconColor && (
               <Parragraph text={totalComments} size='main' inline={true} color={iconColor} />
            )}

            <div className={styles.commentIconWrapper} onClick={() => {}}>
               <Icon name='comment' color={iconColor} size={"3rem"} />
            </div>
         </div>
      </>
   );
};
