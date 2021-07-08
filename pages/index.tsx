import React from "react";
import Head from "next/head";
import CommentFilter from "../fragments/buttons/comment-filter";
import Header from "../layouts/header";
import PostsWrapper from "../layouts/posts-wrapper";
import DailyVerse from "../posts/daily-verse";
import homeStyles from "../styles/pages/Home.module.css";
//import styles from '../styles/pages/Home.module.css';

export default function Home() {
   return (
      <div className='main-wrapper'>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"HOME"} />
         <div className={homeStyles.majorGridWrapper}>
            <div className={homeStyles.majorGridWrapperLeft}>
               <DailyVerse />
            </div>
            <div className={homeStyles.majorGridWrapperRight}>
               <h3
                  className={`std-text-block--small-title ${homeStyles.dailyVerseHeaderTitleComments}`}>
                  Comments
               </h3>
               <CommentFilter />
               <PostsWrapper />
            </div>
         </div>
      </div>
   );
}
