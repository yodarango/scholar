/************************************************/
/*** This componenet will onyl appear on ********/
/*** Thursdays. For now the topic is Thought ****/
/*** Thursday and a different song will be ******/
/*** Selected each week *************************/

// core
import { useState, useEffect } from "react";

// graphQL
import client from "../../apollo-client";
import { HANDLE_VOTE } from "../../graphql/wigo/thursday";

// comps
import DummyPlaceholder from "./dummy-placeholder";

//styles
import thursdayStyles from "../../styles/fragments/wigo-content/5.Thursday.module.css";
import NotificationPopup from "../notification-popup";

// helpers
import getCookie from "../../helpers/get-cookie";

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
   const [notificationStatePopUp, setnotificationStatePopUp] = useState<boolean | JSX.Element>(
      false
   );

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
            <div className={thursdayStyles.squaredCardWrapper}>
               {/* top half: Current position */}
               <>
                  {notificationStatePopUp}
                  <div className={thursdayStyles.topPositionWrapper}>
                     <div className={thursdayStyles.votesWrapper}>
                        <div
                           className={`std-text-block--small-title ${thursdayStyles.voteCountUp}`}>
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
                        <div
                           className={`std-text-block--small-title ${thursdayStyles.voteCountDown}`}>
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
                           {displayButtons !== "agree" && (
                              <div
                                 className={`std-vector-icon ${thursdayStyles.iconAgree}`}
                                 onClick={() => {
                                    handleVote(1, 0, `${thursdayContent.id}`, "agree");
                                 }}></div>
                           )}
                        </div>
                        <div className={thursdayStyles.iconAgreeWrapperRight}>
                           {displayButtons !== "disagree" && (
                              <div
                                 className={`std-vector-icon ${thursdayStyles.iconDisagree}`}
                                 onClick={() => {
                                    handleVote(0, 1, `${thursdayContent.id}`, "disagree");
                                 }}></div>
                           )}
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
                     <div className={thursdayStyles.timeIsUpFooterAgree}>
                        Most people have agreed
                     </div>
                  )}
                  {timerState.isTimeUp === true && agreeState < disagreeState && (
                     <div className={thursdayStyles.timeIsUpFooterDisagree}>
                        Most people have disagreed
                     </div>
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
