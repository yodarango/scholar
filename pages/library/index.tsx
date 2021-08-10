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
import LibraryBooksCarrousel from "../../layouts/library-books-carrousel";
import LibraryRecommendContennt from "../../fragments/buttons/library-recommend-contennt";

// styles
import libraryStyles from "../../styles/pages/Library.module.css";
import libraryMenu from "../../styles/buttons/LibraryMenu.module.css";
//import styles from '../styles/pages/Home.module.css';

// types
import { PodcastsProps } from "../../fragments/library-items/podcast";
import { blogProps } from "../../fragments/library-items/blog";
import { sermonProps } from "../../fragments/library-items/sermon";
import { articleProps } from "../../fragments/library-items/article";
import { bookProps } from "../../fragments/library-items/book";

const Library = () => {
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
            currentSlectedContentPage={libraryMenu.currentPagePopular}
         />
         {fetchContentState.sermons && (
            <LibrarySermonCarrousel sermon={fetchContentState.sermons} />
         )}
         {fetchContentState.podcasts && (
            <LibraryPodcastCarrousel podcasts={fetchContentState.podcasts} />
         )}
         {fetchContentState.blogs && <LibraryBlogsCarrousel blogs={fetchContentState.blogs} />}
         {fetchContentState.articles && (
            <LibraryArticleCarrousel articles={fetchContentState.articles} />
         )}
         {fetchContentState.books && <LibraryBooksCarrousel books={fetchContentState.books} />}
         <LibraryRecommendContennt />
      </div>
   );
};
export default Library;
