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

   // get poll data
   const fetchData = async () => {
      if (dataFromParent && data) {
         setpoll(data);
         setloading("done");
      } else {
         try {
            const { data, status } = await getMultipleOptionsPollIn24();

            data && setpoll(data.poll_multiple_choice_in_24);
            setloading(status);
         } catch (error) {
            console.error(error);
            setpoll(null);
            setloading("error");
         }
      }
   };

   const handleVote = (selection: string) => {
      console.log(selection);
      // implement helper like the one for the thumbs up poll oto handle the posting
      const now = Date.now() + 86400000;
      const cookieExpiration = new Date(now);
      document.cookie = `multChoice${poll?.ID}=${selection}; expires=${cookieExpiration}; path=/test`;

      setvotedFor(selection);
      sethasVoted(true);
   };

   // get the cookies
   useEffect(() => {
      // fetch the data
      fetchData();

      // check if user has already voted by checking cookie
      const cookie = getCookie("multChoice${poll?.ID}");
      const hasvoted = cookie !== undefined && cookie !== "" && cookie !== " ";
      sethasVoted(hasvoted);
      setvotedFor(cookie);
   }, []);

   return (
      <>
         {loading === "done" && poll && (
            <div className={styles.mainWrapper}>
               <div className={styles.timer}>
                  <CardTimer time={poll.countdown} />
               </div>
               <div className={styles.question}>
                  <Parragraph text={poll.dilemma} size='main' />
               </div>
               {!hasVoted && (
                  <div className={styles.options}>
                     <MultipleChoicePollOptions
                        cta={{ handleVote: (selection) => handleVote(selection) }}
                        options={poll.options}
                     />
                  </div>
               )}
               {hasVoted && <NotificationSticker type='1' text={`you voted for ${votedFor}`} />}
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
