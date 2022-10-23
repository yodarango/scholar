import { useState } from "react";

// comps
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

import { TCommentary } from "../../../../types/posts";

type TCommentaryOneLineCarrouselProps = {
   commentaries: TCommentary[];
};

export const CommentaryOneLineCarrousel = ({ commentaries }: TCommentaryOneLineCarrouselProps) => {
   const [commentariesArr, setcommentariesArr] = useState<TCommentary[]>(commentaries);

   const handleDelete = (id: string) => {
      const updatedArr = commentaries.filter((thought) => thought.ID !== id);
      setcommentariesArr(updatedArr);
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
