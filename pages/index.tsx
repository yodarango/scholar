// core
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeadContent from "../layouts/head-content";
import Image from "next/image";
import { Icon } from "../fragments/chunks/icons";

// graphql
import client from "../apollo-client";
import { GET_COMMENTARIES } from "../graphql/home/commentaries";

// components
import CommentFilter from "../fragments/buttons/comment-filter";
import Header from "../layouts/header";
import PostsWrapper from "../layouts/posts-wrapper";
import DailyVerse from "../fragments/cards/daily_verse_card";
import NavigationMenu from "../layouts/navigation_main";
import ResourceNotFoundError from "../fragments/chunks/error_resource_not_found";

// styles
import homeStyles from "../styles/pages/Home.module.css";
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

// helpers
import { getInitialData } from "../helpers/APIs/get_bible_verse";

// Types
import { Tcommentary } from "../fragments/cards/posts/commentary";
import CardsLazyLoading from "../layouts/cards-lazy-loading";

// other (might pull form the DB using user preferences)
const versionId: string = "de4e12af7f28f599-01";

export type TverseContent = {
   id: string;
   orgId: string;
   bookId: string;
   chapterId: string;
   bibleId: string;
   reference: string;
   content: string;
   verseCount: number;
   copyright: string;
   next: { id: string; number: string };
   previous: { id: string; number: string };
};

// type commentaries = {
//       verseContent: TverseContent;
//       commentaries: Tcommentary[];
// };

export default function Home() {
   // globals
   const router = useRouter();
   // ================ FUNCTION: fetch the data
   //                   Moving away from serverside props to be able to see the page before the data loads
   /*                  ****************  watch in prod and see what is he best appraoch *****************/

   // error for verse of the day
   const [dailyVerseError, setDailyVerseError] = useState(false);

   // content states
   const [commentariesState, setCommentariesState] = useState<Tcommentary[]>([]);
   const [verseState, setVerseState] = useState<TverseContent>();

   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   const getCommentaries = async () => {
      try {
         const query = router.query;
         const last_id = query.last_id ? query.last_id : "9999999999";
         const verse_id = query.verse ? query.verse : "1PE.1.8";
         const { data } = await client.query({
            query: GET_COMMENTARIES,
            variables: {
               VERSE_ID: verse_id,
               last_id,
               ID: null,
               USER_ID: null,
               category_tags: null,
               authority_level: null
            }
         });
         setCommentariesState(data.v_by_v_commentaries);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
      }
   };

   const getAllDate = async () => {
      getCommentaries();
      const verseDate = await getInitialData(router.query.verse);
      verseDate != undefined
         ? (setVerseState(verseDate), setDailyVerseError(false))
         : (setDailyVerseError(true), setVerseState(undefined));
   };
   // fetch the content on initial component render
   useEffect(() => {
      setVerseState(undefined);
      if (router.isReady) {
         getAllDate();
      }
   }, [router.isReady, router.query]);

   return (
      <>
         <div className='main-wrapper'>
            <Head>
               <HeadContent />
            </Head>
            <Header currPage={"HOME"} />
            <div className={homeStyles.majorGridWrapper}>
               <div className={homeStyles.majorGridWrapperLeft}>
                  <DailyVerse
                     verseContent={verseState}
                     versionId={versionId}
                     err={dailyVerseError}
                  />
               </div>
               <div className={homeStyles.majorGridWrapperRight}>
                  <h3
                     className={`std-text-block--small-title ${homeStyles.dailyVerseHeaderTitleComments}`}>
                     Comments
                  </h3>
                  {/* <CommentFilter /> */}
                  {commentariesState && loadingState == "done" && (
                     <PostsWrapper commentaries={commentariesState} />
                  )}
                  {loadingState == "loading" && (
                     <CardsLazyLoading
                        amount={6}
                        compClass={cardsLazyLoadingStyles.homeCommentstaries}
                     />
                  )}
                  {loadingState == "error" && <ResourceNotFoundError />}
               </div>
            </div>
         </div>
         <div className={"large-spacer"}></div>
         <NavigationMenu />
      </>
   );
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//    !query.verse ? (query.verse = "JHN.3.16") : null;
//    !query.last_id ? (query.last_id = "999999999") : null;
//    const requ = await fetch(
//       `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${query.verse}?content-type=text&include-verse-numbers=false`,
//       {
//          method: "GET",
//          headers: {
//             "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
//          }
//       }
//    );
//    const json = await requ.json();
//    const content = json.data;

//    //============ fetch the content

//    const { data } = await client.query({
//       query: GET_COMMENTARIES,
//       variables: {
//          VERSE_ID: query.verse,
//          last_id: query.last_id,
//          ID: null,
//          USER_ID: null,
//          category_tags: null,
//          authority_level: null
//       }
//    });

//    return {
//       props: {
//          content: {
//             verseContent: content,
//             commentaries: data.v_by_v_commentaries
//          }

//       }
//    };
// };
