// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { CommentaryOneLineCarrousel } from "../scrollers/user_content/commentaries_one_line_carrousel";

// styles
import styles from "./fast_facts.module.css";

// types
import { TCommentary } from "../../types/posts";

type TCommentariesDisplayProps = {
   commentaries: TCommentary[];
};
export const CommentariesDisplay = ({ commentaries }: TCommentariesDisplayProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Thoughts' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/Commentary"} />
            </div>
         </div>

         <div className={styles.commentaryies}>
            <CommentaryOneLineCarrousel commentaries={commentaries} />
         </div>
      </div>
   );
};
