// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// comps
import CardTimer from "../chunks/card_timer";
import DummyPlaceholder from "../wigo-content/dummy-placeholder";
import { MultipleChoicePollOptions } from "../chunks/multiple_choice_poll_options";
import { MultipleChoicePoll } from "../chunks/multiple_choice_poll";
import { Parragraph } from "../Typography/parragraph";
import { NotificationSticker } from "./notification_sticker";

// styles
import styles from "./multiple_choice_poll.module.css";

// helpers
import { getCookie } from "../../helpers/get-cookie";

// types
import { TMultipleChicePoll } from "../../types/wigo_content";

type fridayPropsT = {
   content: TMultipleChicePoll;
   countTo: string;
   cta: {
      handleVote: (selection: string) => void;
   };
};

export const MultipleChoicePollCard = ({ content, countTo, cta }: fridayPropsT) => {
   // check if user has already voted by checking cookie
   const hasVoted = getCookie("multChoice");

   return (
      <>
         {content && (
            <div className={styles.mainWrapper}>
               <div className={styles.timer}>
                  <CardTimer time={countTo} />
               </div>
               <div className={styles.question}>
                  <Parragraph text={content.question} size='main' />
               </div>
               {!hasVoted && (
                  <div className={styles.options}>
                     <MultipleChoicePollOptions
                        cta={{ handleVote: (selection) => cta.handleVote(selection) }}
                        options={content.options}
                     />
                  </div>
               )}
               {hasVoted && <NotificationSticker type='1' text={`you voted for ${hasVoted}`} />}
               <div className={styles.graph}>
                  <MultipleChoicePoll votes={content.votes} />
               </div>
            </div>
         )}
      </>
   );
};
