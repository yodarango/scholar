// comps
import { Thought } from "../../fragments/cards/posts/thought";

// styles
import styles from "./thoughts_one_line_carrouse.module.css";

//helpers
import { TThought } from "../../types/posts";
import { useState } from "react";

type TThoughtsOneLineCarrouselProps = {
   thoughts: TThought[];
};

export const ThoughtsOneLineCarrousel = ({ thoughts }: TThoughtsOneLineCarrouselProps) => {
   // state
   const [thoughtsArr, setThoughtsArr] = useState(thoughts);

   // will only run if the post was deleted successfully
   const handleDelete = (id: string) => {
      const updatedArr = thoughtsArr.filter((thought) => thought.ID !== id);
      setThoughtsArr(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {thoughtsArr.map((thought: TThought, index: number) => (
               <div className={styles.thought} key={index}>
                  <Thought thought={thought} cta={{ handleDelete }} />
               </div>
            ))}
         </div>
      </div>
   );
};
