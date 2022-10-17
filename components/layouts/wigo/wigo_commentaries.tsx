// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { CommentaryOneLineCarrousel } from "../scrollers/user_content/commentaries_one_line_carrousel";

// styles
import styles from "./wigo_commentaries.module.css";

// types
import { TCommentary } from "../../types/posts";
import { Header } from "../../fragments/Typography/header";

type TWigoCommentariesProps = {
   commentaries: TCommentary[];
};
export const WigoCommentaries = ({ commentaries }: TWigoCommentariesProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Commentaries' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/commentary"} />
            </div>
         </div>
         <div className={styles.carrousel}>
            <CommentaryOneLineCarrousel commentaries={commentaries} />
         </div>
      </div>
   );
};
