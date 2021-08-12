// core
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

//styles
import takeAStandStyles from "../../styles/fragments/squares/TakeAStand.module.css";

const TakeAStand = () => {
   // =============== FUNCTION: counter
   const [originalDateState, setoriginalDateState] = useState<string>(`08/30/2021 00:00:00`);
   const [timerState, settimerState] = useState<string>("");
   const [updatedQuestionState, setupdatedQuestionState] = useState<boolean>(false);

   const setTimer = () => {
      // ============ I shall implement this on the back end
      // const getNewDate = () => {
      //    let month = new Date().getMonth() + 1;
      //    let day = new Date().getDate();
      //    let year = new Date().getFullYear();
      //    let minute = new Date().getMinutes() + 1;

      //    setoriginalDateState(`${month}/${day}/${year} 10:${minute}:00`);
      //    console.log(originalDateState);
      // };
      const currDate = new Date().getTime();
      let orDate = new Date(originalDateState).getTime() - currDate;
      let h = Math.floor((orDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((orDate % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((orDate % (1000 * 60)) / 1000);

      if (orDate < 0) {
         //setoriginalDateState(new Date().getTime() + 60000);
         settimerState("someone won!!!");
         console.log(orDate);
      } else if (orDate > 0) {
         settimerState(`${h}:${m}:${s}`);
      }
   };

   useEffect(() => {
      setupdatedQuestionState(true);
      const interval = setInterval(setTimer, 1000);
      return () => {
         clearInterval(interval);
      };
   }, [updatedQuestionState]);

   // =============== FUNCTION: counter 2
   // const calculateTimeLeft = () => {
   //    let year = new Date().getFullYear();
   //    let month = new Date().getMonth();
   //    let day = new Date().getDate();
   //    let minute = new Date().getMinutes();
   //    let difference = +new Date(`${month}/${day}/${year} 22:${minute}:00`) - +new Date();
   //    let timeLeft = {};

   //    if (difference > 0) {
   //       timeLeft = {
   //          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
   //          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
   //          minutes: Math.floor((difference / 1000 / 60) % 60),
   //          seconds: Math.floor((difference / 1000) % 60)
   //       };
   //    }
   //    return timeLeft;
   // };

   // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
   // const [year] = useState(new Date().getFullYear());

   // useEffect(() => {
   //    setTimeout(() => {
   //       setTimeLeft(calculateTimeLeft());
   //    }, 1000);
   // });

   // const timerComponents = [];

   // Object.keys(timeLeft).forEach((interval) => {
   //    if (!timeLeft[interval]) {
   //       return;
   //    }

   //    timerComponents.push(
   //       <span>
   //          {timeLeft[interval]} {interval}{" "}
   //       </span>
   //    );
   // });

   // =============== FUNCTION: Agree button
   const [agreeState, setAgreeState] = useState<number>(0);
   const handleAgreeButton = () => {
      setAgreeState(agreeState + 1);
   };

   // =============== FUNCTION: Disagree button
   const [disagreeState, setDisagreeState] = useState<number>(0);
   const handleDisagreeButton = () => {
      setDisagreeState(disagreeState + 1);
   };

   return (
      <div className={takeAStandStyles.squaredCardWrapper}>
         {/* top half: Current position */}
         <div className={takeAStandStyles.topPositionWrapper}>
            <div className={takeAStandStyles.votesWrapper}>
               <div className={`std-text-block--small-title ${takeAStandStyles.voteCountUp}`}>
                  {agreeState}
                  <span className={`${takeAStandStyles.voteCountUpSpan}`}>Agree</span>
               </div>
               {agreeState > disagreeState && (
                  <div className={takeAStandStyles.votePositionUp}></div>
               )}
               {agreeState < disagreeState && (
                  <div className={takeAStandStyles.votePositionDown}></div>
               )}
               {agreeState === disagreeState && (
                  <div className={takeAStandStyles.votePositionEqual}>=</div>
               )}
               <div className={`std-text-block--small-title ${takeAStandStyles.voteCountDown}`}>
                  {disagreeState}
                  <span className={`${takeAStandStyles.voteCountDownSpan}`}>Disagree</span>
               </div>
            </div>
            <p className={`std-text-block ${takeAStandStyles.dailyQuestion}`}>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
               Ipsum has been the industry's standard dummy text ever since the 1500s, when an
               unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
         </div>

         {/* counter */}
         <div className={`${takeAStandStyles.counterWrapper} std-text-block`}>
            <p className={`std-text-block--small-title std-text-block--no-margin`}>Time left</p>
            <p className={`std-text-block--digit ${takeAStandStyles.stdTextBlockDigit}`}>
               {/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */}
               {timerState}
            </p>
         </div>

         {/* footer: Like / Dislike buttons */}
         <div className={takeAStandStyles.squaredCardWrapperFooter}>
            <div className={takeAStandStyles.iconAgreeWrapperLeft}>
               <div
                  className={`std-vector-icon ${takeAStandStyles.iconAgree}`}
                  onClick={handleAgreeButton}></div>
            </div>
            <div className={takeAStandStyles.iconAgreeWrapperRight}>
               <div
                  className={`std-vector-icon ${takeAStandStyles.iconDisagree}`}
                  onClick={handleDisagreeButton}></div>
            </div>
         </div>
      </div>
   );
};

export default dynamic(() => Promise.resolve(TakeAStand));
//export default TakeAStand;
