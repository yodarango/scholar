// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { ThumbsUpDownPoll } from "../../fragments/cards/thumbs_up_down_poll";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./fast_facts.module.css";

// types
import { TThumbsUpDownPoll } from "../../types/wigo_content";

type TThumbsUpPollProps = {
   content: TThumbsUpDownPoll;
};
export const ThumbsUpPoll = ({ content }: TThumbsUpPollProps) => {
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
         <div className={styles.thumbsUp}>
            <ThumbsUpDownPoll content={content} />
         </div>
      </div>
   );
};
