import React from "react";

// components
import Head from "next/head";
import TakeAStand from "../fragments/squares/take-a-stand";
import Header from "../layouts/header";
import PostsWrapper from "../layouts/posts-wrapper";
import RandomDailyVerse from "../fragments/squares/random-daily-verse";

// styles
import interactStyles from "../styles/pages/Interact.module.css";

export default function Home() {
   return (
      <div className='main-wrapper'>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"INTERACT"} />
         <div className={interactStyles.gridWrapper}>
            <div className={`${interactStyles.gridWrapperRight}`}>
               <h2 className='std-text-block--small-title'>Today's Verse</h2>
               <RandomDailyVerse />
               <h2 className='std-text-block--small-title'>Take A Stand</h2>
               <TakeAStand />
            </div>
         </div>
      </div>
   );
}
