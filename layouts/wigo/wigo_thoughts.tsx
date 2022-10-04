// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { ThoughtsOneLineCarrousel } from "../scrollers/user_content/thoughts_one_line_carrousel";

// styles
import styles from "./wigo_thoughts.module.css";

// types
import { TThought } from "../../types/posts";

type TWigoThoughtsProps = {
   thoughts: TThought[];
};

export const WigoThoughts = ({ thoughts }: TWigoThoughtsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Commentaries' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/wigo/commentaries"} />
            </div>
         </div>
         <div className={styles.carrousel}>
            <ThoughtsOneLineCarrousel thoughts={thoughts} />
         </div>
      </div>
   );
};
