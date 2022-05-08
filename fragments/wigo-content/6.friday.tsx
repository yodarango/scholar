// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// apollo
import { HANDLE_VOTE } from "../../graphql/wigo/friday";
import client from "../../apollo-client";

// comp
import DummyPlaceholder from "./dummy-placeholder";
import NotificationPopup from "../notification-popup";

// styles
import fridayStyles from "../../styles/fragments/wigo-content/6.friday.module.css";

// helpers
import getCookie from "../../helpers/get-cookie";

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

const Friday = ({ fridayContent }: fridayPropsT) => {
   const [notificationStatePopUp, setnotificationStatePopUp] = useState<boolean | JSX.Element>(
      false
   );
   const [displayButtons, setdisplayUpdateButton] = useState<string>("none");
   // =================== HANDLE THE VOTE BY USER ================
   const handleVote = async (
      one: number,
      two: number,
      three: number,
      four: number,
      contentId: string,
      position: string
   ) => {
      setdisplayUpdateButton(position);
      try {
         const { data } = await client.mutate({
            mutation: HANDLE_VOTE,
            variables: {
               firstOption: one,
               secondOption: two,
               thirdOption: three,
               fourthOption: four,
               contentId: contentId
            }
         });

         if (data.fridayVotes) {
            const now = Date.now() + 86400000;
            const cookieExpiration = new Date(now);

            document.cookie = `votedFriday=${position}; expires=${cookieExpiration}; path=/wigo;`;
            setVoteCountedState(position);
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

   // router
   const router = useRouter();
   // =================== Voting State   ================ //
   const [voteCountedState, setVoteCountedState] = useState<string | null>(null);

   useEffect(() => {
      if (router.isReady) {
         setVoteCountedState(getCookie("votedFriday"));
      }
   }, [router.isReady]);

   // ======================   TOTAL VOTES    =========== //
   // ***** get the total votes on content top count percentages
   let totalVotes = 0;
   if (fridayContent?.votes) {
      totalVotes = Math.floor(
         fridayContent?.votes.firstOption +
            fridayContent?.votes.secondOption +
            fridayContent?.votes.thirdOption +
            fridayContent?.votes.fourthOption
      );
   }

   // ****** get the percentages for each graph
   const firstPercentage = fridayContent?.votes
      ? Math.floor((fridayContent?.votes.firstOption / totalVotes) * 100)
      : 0;
   const secondPercentage = fridayContent?.votes
      ? Math.floor((fridayContent?.votes.secondOption / totalVotes) * 100)
      : 0;
   const thirdPercentage = fridayContent?.votes
      ? Math.floor((fridayContent?.votes.thirdOption / totalVotes) * 100)
      : 0;
   const fourthPercentage = fridayContent?.votes
      ? Math.floor((fridayContent?.votes.fourthOption / totalVotes) * 100)
      : 0;

   return (
      <>
         {fridayContent && (
            <div className={fridayStyles.mainWrapper}>
               {notificationStatePopUp}
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
                  {!voteCountedState && displayButtons !== "🍁" && (
                     <span
                        className={`${fridayStyles.voteIconOne} std-button`}
                        onClick={() =>
                           handleVote(1, 0, 0, 0, fridayContent.id, fridayContent.firstOption)
                        }>
                        {fridayContent.firstOption}
                     </span>
                  )}

                  {!voteCountedState && displayButtons !== "❄️" && (
                     <span
                        className={`${fridayStyles.voteIconTwo} std-button`}
                        onClick={() =>
                           handleVote(0, 1, 0, 0, fridayContent.id, fridayContent.secondOption)
                        }>
                        {fridayContent.secondOption}
                     </span>
                  )}

                  {!voteCountedState && displayButtons !== "🌸" && (
                     <span
                        className={`${fridayStyles.voteIconThree} std-button`}
                        onClick={() =>
                           handleVote(0, 0, 1, 0, fridayContent.id, fridayContent.thirdOption)
                        }>
                        {fridayContent.thirdOption}
                     </span>
                  )}

                  {!voteCountedState && displayButtons !== "☀️" && (
                     <span
                        className={`${fridayStyles.voteIconFour} std-button`}
                        onClick={() =>
                           handleVote(0, 0, 0, 1, fridayContent.id, fridayContent.fourthOption)
                        }>
                        {fridayContent.fourthOption}
                     </span>
                  )}

                  {voteCountedState && (
                     <p className={fridayStyles.youHaveVoted}>You Voted For {voteCountedState}</p>
                  )}
               </div>
            </div>
         )}

         {!fridayContent && (
            <DummyPlaceholder
               button='none'
               context={
                  <p>
                     Become a trusted user and show the community your posts can be trusted. On your
                     settings go to <b>apply for user verification</b> and fill out the form!
                  </p>
               }
               imgLink={`/images/wigo-placeholders/no_content_graphic_four.png`}
            />
         )}
      </>
   );
};

export default Friday;
