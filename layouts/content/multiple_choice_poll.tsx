// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { MultipleChoicePollCard } from "../../fragments/cards/multiple_choice_poll";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./fast_facts.module.css";

// types
import { TMultipleChicePoll } from "../../types/wigo_content";

type TMultipleChicePollrops = {
   content: TMultipleChicePoll;
};
export const MultipleChicePoll = ({ content }: TMultipleChicePollrops) => {
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
            <MultipleChoicePollCard content={content} />
         </div>
      </div>
   );
};
