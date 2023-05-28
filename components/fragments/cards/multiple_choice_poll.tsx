/**************************************************************************************** 
- Handles a voting and displaying of multiple choice questionss
 - There is the option to have the parent fetch the data in cases where many polls
   are rendered, If this is desired passed the dataFromParent prop
****************************************************************************************/
// core
import { useState, useEffect } from "react";

// comps
import CardTimer from "../chunks/card_timer";
import { MultipleChoicePollOptions } from "../chunks/multiple_choice_poll_options";
import { MultipleChoicePoll } from "../chunks/multiple_choice_poll";
import { Parragraph } from "../Typography/parragraph";
import { NotificationSticker } from "./notification_sticker";

// styles
import styles from "./multiple_choice_poll.module.css";

// helpers
import { getCookie } from "../../../helpers/get-cookie";
import { getMultipleOptionsPollIn24 } from "../../../helpers/functions/interactive/multiple_choice_poll";

// types
import { TMultipleChicePoll } from "../../../types/interactive";
import { RoundLoader } from "../chunks/round_loader";
import { ResourceNotFoundError } from "../chunks/error_resource_not_found";
import { WinningPoll } from "./winning_poll";
import { createPollVote } from "../../../helpers/functions/interactive/polls";
import { Notification } from "../popups/notification";
import Portal from "../../hoc/potal";

type TMultipleChoicePollCardProps = {
   dataFromParent?: boolean;
   data?: TMultipleChicePoll;
};

export const MultipleChoicePollCard = ({ dataFromParent, data }: TMultipleChoicePollCardProps) => {
   // check if user has already voted by checking cookie
   const [hasVoted, sethasVoted] = useState<boolean>(false);
   const [votedFor, setvotedFor] = useState<any>();
   const [poll, setpoll] = useState<TMultipleChicePoll | null>(null);
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
            const { data, status } = await getMultipleOptionsPollIn24();
            const poll = data?.poll_multiple_choice_in_24;
            data && setpoll(poll);

            if (poll) {
               // check if user has already voted by checking cookie
               const cookie = getCookie(`multChoice${poll?.ID}`);
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
      selection: string;
      index: number;
      id: string | number;
      type: number;
      pollVotes: number[];
   };
   const handleVote = async (args: ThandleVoteArgs) => {
      const { selection, index, id, type, pollVotes } = args;
      // implement helper like the one for the thumbs up poll oto handle the posting
      const now = Date.now() + 86400000;
      const cookieExpiration = new Date(now);

      try {
         const setAllVotesToZero = pollVotes.map((v, i) => 0);
         setAllVotesToZero.splice(index, 1, 1);
         let vote = setAllVotesToZero.join(":");

         const voteIt: any = await createPollVote({ POLL_ID: id, type, vote });
         console.log(voteIt);
         if (voteIt === true) {
            document.cookie = `multChoice${poll?.ID}=${selection}; expires=${cookieExpiration}; path=/`;
            setvotedFor(selection);
            sethasVoted(true);
         } else if (voteIt?.error) {
            setnotification(voteIt.error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   // get the cookies
   useEffect(() => {
      // fetch the data
      fetchData();

      return () => {
         setpoll(null);
      };
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
               <div className={styles.timer}>
                  <CardTimer
                     time={poll.countdown}
                     cta={{
                        timesUp: () => setisTimeUp(true)
                     }}
                  />
               </div>
               <div className={styles.question}>
                  <Parragraph
                     text={poll.dilemma}
                     size='main'
                     align={isTimeUp ? "center" : "left"}
                  />
               </div>

               <div className={styles.options}>
                  {!hasVoted && !isTimeUp && (
                     <MultipleChoicePollOptions
                        cta={{
                           handleVote: (sel, ind) =>
                              handleVote({
                                 selection: sel,
                                 index: ind,
                                 id: poll.ID,
                                 type: poll.type,
                                 pollVotes: poll.votes.vote
                              })
                        }}
                        options={poll.options}
                     />
                  )}

                  {isTimeUp && (
                     <WinningPoll
                        message={`Most people have voted for`}
                        image='/images/bible_books/1.png'
                     />
                  )}
               </div>

               {hasVoted && !isTimeUp && (
                  <NotificationSticker type='1' text={`you voted for ${votedFor}`} />
               )}
               <div className={styles.graph}>
                  <MultipleChoicePoll votes={poll.votes} optionsAmount={poll.options.length} />
               </div>
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
