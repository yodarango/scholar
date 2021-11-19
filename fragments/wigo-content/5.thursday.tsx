/************************************************/
/*** This componenet will onyl appear on ********/
/*** Thursdays. For now the topic is Thought ****/
/*** Thursday and a different song will be ******/
/*** Selected each week *************************/

// core
import React, { useState, useEffect } from "react";
import client from "../../apollo-client";
import { gql } from "@apollo/client";
const Cookie = require("js-cookie");

//styles
import thursdayStyles from "../../styles/fragments/wigo-content/5.Thursday.module.css";

type thursdayProps = {
   thursdayContent: {
      id: string;
      poll: string;
      countdownLimit: string;
      votes: {
         votesUp: number;
         votesDown: number;
      };
   };
};

const Thursday = ({ thursdayContent }: thursdayProps) => {
   // =============== FUNCTION: set the counter ================
   const [originalDateState] = useState<string>(
      `${thursdayContent ? thursdayContent.countdownLimit : null}`
   );
   const [timerState, settimerState] = useState<{
      advertise: string;
      message: string;
      isTimeUp?: boolean;
   }>({
      advertise: "Time Left To Vote",
      message: "",
      isTimeUp: false
   });
   const [updatedQuestionState, setupdatedQuestionState] = useState<boolean>(false);

   const setTimer = () => {
      const currDate = new Date().getTime();
      let orDate = new Date(originalDateState).getTime() - currDate;
      let h = Math.floor((orDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((orDate % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((orDate % (1000 * 60)) / 1000);

      if (orDate < 0) {
         settimerState({
            advertise: "Time Is Up!",
            message: "00:00:00",
            isTimeUp: true
         });
      } else if (orDate > 0) {
         settimerState({
            advertise: "Time Left To Vote",
            message: `${h}:${m}:${s}`,
            isTimeUp: false
         });
      }
   };

   useEffect(() => {
      setupdatedQuestionState(true);
      const interval = setInterval(setTimer, 1000);
      return () => {
         clearInterval(interval);
      };
   }, [updatedQuestionState]);

   // =============== FUNCTION: handle the Vote by user ==============================  //
   const [agreeState, setAgreeState] = useState<number>(
      thursdayContent.votes ? thursdayContent.votes.votesUp : 0
   );
   const [disagreeState, setDisagreeState] = useState<number>(
      thursdayContent.votes ? thursdayContent.votes.votesDown : 0
   );
   // ========== check if they have already voted via cookie
   const [votedThursdayState, setVotedThursdayState] = useState<string>(
      Cookie.get("votedThursday")
   );

   const handleVote = async (
      votesUp: number,
      votesDown: number,
      contentId: string,
      position: string
   ) => {
      // set states
      setAgreeState(agreeState + votesUp);
      setDisagreeState(disagreeState + votesDown);

      //set cookie
      Cookie.set("votedThursday", position, {
         expires: 2,
         path: "/wigo"
      });
      await client.mutate({
         mutation: gql`
            mutation ($votesUp: Int, $votesDown: Int, $contentId: ID) {
               thursdayVotes(
                  content: { votesUp: $votesUp, votesDown: $votesDown, contentId: $contentId }
               ) {
                  votesUp
                  votesDown
                  contentId
               }
            }
         `,
         variables: {
            votesUp: votesUp,
            votesDown: votesDown,
            contentId: contentId
         }
      });
   };

   return (
      <div className={thursdayStyles.squaredCardWrapper}>
         {/* top half: Current position */}
         {thursdayContent && (
            <>
               <div className={thursdayStyles.topPositionWrapper}>
                  <div className={thursdayStyles.votesWrapper}>
                     <div className={`std-text-block--small-title ${thursdayStyles.voteCountUp}`}>
                        {agreeState}
                        <span className={`${thursdayStyles.voteCountUpSpan}`}>Agree</span>
                     </div>
                     {agreeState > disagreeState && (
                        <div className={thursdayStyles.votePositionUp}></div>
                     )}
                     {agreeState < disagreeState && (
                        <div className={thursdayStyles.votePositionDown}></div>
                     )}
                     {agreeState === disagreeState && (
                        <div className={thursdayStyles.votePositionEqual}>=</div>
                     )}
                     <div className={`std-text-block--small-title ${thursdayStyles.voteCountDown}`}>
                        {disagreeState}
                        <span className={`${thursdayStyles.voteCountDownSpan}`}>Disagree</span>
                     </div>
                  </div>
                  <p className={`std-text-block ${thursdayStyles.dailyQuestion}`}>
                     {thursdayContent.poll}
                  </p>
               </div>
               {/* counter */}
               <div className={`${thursdayStyles.counterWrapper} std-text-block`}>
                  <p className={`std-text-block--small-title std-text-block--no-margin`}>
                     {timerState.advertise}
                  </p>
                  <p className={`std-text-block--digit ${thursdayStyles.stdTextBlockDigit}`}>
                     {timerState.message}
                  </p>
               </div>
               {/* footer: Like / Dislike buttons */}
               {timerState.isTimeUp === false && !votedThursdayState && (
                  <div className={thursdayStyles.squaredCardWrapperFooter}>
                     <div className={thursdayStyles.iconAgreeWrapperLeft}>
                        <div
                           className={`std-vector-icon ${thursdayStyles.iconAgree}`}
                           onClick={() => {
                              handleVote(1, 0, `${thursdayContent.id}`, "agree"),
                                 setVotedThursdayState("agree");
                           }}></div>
                     </div>
                     <div className={thursdayStyles.iconAgreeWrapperRight}>
                        <div
                           className={`std-vector-icon ${thursdayStyles.iconDisagree}`}
                           onClick={() => {
                              handleVote(0, 1, `${thursdayContent.id}`, "disagree"),
                                 setVotedThursdayState("disagree");
                           }}></div>
                     </div>
                  </div>
               )}
               {/* if they have voted and the time is not up yet */}
               {timerState.isTimeUp === false && votedThursdayState && (
                  <section className={`${thursdayStyles.alreadyVoted}`}>
                     You {votedThursdayState} with this statement
                  </section>
               )}
               {/* hide voting buttons once the time is up */}
               {timerState.isTimeUp === true && agreeState > disagreeState && (
                  <div className={thursdayStyles.timeIsUpFooterAgree}>Most people have agreed</div>
               )}
               {timerState.isTimeUp === true && agreeState < disagreeState && (
                  <div className={thursdayStyles.timeIsUpFooterDisagree}>
                     Most people have disagreed
                  </div>
               )}
            </>
         )}
      </div>
   );
};

export default Thursday;
