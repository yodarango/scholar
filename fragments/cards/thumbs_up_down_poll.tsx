/**********************************************************************************
 - allows users to vote on a specific topic from and the percentages are calculated 
 for each side based on the total votes received.
 - hanndle the vote by calling the thumbs_up_down_voting.ts helper
 /*********************************************************************************/

import { useEffect, useState } from "react";

// comps
import CardTimer from "../chunks/card_timer";
import { Parragraph } from "../Typography/parragraph";
import { Third } from "../buttons/third";
import { NotificationSticker } from "./notification_sticker";

//styles
import styles from "./thumbs_up_down_poll.module.css";

// types
import { TThumbsUpDownPoll } from "../../types/wigo_content";
import { ThumbsUpDownStats } from "../chunks/thumbs_up_down_stats";

// helpers
import { getCookie } from "../../helpers/get-cookie";
import { WinningPoll } from "./winning_poll";

type TThumbsUpDownPollProps = {
   content: TThumbsUpDownPoll;
};

export const ThumbsUpDownPoll = ({ content }: TThumbsUpDownPollProps) => {
   const [hasVoted, sethasVoted] = useState<boolean>(false);
   const [votedFor, setvotedFor] = useState<any>();

   const handleVote = (up: number, down: number, id: string, cookieVal: string) => {};

   // get the cookies
   useEffect(() => {
      // check if user has already voted by checking cookie
      const hasvoted = getCookie("thumbsUpDown") !== undefined;
      const cookie = getCookie("thumbsUpDown");
      console.log(hasvoted, cookie);
      sethasVoted(hasvoted);
   }, []);

   return (
      <>
         {content && (
            <div className={styles.mainWrapper}>
               <div className={styles.countdown}>
                  <CardTimer time={content.countdownLimit} />
               </div>

               <div className={styles.stats}>
                  <ThumbsUpDownStats
                     votesDown={content.votes.votesDown}
                     votesUp={content.votes.votesUp}
                  />
               </div>

               <section className={styles.poll}>
                  <Parragraph text={content.poll} size='main' />
               </section>
               {!hasVoted && (
                  <div className={styles.buttonWrapper}>
                     <Third
                        icon='👍'
                        title='Agree'
                        type='1'
                        cta={{ handleClick: () => handleVote(1, 0, content.id, "agree") }}
                     />
                     <Third
                        icon='👎'
                        title='Disagree'
                        type='2'
                        cta={{ handleClick: () => handleVote(0, 1, content.id, "disagree") }}
                     />
                  </div>
               )}
               {hasVoted && <NotificationSticker type='1' text={`you voted for ${hasVoted}`} />}
            </div>
         )}
      </>
   );
};
