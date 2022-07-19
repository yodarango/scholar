// styles
import styles from "./post_comment.module.css";

//comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";

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
