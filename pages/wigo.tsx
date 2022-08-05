// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../layouts/head-content";
import Image from "next/image";
//import { GetServerSideProps } from "next";

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
import Header from "../layouts/header";
import CommentThought from "../layouts/comment-thought";
import RandomDailyVerse from "../fragments/squares/random-daily-verse";
import StoriesCarrousel from "../posts/stories-carrousel";
import SermonsPostCarrousel from "../posts/sermons-post-carrousel";
import NavigationMenu from "../layouts/navigation_main";
import CardsLazyLoading from "../layouts/cards-lazy-loading";
// ----- content of the day
import Sunday from "../fragments/wigo-content/1.sunday";
import Monday from "../fragments/wigo-content/2.monday";
import Tuesday from "../fragments/wigo-content/3.tuesday";
import Wednesday from "../fragments/wigo-content/4.wednesday";
import Thursday from "../fragments/chunks/thumbs_up_down_poll";
import Friday from "../fragments/cards/multiple_choice_poll";
import Saturday from "../fragments/wigo-content/7.saturday";
import ResourceNotFoundError from "../fragments/chunks/error_resource_not_found";

// styles
import interactStyles from "../styles/pages/Interact.module.css";
import cardsLayLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

// others
const versionId: string = "de4e12af7f28f599-01";

type feedProps = {
   sunday: any;
   monday: any;
   tuesday: any;
   wednesday: any;
   thursday: any;
   friday: any;
   saturday: any;
   thought: any;
   commentary: any;
   quote_stories: any;
   sermon_notes: any;
};
// =================== GET THE DAY OF THE WEEK ==================== //
const today = new Date().getDay();

const Wigo = () => {
   // globals
   const router = useRouter();

   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   // set day of the week
   const [dayOfTheWeekState] = useState<number>(today);

   // ================ FUNCTION: fetch the data
   //                   Moving away from serverside props to be able to see the page before the data loads
   const [content, setContent] = useState<feedProps | null>();

   const getInitialData = async () => {
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

      try {
         const { data } = await client.query({
            query: GET_CONTENT_QUERY,
            variables: {
               last_id: "9999999999"
            }
         });

         setContent(data);
         setLoadingState("done");
      } catch (error) {
         setContent(null);
         setLoadingState("error");
         console.log(error);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getInitialData();
      }
   }, [router.isReady]);

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         <Header currPage={"WIGO TODAY"} />
         {content && loadingState === "done" && (
            <div className={`main-wrapper ${interactStyles.mainWrapper}`}>
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
                     <h2 className='std-text-block--small-title'>Writings</h2>
                     <div className={interactStyles.commentsWrapper}>
                        <CommentThought
                           commentaries={content.commentary}
                           thoughts={content.thought}
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={5} compClass={cardsLayLoadingStyles.wigo} />
         )}

         {loadingState == "error" && <ResourceNotFoundError />}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//    const lastId = query.last_id ? query.last_id : "999999999";

//    // make query according to the day of the week
//    let GET_CONTENT_QUERY: any;
//    today === 0
//       ? (GET_CONTENT_QUERY = GET_SUNDAY_CONTENT)
//       : today === 1
//       ? (GET_CONTENT_QUERY = GET_MONDAY_CONTENT)
//       : today === 2
//       ? (GET_CONTENT_QUERY = GET_TUESDAY_CONTENT)
//       : today === 3
//       ? (GET_CONTENT_QUERY = GET_WEDNESDAY_CONTENT)
//       : today === 4
//       ? (GET_CONTENT_QUERY = GET_THURSDAY_CONTENT)
//       : today === 5
//       ? (GET_CONTENT_QUERY = GET_FRIDAY_CONTENT)
//       : today === 6
//       ? (GET_CONTENT_QUERY = GET_SATURDAY_CONTENT)
//       : null;

//    const { data } = await client.query({
//       query: GET_CONTENT_QUERY,
//       variables: {
//          ID: null,
//          category_tags: null,
//          last_id: lastId
//       }
//    });

//    return {
//       props: {
//          content: data
//       }
//    };
// };

export default Wigo;
