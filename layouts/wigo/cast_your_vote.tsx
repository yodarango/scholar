// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { MultipleChoicePollCard } from "../../fragments/cards/multiple_choice_poll";
import { ThumbsUpDownPoll } from "../../fragments/cards/thumbs_up_down_poll";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./cast_your_vote.module.css";

export const CastYourVote = () => {
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
            <ThumbsUpDownPoll
               content={{
                  countdownLimit: "08/03/2022 21:00:00",
                  id: "1",
                  poll: "The earth is 6,000 years old",
                  votes: { votesDown: 1, votesUp: 3 }
               }}
            />
            <MultipleChoicePollCard
               content={{
                  id: "",
                  question: "Coffe or tea?",
                  options: ["yes", "no", "maybe"],
                  votes: [2, 4, 6],
                  countTo: "08/22/22 22:00"
               }}
            />
         </div>
      </div>
   );
};
