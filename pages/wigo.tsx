// core
import React from "react";
import { GetServerSideProps } from "next";

// graphQl
import { gql } from "@apollo/client";
import client from "../apollo-client";

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

// styles
import interactStyles from "../styles/pages/Interact.module.css";

// helpers
import { getNewVerseId } from "../helpers/random-daily-verses";
import { TverseContent } from ".";
import { sermonProps } from "../fragments/library-items/sermon";

// others
const versionId: string = "de4e12af7f28f599-01";

type feedProps = {
   verseContent: TverseContent;
   content: any;
   // sermons: sermonProps[];
   // sundayContent: { videoLink: string; sermonTitle: string; preacher: string };
   // mondayContent: {
   //    imageArray: string[];
   //    video: { videoLink: string; text: string };
   //    rawHtml: string;
   // };
};

const Feed = ({ verseContent, content /*sermons, sundayContent, mondayContent*/ }: feedProps) => {
   return (
      <>
         <div className={`main-wrapper ${interactStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WIGO TODAY"} />
            <div className='large-spacer'></div>
            <h2 className='std-text-block--small-title'>Quotes</h2>
            <StoriesCarrousel />
            <div className={interactStyles.gridWrapper}>
               <div className={`${interactStyles.gridWrapperRight}`}>
                  <h2 className='std-text-block--small-title'>Today's Verse</h2>
                  <RandomDailyVerse versionId={versionId} verseContent={verseContent} />
                  <div className='std-text-block--small-title'></div>
                  {/*<Sunday sundayContent={content.sunday} />*/}
                  {/*<Monday mondayContent={content.monday} />*/}
                  {<Tuesday tuesdayContent={content.tuesday} />}
                  {/*<Wednesday wednesdayContent={content.wednesday} />*/}
                  {/*<Thursday thursdayContent={content.thursday} />*/}
               </div>
               <div className={interactStyles.gridWrapperMiddle}>
                  <h2 className='std-text-block--small-title'>Sermon Notes</h2>
                  <SermonsPostCarrousel sermon={content.sermonNotes} reportOption={true} />
               </div>
               <div className={`${interactStyles.gridWrapperLeft}`}>
                  <h2 className='std-text-block--small-title'>Writtings</h2>
                  <div className={interactStyles.commentsWrapper}>
                     <CommentThought />
                  </div>
               </div>
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, category, userId, title, id } = context.query;
   const verseReq = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${getNewVerseId()}?content-type=text&include-verse-numbers=false`,
      {
         method: "GET",
         headers: {
            "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
         }
      }
   );

   const jsonReq = await verseReq.json();
   const verseContent = jsonReq.data;

   const { data } = await client.query({
      query: gql`
         query (
            $skip: String
            $category: String
            $alphOrd: String
            $dateOrd: String
            $userId: ID
            $id: ID
            $title: String
         ) {
            sermonNotes(
               skip: $skip
               category: $category
               alphOrd: $alphOrd
               dateOrd: $dateOrd
               userId: $userId
               id: $id
               title: $title
            ) {
               id
               title
               userId
               categoryTags
               tagColors
               currentRanking
               fileUrl
               user {
                  fullName
                  avatar
               }
            }
            tuesday {
               text
               title
               imageUrl
            }
         }
      `,
      variables: { skip, category, alphOrd, dateOrd, userId, id, title }
   });
   console.log(data);
   return {
      props: {
         verseContent,
         content: data
      }
   };
};

export default Feed;
