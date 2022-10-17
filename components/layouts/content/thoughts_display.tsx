// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { ThoughtsOneLineCarrousel } from "../scrollers/thoughts_one_line_carrousel";

// styles
import styles from "./fast_facts.module.css";

// types
import { TThought } from "../../types/posts";

type TThoughtsDisplayProps = {
   thoughts: TThought[];
};
export const ThoughtsDisplay = ({ thoughts }: TThoughtsDisplayProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Thoughts' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/thought"} />
            </div>
         </div>

         <div className={styles.thoughts}>
            <ThoughtsOneLineCarrousel thoughts={thoughts} />
         </div>
      </div>
   );
};
