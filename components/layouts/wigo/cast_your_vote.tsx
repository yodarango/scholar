// components
import { useEffect, useState } from "react";
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { MultipleChoicePollCard } from "../../fragments/cards/multiple_choice_poll";
import { ThumbsUpDownPoll } from "../../fragments/cards/thumbs_up_down_poll";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./cast_your_vote.module.css";

export const CastYourVote = () => {
   const [pollToLoad, setpollToLoad] = useState<number>(0);

   // decide which poll to load
   const getPollToLoad = () => {
      setpollToLoad(2);
   };

   useEffect(() => {
      getPollToLoad();
   }, []);

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
         <div className={styles.poll}>
            {pollToLoad === 1 && <ThumbsUpDownPoll />}
            {pollToLoad === 2 && <MultipleChoicePollCard />}
         </div>
      </div>
   );
};
