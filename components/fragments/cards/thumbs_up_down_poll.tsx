/**********************************************************************************
 - allows users to vote on a specific topic from and the percentages are calculated 
 for each side based on the total votes received.
 - handle the vote by calling the thumbs_up_down_voting.ts helper
 - There is the option to have the parent fetch the data in cases where many polls
   are rendered, If this is desired passed the dataFromParent prop
 /*********************************************************************************/

import { useEffect, useState } from "react";

// comps
import CardTimer from "../chunks/card_timer";
import { Parragraph } from "../Typography/parragraph";
import { Third } from "../buttons/third";
import { NotificationSticker } from "./notification_sticker";
import { RoundLoader } from "../chunks/round_loader";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";

//styles
import styles from "./thumbs_up_down_poll.module.css";

// types
import { TThumbsUpDownPoll } from "../../../types/interactive";
import { ThumbsUpDownStats } from "../chunks/thumbs_up_down_stats";

// helpers
import { getCookie } from "../../../helpers/get-cookie";
import { getThumbsUpPollIn24 } from "../../../helpers/functions/interactive/thumbs_up_down_voting";
import { WinningPoll } from "./winning_poll";
import { createPollVote } from "../../../helpers/functions/interactive/polls";
import Portal from "../../hoc/potal";
import { Notification } from "../popups/notification";

type TThumbsUpDownPollProps = {
   dataFromParent?: boolean;
   data?: TThumbsUpDownPoll;
};

export const ThumbsUpDownPoll = ({ dataFromParent, data }: TThumbsUpDownPollProps) => {
   //state
   const [hasVoted, sethasVoted] = useState<boolean>(false);
   const [votedFor, setvotedFor] = useState<any>();
   const [poll, setpoll] = useState<TThumbsUpDownPoll | null>(null);
   const [loading, setloading] = useState<string>("loading");
   const [isTimeUp, setisTimeUp] = useState<boolean>(false);
   const [notification, setnotification] = useState<null | {
      title: string;
      body: string;
      type: number;
   }>(null);

   // get poll data
   const fetchData = async () => {
      if (dataFromParent && data) {
         setpoll(data);
         setloading("done");
      } else {
         try {
            const { data, status } = await getThumbsUpPollIn24();
            data && setpoll(data.poll_thumbs_up_in_24);
            const poll = data.poll_thumbs_up_in_24;

            if (poll) {
               // check if user has already voted by checking cookie
               const cookie = getCookie(`thumbsUpDown${poll?.ID}`);
               const hasvoted = cookie !== undefined && cookie !== "" && cookie !== " ";
               sethasVoted(hasvoted);
               setvotedFor(cookie);
            }

            setloading(status);
         } catch (error) {
            console.error(error);
            setpoll(null);
            setloading("error");
         }
      }
   };

   type ThandleVoteArgs = {
      up: number;
      down: number;
      id: string;
      type: number;
      cookieVal: string;
   };

   const handleVote = async (args: ThandleVoteArgs) => {
      const { up, down, id, type, cookieVal } = args;

      const when = Date.now() + 86400000;
      const cookieExpiration = new Date(when);

      try {
         const vote = `${up}:${down}`;
         const voteIt: any = await createPollVote({ POLL_ID: id, type, vote });

         if (voteIt === true) {
            document.cookie = `thumbsUpDown${poll?.ID}=${cookieVal}; expires=${cookieExpiration}; path=/`;
            setvotedFor(cookieVal);
            sethasVoted(true);
         } else if (voteIt?.error) {
            setnotification(voteIt?.error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   // get the cookies
   useEffect(() => {
      // get the poll data
      fetchData();
   }, []);

   return (
      <>
         {notification && (
            <Portal>
               <Notification
                  cta={{ handleClose: () => setnotification(null) }}
                  type='4'
                  title={notification.title}
                  body={notification.body}
               />
            </Portal>
         )}
         {loading === "done" && poll && (
            <div className={styles.mainWrapper}>
               <div className={styles.countdown}>
                  <CardTimer
                     time={poll.countdown}
                     cta={{
                        timesUp: () => setisTimeUp(true)
                     }}
                  />
               </div>

               <div className={styles.stats}>
                  <ThumbsUpDownStats votes={poll.votes} />
               </div>

               <section className={styles.poll}>
                  <Parragraph text={poll?.dilemma} size='main' align='center' />
               </section>
               {!hasVoted && !isTimeUp && (
                  <div className={styles.buttonWrapper}>
                     <Third
                        icon='👍'
                        title='Agree'
                        type='1'
                        cta={{
                           handleClick: () =>
                              handleVote({
                                 up: 1,
                                 down: 0,
                                 id: poll.ID,
                                 type: poll.type,
                                 cookieVal: "agree"
                              })
                        }}
                     />
                     <Third
                        icon='👎'
                        title='Disagree'
                        type='2'
                        cta={{
                           handleClick: () =>
                              handleVote({
                                 up: 0,
                                 down: 1,
                                 id: poll.ID,
                                 type: poll.type,
                                 cookieVal: "disagree"
                              })
                        }}
                     />
                  </div>
               )}
               {hasVoted && !isTimeUp && (
                  <NotificationSticker type='1' text={`you voted for ${votedFor}`} />
               )}
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && <div className={styles.error}>#needsgraphics</div>}
      </>
   );
};
