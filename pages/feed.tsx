// core
import React from "react";
import { GetStaticProps } from "next";

// components
import Head from "next/head";
import TakeAStand from "../fragments/squares/take-a-stand";
import Header from "../layouts/header";
import Comments from "../posts/comment";
import RandomDailyVerse from "../fragments/squares/random-daily-verse";
import StoriesCarrousel from "../posts/stories-carrousel";

// styles
import interactStyles from "../styles/pages/Interact.module.css";

// helpers
import { getNewVerseId } from "../helpers/random-daily-verses";
import { TverseContent } from "./index";

// others
const versionId: string = "de4e12af7f28f599-01";

type feedProps = {
   verseContent: TverseContent;
};

const Feed = ({ verseContent }: feedProps) => {
   return (
      <div className='main-wrapper'>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"INTERACT"} />
         <div className='large-spacer'></div>
         <StoriesCarrousel />
         <div className={interactStyles.gridWrapper}>
            <div className={`${interactStyles.gridWrapperRight}`}>
               <h2 className='std-text-block--small-title'>Today's Verse</h2>
               <RandomDailyVerse versionId={versionId} verseContent={verseContent} />
               <h2 className='std-text-block--small-title'>Take A Stand</h2>
               <TakeAStand />
            </div>
            <div className={`${interactStyles.gridWrapperLeft}`}>
               <h2 className='std-text-block--small-title'>WIGO In The Last 24</h2>
               <div className={interactStyles.commentsWrapper}>
                  <Comments />
               </div>
            </div>
         </div>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const requ = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${getNewVerseId()}?content-type=text&include-verse-numbers=false`,
      {
         method: "GET",
         headers: {
            "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
         }
      }
   );

   const json = await requ.json();
   const content = json.data;
   return {
      props: {
         verseContent: content
      },
      revalidate: 60 * 60 * 24 // everyday
   };
};

export default Feed;
