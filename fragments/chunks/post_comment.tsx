import { useState } from "react";

//comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";
import Portal from "../../hoc/potal";

// styles
import styles from "./post_comment.module.css";

export type Tcomment = {
   ID: string;
   body: string;
   creator_avatar: string;
   creator_signature: string;
   creator_approval_rate: string;
   creator_authority_level: number;
   creator_id: string;
   posted_on?: string;
};

type TPostCommentProps = {
   comments: number | null;
   iconColor?: string;
};

export const PostComment = ({ comments, iconColor }: TPostCommentProps) => {
   // state
   const [showCommentariesOfPost, setshowCommentariesOfPost] = useState<boolean>(false);

   return (
      <>
         <Portal>{showCommentariesOfPost /*display the comments of post here */}</Portal>
         <div className={`${styles.mainWrapper}`}>
            {/* -------------- comment count ------------ */}
            {!iconColor && (
               <Parragraph text={comments ? comments : ""} size='small' inline={true} />
            )}
            {iconColor && (
               <Parragraph
                  text={comments ? comments : ""}
                  size='small'
                  inline={true}
                  color={iconColor}
               />
            )}
            <div
               className={styles.commentIconWrapper}
               onClick={() => setshowCommentariesOfPost(true)}>
               <Icon name='comment' color={iconColor ? iconColor : "#F1EAFF"} size={"2rem"} />
            </div>
         </div>
      </>
   );
};
