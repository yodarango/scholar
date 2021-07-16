import React from "react";
import Head from "next/head";
import ReadingCollage from "../layouts/reading-collage";
import Header from "../layouts/header";
import PostsWrapper from "../layouts/posts-wrapper";
import DailyVerse from "../posts/daily-verse";
import homeStyles from "../styles/pages/Home.module.css";
//import styles from '../styles/pages/Home.module.css';

const Read = () => {
   return (
      <div className='main-wrapper'>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"READ"} />
         <ReadingCollage />
      </div>
   );
};
export default Read;
