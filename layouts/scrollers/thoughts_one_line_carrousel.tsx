// comps
import { Thought } from "../../fragments/cards/posts/thought";

// styles
import styles from "./thoughts_one_line_carrouse.module.css";

//helpers
import { TThought } from "../../types/posts";

type TThoughtsOneLineCarrouselProps = {
   thoughts: TThought[];
};

export const ThoughtsOneLineCarrousel = ({ thoughts }: TThoughtsOneLineCarrouselProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {thoughts.map((thought: TThought, index: number) => (
               <div className={styles.thought} key={index}>
                  <Thought thought={thought} />
               </div>
            ))}
         </div>
      </div>
   );
};
