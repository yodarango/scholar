// core
import React, { useEffect, useState } from "react";
import Head from "next/head";

// components
import Header from "../../layouts/header";
import LibraryMenu from "../../fragments/buttons/library-menu";
import LibraryPodcastCarrousel from "../../layouts/library-podcast-carrousel";
import LibraryBlogsCarrousel from "../../layouts/library-blogs-carrousel";
import LibrarySermonCarrousel from "../../layouts/library-sermon-carrousel";
import LibraryArticleCarrousel from "../../layouts/library-article-carrousel";

// styles
import libraryStyles from "../../styles/pages/Library.module.css";
//import styles from '../styles/pages/Home.module.css';

// types
import { PodcastsProps } from "../../fragments/library-items/podcast";
import { blogProps } from "../../fragments/library-items/blog";
import { sermonProps } from "../../fragments/library-items/sermon";
import { articleProps } from "../../fragments/library-items/article";

const Library = () => {
   // ============== FUNCTION 1: Make a call to the library API to get all the content to load
   ///   ====== 1.1 load all the types for the data being fetched
   type IfetchContentState = {
      podcasts: PodcastsProps[];
      blogs: blogProps[];
      sermons: sermonProps[];
      articles: articleProps[];
   };
   ///   ====== 1.2 Initial state
   const [fetchContentState, setfetchContentState] = useState<IfetchContentState>({
      podcasts: [],
      blogs: [],
      sermons: [],
      articles: []
   });
   const fetchConent = async () => {
      const data = await fetch("https://scholar-be.herokuapp.com/library");
      const parsedData = await data.json();
      console.log(parsedData);
      setfetchContentState({
         podcasts: parsedData.podcast,
         blogs: parsedData.blogs,
         sermons: parsedData.sermons,
         articles: parsedData.articles
      });
   };
   useEffect(() => {
      fetchConent();
   }, []);

   return (
      <div className={`${libraryStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"LIBRARY"} />
         <LibraryMenu
            includeCategory={false}
            includeContent={true}
            includeSearch={false}
            contentButtonIcon={"🔥"}
         />
         <LibrarySermonCarrousel sermon={fetchContentState.sermons} />
         <LibraryPodcastCarrousel podcasts={fetchContentState.podcasts} />
         <LibraryBlogsCarrousel blogs={fetchContentState.blogs} />
         <LibraryArticleCarrousel articles={fetchContentState.articles} />
      </div>
   );
};
export default Library;
