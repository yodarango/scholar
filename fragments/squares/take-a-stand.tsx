// core
import React from "react";

//styles
import takeAStandStyles from "../../styles/fragments/squares/TakeAStand.module.css";

const TakeAStand = () => {
   return (
      <div className={takeAStandStyles.squaredCardWrapper}>
         {/* top half: Current position */}
         <div className={takeAStandStyles.topPositionWrapper}>
            <div className={takeAStandStyles.votesWrapper}>
               <div className={`std-text-block--small-title ${takeAStandStyles.voteCountUp}`}>
                  10 <span className={`${takeAStandStyles.voteCountUpSpan}`}>Disagree</span>
               </div>
               <div className={takeAStandStyles.votePositionUp}></div>
               <div className={`std-text-block--small-title ${takeAStandStyles.voteCountDown}`}>
                  14
                  <span className={`${takeAStandStyles.voteCountDownSpan}`}>Agree</span>
               </div>
            </div>
            {/* {<div className={takeAStandStyles.votePositionDown}></div>} */}
            <p className={`std-text-block ${takeAStandStyles.dailyQuestion}`}>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
               Ipsum has been the industry's standard dummy text ever since the 1500s, when an
               unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
         </div>

         {/* footer: Like / Dislike buttons */}
         <div className={takeAStandStyles.squaredCardWrapperFooter}>
            <div className={takeAStandStyles.iconAgreeWrapperLeft}>
               <div className={`std-vector-icon ${takeAStandStyles.iconAgree}`}></div>
            </div>
            <div className={takeAStandStyles.iconAgreeWrapperRight}>
               <div className={`std-vector-icon ${takeAStandStyles.iconDisagree}`}></div>
            </div>
         </div>
      </div>
   );
};

export default TakeAStand;
