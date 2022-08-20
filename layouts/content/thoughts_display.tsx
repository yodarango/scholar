// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./fast_facts.module.css";

// types
import { TThumbsUpDownPoll } from "../../types/wigo_content";

type TThoughtsOneLineCarrouselProps = {
   content: TThumbsUpDownPoll;
};
export const ThoughtsOneLineCarrousel = ({ content }: TThoughtsOneLineCarrouselProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Cast your vote' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/wigo/polls"} />
            </div>
         </div>
         <div className={styles.thoughts}></div>
      </div>
   );
};
