// styles
import styles from "./post_comment.module.css";

//comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";

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
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const PostComment = ({ comments, cta }: TPostCommentProps) => {
   return (
      <div className={`${styles.mainWrapper}`}>
         {/* -------------- comment count ------------ */}
         <Parragraph text={comments ? comments : ""} size='small' inline={true} />
         <div className={styles.commentIconWrapper} onClick={cta}>
            <Icon name='comment' color={"#F1EAFF"} size={"2rem"} />
         </div>
      </div>
   );
};
