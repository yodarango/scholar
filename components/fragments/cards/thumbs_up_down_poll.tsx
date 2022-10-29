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
import { RoundLoader } from "../chunks/round_loader";
import { ResourceNotFoundError } from "../chunks/error_resource_not_found";

//styles
import styles from "./thumbs_up_down_poll.module.css";

// types
import { TThumbsUpDownPoll } from "../../../types/interactive";
import { ThumbsUpDownStats } from "../chunks/thumbs_up_down_stats";

// helpers
import { getCookie } from "../../../helpers/get-cookie";
import { getThumbsUpPollIn24 } from "../../../helpers/functions/interactive/thumbs_up_down_voting";
import { WinningPoll } from "./winning_poll";

export const ThumbsUpDownPoll = () => {
   //state
   const [hasVoted, sethasVoted] = useState<boolean>(false);
   const [votedFor, setvotedFor] = useState<any>();
   const [poll, setpoll] = useState<TThumbsUpDownPoll | null>(null);
   const [loading, setloading] = useState<string>("loading");

   // get poll data
   const fetchData = async () => {
      try {
         const { data, status } = await getThumbsUpPollIn24();
         data && setpoll(data.poll_thumbs_up_in_24);
         setloading(status);
      } catch (error) {
         console.error(error);
         setpoll(null);
         setloading("error");
      }
   };

   const handleVote = (up: number, down: number, id: string, cookieVal: string) => {
      const now = Date.now() + 86400000;
      const cookieExpiration = new Date(now);
      document.cookie = `thumbsUpDown${poll?.ID}=${cookieVal}; expires=${cookieExpiration}; path=/test`;

      setvotedFor(cookieVal);
      sethasVoted(true);
   };

   // get the cookies
   useEffect(() => {
      // get the poll data
      fetchData();
      // check if user has already voted by checking cookie
      const cookie = getCookie("thumbsUpDown${poll.id}");
      const hasvoted = cookie !== undefined && cookie !== "" && cookie !== " ";
      sethasVoted(hasvoted);
      setvotedFor(cookie);
   }, []);

   return (
      <>
         {loading === "done" && poll && (
            <div className={styles.mainWrapper}>
               <div className={styles.countdown}>
                  <CardTimer time={poll.countdown} />
               </div>

               <div className={styles.stats}>
                  <ThumbsUpDownStats votes={poll.votes} />
               </div>

               <section className={styles.poll}>
                  <Parragraph text={poll?.dilemma} size='main' align='center' />
               </section>
               {!hasVoted && (
                  <div className={styles.buttonWrapper}>
                     <Third
                        icon='👍'
                        title='Agree'
                        type='1'
                        cta={{ handleClick: () => handleVote(1, 0, poll.ID, "agree") }}
                     />
                     <Third
                        icon='👎'
                        title='Disagree'
                        type='2'
                        cta={{ handleClick: () => handleVote(0, 1, poll.ID, "disagree") }}
                     />
                  </div>
               )}
               {hasVoted && <NotificationSticker type='1' text={`you voted for ${votedFor}`} />}
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </>
   );
};
