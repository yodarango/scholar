// core
import React, { useState } from "react";
import { GetServerSideProps } from "next";

// graphQl
import client from "../apollo-client";

// queries
import { GET_SUNDAY_CONTENT } from "../graphql/wigo/sunday";
import { GET_MONDAY_CONTENT } from "../graphql/wigo/monday";
import { GET_TUESDAY_CONTENT } from "../graphql/wigo/tuesday";
import { GET_WEDNESDAY_CONTENT } from "../graphql/wigo/wednesday";
import { GET_THURSDAY_CONTENT } from "../graphql/wigo/thursday";
import { GET_FRIDAY_CONTENT } from "../graphql/wigo/friday";
import { GET_SATURDAY_CONTENT } from "../graphql/wigo/saturday";

// components
import Head from "next/head";
import Header from "../layouts/header";
import CommentThought from "../layouts/comment-thought";
import RandomDailyVerse from "../fragments/squares/random-daily-verse";
import StoriesCarrousel from "../posts/stories-carrousel";
import SermonsPostCarrousel from "../posts/sermons-post-carrousel";
import NavigationMenu from "../layouts/navigation-menu";
// ----- content of the day
import Sunday from "../fragments/wigo-content/1.sunday";
import Monday from "../fragments/wigo-content/2.monday";
import Tuesday from "../fragments/wigo-content/3.tuesday";
import Wednesday from "../fragments/wigo-content/4.wednesday";
import Thursday from "../fragments/wigo-content/5.thursday";
import Friday from "../fragments/wigo-content/6.friday";
import Saturday from "../fragments/wigo-content/7.saturday";

// styles
import interactStyles from "../styles/pages/Interact.module.css";

// others
const versionId: string = "de4e12af7f28f599-01";

type feedProps = {
   content: any;
};
// =================== GET THE DAY OF THE WEEK ==================== //
const today = new Date().getDay();

const Wigo = ({ content }: feedProps) => {
   // set day of the week
   const [dayOfTheWeekState] = useState<number>(today);

   return (
      <>
         <div className={`main-wrapper ${interactStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WIGO TODAY"} />
            <div className='large-spacer'></div>
            <h2 className='std-text-block--small-title'>Quotes</h2>
            <StoriesCarrousel quotes_in_the_last24={content.quote_stories} />
            <div className={interactStyles.gridWrapper}>
               <div className={`${interactStyles.gridWrapperRight}`}>
                  <h2 className='std-text-block--small-title'>today's verse just for you</h2>
                  <RandomDailyVerse versionId={versionId} />
                  <div className='std-text-block--small-title'></div>
                  {dayOfTheWeekState === 0 && <Sunday sundayContent={content.sunday} />}
                  {dayOfTheWeekState === 1 && <Monday mondayContent={content.monday} />}
                  {dayOfTheWeekState === 2 && <Tuesday tuesdayContent={content.tuesday} />}
                  {dayOfTheWeekState === 3 && <Wednesday wednesdayContent={content.wednesday} />}
                  {dayOfTheWeekState === 4 && <Thursday thursdayContent={content.thursday} />}
                  {dayOfTheWeekState === 5 && <Friday fridayContent={content.friday} />}
                  {dayOfTheWeekState === 6 && <Saturday saturdayContent={content.saturday} />}
               </div>
               <div className={interactStyles.gridWrapperMiddle}>
                  <h2 className='std-text-block--small-title'>Sermon Notes</h2>
                  <SermonsPostCarrousel sermonPost={content.sermon_notes} />
               </div>
               <div className={`${interactStyles.gridWrapperLeft}`}>
                  <h2 className='std-text-block--small-title'>Writtings</h2>
                  <div className={interactStyles.commentsWrapper}>
                     <CommentThought commentaries={content.commentary} thoughts={content.thought} />
                  </div>
               </div>
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const lastId = query.last_id ? query.last_id : "999999999";

   // make query according to the day of the week
   let GET_CONTENT_QUERY: any;
   today === 0
      ? (GET_CONTENT_QUERY = GET_SUNDAY_CONTENT)
      : today === 1
      ? (GET_CONTENT_QUERY = GET_MONDAY_CONTENT)
      : today === 2
      ? (GET_CONTENT_QUERY = GET_TUESDAY_CONTENT)
      : today === 3
      ? (GET_CONTENT_QUERY = GET_WEDNESDAY_CONTENT)
      : today === 4
      ? (GET_CONTENT_QUERY = GET_THURSDAY_CONTENT)
      : today === 5
      ? (GET_CONTENT_QUERY = GET_FRIDAY_CONTENT)
      : today === 6
      ? (GET_CONTENT_QUERY = GET_SATURDAY_CONTENT)
      : null;

   const { data } = await client.query({
      query: GET_CONTENT_QUERY,
      variables: {
         ID: null,
         category_tags: null,
         last_id: lastId
      }
   });

   return {
      props: {
         content: data
      }
   };
};

export default Wigo;
