// comps
import { Commentary } from "../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

//helpers
import { TCommentary } from "../../types/posts";

type TCommentaryOneLineCarrouselProps = {
   commentaries: TCommentary[];
};

export const CommentaryOneLineCarrousel = ({ commentaries }: TCommentaryOneLineCarrouselProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {commentaries.map((commentary: TCommentary, index: number) => (
               <div className={styles.commentary} key={index}>
                  <Commentary commentary={commentary} />
               </div>
            ))}
         </div>
      </div>
   );
};
