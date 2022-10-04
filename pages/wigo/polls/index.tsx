import { useEffect, useState } from "react";

// components
import { MultipleChoicePollCard } from "../../../fragments/cards/multiple_choice_poll";
import { ThumbsUpDownPoll } from "../../../fragments/cards/thumbs_up_down_poll";

// styles
import styles from "./index.module.css";

const Polls = () => {
   const [polls, setpolls] = useState<Array<any>>([]);

   // get the polls
   const getPolls = () => {
      setpolls([
         {
            countdownLimit: "11/03/2022 21:00:00",
            id: "1",
            type: 1,
            poll: "The earth is 6,000 years old",
            votes: { votesDown: 1, votesUp: 3 }
         },
         {
            id: "",
            type: 2,
            question: "Coffe or tea?",
            options: ["yes", "no", "maybe"],
            votes: [2, 4, 6],
            countTo: "10/22/22 22:00"
         },
         {
            countdownLimit: "10/09/2022 21:00:00",
            id: "1",
            type: 1,
            poll: "Adam was 17 years old",
            votes: { votesDown: 5, votesUp: 2 }
         },
         {
            id: "",
            type: 2,
            question: "cold or hot?",
            options: ["yes", "no", "maybe"],
            votes: [0, 17, 3],
            countTo: "11/22/22 22:00"
         }
      ]);
   };

   useEffect(() => {
      getPolls();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         {polls.map((poll: any) => {
            return (
               <div>
                  {poll.type === 1 && <ThumbsUpDownPoll content={poll} />}
                  {poll.type === 2 && <MultipleChoicePollCard content={poll} />}
               </div>
            );
         })}
      </div>
   );
};

export default Polls;
