import { useState } from "react";

// comps
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

//helpers
import { TCommentary } from "../../../../types/posts";

type TCommentaryOneLineCarrouselProps = {
   commentaries: TCommentary[];
};

export const CommentaryOneLineCarrousel = ({ commentaries }: TCommentaryOneLineCarrouselProps) => {
   // state
   const [commentariesArr, setcommentariessArr] = useState(commentaries);
   // will only run if the post was deleted successfully

   const handleDelete = (id: string) => {
      const updatedArr = commentariesArr.filter((thought) => thought.ID !== id);
      setcommentariessArr(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {commentariesArr.map((commentary: TCommentary, index: number) => (
               <div className={styles.commentary} key={index}>
                  <Commentary commentary={commentary} cta={{ handleDelete }} />
               </div>
            ))}
         </div>
      </div>
   );
};
