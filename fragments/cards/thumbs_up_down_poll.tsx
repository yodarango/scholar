/**********************************************************************************
 allows users to vote on a specific topic from and the percentages are calclated 
 for each side based on the total votes received.
 /*********************************************************************************/

// graphQL
import client from "../../apollo-client";
import { HANDLE_VOTE } from "../../graphql/wigo/thursday";

import { useEffect, useState } from "react";
// comps
import DummyPlaceholder from "../wigo-content/dummy-placeholder";

//styles
import styles from "./thumbs_up_down_poll.module.css";

// helpers
import getCookie from "../../helpers/get-cookie";
import { contDown } from "../../helpers/Time/countdown";

// types
import { TThumbsUpDownPoll } from "../../types/wigo_content";
import { clearInterval } from "timers";

type TThumbsUpDownPollProps = {
   content: TThumbsUpDownPoll;
};

const ThumbsUpDownPoll = ({ content }: TThumbsUpDownPollProps) => {
   //------------------- states ---------------------------
   const [timerState, settimerState] = useState<string>("");
   // ------------------------ initialize the countdown interval ---------
   const interval = setInterval(() => {
      if (timerState !== "00:00:00") {
         settimerState(contDown(content.countdownLimit));
      } else {
         clearInterval(interval);
      }
   }, 1000);

   // =============== FUNCTION: handle the Vote by user ==============================  //
   const [agreeState, setAgreeState] = useState<number>(
      thursdayContent?.votes ? thursdayContent?.votes.votesUp : 0
   );
   const [disagreeState, setDisagreeState] = useState<number>(
      thursdayContent?.votes ? thursdayContent?.votes.votesDown : 0
   );
   const [displayButtons, setdisplayUpdateButton] = useState<string>("none");
   // ========== check if they have already voted via cookie
   const [votedThursdayState, setVotedThursdayState] = useState<string>(getCookie("votedThursday"));

   const handleVote = async (
      votesUp: number,
      votesDown: number,
      contentId: string,
      position: string
   ) => {
      setdisplayUpdateButton(position);
      try {
         const { data } = await client.mutate({
            mutation: HANDLE_VOTE,
            variables: {
               votesUp: votesUp,
               votesDown: votesDown,
               contentId: contentId
            }
         });

         const now = Date.now() + 86400000;
         const cookieExpiration = new Date(now);

         if (data.thursdayVotes) {
            // set states
            setAgreeState(agreeState + votesUp);
            setDisagreeState(disagreeState + votesDown);
            setVotedThursdayState(position);

            //set cookie
            document.cookie = `votedThursday=${position}; expires=${cookieExpiration};
               path: /wigo;`;
         } else {
            setdisplayUpdateButton("none");
            setnotificationStatePopUp(
               <NotificationPopup
                  closeModal={() => setnotificationStatePopUp(false)}
                  title={`Something went wrong!`}
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setdisplayUpdateButton("none");
         setnotificationStatePopUp(
            <NotificationPopup
               closeModal={() => setnotificationStatePopUp(false)}
               title={`Something went wrong!`}
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   return (
      <>
         {thursdayContent && (
            <div className={styles.squaredCardWrapper}>
               {/* top half: Current position */}
               <>
                  {notificationStatePopUp}
                  <div className={styles.topPositionWrapper}>
                     <div className={styles.votesWrapper}>
                        <div className={`std-text-block--small-title ${styles.voteCountUp}`}>
                           {agreeState}
                           <span className={`${styles.voteCountUpSpan}`}>Agree</span>
                        </div>
                        {agreeState > disagreeState && (
                           <div className={styles.votePositionUp}></div>
                        )}
                        {agreeState < disagreeState && (
                           <div className={styles.votePositionDown}></div>
                        )}
                        {agreeState === disagreeState && (
                           <div className={styles.votePositionEqual}>=</div>
                        )}
                        <div className={`std-text-block--small-title ${styles.voteCountDown}`}>
                           {disagreeState}
                           <span className={`${styles.voteCountDownSpan}`}>Disagree</span>
                        </div>
                     </div>
                     <p className={`std-text-block ${styles.dailyQuestion}`}>
                        {thursdayContent.poll}
                     </p>
                  </div>
                  {/* counter */}
                  <div className={`${styles.counterWrapper} std-text-block`}>
                     <p className={`std-text-block--small-title std-text-block--no-margin`}>
                        {timerState.advertise}
                     </p>
                     <p className={`std-text-block--digit ${styles.stdTextBlockDigit}`}>
                        {timerState.message}
                     </p>
                  </div>
                  {/* footer: Like / Dislike buttons */}
                  {timerState.isTimeUp === false && !votedThursdayState && (
                     <div className={styles.squaredCardWrapperFooter}>
                        <div className={styles.iconAgreeWrapperLeft}>
                           {displayButtons !== "agree" && (
                              <div
                                 className={`std-vector-icon ${styles.iconAgree}`}
                                 onClick={() => {
                                    handleVote(1, 0, `${thursdayContent.id}`, "agree");
                                 }}></div>
                           )}
                        </div>
                        <div className={styles.iconAgreeWrapperRight}>
                           {displayButtons !== "disagree" && (
                              <div
                                 className={`std-vector-icon ${styles.iconDisagree}`}
                                 onClick={() => {
                                    handleVote(0, 1, `${thursdayContent.id}`, "disagree");
                                 }}></div>
                           )}
                        </div>
                     </div>
                  )}
                  {/* if they have voted and the time is not up yet */}
                  {timerState.isTimeUp === false && votedThursdayState && (
                     <section className={`${styles.alreadyVoted}`}>
                        You {votedThursdayState} with this statement
                     </section>
                  )}
                  {/* hide voting buttons once the time is up */}
                  {timerState.isTimeUp === true && agreeState > disagreeState && (
                     <div className={styles.timeIsUpFooterAgree}>Most people have agreed</div>
                  )}
                  {timerState.isTimeUp === true && agreeState < disagreeState && (
                     <div className={styles.timeIsUpFooterDisagree}>Most people have disagreed</div>
                  )}
               </>
            </div>
         )}

         {!thursdayContent && (
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

export default Thursday;
