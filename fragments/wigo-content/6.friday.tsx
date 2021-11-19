// core
import React, { useState } from "react";
const Cookie = require("js-cookie");

// apollo
import { gql } from "@apollo/client";
import client from "../../apollo-client";

import fridayStyles from "../../styles/fragments/wigo-content/6.friday.module.css";

type fridayPropsT = {
   fridayContent: {
      id: string;
      question: string;
      firstOption: string;
      secondOption: string;
      thirdOption: string;
      fourthOption: string;
      votes: {
         id: string;
         firstOption: number;
         secondOption: number;
         thirdOption: number;
         fourthOption: number;
      };
   };
};
// =================== HANDLE THE VOTE BY USER ================ //
const handleVote = async (
   one: number,
   two: number,
   three: number,
   four: number,
   contentId: string
) => {
   const { data } = await client.mutate({
      mutation: gql`
         mutation (
            $firstOption: Int
            $secondOption: Int
            $thirdOption: Int
            $fourthOption: Int
            $contentId: ID
         ) {
            fridayVotes(
               content: {
                  firstOption: $firstOption
                  secondOption: $secondOption
                  thirdOption: $thirdOption
                  fourthOption: $fourthOption
                  contentId: $contentId
               }
            ) {
               firstOption
               secondOption
               thirdOption
               fourthOption
            }
         }
      `,
      variables: {
         firstOption: one,
         secondOption: two,
         thirdOption: three,
         fourthOption: four,
         contentId: contentId
      }
   });
};
const Friday = ({ fridayContent }: fridayPropsT) => {
   // ======================   TOTAL VOTES    =========== //
   // ***** get the total votes on content top count percentages
   let totalVotes = 0;
   if (fridayContent.votes) {
      totalVotes = Math.floor(
         fridayContent.votes.firstOption +
            fridayContent.votes.secondOption +
            fridayContent.votes.thirdOption +
            fridayContent.votes.fourthOption
      );
   }

   // ****** get the percentages for each graph
   const firstPercentage = fridayContent.votes
      ? Math.floor((fridayContent.votes.firstOption / totalVotes) * 100)
      : 0;
   const secondPercentage = fridayContent.votes
      ? Math.floor((fridayContent.votes.secondOption / totalVotes) * 100)
      : 0;
   const thirdPercentage = fridayContent.votes
      ? Math.floor((fridayContent.votes.thirdOption / totalVotes) * 100)
      : 0;
   const fourthPercentage = fridayContent.votes
      ? Math.floor((fridayContent.votes.fourthOption / totalVotes) * 100)
      : 0;
   // =================== SET COOKIES   ================ //
   const [voteCountedState, setVoteCountedState] = useState<string>(Cookie.get("votedFriday"));

   return (
      <div className={fridayStyles.mainWrapper}>
         <p>{fridayContent.question}</p>
         <section className={fridayStyles.graphGridWrapper}>
            <div className={`${fridayStyles.gridOptionOne}`}>
               <span>
                  {fridayContent.firstOption}
                  {firstPercentage}%
               </span>
               <div
                  style={{
                     height: `${firstPercentage}%`
                  }}></div>
            </div>
            <div className={`${fridayStyles.gridOptionTwo}`}>
               <span>
                  {fridayContent.secondOption}
                  {secondPercentage}%
               </span>
               <div
                  style={{
                     height: `${secondPercentage}%`
                  }}></div>
            </div>
            <div className={`${fridayStyles.gridOptionThree}`}>
               <span>
                  {fridayContent.thirdOption}
                  {thirdPercentage}%
               </span>
               <div
                  style={{
                     height: `${thirdPercentage}%`
                  }}></div>
            </div>
            <div className={`${fridayStyles.gridOptionFour}`}>
               <span>
                  {fridayContent.fourthOption}
                  {fourthPercentage}%
               </span>
               <div
                  style={{
                     height: `${fourthPercentage}%`
                  }}></div>
            </div>
         </section>
         <div className={fridayStyles.voteIconWrapper}>
            {!voteCountedState && (
               <span
                  className={`${fridayStyles.voteIconOne} std-button`}
                  onClick={() => {
                     handleVote(1, 0, 0, 0, fridayContent.id),
                        setVoteCountedState(
                           Cookie.set("votedFriday", `${fridayContent.firstOption}`, {
                              expires: 2,
                              path: "/wigo"
                           })
                        );
                  }}>
                  {fridayContent.firstOption}
               </span>
            )}

            {!voteCountedState && (
               <span
                  className={`${fridayStyles.voteIconTwo} std-button`}
                  onClick={() => {
                     handleVote(0, 1, 0, 0, fridayContent.id),
                        setVoteCountedState(
                           Cookie.set("votedFriday", `${fridayContent.secondOption}`, {
                              expires: 2,
                              path: "/wigo"
                           })
                        );
                  }}>
                  {fridayContent.secondOption}
               </span>
            )}

            {!voteCountedState && (
               <span
                  className={`${fridayStyles.voteIconThree} std-button`}
                  onClick={() => {
                     handleVote(0, 0, 1, 0, fridayContent.id),
                        setVoteCountedState(
                           Cookie.set("votedFriday", `${fridayContent.thirdOption}`, {
                              expires: 2,
                              path: "/wigo"
                           })
                        );
                  }}>
                  {fridayContent.thirdOption}
               </span>
            )}

            {!voteCountedState && (
               <span
                  className={`${fridayStyles.voteIconFour} std-button`}
                  onClick={() => {
                     handleVote(0, 0, 0, 1, fridayContent.id),
                        setVoteCountedState(
                           Cookie.set("votedFriday", `${fridayContent.fourthOption}`, {
                              expires: 2,
                              path: "/wigo"
                           })
                        );
                  }}>
                  {fridayContent.fourthOption}
               </span>
            )}

            {voteCountedState && (
               <p className={fridayStyles.youHaveVoted}>
                  You Voted For {fridayContent.fourthOption}
               </p>
            )}
         </div>
      </div>
   );
};

export default Friday;
