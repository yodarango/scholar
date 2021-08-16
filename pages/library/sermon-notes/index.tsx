// core
import React, { useState, useEffect } from "react";
import Head from "next/head";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import SermonCarrousel from "../../../layouts/sermons-carrousel";
import LibraryFilter from "../../../fragments/buttons/library-filter";

// styles
import librarySermonsPage from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";

// types
import { PodcastsProps } from "../../../fragments/library-items/podcast";
import { blogProps } from "../../../fragments/library-items/blog";
import { sermonProps } from "../../../fragments/library-items/sermon";
import { articleProps } from "../../../fragments/library-items/article";
import { bookProps } from "../../../fragments/library-items/book";

const Sermons = () => {
   // ============== FUNCTION 1: Make a call to the library API to get all the content to load
   ///   ====== 1.1 load all the types for the data being fetched
   type IfetchContentState = {
      podcasts: PodcastsProps[];
      blogs: blogProps[];
      sermons: sermonProps[];
      articles: articleProps[];
      books: bookProps[];
   };
   ///   ====== 1.2 Initial state
   const [fetchContentState, setfetchContentState] = useState<IfetchContentState>({
      podcasts: [],
      blogs: [],
      sermons: [],
      articles: [],
      books: []
   });
   const fetchConent = async () => {
      const data = await fetch("https://scholar-be.herokuapp.com/library");
      const parsedData = await data.json();
      setfetchContentState({
         podcasts: parsedData.podcast,
         blogs: parsedData.blogs,
         sermons: parsedData.sermons,
         articles: parsedData.articles,
         books: parsedData.books
      });
   };
   useEffect(() => {
      fetchConent();
   }, []);
   return (
      <div className={`${librarySermonsPage.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"SERMONS"} />
         <div className='x-large-spacer '></div>
         <LibraryMenu
            includeCategory={true}
            includeContent={true}
            includeSearch={true}
            contentButtonIcon={"🗣️"}
            currentSlectedContentPage={{ sermons: "#f2f2f2" }}
         />
         <LibraryFilter params={`sermon-notes`} />
         {fetchContentState.sermons && <SermonCarrousel sermon={fetchContentState.sermons} />}
      </div>
   );
};

export default Sermons;
