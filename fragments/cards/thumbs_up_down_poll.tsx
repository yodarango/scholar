/**********************************************************************************
 - allows users to vote on a specific topic from and the percentages are calculated 
 for each side based on the total votes received.
 - passes the voting attirbutes in the cta prop function to the parent which in turn
  calls the thumbs_up_down_voting.ts helper
 /*********************************************************************************/
// comps
import DummyPlaceholder from "../wigo-content/dummy-placeholder";
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

type TThumbsUpDownPollProps = {
   content: TThumbsUpDownPoll;
   cta: {
      handleVote: (votesUp: number, votesDown: number, contentId: string, myVote: string) => void;
   };
};

export const ThumbsUpDownPoll = ({ content, cta }: TThumbsUpDownPollProps) => {
   // check if user has already voted by checking cookie
   const hasVoted = getCookie("multChoice");

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
               {hasVoted && (
                  <div className={styles.buttonWrapper}>
                     <Third
                        icon='👍'
                        title='Agree'
                        type='1'
                        cta={{ handleClick: () => cta.handleVote(1, 0, content.id, "agree") }}
                     />
                     <Third
                        icon='👎'
                        title='Disagree'
                        type='2'
                        cta={{ handleClick: () => cta.handleVote(0, 1, content.id, "disagree") }}
                     />
                  </div>
               )}
               {!hasVoted && <NotificationSticker type='1' text={`you voted for ${hasVoted}`} />}
            </div>
         )}

         {!content && (
            <DummyPlaceholder
               button='none'
               context={
                  <p>
                     Help Scholar stay a Godly, safe, and reliable place for everyone by honestly
                     rating content, giving feedback and reporting inappropiate content
                  </p>
               }
               imgLink={`/images/wigo-placeholders/no_content_graphic_five.png`}
            />
         )}
      </>
   );
};
